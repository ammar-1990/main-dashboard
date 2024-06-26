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
import ServiceForm from "../(service)/service-from"
import SubscriptionForm from "../(subscription)/subscription-form"
  
  type Props = {}
  
  const SubscriptionModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()

    const isOpen = open && modalInputs?.type==='subscription'
    const subscription = modalInputs?.type==="subscription" ? modalInputs.data : null
    return (
        <Dialog  open={isOpen} onOpenChange={setClose}>
      
        <DialogContent className="max-w-[700px] scroll max-h-[98vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Subscription</DialogTitle>
            <DialogDescription>{subscription ? `Update ${subscription.label}`:"Create Subscription"}</DialogDescription>
       
          </DialogHeader>

          <SubscriptionForm/>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default SubscriptionModal