import React from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const style = tv({
  base: "block w-full rounded-lg border font-semibold shadow-sm shadow-slate-200 transition duration-200 disabled:opacity-50",
  variants: {
    variant: {
      primary: "border-indigo-600 bg-indigo-600 text-indigo-50 hover:bg-indigo-500 active:bg-indigo-700",
      secondary: "border-slate-300 bg-white text-slate-600 hover:text-slate-700 active:bg-slate-50 active:text-slate-800",
      danger: "border-rose-500 bg-rose-500 text-rose-100 hover:bg-rose-600 active:bg-rose-700 active:text-rose-50",
    },
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-[15px]",
      lg: "px-5 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type TButton = VariantProps<typeof style>;
interface Props extends TButton, React.ComponentPropsWithRef<"button"> {}

export const Button = (props: Props) => {
  return (
    <button {...props} className={twMerge(style({ ...props }), props.className)}>
      {props.children}
    </button>
  );
};
