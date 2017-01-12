# ATTENTION: WORK IN PROGRESS

NOT SECURE USING THIS YET

# login-with

Login-with microservice for OAuth on *.now.sh websites with encryption:
- login.now.sh/twitter
- login.now.sh/github
- login.now.sh/reddit
- ... more to come

Running on https://login.now.sh for all *.now.sh websites which need user login/authentication.

# How it works

1. Generate an RSA Key pair.
2. Use this as a login link

```jsx
// no newlines of course
<a href='https://login.now.sh/twitter
	?pubkey=YOUR_PUBKEY
	&successRedirect=YOUR_SITE_SUCCESS
	&failureRedirect=YOUR_SITE_FAILURE' />
```

## Query Params
- `pubkey` The public key.
- `successRedirect` The url to redirect to in case of success.
- `failureRedirect` The url to redirect to in case of error.

In case of success a cookie will be set with:
- name := pubkey (to avoid collisions with other *.now.sh websites which use this service)
- value := encrypted JSON user ({accessToken:..., profile: ...}). Use your private key to decrypt.

# Example using next.js

```jsx
import React from 'react'
import ursa from 'ursa'
import cookies from 'cookies'

const privateKeyPem = process.env.PRIVATE_KEY_PEM
const publicKeyPem = process.env.PUBLIC_KEY_PEM

export default class App extends React.Component {

  static getInitialProps ({req}) {
    if (req) {
      const cookies = cookie.parse(req.headers.cookie)
      const privkey = ursa.createPrivateKey(privateKeyPem)
      return {privkey.decrypt(cookies[publicKeyPem], 'hex', 'utf8')}
    }
  }

  componentDidMount () {
    this.setState({location: window.location})
  }

  getLoginParams () {
    const params = [
      `pubkey=${encodeURIComponent(publicKeyPem)}`,
      `successRedirect=${this.state.location}`,
      `failureRedirect=${this.state.location}`
    ]
    return params.join('&')
  }

  render () {
    return (
      <div>
	{this.props.user
	  ? <div>Hello {this.props.user.profile.displayName}</div><a href='https://login.now.sh/logout'>Logout</a>
	  : <a href={`https://login.now.sh/github?pubkey=${this.getLoginParams()}>Login with GitHub</a>
	}
      </div>
    )
  }
}
```

To be able to import the `ursa` package, you need to use next beta and provide a `next.config.js` file to tell webpack to ignore 
the implicitly required but not used `fs` package (see example).

# How to generate a RSA key pair

```
openssl genrsa -out privkey.pem 2048
openssl rsa -in ./privkey.pem -pubout -out pubkey.pem
```
