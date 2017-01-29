module.exports = {
  Ctor: require('passport-github2').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_GITHUB_CLIENTID
    const clientSecret = env.LW_GITHUB_CLIENTSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL
      }
    }
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    let avatar
    try {
      avatar = JSON.parse(profile._raw).avatar_url
    } catch (error) {}
    const {username, displayName} = profile
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        username,
        name: displayName,
        provider: 'github',
        photo: avatar
      }
    })
  }
}
