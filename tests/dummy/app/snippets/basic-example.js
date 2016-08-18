import Ember from 'ember';
import layout from '../templates/components/wavesurfer-basic';

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
          container: '#waveform',
          waveColor: 'red',
          progressColor: 'purple',
          normalize: true,
          barWidth: 2
      });

      wavesurfer.load(src);

      wavesurfer.on('ready', () => {
        Ember.run(() => {
          resolve();
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
    .then(() => {
      Ember.Logger.log('waveform loaded');
    })
    .catch( error => {
      Ember.Logger.log('waveform error : ', error);
    });
  },

  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, this.loadWavesurfer);
  }
});
