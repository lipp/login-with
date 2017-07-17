/* globals describe it  before */
const load = require('../src/strategies')
const github = require('../src/strategies/github')
const google = require('../src/strategies/google')
const test = require('../src/strategies/test')
const reddit = require('../src/strategies/reddit')
const twitter = require('../src/strategies/twitter')
const facebook = require('../src/strategies/facebook')
const instagram = require('../src/strategies/instagram')
const mixer = require('../src/strategies/mixer')
const linkedin = require('../src/strategies/linkedin')
const assert = require('assert')

describe('the strategies module', () => {
  const rootUrl = 'https://foo.bar'

  describe('facebook', () => {
    let strategies
    before(() => {
      const env = {}
      env.LW_FACEBOOK_APPID = 123
      env.LW_FACEBOOK_APPSECRET = 432
      strategies = load(env, rootUrl)
    })

    it('gets loaded', () => {
      assert.equal(strategies.length, 1)
      assert.equal(strategies[0].type, 'facebook')
    })

    it('config is correct', () => {
      assert.deepEqual(strategies[0].config, {
        clientID: 123,
        clientSecret: 432,
        callbackURL: 'https://foo.bar/facebook/callback',
        profileFields: ['displayName', 'name', 'photos']
      })
    })

    it('toUser (with family and given name)', done => {
      const fbInfo = {
        displayName: 'pop',
        photos: [{
          value: 'bar'
        }],
        name: {
          familyName: 'doe',
          givenName: 'john'
        }
      }
      facebook.toUser(123, 345, fbInfo, (error, user) => {
        assert(!error)
        assert.equal(user.accessToken, 123)
        assert.equal(user.refreshToken, 345)
        assert.deepEqual(user.profile, {
          username: 'pop',
          name: 'john doe',
          photo: 'bar',
          provider: 'facebook'
        })
        done()
      })
    })

    it('toUser (with given name)', done => {
      const fbInfo = {
        displayName: 'pop',
        photos: [{
          value: 'bar'
        }],
        name: {
          givenName: 'john'
        }
      }
      facebook.toUser(123, 345, fbInfo, (error, user) => {
        assert(!error)
        assert.equal(user.accessToken, 123)
        assert.equal(user.refreshToken, 345)
        assert.deepEqual(user.profile, {
          username: 'pop',
          name: 'john',
          photo: 'bar',
          provider: 'facebook'
        })
        done()
      })
    })

    it('toUser (with family name)', done => {
      const fbInfo = {
        displayName: 'pop',
        photos: [{
          value: 'bar'
        }],
        name: {
          familyName: 'doe'
        }
      }
      facebook.toUser(123, 345, fbInfo, (error, user) => {
        assert(!error)
        assert.equal(user.accessToken, 123)
        assert.equal(user.refreshToken, 345)
        assert.deepEqual(user.profile, {
          username: 'pop',
          name: 'doe',
          photo: 'bar',
          provider: 'facebook'
        })
        done()
      })
    })
  })

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

  describe('linkedin', () => {
    let strategies
    before(() => {
      const env = {}
      env.LW_LINKEDIN_CLIENTID = 123
      env.LW_LINKEDIN_CLIENTSECRET = 432
      strategies = load(env, rootUrl)
    })

    it('gets loaded', () => {
      assert.equal(strategies.length, 1)
      assert.equal(strategies[0].type, 'linkedin')
    })

    it('config is correct', () => {
      assert.deepEqual(strategies[0].config, {
        clientID: 123,
        clientSecret: 432,
        callbackURL: 'https://foo.bar/linkedin/callback',
        state: true
      })
    })

    it('toUser (with family and given name)', done => {
      const linkedinInfo = {
        displayName: 'pop',
        photos: [{
          value: 'bar'
        }],
        name: {
          familyName: 'doe',
          givenName: 'john'
        }
      }
      linkedin.toUser(123, 345, linkedinInfo, (error, user) => {
        assert(!error)
        assert.equal(user.accessToken, 123)
        assert.equal(user.refreshToken, 345)
        assert.deepEqual(user.profile, {
          username: 'pop',
          name: 'john doe',
          photo: 'bar',
          provider: 'linkedin'
        })
        done()
      })
    })

    it('toUser (with given name)', done => {
      const linkedinInfo = {
        displayName: 'pop',
        photos: [{
          value: 'bar'
        }],
        name: {
          givenName: 'john'
        }
      }
      linkedin.toUser(123, 345, linkedinInfo, (error, user) => {
        assert(!error)
        assert.equal(user.accessToken, 123)
        assert.equal(user.refreshToken, 345)
        assert.deepEqual(user.profile, {
          username: 'pop',
          name: 'john',
          photo: 'bar',
          provider: 'linkedin'
        })
        done()
      })
    })

    it('toUser (with family name)', done => {
      const linkedinInfo = {
        displayName: 'pop',
        photos: [{
          value: 'bar'
        }],
        name: {
          familyName: 'doe'
        }
      }
      linkedin.toUser(123, 345, linkedinInfo, (error, user) => {
        assert(!error)
        assert.equal(user.accessToken, 123)
        assert.equal(user.refreshToken, 345)
        assert.deepEqual(user.profile, {
          username: 'pop',
          name: 'doe',
          photo: 'bar',
          provider: 'linkedin'
        })
        done()
      })
    })
  })

  describe('google', () => {
    let strategies
    before(() => {
      const env = {}
      env.LW_GOOGLE_CLIENTID = 123
      env.LW_GOOGLE_CLIENTSECRET = 432
      strategies = load(env, rootUrl)
    })

    it('gets loaded', () => {
      assert.equal(strategies.length, 1)
      assert.equal(strategies[0].type, 'google')
    })

    it('config is correct', () => {
      assert.deepEqual(strategies[0].config, {
        clientID: 123,
        clientSecret: 432,
        callbackURL: 'https://foo.bar/google/callback'
      })
    })

    it('preHook', () => {
      const opts = {}
      google.preHook(undefined, opts)
      assert.deepEqual(opts.scope, ['profile'])
    })

    it('toUser', done => {
      const googleInfo = {
        displayName: 'Foo Bar',
        photos: [{
          value: 'asd'
        }]
      }
      google.toUser(123, 345, googleInfo, (error, user) => {
        assert(!error)
        assert.equal(user.accessToken, 123)
        assert.equal(user.refreshToken, 345)
        assert.deepEqual(user.profile, {
          username: 'Foo Bar',
          name: 'Foo Bar',
          photo: 'asd',
          provider: 'google'
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

  describe('instagram', () => {
    let strategies
    before(() => {
      const env = {}
      env.LW_INSTAGRAM_CLIENTID = 123
      env.LW_INSTAGRAM_CLIENTSECRET = 432
      strategies = load(env, rootUrl)
    })

    it('gets loaded', () => {
      assert.equal(strategies.length, 1)
      assert.equal(strategies[0].type, 'instagram')
    })

    it('config is correct', () => {
      assert.deepEqual(strategies[0].config, {
        clientID: 123,
        clientSecret: 432,
        callbackURL: 'https://foo.bar/instagram/callback'
      })
    })

    it('toUser', done => {
      const instagramInfo = {
        provider: 'instagram',
        displayName: 'Foo Bar',
        username: 'pop',
        _json: { data: { profile_picture: 'asd' } }
      }
      instagram.toUser(123, 345, instagramInfo, (error, user) => {
        assert(!error)
        assert.equal(user.token, 123)
        assert.equal(user.tokenSecret, 345)
        assert.deepEqual(user.profile, {
          username: 'pop',
          name: 'Foo Bar',
          photo: 'asd',
          provider: 'instagram'
        })
        done()
      })
    })
  })

  describe('mixer', () => {
    let strategies
    before(() => {
      const env = {}
      env.LW_MIXER_CLIENTID = 123
      env.LW_MIXER_CLIENTSECRET = 432
      strategies = load(env, rootUrl)
    })

    it('gets loaded', () => {
      assert.equal(strategies.length, 1)
      assert.equal(strategies[0].type, 'mixer')
    })

    it('config is correct', () => {
      assert.deepEqual(strategies[0].config, {
        clientID: 123,
        clientSecret: 432,
        scope: ['channel:details:self'],
        callbackURL: 'https://foo.bar/mixer/callback'
      })
    })

    it('toUser', done => {
      const mixerInfo = {
        username: 'pop',
        _raw: {
          avatarUrl: 'asd'
        }
      }
      mixer.toUser(123, 345, mixerInfo, (error, user) => {
        assert(!error)
        assert.equal(user.accessToken, 123)
        assert.equal(user.refreshToken, 345)
        assert.deepEqual(user.profile, {
          username: 'pop',
          photo: 'asd',
          provider: 'mixer'
        })
        done()
      })
    })
  })
})
