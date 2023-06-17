import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    message: "Hello World!",
    status: 200,
  };

  return NextResponse.json({ data });
}
