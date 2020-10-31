module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.(ts|js)$': 'ts-jest',
    },
    testMatch: ['**/test/**/*.test.(ts|js)', '**/?(*.)+(spec|test).(js|ts)'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testEnvironment: 'node',
    coverageReporters: [
        "json-summary",
        "text",
        "lcov"
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.js",
        "!data/keyMap.js",
        "!/node_modules/",
    ],
};
