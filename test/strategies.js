/* globals describe it  before */
const load = require('../src/strategies')
const github = require('../src/strategies/github')
const test = require('../src/strategies/test')
const reddit = require('../src/strategies/reddit')
const twitter = require('../src/strategies/twitter')
const assert = require('assert')

describe('the strategies module', () => {
  const rootUrl = 'https://foo.bar'

  describe('github', () => {
    let strategies
    before(() => {
      const env = {}
      env.LW_GITHUB_CLIENTID = 123
      env.LW_GITHUB_CLIENTSECRET = 432
      strategies = load(env, rootUrl)
    })

    it('gets loaded', () => {
      assert.equal(strategies.length, 1)
      assert.equal(strategies[0].type, 'github')
    })

    it('config is correct', () => {
      assert.deepEqual(strategies[0].config, {
        clientID: 123,
        clientSecret: 432,
        callbackURL: 'https://foo.bar/github/callback'
      })
    })

    it('toUser', done => {
      const githubInfo = {
        displayName: 'Foo Bar',
        username: 'pop',
        _raw: JSON.stringify({
          avatar_url: 'asd'
        })
      }
      github.toUser(123, 345, githubInfo, (error, user) => {
        assert(!error)
        assert.equal(user.accessToken, 123)
        assert.equal(user.refreshToken, 345)
        assert.deepEqual(user.profile, {
          username: 'pop',
          name: 'Foo Bar',
          photo: 'asd',
          provider: 'github'
        })
        done()
      })
    })
  })

  describe('test', () => {
    let strategies
    before(() => {
      const env = {}
      env.TEST_STRATEGY = 1
      strategies = load(env, rootUrl)
    })

    it('gets loaded', () => {
      assert.equal(strategies.length, 1)
      assert.equal(strategies[0].type, 'test')
    })

    it('config is correct', () => {
      assert.deepEqual(strategies[0].config, {
        callbackURL: 'https://foo.bar/test/callback'
      })
    })

    it('toUser', done => {
      const userInfo = {
        username: 'pop',
        provider: 'test'
      }
      test.toUser(userInfo, (error, user) => {
        assert(!error)
        assert.deepEqual(user.profile, {
          username: 'pop',
          provider: 'test'
        })
        done()
      })
    })

    describe('the TestStrategy', () => {
      it('ctor sets name to "test"', () => {
        const verify = 123
        const callbackURL = 'foo'
        const ts = new test.Ctor({callbackURL}, verify)
        assert.equal(ts.name, 'test')
        assert.equal(ts._verify, verify)
      })

      it('.authenticate once calls verifys this.redirect', done => {
        const callbackURL = 'foo'
        const verify = 123
        const ts = new test.Ctor({callbackURL}, verify)
        const req = {
          session: {}
        }
        ts.redirect = url => {
          assert.equal(url, 'foo')
          done()
        }
        ts.authenticate(req, {})
      })

      it('.authenticate twice calls verifys this.redirect', done => {
        const callbackURL = 'foo'
        const verify = (profile, f) => {
          f(null, profile)
        }
        const ts = new test.Ctor({callbackURL}, verify)
        const req = {
          session: {}
        }
        ts.redirect = () => {}
        ts.success = user => {
          assert.deepEqual(user, {
            username: 'foo',
            provider: 'test'
          })
          done()
        }
        ts.authenticate(req, {})
        ts.authenticate(req, {})
      })
    })
  })

  describe('reddit', () => {
    let strategies
    before(() => {
      const env = {}
      env.LW_REDDIT_CLIENTID = 123
      env.LW_REDDIT_CLIENTSECRET = 432
      strategies = load(env, rootUrl)
    })

    it('gets loaded', () => {
      assert.equal(strategies.length, 1)
      assert.equal(strategies[0].type, 'reddit')
    })

    it('config is correct', () => {
      assert.deepEqual(strategies[0].config, {
        clientID: 123,
        clientSecret: 432,
        callbackURL: 'https://foo.bar/reddit/callback'
      })
    })

    it('toUser', done => {
      const redditInfo = {
        name: 'pop'
      }
      reddit.toUser(123, 345, redditInfo, (error, user) => {
        assert(!error)
        assert.equal(user.accessToken, 123)
        assert.equal(user.refreshToken, 345)
        assert.deepEqual(user.profile, {
          username: 'pop',
          provider: 'reddit'
        })
        done()
      })
    })

    it('preHook', () => {
      const req = {
        session: {}
      }
      const opts = {}
      reddit.preHook(req, opts)
      assert.equal(typeof req.session.state, 'string')
      assert.equal(req.session.state, opts.state)
      assert.equal(opts.duration, 'permanent')
    })
  })

  describe('twitter', () => {
    let strategies
    before(() => {
      const env = {}
      env.LW_TWITTER_CONSUMERKEY = 123
      env.LW_TWITTER_CONSUMERSECRET = 432
      strategies = load(env, rootUrl)
    })

    it('gets loaded', () => {
      assert.equal(strategies.length, 1)
      assert.equal(strategies[0].type, 'twitter')
    })

    it('config is correct', () => {
      assert.deepEqual(strategies[0].config, {
        consumerKey: 123,
        consumerSecret: 432,
        callbackURL: 'https://foo.bar/twitter/callback'
      })
    })

    it('toUser', done => {
      const twitterInfo = {
        provider: 'twitter',
        displayName: 'Foo Bar',
        username: 'pop',
        photos: [
          {value: 'asd'}
        ]
      }
      twitter.toUser(123, 345, twitterInfo, (error, user) => {
        assert(!error)
        assert.equal(user.token, 123)
        assert.equal(user.tokenSecret, 345)
        assert.deepEqual(user.profile, {
          username: 'pop',
          name: 'Foo Bar',
          photo: 'asd',
          provider: 'twitter'
        })
        done()
      })
    })
  })
})
