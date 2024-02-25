'use client'

import { ModalInputs, useModal } from '@/hooks/modal.hook'
import React, { HTMLAttributes } from 'react'
import { Button } from './ui/button'

type Props = {
    modalInputs:ModalInputs,
    title:string,
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
   
} & HTMLAttributes<HTMLButtonElement>

const ModalButton = ({modalInputs,title,variant,...rest}: Props) => {
    const {setOpen} = useModal()
  return (
    <Button type='button' variant={variant}  onClick={()=>setOpen(modalInputs)} {...rest}  >{title}</Button>
  )
}

export default ModalButton