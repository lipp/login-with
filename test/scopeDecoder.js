/* globals describe it */
const assert = require('assert')

const scopeDecoder = require('../src/scopeDecoder')

describe('scope handling', () => {
  describe('scope decoding', () => {
    it('decodes scopes into an array of scopes', () => {
      const cases = [
        ['x', ['x']],
        ['x y z', ['x', 'y', 'z']],
        ['x%20y%20z', ['x', 'y', 'z']],
        ['x+y+z', ['x', 'y', 'z']]
      ]
      cases.forEach(testCase => {
        assert.deepEqual(scopeDecoder(testCase[0]), testCase[1])
      })
    })
    it('does not process arrays', () => {
      const testCase = ['x', 'y', 'z']
      assert.deepEqual(scopeDecoder(testCase), testCase)
    })
  })
})
