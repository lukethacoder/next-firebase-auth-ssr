import { ReactNode } from 'react'
import { Navigation } from '@app/components'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}
