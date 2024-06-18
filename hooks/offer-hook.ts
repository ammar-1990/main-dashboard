import { Service } from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { offerSchema } from "@/schemas";
import { useModal } from "./modal.hook";
import { toast } from "sonner";
import { createService, updateService } from "@/actions/service-actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { replaceSpacesWithHyphens } from "@/lib/utils";
import { createOffer, updateOffer } from "@/actions/offer-actions";

export const useOffer = () => {
  const { setClose, modalInputs } = useModal();
  const router = useRouter();

  const offer = modalInputs?.type === "offer" ? modalInputs.data : null;

  const form = useForm<z.infer<typeof offerSchema>>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      label: offer?.label || "",
      slug:offer?.slug || "",
      seoTitle:offer?.seoTitle || "",
      seoDescription:offer?.seoDescription || "",
      description: offer?.description || "",
      image: offer?.image || "",
      content:offer?.content || "",
      currentPrice:offer?.currentPrice || undefined,
      previousPrice:offer?.previousPrice || undefined,
      startDate:offer?.startDate || undefined,
      endDate:offer?.endDate || undefined
   

    },
  });

  const slug = form.watch('slug')
  useEffect(()=>{

    const value = replaceSpacesWithHyphens(slug)

    form.setValue('slug',value)

  },[slug,form])

  const [openStartDate, setOpenStartDate] = useState(false)
  const [openEndtDate, setOpenEndDate] = useState(false)


  

  async function onSubmit(values: z.infer<typeof offerSchema>) {
    try {
      let res;
      if (!offer) {
        res = await createOffer({ values });
      } else {
        res = await updateOffer({ values, id: offer!.id });
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

  return { form, onSubmit,openStartDate,openEndtDate,setOpenStartDate,setOpenEndDate };
};
