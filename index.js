var webdriverio = require('webdriverio');
var io = require('socket.io-client');
var should = require('should');
var assert = require('assert');

describe('Testing chat client', function() {
    this.timeout(5000);
    var client = {};
	
	var browserOne;
	var browserTwo;
	
    var socketURL = 'http://127.0.0.1:3000';
	var options ={
	  transports: ['websocket'],
	  'force new connection': true
	};

    before(function(done) {
		client = webdriverio.multiremote({
			browserOne: {
				desiredCapabilities: {
					browserName: 'phantomjs'
				}
			},
			browserTwo: {
				desiredCapabilities: {
					browserName: 'phantomjs'
				}
			}
		});
	
        client.init(done);

		browserOne = client.select('browserOne');
		browserTwo = client.select('browserTwo');
    });

    after(function(done) {
        client.end(done);
    });

	// Test 1
	it('Should be able to open the chat page', function(done){
		browserOne
			.url('http://127.0.0.1:3000')
			.getTitle().then(function(title) {
				console.log('Title is: ' + title);
				if(title == "Chat"){
					done();
				}
			})
	});

	// Test 2
	
	// Test 2.1
	it('Should be able to send a message from a specific browser', function (done) {
        browserOne
			.url('http://127.0.0.1:3000')
			.setValue('#message', '<span class="browserOne-message" style="background:yellow;">Hi, I am Browser One</span>')
			.click('#send');
			done();
    });
	
	// Test 2.2
	it('Should be able to receive a specific message from a different browser', function (done) {
		browserTwo
			.url('http://127.0.0.1:3000')
			.waitForExist('.browserOne-message', 5000)
			.getText('.browserOne-message').then(function(messages) {
				console.log("Received message: " + messages);
				assert.equal(messages, 'Hi, I am Browser One');
				done();
			});
	});
	
	// Test 3
    it('Should be able to receive messages', function(done){
	  var user;

	  var clients = 5;
	  
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
