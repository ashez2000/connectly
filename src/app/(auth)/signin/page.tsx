import SigninForm from './signin-form'

export default function Page() {
  return (
    <main className="px-3">
      <div className="space-y-3 max-w-2xl">
        <h1 className="text-2xl font-bold">Signup</h1>
        <SigninForm />
      </div>
    </main>
  )
}
