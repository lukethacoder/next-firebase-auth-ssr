import Head from 'next/head'
import nookies from 'nookies'
import { adminSDK } from '@app/firebase/admin'

export default function SsrProtectedPage({ isLoggedIn, error }) {
  return (
    <>
      <Head>
        <title>SSR Protected Page</title>
        <meta
          name='description'
          content='Next based application with Firebase SSR Authentication'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <p>
          this is a SSR protected page using <code>getServerSideProps</code>
        </p>
        <mark>{isLoggedIn ? 'is' : 'is not'} logged in</mark>
        <p>error: {JSON.stringify(error)}</p>
      </main>
    </>
  )
}

export const getServerSideProps = async (context) => {
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
    const user = await adminSDK.auth().getUser(uid)
    console.log('user info ', user)

    return {
      props: {
        isLoggedIn: true,
      },
    }
  } catch (error) {
    return {
      props: {
        isLoggedIn: false,
        error
      },
    }
  }
}