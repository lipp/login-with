const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const MemoryStore = require('session-memory-store')(expressSession)
const LoginApp = require('./index');
const opts = require('./src/opts')(process.argv, process.env)

let app = express();

app.use('/', LoginApp);

app.listen(opts.port)
