import React from 'react'
import prisma from "@/lib/prisma";
import PortfolioForm from '@/components/(portfolio)/PortfolioForm';
import { notFound } from 'next/navigation';

type Props = {
    params:{slug:string}
}

const page = async ({params:{slug}}: Props) => {

    const portfolio = await prisma.portfolio.findUnique({
        where:{
            slug
        }
    })

    if(!portfolio && slug !=='new') return notFound()
  return (
    <div>
        <PortfolioForm portfolio={portfolio} />
    </div>
  )
}

export default page