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
} from "@/components/ui/select";

import { deleteServiceItem } from "@/actions/service-item-actions";

type Props = {};
export const revalidate = 0;
const page = async (props: Props) => {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      label: true,
      serviceItems: true,
    },
  });

  const servicesNames = services.map((service) => ({
    id: service.id,
    label: service.label,
  }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Service Items" description="Create new service item" />
        <ModalButton
          modalInputs={{ type: "service-item", data: undefined, services }}
          title="Create Service Item"
        />
      </div>

      {/* service items feed */}
      <div className="mt-12">
        {!services.length ? (
          <NoResult />
        ) : (
          <div className="mt-16 ">
            {services.map((service) => (
              <div key={service.id} className="flex flex-col gap-3 mb-12 pt-12 border-t-2">
                <h3 className="text-lg font-semibold uppercase">{service.label}{" - services"}</h3>
                {!service.serviceItems.length ? (
                  <NoResult />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-3">
                    {service.serviceItems.map((serviceItem) => (
                      <ServiceItemCard
                        key={serviceItem.id}
                        serviceItem={serviceItem}
                        services={servicesNames}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

const ServiceItemCard = ({
  serviceItem,
  services,
}: {
  serviceItem: ServiceItem;
  services: { label: string; id: string }[];
}) => {
  return (
    <article className="border rounded-lg overflow-hidden  hover:shadow-md transition-shadow flex flex-col bg-white">
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
          className="object-cover blur-sm"
        />
      </div>
      <div className="p-4 flex flex-col flex-1 ">
        <h3 className="font-semibold capitalize">{serviceItem.label}</h3>
        <p className="text-xs text-muted-foreground">
          {serviceItem.description}
        </p>
        <p className="text-xs font-semibold mb-8">
          ${serviceItem.initialPrice}
        </p>
        <div className="mt-auto flex items-center gap-3">
          <ModalButton
            className="flex-1"
            modalInputs={{ type: "service-item", data: serviceItem, services }}
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
