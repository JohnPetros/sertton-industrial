// jest.config.js
/** @type {import('jest').Config} */

const config = {
  preset: 'jest-expo',
  coveragePathIgnorePatterns: ['node_modules'],
  setupFiles: ['<rootDir>/src/tests/config/envVars.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  // transformIgnorePatterns: [
  //   'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  // ],
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // testPathIgnorePatterns: [
  //   '<rootDir>/node_modules/',
  //   '<rootDir>/.maestro/',
  //   '@react-native',
  // ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = config
