module.exports = {
  clearMocks: true,
  noStackTrace: true,
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  globals: {
    NODE_ENV: 'test',
  },
  testEnvironment: 'node',
  verbose: true, // Set to false to see console log during tests.
}
