"use client";

import React, { useRef, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const style = tv({
  slots: {
    base: "flex w-full items-center gap-2 overflow-hidden rounded-lg border border-slate-200 bg-white font-medium placeholder:font-normal focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100",
    button:
      "border-r bg-slate-50 px-3 py-3 font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-700 active:bg-slate-50 active:text-slate-800",
  },
});

type TFileInput = VariantProps<typeof style>;
interface Props extends TFileInput, React.ComponentPropsWithRef<"input"> {}

export const FileInput = (props: Props) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={style.slots.base}>
      <button type="button" className={style.slots.button} onClick={() => inputRef.current?.click()}>
        Choose File
      </button>
      <input
        {...props}
        ref={inputRef}
        hidden
        type="file"
        onChange={(e) => {
          setFiles(e.target.files);
          props.onChange?.(e);
        }}
      />
      {files ? <div>You choose {files.length} file</div> : <div>{props.placeholder}</div>}
    </div>
  );
};
