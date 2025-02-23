'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    // Ensure SPFx Webpack processes CSS modules from the shared package
    // generatedConfiguration.module.rules.push({
    //   test: /\.module\.css$/,
    //   use: [
    //     {
    //       loader: "@microsoft/loader-load-themed-styles",
    //       options: { esModule: true },
    //     },
    //   ],
    // });

    // // Ensure SPFx processes .module.css from shared package
    // generatedConfiguration.module.rules.forEach((rule) => {
    //   if (rule.test && rule.test.toString().includes(".module.scss")) {
    //     rule.test = /\.(module|mod)\.(s?css)$/; // Support .module.css as well
    //   }
    // });

    return generatedConfiguration;
  },
});


/* fast-serve */
const { addFastServe } = require("spfx-fast-serve-helpers");
addFastServe(build);
/* end of fast-serve */

build.initialize(require('gulp'));

