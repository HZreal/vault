import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | okta-number-challenge', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.oktaNumberChallengeAnswer = null;
  });

  test('it should render correct descriptions', async function (assert) {
    await render(hbs`<OktaNumberChallenge @correctAnswer={{this.oktaNumberChallengeAnswer}}/>`);

    assert
      .dom('[data-test-okta-number-challenge-description]')
      .includesText(
        'To finish signing in, you will need to complete an additional MFA step.',
        'Correct description renders'
      );
    assert
      .dom('[data-test-okta-number-challenge-loading]')
      .includesText('Please wait...', 'Correct loading description renders');
  });

  test('it should show correct number for okta number challenge', async function (assert) {
    this.set('oktaNumberChallengeAnswer', 1);
    await render(hbs`<OktaNumberChallenge @correctAnswer={{this.oktaNumberChallengeAnswer}}/>`);
    assert
      .dom('[data-test-okta-number-challenge-description]')
      .includesText(
        'To finish signing in, you will need to complete an additional MFA step.',
        'Correct description renders'
      );
    assert
      .dom('[data-test-okta-number-challenge-verification-type]')
      .includesText('Okta verification', 'Correct verification type renders');

    assert
      .dom('[data-test-okta-number-challenge-verification-description]')
      .includesText(
        'Select the following number to complete verification:',
        'Correct verification description renders'
      );
    assert
      .dom('[data-test-okta-number-challenge-answer]')
      .includesText('1', 'Correct okta number challenge answer renders');
  });
});
