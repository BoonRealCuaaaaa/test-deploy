module.exports = {
  root: true,
  extends: [
    "@jarvis-helpdesk-plugins/eslint-config/react.cjs",
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.cjs'],
      rules: {
        "prettier/prettier": [
          "error",
          {
            plugins: ["prettier-plugin-tailwindcss"],
            singleQuote: true,
            trailingComma: "es5",
            endOfLine: "auto",
            printWidth: 120,
          },
        ],
      },
    },
    {
      files: ["vite.config.ts"],
      parserOptions: {
        project: "./tsconfig.node.json",
      },
    },
  ],
};
