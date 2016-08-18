import Ember from 'ember';
import layout from '../templates/components/wavesurfer-regions';

import config from '../config/environment';

import Wavesurfer from 'wavesurfer';

export default Ember.Component.extend({
  layout,

  init() {
    this._super(...arguments);

    if (Ember.testing) {
      this._loading = false;
      Ember.Test.registerWaiter(() => this._loading === false);
    }
  },

  loadWavesurferPromise() {
    const src = this.get('src');

    let promise = new Ember.RSVP.Promise((resolve, reject) => {
      const wavesurfer = Wavesurfer.create({
          container: '#waveform-regions',
          waveColor: 'red',
          progressColor: 'purple',
          normalize: true,
          barWidth: 2
      });

      wavesurfer.load(config.rootURL + src);

      wavesurfer.on('ready', () => {
        Ember.run(() => {
          resolve(wavesurfer);
        });
      });

      wavesurfer.on('error', error => {
        Ember.run(() => {
          reject(error);
        });
      });

    });

    if (Ember.testing) {
      this._loading = true;
      return promise.finally(() => this._loading = false);
    }

    return promise;
  },

  loadWavesurfer() {
    this.loadWavesurferPromise()
    .then( wavesurfer => {
      Ember.Logger.log('waveform loaded');

      wavesurfer.addRegion({
        start: 1, // time in seconds
        end: 4, // time in seconds
        color: 'rgba(255, 0, 0, 0.1)'
      });
    })
    .catch( error => {
      Ember.Logger.log('waveform error : ', error);
    });
  },

  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, this.loadWavesurfer);
  }
});
