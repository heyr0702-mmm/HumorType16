const IMA_SDK_URL = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";

let loadPromise: Promise<void> | null = null;

function loadImaSdk(): Promise<void> {
  if (loadPromise) {
    return loadPromise;
  }

  if (typeof window === "undefined") {
    return Promise.reject(new Error("IMA SDK is not available in SSR."));
  }

  if ((window as unknown as { google?: { ima?: unknown } }).google?.ima) {
    return Promise.resolve();
  }

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = IMA_SDK_URL;
    script.async = true;

    const cleanup = () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
    };

    const handleLoad = () => {
      cleanup();
      if ((window as unknown as { google?: { ima?: unknown } }).google?.ima) {
        resolve();
      } else {
        loadPromise = null;
        reject(new Error("IMA SDK loaded but namespace is unavailable."));
      }
    };

    const handleError = () => {
      cleanup();
      loadPromise = null;
      reject(new Error("Failed to load IMA SDK."));
    };

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    document.head.appendChild(script);
  });

  return loadPromise;
}

function removeContainer(container: HTMLElement) {
  if (container.parentNode) {
    container.parentNode.removeChild(container);
  }
}

export async function playRewarded(adTagUrl: string): Promise<void> {
  if (!adTagUrl) {
    throw new Error("Missing adTagUrl for rewarded playback.");
  }

  if (typeof window === "undefined") {
    throw new Error("Rewarded playback is not available during SSR.");
  }

  await loadImaSdk();

  return new Promise((resolve, reject) => {
    const google = (window as unknown as { google?: any }).google;

    if (!google?.ima) {
      reject(new Error("IMA SDK namespace is not available."));
      return;
    }

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.9)";

    const adContainer = document.createElement("div");
    adContainer.style.width = "min(90vw, 960px)";
    adContainer.style.height = "min(56.25vw, 540px)";
    adContainer.style.maxHeight = "540px";
    adContainer.style.maxWidth = "960px";

    const videoElement = document.createElement("video");
    videoElement.setAttribute("playsinline", "true");
    videoElement.style.width = "100%";
    videoElement.style.height = "100%";

    adContainer.appendChild(videoElement);
    container.appendChild(adContainer);
    document.body.appendChild(container);

    const adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, videoElement);
    adDisplayContainer.initialize();

    const adsLoader = new google.ima.AdsLoader(adDisplayContainer);

    const cleanup = () => {
      try {
        adsLoader?.contentComplete?.();
      } catch (error) {
        console.warn("Failed to complete ad content", error);
      }
      removeContainer(container);
    };

    const handleAdError = (event: any) => {
      cleanup();
      const error = event?.getError?.();
      reject(error || new Error("Failed to play rewarded ad."));
    };

    adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, handleAdError, false);

    adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      (loadedEvent: any) => {
        let adsManager: any;
        try {
          adsManager = loadedEvent.getAdsManager(videoElement);
        } catch (error) {
          cleanup();
          reject(error instanceof Error ? error : new Error("Failed to initialize AdsManager."));
          return;
        }

        const finish = () => {
          cleanup();
          resolve();
        };

        adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, finish);
        adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, finish);
        adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, finish);

        adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (errorEvent: any) => {
          cleanup();
          const adError = errorEvent?.getError?.();
          reject(adError || new Error("Rewarded ad playback failed."));
        });

        try {
          adsManager.init(window.innerWidth, window.innerHeight, google.ima.ViewMode.NORMAL);
          adsManager.start();
        } catch (error) {
          cleanup();
          reject(error instanceof Error ? error : new Error("Unable to start rewarded ad."));
        }
      },
      false,
    );

    const adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = adTagUrl;
    adsRequest.linearAdSlotWidth = window.innerWidth;
    adsRequest.linearAdSlotHeight = window.innerHeight;
    adsRequest.nonLinearAdSlotWidth = window.innerWidth;
    adsRequest.nonLinearAdSlotHeight = Math.round(window.innerHeight / 3);

    try {
      adsLoader.requestAds(adsRequest);
    } catch (error) {
      cleanup();
      reject(error instanceof Error ? error : new Error("Unable to request rewarded ad."));
    }
  });
}
