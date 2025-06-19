import { getSpotifyTokens } from "@libs/firebase/getSpotifyTokens";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getSpotifyTokens();
    console.log(
      "-> API ROUTE /api/spotify:",
      "Refresh token no banco de dados:", data);
    return NextResponse.json("Refresh token existe!", { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Erro interno!" }, { status: 500 })
  }
  
}
