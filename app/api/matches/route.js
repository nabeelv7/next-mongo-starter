import Match from "@/models/Match";
import User from "@/models/User";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session || !session?.user) {
      return NextResponse.json({ status: 401, error: "Unauthorized" });
    }

    const body = await req.json();
    console.log(body);
    if (!body.match_name || !body.match_date || !body.match_time) {
      return NextResponse.json({ status: 400, error: "Missing match data" });
    }

    await connectMongo();
    const user = await User.findById(session.user.id);

    const match = await Match.create({
      hostId: user._id,
      name: body.match_name,
      date: body.match_date,
      time: body.match_time,
      members: [user._id],
    });

    user.matches.push(match._id);
    await user.save();

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
