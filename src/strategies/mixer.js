module.exports = {
  Ctor: require('passport-mixer').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_MIXER_CLIENTID
    const clientSecret = env.LW_MIXER_CLIENTSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL,
        scope: ['channel:details:self', 'user:details:self']
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
        provider: 'mixer'
      }
    })
  }
}
