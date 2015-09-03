/**
 *
 * Run with `node simple-test.js`
 *
 */
var webdriverio = require('webdriverio');
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

webdriverio
    .remote(options)
    .init()
    .url('http://www.google.com')
    .title(function(err, res) {
        console.log('Title was: ' + res.value);
    })
    .end();