export interface Sale {
    orderId: string;
    status: string;
    customerName: string;
    phone: string;
    email: string;
    address: string;
    product: string;
    total: number;
    timestamp: string;
    orderType: 'EA' | 'RA';
  }