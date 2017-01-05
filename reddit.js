module.exports = {
  Ctor: require('passport-reddit').Strategy,
  credsType: 'client',
  preHook: (req, opts) => {
    req.session.state = require('crypto').randomBytes(32).toString('hex')
    opts.state = req.session.state
    opts.duration = 'permanent'
  }
}
