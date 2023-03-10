import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from 'reactfire'

import configuration from '@app/configuration'

export function Navigation() {
  const auth = useAuth()
  const router = useRouter()

  const handleSignOut = () => {
    // sign out the firebase user client-side
    auth.signOut()

    // force SSR pages to reload their data
    router.replace(router.asPath)
  }

  return (
    <nav>
      <div className='w-full'>
        <h1>
          <Link href='/'>next-firebase-auth-ssr</Link>
        </h1>
      </div>
      <div className='nav-items'>
        <Link href={configuration.paths.appHome}>SSR Protected Page</Link>
        {!auth.currentUser ? (
          <>
            <Link href={configuration.paths.signIn}>Login</Link>
            <Link href={configuration.paths.signUp}>Sign up</Link>
          </>
        ) : (
          <button className='logout' onClick={handleSignOut}>
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}
