"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/modal.hook";

import React, { useState } from "react";
import CategoryForm from "../forms/category-from";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

type Props = {};

const DeleteModal = (props: Props) => {
  const { open, modalInputs, setClose } = useModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (modalInputs?.type !== "delete") return;
  const isOpen = open && modalInputs?.type === "delete";

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await modalInputs.deleteFunction(modalInputs.id);
      if (!res.success) {
        return toast.error(res.error);
      }

      toast.success(res.message);
      setClose();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete date from
            our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-3">
          <Button variant={"secondary"} onClick={setClose}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading}
            variant={"destructive"}
          >
            Delete {loading && <Loader className="ml-3 h-3 w-3 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
