import React from 'react'
import cookie from 'cookie'
import Cookies from 'js-cookie'
import 'isomorphic-fetch'

const fetchJson = async (url, headers) => {
  const res = await fetch(url, headers)
  return res.json()
}

const fetchWithCookies = async (url, req) => {
  const opts = {
    credentials: 'include',
    headers: {
      cookie: req ? req.headers.cookie : null
    }
  }
  return await fetchJson(url, opts)
}

export default class App extends React.Component {
  static async getInitialProps ({req, profile = false}) {
    try {
      const token = await fetchWithCookies('https://token-decryptor.now.sh', req)
      return {token}
    } catch (error) {
      return {error: error.toString()}
    }
  }

  render () {
    console.log(this.props)
    const {token} = this.props
    return (
      <div>
        {token 
          ? <div>
              <div>{token.token}</div>
              <div>{JSON.stringify(token.decrypted)}</div>
            </div>
          : null}
        }
      </div>
    )
  }
}
