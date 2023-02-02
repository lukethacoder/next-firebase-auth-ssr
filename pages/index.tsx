import Head from 'next/head'
import Link from 'next/link'
export default function Home() {
  return (
    <>
      <Head>
        <title>next-firebase-auth-ssr</title>
        <meta name='description' content='Next based application with Firebase SSR Authentication' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1>Home</h1>
        <ul>
          <li>
            <Link href="/ssr-protected">SSR Protected Page</Link>
          </li>
        </ul>
      </main>
    </>
  )
}
