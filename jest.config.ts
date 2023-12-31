// jest.config.js
/** @type {import('jest').Config} */

const config = {
  preset: 'jest-expo',
  coveragePathIgnorePatterns: ['node_modules'],
  setupFiles: ['<rootDir>/src/__tests__/configs/envVarsConfig.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testPathIgnorePatterns: [
    '<rootDir>/src/__tests__/mocks/',
    '<rootDir>/src/__tests__/customs/',
    '<rootDir>/src/__tests__/config/',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = config
