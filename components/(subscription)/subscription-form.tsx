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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { v4 as uuidv4 } from "uuid";

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
import { ChevronDown, DollarSign, Loader2, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import { icons, iconsColors, subscriptionPlans } from "@/schemas";
import { colorsMapping, iconsMapping } from "@/mapping";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/hooks/subscription.hook";

//bg-[#D4F0FF]
//bg-[#FFDED4]
//bg-[#FFEED4]

type Props = {};

const SubscriptionForm = (props: Props) => {
  const { form, onSubmit } = useSubscription();
  const { modalInputs } = useModal();
  const subscription =
    modalInputs?.type === "subscription" ? modalInputs.data : null;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* label and slug */}
<div className="form_devider">
<FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Subscription plan*</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="max-w-[240px]" variant="outline">
                      {form.watch("type")}
                      <ChevronDown className="ml-auto" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {subscriptionPlans.map((plan) => (
                        <DropdownMenuRadioItem
                          className="cursor-pointer"
                          key={plan}
                          value={plan}
                        >
                          {plan}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">Price* </FormLabel>
              <FormControl>
                <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-[50%] text-gray-400 "><DollarSign size={15}/></span>
                  <Input type="number" className="pl-6" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
</div>
     


        <FormField
          control={form.control}
          name="bulletPoints"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 w-full">
              <div>
                <FormLabel>points*</FormLabel>
                <Button
                  type="button"
                  onClick={() => {
                    const newBulletPoints = [
                      ...form.watch("bulletPoints"),
                      { id: uuidv4(), point: "" },
                    ];
                    form.setValue("bulletPoints", newBulletPoints);
                  }}
                  className="w-full"
                >
                  Add Point
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {form.watch("bulletPoints").map((point, index) => (
                  <FormField
                    key={point.id}
                    control={form.control}
                    name={`bulletPoints.${index}`}
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex items-center w-full gap-1">
                          <Input
                            placeholder="Add Point"
                            className="flex-1"
                            {...field}
                            value={field.value.point}
                            onChange={(e) =>
                              field.onChange({
                                ...field.value,
                                point: e.target.value,
                              })
                            }
                          />
                          <button
                            className="p-1 text-white bg-rose-500 rounded-md"
                            onClick={() => {
                              const newBulletPoints = form
                                .watch("bulletPoints")
                                .filter((bp) => bp.id !== field.value.id);
                              form.setValue("bulletPoints", newBulletPoints);
                            }}
                            title="delete"
                            type="button"
                          >
                            <Trash size={20} />
                          </button>
                        </div>

                        {form.formState.errors.bulletPoints &&
                          form.formState.errors.bulletPoints[index] && (
                            <p className="text-red-500 text-xs">
                              {
                                form.formState.errors.bulletPoints[index]?.point
                                  ?.message
                              }
                            </p>
                          )}
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {!!form.formState.errors.bulletPoints &&
                !form.watch("bulletPoints").length && (
                  <p className="text-red-500 text-xs">
                    {form.formState.errors.bulletPoints.message}
                  </p>
                )}
            </FormItem>
          )}
        />
             <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Label{" "}
              </FormLabel>
              <FormControl>
                <Input
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

        <Button disabled={form.formState.isSubmitting} type="submit">
          {subscription ? "Update" : "Create"}{" "}
          {form.formState.isSubmitting && (
            <Loader2 size={12} className="animate-spin ml-3" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SubscriptionForm;
