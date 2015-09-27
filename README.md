Minimal chat client with node and socket.io

Installation
------------
```git clone https://github.com/theotheu/chat```

```cd chat```

```npm install```

```node server.js```

Point your browser to http://HOSTNAME:3000

Point an other browser to http://HOSTNAME:3000

Notes
------------
This version uses xvfb and a bunch of other packages to be able to run the tests. This will change in the next version.

Commands
------------
cmd:
vagrant up

putty:
Xvfb :1 -screen 5 1024x768x8 &
export DISPLAY=:1.5
selenium-standalone start

new putty window:
cd chat
node server.js

new putty window:
mocha chat/index.js