const express = require('express')
const LoginApp = require('./index')
const opts = require('./src/opts')(process.argv, process.env)

let app = express()

// use the LoginApp at '/'
app.use('/', LoginApp)

// start the server
app.listen(opts.port)
