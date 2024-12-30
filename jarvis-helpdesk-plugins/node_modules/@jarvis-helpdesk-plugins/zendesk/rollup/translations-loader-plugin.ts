import fs from 'fs/promises';
import path from 'path';

function translationFlatten(object: Record<string, any>, currentKeys: string[] = []): Record<string, string> {
  const res: Record<string, any> = {};

  Object.keys(object).forEach((key) => {
    const value = object[key] as Record<string, any>;

    if (typeof value === 'object') {
      if (value.title && value.value) {
        const flattenedKey = [...currentKeys, key].join('.');
        res[flattenedKey] = value.value as unknown;
      } else {
        Object.assign(res, translationFlatten(value, [...currentKeys, key]));
      }
    } else {
      const flattenedKey = [...currentKeys, key].join('.');
      res[flattenedKey] = value;
    }
  });

  return res;
}

export default function TranslationsLoader() {
  return {
    name: 'translations-loader',
    transform: async (_: any, id: string) => {
      if (id.endsWith('.json') && id.includes(path.resolve(__dirname, '../src/translations'))) {
        const contentFile = await fs.readFile(id);

        const translations = JSON.parse(contentFile as any) as Record<string, any>;

        return {
          code: `export default ${JSON.stringify(translationFlatten(translations))};`,
          map: null,
        };
      }
      return null;
    },
  };
}
