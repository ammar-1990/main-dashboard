import Heading from '@/components/heading'
import ModalButton from '@/components/modalButton'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <div className='flex items-center justify-between'>  
        <Heading title='Blogs' description='Manage your blogs' />
        <ModalButton className='' title='Create Category' modalInputs={{type:'category'}}/>

      </div>
    
    </div>
  )
}

export default page