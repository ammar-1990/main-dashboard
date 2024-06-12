"use server";

import { nextOptions } from "@/app/api/auth/[...nextauth]/nextOptions";
import { CustomError } from "@/custom-error";
import { serviceItemSchema } from "@/schemas";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { z } from "zod";





export const createServiceItem = async ({
  values,
}: {
  values: z.infer<typeof serviceItemSchema>;
}) => {
  try {
    const session = await getServerSession(nextOptions);

    if (!session?.user) throw new CustomError("Not Authorized");

    const validData = serviceItemSchema.safeParse(values);
    if (!validData.success) throw new CustomError("Invalid Inputs");

    const existingSlug = await prisma.serviceItem.findUnique({
      where:{
          slug:validData.data.slug
      }
  })

  if(existingSlug) return {success:false,error:'Slug already exist'}

    await prisma.serviceItem.create({
      data: {
        ...validData.data,
      },
    });

    return { success: true, message: "Service item created successfully" }
   
  
  } catch (error) {
    console.error(error);

    let message = "Internal Server Error";
    if (error instanceof CustomError) message = error.message;

    return { success: false, error:message }
  }
};


export const updateServiceItem = async ({
    values,
    id
  }: {
    values: z.infer<typeof serviceItemSchema>,id:string
  }) => {
    try {

        if(!id) throw new CustomError("Id is required")
      const session = await getServerSession(nextOptions);
  
      if (!session?.user) throw new CustomError("Not Authorized");
  
      const validData = serviceItemSchema.safeParse(values);
      if (!validData.success) throw new CustomError("Invalid Inputs");

      const existingSlug = await prisma.service.findUnique({
        where:{
            slug:validData.data.slug,
            NOT:{id}
        }
    })
  
    if(existingSlug) return {success:false,error:'Slug already exist'}
  
      await prisma.serviceItem.update({
        where:{
            id
        },
        data: {
          ...validData.data,
        },
      });
  
      return  { success: true, message: "Service Item updated successfully" }
      
    } catch (error) {
      console.error(error);
  
      let message = "Internal Server Error";
      if (error instanceof CustomError) message = error.message;
  
      return { success: false, error:message }
    }
  };


  export const deleteServiceItem = async (id:string) => {
    try {

        if(!id) throw new CustomError("Id is required")
      const session = await getServerSession(nextOptions);
  
      if (!session?.user) throw new CustomError("Not Authorized");
  
   

  
      await prisma.serviceItem.delete({
        where:{
            id
        },
      
      });
  
      return  { success: true, message: "Service Item deleted successfully" }
       
    } catch (error) {
      console.error(error);
  
      let message = "Internal Server Error";
      if (error instanceof CustomError) message = error.message;
  
      return { success: false, error:message }
    }
  };
