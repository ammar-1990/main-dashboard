import { useService } from '@/hooks/service-hook'
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
import { Textarea } from '../ui/textarea'
import UploadComponent from '../upload-component'
import { useModal } from '@/hooks/modal.hook'
import { Loader2 } from 'lucide-react'

type Props = {}

const ServiceForm = (props: Props) => {

    const {form,onSubmit} = useService()
    const {modalInputs} = useModal()
    const service = modalInputs?.type==='service' ? modalInputs.data : null
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* label and slug */}
        <div className="form_devider">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label*</FormLabel>
              <FormControl>
                <Input placeholder="Label" {...field} />
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
              <FormLabel>Slug*</FormLabel>
              <FormControl>
                <Input placeholder="Slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        {/* seo title and seo description */}
  <div className="form_devider">
  <FormField
          control={form.control}
          name="seoTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SEO Title*</FormLabel>
              <FormControl>
                <Input placeholder="SEO Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seoDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SEO Description*</FormLabel>
              <FormControl>
                <Textarea className='resize-none' placeholder="SEO Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  </div>
       
         <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-1'>Description <span className='px-2 py-1 bg-muted  rounded-md text-[10px]'>Optional</span></FormLabel>
              <FormControl>
                <Textarea className='resize-none' placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
     
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image*</FormLabel>
              <FormControl>
                <UploadComponent
                  image={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">{service ? "Update" : "Create"} {form.formState.isSubmitting && <Loader2 size={12} className='animate-spin ml-3'/>}</Button>
      </form>
    </Form>
  )
}

export default ServiceForm