import React from 'react'
import withProfile from '../with-profile'
import Header from '../Header'

const LoginWith = ({service, redirect}) => (
  <div className={'login ' + service.toLowerCase()} >
    <a href={`https://login.now.sh/${service.toLowerCase()}?successRedirect=${redirect}&failureRedirect=${redirect}`} >
      Login with {service}
    </a>
  </div>
)

const Login = ({profile, origin}) => {
  const redirect = encodeURIComponent(origin + '/')
  const logoutLink = `https://login.now.sh/logout?successRedirect=${redirect}`
  return (
    <div>
      <Header profile={profile} origin={origin} />
      { !profile && <LoginWith service='Twitter' redirect={redirect} /> }
      { !profile && <LoginWith service='GitHub' redirect={redirect} /> }
      { profile && <span>You are already logged in with {profile.provider}. Click <a href={logoutLink}>here</a> to logout.</span> }
    </div>
  )
}

export default withProfile({Component: Login})
