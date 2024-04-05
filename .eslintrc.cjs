module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'all',
                semi: true,
                bracketSpacing: true,
                tabWidth: 4,
                endOfLine: 'auto',
            },
        ],
        'react/react-in-jsx-scope': 'off',
    },
};
