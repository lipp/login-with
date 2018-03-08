/* globals describe it */
const opts = require('../src/opts')
const assert = require('assert')

describe('the opts module', () => {
  it('should return reasonable defaults', () => {
    assert.deepEqual(opts([], {}), {
      tokenSecret: undefined,
      sessionSecret: undefined,
      cookieDomain: undefined,
      profileCookieName: 'profile',
      tokenCookieName: 'jwt',
      protocol: 'http:/',
      maxAge: 1000 * 60 * 60 * 24 * 10,
      port: 3000,
      subDomain: 'localhost:3000'
    })
  })

  it('should use LW_JWT_SECRET and LW_SESSION_SECRET', () => {
    const {tokenSecret, sessionSecret} = opts([], {
      LW_SESSION_SECRET: 'foo',
      LW_JWT_SECRET: 'bar'
    })
    assert.equal(tokenSecret, 'bar')
    assert.equal(sessionSecret, 'foo')
  })

  it('should set protocol to https:/ if LW_SUBDOMAIN is defined', () => {
    const {protocol} = opts([], {
      LW_SUBDOMAIN: 'foo'
    })
    assert.equal(protocol, 'https:/')
  })

  it('should set maxAge to LW_COOKIE_MAXAGE', () => {
    const {maxAge} = opts([], {
      LW_COOKIE_MAXAGE: 'foo'
    })
    assert.equal(maxAge, 'foo')
  })

  it('should set port to PORT', () => {
    const {port} = opts([], {
      PORT: 3002
    })
    assert.equal(port, 3002)
  })

  it('should set port to argv[2]', () => {
    const {port} = opts([0, 0, '3003'], {})
    assert.equal(port, 3003)
  })

  it('should set LW_SUBDOMAIN', () => {
    const {subDomain} = opts([], {LW_SUBDOMAIN: 'foo'})
    assert.equal(subDomain, 'foo')
  })

  it('should set LW_COOKIE_DOMAIN', () => {
    const {cookieDomain} = opts([], {LW_COOKIE_DOMAIN: 'foo'})
    assert.equal(cookieDomain, 'foo')
  })

  it('should set cookieDomain to LW_SUBDOMAIN without last sub', () => {
    const {cookieDomain} = opts([], {LW_SUBDOMAIN: 'login.foo.com'})
    assert.equal(cookieDomain, '.foo.com')
  })
})
