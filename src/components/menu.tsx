import Link from "next/link";

interface Props {
  label: string;
  href: string;
}

export const Menu = (props: Props) => {
  return (
    <Link href={props.href}>
      <div className="cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-[15px] font-semibold text-slate-700 transition duration-200 hover:bg-indigo-600 hover:text-white active:bg-indigo-400">
        {props.label}
      </div>
    </Link>
  );
};
