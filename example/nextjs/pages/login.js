import React from 'react'
import withProfile from '../with-profile'
import withLayout from '../with-layout'

const LoginWith = ({service, redirect}) => (
  <div className={'login ' + service.toLowerCase()} >
    <a href={`https://login.now.sh/${service.toLowerCase()}?success=${redirect}&failure=${redirect}`} >
      Login with {service}
    </a>
  </div>
)

const Login = ({profile, origin}) => {
  const redirect = encodeURIComponent(origin + '/')
  const logoutLink = `https://login.now.sh/logout?success=${redirect}`
  return (
    <div>
      { !profile && <LoginWith service='Twitter' redirect={redirect} /> }
      { !profile && <LoginWith service='GitHub' redirect={redirect} /> }
      { profile && <span>You are already logged in with {profile.provider}. Click <a href={logoutLink}>here</a> to logout.</span> }
    </div>
  )
}

export default withProfile({Component: withLayout(Login)})
