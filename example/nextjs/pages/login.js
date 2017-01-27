import React from 'react'
import withProfile from '../with-profile'
import withLayout from '../with-layout'

const LoginWith = ({service, redirect}) => (
  <div className='login'>
    <a className='button is-large' href={`https://login.now.sh/${service.toLowerCase()}?success=${redirect}&failure=${redirect}`} >
      <span className='icon is-medium'><i className={`fa fa-${service.toLowerCase()}`} /></span>
      <span>Login with {service}</span>
    </a>
  </div>
)

const Login = ({profile, origin}) => {
  const redirect = encodeURIComponent(origin + '/')
  const logoutLink = `https://login.now.sh/logout?success=${redirect}`
  return (
    <div className='section'>
      { profile && <LoginWith service='Twitter' redirect={redirect} /> }
      { profile && <LoginWith service='GitHub' redirect={redirect} /> }
      { !profile && <div className='notification'>You are <strong>already logged</strong> in with {profile.provider}. Click <a href={logoutLink}>here</a> to logout.</div> }
      <style jsx>{`
        .login {
          margin: 3em 0;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}

export default withProfile({Component: withLayout(Login)})
