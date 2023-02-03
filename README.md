# next-firebase-auth-ssr

A small example repository of Server Side Rendered (SSR) Firebase Authentication in NextJS (`getServerSideProps`)

## Packages

- [firebase](https://github.com/firebase/firebase-js-sdk)
- [firebase-admin](https://github.com/firebase/firebase-admin-node)
- [reactfire](https://github.com/FirebaseExtended/reactfire)
- [ncookies](https://github.com/maticzav/nookies)

## Getting Started

### Install packages

```cmd
yarn
```

### Setup your `.env.development` file

Duplicate the `.env.example` file and rename it to `.env.development`. Replace the values with your own.

### Run the firebase emulator

```cmd
yarn firebase:emulate
```

This will create a firebase authentication instance on port `9099` for testing

### Run the Next dev site

```cmd
yarn dev
```

## Acknowledgements

- Repository uses the basic structure outlined in this article [The Ultimate Authentication Guide with Next.js and Firebase](https://makerkit.dev/blog/tutorials/ultimate-guide-authentication-firebase-nextjs)