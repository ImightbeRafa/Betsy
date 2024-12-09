import React from 'react';
import { ProductInfo } from './types';

interface ProductFormProps {
  productInfo: ProductInfo;
  orderType: 'EA' | 'RA';
  onProductInfoChange: (info: ProductInfo) => void;
  applyIVA: boolean;
  onApplyIVAChange: (value: boolean) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  productInfo,
  orderType,
  onProductInfoChange,
  applyIVA,
  onApplyIVAChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let numValue = value;

    // Convert to number for numeric fields
    if (['productCost', 'shippingCost', 'cantidad'].includes(name)) {
      numValue = value === '' ? '0' : value;
      const newInfo = {
        ...productInfo,
        [name]: parseFloat(numValue) || 0
      };

      // Calculate total
      const subtotal = newInfo.productCost * newInfo.cantidad;
      const shipping = orderType === 'EA' ? newInfo.shippingCost : 0;
      const iva = applyIVA ? subtotal * 0.13 : 0;
      const total = subtotal + shipping + iva;

      onProductInfoChange({
        ...newInfo,
        iva: iva,
        total: total
      });
    } else {
      onProductInfoChange({
        ...productInfo,
        [name]: value
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Producto</label>
          <input 
            type="text"
            name="type"
            className="w-full p-2 border rounded"
            value={productInfo.type}
            onChange={handleInputChange}
            required
            placeholder="Escriba el producto..."
          />
        </div>
        <div>
          <label className="block font-medium">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={productInfo.cantidad}
            onChange={handleInputChange}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block font-medium">Color</label>
          <input 
            type="text"
            name="color"
            className="w-full p-2 border rounded"
            value={productInfo.color}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            required
            placeholder="Escriba el tamaño..."
          />
        </div>
      </div>

      {/* Packaging and Personalization */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Empaque</label>
          <select 
            name="packaging"
            className="w-full p-2 border rounded"
            value={productInfo.packaging}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar...</option>
            <option value="Normal">Normal</option>
            <option value="Kit madera">Kit madera</option>
            <option value="Kit Regalo">Kit Regalo</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Personalizado</label>
          <input 
            type="text"
            name="personalizado"
            className="w-full p-2 border rounded"
            value={productInfo.personalizado}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Comments */}
      <div>
        <label className="block font-medium">Comentarios</label>
        <textarea
          name="comments"
          className="w-full p-2 border rounded"
          value={productInfo.comments}
          onChange={handleInputChange}
          rows={2}
        />
      </div>

      {/* Vendor and Messenger Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Vendedor</label>
          <select 
            name="vendedor"
            className="w-full p-2 border rounded"
            value={productInfo.vendedor}
            onChange={handleInputChange}
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

        {orderType === 'EA' && (
          <div>
            <label className="block font-medium">Mensajería</label>
            <select
              name="mensajeria"
              className="w-full p-2 border rounded"
              value={productInfo.mensajeria}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar...</option>
              <option value="Uber">Uber</option>
              <option value="Correos">Correos</option>
              <option value="Privada">Privada</option>
              <option value="Didi">Didi</option>
              <option value="InDriver">InDriver</option>
            </select>
          </div>
        )}
      </div>

      {/* Costs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Costo del Producto</label>
          <input
            type="number"
            name="productCost"
            value={productInfo.productCost}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            min="0"
            step="any"
            required
          />
        </div>

        {orderType === 'EA' && (
          <div>
            <label className="block font-medium">Costo de Envío</label>
            <input
              type="number"
              name="shippingCost"
              value={productInfo.shippingCost}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              min="0"
              step="any"
            />
          </div>
        )}
      </div>

      {/* IVA and Total */}
      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="applyIVA"
              checked={applyIVA}
              onChange={(e) => onApplyIVAChange(e.target.checked)}
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
    </div>
  );
};

export default ProductForm;