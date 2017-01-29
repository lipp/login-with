/* globals describe it  beforeEach */
const load = require('../src/strategies')
const github = require('../src/strategies/github')
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
          displayName: 'pop',
          name: {
            givenName: 'Foo',
            familyName: 'Bar'
          },
          photo: 'asd',
          provider: 'github'
        })
        done()
      })
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
          displayName: 'pop',
          name: {
            givenName: 'Foo',
            familyName: 'Bar'
          },
          photo: 'asd',
          provider: 'twitter'
        })
        done()
      })
    })
  })
})
