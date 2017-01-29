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
})
