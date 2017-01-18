const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const routes = require('./src/routes')

const port = parseInt(process.argv[2], 10) || 3000

const profileCookieName = process.env.LW_PROFILE_COOKIENAME || 'profile'
const tokenCookieName = process.env.LW_TOKEN_COOKIENAME || 'token'
const tokenSecret = process.env.LW_TOKEN_SECRET
const sessionSecret = process.env.LW_SESSION_SECRET
const subDomain = process.env.LW_SUBDOMAIN || `localhost:${port}`
const cookieDomain = process.env.LW_SUBDOMAIN ? '.' + subDomain.split('.').slice(1).join('.') : null
const protocol = process.env.LW_SUBDOMAIN ? 'https:/' : 'http:/'

if (!tokenSecret) {
  console.error('no LW_TOKEN_SECRET env variable specified')
  process.exit(1)
}

const rootUrl = protocol + '/' + subDomain

console.log(`Using subdomain "${rootUrl}" for callback urls`)

const strategies = require('./src/strategies')(process.env, rootUrl)
console.log(`Configured strategies: ${strategies.map(strategy => strategy.type).join('/')}`)

strategies.forEach(strategy => {
  passport.use(new strategy.Ctor(strategy.config, strategy.toUser))
  console.log(`Using login with "${strategy.type}" strategy`)
})

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

const app = express()
app.use(cookieParser())
app.use(expressSession({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())

if (strategies.length > 0) {
  app.get(
    strategies.map(strategy => `/${strategy.type}`),
    routes.onAuthenticationRequest({
      strategies,
      passport,
      tokenSecret,
      tokenCookieName,
      profileCookieName,
      cookieDomain
    })
  )

  app.get(
    strategies.map(strategy => `/${strategy.type}/callback`),
    routes.onAuthenticationCallback({
      strategies,
      passport,
      tokenSecret,
      tokenCookieName,
      profileCookieName,
      cookieDomain
    })
  )

  app.get('/logout', routes.onLogout({tokenCookieName, profileCookieName, cookieDomain}))
  app.get('/', routes.onIndex({tokenCookieName, profileCookieName}))
}

app.listen(port)
