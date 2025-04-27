import PortfolioFeed from '@/components/(portfolio)/PortfolioFeed'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
             <div className="flex md:items-center justify-between md:!flex-row flex-col gap-3">
        <Heading title="Portfolio" description="Create new project" />
        <Button asChild>
        <Link href={'/dashboard/portfolio/new'} className='flex items-center gap-3' ><PlusCircle className='size-4' />Add Portfolio</Link>
        </Button>
        
       
      </div>

      <div className='mt-8'>
        <PortfolioFeed />
      </div>
    </div>
  )
}

export default page