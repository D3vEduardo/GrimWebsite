import { db, latestMusicListened } from "@libs/lanyard/latestMusicListened";
import { NextResponse } from "next/server";
latestMusicListened();

export async function GET() {
  const data = await db.getData("/");
  return NextResponse.json(data, { status: 200 });
}
