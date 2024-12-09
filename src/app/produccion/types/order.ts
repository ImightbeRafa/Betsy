export interface BaseOrder {
    orderId: string;
    status: string;
    delivery: string;
    timestamp: string;
  }
  
  export interface EAOrder extends BaseOrder {
    orderType: 'EA';
    fechaEsperada: string;
    diaVenta: string;
    mensajeria: string;
    vendedor: string;
    name: string;
    username: string;
    phone: string;
    email: string;
    province: string;
    canton: string;
    district: string;
    address: string;
    business: string;
    product: string;
    cantidad: number;
    tamano: string;
    color: string;
    packaging: string;
    personalizado: string;
    comments: string;
    productCost: number;
    shippingCost: number;
    iva: number;
    total: number;
  }
  
  export interface RAOrder extends BaseOrder {
    orderType: 'RA';
    vendedor: string;
    name: string;
    username: string;
    phone: string;
    email: string;
    fechaAcordada: string;
    fechaRetirada: string;
    business: string;
    product: string;
    cantidad: number;
    tamano: string;
    color: string;
    packaging: string;
    personalizado: string;
    comments: string;
    productCost: number;
    iva: number;
    total: number;
  }
  
  export type Order = EAOrder | RAOrder;