import { useCallback, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GoogleAuthProvider } from 'firebase/auth'

import { useSignInWithProvider } from '@app/hooks'
import { EmailPasswordSignIn, Layout } from '@app/components'
import configuration from '@app/configuration'

const SignIn = () => {
  const [signInWithProvider, signInWithProviderState] = useSignInWithProvider()
  const router = useRouter()

  const AuthProviderButton = () => {
    return (
      <button
        onClick={() => {
          signInWithProvider(new GoogleAuthProvider())
        }}
      >
        Login with Google
      </button>
    )
  }

  const onSignIn = useCallback(() => {
    return router.push(configuration.paths.appHome)
  }, [router])

  useEffect(() => {
    if (signInWithProviderState.success) {
      onSignIn()
    }
  }, [signInWithProviderState.success, onSignIn])

  return (
    <>
      <Head>
        <title>Sign In | next-firebase-auth-ssr</title>
      </Head>
      <Layout>
        <main>
          <div>
            <h1>Sign In</h1>
          </div>

          <div>
            <AuthProviderButton />

            <EmailPasswordSignIn onSignIn={onSignIn} />
          </div>
        </main>
      </Layout>
    </>
  )
}

export default SignIn
