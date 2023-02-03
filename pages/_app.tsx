import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import nookies from 'nookies'
import { FirebaseAppProvider, AuthProvider } from 'reactfire'

import { initializeApp } from 'firebase/app'
import { onIdTokenChanged, User } from 'firebase/auth'
import {
  initializeAuth,
  indexedDBLocalPersistence,
  connectAuthEmulator,
  inMemoryPersistence,
} from 'firebase/auth'

import configuration from '@app/configuration'
import '@app/styles/globals.css'

function App(props: AppProps) {
  const { Component, pageProps } = props
  const [admin, setAdmin] = useState<User | null>(null)

  // initialize the firebase app
  const app = initializeApp(configuration.firebase)

  // make sure we're not using IndexedDB when SSR
  // as it is only supported on browser environments
  const persistence =
    typeof window !== 'undefined'
      ? indexedDBLocalPersistence
      : inMemoryPersistence

  const auth = initializeAuth(app, { persistence })

  if (configuration.emulator && !('emulator' in auth.config)) {
    // we can get the host by
    // combining the local emulator host with the Auth port
    const host = getAuthEmulatorHost()
    connectAuthEmulator(auth, host)
  }

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        setAdmin(user)
        try {
          const token = await user.getIdToken()
          nookies.set(undefined, 'token', token, { path: '/' })
        } catch (error) {
          nookies.set(undefined, 'token', '', { path: '/' })
        }
      } else {
        setAdmin(null)
        nookies.set(undefined, 'token', '', { path: '/' })
      }
    })

    return unsubscribe
  }, [])

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={auth}>
        <Component {...pageProps} />
      </AuthProvider>
    </FirebaseAppProvider>
  )
}

export default App

function getAuthEmulatorHost() {
  const host = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST
  const port = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT

  return ['http://', host, ':', port].join('')
}
