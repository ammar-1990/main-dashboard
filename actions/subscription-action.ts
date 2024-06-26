'use server'
import prisma from "@/lib/prisma"

import { CustomError } from "@/custom-error"
import { subscriptionSchema } from "@/schemas"
import { z } from "zod"

export const addSubscription = async ({values}:{values:z.infer<typeof subscriptionSchema>}) =>{

try {
    const validData = subscriptionSchema.safeParse(values)
    if(!validData.success) throw new CustomError('Invalid inputs')

        const subscription = await prisma.subscription.create({
            data:{
                ...validData.data
            }
        })

        return {success:true,message:"Successfully created"}
} catch (error) {
    console.error(error)
    let message = "internal server error"
    if(error instanceof CustomError) message = error.message
    return {success:false,error:message}
}

 
}

export const updateSubscription = async ({values,id}:{values:z.infer<typeof subscriptionSchema>,id:string})=>{
    try {

        const validData = subscriptionSchema.safeParse(values)
        if(!validData.success) throw new CustomError('Invalid inputs')

            const updatedSubscription = await prisma.subscription.update({
                where:{
                    id
                },data:{
                ...validData.data
                }
            })

            return {success:true,message:"Successfully updated"}
        
    } catch (error) {
        console.error(error)
        let message = "internal server error"
        if(error instanceof CustomError) message = error.message
        return {success:false,error:message}
    }
}


export const deleteSubscription = async (id:string)=>{
    try {

        if(!id) return {success:false,error:'Id is required'}

        await prisma.subscription.delete({
            where:{
                id
            }
        })
  
      return { success: true, message: "Subscription successfully deleted" };
    } catch (error) {
        console.error(error)
        let message = "internal server error"
        if(error instanceof CustomError) message = error.message
        return {success:false,error:message}
    }
        
  
}