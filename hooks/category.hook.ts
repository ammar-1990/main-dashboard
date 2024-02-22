import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { categorySchema } from "@/schemas"
import { useModal } from "./modal.hook"
import { useEffect } from "react"
import { replaceSpacesWithHyphens } from "@/lib/utils"



export const useCategory =()=> {


    const {modalInputs} = useModal()

    const category = modalInputs?.data ? modalInputs.data : null

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
     

}

return {form,onSubmit}
}
