import SigninForm from '@/components/signin-form'
import { getServerSession } from 'next-auth'
import React from 'react'
import { nextOptions } from './api/auth/[...nextauth]/nextOptions'
import { redirect } from 'next/navigation'

type Props = {}

const page = async(props: Props) => {
  const session = await getServerSession(nextOptions)
  if(session?.user) redirect('/dashboard')
  return (
    <div className='h-screen flex items-center justify-center'>
      <SigninForm/>
    </div>
  )
}

export default page