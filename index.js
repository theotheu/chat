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
		client = webdriverio.multiremote({
			chrome: {
				desiredCapabilities: {
					browserName: 'chrome'
				}
			},
			firefox: {
				desiredCapabilities: {
					browserName: 'firefox'
				}
			},
			phantom: {
				desiredCapabilities: {
					browserName: 'phantomjs'
				}
			}
		});
	
        client.init();

    });

    after(function(done) {
        client.end(done);
    });

    it('Should be able to receive messages', function(done){
	  var user;
	  
	  // 100 clients is the maximum with a 5 second timeout.
	  var clients = 10;
	  
	  var message = 'Test message';
	  var messages = 0;

	  var checkMessage = function(client, username){
		client.on('message', function(msg){
		  message.should.equal(msg);
		  console.log(username + " received message: " + msg);
		  client.disconnect();
		  messages++;
		  if(messages == clients){
			done();
		  };
		});
	  };

	  for(var i = 1; i <= clients; i++){
		user = io.connect(socketURL, options);
		username = "user " + i;
		user.emit('newUser', username);
		
		checkMessage(user, username);
		
		if(i == clients){
			user.send(message);
		}
	  }
	  
	});
});
