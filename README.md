Minimal chat client with node and socket.io

# Installation

```git clone https://github.com/theotheu/chat```

```cd chat```

```npm install```

## If you're using vagrant
Try the following commands to do the npm install:

```su``` (password: vagrant)

```npm install```

and/or

```npm install --no-bin-links```

## To test if it's working
```node server.js```

Point your browser to http://HOSTNAME:3000 (:13000 if using vagrant)

Point an other browser to http://HOSTNAME:3000 (:13000 if using vagrant)

# Testing

## Installing Selenium
### Download Selenium
```cd chat```

```curl -O http://selenium-release.storage.googleapis.com/2.43/selenium-server-standalone-2.43.1.jar```

## Starting the test
### Open 3 terminals
#### Terminal 1
```cd chat```

```java -jar selenium-server-standalone-2.43.1.jar```
#### Terminal 2
```cd chat```

```node server.js```
#### Terminal 3
```cd chat```

```mocha index.js```

To modify the number of clients, go to index.js and edit line 46

```var clients = 10;```
