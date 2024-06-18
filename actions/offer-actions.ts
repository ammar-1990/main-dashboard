"use server";

import { nextOptions } from "@/app/api/auth/[...nextauth]/nextOptions";
import { CustomError } from "@/custom-error";
import {  offerSchema } from "@/schemas";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { z } from "zod";





export const createOffer = async ({
  values,
}: {
  values: z.infer<typeof offerSchema>;
}) => {
  try {
    const session = await getServerSession(nextOptions);

    if (!session?.user) throw new CustomError("Not Authorized");

    const validData = offerSchema.safeParse(values);
    if (!validData.success) throw new CustomError("Invalid Inputs");

    const existingSlug = await prisma.offer.findUnique({
      where:{
          slug:validData.data.slug
      }
  })

  if(existingSlug) return {success:false,error:'Slug already exist'}

    await prisma.offer.create({
      data: {
        ...validData.data,
      },
    });

    return { success: true, message: "Offer created successfully" }
   
  
  } catch (error) {
    console.error(error);

    let message = "Internal Server Error";
    if (error instanceof CustomError) message = error.message;

    return { success: false, error:message }
  }
};


export const updateOffer = async ({
    values,
    id
  }: {
    values: z.infer<typeof offerSchema>,id:string
  }) => {
    try {

        if(!id) throw new CustomError("Id is required")
      const session = await getServerSession(nextOptions);
  
      if (!session?.user) throw new CustomError("Not Authorized");
  
      const validData = offerSchema.safeParse(values);
      if (!validData.success) throw new CustomError("Invalid Inputs");

      const existingSlug = await prisma.offer.findUnique({
        where:{
            slug:validData.data.slug,
            NOT:{id}
        }
    })
  
    if(existingSlug) return {success:false,error:'Slug already exist'}
  
      await prisma.offer.update({
        where:{
            id
        },
        data: {
          ...validData.data,
        },
      });
  
      return  { success: true, message: "Offer updated successfully" }
      
    } catch (error) {
      console.error(error);
  
      let message = "Internal Server Error";
      if (error instanceof CustomError) message = error.message;
  
      return { success: false, error:message }
    }
  };


  export const deleteOffer = async (id:string) => {
    try {

        if(!id) throw new CustomError("Id is required")
      const session = await getServerSession(nextOptions);
  
      if (!session?.user) throw new CustomError("Not Authorized");
  
   

  
      await prisma.offer.delete({
        where:{
            id
        },
      
      });
  
      return  { success: true, message: "Offer deleted successfully" }
       
    } catch (error) {
      console.error(error);
  
      let message = "Internal Server Error";
      if (error instanceof CustomError) message = error.message;
  
      return { success: false, error:message }
    }
  };
