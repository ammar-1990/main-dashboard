import { z } from "zod";

const requiredString = z.string().min(1,'Required')
export const signinSchema = z.object({
username:requiredString,
password:requiredString
})

export const categorySchema = z.object({
    title:requiredString,
    slug:requiredString
})


export const blogSchema = z.object({
    title:requiredString,
    description:requiredString,
    content:requiredString,
    image:requiredString,
    author:z.string().optional(),
    slug:requiredString,
    categoryId:requiredString
})