/**
 *
 * Run with `node simple-test.js`
 *
 */

var webdriverio = require('webdriverio');
var assert = require('assert');

var matrix = webdriverio.multiremote({
        browserA: {desiredCapabilities: {browserName: 'phantomjs'}},
        browserB: {desiredCapabilities: {browserName: 'phantomjs'}}
    }),
    browserA = matrix.select('browserA'),
    browserB = matrix.select('browserB');


describe('multiremote example', function () {

    this.timeout(99999999);

    it('should open chat application', function () {
        return matrix.init()
            .url('http://localhost:5000/');
    });

    it('Should get the title of the browser windows', function (done) {
        browserA
            .getTitle(function (err, title) {
                assert(err === undefined);
                assert(title === 'Chat');
            });

        browserB
            .getTitle(function (err, title) {
                assert(err === undefined);
                assert(title === 'Chat');
            });

        browserA
            .setValue("#message", "Hello and welcome from browserA")
            .submitForm("#submitBtn");

        browserB
            .setValue("#message", "Hello and welcome from browserB")
            .submitForm("#submitBtn");

        return matrix.sync().call(done);
    });


    it('Should verify messages from browserA to browserB', function (done) {
        browserA
            .waitForExist('#chat', 5000)
            .getText('#chat').then(function (messages) {
                var m = messages.match(/Hello and welcome from browserB/g).length;
                console.log('>>>>>', m);
                assert(m > 2);
            });

        return matrix.sync().call(done);
    });

    it('Should verify messages from browserB to browserA', function (done) {
        browserA
            .waitForExist('#chat', 5000)
            .getText('#chat').then(function (messages) {
                var m = messages.match(/Hello and welcome from browserA/g).length;
                console.log('>>>>>', m);
                assert(m > 2);
            });

        return matrix.sync().call(done);
    });

    it('should end the session', function () {
        return matrix.pause(2000).end();
    });

});