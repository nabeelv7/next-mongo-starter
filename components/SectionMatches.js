import Match from "@/models/Match";
import User from "@/models/User";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";

export default async function SectionMatches() {
  await connectMongo();

  const session = await auth();
  if (!session?.user) {
    return <div className="text-red-500">Unauthorized</div>;
  }

  let matches = [];
  try {
    const user = await User.findById(session.user.id);
    matches = await Match.find({ hostId: user._id });
  } catch (err) {
    return (
      <div className="text-red-500">Failed to fetch matches: {err.message}</div>
    );
  }

  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold">Your Matches</h1>
      <div className="flex flex-col gap-3">
        {matches.map((match) => (
          <div key={match._id} className="p-2 bg-gray-100 rounded">
            {match.name}
          </div>
        ))}
      </div>
    </section>
  );
}
