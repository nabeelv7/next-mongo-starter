import SectionInvite from "@/components/SectionInvite";
import { auth } from "@/auth";

export default async function InvitePage({ params }) {
  const { id } = await params;
  console.log("ID", id);
  const session = await auth();

  return <SectionInvite id={id} session={session} />;
}
