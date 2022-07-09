// postcss.config.js
const postcssJitProps = require('postcss-jit-props');
const OpenProps = require('open-props');
const postcssCustomMedia = require('postcss-custom-media');
const postcssPresetEnv = require('postcss-preset-env');
const postcssAutoPrefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    postcssJitProps(OpenProps),
    postcssCustomMedia(),
    postcssPresetEnv(/* pluginOptions */),
    postcssAutoPrefixer(),
    cssnano(),
  ],
};
