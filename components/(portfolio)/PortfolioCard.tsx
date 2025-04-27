import { Portfolio } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {portfolio:Portfolio}

const PortfolioCard = ({portfolio}: Props) => {
  return (
    <Link href={`/dashboard/portfolio/${portfolio.slug}`} className='p-3 border rounded-md flex flex-col gap-3 bg-white'>
        <div className='w-full aspect-square relative'>
    <Image src={portfolio.mainImage} fill className='object-contain' alt='portfolio-image' /> 
        </div>
        <div>
            <h3 className='font-semibold text-2xl'>{portfolio.title}</h3>
            <p className='text-xs text-muted-foreground line-clamp-4'>{portfolio.escerpt}</p>
        </div>
    </Link>
  )
}

export default PortfolioCard