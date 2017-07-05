module.exports = (argv, env) => {
  const tenDays = 1000 * 60 * 60 * 24 * 10
  const port = process.env.PORT || parseInt(process.argv[2], 10) || 3000
  const subDomain = process.env.LW_SUBDOMAIN || `localhost:${port}`
  return {
    profileCookieName: process.env.LW_PROFILE_COOKIENAME || 'profile',
    tokenCookieName: process.env.LW_JWT_COOKIENAME || 'jwt',
    tokenSecret: process.env.LW_JWT_SECRET,
    sessionSecret: process.env.LW_SESSION_SECRET,
    cookieDomain: process.env.LW_SUBDOMAIN ? '.' + subDomain.split('.').slice(1).join('.') : null,
    protocol: process.env.LW_SUBDOMAIN ? 'https:/' : 'http:/',
    tenDays: 1000 * 60 * 60 * 24 * 10,
    maxAge: process.env.LW_COOKIE_MAXAGE || tenDays,
    port,
    subDomain
  }
}
