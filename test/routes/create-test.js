const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('GET', () => {
    it('renders empty input fields', async () => {
        //setup

        //exercise
        const response = await request(app)
            .get('/items/create');

        //verify
        assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
        assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '');
        assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
    });

    describe('POST', () => {
      it('creates a new item', async () => {

         //setup
         const itemToCreate = buildItemObject();

         //exercise
         const response = await request(app)
            .post('/items/create')
            .type('form')
            .send(itemToCreate);

        //verify
        const createdItem = await Item.findOne(itemToCreate);
        assert.isOk(createdItem, 'Item was not created successfully in the database');

      });

      it('redirect to / with status code 302', async () => {

        //setup
        const itemToCreate = buildItemObject();

        //exercise
        const response = await request(app)
          .post('/items/create')
          .type('form')
          .send(itemToCreate);

        //verify
        assert.equal(response.status, 302);
        assert.equal(response.headers.location, '/');

      });
    });

  });
});
