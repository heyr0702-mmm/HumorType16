export const getBaseUrl = (): string => {
  const envUrl = (
    typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_SITE_URL ?? "" : ""
  ).replace(/\/+$/, "");
  if (envUrl) {
    return envUrl;
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  return "";
};

export const buildShareUrl = (path: string): string => {
  const base = getBaseUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn("Failed to write to clipboard", error);
      return false;
    }
  }

  return false;
};
