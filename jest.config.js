/** @type {import('jest').Config} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testMatch: ["**/*.test.{ts,tsx}"],
  testPathIgnorePatterns: ["node_modules", ".next", "storybook-static"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx|mjs)$": [
      "babel-jest",
      { configFile: "./jest.babel.config.js" },
    ],
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(lodash-es|next-auth|jose|openid-client))/",
  ],
  moduleNameMapper: {
    "^@\\/(.*)$": "<rootDir>/src/$1",
    "^lodash-es$": "<rootDir>/node_modules/lodash/index.js",
  },
  collectCoverage: false,
  coverageReporters: ["text", "json", "html"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",

    // TODO - The below ignore coverage paths should be removed once the actual logic is started for development
    // '!src/app/**/*.{ts,tsx}',
    "!src/services/**/*.{ts,tsx}",
    "!src/constants/**/*.{ts,tsx}",
  ],
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-utils",
    "interfaces",
    "types",
    "enums",
    "constants",
    "stories.tsx",
    "shadcn",
  ],
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 65,
      lines: 65,
      statements: 65,
    },
    "src/components/bricks": {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
