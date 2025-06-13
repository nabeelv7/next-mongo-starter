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

  let match = [];
  try {
    match = await Match.findById(id).populate("members");
  } catch (err) {
    return <div className="text-red-500">No Match Found</div>;
  }

  return (
    <>
      <div>Match Page for match with id: {id}</div>
      <h1 className="text-2xl">match members</h1>
      {match.members.map((member) => {
        return (
          <div key={member._id} className="flex flex-col items-center max-w-sm bg-accent p-4">
            <img src={member.image} alt={`${member.name}'s profile picture`} />
            <h2>{member.name}</h2>
            <p>{member.email}</p>
          </div>
        );
      })}
    </>
  );
}
