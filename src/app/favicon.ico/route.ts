import { NextResponse } from "next/server";

export const GET = (request: Request) => {
  const url = new URL("/project-placeholder.svg", request.url);

  return NextResponse.redirect(url, 307);
};
