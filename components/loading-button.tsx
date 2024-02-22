'use client'

import React, { HTMLAttributes } from 'react'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'

type Props = {
    loading:boolean
title:string
} & HTMLAttributes<HTMLButtonElement>

const LoadingButton = ({loading,title,...rest}: Props) => {
  return (
    <Button disabled={loading} {...rest}> {title} {loading && <Loader className='animate-spin ml-3 w-4 h-4'/>}</Button>
  )
}

export default LoadingButton