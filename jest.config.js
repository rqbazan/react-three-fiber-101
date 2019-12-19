module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: {
        jsx: 'react'
      }
    }
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testPathIgnorePatterns: ['/node_modules/', '/\\.cache/', '/public/'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
    '\\.module.css$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/test/__mocks__/svg.ts',
    '\\.css$': '<rootDir>/test/__mocks__/css.ts'
  }
}
