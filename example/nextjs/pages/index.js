import React from 'react'
import withProfile from '../with-profile'
import Link from 'next/link'

const Profile = ({profile}) => (
  <div className='profile'>
    <h1>Hello {profile.displayName}</h1>
    <img src={profile.photo} />
    <h2>{profile.name.givenName} {profile.name.familyName}</h2>
  </div>
)

class App extends React.Component {
  static async getInitialProps (args) {
    return {bla: 123}
  }
  render () {
    const {profile} = this.props
    return (
      <div>
        { profile
          ? <div>
              <Profile profile={profile} />
              <span>View your profile <Link href='/token'><a>token</a></Link></span>
            </div>
          : <span>You need to <Link href='/login'><a>login</a></Link></span>
        }
      </div>
    )
  }
}

export default withProfile({Component: App})
