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

module.exports.onAuthenticationCallback = ({strategies, passport, tokenCookieName, tokenSecret, profileCookieName, cookieDomain, maxAge = false}) => (req, res, next) => {
  const type = req.path.split('/')[1]
  passport.authenticate(type, (error, user) => {
    if (req.session.isFromLocalhost) {
      console.log('security disabled for localhost request')
    }
    console.log(error, user)
    if (error && req.session.failureRedirect) {
      console.log('failire')
      res.cookie(tokenCookieName, '', {expires: new Date()})
      res.cookie(profileCookieName, '', {expires: new Date()})
      return res.redirect(decodeURIComponent(req.session.failureRedirect))
    } else if (user && req.session.successRedirect) {
      console.log('success', req.session.isFromLocalhost)
      const oneMinute = 1000 * 60
      const tenDays = oneMinute * 60 * 24 * 10
      res.cookie(tokenCookieName, jwt.sign(user, tokenSecret), {
        secure: !req.session.isFromLocalhost,
        httpOnly: true,
        maxAge: maxAge || req.session.isFromLocalhost ? oneMinute : tenDays,
        domain: req.session.isFromLocalhost ? null : cookieDomain
      })
      res.cookie(profileCookieName, JSON.stringify(user.profile), {
        secure: !req.session.isFromLocalhost,
        maxAge: maxAge || req.session.isFromLocalhost ? oneMinute : tenDays,
        domain: req.session.isFromLocalhost ? null : cookieDomain
      })
      return res.redirect(decodeURIComponent(req.session.successRedirect))
    }
    return res.json({error, user})
  })(req, res)
}

module.exports.onLogout = ({tokenCookieName, profileCookieName, cookieDomain}) => (req, res) => {
  res.cookie(tokenCookieName, '', {
    secure: !req.session.isFromLocalhost,
    httpOnly: true,
    expires: new Date(),
    domain: req.session.isFromLocalhost ? null : cookieDomain
  })
  res.cookie(profileCookieName, '', {
    secure: !req.session.isFromLocalhost,
    expires: new Date(),
    domain: req.session.isFromLocalhost ? null : cookieDomain
  })
  if (req.query.successRedirect) {
    return res.redirect(decodeURIComponent(req.query.successRedirect))
  }
  return res.json({status: 'logged out'})
}

module.exports.onIndex = ({tokenCookieName, profileCookieName}) => (req, res) => {
  return res.json({token: req.cookies[tokenCookieName], profile: req.cookies[profileCookieName]})
}
