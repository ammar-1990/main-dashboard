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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import UploadComponent from "../upload-component";
import { useModal } from "@/hooks/modal.hook";
import { CalendarIcon, ChevronDown, DollarSign, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { icons, iconsColors } from "@/schemas";
import { colorsMapping, iconsMapping } from "@/mapping";
import { cn } from "@/lib/utils";
import { useOffer } from "@/hooks/offer-hook";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
const Editor = dynamic(() => import("../../components/editor-blocknote"), {
  ssr: false,
});
//bg-[#D4F0FF]
//bg-[#FFDED4]
//bg-[#FFEED4]


type Props = {};

const OfferForm = (props: Props) => {
  const { form, onSubmit,openEndtDate,openStartDate,setOpenEndDate,setOpenStartDate } = useOffer();
  const { modalInputs } = useModal();
  const offer = modalInputs?.type === "offer" ? modalInputs.data : null;
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

       <div className="form_devider"
       >
           <FormField
          control={form.control}
          name="previousPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Previous Price{" "}
              </FormLabel>
              <FormControl>
                <div className="relative ">
                    <span className="absolute left-2 top-1/2 -translate-y-[50%]  text-slate-400"><DollarSign size={12} className="" /></span>
                <Input
                  min={10}
                type="number"
                  className="pl-8"
                  placeholder="Previous Price"
                  {...field}
                />
                    </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="currentPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Previous Price{" "}
              </FormLabel>
              <FormControl>
                <div className="relative ">
                    <span className="absolute left-2 top-1/2 -translate-y-[50%]  text-slate-400"><DollarSign size={12} className="" /></span>
                <Input
                min={10}
                type="number"
                  className="pl-8"
                  placeholder="Current Price"
                  {...field}
                />
                    </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       </div>
       <div className="form_devider gap-4"
       >
           <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Start At{" "}
              </FormLabel>
              <Popover open={openStartDate} onOpenChange={setOpenStartDate} >
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
                    onSelect={date=>{field.onChange(date);setOpenStartDate(false)}}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0,0,0,0))
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
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                End At{" "}
              </FormLabel>
              <Popover open={openEndtDate} onOpenChange={setOpenEndDate}>
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
                    onSelect={date=>{field.onChange(date);setOpenEndDate(false)}}
                    disabled={(date) =>
                        date < new Date(new Date().setHours(0,0,0,0)) || date <= form.watch('startDate')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor
                  onChange={field.onChange}
                  initialContent={field.value}
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
          {offer ? "Update" : "Create"}{" "}
          {form.formState.isSubmitting && (
            <Loader2 size={12} className="animate-spin ml-3" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default OfferForm;
