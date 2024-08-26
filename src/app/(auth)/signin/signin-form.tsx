'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { signinSchema, SigninInput } from '@/schemas/auth'
import { signin } from './actions'

export default function SigninForm() {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (input: SigninInput) => {
    setError('')
    startTransition(async () => {
      const { error } = await signin(input)
      if (error) {
        setError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mb-3">
        {error && <p className="text-destructive">{error}</p>}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>

      <hr />

      <div>
        <div>Explore the Application</div>
        <button
          className="text-sm text-zinc-600"
          onClick={() => {
            form.setValue('username', 'john')
            form.setValue('password', '123456')
          }}
        >
          &rarr; Sign In as John Doe
        </button>
      </div>
    </Form>
  )
}
