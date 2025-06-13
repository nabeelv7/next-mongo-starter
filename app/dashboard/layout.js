import { auth } from "@/auth";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (!session || !session?.user) redirect("/");

  // console.log(session);

  return children;
}
