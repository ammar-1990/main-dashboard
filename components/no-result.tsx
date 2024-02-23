import React from 'react'

type Props = {
    title?:string,
    description?:string
}

const NoResult = ({title='No result',description}: Props) => {
  return (
    <div className='flex flex-col gap-1 items-center justify-center'>
<p className='text-4xl text-muted-foreground capitalize'>{title}</p>
{description && <p className='text-sm text-muted-foreground first-letter:capitalize'>{description}</p>}
    </div>
  )
}

export default NoResult