import Head from 'next/head'
import { Layout } from '@app/components'

export default function Home() {
  return (
    <>
      <Head>
        <title>next-firebase-auth-ssr</title>
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
            this is a non-restricted home page
          </p>
        </main>
      </Layout>
    </>
  )
}
