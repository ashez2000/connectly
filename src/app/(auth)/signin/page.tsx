import Link from 'next/link'
import SigninForm from './signin-form'

export default function Page() {
  return (
    <div className="space-y-3 max-w-72 mx-auto">
      <h1 className="text-3xl font-bold">SignIn</h1>
      <p>
        Dont&apos;t have an account?{' '}
        <Link className="text-blue-500" href="/signup">
          SignUp
        </Link>
      </p>
      <SigninForm />
    </div>
  )
}
