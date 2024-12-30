import glob from 'fast-glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Plugin, ResolvedConfig } from 'vite';

export default function StaticCopy({
  targets,
}: {
  targets: { src: string; dest: string; modifier?: (data: any, filename: string) => string }[];
}): Plugin {
  let config: ResolvedConfig | null = null;
  return {
    name: 'static-copy',
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },
    async writeBundle() {
      const rootPath = config?.build.outDir;
      if (!rootPath) {
        return;
      }

      await Promise.all(
        targets.map(async ({ src, dest, modifier = (data: any) => data }) => {
          const paths = await glob(src);
          const destinationPath = path.resolve(rootPath, dest);
          await processFiles(paths, destinationPath, modifier);
        })
      );
    },
  };
}

async function processFiles(paths: string[], dest: string, modifier: (data: any, filename: string) => string) {
  await Promise.all(
    paths.map(async (src) => {
      const isDirectory = (await fs.stat(src)).isDirectory();
      if (isDirectory) {
        return;
      }

      const file = await fs.readFile(src);
      const fileName = path.basename(src);
      const modifiedFile = modifier(file, fileName);

      await ensureDirectory(dest);
      await fs.writeFile(path.resolve(dest, fileName), modifiedFile);
    })
  );
}

async function ensureDirectory(src: string) {
  try {
    await fs.mkdir(src, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory ${src}: ${error}`);
  }
}
