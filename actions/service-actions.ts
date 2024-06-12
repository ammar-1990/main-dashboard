"use server";

import { nextOptions } from "@/app/api/auth/[...nextauth]/nextOptions";
import { CustomError } from "@/custom-error";
import { serviceSchema } from "@/schemas";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { z } from "zod";





export const createService = async ({
  values,
}: {
  values: z.infer<typeof serviceSchema>;
}) => {
  try {
    const session = await getServerSession(nextOptions);

    if (!session?.user) throw new CustomError("Not Authorized");

    const validData = serviceSchema.safeParse(values);
    if (!validData.success) throw new CustomError("Invalid Inputs");

    const existingSlug = await prisma.service.findUnique({
      where:{
          slug:validData.data.slug
      }
  })

  if(existingSlug) return {success:false,error:'Slug already exist'}

    await prisma.service.create({
      data: {
        ...validData.data,
      },
    });

    return { success: true, message: "Service created successfully" }
   
  
  } catch (error) {
    console.error(error);

    let message = "Internal Server Error";
    if (error instanceof CustomError) message = error.message;

    return { success: false, error:message }
  }
};


export const updateService = async ({
    values,
    id
  }: {
    values: z.infer<typeof serviceSchema>,id:string
  }) => {
    try {

        if(!id) throw new CustomError("Id is required")
      const session = await getServerSession(nextOptions);
  
      if (!session?.user) throw new CustomError("Not Authorized");
  
      const validData = serviceSchema.safeParse(values);
      if (!validData.success) throw new CustomError("Invalid Inputs");

      const existingSlug = await prisma.service.findUnique({
        where:{
            slug:validData.data.slug,
            NOT:{id}
        }
    })
  
    if(existingSlug) return {success:false,error:'Slug already exist'}
  
      await prisma.service.update({
        where:{
            id
        },
        data: {
          ...validData.data,
        },
      });
  
      return  { success: true, message: "Service updated successfully" }
      
    } catch (error) {
      console.error(error);
  
      let message = "Internal Server Error";
      if (error instanceof CustomError) message = error.message;
  
      return { success: false, error:message }
    }
  };


  export const deleteService = async (id:string) => {
    try {

        if(!id) throw new CustomError("Id is required")
      const session = await getServerSession(nextOptions);
  
      if (!session?.user) throw new CustomError("Not Authorized");
  
   

  
      await prisma.service.delete({
        where:{
            id
        },
      
      });
  
      return  { success: true, message: "Service deleted successfully" }
       
    } catch (error) {
      console.error(error);
  
      let message = "Internal Server Error";
      if (error instanceof CustomError) message = error.message;
  
      return { success: false, error:message }
    }
  };
