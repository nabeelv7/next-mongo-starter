import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();
  console.log(session);

  if (session) {
    return (
      <>
        <h1>Welcome {session.user.name}!</h1>
        <p>You have signed in with GitHub.</p>
        <Link href="/dashboard" className="btn btn-link">
          Go to Dashboard
        </Link>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="btn btn-error" type="submit">
            Logout
          </button>
        </form>
      </>
    );
  }
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button className="btn btn-neutral" type="submit">
          Signin with GitHub
        </button>
      </form>
    </>
  );
}
