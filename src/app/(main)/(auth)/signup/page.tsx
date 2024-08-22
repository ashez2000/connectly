import Link from 'next/link'
import SignupForm from './signup-form'

export default function Page() {
  return (
    <div className="space-y-3 max-w-72 mx-auto">
      <h1 className="text-3xl font-bold">SignUp</h1>
      <p>
        Already have an account?{' '}
        <Link className="text-blue-500" href="/signin">
          SignIn
        </Link>
      </p>
      <SignupForm />
    </div>
  )
}
