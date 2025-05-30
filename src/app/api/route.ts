import { getLatestListenedMusic } from "@libs/firebase/getLatestListenedMusic";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getLatestListenedMusic();
    console.log("Dados do banco de dados:", data);
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Erro interno!" }, { status: 500 })
  }
  
}
