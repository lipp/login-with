module.exports = (argv, env) => {
  const tenDays = 1000 * 60 * 60 * 24 * 10
  const port = env.PORT || parseInt(argv[2], 10) || 3000
  const subDomain = env.LW_SUBDOMAIN || `localhost:${port}`
  return {
    profileCookieName: env.LW_PROFILE_COOKIENAME || 'profile',
    tokenCookieName: env.LW_JWT_COOKIENAME || 'jwt',
    tokenSecret: env.LW_JWT_SECRET,
    sessionSecret: env.LW_SESSION_SECRET,
    cookieDomain: env.LW_SUBDOMAIN ? '.' + subDomain.split('.').slice(1).join('.') : null,
    protocol: env.LW_SUBDOMAIN ? 'https:/' : 'http:/',
    tenDays: 1000 * 60 * 60 * 24 * 10,
    maxAge: env.LW_COOKIE_MAXAGE || tenDays,
    port,
    subDomain
  }
}
