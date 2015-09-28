Minimal chat client with node and socket.io

# Installation
------------
```git clone https://github.com/theotheu/chat```

```cd chat```

```npm install```

```node server.js```

Point your browser to http://HOSTNAME:3000

Point an other browser to http://HOSTNAME:3000

# Testing
------------
## Installing Selenium
### Download Selenium
```curl -O http://selenium-release.storage.googleapis.com/2.43/selenium-server-standalone-2.43.1.jar```

## Starting the test
### Open 3 terminals
#### Terminal 1
```java -jar selenium-server-standalone-2.43.1.jar -role hub```
#### Terminal 2
```cd chat```

```node server.js```
#### Terminal 3
```cd chat```

```mocha index.js```

To modify the number of clients, go to index.js and edit line 46

```var clients = 10;```
