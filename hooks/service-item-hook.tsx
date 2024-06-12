import { Service } from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { serviceItemSchema } from "@/schemas";
import { useModal } from "./modal.hook";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { replaceSpacesWithHyphens } from "@/lib/utils";
import { createServiceItem, updateServiceItem } from "@/actions/service-item-actions";

export const useServiceItem = () => {
  const { setClose, modalInputs } = useModal();
  const router = useRouter();

  const serviceItem = modalInputs?.type === "service-item" ? modalInputs.data : null;

  const form = useForm<z.infer<typeof serviceItemSchema>>({
    resolver: zodResolver(serviceItemSchema),
    defaultValues: {
      label: serviceItem?.label || "",
      slug:serviceItem?.slug || "",
      seoTitle:serviceItem?.seoTitle || "",
      seoDescription:serviceItem?.seoDescription || "",
      description: serviceItem?.description || "",
      image: serviceItem?.image || "",
      initialPrice:serviceItem?.initialPrice || undefined,
      serviceId:serviceItem?.serviceId || ""

    },
  });

  const slug = form.watch('slug')
  useEffect(()=>{

    const value = replaceSpacesWithHyphens(slug)

    form.setValue('slug',value)

  },[slug,form])

  async function onSubmit(values: z.infer<typeof serviceItemSchema>) {
    try {
      let res;
      if (!serviceItem) {
        res = await createServiceItem({ values });
      } else {
        res = await updateServiceItem({ values, id: serviceItem!.id });
      }
      if (!res.success) {
        return toast.error(res.error);
      }
      toast.success(res.message);
      router.refresh();
      setClose();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }

  return { form, onSubmit };
};
