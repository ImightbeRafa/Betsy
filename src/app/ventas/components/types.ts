export interface CustomerInfo {
  name: string;
  phone: string;
  province: string;
  canton: string;
  district: string;
  email: string;
  username: string;
  address: string;
  business: string;
  funnel: 'Instagram' | 'Whatsapp' | ''; // Add this line
  fechaEsperada: string;
  fechaAcordada: string;
  fechaRetirada: string;
  diaVenta: string;
  orderType: 'EA' | 'RA';
}
  
  export interface ProductInfo {
    type: string;
    color: string;
    packaging: string;
    comments: string;
    cantidad: number;
    productCost: number;
    shippingCost: number;
    iva: number;
    total: number;
    vendedor: string;
    mensajeria: string;
    tamano: string;
    personalizado: string;
  }
  
  export interface SubmitStatus {
    type: 'success' | 'error' | '';
    message: string;
  }