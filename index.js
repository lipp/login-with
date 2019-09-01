const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const MemoryStore = require('memorystore')(expressSession)

const opts = require('./src/opts')(process.argv, process.env)

if (!opts.tokenSecret) {
  console.error('no LW_JWT_SECRET env variable specified')
  process.exit(1)
}

if (!opts.sessionSecret) {
  console.error('no LW_SESSION_SECRET env variable specified')
  process.exit(1)
}

const rootUrl = opts.protocol + '/' + opts.subDomain + ':' + opts.port

console.log(`Using subdomain "${rootUrl}" for callback urls`)

const strategies = require('./src/strategies')(process.env, rootUrl)
console.log(`Configured strategies: ${strategies.map(strategy => strategy.type).join('/')}`)

strategies.forEach(strategy => {
  passport.use(new strategy.Ctor(strategy.config, strategy.toUser))
  console.log(`Using login with "${strategy.type}" strategy`)
})

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

const app = express.Router()
app.use(cookieParser())
app.use(expressSession({
  secret: opts.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({
    checkPeriod: 1000 * 60 * 3 // 3 minutes
  })
}))
app.use(passport.initialize())

if (strategies.length > 0) {
  opts.strategies = strategies
  opts.passport = passport
  opts.env = process.env
  const routes = require('./src/routes')(opts)

  app.get(
    strategies.map(strategy => `/${strategy.type}`),
    routes.onAuthenticationRequest
  )

  app.get(
    strategies.map(strategy => `/${strategy.type}/callback`),
    routes.onAuthenticationCallback
  )

  app.get(
    '/logout',
    routes.onLogout
  )

  app.get(
    '/',
    routes.onIndex
  )
}

module.exports = app
