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
    const {photos, provider} = profile
    const nameParts = profile.displayName ? profile.displayName.split(' ') : []
    done(null, {
      token,
      tokenSecret,
      profile: {
        displayName: profile.username,
        provider,
        photo: photos[0].value,
        name: {
          givenName: nameParts[0],
          familyName: nameParts[nameParts.length - 1]
        }
      }
    })
  }
}
