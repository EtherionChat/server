module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended', 'plugin:security/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'brace-style': ['error', 'stroustrup'],
        'comma-dangle': ['error', 'never'],
        'no-unused-vars': ['warn'],
        'no-var': ['off'],
        'one-var': ['off'],
    },
};
