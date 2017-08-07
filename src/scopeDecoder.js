const {parse} = require('querystring')

module.exports = (scopesString) => {
  if (Array.isArray(scopesString)) {
    return scopesString
  }
  const decodedScopes = parse(`scope=${scopesString}`)
  return decodedScopes.scope.split(' ')
}
