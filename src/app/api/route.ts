import { db, latestMusicListened } from "@libs/lanyard/latestMusicListened";
import { NextResponse } from "next/server";
latestMusicListened();

export async function GET() {
  const data = db.data;
  console.log("Dados lidos do db.json:", data);
  return NextResponse.json(data, { status: 200 });
}
