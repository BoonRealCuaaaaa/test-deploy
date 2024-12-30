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
      files: ["vite.config.ts", "rollup/**/*.ts"],
      parserOptions: {
        project: "./tsconfig.node.json",
      },
    },
  ],
};
