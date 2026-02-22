import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const cookie = request.headers.get("cookie") || "";

  const res = await fetch(`${serverUrl}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie,
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
