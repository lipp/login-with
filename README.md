[![Build Status](https://travis-ci.org/lipp/login-with.svg?branch=master)](https://travis-ci.org/lipp/login-with)
[![Coverage Status](https://coveralls.io/repos/github/lipp/login-with/badge.svg?branch=master)](https://coveralls.io/github/lipp/login-with?branch=master)

# About

Stateless authentication microservice for "login-with" functionality, supporting:

- Twitter
- GitHub
- Reddit
- Facebook
- Google
- LinkedIn
- Instagram
- Mixer
- Spotify
- Strava
- AppleID
- ... more to come (PRs welcome)

You can deploy with [`now`](https://zeit.co/now) or [`Docker`](https://www.docker.com/) (for mandatory and optional env variables see below).

```sh
$ now lipp/login-with
$ docker run lipp/login-with
```

This microservice must run in a subdomain of yours, e.g. `login.yourdomain.com`.

```html
<a href='https://login.yourdomain.com/twitter?success=ON_SUCCESS_URL&failure=ON_FAILURE_URL'>
  Login with Twitter
</a>
```

On successful login two cookies will be created:

- `jwt` - A "JSON Web Token" (JWT) containing profile information and the respective access tokens (Twitter/etc). http-only!
- `profile` - A JSON string which containing non-sensitive information (accessible from browser JS):
  - `username` - string / mandatory, the account specific user alias (e.g. Twitter name)
  - `photo` - string / optional, the account specific user image link
  - `name` - string / optional, the "real" name

The cookies will be available for your toplevel domain and all subdomains. In addition, the cookie's `secure` flag is set, which means
that your other websites/webservices must run over `https`.

# Supported by

If you want to easily add token-based authentication to your apps, feel free to check out Auth0's SDKs and free plan at [auth0.com/overview](https://auth0.com/overview?utm_source=GHsponsor&utm_medium=GHsponsor&utm_campaign=login-with&utm_content=auth) <img src="https://cdn.auth0.com/styleguide/components/1.0.8/media/logos/img/badge.svg" alt="Auth0 logo" width="20" />.

# Setup

The configuration is done by means of environment variables.

## Mandatory environment variables

- `LW_SESSION_SECRET` - The session secret used by the microservice
- `LW_JWT_SECRET` - The secret to sign the JSON Web Token (JWT)
- `LW_SUBDOMAIN` - The subdomain this microservice runs, e.g. `login.yourdomain.com`.
  All other subdomains (e.g. `api.yourdomain.com`) and the top-level (e.g. `yourdomain.com`)

## Optional environment variables

- `LW_COOKIE_MAXAGE` - The max age of the store cookie, defaults to 10 days
- `LW_PROFILE_COOKIENAME` - The profile's cookie name, defaults to `profile`
- `LW_JWT_COOKIENAME` - The JSON Web Token's (JWT) cookie name, defaults to `jwt`
- `LW_DYNAMIC_SCOPE` - When set allows you to customize the scopes used in an authentication request, defaults to off
- `LW_COOKIE_DOMAIN` - The explicit cookie domain, e.g. `.foo.com`. If not specified this will derive from `LW_SUBDOMAIN`, e.g. if `LW_SUBDOMAIN=login.foo.com` then the cookie domain "defaults" to `.foo.com`. This is ok unless you have multi level subdomain for (`LW_SUBDOMAIN=dev.login.foo.com`).
In this case you must explicitly set `LW_COOKIE_DOMAIN=.foo.com` as `.login.foo.com` would be the auto guessed value.

## GitHub specific environment variables

You need to create your own GitHub OAuth application. If `LW_SUBDOMAIN=login.yourdomain.com` your Authorization callback URL
must be: `https://login.yourdomain.com/github/callback`

- `LW_GITHUB_CLIENTID` - Your GitHub Client ID
- `LW_GITHUB_CLIENTSECRET` - Your GitHub Client Secret

## Google specific environment variables

You need to create your own Google OAuth application. If `LW_SUBDOMAIN=login.yourdomain.com` your Authorization callback URL
must be: `https://login.yourdomain.com/google/callback`

- `LW_GOOGLE_CLIENTID` - Your Google Client ID
- `LW_GOOGLE_CLIENTSECRET` - Your Google Client Secret

## Facebook specific environment variables

You need to create your own Facebook login application. If `LW_SUBDOMAIN=login.yourdomain.com` your allowed redirects
must be: `https://login.yourdomain.com/facebook/callback`

- `LW_FACEBOOK_APPID` - Your Facebook App ID
- `LW_FACEBOOK_APPSECRET` - Your Facebook App Secret

## LinkedIn specific environment variables

You need to create your own LinkedIn OAuth2 application. If `LW_SUBDOMAIN=login.yourdomain.com` your Authorization callback URL
must be: `https://login.yourdomain.com/linkedin/callback`

- `LW_LINKEDIN_CLIENTID` - Your LinkedIn Client ID
- `LW_LINKEDIN_CLIENTSECRET` - Your LinkedIn Client Secret

## Reddit specific environment variables

You need to create your own Reddit OAuth application. If `LW_SUBDOMAIN=login.yourdomain.com` your Authorization callback URL
must be: `https://login.yourdomain.com/reddit/callback`

- `LW_REDDIT_CLIENTID` - Your Reddit Client ID
- `LW_REDDIT_CLIENTSECRET` - Your Reddit Client Secret

## Twitter specific environment variables

You need to create your own Twitter OAuth application. If `LW_SUBDOMAIN=login.yourdomain.com` your Authorization callback URL
must be: `https://login.yourdomain.com/twitter/callback`

- `LW_TWITTER_CONSUMERKEY` - Your Twitter Consumer Key
- `LW_TWITTER_CONSUMERSECRET` - Your Twitter Consumer Secret

## Mixer specific environment variables

You need to create your own Mixer OAuth Client. If `LW_SUBDOMAIN=login.yourdomain.com` your Authorization callback URL
must be: `https://login.yourdomain.com/mixer/callback`

- `LW_MIXER_CLIENTID` - Your Mixer Client ID
- `LW_MIXER_CLIENTSECRET` - Your Mixer Client Secret
- `LW_MIXER_SCOPE` - Specify which scopes the authorization request with Mixer should have. Check [Mixer's documentation](https://dev.mixer.com/reference/oauth/index.html#oauth_scopes) for scopes.

## Instagram specific environment variables

You need to create your own Instagram OAuth application. If `LW_SUBDOMAIN=login.yourdomain.com` your Authorization callback URL
must be: `https://login.yourdomain.com/instagram/callback`

- `LW_INSTAGRAM_CLIENTID` - Your Instagram Client ID
- `LW_INSTAGRAM_CLIENTSECRET` - Your Instagram Client Secret

## Spotify specific environment variables

You need to create your own Spotify OAuth application. If `LW_SUBDOMAIN=login.yourdomain.com` is your Authorization callback URL
must be: `https://login.yourdomain.com/spotify/callback`

- `LW_SPOTIFY_CLIENTID` - Your Spotify Client ID
- `LW_SPOTIFY_CLIENTSECRET` - Your Spotify Client Secret

## Strava specific environment variables

You need to create your own Strava OAuth application. If `LW_SUBDOMAIN=login.yourdomain.com` your Authorization callback URL
must be: `https://login.yourdomain.com/strava/callback`

- `LW_STRAVA_CLIENTID` - Your Strava Client ID
- `LW_STRAVA_CLIENTSECRET` - Your Strava Client Secret

## AppleID specific environment variables
You need to be [Apple Developer](https://developer.apple.com/programs/enroll/):

- `LW_APPLE_TEAMID` - Team ID at your [membership page](https://developer.apple.com/account/#membership)
- `LW_APPLE_KEYID` -  register [new key](https://developer.apple.com/account/resources/authkeys). Add "Sign in with Apple" capability, download key. **it downloads only once**
- `LW_APPLE_KEYLOCATION` - path to key file relative to your server
- `LW_APPLE_SERVICEID` -  register [Services ID](https://developer.apple.com/account/resources/identifiers/list/serviceId)
- `LW_APPLE_CALLBACK` - enable "Sign in with Apple" capability in service you created, configure your callback url (should be like: https://yourwebsite.com/apple/callback)
<!-- You probably need to verify ownership of a domain. Just [google](https://www.google.com/search?q=apple-developer-domain-association.txt) -->

# Endpoints

- `/twitter` - login with Twitter account (if configured through env variables)
- `/facebook` - login with Facebook account (if configured through env variables)
- `/github` - login with GitHub account (if configured through env variables)
- `/google` - login with Google account (if configured through env variables)
- `/reddit` - login with Reddit account (if configured through env variables)
- `/mixer` - login with Mixer account (if configured through env variables)
- `/linkedin` - login with LinkedIn account (if configured through env variables)
- `/instagram` - login with Instagram account (if configured through env variables)
- `/spotify` - login with Spotify account (if configured through env variables)
- `/strava` - login with Strava account (if configured through env variables)
- `/apple` - login with AppleID (if configured through env variables)
- `/logout` - logout and clears the respective cookies

All endpoints expect the query parameters:
- `success` A url to redirect to in case of successful login (use `encodeURIComponent` for proper escaping)
- `failure` A url to redirect to in case of failed login (use `encodeURIComponent` for proper escaping)

Don't forget to `encodeURIComponent` on them.

# Testing

Say you deployed your `login-with` container with:
- correct environment variables
- properly configured services (e.g. Twitter callback)
- served via https on `auth.your-domain.com`

Then you can test everything by just "visiting" your login strategy with the browser, e.g. `https://auth.your-domain.com/twitter`.
In case of success, you will be finally redirected and see the contents of your profile as JSON.
In case of error, the error will be shown as JSON.

# Example

Visit [login-with.com](https://login-with.com). The source code is [here](https://github.com/lipp/login-with/tree/master/example/nextjs).

# Deployment with now

Note: **You need a custom domain** to run this microservice with now. Chrome (and maybe other browsers) explicitly prevent
usage of wildcard cookies on .now.sh, which are required for this microservice to work.

1. Create your secrets for the environment variables
2. Deploy, e.g. with [now](https://zeit.co/now)
```sh
now lipp/login-with \
	-e NODE_ENV=production \
	-e LW_SUBDOMAIN=login.yourdomain.com \
	-e LW_SESSION_SECRET=@lw-session-secret \
	-e LW_JWT_SECRET=@lw-token-secret \
	-e LW_REDDIT_CLIENTID=@lw-reddit-clientid \
	-e LW_REDDIT_CLIENTSECRET=@lw-reddit-clientsecret \
	-e LW_GITHUB_CLIENTID=@lw-github-clientid \
	-e LW_GITHUB_CLIENTSECRET=@lw-github-clientsecret \
	-e LW_TWITTER_CONSUMERKEY=@lw-twitter-consumerkey \
	-e LW_TWITTER_CONSUMERSECRET=@lw-twitter-consumersecret \
	-e LW_INSTAGRAM_CLIENTID=@lw-instagram-clientid \
	-e LW_INSTAGRAM_CLIENTSECRET=@lw-instagram-clientsecret \
	--alias login.yourdomain.com
```

# Deployment with Docker

1. Create your secrets for the environment variables
2. Deploy, e.g. with Docker
```sh
docker run lipp/login-with -p 80:3000 \
	-e NODE_ENV=production \
	-e LW_SUBDOMAIN=login.yourdomain.com \
	-e LW_SESSION_SECRET=@lw-session-secret \
	-e LW_JWT_SECRET=@lw-token-secret \
	-e LW_REDDIT_CLIENTID=@lw-reddit-clientid \
	-e LW_REDDIT_CLIENTSECRET=@lw-reddit-clientsecret \
	-e LW_GITHUB_CLIENTID=@lw-github-clientid \
	-e LW_GITHUB_CLIENTSECRET=@lw-github-clientsecret \
	-e LW_TWITTER_CONSUMERKEY=@lw-twitter-consumerkey \
	-e LW_TWITTER_CONSUMERSECRET=@lw-twitter-consumersecret \
	-e LW_INSTAGRAM_CLIENTID=@lw-instagram-clientid \
	-e LW_INSTAGRAM_CLIENTSECRET=@lw-instagram-clientsecret \
```
