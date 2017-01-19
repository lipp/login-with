import React from 'react'
import cookie from 'cookie'

const Login = ({service, redirect}) => (
  <div className={'login ' + service.toLowerCase()} >
    <a href={`https://login.now.sh/${service.toLowerCase()}?successRedirect=${redirect}&failureRedirect=${redirect}`} >
      Login with {service}
    </a>
  </div>
)

const Logout = ({redirect}) => (
  <div className='logout' >
    <a href={`https://login.now.sh/logout?successRedirect=${redirect}`} >
      Logout
    </a>
  </div>
)

const Profile = ({profile}) => (
  <div className='profile'>
    <h1>Hello {profile.displayName}</h1>
    <img src={profile.photo} />
    <h2>{profile.name.givenName} {profile.name.familyName}</h2>
  </div>
)

export default class App extends React.Component {
  static getInitialProps ({req}) {
    if (req) {
      try {
        const cookies = cookie.parse(req.headers.cookie || '')
        const profile = cookies.profile
        return {profile: JSON.parse(profile)}
      } catch (error) {
        return {error}
      }
    }
  }

  state = {
    location: ''
  }

  componentDidMount () {
    this.setState({
      location: window.location.href
    })
  }

  render () {
    const redirect = encodeURIComponent(this.state.location)
    const {profile} = this.props
    return (
      <div>
        { profile && <Profile profile={profile} /> }
        { !profile && <Login service='Twitter' redirect={redirect} /> }
        { !profile && <Login service='GitHub' redirect={redirect} /> }
        { profile && <Logout redirect={redirect} /> }
      </div>
    )
  }
}
