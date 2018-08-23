# Add new strategy / platform

Supporting new login strategies / platforms is pretty simple if there is a [passport](http://passportjs.org/)
module available for it.

Compare for instance PR #45, which added support for "strava". The steps required are:

 - Create a new strategy file (e.g. like [this](https://github.com/lipp/login-with/blob/master/src/strategies/strava.js))
 - Import the new strategy to strategies [index](https://github.com/lipp/login-with/blob/master/src/strategies/index.js)
 - Add tests
 - Add it to the README.md:
   - About
   - `<Platform>` specific environment variables
   - Endpoint
 - Test locally with your account

Please run `npm test` and make sure everything is OK before creating the PR. This reduces noise in the PR and commit history.

## Local strategy testing

Before creating the PR, please check your strategy/platform yourself. You will typically need:

 - A "dev" account on your platform
 - An "App" with a pair of `CLIENTSECRET` and `CLIENTID`. The names for this info vary.

For testing set the `callback` parameter of the "App" to `http://localhost:3000/<platform>/callback`,
e.g. `http://localhost:3000/twitter/callback`.

Then you can run the login-with microservice locally like this:

```sh
LW_JWT_SECRET=whatever LW_SESSION_SECRET=foobar LW_<PLATFORM>_CLIENTID=<YOUR_CLIENTID> LW_<PLATFORM>_CLIENTSECRET=<YOUR_CLIENTSECRET> npm start
```

If everything works right, you can open a browser on `http://locahost:3000/<platform>` and you will see you login profile.

Your are ready for PR!

# Inclusion in login-with.com demo

I am very sorry, but I probably won't enable your login on the "Try it" section of login-with.com, that's why:

To add your specific service to the login-with.com demo site, I have to create a "dev" account on the
respective platform. Eventually I will have to submit a new App (the demo) and sometimes I get refused (snapchat).

Frankly I don't want to spread my personal data on every platform.
