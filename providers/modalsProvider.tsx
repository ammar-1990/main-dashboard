'use client'

import CategoryModal from '@/components/modals/category-modal'
import DeleteModal from '@/components/modals/delete-modal'
import React, { useEffect, useState } from 'react'

type Props = {}

const ModalsProvider = (props: Props) => {

    const [mount, setMount] = useState(false)

    useEffect(()=>{
        setMount(true)
    },[])

    if(!mount) return null
  return (
    <>
    
    <CategoryModal/>
    <DeleteModal/>
    
    </>
  )
}

export default ModalsProvider