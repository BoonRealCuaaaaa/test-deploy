module.exports = {
  env: { browser: true, es2020: true },
  extends: ['./base.cjs'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
      plugins: ['simple-import-sort'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
        'prettier/prettier': [
          'error',
          {
            plugins: ['prettier-plugin-tailwindcss'],
            singleQuote: true,
            trailingComma: 'es5',
            endOfLine: 'auto',
            printWidth: 120,
          },
        ],
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
};
