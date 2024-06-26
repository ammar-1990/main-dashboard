import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { subscriptionSchema } from "@/schemas"

import { useEffect } from "react"
import { replaceSpacesWithHyphens } from "@/lib/utils"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Blog } from "@prisma/client"
import { createBlog, editBlog } from "@/actions/blog-actions"
import { useModal } from "./modal.hook"
import { v4 as uuidv4 } from 'uuid';
import { addSubscription, updateSubscription } from "@/actions/subscription-action"



export const useSubscription =()=> {


    const router = useRouter()

    const {modalInputs,setClose} = useModal()

    const subscription = modalInputs?.type==='subscription' ? modalInputs.data : null



    const form = useForm<z.infer<typeof subscriptionSchema>>({
        resolver: zodResolver(subscriptionSchema),
        defaultValues: {
          label: subscription?.label || "",
          description:subscription?.description || "",
          type:subscription?.type || "BASIC",
      
          price:subscription?.price || undefined,
        bulletPoints:subscription?.bulletPoints  as unknown as {id:string,point:string}[]  || []  
        },
      })


   


     

      async function onSubmit(values: z.infer<typeof subscriptionSchema>) {


     
        try {
          let res
          if(!subscription){
            res =    await addSubscription({values})
          
          }else {
            res = await updateSubscription({values,id:subscription.id})
          }
          setClose()
          router.refresh()
          if(!res.success){
         return  toast.error(res.error)
          }
     
          toast.success(res.message)
          router.refresh()
      
        } catch (error) {
          console.log(error)
          toast.error('Something went wrong')
        }



}

return {form,onSubmit}
}
