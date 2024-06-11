import Heading from '@/components/heading'
import ModalButton from '@/components/modalButton'
import React from 'react'

type Props = {}

const page = async(props: Props) => {

  return (
    <div>
      <div className='flex items-center justify-between'>
      <Heading title='Services' description='Create new service' />
      <ModalButton modalInputs={{type:'service',data:undefined}} title='Create Service'/>
      </div>
 
    </div>
  )
}

export default page