/* globals describe it beforeEach afterEach */
const routes = require('../src/routes')
const sinon = require('sinon')
const assert = require('assert')

describe('the routes module', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })
  
  describe('onAuthenticationRequest', () => {
    let passport
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
      passport = {}
    })

    it('calls passport.authenticate without preHook', done => {
      req.path = '/foo'
      passport.authenticate = (type, opts) => (_req, _res, _next) => {
        assert.equal(type, 'foo')
        assert.deepEqual(opts, {})
        assert.equal(_req, req)
        assert.equal(_res, res)
        assert.equal(_next, next)
        assert.equal(_req.session.success, req.query.success)
        assert.equal(_req.session.failure, req.query.failure)
        done()
      }
      routes.onAuthenticationRequest({
        strategies: [{type: 'foo'}],
        passport
      })(req, res, next)
    })

    it('calls passport.authenticate with preHook', done => {
      req.path = '/foo'
      passport.authenticate = (type, opts) => (_req, _res, _next) => {
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
      routes.onAuthenticationRequest({
        strategies: [{
          type: 'foo',
          preHook: (req, opts) => {
            req.session.BAR = 123
            opts.random = 333
          }
        }],
        passport
      })(req, res, next)
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
    routes.onIndex({tokenCookieName: 'token', profileCookieName: 'profile'})(req, res)
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
    routes.onLogout({
      tokenCookieName: 'token', 
      profileCookieName: 'profile',
      cookieDomain: '.foo.bar'
    })(req, res)
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
    routes.onLogout({
      tokenCookieName: 'token', 
      profileCookieName: 'profile',
      cookieDomain: '.foo.bar'
    })(req, res)
  })
})
