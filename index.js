var webdriverio = require('webdriverio');
var io = require('socket.io-client');
var should = require('should');
	
describe('Testing chat client', function() {
    this.timeout(5000);
    var client = {};
    var socketURL = 'http://127.0.0.1:3000';
	var options ={
	  transports: ['websocket'],
	  'force new connection': true
	};

    before(function() {
        client = webdriverio.remote({
            desiredCapabilities: {
                browserName: 'chrome'
            }
        });
        client.init();
    });

    after(function(done) {
        client.end(done);
    });

    it('Should be able to receive messages', function(done){
	  var client1, client2, client3;
	  var message = 'Test message';
	  var messages = 0;

	  var checkMessage = function(client){
		client.on('message', function(msg){
		  message.should.equal(msg);
		  client.disconnect();
		  messages++;
		  console.log("Client received message: " + msg);
		  if(messages === 3){
			done();
		  };
		});
	  };

	  client1 = io.connect(socketURL, options);
	  checkMessage(client1);
	  
	  client2 = io.connect(socketURL, options);
	  checkMessage(client2);
	  
	  client3 = io.connect(socketURL, options);
	  checkMessage(client3);
	  
	  client3.send(message);

	});
});
