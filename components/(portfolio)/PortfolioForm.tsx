"use client";

import { usePortfolio } from "@/hooks/portfolio-hook";
import { Portfolio } from "@prisma/client";

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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { CalendarIcon, Loader } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import ModalButton from "../modalButton";
import { deleteePortfolio } from "@/actions/portfolio-actions";


type Props = {
  portfolio: Portfolio | null;
};

const PortfolioForm = ({ portfolio }: Props) => {
  const { form, onSubmit } = usePortfolio(portfolio);
  const isSubmitting = form.formState.isSubmitting
  return (
    <Form {...form}>
      <div className="max-w-[450px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="description" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="escerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea placeholder="excerpt" {...field} />
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
                  <Input placeholder="slug" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seoTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seo Title</FormLabel>
                <FormControl>
                  <Input placeholder="seo title" {...field} />
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
                <FormLabel>Seo Description</FormLabel>
                <FormControl>
                  <Input placeholder="seo description" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mainImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Image</FormLabel>
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
          <FormField
            control={form.control}
            name="problem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problem</FormLabel>
                <FormControl>
                  <Textarea placeholder="problem" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="solution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solution</FormLabel>
                <FormControl>
                  <Textarea placeholder="solution" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstExplainText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Paragraph</FormLabel>
                <FormControl>
                  <Textarea placeholder="first paragraph" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstExplainImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Image</FormLabel>
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

          <FormField
            control={form.control}
            name="secondExplainText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Second Paragraph</FormLabel>
                <FormControl>
                  <Textarea placeholder="second paragraph" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secondExplainImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Second Image</FormLabel>
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

<FormField
          control={form.control}
          name="thirdExplainText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thirt Paragraph</FormLabel>
              <FormControl>
                <Textarea placeholder="third paragraph" {...field} />
              </FormControl>
 
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
                  control={form.control}
                  name="thirdExplainImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Third Image</FormLabel>
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

                {/* date */}

                <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>


              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>


              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4">
        <Button disabled={isSubmitting}   type="submit">{portfolio ? 'Update' : 'Submit'} { isSubmitting && <Loader className="size-4 animate-spin" />}</Button>
        {portfolio &&   <ModalButton variant={'destructive'} modalInputs={{type:'delete',id:portfolio.id,deleteFunction:deleteePortfolio,backUrl:'/dashboard/portfolio'}} title="Delete" />}
        </div>

        </form>
      </div>
    </Form>
  );
};

export default PortfolioForm;
