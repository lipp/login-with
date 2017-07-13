/* globals describe it beforeEach  */
const routes = require('../src/routes')
const assert = require('assert')
const jwt = require('jsonwebtoken')

describe('the routes module', () => {
  describe('onAuthenticationRequest', () => {
    let req
    let res
    let next

    beforeEach(() => {
      req = {
        query: {
          success: 1,
          failure: 2
        },
        session: {}
      }
      res = 'res'
      next = 'next'
    })

    it('calls passport.authenticate without preHook', done => {
      req.path = '/foo'
      routes({
        strategies: [{type: 'foo'}],
        passport: {
          authenticate: (type, opts) => (_req, _res, _next) => {
            assert.equal(type, 'foo')
            assert.deepEqual(opts, {})
            assert.equal(_req, req)
            assert.equal(_res, res)
            assert.equal(_next, next)
            assert.equal(_req.session.success, req.query.success)
            assert.equal(_req.session.failure, req.query.failure)
            done()
          }
        }
      }).onAuthenticationRequest(req, res, next)
    })

    it('calls passport.authenticate with preHook', done => {
      req.path = '/foo'
      routes({
        strategies: [{
          type: 'foo',
          preHook: (req, opts) => {
            req.session.BAR = 123
            opts.random = 333
          }
        }],
        passport: {
          authenticate: (type, opts) => (_req, _res, _next) => {
            assert.equal(type, 'foo')
            assert.deepEqual(opts, {random: 333})
            assert.equal(req.session.BAR, 123)
            assert.equal(_req, req)
            assert.equal(_res, res)
            assert.equal(_next, next)
            assert.equal(_req.session.success, req.query.success)
            assert.equal(_req.session.failure, req.query.failure)
            done()
          }
        }
      }).onAuthenticationRequest(req, res, next)
    })
  })

  it('onIndex calls res.json({token, profile})', done => {
    const res = {
      json: object => {
        assert.equal(object.token, req.cookies.token)
        assert.deepEqual(object.profile, req.cookies.profile)
        done()
      }
    }
    const req = {
      cookies: {
        token: 'asd.fhfj.ppp',
        profile: {
          displayName: 'foo'
        }
      }
    }
    routes({tokenCookieName: 'token', profileCookieName: 'profile'}).onIndex(req, res)
  })

  it('onLogout clears cookies', done => {
    const req = {
      query: {
        success: encodeURIComponent('http://foo.bar/login')
      }
    }
    let profileDeleted
    let tokenDeleted
    const res = {
      cookie: (name, content, opts) => {
        assert.equal(content, '')
        assert(opts.secure)
        assert(opts.expires <= new Date())
        assert.equal(opts.domain, '.foo.bar')
        if (name === 'profile') {
          assert(!opts.httpOnly)
          profileDeleted = true
        }
        if (name === 'token') {
          assert(opts.httpOnly)
          tokenDeleted = true
        }
      },
      redirect: location => {
        assert.equal(location, 'http://foo.bar/login')
        assert(profileDeleted && tokenDeleted)
        done()
      }
    }
    routes({
      tokenCookieName: 'token',
      profileCookieName: 'profile',
      cookieDomain: '.foo.bar'
    }).onLogout(req, res)
  })

  it('onLogout calls res.json({status}) if no req.query.success', done => {
    const req = {
      query: {}
    }
    const res = {
      cookie: () => {},
      redirect: () => {},
      json: object => {
        assert.deepEqual(object, {
          status: 'logged out'
        })
        done()
      }
    }
    routes({
      tokenCookieName: 'token',
      profileCookieName: 'profile',
      cookieDomain: '.foo.bar'
    }).onLogout(req, res)
  })

  it('onAuthenticationCallback sets cookies on success', done => {
    const req = {
      path: '/foo',
      session: {
        success: encodeURIComponent('http://foo.bar/ok')
      }
    }
    const user = {
      accessToken: 'asdlaksjd',
      profile: {
        displayName: 'baz'
      }
    }
    const secret = 'asdlkjasdlkjasd'
    let profileSet
    let tokenSet
    const res = {
      cookie: (name, content, opts) => {
        assert(opts.secure)
        assert.equal(opts.maxAge, 1000)
        assert.equal(opts.domain, '.foo.bar')
        if (name === 'profile') {
          assert(!opts.httpOnly)
          assert.equal(content, JSON.stringify(user.profile))
          profileSet = true
        }
        if (name === 'token') {
          assert(opts.httpOnly)
          const decrypted = jwt.verify(content, secret)
          assert.deepEqual(decrypted.profile, user.profile)
          assert.equal(decrypted.accessToken, user.accessToken)
          tokenSet = true
        }
      },
      redirect: location => {
        assert.equal(location, 'http://foo.bar/ok')
        assert(profileSet && tokenSet)
        done()
      }
    }
    routes({
      passport: {
        authenticate: (type, next) => (_req, _res) => {
          assert.equal(type, 'foo')
          next(null, user)
        }
      },
      tokenCookieName: 'token',
      profileCookieName: 'profile',
      cookieDomain: '.foo.bar',
      tokenSecret: secret,
      maxAge: 1000
    }).onAuthenticationCallback(req, res)
  })

  it('onAuthenticationCallback clear cookies on error', done => {
    const req = {
      path: '/foo',
      session: {
        failure: encodeURIComponent('http://foo.bar/fail')
      }
    }
    const error = 'foo'
    const secret = 'asdlkjasdlkjasd'
    let tokenDeleted
    let profileDeleted
    const res = {
      cookie: (name, content, opts) => {
        assert(opts.secure)
        assert(opts.expires <= new Date())
        assert.equal(opts.domain, '.foo.bar')
        if (name === 'profile') {
          assert.equal(content, JSON.stringify({error}))
          assert(!opts.httpOnly)
          profileDeleted = true
        }
        if (name === 'token') {
          assert.equal(content, '')
          assert(opts.httpOnly)
          tokenDeleted = true
        }
      },
      redirect: location => {
        assert.equal(location, 'http://foo.bar/fail')
        assert(profileDeleted && tokenDeleted)
        done()
      }
    }
    routes({
      passport: {
        authenticate: (type, next) => (_req, _res) => {
          assert.equal(type, 'foo')
          next(error)
        }
      },
      tokenCookieName: 'token',
      profileCookieName: 'profile',
      cookieDomain: '.foo.bar',
      tokenSecret: secret,
      maxAge: 1000
    }).onAuthenticationCallback(req, res)
  })

  it('onAuthenticationCallback treats no user as an error', done => {
    const req = {
      path: '/foo',
      session: {
        failure: encodeURIComponent('http://foo.bar/fail')
      }
    }
    const error = 'No user was returned'
    const secret = 'asdlkjasdlkjasd'
    let tokenDeleted
    let profileDeleted
    const res = {
      cookie: (name, content, opts) => {
        assert(opts.secure)
        assert(opts.expires <= new Date())
        assert.equal(opts.domain, '.foo.bar')
        if (name === 'profile') {
          assert.equal(content, JSON.stringify({error}))
          assert(!opts.httpOnly)
          profileDeleted = true
        }
        if (name === 'token') {
          assert.equal(content, '')
          assert(opts.httpOnly)
          tokenDeleted = true
        }
      },
      redirect: location => {
        assert.equal(location, 'http://foo.bar/fail')
        assert(profileDeleted && tokenDeleted)
        done()
      }
    }
    routes({
      passport: {
        authenticate: (type, next) => (_req, _res) => {
          assert.equal(type, 'foo')
          next(null, null)
        }
      },
      tokenCookieName: 'token',
      profileCookieName: 'profile',
      cookieDomain: '.foo.bar',
      tokenSecret: secret,
      maxAge: 1000
    }).onAuthenticationCallback(req, res)
  })

  it('onAuthenticationCallback call res.json if redirect specified', done => {
    const req = {
      path: '/foo',
      session: {}
    }
    const error = 'foo'
    const user = 123
    const secret = 'asdlkjasdlkjasd'
    const res = {
      cookie: () => {},
      json: object => {
        assert.equal(object.error, error)
        assert.equal(object.user, user)
        done()
      }
    }
    routes({
      passport: {
        authenticate: (type, next) => (_req, _res) => {
          assert.equal(type, 'foo')
          next(error, user)
        }
      },
      tokenCookieName: 'token',
      profileCookieName: 'profile',
      cookieDomain: '.foo.bar',
      tokenSecret: secret,
      maxAge: 1000
    }).onAuthenticationCallback(req, res)
  })
})
