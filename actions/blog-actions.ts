"use server";

import { blogSchema, categorySchema } from "@/schemas";
import prisma from "@/lib/prisma";

export const createBlog = async (
  data: any
): Promise<{ success: boolean; error?: string; message?: string }> => {
  try {
    const validData = blogSchema.safeParse(data);

    if (!validData.success) return { success: false, error: "Invalid inputs" };

    const existingSlug = await prisma.blog.findUnique({
        where:{
            slug:validData.data.slug,
           
        }
    })

    if(existingSlug) return {success:false,error:'Slug already exist'}
    await prisma.blog.create({
      data: {
        ...validData.data,
      },
    });

    return { success: true, message: "Blog successfully created" };
  } catch (error) {
    console.log(error);

    return { success: false, error: "Internal server error" };
  }
};

export const editBlog = async (
  data: any,
  id: string
): Promise<{ success: boolean; error?: string; message?: string }> => {
  if (!id)
    return {
      success: false,
      error: "Id is required",
    };
  try {
    const validData = blogSchema.safeParse(data);

    if (!validData.success) return { success: false, error: "Invalid inputs" };

    const existingSlug = await prisma.blog.findUnique({
        where:{
            slug:validData.data.slug,
            NOT:{
                id
            }
        }
    })

    if(existingSlug) return {success:false,error:'Slug already exist'}

    await prisma.blog.update({
        where:{
            id
        },
      data: {
        ...validData.data,
      },
    });

    return { success: true, message: "Blog successfully updated" };
  } catch (error) {
    console.log(error);

    return { success: false, error: "Internal server error" };
  }
};



export const deleteBlog = async (
    id: string
  ): Promise<{ success: boolean; error?: string; message?: string }> => {
    try {
    
        if(!id) return {success:false,error:'Id is required'}

        await prisma.blog.delete({
            where:{
                id
            }
        })
  
      return { success: true, message: "Blog successfully deleted" };
    } catch (error) {
      console.log(error);
  
      return { success: false, error: "Internal server error" };
    }
  };