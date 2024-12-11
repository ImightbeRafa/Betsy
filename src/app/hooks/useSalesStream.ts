// hooks/useSalesStream.ts
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useToast } from "@/app/hooks/use-toast"
import { Sale } from '../produccion/types/sales'

interface SalesStreamOptions {
  onData?: (data: Sale[]) => void;
  onError?: (error: string) => void;
  pollingInterval?: number;
}

export function useSalesStream({
  onData,
  onError,
  pollingInterval = 30000
}: SalesStreamOptions = {}) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const parseOrder = useCallback((data: any): Sale => {
    const commonFields = {
      orderId: data.orderId || '',
      status: data.status || 'Pendiente',
      delivery: data.delivery || '-',
      timestamp: data.timestamp || new Date().toISOString(),
      customerName: data.customerName || '',
      username: data.username || '',
      phone: data.phone || '',
      email: data.email || '',
      business: data.business || '',
      product: data.product || '',
      quantity: Number(data.quantity) || 0,
      size: data.size || '',
      color: data.color || '',
      packaging: data.packaging || '',
      customization: data.customization || '',
      comments: data.comments || '',
      total: Number(data.total) || 0,
      funnel: data.funnel || '',
    };

    if (data.orderType === 'EA') {
      return {
        ...commonFields,
        orderType: 'EA',
        expectedDate: data.expectedDate || '',
        saleDate: data.saleDate || '',
        courier: data.courier || '',
        seller: data.seller || '',
        province: data.province || '',
        canton: data.canton || '',
        district: data.district || '',
        address: data.address || '',
        productCost: Number(data.productCost) || 0,
        shippingCost: Number(data.shippingCost) || 0,
        iva: Number(data.iva) || 0,
      };
    } else {
      return {
        ...commonFields,
        orderType: 'RA',
        seller: data.seller || '',
        agreedDate: data.agreedDate || '',
        pickupDate: data.pickupDate || '',
        productCost: Number(data.productCost) || 0,
        iva: Number(data.iva) || 0,
        address: data.address || '',
      };
    }
  }, []);
  
  const fetchSales = useCallback(async () => {
    try {
      const response = await fetch('/api/sales/stream', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 'error') {
        throw new Error(result.error || 'Unknown error');
      }

      const parsedSales = result.data.map(parseOrder);

      localStorage.setItem('salesCache', JSON.stringify({
        data: parsedSales,
        timestamp: Date.now()
      }));

      setSales(parsedSales);
      onData?.(parsedSales);
      setError(null);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch sales data';
      console.error('Error fetching sales:', errorMessage);
      setError(errorMessage);
      onError?.(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [onData, onError, toast, parseOrder]);

  useEffect(() => {
    const cachedData = localStorage.getItem('salesCache');
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const isCacheValid = Date.now() - timestamp < 60000;
      
      if (isCacheValid) {
        setSales(data);
        setIsLoading(false);
      }
    }
    
    fetchSales();
  }, [fetchSales]);

  useEffect(() => {
    const intervalId = setInterval(fetchSales, pollingInterval);
    return () => clearInterval(intervalId);
  }, [fetchSales, pollingInterval]);

  const stats = useMemo(() => ({
    total: sales.length,
    eaOrders: sales.filter(s => s.orderType === 'EA').length,
    raOrders: sales.filter(s => s.orderType === 'RA').length,
    totalAmount: sales.reduce((sum, sale) => sum + sale.total, 0),
  }), [sales]);

  return {
    sales,
    isLoading,
    error,
    refresh: fetchSales,
    stats
  };
}