"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";

export const PreviewBtn = ({ videoUrl }: { videoUrl: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer font-semibold hover:text-blue-600">
        Free preview
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed inset-0 z-10 flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur-md"
      >
        <DialogPanel>
          <div className="h-full w-[900px] bg-white">
            <iframe
              width="100%"
              height="600px"
              src={`https://www.youtube.com/embed/${videoUrl}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};
