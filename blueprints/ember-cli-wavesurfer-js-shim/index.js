/*jshint node:true*/
module.exports = {
  description: 'Installs Wavesurfer JS from Bower'

  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.addBowerPackageToProject('wavesurfer');
  }
};
