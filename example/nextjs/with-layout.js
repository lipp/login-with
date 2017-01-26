import React from 'react'
import Header from './Header'

export default (Component) => (
  class WithLayout extends React.Component {
    state = {
      origin: ''
    }

    static async getInitialProps (args) {
      return Component.getInitialProps ? await Component.getInitialProps({...args}) : {}
    }
  
    componentDidMount () {
      this.setState({
        origin: window.location.origin
      })
    }

    render () {
      const {origin} = this.state
      const {profile} = this.props
      return (
        <div>
          <Header profile={profile} origin={origin} />
          <Component {...this.props} origin={origin} />
          <style jsx global>{`
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
              font-size: 14px;
              line-height: 1.5;
              color: #333;
              background-color: #fff;
            }
          `}</style>
        </div>
      )
    }
  }
)
