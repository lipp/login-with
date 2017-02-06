import cookie from 'cookie'
import Cookies from 'js-cookie'
import React from 'react'

export default ({Component, autoRedirect = false}) => (
  class WithProfile extends React.Component {

    static async getInitialProps (args) {
      const {req, res} = args
      let profile
      if (process.env.DEBUG || (!req && window.location.origin === 'http://localhost:3000')) {
        console.log('debug profile')
        profile = JSON.stringify({
          username: 'lipplocal',
          name: 'Gerhard Preuss',
          photo: 'https://avatars.githubusercontent.com/u/445883?v=3',
          provider: 'github'
        })
      } else if (req) {
        const cookies = cookie.parse(req.headers.cookie || '')
        profile = cookies.profile
      } else {
        profile = Cookies.get('profile')
      }
      try {
        profile = JSON.parse(profile)
        if (typeof profile.name === 'object') {
          profile.name = profile.name.givenName
          profile.username = profile.name.displayName
        }
        const props = Component.getInitialProps ? await Component.getInitialProps({...args, profile}) : {}
        return {
          ...props,
          profile
        }
      } catch (_) {
        if (autoRedirect) {
          if (req) {
            res.writeHead(302, { Location: '/login' })
          } else {
            document.location.pathname = '/login'
          }
        } else {
          return Component.getInitialProps ? await Component.getInitialProps({...args}) : {}
        }
      }
    }

    render () {
      return <Component {...this.props} />
    }
  }
)
