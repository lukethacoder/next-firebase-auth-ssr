const configuration = {
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  },
  emulatorHost: process.env.NEXT_PUBLIC_EMULATOR_HOST,
  emulator: process.env.NEXT_PUBLIC_EMULATOR === 'true',
  paths: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    appHome: '/dashboard',
  },
}

export default configuration
