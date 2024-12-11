// app/api/sales/stream/route.ts
import { NextResponse } from 'next/server'
import { SaleData } from './types'

export const dynamic = 'force-dynamic'

function parsePipeDelimitedData(text: string): SaleData[] {
  try {
    return text.split(';')
      .filter(Boolean)
      .map(sale => {
        const [
          orderId,
          customerName,
          total,
          timestamp,
          orderType,
          phone,
          email,
          address,
          product,
          status,
          business,
          funnel,
          ...rest
        ] = sale.split('|').map(s => s.trim());

        const baseSale = {
          orderId: orderId || '',
          status: status || 'Pendiente',
          delivery: '',
          customerName: customerName || '',
          username: '',
          phone: phone || '',
          email: email || '',
          business: business || '',
          product: product || '',
          quantity: 0,
          size: '',
          color: '',
          packaging: '',
          customization: '',
          comments: '',
          productCost: 0,
          iva: 0,
          total: Number(total) || 0,
          timestamp: timestamp || new Date().toISOString(),
          funnel: funnel || '',
        };

        if (orderType === 'EA') {
          return {
            ...baseSale,
            orderType: 'EA' as const,
            expectedDate: '',
            saleDate: '',
            courier: '',
            seller: '',
            province: '',
            canton: '',
            district: '',
            address: address || '',
            shippingCost: 0,
          };
        } else {
          return {
            ...baseSale,
            orderType: 'RA' as const,
            seller: '',
            agreedDate: '',
            pickupDate: '',
          };
        }
      });
  } catch (error) {
    console.error('Error parsing pipe-delimited data:', error);
    throw new Error('Failed to parse sales data');
  }
}

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SCRIPT_URL) {
    return NextResponse.json(
      { error: 'Script URL not configured' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SCRIPT_URL}?type=list`,
      {
        headers: {
          'Cache-Control': 'no-cache',
        },
        next: { revalidate: 0 }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    
    // Try to parse as JSON first
    try {
      const data = JSON.parse(text);
      if (data.status === 'error') {
        throw new Error(data.error || 'Unknown error from server');
      }
      return NextResponse.json(data);
    } catch (jsonError) {
      // If JSON parsing fails, try pipe-delimited format
      const sales = parsePipeDelimitedData(text);
      return NextResponse.json({
        status: 'success',
        data: sales
      });
    }
  } catch (error) {
    console.error('Sales Stream API Error:', error);
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to fetch sales data'
      },
      { status: 500 }
    );
  }
}