// LOCATION: src/app/api/sales/route.ts
// PURPOSE: Main sales endpoint that redirects to list

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.redirect(new URL('/api/sales/list', request.url));
}