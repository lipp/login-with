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
      const {profile, url} = this.props
      return (
        <div className='layout'>
          <Head>
            <title>Login-with</title>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='apple-touch-icon' sizes='57x57' href='/static/apple-icon-57x57.png' />
            <link rel='apple-touch-icon' sizes='60x60' href='/static/apple-icon-60x60.png' />
            <link rel='apple-touch-icon' sizes='72x72' href='/static/apple-icon-72x72.png' />
            <link rel='apple-touch-icon' sizes='76x76' href='/static/apple-icon-76x76.png' />
            <link rel='apple-touch-icon' sizes='114x114' href='/static/apple-icon-114x114.png' />
            <link rel='apple-touch-icon' sizes='120x120' href='/static/apple-icon-120x120.png' />
            <link rel='apple-touch-icon' sizes='144x144' href='/static/apple-icon-144x144.png' />
            <link rel='apple-touch-icon' sizes='152x152' href='/static/apple-icon-152x152.png' />
            <link rel='apple-touch-icon' sizes='180x180' href='/static/apple-icon-180x180.png' />
            <link rel='icon' type='image/png' sizes='192x192'  href='/static/android-icon-192x192.png' />
            <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon-32x32.png' />
            <link rel='icon' type='image/png' sizes='96x96' href='/static/favicon-96x96.png' />
            <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon-16x16.png' />
            <link rel='manifest' href='/static/manifest.json' />
            <meta name='msapplication-TileColor' content='#ffffff' />
            <meta name='msapplication-TileImage' content='/static/ms-icon-144x144.png' />
            <meta name='theme-color' content='#ffffff' />
            <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/bulma/0.3.1/css/bulma.min.css' />
            <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css' />
          </Head>
          <Header profile={profile} origin={origin} url={url} />
          <div className='container'>
            <Component {...this.props} origin={origin} />
          </div>
          <Footer />
          <style jsx>{`
            .layout > .container {
              max-width: 660px;
              min-height: 80vh;
              margin: 0 auto;
            }
          `}</style>
        </div>
      )
    }
  }
)
