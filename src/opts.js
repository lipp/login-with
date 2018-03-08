const getCookieDomain = (env) => {
  if (env.LW_COOKIE_DOMAIN) {
    return env.LW_COOKIE_DOMAIN
  }
  if (env.LW_SUBDOMAIN) {
    return '.' + env.LW_SUBDOMAIN.split('.').slice(1).join('.')
  }
}

module.exports = (argv, env) => {
  const tenDays = 1000 * 60 * 60 * 24 * 10
  const port = env.PORT || parseInt(argv[2], 10) || 3000
  return {
    profileCookieName: env.LW_PROFILE_COOKIENAME || 'profile',
    tokenCookieName: env.LW_JWT_COOKIENAME || 'jwt',
    tokenSecret: env.LW_JWT_SECRET,
    sessionSecret: env.LW_SESSION_SECRET,
    cookieDomain: getCookieDomain(env),
    protocol: env.LW_SUBDOMAIN ? 'https:/' : 'http:/',
    maxAge: env.LW_COOKIE_MAXAGE || tenDays,
    port,
    subDomain: env.LW_SUBDOMAIN || `localhost:${port}`
  }
}
