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