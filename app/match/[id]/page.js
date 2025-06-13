import Match from "@/models/Match";
import User from "@/models/User";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";

export default async function MatchPage({ params }) {
  const session = await auth();
  if (!session?.user) {
    return <div className="text-red-500">Unauthorized</div>;
  }

  const { id } = await params;

  await connectMongo();

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
    <>
      <div>Match Page for match with id: {id}</div>
      {matches?.members.map((member) => (
        <ul key={match._id}>
            <li>{match.member}</li>
        </ul>
      ))}
    </>
  );
}
