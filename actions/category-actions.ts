"use server";

import { categorySchema } from "@/schemas";
import prisma from "@/lib/prisma";

export const createCategory = async (
  data: any
): Promise<{ success: boolean; error?: string; message?: string }> => {
  try {
    const validData = categorySchema.safeParse(data);

    if (!validData.success) return { success: false, error: "Invalid inputs" };

    const existingSlug = await prisma.category.findUnique({
        where:{
            slug:validData.data.slug
        }
    })

    if(existingSlug) return {success:false,error:'Slug already exist'}
    await prisma.category.create({
      data: {
        ...validData.data,
      },
    });

    return { success: true, message: "Category successfully created" };
  } catch (error) {
    console.log(error);

    return { success: false, error: "Internal server error" };
  }
};

export const editCategory = async (
  data: any,
  id: string
): Promise<{ success: boolean; error?: string; message?: string }> => {
  if (!id)
    return {
      success: false,
      error: "Id is required",
    };
  try {
    const validData = categorySchema.safeParse(data);

    if (!validData.success) return { success: false, error: "Invalid inputs" };

    const existingSlug = await prisma.category.findUnique({
        where:{
            slug:validData.data.slug,
            NOT:{
                id
            }
        }
    })

    if(existingSlug) return {success:false,error:'Slug already exist'}

    await prisma.category.update({
        where:{
            id
        },
      data: {
        ...validData.data,
      },
    });

    return { success: true, message: "Category successfully updated" };
  } catch (error) {
    console.log(error);

    return { success: false, error: "Internal server error" };
  }
};



export const deleteCategory = async (
    id: string
  ): Promise<{ success: boolean; error?: string; message?: string }> => {
    try {
    
        if(!id) return {success:false,error:'Id is required'}

        await prisma.category.delete({
            where:{
                id
            }
        })
  
      return { success: true, message: "Category successfully deleted" };
    } catch (error) {
      console.log(error);
  
      return { success: false, error: "Internal server error" };
    }
  };