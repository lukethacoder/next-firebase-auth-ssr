import Head from 'next/head'
import nookies from 'nookies'
import { adminSDK } from '@app/firebase/admin'
import { Layout } from '@app/components'
import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { NextPageContext } from 'next'

interface ISsrProtectedPage {
  user?: {
    uid: string
    email: string
    displayName: string
    customClaims?: { [key: string]: any }
  }
  isLoggedIn: boolean
  error?: any
}

export default function SsrProtectedPage({
  isLoggedIn,
  user,
  error,
}: ISsrProtectedPage) {
  console.log('user ', user)

  
  return (
    <>
      <Head>
        <title>SSR Protected Page | next-firebase-auth-ssr</title>
        <meta
          name='description'
          content='Next based application with Firebase SSR Authentication'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <main>
          <p style={{ margin: '0 0 16px' }}>
            this is a SSR protected page using <code>getServerSideProps</code>
          </p>
          <div>
            <div className='user-data'>
              {error ? (
                <p>{error}</p>
              ) : isLoggedIn ? (
                <>
                  <h1>User: {user && user.displayName}</h1>
                  <small>uid: {user && user.uid}</small>
                  <p>email: {user && user.email}</p>
                  {user && user.customClaims && (
                    <>
                      <h2 style={{ fontSize: '16px', margin: '8px 0 0'}}>customClaims</h2>
                      <ul>
                        {Object.keys(user.customClaims).map((claimKey) =>
                          !user.customClaims ? null : (
                            <li key={user.customClaims[claimKey]}>
                              {claimKey}: {`${user.customClaims[claimKey]}`}
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}
                </>
              ) : (
                <mark>no user logged in</mark>
              )}
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
  console.log('getServerSideProps')

  const cookies = nookies.get(context)
  if (!cookies.token) {
    return {
      props: {
        isLoggedIn: false,
      },
    }
  }

  try {
    const token = await adminSDK.auth().verifyIdToken(cookies.token)
    if (!token) {
      return {
        props: {
          isLoggedIn: false,
        },
      }
    }

    // the user is authenticated!
    const { uid } = token

    /**
     * Example user data
     * {
     *   uid: 'RABjvrjPjbcDYa20U4ID6W9BlrWa',
     *   email: 'grass.mountain.455@example.com',
     *   emailVerified: true,
     *   displayName: 'Grass Mountain',
     *   photoURL: undefined,
     *   phoneNumber: undefined,
     *   disabled: false,
     *   metadata: {
     *     creationTime: 'Thu, 02 Feb 2023 18:58:49 GMT',
     *     lastSignInTime: 'Thu, 02 Feb 2023 18:58:49 GMT',
     *     lastRefreshTime: 'Thu, 02 Feb 2023 18:58:49 GMT'
     *   },
     *   providerData: [
     *    {
     *       uid: '9079067284025069436507042167872618226064',
     *       displayName: 'Grass Mountain',
     *       email: 'grass.mountain.455@example.com',
     *       photoURL: undefined,
     *       providerId: 'google.com',
     *       phoneNumber: undefined
     *     }
     *   ],
     *   passwordHash: undefined,
     *   passwordSalt: undefined,
     *   tokensValidAfterTime: undefined,
     *   tenantId: undefined
     * }
     */
    const user: UserRecord = await adminSDK.auth().getUser(uid)

    // we also have access to our custom claims here
    // via `user.customClaims`

    const { email, displayName, customClaims } = user

    return {
      props: {
        isLoggedIn: true,
        user: {
          uid,
          email,
          displayName,
          customClaims: customClaims || null,
        },
      },
    }
  } catch (error) {
    return {
      props: {
        isLoggedIn: false,
        error: 'Error fetching user',
      },
    }
  }
}
