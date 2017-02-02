module.exports = {
  Ctor: require('passport-facebook').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_FACEBOOK_APPID
    const clientSecret = env.LW_FACEBOOK_APPSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL,
        profileFields: ['displayName', 'name', 'photos']
      }
    }
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        username: profile.displayName,
        name: profile.name,
        photo: profile.photos && profile.photos[0] ? profile.photos[0].value : null
      }
    })
  }
}
