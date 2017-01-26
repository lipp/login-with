/* globals fetch */
import React from 'react'
import 'isomorphic-fetch'
import withProfile from '../with-profile'
import withLayout from '../with-layout'

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
      const result = await fetchWithCookies('https://token-decryptor.now.sh', req)
      return {result}
    } catch (error) {
      return {error: error.toString()}
    }
  }

  render () {
    const {result, error} = this.props
    return (
      <div>
        {result
          ? <div>
            <div>{result.jwt}</div>
            <div>{JSON.stringify(result.decrypted)}</div>
          </div>
          : <span>something went wrong: {error}</span>
        }
      </div>
    )
  }
}

export default withProfile({Component: withLayout(Token), autoRedirect: true})
