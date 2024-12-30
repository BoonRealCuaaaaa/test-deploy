// Original source: https://github.com/zendesk/app_scaffolds/blob/master/packages/react/src/lib/i18n.js

class I18n {
  translations: Record<string, any>;
  loadLocaleData: (locale: string) => Promise<Record<string, any>>;

  constructor(loadLocaleData: (locale: string) => Promise<Record<string, any>>) {
    this.translations = {};
    this.loadLocaleData = loadLocaleData;
  }

  static getRetries(locale: string) {
    return [locale, locale.replace(/-.+$/, ''), 'en'];
  }

  tryRequire = async (locale: string) => {
    try {
      const result = await this.loadLocaleData(locale);
      return result;
    } catch (e) {
      return null;
    }
  };

  loadTranslations = async (locale: string) => {
    const intentLocales = I18n.getRetries(locale);

    do {
      try {
        const importedTranslations = await this.tryRequire(intentLocales[0]!);
        if (importedTranslations) {
          this.translations = importedTranslations;
          break;
        }
      } finally {
        intentLocales.shift();
      }
    } while (intentLocales.length);
  };

  t = (key: string, context: Record<string, string> = {}) => {
    const keyType = typeof key;
    if (keyType !== 'string') {
      throw new Error(`Translation key must be a string, got: ${keyType}`);
    }

    // Differences in line endings (LF vs. CRLF) or file encoding could theoretically affect how the JSON is parsed
    // MacOS/Linux will load json as unnested format, but Windows will load it as nested format
    let template: Record<string, any> | string | undefined = this.translations;
    const keyParts = key.split('.');

    for (const keyPart of keyParts) {
      template = template[keyPart] as Record<string, any> | undefined;

      if (!template) {
        template = this.translations[key] as string | undefined;

        if (!template) {
          throw new Error(`Missing translation: ${key}`);
        }

        break;
      }
    }

    if (typeof template !== 'string') {
      throw new Error(`Invalid translation for key: ${key}`);
    }

    return template.replace(/{{(.*?)}}/g, (_, match) => context[match] || '');
  };
}

export default I18n;
