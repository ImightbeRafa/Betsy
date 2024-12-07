// src/app/components/RecentSales.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

interface Sale {
  orderId: string;
  customer: string;
  username: string;
  phone: string;
  email: string;
  address: string;
  business: string;
  product: string;
  tamano: string;
  color: string;
  empaque: string;
  comments: string;
  productCost: number;
  shippingCost: number;
  total: number;
  status: string;
  date: string;
  messenger: string;
}

const RecentSales = () => {
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  // Same URL as your form
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzqL_E7bmOqnXK8cXpafjENjl-NHrFJ_6NAxzahTChv30SnjjenopkwWemzqwLP4BdS/exec';
  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getRecentSales`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        setRecentSales(data.sales || []);
        setDailyTotal(data.dailyTotal || 0);
      } else {
        setError('Error loading data');
      }
    } catch (error) {
      console.error('Error fetching sales:', error);
      setError('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
    const interval = setInterval(fetchSales, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Ventas del Día</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₡{dailyTotal.toLocaleString()}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="space-y-4">
              {recentSales.length > 0 ? (
                recentSales.map((sale) => (
                  <div 
                    key={sale.orderId} 
                    className="border-b pb-3 last:border-0 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    onClick={() => setSelectedSale(sale)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{sale.orderId}</p>
                        <p className="text-sm text-gray-500">{sale.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₡{sale.total.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(sale.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No hay ventas recientes</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedSale} onOpenChange={() => setSelectedSale(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Pedido: {selectedSale?.orderId}</DialogTitle>
          </DialogHeader>
          {selectedSale && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Cliente</h4>
                  <p>{selectedSale.customer}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Estado</h4>
                  <p>{selectedSale.status}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Teléfono</h4>
                  <p>{selectedSale.phone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p>{selectedSale.email}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500">Dirección</h4>
                  <p>{selectedSale.address}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Producto</h4>
                  <p>{selectedSale.product}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Tamaño</h4>
                  <p>{selectedSale.tamano}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Total</h4>
                  <p className="font-bold">₡{selectedSale.total.toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Mensajería</h4>
                  <p>{selectedSale.messenger}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecentSales;

