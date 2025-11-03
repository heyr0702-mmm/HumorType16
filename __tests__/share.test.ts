import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { buildShareUrl, getBaseUrl } from "../utils/share";

describe("share utils", () => {
  const OLD_ENV = { ...process.env };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = { ...OLD_ENV };
  });

  it("uses NEXT_PUBLIC_SITE_URL when set", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/";
    expect(getBaseUrl()).toBe("https://example.com");
    expect(buildShareUrl("/result/EALS")).toBe("https://example.com/result/EALS");
  });

  it("falls back to window.origin when env not set (CSR)", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    vi.stubGlobal("window", { location: { origin: "https://local.dev" } });
    expect(getBaseUrl()).toBe("https://local.dev");
    expect(buildShareUrl("result/EALS")).toBe("https://local.dev/result/EALS");
  });

  it("returns relative when neither env nor window available", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getBaseUrl()).toBe("");
    expect(buildShareUrl("/result/EALS")).toBe("/result/EALS");
  });
});
