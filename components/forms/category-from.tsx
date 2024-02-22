'use client'

import { useCategory } from '@/hooks/category.hook'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoadingButton from '../loading-button'



type Props = {}

const CategoryForm = (props: Props) => {
  const {form,onSubmit} = useCategory()


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="category title" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="category slug" {...field} />
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
       <LoadingButton className='w-full' title='Submit' loading={form.formState.isSubmitting}/>
      </form>
    </Form>
  )
}

export default CategoryForm