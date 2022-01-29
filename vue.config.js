module.exports = {
  lintOnSave: false,
  pluginOptions: {
    i18n: {
      locale: "uz",
      fallbackLocale: "uz",
      localeDir: "locales",
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
  // outputDir must be added to Django's TEMPLATE_DIRS
  outputDir: "./dist/",
  // assetsDir must match Django's STATIC_URL
  assetsDir: "static",
};
