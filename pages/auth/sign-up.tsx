import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GoogleAuthProvider } from 'firebase/auth'

import { useSignInWithProvider } from '@app/hooks'
import { EmailPasswordSignUpForm, Layout } from '@app/components'
import Head from 'next/head'

const SignUp = () => {
  const [signInWithProvider, signInWithProviderState] = useSignInWithProvider()

  const router = useRouter()

  const AuthProviderButton = () => {
    return (
      <button
        className='rounded-lg p-2 font-bold bg-red-400 text-white'
        onClick={() => {
          signInWithProvider(new GoogleAuthProvider())
        }}
      >
        Login with Google
      </button>
    )
  }

  const onSignup = useCallback(async () => {
    router.push('/ssr-protected')
  }, [router])

  useEffect(() => {
    if (signInWithProviderState.success) {
      onSignup()
    }
  }, [signInWithProviderState.success, onSignup])

  return (
    <>
      <Head>
        <title>Sign Up | next-firebase-auth-ssr</title>
      </Head>
      <Layout>
        <main>
          <div>
            <h1>Sign Up</h1>
          </div>

          <div>
            <AuthProviderButton />

            <EmailPasswordSignUpForm onSignup={onSignup} />
          </div>
        </main>
      </Layout>
    </>
  )
}

export default SignUp
