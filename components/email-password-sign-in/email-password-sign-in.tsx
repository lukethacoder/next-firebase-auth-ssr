import { FormEvent, useCallback, useEffect } from 'react'
import { useSignInWithEmailAndPassword } from '@app/hooks'

export function EmailPasswordSignIn(
  props: React.PropsWithChildren<{
    onSignIn: () => void
  }>
) {
  const [signIn, state] = useSignInWithEmailAndPassword()
  const loading = state.loading
  const error = state.error

  useEffect(() => {
    if (state.success) {
      props.onSignIn()
    }
  }, [props, state.success])

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (loading) {
        return
      }

      const data = new FormData(event.currentTarget)
      const email = data.get(`email`) as string
      const password = data.get(`password`) as string

      // sign user in
      return signIn(email, password)
    },
    [loading, signIn]
  )

  return (
    <form className='w-full' onSubmit={onSubmit}>
      <div className='flex flex-col gap-3'>
        <input
          className='p-3 bg-transparent border border-grey-500'
          name='email'
          type='email'
          placeholder='Your Email'
          required
        />

        <input
          className='p-3 bg-transparent border border-grey-500'
          name='password'
          type='password'
          placeholder='Your Password'
          required
        />

        {error ? <span className='text-red-500'>{error.message}</span> : null}

        <button
          disabled={loading}
          className='rounded-lg p-2 font-bold bg-red-400 text-white'
        >
          Sign In
        </button>
      </div>
    </form>
  )
}
