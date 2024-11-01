import AdminDashboard from "@/components/AdminDashboard";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await getSession();

  if (!session.isAdmin) return redirect("/");

  return <AdminDashboard />;
}
