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
};
