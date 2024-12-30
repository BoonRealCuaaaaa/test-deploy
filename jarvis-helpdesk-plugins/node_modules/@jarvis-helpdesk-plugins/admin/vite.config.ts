import importMetaEnv from '@import-meta-env/unplugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv, UserConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default ({ mode = 'development' }: UserConfig) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    css: {
      preprocessorOptions: {
        scss: {
          // https://stackoverflow.com/questions/78997907/the-legacy-js-api-is-deprecated-and-will-be-removed-in-dart-sass-2-0-0
          api: 'modern-compiler', // or "modern"
        },
      },
    },
    define: {
      'process.env': {},
    },
    server: {
      port: env.VITE_PORT ? +env.VITE_PORT : 6868,
      host: true,
    },
    plugins: [react(), svgr(), tsconfigPaths(), importMetaEnv.vite({ example: '.env.example' })],
  });
};
