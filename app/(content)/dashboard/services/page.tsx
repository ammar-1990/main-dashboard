import Heading from "@/components/heading";
import ModalButton from "@/components/modalButton";
import React from "react";
import prisma from "@/lib/prisma";
import { Service } from "@prisma/client";
import NoResult from "@/components/no-result";
import Image from "next/image";
import { deleteService } from "@/actions/service-actions";

type Props = {};
export const revalidate = 0
const page = async (props: Props) => {
  const services = await prisma.service.findMany();
  return (
    <div>
      <div className="flex md:items-center justify-between md:!flex-row flex-col gap-3">
        <Heading title="Services" description="Create new service" />
        <ModalButton
          modalInputs={{ type: "service", data: undefined }}
          title="Create Service"
        />
      </div>

      {/* services feed */}
<div className="mt-12">
      {!services.length ? (
        <NoResult />
      ) : (
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
      
</div>
  );
};

export default page;





const ServiceCard = ({ service }: { service: Service }) => {
  return <article className="border rounded-lg overflow-hidden  shadow-md transition-shadow flex flex-col bg-white">
    <div className="w-full aspect-video relative overflow-hidden">
      <div className="inset-0 absolute bg-black/60 z-10"/>
      <Image src={service.image} alt="image" fill className="object-contain z-10"/>
      <Image src={service.image} alt="image" fill className="object-cover blur-md"/>
    </div>
    <div className="p-4 flex-1 flex flex-col">
      <h3 className="font-semibold capitalize">{service.label}</h3>
      <p className="mb-8 text-xs text-muted-foreground">{service.description}</p>
      <div className="mt-auto flex items-center gap-3">
        <ModalButton className="flex-1"  modalInputs={{type:'service',data:service}} title="Edit"/>
        <ModalButton className="flex-1" variant={'destructive'}  modalInputs={{type:'delete',deleteFunction:deleteService,id:service.id}} title="Delete" />
      </div>
    </div>
  </article>;
};
