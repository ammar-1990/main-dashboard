import React from 'react'
import NavLinks from './nav-links'

type Props = {}

const SideBar = (props: Props) => {


  return (
    <div className=' h-full flex flex-col'>
        <h3 className='font-medium capitalize p-4 text-center text-xl border-b'>Dashboard</h3>
        <section className='p-2  flex flex-col flex-1'>
<NavLinks/>
        </section>
    </div>
  )
}

export default SideBar