const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const strategies = require('./src/strategies')
const routes = require('./src/routes')

const port = parseInt(process.argv[2], 10) || 3000

const profileCookieName = process.env.LW_PROFILE_COOKIENAME || 'profile'
const tokenCookieName = process.env.LW_TOKEN_COOKIENAME || 'token'
const tokenSecret = process.env.LW_TOKEN_SECRET
const sessionSecret = process.env.LW_SESSION_SECRET
const subDomain = process.env.LW_SUBDOMAIN || `localhost:${port}`
const protocol = process.env.LW_SUBDOMAIN ? 'https:/' : 'http:/'

if (!tokenSecret) {
  console.error('no LW_TOKEN_SECRET env variable specified')
  process.exit(1)
}

console.log(`Using subdomain "${subDomain}" for callback urls`)
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
      profileCookieName
    })
  )

  app.get(
    strategies.map(strategy => `/${strategy.type}/callback`),
    routes.onAuthenticationCallback({
      strategies,
      passport,
      tokenCookieName,
      profileCookieName
    })
  )

  app.get('/logout', routes.onLogout)
}

app.listen(port)
