const Strategy = require('passport-strategy')

class TestStrategy extends Strategy {
  constructor (...args) {
    super(...args)
    this.name = 'test'
  }
  authenticate (req, options) {
    if (req.session._test_once) {
      this.success({displayName: 'foo', id: 2138716238765, provider: 'test'})
    } else {
      req.session._test_once = true
      this.redirect('http://localhost:3002/test/callback')
    }
  }
}

module.exports = {
  Ctor: TestStrategy
}
