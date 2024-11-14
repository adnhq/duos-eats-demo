import { redirect } from "next/navigation";

function Page() {
  return redirect("/users/Dashboard/orders");
}

export default Page;
