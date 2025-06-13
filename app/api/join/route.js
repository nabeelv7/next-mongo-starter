import Match from "@/models/Match";
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
    console.log("BODY", body);
    if (!body.id) {
      return NextResponse.json({
        status: 400,
        error: "Missing match id, cannot join",
      });
    }

    await connectMongo();
    const match = await Match.findById(body.id);

    if (match.members.includes(session.user.id)) {
      return NextResponse.json({
        status: 400,
        error: "You are already in this match",
      });
    }

    console.log(match);
    if (!match) {
      return NextResponse.json({ status: 404, error: "Match not found" });
    }

    match.members.push(session.user.id);
    await match.save();

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      error: `An error occured. Maybe the match doesn't exist? ${err.message}`,
    });
  }
}
