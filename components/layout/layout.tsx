import { Navigation } from '@app/components'

export function Layout({ children }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}
