// src/app/api/orders/update/route.ts
import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_SCRIPT_URL;

export async function POST(request: Request) {
  console.log('API Route hit: /api/orders/update');

  try {
    // Validate environment variable
    if (!GOOGLE_SCRIPT_URL) {
      console.error('Google Script URL not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    console.log('Received request body:', body);

    // Validate request
    if (!body.orderId) {
      return NextResponse.json(
        { error: 'Missing required fields: orderId' },
        { status: 400 }
      );
    }

    // Forward to Google Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'updateOrder',
        orderId: body.orderId,
        data: body
      })
    });

    // Handle Google Script HTML error response
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('text/html')) {
      const text = await response.text();
      console.error('Received HTML response:', text);
      return NextResponse.json(
        { error: 'Server is busy, please try again' },
        { status: 503 }
      );
    }

    // Handle non-OK response
    if (!response.ok) {
      throw new Error(`Google Script responded with status ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in order update:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}