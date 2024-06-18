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
import OfferForm from "../(offers)/offer-form"
  
  type Props = {}
  
  const OfferModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()

    const isOpen = open && modalInputs?.type==='offer'
    const offer = modalInputs?.type==='offer' ? modalInputs.data : null
    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
      
        <DialogContent className="max-h-[95vh] overflow-y-auto scroll max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Offers</DialogTitle>
            <DialogDescription>{offer ? "Edit Offer" : "Create new offer"}</DialogDescription>
       
          </DialogHeader>

         <OfferForm/>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default OfferModal