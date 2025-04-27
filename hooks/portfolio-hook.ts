import { Portfolio } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { portfolioSchema } from "@/schemas";
import { z } from "zod";
import { createPortfolio, updatePortfolio } from "@/actions/portfolio-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const usePortfolio = (portfolio: Portfolio | null) => {
  const form = useForm<z.infer<typeof portfolioSchema>>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: portfolio?.title ?? "",
      description: portfolio?.description ?? "",
      escerpt: portfolio?.escerpt ?? "",
      mainImage:portfolio?.mainImage ?? '',
      seoTitle: portfolio?.seoTitle ?? "",
      seoDescription: portfolio?.seoDescription ?? "",
      problem: portfolio?.problem ?? "",
      solution: portfolio?.solution ?? "",
      slug: portfolio?.slug ?? "",
      firstExplainText: portfolio?.firstExplainText ?? "",
      firstExplainImage: portfolio?.firstExplainImage ?? "",
      secondExplainText: portfolio?.secondExplainText ?? "",
      secondExplainImage: portfolio?.secondExplainImage ?? "",
      thirdExplainText: portfolio?.thirdExplainText ?? "",
      thirdExplainImage: portfolio?.thirdExplainImage ?? "",
      fourthExplainText: portfolio?.fourthExplainText ?? "",
      fourthExplainImage: portfolio?.fourthExplainImage ?? "",
      startDate: portfolio?.startDate ?? undefined,
      endDate: portfolio?.endDate ?? undefined,
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof portfolioSchema>) {
    try {
      let res;
      if (portfolio) {
        res = await updatePortfolio(values, portfolio.id);
      } else {
        res = await createPortfolio(values);
      }
      if (!res.success) {
        return toast.error(res.error);
      }
      toast.success(res.message);
      router.push("/dashboard/portfolio");
      router.refresh()
    } catch (error) {
      console.error(error);
    }
  }

  return { form, onSubmit };
};
