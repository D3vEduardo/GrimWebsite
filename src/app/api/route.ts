import { db, latestMusicListened } from "@libs/lanyard/latestMusicListened";
import { NextResponse } from "next/server";
latestMusicListened();

export async function GET() {
  const data = await db.getData("/");
  console.log("Dados lidos do db.json:", data);
  return NextResponse.json(data, { status: 200 });
}
