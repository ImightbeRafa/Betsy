import React from 'react';

interface OrderTypeToggleProps {
  orderType: 'EA' | 'RA';
  onOrderTypeChange: (type: 'EA' | 'RA') => void;
}

const OrderTypeToggle: React.FC<OrderTypeToggleProps> = ({ orderType, onOrderTypeChange }) => {
  return (
    <div className="flex justify-center space-x-2 mb-6">
      <button
        type="button"
        className={`px-4 py-2 rounded-l-lg ${
          orderType === 'EA'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => onOrderTypeChange('EA')}
      >
        Envío (EA)
      </button>
      <button
        type="button"
        className={`px-4 py-2 rounded-r-lg ${
          orderType === 'RA'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => onOrderTypeChange('RA')}
      >
        Retiro (RA)
      </button>
    </div>
  );
};

export default OrderTypeToggle;