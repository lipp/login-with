const jwt = require('jsonwebtoken')

const isFromLocalhost = (req) => (
  req.headers.host.indexOf('localhost:') === 0 &&
    decodeURIComponent(req.query.successRedirect || '').indexOf('http://localhost:') === 0
)

module.exports.onAuthenticationRequest = ({strategies, passport}) => (req, res, next) => {
  const type = req.path.split('/')[1]
  const strategy = strategies.find(strategy => strategy.type === type)
  const opts = {}
  req.session.successRedirect = req.query.successRedirect
  req.session.failureRedirect = req.query.failureRedirect
  req.session.isFromLocalhost = isFromLocalhost(req)
  if (strategy.preHook) {
    strategy.preHook(req, opts)
  }
  passport.authenticate(type, opts)(req, res, next)
}

module.exports.onAuthenticationCallback = ({strategies, passport, tokenCookieName, tokenSecret, profileCookieName, maxAge = false}) => (req, res, next) => {
  const type = req.path.split('/')[1]
  passport.authenticate(type, (error, user) => {
    if (req.session.isFromLocalhost) {
      console.log('security disabled for localhost request')
    }
    if (error && req.session.failureRedirect) {
      res.clearCookie(tokenCookieName)
      res.clearCookie(profileCookieName)
      return res.redirect(decodeURIComponent(req.session.failureRedirect))
    } else if (user && req.session.successRedirect) {
      res.cookie(tokenCookieName, jwt.sign(user, tokenSecret), {
        secure: !req.session.isFromLocalhost,
        httpOnly: true,
        maxAge: maxAge || req.session.isFromLocalhost ? 1000 * 60 : null
      })
      res.cookie(profileCookieName, JSON.stringify(user.profile), {
        secure: !req.session.isFromLocalhost,
        maxAge: maxAge || req.session.isFromLocalhost ? 1000 * 60 : null
      })
      return res.redirect(decodeURIComponent(req.session.successRedirect))
    }
    return res.json({error, user})
  })(req, res)
}

module.exports.onLogout = ({tokenCookieName, profileCookieName}) => (req, res) => {
  res.clearCookie(tokenCookieName)
  res.clearCookie(profileCookieName)
  if (req.query.successRedirect) {
    return res.redirect(decodeURIComponent(req.query.successRedirect))
  }
  return res.json({status: 'logged out'})
}
