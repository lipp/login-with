import React from 'react'
import withProfile from '../with-profile'

const LoginWith = ({service, redirect}) => (
  <div className={'login ' + service.toLowerCase()} >
    <a href={`https://login.now.sh/${service.toLowerCase()}?successRedirect=${redirect}&failureRedirect=${redirect}`} >
      Login with {service}
    </a>
  </div>
)

class Login extends React.Component {
  state = {
    origin: ''
  }

  componentDidMount () {
    this.setState({
      origin: window.location.origin
    })
  }

  render () {
    const redirect = encodeURIComponent(this.state.origin + '/')
    const logoutLink = `https://login.now.sh/logout?successRedirect=${redirect}`
    const {profile} = this.props
    return (
      <div>
        { !profile && <LoginWith service='Twitter' redirect={redirect} /> }
        { !profile && <LoginWith service='GitHub' redirect={redirect} /> }
        { profile && <span>You are already logged in with {profile.provider}. Click <a href={logoutLink}>here</a> to logout.</span> }
      </div>
    )
  }
}

export default withProfile({Component: Login})
