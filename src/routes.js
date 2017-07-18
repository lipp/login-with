const jwt = require('jsonwebtoken')

const cookieOpts = ({httpOnly, reset = false, domain, maxAge = false}) => ({
  secure: true,
  httpOnly,
  domain,
  expires: reset ? new Date() : null,
  maxAge: !reset ? maxAge : maxAge
})

module.exports = ({
    strategies,
    passport,
    tokenCookieName,
    tokenSecret,
    profileCookieName,
    cookieDomain,
    maxAge = false
  }) => ({
    onAuthenticationRequest: (req, res, next) => {
      const type = req.path.split('/')[1]
      const strategy = strategies.find(strategy => strategy.type === type)
      const opts = {}
      req.session.success = req.query.success
      req.session.failure = req.query.failure
      if (strategy.preHook) {
        strategy.preHook(req, opts)
      }
      passport.authenticate(type, opts)(req, res, next)
    },
    onAuthenticationCallback: (req, res, next) => {
      const type = req.path.split('/')[1]
      passport.authenticate(type, (error, user) => {
        if (error || !user) {
          res.cookie(tokenCookieName, '', cookieOpts({
            reset: true,
            httpOnly: true,
            domain: cookieDomain
          }))
          res.cookie(profileCookieName, JSON.stringify({error: error || 'No user was returned'}), cookieOpts({
            httpOnly: false,
            domain: cookieDomain,
            maxAge
          }))
          if (req.session.failure) {
            return res.redirect(decodeURIComponent(req.session.failure))
          }
        } else if (user) {
          res.cookie(tokenCookieName, jwt.sign(user, tokenSecret), cookieOpts({
            httpOnly: true,
            domain: cookieDomain,
            maxAge
          }))
          res.cookie(profileCookieName, JSON.stringify(user.profile), cookieOpts({
            httpOnly: false,
            domain: cookieDomain,
            maxAge
          }))
          if (req.session.success) {
            return res.redirect(decodeURIComponent(req.session.success))
          }
        }
        return res.json({error, user})
      })(req, res)
    },
    onLogout: (req, res) => {
      res.cookie(tokenCookieName, '', cookieOpts({
        reset: true,
        httpOnly: true,
        domain: cookieDomain
      }))
      res.cookie(profileCookieName, '', cookieOpts({
        reset: true,
        httpOnly: false,
        domain: cookieDomain
      }))
      if (req.query.success) {
        return res.redirect(decodeURIComponent(req.query.success))
      }
      return res.json({status: 'logged out'})
    },
    onIndex: (req, res) => {
      return res.json({token: req.cookies[tokenCookieName], profile: req.cookies[profileCookieName]})
    }
  })
