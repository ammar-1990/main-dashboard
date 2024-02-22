import { signinSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export const useSignin = ()=>{

const [loading, setLoading] = useState(false)
const [error, setError] = useState("")
    const form = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
          username: "",
          password:""
        },
      })
const router = useRouter()

     async function onSubmit(values: z.infer<typeof signinSchema>) {
     try {
      setError('')
        setLoading(true)
        const {username,password} = values

        const res = await signIn('credentials',{username,password, callbackUrl: '/dashboard', redirect: false})
        if(!res?.ok){
            setError("Invalid credentials")
            setLoading(false)
        }
        router.push('/dashboard')
     } catch (error) {
        console.log(error)
        setLoading(false)
     } finally {
      
     }
   

      }
      return {form,onSubmit,loading,error}

}


