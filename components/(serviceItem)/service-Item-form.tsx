import { useService } from "@/hooks/service-hook";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import UploadComponent from "../upload-component";
import { useModal } from "@/hooks/modal.hook";
import { Loader2 } from "lucide-react";
import { useServiceItem } from "@/hooks/service-item-hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {};

const ServiceItemForm = (props: Props) => {
  const { form, onSubmit } = useServiceItem();
  const { modalInputs } = useModal();
  const serviceItem =
    modalInputs?.type === "service-item" ? modalInputs.data : null;
  const services =
    modalInputs?.type === "service-item" ? modalInputs.services : null;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* label and service */}
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
          name="serviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services?.map((service) => (
                    <SelectItem className="cursor-pointer" key={service.id} value={service.id}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        </div>
      {/* slug and initial price */}
      <div className="form_devider">
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
        <FormField
          control={form.control}
          name="initialPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Price*</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Initial Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
       {/* seo title and seo disccription */}
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
                <Textarea
                  className="resize-none"
                  placeholder="SEO Description"
                  {...field}
                />
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
              <FormLabel className="flex items-center gap-1">
                Description{" "}
                <span className="px-2 py-1 bg-muted  rounded-md text-[10px]">
                  Optional
                </span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Description"
                  {...field}
                />
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
        <Button disabled={form.formState.isSubmitting} type="submit">
          {serviceItem ? "Update" : "Create"}{" "}
          {form.formState.isSubmitting && (
            <Loader2 size={12} className="animate-spin ml-3" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ServiceItemForm;
