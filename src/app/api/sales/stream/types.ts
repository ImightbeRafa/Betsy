// app/api/sales/stream/types.ts
interface BaseSale {
    orderId: string;
    status: string;
    delivery: string;
    customerName: string;
    username: string;
    phone: string;
    email: string;
    business: string;
    product: string;
    quantity: number;
    size: string;
    color: string;
    packaging: string;
    customization: string;
    comments: string;
    productCost: number;
    iva: number;
    total: number;
    timestamp: string;
    funnel: string;
    orderType: 'EA' | 'RA';
  }
  
  interface EASale extends BaseSale {
    orderType: 'EA';
    expectedDate: string;
    saleDate: string;
    courier: string;
    seller: string;
    province: string;
    canton: string;
    district: string;
    address: string;
    shippingCost: number;
  }
  
  interface RASale extends BaseSale {
    orderType: 'RA';
    seller: string;
    agreedDate: string;
    pickupDate: string;
  }
  
  export type SaleData = EASale | RASale;