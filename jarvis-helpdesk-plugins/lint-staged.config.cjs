module.exports = {
  '*.{js,cjs,mjs,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'yarn run check-types',
  '*.{json,yaml,css,scss}': ['prettier --write'],
};
