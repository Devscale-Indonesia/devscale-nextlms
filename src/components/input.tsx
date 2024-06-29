"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const style = tv({
  base: "block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold shadow-md shadow-slate-100 transition duration-200 placeholder:font-normal focus:border-indigo-600 focus:outline-indigo-600 focus:ring-4 focus:ring-indigo-100",
});

type TInput = VariantProps<typeof style>;
interface Props extends TInput, React.ComponentPropsWithRef<"input"> {}
interface SelectProps extends TInput, React.ComponentPropsWithRef<"select"> {}

export const Input = (props: Props) => {
  return <input {...props} className={twMerge(style({ ...props }), props.className)} />;
};

export const Select = (props: SelectProps) => {
  return (
    <select {...props} className={twMerge(style({ ...props }), props.className)}>
      {props.children}
    </select>
  );
};
