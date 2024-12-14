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

    // Clean up the data before sending
    const cleanData = Object.fromEntries(
      Object.entries(body).map(([key, value]) => [
        key,
        typeof value === 'string' ? value.trim() : value
      ])
    );

    // Forward to Google Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'updateOrder',
        orderId: cleanData.orderId,
        data: cleanData
      })
    });

    // Parse response
    let result;
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('text/html')) {
      const text = await response.text();
      console.error('Received HTML response:', text);
      return NextResponse.json(
        { error: 'Server is busy, please try again' },
        { status: 503 }
      );
    } else {
      result = await response.json();
    }

    // Handle error response
    if (!response.ok || result.error) {
      const errorMessage = result.error || 'Failed to update order';
      console.error('Error from Google Script:', errorMessage);
      return NextResponse.json(
        { error: errorMessage },
        { status: response.ok ? 400 : 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in order update:', error);
    return NextResponse.json(
      { error: 'Failed to update order', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}