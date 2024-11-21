console.log("Jest Config Loaded");
module.exports = {
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Use Babel for transforming JS/TS files
    },
    transformIgnorePatterns: [
      "node_modules/(?!axios)" // Allow Jest to transform axios module
    ],
    testEnvironment: "jsdom", // Ensure the correct environment for React tests
  };
  