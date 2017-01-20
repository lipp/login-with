import cookie from 'cookie'
import Cookies from 'js-cookie'
import React from 'react'

export default ({Component, autoRedirect = false}) => (
  class WithProfile extends React.Component {

    static async getInitialProps (args) {
      const {req, res} = args
      let profile
      if (req) {
        const cookies = cookie.parse(req.headers.cookie || '')
        profile = cookies.profile
      } else {
        profile = Cookies.get('profile')
      }
      try {
        profile = JSON.parse(profile)
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

    state = {
      origin: ''
    }
  
    componentDidMount () {
      this.setState({
        origin: window.location.origin
      })
    }

    render () {
      return <Component {...this.props} origin={this.state.origin} />
    }
  }
)
