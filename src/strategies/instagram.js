module.exports = {
  Ctor: require('passport-instagram').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_INSTAGRAM_CLIENTID
    const clientSecret = env.LW_INSTAGRAM_CLIENTSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL
      }
    }
  },
  toUser: (token, tokenSecret, profile, done) => {
    const {provider, username, displayName, _json} = profile
    done(null, {
      token,
      tokenSecret,
      profile: {
        username,
        provider,
        photo: _json.data.profile_picture,
        name: displayName
      }
    })
  }
}
