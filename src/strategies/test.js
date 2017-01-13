const Strategy = require('passport-strategy')

class TestStrategy extends Strategy {
  constructor (config, verify) {
    super(config, verify)
    this.name = 'test'
    this._verify = verify
    this._callbackURL = config.callbackURL
  }
  authenticate (req, options) {
    if (req.session._test_once) {
      const profile = {displayName: 'foo', id: 2138716238765, provider: 'test'}
      this._verify(profile, (error, user) => {
        req.session._test_once = false
        if (error) {
          this.fail(error)
        } else {
          this.success(user)
        }
      })
    } else {
      req.session._test_once = true
      this.redirect(this._callbackURL)
    }
  }
}

module.exports = {
  Ctor: TestStrategy,
  getConfig: (env, callbackURL) => ({callbackURL}),
  toUser: (profile, done) => done(null, {profile})
}
