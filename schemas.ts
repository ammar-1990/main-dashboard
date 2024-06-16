import { Colors, Icons } from "@prisma/client";
import { z } from "zod";

const requiredString = z.string().min(1, "Required");
const optionalString = z.string().optional();

export const signinSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export const categorySchema = z.object({
  title: requiredString,
  slug: requiredString,
});

export const blogSchema = z.object({
  title: requiredString,
  description: requiredString,
  content: requiredString,
  image: requiredString,
  author: z.string().optional(),
  slug: requiredString,
  categoryId: requiredString,
});

export const serviceSchema = z.object({
  label: requiredString,
  slug:requiredString,
  seoTitle:requiredString,
  seoDescription:requiredString,
  description: requiredString,
  content:requiredString,
  icon:z.nativeEnum(Icons),
  iconColor:z.nativeEnum(Colors),
  image: requiredString,
});

export type ColorsType = keyof typeof Colors
export type IconsType = keyof typeof Icons

export const iconsColors:ColorsType[] = ["LIGHT_BLUE","LIGHT_PINK","LIGHT_YELLOW"] as const 
export const icons:IconsType[] = ["SOFTWARE","DESIGN","AI","MARKETING"] as const 

export const serviceItemSchema = z.object({
  label: requiredString,
  slug:requiredString,
  seoTitle:requiredString,
  seoDescription:requiredString,
  description: optionalString,
  image: requiredString,
  initialPrice: z.coerce.number().min(1,"required"),
  serviceId:requiredString
});
