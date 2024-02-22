import React from 'react'

type Props = {
    title:string,
    description:string
}

const Heading = ({title,description}: Props) => {
  return (
    <div className='flex flex-col'>
        <h3 className='text-4xl capitalize font-medium'>{title}</h3>
        <p className='text-muted-foreground text-sm first-letter:capitalize'>{description}</p>
    </div>
  )
}

export default Heading