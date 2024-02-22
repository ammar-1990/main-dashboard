'use client'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSignin } from "@/hooks/signin.hook"
import { Loader } from "lucide-react"
import LoadingButton from "./loading-button"

type Props = {}

const SigninForm
 = (props: Props) => {

    const {form,onSubmit,loading,error} = useSignin()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg max-w-[350px] w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
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
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="py-2 text-xs text-rose-500 capitalize">{error}</p>}
        
        <LoadingButton className="w-full" title="Sign in" loading={loading}/>
      </form>
    </Form>
  )
}

export default SigninForm
