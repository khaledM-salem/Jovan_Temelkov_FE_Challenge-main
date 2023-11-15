module.exports = {
    preset: 'ts-jest/presets/js-with-babel',
    testPathIgnorePatterns: ['/node_modules/'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
    },
};
  