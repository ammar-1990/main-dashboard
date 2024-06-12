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

import ServiceForm from "../(service)/service-from"
import ServiceItemForm from "../(serviceItem)/service-Item-form"
  
  type Props = {}
  
  const ServiceItemModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()

    const isOpen = open && modalInputs?.type==='service-item'
    const serviceItem = modalInputs?.type==="service-item" ? modalInputs.data : null
    return (
        <Dialog  open={isOpen} onOpenChange={setClose}>
      
        <DialogContent className="max-w-[700px] max-h-[95vh] overflow-y-scroll scroll ">
          <DialogHeader>
            <DialogTitle>Service Item</DialogTitle>
            <DialogDescription>{serviceItem ? `Update ${serviceItem.label}`:"Create Service Item"}</DialogDescription>
       
          </DialogHeader>

          <ServiceItemForm/>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default ServiceItemModal