/**
 *
 * Run with `node simple-test.js`
 *
 */

var webdriverio = require('webdriverio');
var assert = require('assert');
var options = {
    desiredCapabilities: {
        /**
         *
         * Install phantomjs with `npm install -g phantomjs`
         *
         * Getting Started with safari
         * Starting with Selenium 2.45.0, you must manually install the SafariDriver browser extension. Simply open the latest copy of SafariDriver.safariextz in Safari and click the "install" button. Once installed, writing a test for Safari is just as straightforward as using the FirefoxDriver:
         * @see https://code.google.com/p/selenium/wiki/SafariDriver
         * @see http://elementalselenium.com/tips/69-safari
         *
         */
        browserName: 'chrome' // phantomjs | chrome | firefox | safari
    }
};

//webdriverio
//    .remote(options)
//    .init()
//    .url('http://localhost:3000')
//    .title(function (err, res) {
//        console.log('Title was: ' + res.value);
//    })
//    .waitForExist("#message", function () {
//        console.log('finally');
//
//    })
//    .setValue("#message", "tada!")
//    .submitForm("#submitBtn")
//    .end();

describe("First simple test", function () {

    this.timeout(99999999);
    var client = {};

    before(function (done) {
        client = webdriverio.remote(options);
        client.init(done);
    });


    it("Title should be 'Chat'", function (done) {
        client
            .url('http://localhost:3000')
            .getTitle(function (err, title) {
                assert(err === undefined);
                assert(title === 'Chat');
            })
            .call(done);
    });


    it("Title should be 'Chat'", function (done) {
        client
            .url('http://localhost:3000')
            .getTitle(function (err, title) {
                assert(err === undefined);
                assert(title === 'Chat');
            })
            .setValue("#message", "tada!")
            .submitForm("#submitBtn")
            .call(done);
    });


    after(function (done) {
        client.end(done);
    });

});
describe("Second test", function () {

    this.timeout(99999999);
    var client1 = {};
    var client2 = {};

    before(function (done) {
        client1 = webdriverio.remote(options)
        client2 = webdriverio.remote(options)


        ;
        client1.init(done);
        client2.init(done);
    });

    it("Title should be 'Chat'", function (done) {
        client1
            .url('http://localhost:3000')
            .setValue("#message", "tada! 2nd resr")
            .submitForm("#submitBtn")
            .then(function (err, val) {
                console.log('>>>>>', err, val)
            })

            .call(done)
        ;


        //client2
        //    .url('http://localhost:3000')
        //    .getValue("#message", "tada! 2nd resr")
        //     .then(function (err, val) {
        //        console.log('>>>>>', err, val)
        //    })
        //
        //    .call(done);
    });


    after(function (done) {
        client1.end(done);
        client2.end(done);
    });

});