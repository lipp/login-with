import React from 'react'
import withProfile from '../with-profile'
import withLayout from '../with-layout'
import KeyValueTable from '../components/KeyValueTable'
import Profile from '../components/Profile'
import flatten from 'flat'
import fetchWithCookies from '../fetch-with-cookies'

const jwtText = `
This is your complete confidential login information turned into a JSON Web-Token (JWT). 
The JWT is stored as http-only cookie, which is not accessible via Javascript from the Browser.
Other webservices / microservices which share the same top-level domain can read the JWT if they know the secret.
`

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
    const {result, error, profile} = this.props
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
                  <h2 className='subtitle is-4'>The decrypted JWT content</h2>
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
