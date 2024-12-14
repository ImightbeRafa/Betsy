import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Save, Loader } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import OrderTypeToggle from './OrderTypeToggle';
import CustomerForm from './customerForm';
import ProductForm from './productForm';
import { CustomerInfo, ProductInfo, SubmitStatus } from './types';

const SalesForm = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    province: '',
    canton: '',
    district: '',
    email: '',
    username: '',
    address: '',
    business: '',
    funnel: '',
    fechaEsperada: '',
    fechaAcordada: '',
    fechaRetirada: '',
    diaVenta: new Date().toISOString().split('T')[0],
    orderType: 'EA',
  });
  
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    type: '',
    color: '',
    packaging: '',
    comments: '',
    cantidad: 1,
    productCost: 0,
    shippingCost: 0,
    iva: 0,
    total: 0,
    vendedor: '',
    mensajeria: '',
    tamano: '',
    personalizado: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: '', message: '' });
  const [rawCustomerText, setRawCustomerText] = useState('');
  const [applyIVA, setApplyIVA] = useState(false);

  const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_SCRIPT_URL;

  const calculateTotal = (info: ProductInfo): ProductInfo => {
    const subtotal = info.productCost * info.cantidad;
    const shipping = customerInfo.orderType === 'EA' ? info.shippingCost : 0;
    const ivaAmount = applyIVA ? subtotal * 0.13 : 0;
    const total = subtotal + shipping + ivaAmount;

    return {
      ...info,
      iva: ivaAmount,
      total: total
    };
  };

  const handleProductInfoChange = (newInfo: ProductInfo) => {
    setProductInfo(calculateTotal(newInfo));
  };

  const handleApplyIVAChange = (value: boolean) => {
    setApplyIVA(value);
    setProductInfo(prevInfo => {
      const updatedInfo = { ...prevInfo, iva: value ? prevInfo.productCost * 0.13 : 0 };
      return calculateTotal(updatedInfo);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_SCRIPT_URL;
      if (!scriptUrl) {
        throw new Error('Google Script URL not configured');
      }

      const dataToSend = {
        customerInfo,
        productInfo,
        timestamp: new Date().toLocaleString('es-CR', {
          timeZone: 'America/Costa_Rica',
          dateStyle: 'short',
          timeStyle: 'medium'
        })
      };

      console.log('Submitting to URL:', scriptUrl);
      console.log('Data being sent:', JSON.stringify(dataToSend, null, 2));

      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      setSubmitStatus({
        type: 'success',
        message: 'Pedido guardado exitosamente'
      });
      resetForm();

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error 
          ? `Error: ${error.message}`
          : 'Error al guardar el pedido. Por favor intente de nuevo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCustomerInfo({
      ...customerInfo,
      name: '',
      phone: '',
      province: '',
      canton: '',
      district: '',
      email: '',
      username: '',
      address: '',
      business: '',
      funnel: '',
      fechaEsperada: '',
      fechaAcordada: '',
      fechaRetirada: '',
      diaVenta: new Date().toISOString().split('T')[0],
    });
    
    setProductInfo({
      type: '',
      color: '',
      packaging: '',
      comments: '',
      cantidad: 1,
      productCost: 0,
      shippingCost: 0,
      iva: 0,
      total: 0,
      vendedor: '',
      mensajeria: '',
      tamano: '',
      personalizado: '',
    });
    
    setRawCustomerText('');
    setApplyIVA(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Betsy - Sistema de Ventas</CardTitle>
          <OrderTypeToggle
            orderType={customerInfo.orderType}
            onOrderTypeChange={(type) => 
              setCustomerInfo(prev => ({ ...prev, orderType: type }))
            }
          />
        </CardHeader>
        <CardContent>
          {submitStatus.message && (
            <Alert 
              className={`mb-4 ${
                submitStatus.type === 'success' ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <AlertTitle>
                {submitStatus.type === 'success' ? 'Éxito' : 'Error'}
              </AlertTitle>
              <AlertDescription>
                {submitStatus.message}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <CustomerForm
              customerInfo={customerInfo}
              onCustomerInfoChange={setCustomerInfo}
              rawCustomerText={rawCustomerText}
              onRawCustomerTextChange={setRawCustomerText}
              orderType={customerInfo.orderType}
            />
            
            <ProductForm
              productInfo={productInfo}
              orderType={customerInfo.orderType}
              onProductInfoChange={handleProductInfoChange}
              applyIVA={applyIVA}
              onApplyIVAChange={handleApplyIVAChange}
            />

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center gap-2 disabled:bg-blue-300"
            >
              {isSubmitting ? (
                <Loader className="animate-spin" size={20} />
              ) : (
                <Save size={20} />
              )}
              {isSubmitting ? 'Guardando...' : 'Guardar Pedido'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesForm;