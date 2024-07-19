import { redirect } from "next/navigation";
import React from "react";

import serverAuth from "@/libs/server-auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const auth = serverAuth();

  if (auth?.role !== "admin") {
    redirect("/dashboard/my-courses");
  }

  return <div>{children}</div>;
}
