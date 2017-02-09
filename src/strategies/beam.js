module.exports = {
  Ctor: require('passport-beam').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_BEAM_CLIENTID
    const clientSecret = env.LW_BEAM_CLIENTSECRET
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
      avatar = JSON.parse(profile._raw).avatarUrl
    } catch (error) {}
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        username: profile.username,
        photo: avatar,
        provider: 'beam'
      }
    })
  }
}
