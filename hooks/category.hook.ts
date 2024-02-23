import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { categorySchema } from "@/schemas"
import { useModal } from "./modal.hook"
import { useEffect } from "react"
import { replaceSpacesWithHyphens } from "@/lib/utils"
import { createCategory, editCategory } from "@/actions/category-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"



export const useCategory =()=> {


    const {modalInputs,setClose} = useModal()
    const router = useRouter()

    const category = modalInputs?.type==='category' ? modalInputs.data : null

    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
          title: category?.title || "",
          slug:category?.slug || ""
        },
      })


      const slug = form.watch('slug')


      useEffect(()=>{

        const value = replaceSpacesWithHyphens(slug)

        form.setValue('slug',value)

      },[slug,form])

      async function onSubmit(values: z.infer<typeof categorySchema>) {


     
        try {
          let res
          if(!category){
            res =    await createCategory(values)
          }else {
            res = await editCategory(values,category.id)
          }
         
          if(!res.success){
         return  toast.error(res.error)
          }
     
          toast.success(res.message)
          router.refresh()
          setClose()
        } catch (error) {
          console.log(error)
          toast.error('Something went wrong')
        }



}

return {form,onSubmit}
}
