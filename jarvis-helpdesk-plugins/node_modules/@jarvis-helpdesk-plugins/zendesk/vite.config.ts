import react from '@vitejs/plugin-react-swc';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv, UserConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import { changeLocation } from './rollup/modifiers/manifest';
import { extractMarketplaceTranslation } from './rollup/modifiers/translations';
import StaticCopy from './rollup/static-copy-plugin';
import TranslationsLoader from './rollup/translations-loader-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default ({ mode = 'development' }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    base: './',
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      TranslationsLoader(),
      StaticCopy({
        targets: [
          { src: resolve(__dirname, 'src/assets/*'), dest: './' },
          { src: resolve(__dirname, 'src/manifest.json'), dest: '../', modifier: changeLocation },
          {
            src: resolve(__dirname, 'src/translations/*'),
            dest: '../translations',
            modifier: extractMarketplaceTranslation,
          },
        ],
      }),
    ],
    root: 'src',
    server: {
      port: process.env.VITE_PORT ? +process.env.VITE_PORT : 7999,
    },
    preview: {
      port: process.env.VITE_PORT ? +process.env.VITE_PORT : 7999,
    },
    css: {
      preprocessorOptions: {
        scss: {
          // https://stackoverflow.com/questions/78997907/the-legacy-js-api-is-deprecated-and-will-be-removed-in-dart-sass-2-0-0
          api: 'modern-compiler',
        },
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
        },
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`,
        },
        watch: {
          include: 'src/**',
        },
      },
      outDir: resolve(__dirname, 'dist/assets'),
      emptyOutDir: true,
    },
  });
};
