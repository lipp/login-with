const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const strategies = {
  github: require('passport-github2').Strategy,
  reddit: require('passport-reddit').Strategy
}

const strategyTypes = Object.keys(strategies)

strategyTypes.forEach(type => {
  const TYPE = type.toUpperCase()
  const clientID = process.env[`${TYPE}_CLIENTID`]
  const clientSecret = process.env[`${TYPE}_SECRET`]
  const callbackURL = process.env[`${TYPE}_CALLBACKURL`]

  if (!clientID || !clientSecret || !callbackURL) {
    return
  }

  const Strategy = strategies[type]
  const creds = {clientID, clientSecret, callbackURL}
  const handler = (accessToken, refreshToken, profile, done) => (
    done(null, {accessToken, refreshToken, profile})
  )

  passport.use(new Strategy(creds, handler))
})

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

const app = express()
app.use(cookieParser())
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())

const loginHooks = {
  reddit: (req, opts) => {
    req.session.state = require('crypto').randomBytes(32).toString('hex')
    opts.state = req.session.state
    opts.duration = 'permanent'
  }
}

app.get(strategyTypes.map(type => `/${type}`), (req, res, next) => {
  const type = req.path.split('/')[1]
  const opts = {}
  if (loginHooks[type]) {
    loginHooks[type](req, opts)
  }
  passport.authenticate(type, opts)(req, res, next)
})

app.get(strategyTypes.map(type => `/${type}/callback`), (req, res, next) => {
  const type = req.path.split('/')[1]
  passport.authenticate(type, (err, user) => {
    res.cookie('user', JSON.stringify(err || user), {domain: '.now.sh'})
    res.json(user)
  })(req, res)
})

app.listen(3000)
