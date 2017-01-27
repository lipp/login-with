import React from 'react'
import Head from 'next/head'
import Header from './components/Header'
import Footer from './components/Footer'


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
        <div className='layout'>
          <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/bulma/0.3.1/css/bulma.min.css' />
            <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css' />
          </Head>
          <Header profile={profile} origin={origin} />
          <div className='container'>
            <Component {...this.props} origin={origin} />
          </div>
          <Footer />
          <style jsx>{`
            .layout > .container {
              min-height: 80vh;
            }
          `}</style>
        </div>
      )
    }
  }
)
