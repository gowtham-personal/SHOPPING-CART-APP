import "@testing-library/jest-dom";

import { cleanup } from "@testing-library/react";
import { TextDecoder, TextEncoder } from "util";

// Mock the app sign in redirect URL for login tests
process.env.NEXT_PUBLIC_APP_SIGN_IN_REDIRECT_URL = "";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(_callback: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

// Mock the cn utility function
jest.mock("@/components/bricks/shadcn/lib/utils", () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(" "),
}));

// Polyfill TextEncoder and TextDecoder for Jest environment (jsdom)
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}

// Mock window.matchMedia for test environment
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = function (query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  };
}

// Clean up after each test
afterEach(() => {
  cleanup();
});
