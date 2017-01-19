# About 

Stateless authentication microservice for "login-with" functionality, supporting:

- Twitter
- GitHub
- Reddit
- ... more to come (PRs welcome)

This microservice must run in a subdomain of yours, e.g. `login.yourdamain.com`.

```html
<a href='https://login.yourdomain.com/twitter?successRedirect=ON_SUCCESS_URL&failureRedirect=ON_FAILURE_URL>
  Login with Twitter
</a>
```

On successfull login two cookies will be created:

- `token` - A "JSON Web Token" (JWT) containing profile information and the respective access tokens (Twitter/etc). http-only!
- `profile` - A JSON string which containing non-sensitive information (accessible from browser JS):
  - `displayName` - The account specific user alias (e.g. Twitter name)
  - `photo` - Optional, the account specific user image link
  - `name` - The "real" name containing `givenName` and `familyName`  

The cookies will be available for your toplevel domain and all subdomains. In addition, the cookie's `secure` flag is set, which means 
that your other websites/webservices must run over `https`. 

# Setup

The configuration is done solely through environment variables.

## Required environment variables

- `LW_SESSION_SECRET` - The session secret used by the microservice
- `LW_TOKEN_SECRET` - The secret to sign the JSON Web Token (JWT)
- `LW_TOKEN_SUBDOMAIN` - The subdomain this microservice runs, e.g. `login.yourdomain.com`

## Optional environment variables

- `LW_COOKIE_MAXAGE` - The max age of the store cookie, defaults to 10 days
- `LW_PROFILE_COOKIENAME` - The profile's cookie name, defaults to `profile`
- `LW_TOKEN_COOKIENAME` - The JSON Web Token's (JWT) cookie name, defaults to `token`

## GitHub specific environment variables

You need to create your own GitHub OAuth application. If `LW_SUBDOMAIN=login.yourdomain.com` your Authorization callback URL 
must be: `https://login.yourdomain.com/github/callback`

- `LW_GITHUB_CLIENTID` - Your GitHub Client ID
- `LW_GITHUB_CLIENTSECRET` - Your GitHub Client Secret

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
- `/github` - login with GitHub account (if configured through env variables)
- `/reddit` - login with Reddit account (if configured through env variables)
- `/logout` - logout and clears the respective cookies

All endpoints expect the query parameteres:
- `successRedirect` A url to redirect to in case of successful login (use `encodeURIComponent` for proper escaping)
- `failureRedirect` A url to redirect to in case of failed login (use `encodeURIComponent` for proper escaping)

Don't forget to `encodeURIComponent` on them.

# Example

Checkout [login-example.now.sh](https://login-example.now.sh). The source code is [here](https://github.com/lipp/login-with/tree/master/example/nextjs).
