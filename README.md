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
	?pubkey=YOUR_PUBKEY_HEX
	&successRedirect=YOUR_SITE_SUCCESS
	&failureRedirect=YOUR_SITE_FAILURE' />
```

## Query Params
- `pubkey` The hex encoded public key.
- `successRedirect` The url to redirect to in case of success.
- `failureRedirect` The url to redirect to in case of error.

In case of success a cookie will be set with:
- name := pubkey (to avoid collisions with other *.now.sh websites which use this service)
- value := encrypted JSON user ({accessToken:..., profile: ...}). Use your private key to decrypt.

# How to generate a RSA key pair

```
openssl genrsa -out privkey.pem 2048
openssl rsa -in ./privkey.pem -pubout -out pubkey.pem
```
