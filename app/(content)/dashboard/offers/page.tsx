import { deleteOffer } from '@/actions/offer-actions';
import Heading from '@/components/heading'
import ModalButton from '@/components/modalButton'
import NoResult from '@/components/no-result';
import prisma from "@/lib/prisma";
import { Offer } from '@prisma/client';
import Image from 'next/image';

type Props = {}

const page = async(props: Props) => {

    const offers = await prisma.offer.findMany()


  return (
    <div>
        <div className='flex items-center justify-between'>
<Heading title='Offers' description='Create Offers'/>
<ModalButton  modalInputs={{type:"offer",data:undefined}} title='Create Offer'/>
        </div>

        {/* offers feed */}
        <div className="mt-12">
      {!offers.length ? (
        <NoResult />
      ) : (
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-3">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

export default page






const OfferCard = ({ offer }: { offer: Offer }) => {
    return <article className="border rounded-lg overflow-hidden  shadow-md transition-shadow flex flex-col bg-white">
      <div className="w-full aspect-video relative overflow-hidden">
        <div className="inset-0 absolute bg-black/60 z-10"/>
        <Image src={offer.image} alt="image" fill className="object-contain z-10"/>
        <Image src={offer.image} alt="image" fill className="object-cover blur-md"/>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold capitalize">{offer.label}</h3>
        <p className="mb-8 text-xs text-muted-foreground">{offer.description}</p>
        <div className="mt-auto flex items-center gap-3">
          <ModalButton className="flex-1"  modalInputs={{type:'offer',data:offer}} title="Edit"/>
          <ModalButton className="flex-1" variant={'destructive'}  modalInputs={{type:'delete',deleteFunction:deleteOffer,id:offer.id}} title="Delete" />
        </div>
      </div>
    </article>;
  };
  