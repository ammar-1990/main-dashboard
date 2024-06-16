import { Service } from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { serviceSchema } from "@/schemas";
import { useModal } from "./modal.hook";
import { toast } from "sonner";
import { createService, updateService } from "@/actions/service-actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { replaceSpacesWithHyphens } from "@/lib/utils";

export const useService = () => {
  const { setClose, modalInputs } = useModal();
  const router = useRouter();

  const service = modalInputs?.type === "service" ? modalInputs.data : null;

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      label: service?.label || "",
      slug:service?.slug || "",
      seoTitle:service?.seoTitle || "",
      seoDescription:service?.seoDescription || "",
      description: service?.description || "",
      image: service?.image || "",
      content:service?.content || "",
      icon:service?.icon || undefined,
      iconColor:service?.iconColor || undefined

    },
  });

  const slug = form.watch('slug')
  useEffect(()=>{

    const value = replaceSpacesWithHyphens(slug)

    form.setValue('slug',value)

  },[slug,form])

  async function onSubmit(values: z.infer<typeof serviceSchema>) {
    try {
      let res;
      if (!service) {
        res = await createService({ values });
      } else {
        res = await updateService({ values, id: service!.id });
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
