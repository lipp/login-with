import React from 'react'
import cookie from 'cookie'
import Cookies from 'js-cookie'
import 'isomorphic-fetch'

const fetchJson = async (url, headers) => {
  const res = await fetch(url, headers)
  return res.json()
}

export default class App extends React.Component {
  static async getInitialProps ({req, profile}) {
    if (req) {
      try {
        const token = await fetchJson('https://token-decryptor.now.sh', {
          credentials: 'include',
          headers: {
            cookie: req.headers.cookie
          }
        })
        return {token: {...token, foo: 123}}
      } catch (error) {
        return {token: {error: error.toString()}, foo: 333}
      }
    } else {
      const token = await fetchJson('https://token-decryptor.now.sh', {
        credentials: 'include'
      })
      return {token}
    }
  }

  render () {
    return (
      <div>{JSON.stringify(this.props.token || 'no token')}</div>
    )
  }
}
