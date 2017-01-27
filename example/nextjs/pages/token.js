/* globals fetch */
import React from 'react'
import 'isomorphic-fetch'
import withProfile from '../with-profile'
import withLayout from '../with-layout'
import flatten from 'flat'

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

const jwtText = `
This is your complete confidential login information turned into a JSON Web-Token (JWT). 
The JWT is stored as http-only cookie, which is not accessible via Javascript from the Browser.
Other webservices / microservices which share the same top-level domain can read the JWT if they know the secret.
`

const decryptedText = `
Besides your public profile information, the decrypted JWT contains tokens / keys for use of
the respective service (e.g. posting tweets on Twitter or making changes to your GitHub repos).
`

const KeyValueTable = ({flatObject}) => (
  <table className='breakable table'>
    <thead>
      <tr>
        <th>Key</th><th>Value</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(flatObject).map(key => (
        <tr key={key}>
          <td>{key}</td><td>{flatObject[key]}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

class Token extends React.Component {
  static async getInitialProps ({req, profile = false}) {
    try {
      let result
      if (process.env.DEBUG || (!req && window.location.origin === 'http://localhost:3000')) {
        result = {
          jwt: 'asdjhakjhsdasd.aslkjdhkajshdkjahsd/asdsdfh.dhdhgd',
          decrypted: {
            foo: 123,
            bar: 'hello'
          }
        }
      } else {
        result = await fetchWithCookies('https://token-decryptor.now.sh', req)
      }
      return {result}
    } catch (error) {
      return {error: error.toString()}
    }
  }

  render () {
    const {result, error} = this.props
    const flat = result ? flatten(result.decrypted) : []
    return (
      <div className='token'>
        {result
          ? <div>
            <div className='section'>
              <h2 className='title is-2'>JWT</h2>
              <h2 className='subtitle is-4'>JSON Web-Token</h2>
              <div className='notification is-danger breakable'>{result.jwt}</div>
              <p>{jwtText}</p>
            </div>
            <div className='section'>
              <h2 className='title is-3'>Content</h2>
              <h2 className='subtitle is-4'>Profile & Tokens / Keys</h2>
              <p>{decryptedText}</p>
              <KeyValueTable flatObject={flat} />
            </div>
          </div>
          : <span>something went wrong: {error}</span>
        }
        <style jsx>{`
          .breakable {
            word-break: break-all;
          }
          table {
            margin-top: 2em;
          }
        `}</style>
      </div>
    )
  }
}

export default withProfile({Component: withLayout(Token), autoRedirect: true})
