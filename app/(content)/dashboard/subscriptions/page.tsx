import { deleteSubscription } from "@/actions/subscription-action";
import Heading from "@/components/heading";
import ModalButton from "@/components/modalButton";
import NoResult from "@/components/no-result";
import { Subscription } from "@prisma/client";
import { Check } from "lucide-react";
import React from "react";
import prisma from '@/lib/prisma'

type Props = {};
export const revalidate = 0

const page = async (props: Props) => {
  const subscriptions = await prisma.subscription.findMany({
    orderBy:{
      createdAt:'asc'
    }
  });
  return (
    <div>
      <div className="flex items-center justify-between gap-3 flex-col sm:!flex-row">
        <Heading
          title="Subscriptions"
          description="Manage Subscriptions plans"
        />
        <ModalButton
          title="Add Subscription"
          modalInputs={{ type: "subscription", data: undefined }}
        />
      </div>

      {/* subscriptions */}
      <div className="mt-12">
        {!subscriptions?.length ? (
          <NoResult />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

const SubscriptionCard = ({ subscription }: { subscription: Subscription }) => {
  return (
    <article className="border p-4 rounded-xl bg-white flex flex-col gap-2 w-full">
      <h3 className="p-3 w-fit py-1 text-xs font-bold text-white rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500">
        {subscription.type}
      </h3>
      <p className="font-semibold mt-12 ">$ {subscription.price}</p>
      <div className="mt-4 space-y-2">
      {(
        subscription.bulletPoints as unknown as { id: string; point: string }[]
      ).map((point) => (
        <span className="flex items-center gap-3 capitalize text-xs" key={point.id}>
          <span className="rounded-full w-4 h-4 flex items-center  justify-center  text-white bg-indigo-500">
            <Check size={12} />
          </span>
          {point.point}
        </span>
      ))}
      </div>
      <div className="mt-12 flex-1">
      <p className="text-muted-foreground  text-xs first-letter:capitalize">{subscription.label}</p>
      <p className="text-muted-foreground mt-8 text-xs first-letter:capitalize">{subscription.description}</p>
      </div>

      <div className="mt-auto flex items-center gap-3">
      <ModalButton className="flex-1" title="Update" modalInputs={{type:"subscription",data:subscription}}/>
      <ModalButton variant={'destructive'} className="flex-1" title="Delete" modalInputs={{type:'delete',id:subscription.id,deleteFunction:deleteSubscription}}/>
      </div>
 
    </article>
  );
};
