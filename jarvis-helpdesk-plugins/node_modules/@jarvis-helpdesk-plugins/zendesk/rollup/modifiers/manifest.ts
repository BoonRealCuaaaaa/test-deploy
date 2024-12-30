const JS_INDENT = 2;

export function changeLocation(content: string, filename: string) {
  const manifest = JSON.parse(content) as Record<string, any>;

  manifest.location = Object.keys(manifest.location).reduce((acc, key) => {
    const app = manifest.location[key] as Record<string, any>;

    const appLocations = Object.keys(app).reduce((acc, key) => {
      const value = app[key] as Record<string, any>;
      return { ...acc, [key]: { ...value, url: process.env.VITE_ZENDESK_LOCATION } };
    }, {});

    return { ...acc, [key]: appLocations };
  }, {});

  const manifestOutput = {
    _warning: `AUTOMATICALLY GENERATED FROM $/src/${filename} - DO NOT MODIFY THIS FILE DIRECTLY`,
    ...manifest,
  };

  return JSON.stringify(manifestOutput, null, JS_INDENT);
}
