module.exports = {
  root: true,
  extends: [
    "@jarvis-helpdesk-plugins/eslint-config/base.cjs",
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
};
