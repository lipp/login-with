const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const strategies = require('./strategies')

console.log(`Configured strategies: ${strategies.map(strategy => strategy.type).join('/')}`)

strategies.forEach(strategy => {
  const handler = (accessToken, refreshToken, profile, done) => (
    done(null, {accessToken, refreshToken, profile})
  )
  passport.use(new strategy.Ctor(strategy.creds, handler))
  console.log(`Using login with "${strategy.type}" strategy`)
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

app.get(strategies.map(strategy => `/${strategy.type}`), (req, res, next) => {
  const type = req.path.split('/')[1]
  const strategy = strategies.find(strategy => strategy.type === type)
  const opts = {}
  if (strategy.preHook) {
    strategy.preHook(req, opts)
  }
  passport.authenticate(type, opts)(req, res, next)
})

app.get(strategies.map(strategy => `/${strategy.type}/callback`), (req, res, next) => {
  const type = req.path.split('/')[1]
  passport.authenticate(type, (err, user) => {
    res.cookie('user', JSON.stringify(err || user), {domain: '.now.sh'})
    res.json(user)
  })(req, res)
})

app.listen(3000)
