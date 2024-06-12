import Heading from "@/components/heading";
import ModalButton from "@/components/modalButton";
import React from "react";
import prisma from "@/lib/prisma";
import { ServiceItem } from "@prisma/client";
import NoResult from "@/components/no-result";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { deleteServiceItem } from "@/actions/service-item-actions";

type Props = {};

const page = async (props: Props) => {
  const serviceItemsRes =  prisma.serviceItem.findMany();
  const servicesRes =  prisma.service.findMany({
    select:{
      id:true,label:true
    }
  })

const [serviceItems,services] = await  Promise.all([serviceItemsRes,servicesRes])

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Service Items" description="Create new service item" />
        <ModalButton
          modalInputs={{ type: "service-item", data: undefined,services }}
          title="Create Service Item"
        />
      </div>

      {/* service items feed */}
      <div className="mt-12">
        {!serviceItems.length ? (
          <NoResult />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {serviceItems.map((serviceItem) => (
              <ServiceItemCard key={serviceItem.id} serviceItem={serviceItem} services={services} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

const ServiceItemCard = ({ serviceItem,services }: { serviceItem: ServiceItem ,services:{label:string,id:string}[]}) => {
  return (
    <article className="border rounded-lg overflow-hidden  hover:shadow-md transition-shadow">
      <div className="w-full aspect-video relative overflow-hidden">
        <div className="inset-0 absolute bg-black/60 z-10" />
        <Image
          src={serviceItem.image}
          alt="image"
          fill
          className="object-contain z-10"
        />
        <Image
          src={serviceItem.image}
          alt="image"
          fill
          className="object-cover blur-md"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold capitalize">{serviceItem.label}</h3>
        <p className="text-xs text-muted-foreground">
          {serviceItem.description}
        </p>
        <p className="text-xs font-semibold">${serviceItem.initialPrice}</p>
        <div className="mt-8 flex items-center gap-3">
          <ModalButton
            className="flex-1"
            modalInputs={{ type: "service-item", data: serviceItem,services }}
            title="Edit"
          />
          <ModalButton
            className="flex-1"
            variant={"destructive"}
            modalInputs={{
              type: "delete",
              deleteFunction: deleteServiceItem,
              id: serviceItem.id,
            }}
            title="Delete"
          />
        </div>
      </div>
    </article>
  );
};
