import { Colors, Icons, SubscriptionsPlans } from "@prisma/client";
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


export const offerSchema = z.object({
  label: requiredString,
  slug:requiredString,
  seoTitle:requiredString,
  seoDescription:requiredString,
  description: requiredString,
  content:requiredString,

  previousPrice:z.coerce.number().min(1,"required"),
  currentPrice:z.coerce.number().min(1,"requred"),
  startDate:z.date(),
  endDate:z.date(),
  image: requiredString,
}).refine(data=>data.startDate < data.endDate,{message:"Start Date should be less end date",path:['startDate']});


export const subscriptionPlans:(keyof typeof SubscriptionsPlans)[] = ['BASIC','PRO','STANDARD','UNLIMITED']

export const subscriptionSchema = z.object({
  type:z.nativeEnum(SubscriptionsPlans),
  label:optionalString,
  description:optionalString,
  bulletPoints:z.array(z.object({id:requiredString,point:requiredString})).min(1,"at least one"),
  price:z.coerce.number()
})


export const portfolioSchema = z.object({
  title:z.string().min(1,'required'),
  description:z.string().min(1,'required'),
  escerpt:z.string().min(1,'required'),
  mainImage:z.string().min(1,'required'),
  seoTitle:z.string().min(1,'required'),
  seoDescription:z.string().min(1,'required'),
  problem:z.string().min(1,'required'),
  solution:z.string().min(1,'required'),
  slug:z.string().min(1,'required'),
  
  firstExplainText:z.string().optional(),
  firstExplainImage:z.string().optional(),

  secondExplainText:z.string().optional(),
  secondExplainImage:z.string().optional(),

  thirdExplainText:z.string().optional(),
  thirdExplainImage:z.string().optional(),

  fourthExplainText:z.string().optional(),
  fourthExplainImage:z.string().optional(),

  startDate:z.date(),
  endDate:z.date(),
})