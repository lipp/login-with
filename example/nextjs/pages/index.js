import React from 'react'
import cookie from 'cookie'


export default class App extends React.Component {
  static getInitialProps ({req}) {
    if (req) {
      try {
        const cookies = cookie.parse(req.headers.cookie || '')
        const profile = cookies.profile
        const token = cookies.token
        return {profile: JSON.parse(profile), token}
      } catch (err) {
        return {err}
      }
    }
  }

  state = {
    location: ''
  }

  componentDidMount () {
    console.log('props', this.props)
    this.setState({
      location: window.location.href
    })
  }

  render () {
    const loginUrl = 'https://login.now.sh'
    const {profile, token} = this.props
    const {location} = this.state
    return (
      <div>
        { profile && <div><h1>{profile.displayName}</h1><img src={profile.photo} /></div> }
        { token && <h1>{token}</h1> }
        { location && !profile && <a href={`${loginUrl}/twitter?successRedirect=${encodeURIComponent(location)}`} >Login with Twitter</a> }
        { location && !profile && <a href={`${loginUrl}/github?successRedirect=${encodeURIComponent(location)}`} >Login with GitHub</a> }
        { location && profile && <a href={`${loginUrl}/logout?successRedirect=${encodeURIComponent(location)}`} >Log Out</a> }
      </div>
    )
  }
}
