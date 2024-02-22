import { Category } from '@prisma/client'
import { create } from 'zustand'

export type ModalInputs = {type:'category',data?:Category}

type Modal = {
  open: boolean
  modalInputs?:ModalInputs
  setOpen: (modalInputs:ModalInputs) => void
  setClose:()=>void
}

export const useModal = create<Modal>()((set) => ({
  open: false,
  modalInputs:undefined,
  setOpen: (modalInputs:ModalInputs) => set((state) => ({ open:true,modalInputs })),
  setClose:()=>set((state)=>({open:false}))
}))

