const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:
describe('The users vists the create page', () => {
  describe(', posts a new item', () => {
    it('can see it rendered', () => {
      //setup
      const itemToCreate = buildItemObject();
      browser.url('/create.html');

      //exercise
      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
      browser.click('#submit-button');

      //verify item has been rendered.
      assert.include(browser.getText('body'), itemToCreate.title);

      assert.include(browser.getAttribute('body img','src'), itemToCreate.imageUrl);

    });
  });
});
