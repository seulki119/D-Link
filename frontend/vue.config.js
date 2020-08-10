module.exports = {
  transpileDependencies: ["vuetify"],

  // outputDir must be added to Django's TEMPLATE_DIRS
  outputDir: './dist/',
  // assetsDir must match Django's STATIC_URL
  assetsDir: 'static',
};
