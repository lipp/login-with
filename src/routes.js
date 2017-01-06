const ursa = require('ursa')

module.exports.onAuthenticationRequest = (strategies, passport) => (req, res, next) => {
  const type = req.path.split('/')[1]
  console.log(req.path, type)
  const strategy = strategies.find(strategy => strategy.type === type)
  const opts = {}
  req.session.successRedirect = req.query.successRedirect
  req.session.failureRedirect = req.query.failureRedirect
  req.session.pubkey = req.query.pubkey
  req.session.fromLocalhost = req.headers.referrer.indexOf('http://localhost:3000') === 0
  if (strategy.preHook) {
    strategy.preHook(req, opts)
  }
  passport.authenticate(type, opts)(req, res, next)
}

module.exports.onAuthenticationCallback = (strategies, passport, cookieDomain) => (req, res, next) => {
  const type = req.path.split('/')[1]
  passport.authenticate(type, (error, user) => {
    const cookieOpts = {}
    if (req.session.fromLocalhost) {
      const oneMinute = 1000 * 60
      cookieOpts.maxAge = oneMinute
    } else {
      cookieOpts.domain = cookieDomain
      cookieOpts.secore = true
    }
    const cookieName = req.session.pubkey
    const pubkey = ursa.createPublicKey(decodeURIComponent(req.session.pubkey))
    const cookieValue = pubkey.encrypt(JSON.stringify({error, user}), 'utf8', 'hex')
    res.clearCookie(cookieName)
    if (error && req.session.failureRedirect) {
      res.cookie(cookieName, cookieValue, cookieOpts)
      return res.redirect(decodeURIComponent(req.session.failureRedirect))
    } else if (user && req.session.successRedirect) {
      res.cookie(cookieName, cookieValue, cookieOpts)
      return res.redirect(decodeURIComponent(req.session.successRedirect))
    }
    return res.json({error, user})
  })(req, res)
}

module.exports.onLogout = (req, res) => {
  res.clearCookie('user')
  res.clearCookie('error')
  if (req.query.redirect) {
    return res.redirect(req.query.redirect)
  }
  return res.json({status: 'logged out'})
}
