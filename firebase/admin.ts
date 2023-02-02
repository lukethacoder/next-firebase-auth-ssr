import * as admin from 'firebase-admin'

/* eslint-disable import/prefer-default-export */
import { credential } from 'firebase-admin'
import { initializeApp, ServiceAccount } from 'firebase-admin/app'

if (!admin.apps.length) {
  initializeApp({
    credential: credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
        /\\n/g,
        '\n'
      ),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    } as ServiceAccount),
  })
}

export const adminSDK = admin
