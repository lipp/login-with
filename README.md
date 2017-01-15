# About 

Stateless authentication microservice for "login-with" functionality, supporting:

- Twitter
- GitHub
- Reddit
- ... more to come (PRs welcome)

# Login Endpoints

Login-with microservice for OAuth on *.now.sh websites with encryption:
- `/twitter` - login with Twitter account
- `/github` - login with GitHub account
- `/reddit` - login with Reddit account

All login endpoints expect the query parameteres:
- `successRedirect` A url to redirect to in case of successful login (use `encodeURIComponent` for proper escaping)
- `failureRedirect` A url to redirect to in case of failed login (use `encodeURIComponent` for proper escaping)

## Example
This example assumes THIS service to run at `login.now.sh`.

```html
<a href="https://login.now.sh/github?successRedirect=https%3A%2F%2Ffoo.now.sh&failureRedirect=https%3A%2F%2Ffoo.now.sh%2Flogin"
```

