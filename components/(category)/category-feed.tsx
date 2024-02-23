import prisma from "@/lib/prisma"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import NoResult from "../no-result"
import ModalButton from "../modalButton"
import { deleteCategory } from "@/actions/category-actions"

type Props = {}

const CategoryFeed = async(props: Props) => {

    const categories = await prisma.category.findMany({
        orderBy:{
            createdAt:'desc'
        }
    })

    if(!categories.length) return <NoResult/>

  return (
    <Table>

    <TableHeader>
      <TableRow>
        <TableHead className="">Title</TableHead>
        <TableHead>Slug</TableHead>
    
        <TableHead className="">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
        {categories.map((category)=> <TableRow key={category.id}>
        <TableCell className="capitalize">{category.title}</TableCell>
        <TableCell>{category.slug}</TableCell>
        <TableCell className="flex gap-3">
            <ModalButton title="Edit" modalInputs={{type:'category',data:category}}/>
            <ModalButton variant={'destructive'}  title="Delete" modalInputs={{type:'delete',deleteFunction:deleteCategory,id:category.id}}/>
        </TableCell>
      </TableRow>)}
     
    </TableBody>
  </Table>
  )
}

export default CategoryFeed