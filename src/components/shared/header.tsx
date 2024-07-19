import Link from "next/link";

import serverAuth from "@/libs/server-auth";

import { Button } from "../button";

export const Header = () => {
  const auth = serverAuth();

  return (
    <header className="flex items-center justify-between px-8 py-6">
      <div>nextlms.</div>
      <nav className="flex items-center gap-6 font-semibold">
        <div>Courses</div>
        <div>Flash Sale</div>
        <div>About</div>
        {auth?.id ? (
          <Link href="/dashboard/my-courses">
            <Button className="w-fit" size="sm">
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <div>Login</div>
            </Link>
            <Link href="/register">
              <Button className="w-fit" size="sm">
                Get Started
              </Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
