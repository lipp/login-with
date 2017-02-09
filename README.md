[![Build Status](https://travis-ci.org/lipp/login-with.svg?branch=master)](https://travis-ci.org/lipp/login-with)
[![Coverage Status](https://coveralls.io/repos/github/lipp/login-with/badge.svg?branch=master)](https://coveralls.io/github/lipp/login-with?branch=master)

# About 

Stateless authentication microservice for "login-with" functionality, supporting:

- Twitter
- GitHub
- Reddit
- Facebook
- Google
- ... more to come (PRs welcome)

You can deploy with `now` or `Docker` (for mandatory and optional env variables see below).

```sh
$ now lipp/login-with
$ docker run lipp/login-with
```

This microservice must run in a subdomain of yours, e.g. `login.yourdamain.com`.

```html
<a href='https://login.yourdomain.com/twitter?success=ON_SUCCESS_URL&failure=ON_FAILURE_URL>
  Login with Twitter
</a>
```

On successfull login two cookies will be created:

- `token` - A "JSON Web Token" (JWT) containing profile information and the respective access tokens (Twitter/etc). http-only!
- `profile` - A JSON string which containing non-sensitive information (accessible from browser JS):
  - `username` - string / mandatory, the account specific user alias (e.g. Twitter name)
  - `photo` - string / pptional, the account specific user image link
  - `name` - string / optional, the "real" name

The cookies will be available for your toplevel domain and all subdomains. In addition, the cookie's `secure` flag is set, which means 
that your other websites/webservices must run over `https`. 

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

## Reddit specific environment variables

You need to create your own GitHub OAuth application. If `LW_SUBDOMAIN=login.yourdomain.com` your Authorization callback URL 
must be: `https://login.yourdomain.com/reddit/callback`

- `LW_REDDIT_CLIENTID` - Your Reddit Client ID
- `LW_REDDIT_CLIENTSECRET` - Your Reddit Client Secret

## Twitter specific environment variables

You need to create your own Twitter OAuth application. If `LW_SUBDOMAIN=login.yourdomain.com` your Authorization callback URL 
must be: `https://login.yourdomain.com/twitter/callback`

- `LW_TWITTER_CONSUMERKEY` - Your Twitter Consumer Key
- `LW_TWITTER_CONSUMERSECRET` - Your Twitter Consumer Secret


# Endpoints

- `/twitter` - login with Twitter account (if configured through env variables)
- `/facebook` - login with Facebook account (if configured through env variables)
- `/github` - login with GitHub account (if configured through env variables)
- `/google` - login with Google account (if configured through env variables)
- `/reddit` - login with Reddit account (if configured through env variables)
- `/logout` - logout and clears the respective cookies

All endpoints expect the query parameteres:
- `success` A url to redirect to in case of successful login (use `encodeURIComponent` for proper escaping)
- `failure` A url to redirect to in case of failed login (use `encodeURIComponent` for proper escaping)

Don't forget to `encodeURIComponent` on them.

# Example

Visit [login-with.now.sh](https://login-with.now.sh). The source code is [here](https://github.com/lipp/login-with/tree/master/example/nextjs).

# Deployment with now

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
```
