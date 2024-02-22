'use client'

import { ModalInputs, useModal } from '@/hooks/modal.hook'
import React, { HTMLAttributes } from 'react'
import { Button } from './ui/button'

type Props = {
    modalInputs:ModalInputs,
    title:string
   
} & HTMLAttributes<HTMLButtonElement>

const ModalButton = ({modalInputs,title,...rest}: Props) => {
    const {setOpen} = useModal()
  return (
    <Button onClick={()=>setOpen(modalInputs)} {...rest}  >{title}</Button>
  )
}

export default ModalButton