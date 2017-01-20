import React from 'react'
import 'isomorphic-fetch'
import withProfile from '../with-profile'
import Header from '../Header'

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

class Token extends React.Component {
  static async getInitialProps ({req, profile = false}) {
    try {
      const token = await fetchWithCookies('https://token-decryptor.now.sh', req)
      return {token}
    } catch (error) {
      return {error: error.toString()}
    }
  }

  render () {
    const {token, profile, origin} = this.props
    return (
      <div>
        <Header profile={profile} origin={origin} />
        {token
          ? <div>
            <div>{token.token}</div>
            <div>{JSON.stringify(token.decrypted)}</div>
          </div>
          : null
        }
      </div>
    )
  }
}

export default withProfile({Component: Token, autoRedirect: true})
