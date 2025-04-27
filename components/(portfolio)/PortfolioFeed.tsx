import React from 'react'
import prisma from '@/lib/prisma'
import NoResult from '../no-result'
import Link from 'next/link'
import PortfolioCard from './PortfolioCard'
type Props = {}

const PortfolioFeed =async (props: Props) => {

    const portfolios = await prisma.portfolio.findMany({
        orderBy:{
            createdAt:'desc'
        }
    })

    if(!portfolios.length) return <div><NoResult title='No Porfolios Added Yet' /></div>
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {portfolios.map(el=><PortfolioCard key={el.id} portfolio={el} />)}
    </div>
  )
}

export default PortfolioFeed