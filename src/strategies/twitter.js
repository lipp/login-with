module.exports = {
  Ctor: require('passport-twitter').Strategy,
  getConfig: (env, callbackURL) => {
    const consumerKey = env.LW_TWITTER_CONSUMERKEY
    const consumerSecret = env.LW_TWITTER_CONSUMERSECRET
    if (consumerKey && consumerSecret) {
      return {
        consumerKey,
        consumerSecret,
        callbackURL
      }
    }
  },
  toUser: (token, tokenSecret, profile, done) => {
    const {photos, provider, username, displayName} = profile
    done(null, {
      token,
      tokenSecret,
      profile: {
        username,
        provider,
        photo: photos[0].value,
        name: displayName
      }
    })
  }
}
