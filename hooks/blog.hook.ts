import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { blogSchema, categorySchema } from "@/schemas"
import { useModal } from "./modal.hook"
import { useEffect } from "react"
import { replaceSpacesWithHyphens } from "@/lib/utils"
import { createCategory, editCategory } from "@/actions/category-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Blog } from "@prisma/client"
import { createBlog, editBlog } from "@/actions/blog-actions"



export const useBlog =(blog:Blog | null)=> {


    const router = useRouter()



    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
          title: blog?.title || "",
          description:blog?.description || "",
          author:blog?.author || "",
          image:blog?.image || "",
          content:blog?.content || "",
          categoryId : blog?.categoryId || "",
          slug:blog?.slug || ""
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
          if(!blog){
            res =    await createBlog(values)
          
          }else {
            res = await editBlog(values,blog.id)
          }
          router.push('/dashboard/blogs')
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
