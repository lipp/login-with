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
    const nameParts = profile.displayName ? profile.displayName.split(' ') : []
    let avatar
    try {
      avatar = JSON.parse(profile._raw).avatar_url
    } catch (error) {}
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        displayName: profile.username,
        name: {
          familyName: nameParts[nameParts.length - 1],
          givenName: nameParts[0]
        },
        provider: 'github',
        photo: avatar
      }
    })
  }
}
