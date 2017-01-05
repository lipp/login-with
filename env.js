module.exports = {
  clientCreds: type => {
    const TYPE = type.toUpperCase()
    return {
      clientID: process.env[`LW_${TYPE}_CLIENTID`],
      clientSecret: process.env[`LW_${TYPE}_CLIENTSECRET`]
    }
  },
  consumerCreds: type => {
    const TYPE = type.toUpperCase()
    return {
      consumerKey: process.env[`LW_${TYPE}_CONSUMERKEY`],
      consumerSecret: process.env[`LW_${TYPE}_CONSUMERSECRET`]
    }
  }
}
