import { getLatestListenedMusic } from "@/libs/firebase/getLatestListenedMusic";
import { latestMusicListened } from "@libs/lanyard/latestMusicListened";
import { NextResponse } from "next/server";

export async function GET() {
  latestMusicListened();
  const data = await getLatestListenedMusic();
  console.log("Dados lidos do db.json:", data);
  return NextResponse.json(data, { status: 200 });
}
