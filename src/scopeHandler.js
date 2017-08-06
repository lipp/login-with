const qs = require('querystring')

const scopes = {
  decode: function (scopesString) {
    if (Array.isArray(scopesString)) {
      return scopesString
    }
    const decodedScopes = qs.parse(`scope=${scopesString}`)
    return decodedScopes.scope.split(' ')
  }
}

module.exports = scopes
