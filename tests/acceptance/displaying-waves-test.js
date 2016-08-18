import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | displaying waves');

test('displays basic wave', function(assert) {
  visit('/');

  andThen(function() {
    assert.ok(find('#waveform').children('wave').length > 0, "Basic example shows wave");
  });
});

test('displays regions wave', function(assert) {
  visit('/');

  andThen(function() {
    assert.ok(find('#waveform-regions').children('wave').length > 0, "Region example shows wave");
    assert.ok(find('#waveform-regions').children('wave').first().children('region').length > 0, "Region example shows region");
  });
});
