import react from '@vitejs/plugin-react-swc';
import process from 'node:process';
import { defineConfig, loadEnv, UserConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode = 'development' }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    base: './',
    plugins: [react(), svgr(), tsconfigPaths()],
    css: {
      preprocessorOptions: {
        scss: {
          // https://stackoverflow.com/questions/78997907/the-legacy-js-api-is-deprecated-and-will-be-removed-in-dart-sass-2-0-0
          api: 'modern-compiler',
        },
      },
    },
  });
};
