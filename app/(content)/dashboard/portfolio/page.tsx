import Heading from '@/components/heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
             <div className="flex md:items-center justify-between md:!flex-row flex-col gap-3">
        <Heading title="Portfolio" description="Create new project" />
       
      </div>
    </div>
  )
}

export default page