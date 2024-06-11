'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useModal } from "@/hooks/modal.hook"

  import React from 'react'
import CategoryForm from "../(category)/category-from"
  
  type Props = {}
  
  const CategoryModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()

    const isOpen = open && modalInputs?.type==='category'
    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
      
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Categories</DialogTitle>
       
          </DialogHeader>

          <CategoryForm/>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default CategoryModal