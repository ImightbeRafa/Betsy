// LOCATION: src/app/api/sales/list/route.ts
// PURPOSE: Returns raw text data for initial load of sales

import { NextResponse } from 'next/server';

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SCRIPT_URL) {
    return new Response('ERROR: Script URL not configured', { status: 500 });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SCRIPT_URL}?type=list`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return new Response(text);
    
  } catch (error) {
    console.error('Sales List API Error:', error);
    return new Response('ERROR: Failed to fetch sales', { status: 500 });
  }
}