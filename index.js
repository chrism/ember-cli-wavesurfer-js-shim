/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-wavesurfer-js-shim',

  included: function included(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/wavesurfer.js/dist/wavesurfer.min.js');

    var plugins = app.project.config(process.env.EMBER_ENV)['APP']['wavesurferPlugins'];

    if (Array.isArray(plugins)) {
      plugins.forEach( plugin => {
        app.import(app.bowerDirectory + `/wavesurfer.js/dist/plugin/wavesurfer.${plugin}.min.js`);
      });
    }

    app.import('vendor/ember-cli-wavesurfer-js-shim.js');
    app.import('vendor/demo_audio.mp3');
  }
};
