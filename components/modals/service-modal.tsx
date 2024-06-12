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
  
  type Props = {}
  
  const ServiceModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()

    const isOpen = open && modalInputs?.type==='service'
    const service = modalInputs?.type==="service" ? modalInputs.data : null
    return (
        <Dialog  open={isOpen} onOpenChange={setClose}>
      
        <DialogContent className="max-w-[700px] max-h-[95vh] overflow-y-scroll scroll ">
          <DialogHeader>
            <DialogTitle>Service</DialogTitle>
            <DialogDescription>{service ? `Update ${service.label}`:"Create Service"}</DialogDescription>
       
          </DialogHeader>

          <ServiceForm/>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default ServiceModal