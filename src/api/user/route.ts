import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const cookie = request.headers.get("cookie") || "";

  const API_BASE = "/api";
  // const API_BASE = 'http://localhost:3001/';

  const res = await fetch(`${API_BASE}/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie,
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
