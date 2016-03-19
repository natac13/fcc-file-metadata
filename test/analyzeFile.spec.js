const expect = require('expect');
const request = require('supertest');
const mock = require('mock-fs');
const fs = require('fs');

const app = require('../src/index.js');


describe('App', () => {
  describe('Routes', () => {
    before(function before() {
      mock({
        'assets': {
          'README.md': '### Test Readme \n > testing the routes'
        }
      });
    });

    after(mock.restore);


    it('should return proper file size of an uploaded file.', (done) => {
      request(app)
        .post('/analyze_file')
        .accept('Accept', 'application/json')
        .attach('file', 'assets/README.md')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, result) {
          fs.readFile('./assets/README.md', function read(err, file) {
            if (err) { return done(err); }
            expect(result.body.size).toEqual(file.length);
            done(err);
          })
        })
    });
  });

});
