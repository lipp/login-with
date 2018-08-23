module.exports = {
  Ctor: require('passport-spotify').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_SPOTIFY_CLIENTID
    const clientSecret = env.LW_SPOTIFY_CLIENTSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL
      }
    }
  },
  toUser: (accessToken, refreshToken, { displayName, photos }, done) => {
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        username: displayName,
        provider: 'spotify',
        photo: photos && photos[0] ? photos[0].value : null
      }
    })
  }
}
