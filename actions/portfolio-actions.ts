'use server'

import { nextOptions } from "@/app/api/auth/[...nextauth]/nextOptions";
import { CustomError } from "@/custom-error";
import { portfolioSchema } from "@/schemas";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/lib/prisma";


export const createPortfolio = async (values:z.infer<typeof portfolioSchema>):Promise<{success:boolean,message?:string,error?:string}>=>{

    try {
            const session = await getServerSession(nextOptions);       
            if (!session?.user) throw new CustomError("Not Authorized");

            const validData = portfolioSchema.safeParse(values)
            if(!validData.success)  throw new CustomError("Invalid Inputs")


            const slugExists= await prisma.portfolio.findUnique({
                where:{
                    slug:validData.data.slug
                }
            })

            if(slugExists) throw new CustomError("slug exists")

                await prisma.portfolio.create({
                    data:{
                        ...validData.data
                    }
                })

                return {success:true, message:'Added Successfully'}

    }catch (error) {
        console.error(error)
            let message = "internal server error"
            if(error instanceof CustomError) message = error.message
            return {success:false,error:message}
      }
}



export const updatePortfolio = async (values:z.infer<typeof portfolioSchema>,id:string):Promise<{success:boolean,message?:string,error?:string}>=>{

    try {

        if(!id) throw new CustomError('ID is required')
            const session = await getServerSession(nextOptions);       
            if (!session?.user) throw new CustomError("Not Authorized");

            const validData = portfolioSchema.safeParse(values)
            if(!validData.success)  throw new CustomError("Invalid Inputs")


            const slugExists= await prisma.portfolio.findUnique({
                where:{
             
                        slug:validData.data.slug,
                        NOT:{id}
                  
                }
            })


            if(slugExists) throw new CustomError("slug exists")

                await prisma.portfolio.update({
                    where:{
                        slug:validData.data.slug,
                    },
                    data:{
                        ...validData.data
                    }
                })

                return {success:true, message:'Updated Successfully'}

    }catch (error) {
        console.error(error)
            let message = "internal server error"
            if(error instanceof CustomError) message = error.message
            return {success:false,error:message}
      }
}


export const deleteePortfolio = async (id:string):Promise<{success:boolean,message?:string,error?:string}>=>{

    try {

        if(!id) throw new CustomError('ID is required')
            const session = await getServerSession(nextOptions);       
            if (!session?.user) throw new CustomError("Not Authorized");

      


            const portfolioExists= await prisma.portfolio.findUnique({
                where:{
             id
                  
                }
            })


            if(!portfolioExists) throw new CustomError("portfolio does not exists")

                await prisma.portfolio.delete({
                    where:{
                       id
                    },
               
                })

                return {success:true, message:'Updated deleted'}

    }catch (error) {
        console.error(error)
            let message = "internal server error"
            if(error instanceof CustomError) message = error.message
            return {success:false,error:message}
      }
}