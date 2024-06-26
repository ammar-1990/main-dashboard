import { Category, Offer, Service, ServiceItem, Subscription } from "@prisma/client";
import { create } from "zustand";

export type ModalInputs = {
  type: "delete";
  id: string;
  deleteFunction: (id:string) => Promise<{
    success: boolean;
    error?: string;
    message?: string;
  }>;
  backUrl?:string
}
  | { type: "category"; data?: Category }
  | {type:"service",data?:Service}
  |{type:"service-item",data?:ServiceItem,services?:{id:string,label:string}[]}
  |{type:"offer",data?:Offer}
  |{type:"subscription",data?:Subscription}

type Modal = {
  open: boolean;
  modalInputs?: ModalInputs;
  setOpen: (modalInputs: ModalInputs) => void;
  setClose: () => void;
};

export const useModal = create<Modal>()((set) => ({
  open: false,
  modalInputs: undefined,
  setOpen: (modalInputs: ModalInputs) =>
    set((state) => ({ open: true, modalInputs })),
  setClose: () => set((state) => ({ open: false })),
}));
