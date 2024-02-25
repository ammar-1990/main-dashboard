import BlogsForm from "@/components/(blogs)/blogs-form"
import Heading from "@/components/heading"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

type Props = {
    params:{blogSlug:string}
}

const page = async({params}: Props) => {

    const categoriesRes =  prisma.category.findMany({orderBy:{createdAt:'desc'}})
  
    const blogRes =  prisma.blog.findUnique({
        where:{
            slug:params.blogSlug
        }
    })

    const [blog,categories] = await Promise.all([blogRes,categoriesRes])
console.log(params.blogSlug)
    if(!blog && params.blogSlug !=='new') notFound()


  return (
    <div>
        <Heading title={blog ? blog.title : 'Create blog'} description={blog ? `Update ${blog.title}` : 'Create new blog'}/>

<div className="mt-12 max-w-[700px]">
<BlogsForm blog={blog} categories={categories}/>
</div>
       

    </div>
  )
}

export default page