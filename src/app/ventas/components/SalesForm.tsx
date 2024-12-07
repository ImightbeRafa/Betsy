"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Save, Loader } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";

interface CustomerInfo {
  name: string;
  phone: string;
  province: string;
  canton: string;
  district: string;
  email: string;
  username: string;  // Add this
  address: string;
  business: string;
  fechaEsperada: string;
  diaVenta: string;
}

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
    fechaEsperada: '',
    diaVenta: new Date().toISOString().split('T')[0],
  });
  
  const [productInfo, setProductInfo] = useState({
    type: '',
    color: '',
    packaging: '',
    comments: '',
    productCost: 0,
    shippingCost: 0,
    iva: 0,
    total: 0,
    vendedor: '',
    mensajeria: '',
    tamano: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [rawCustomerText, setRawCustomerText] = useState('');
  const [applyIVA, setApplyIVA] = useState(false);

  // Replace this URL with your Google Apps Script deployment URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzqL_E7bmOqnXK8cXpafjENjl-NHrFJ_6NAxzahTChv30SnjjenopkwWemzqwLP4BdS/exec';
  const parseCustomerText = (text: string) => {
    setRawCustomerText(text);

    const normalizedText = text.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ');

    const patterns = {
        name: [
            /Nombre completo[:\-]?\s*([^0-9\n]+?)(?=Teléfono|[\d])/i,
            /^([^0-9\n]+?)(?=\d{7,})/i,
        ],
        phone: [
            /Teléfono[:\-]?\s*(\d[\d\-\s]+\d)/i,
            /^[^0-9]*?(\d{7,8})/m,
            /(\d{8})/
        ],
        province: [
            /Provincia[:\-]?\s*([^,\n]+?)(?=Cantón|$)/i,
            /([^,\n]+?)(?=,|\s+Cantón)/i
        ],
        canton: [
            /Cantón[:\-]?\s*([^,\n]+?)(?=Distrito|$)/i,
            /,\s*([^,\n]+?)(?=,|\s+Distrito)/i
        ],
        district: [
            /Distrito[:\-]?\s*([^,\n]+?)(?=Email|Dirección|$)/i,
            /,\s*([^,\n]+?)(?=,|\s+Email|\s+Dirección)/i
        ],
        email: [
            /Email[:\-]?\s*([^\s,\n]+@[^\s,\n]+)/i,
            /e-mail[:\-]?\s*([^\s,\n]+@[^\s,\n]+)/i,
            /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i
        ],
        address: [
            /Dirección[^:]*[:\-]?\s*([^,\n].*?)(?=Rango|Horas|Email|$)/i,
            /(?:,|^)\s*([^@\n]+?)(?=Rango|Horas|$)/i
        ]
    };

    const findMatch = (patterns: RegExp[], text: string): string => {
        for (const pattern of patterns) {
            const match = text.match(pattern);
            if (match && match[1]) {
                return match[1].trim();
            }
        }
        return '';
    };

    const newCustomerInfo: CustomerInfo = {
      name: findMatch(patterns.name, normalizedText),
      phone: findMatch(patterns.phone, normalizedText)?.replace(/[-\s]/g, '') || '',
      province: findMatch(patterns.province, normalizedText),
      canton: findMatch(patterns.canton, normalizedText),
      district: findMatch(patterns.district, normalizedText),
      email: findMatch(patterns.email, normalizedText),
      address: findMatch(patterns.address, normalizedText),
      username: findMatch(patterns.name, normalizedText),
      business: customerInfo.business,
      fechaEsperada: '',
      diaVenta: new Date().toISOString().split('T')[0],
    };

    (Object.keys(newCustomerInfo) as Array<keyof CustomerInfo>).forEach(key => {
      if (typeof newCustomerInfo[key] === 'string') {
        newCustomerInfo[key] = newCustomerInfo[key]
          .replace(/^[:\-]\s*/, '')
          .replace(/\s+/g, ' ')
          .trim();
      }
    });

    setCustomerInfo(newCustomerInfo);
    console.log('Parsed Information:', newCustomerInfo);
  };

  const calculateTotal = (info: typeof productInfo) => {
    const subtotal = parseFloat(info.productCost.toString()) || 0;
    const shipping = parseFloat(info.shippingCost.toString()) || 0;
    const ivaAmount = applyIVA ? subtotal * 0.13 : 0;
    const total = subtotal + shipping + ivaAmount;

    return {
      ...info,
      iva: ivaAmount,
      total: total
    };
  };

  const handleProductInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductInfo(prev => {
      const newInfo = {
        ...prev,
        [name]: value
      };
      return calculateTotal(newInfo);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
        const dataToSend = {
            customerInfo,
            productInfo,
            timestamp: new Date().toISOString()
        };
        
        console.log('Sending data:', dataToSend); // Debug log

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(dataToSend)
        });

        const result = await response.json();
        console.log('Response:', result); // Debug log

        if (result.result === 'success') {
            setSubmitStatus({
                type: 'success',
                message: `Pedido guardado exitosamente. ID: ${result.orderId}`
            });
            
            // Reset forms with all fields
            setCustomerInfo({
              name: '', 
              phone: '', 
              province: '', 
              canton: '',
              district: '', 
              email: '', 
              username: '',  // Add this
              address: '', 
              business: '',
              fechaEsperada: '',
              diaVenta: new Date().toISOString().split('T')[0],
          });
            setProductInfo({
                type: '', color: '', packaging: '', comments: '',
                productCost: 0, shippingCost: 0, iva: 0, total: 0,
                vendedor: '', mensajeria: '', tamano: '',
            });
            
            setRawCustomerText(''); // Clear the raw text input
            setApplyIVA(false);     // Reset IVA checkbox
        }
    } catch (error) {
        console.error('Submit error:', error); // Debug log
        setSubmitStatus({
            type: 'error',
            message: 'Error al guardar el pedido. Por favor intente de nuevo.'
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Betsy - Sistema de Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          {submitStatus.message && (
            <Alert className={`mb-4 ${submitStatus.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
              <AlertTitle>
                {submitStatus.type === 'success' ? 'Éxito' : 'Error'}
              </AlertTitle>
              <AlertDescription>
                {submitStatus.message}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Info Paste Area */}
            <div className="space-y-2">
              <label className="block font-medium">
                Información del Cliente (Pegar texto)
              </label>
              <textarea 
                className="w-full h-32 p-2 border rounded"
                value={rawCustomerText}
                onChange={e => parseCustomerText(e.target.value)}
                placeholder="Pegar información del cliente aquí..."
              />
            </div>

            {/* Parsed Information Display */}
            <div className="mt-4 space-y-4 border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium text-lg">Info cliente:</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-600">Nombre</label>
                        <input
                            type="text"
                            className="w-full p-2 bg-white border rounded"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                            placeholder="No detectado"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">Teléfono</label>
                        <input
                            type="text"
                            className="w-full p-2 bg-white border rounded"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                            placeholder="No detectado"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">Provincia</label>
                        <input
                            type="text"
                            className="w-full p-2 bg-white border rounded"
                            value={customerInfo.province}
                            onChange={(e) => setCustomerInfo({...customerInfo, province: e.target.value})}
                            placeholder="No detectado"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">Cantón</label>
                        <input
                            type="text"
                            className="w-full p-2 bg-white border rounded"
                            value={customerInfo.canton}
                            onChange={(e) => setCustomerInfo({...customerInfo, canton: e.target.value})}
                            placeholder="No detectado"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">Distrito</label>
                        <input
                            type="text"
                            className="w-full p-2 bg-white border rounded"
                            value={customerInfo.district}
                            onChange={(e) => setCustomerInfo({...customerInfo, district: e.target.value})}
                            placeholder="No detectado"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 bg-white border rounded"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                            placeholder="No detectado"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">Usuario</label>
                        <input
                            type="text"
                            className="w-full p-2 bg-white border rounded"
                            value={customerInfo.username}
                            onChange={(e) => setCustomerInfo({...customerInfo, username: e.target.value})}
                            placeholder="Usuario de Instagram/Facebook"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm text-gray-600">Dirección</label>
                        <textarea
                            className="w-full p-2 bg-white border rounded"
                            value={customerInfo.address}
                            onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                            placeholder="No detectado"
                            rows={2}
                        />
                    </div>
                </div>
            </div>

            {/* Business Information */}
            <div className="space-y-2">
              <label className="block font-medium">Negocio</label>
              <select 
                className="w-full p-2 border rounded"
                value={customerInfo.business}
                onChange={e => setCustomerInfo({...customerInfo, business: e.target.value})}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="Quark">Quark</option>
                <option value="WAS">WAS</option>
                <option value="KROMA">KROMA</option>
              </select>
            </div>

            {/* Add date fields after the business section */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Fecha de Venta</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={customerInfo.diaVenta}
                  onChange={(e) => setCustomerInfo({...customerInfo, diaVenta: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Fecha Esperada de Entrega</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={customerInfo.fechaEsperada}
                  onChange={(e) => setCustomerInfo({...customerInfo, fechaEsperada: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Producto</label>
                <input 
                  type="text"
                  name="type"
                  className="w-full p-2 border rounded"
                  value={productInfo.type}
                  onChange={handleProductInfoChange}
                  required
                  placeholder="Escriba el producto..."
                />
              </div>
              <div>
                <label className="block font-medium">Color</label>
                <input 
                  type="text"
                  name="color"
                  className="w-full p-2 border rounded"
                  value={productInfo.color}
                  onChange={handleProductInfoChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Tamaño</label>
                <input
                  type="text"
                  name="tamano"
                  className="w-full p-2 border rounded"
                  value={productInfo.tamano}
                  onChange={handleProductInfoChange}
                  required
                  placeholder="Escriba el tamaño..."
                />
              </div>
            </div>

            {/* Packaging and Comments */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Empaque</label>
                <select 
                  name="packaging"
                  className="w-full p-2 border rounded"
                  value={productInfo.packaging}
                  onChange={handleProductInfoChange}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Caja">Normal</option>
                  <option value="Caja">Kit madera</option>
                  <option value="Bolsa">Kit Regalo</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Comentarios</label>
                <input 
                  type="text"
                  name="comments"
                  className="w-full p-2 border rounded"
                  value={productInfo.comments}
                  onChange={handleProductInfoChange}
                />
              </div>
            </div>

            {/* Costs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Costo Producto</label>
                <input 
                  type="number"
                  name="productCost"
                  className="w-full p-2 border rounded"
                  value={productInfo.productCost}
                  onChange={handleProductInfoChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Costo Envío</label>
                <input 
                  type="number"
                  name="shippingCost"
                  className="w-full p-2 border rounded"
                  value={productInfo.shippingCost}
                  onChange={handleProductInfoChange}
                  required
                />
              </div>
            </div>

            {/* Totals Display */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    id="applyIVA"
                    checked={applyIVA}
                    onChange={(e) => {
                      setApplyIVA(e.target.checked);
                      setProductInfo(prev => calculateTotal(prev));
                    }}
                    className="w-4 h-4"
                  />
                  <label htmlFor="applyIVA" className="block font-medium">
                    Aplicar IVA (13%)
                  </label>
                </div>
                <input 
                  type="text"
                  className="w-full p-2 border rounded bg-gray-100"
                  value={`₡${productInfo.iva.toFixed(2)}`}
                  readOnly
                />
              </div>
              <div>
                <label className="block font-medium">Total</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded bg-gray-100 font-bold"
                  value={`₡${productInfo.total.toFixed(2)}`}
                  readOnly
                />
              </div>
            </div>

            {/* Move these sections to Product Information area */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium">Vendedor</label>
                    <select 
                        name="vendedor"
                        className="w-full p-2 border rounded"
                        value={productInfo.vendedor}
                        onChange={handleProductInfoChange}
                        required
                    >
                        <option value="">Seleccionar...</option>
                        <option value="Rafa">Rafa</option>
                        <option value="Marlenn">Marlenn</option>
                        <option value="JuanC">JuanC</option>
                        <option value="Web">Web</option>
                        <option value="Nose">Nose</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium">Mensajeria</label>
                    <select 
                        name="mensajeria"
                        className="w-full p-2 border rounded"
                        value={productInfo.mensajeria}
                        onChange={handleProductInfoChange}
                        required
                    >
                        <option value="">Seleccionar...</option>
                        <option value="Uber">Uber</option>
                        <option value="Privada">Privada</option>
                        <option value="Correos">Correos</option>
                    </select>
                </div>
            </div>

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