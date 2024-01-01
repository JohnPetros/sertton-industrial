// jest.config.js
/** @type {import('jest').Config} */

const config = {
  preset: 'jest-expo',
  coveragePathIgnorePatterns: ['node_modules'],
  setupFiles: [
    'dotenv/config',
    '<rootDir>/src/_tests_/configs/envVarsConfig.ts',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testPathIgnorePatterns: [
    '<rootDir>/src/_tests_/mocks/',
    '<rootDir>/src/_tests_/customs/',
    '<rootDir>/src/_tests_/config/',
    '<rootDir>/src/_tests_/coverage/',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
}

module.exports = config
