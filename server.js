const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const strategies = require('./src/strategies')
const routes = require('./src/routes')

const port = parseInt(process.argv[2], 10) || 3000

let subDomain = process.env.LW_SUBDOMAIN
const protocol = process.env.LW_SUBDOMAIN ? 'https:/' : 'http:/'
let cookieDomain
if (subDomain) {
  cookieDomain = '.' + subDomain.split('.').slice(1).join('.')
  console.log(`Using subdomain "${subDomain}" for callback urls`)
  console.log(`Cookie Domain is "${cookieDomain}"`)
} else {
  subDomain = `localhost:${port}`
  console.log(`Using debug subdomain ${subDomain}, cookies will not be set`)
}

console.log(`Configured strategies: ${strategies.map(strategy => strategy.type).join('/')}`)

strategies.forEach(strategy => {
  const handler = (accessToken, refreshToken, profile, done) => (
    done(null, {accessToken, refreshToken, profile})
  )
  const config = strategy.creds
  config.callbackURL = `${protocol}/${strategy.type}/callback`
  passport.use(new strategy.Ctor(config, handler))
  console.log(`Using login with "${strategy.type}" strategy`)
})

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

const app = express()
app.use(cookieParser())
app.use(expressSession({
  secret: process.env.LW_SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())

if (strategies.length > 0) {
  app.get(strategies.map(strategy => `/${strategy.type}`), routes.onAuthenticationRequest(strategies, passport))
  app.get(strategies.map(strategy => `/${strategy.type}/callback`), routes.onAuthenticationCallback(strategies, passport))
  app.get('/logout', routes.onLogout)
}

app.listen(port)
