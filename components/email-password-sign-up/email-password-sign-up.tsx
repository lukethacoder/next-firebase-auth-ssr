import { FormEvent, useCallback, useEffect } from 'react'
import { useSignUpWithEmailAndPassword } from '@app/hooks'

export function EmailPasswordSignUpForm(
  props: React.PropsWithChildren<{
    onSignup: () => void
  }>
) {
  const [signUp, state] = useSignUpWithEmailAndPassword()
  const loading = state.loading
  const error = state.error

  useEffect(() => {
    if (state.success) {
      props.onSignup()
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

      // sign user up
      return signUp(email, password)
    },
    [loading, signUp]
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

        <button disabled={loading} className='btn w-full'>
          Sign Up
        </button>
      </div>
    </form>
  )
}
