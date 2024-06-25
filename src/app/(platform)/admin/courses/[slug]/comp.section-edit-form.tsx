"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAtom } from "jotai";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { openSectionEditModalAtom, sectionDetailAtom } from "@/context/atom";

import { updateLessonAction } from "./action.update-lesson";
import { updateSectionAction } from "./action.update-section";

export const SectionEditForm = () => {
  const [openModal, setOpenModal] = useAtom(openSectionEditModalAtom);
  const [sectionDetail] = useAtom(sectionDetailAtom);

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <div className="fixed inset-0 flex items-center justify-center bg-black/10">
        <DialogPanel className="w-[400px] rounded-lg bg-white p-12">
          <DialogTitle className="text-xl font-medium tracking-tight">Edit Section</DialogTitle>
          <form
            action={async (formData) => {
              await updateSectionAction(formData);
              setOpenModal(false);
            }}
            className="space-y-2"
          >
            <input name="id" defaultValue={sectionDetail?.id} type="hidden" required />
            <Input name="title" defaultValue={sectionDetail?.title} required />
            <Button>Save</Button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
