import { z } from "zod";



const requiredString = z.string().min(1,'Required')
const optionalString = z.string().optional()


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

export const serviceSchema = z.object({
    label:requiredString,
    description:optionalString,
    image:requiredString,

})

export const serviceItemSchema = z.object({
    label:requiredString,
    description:optionalString,
    image:requiredString,
    initialPrice:z.coerce.number()

})