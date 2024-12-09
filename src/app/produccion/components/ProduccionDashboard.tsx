"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useSalesStream } from '@/app/api/sales/useSalesStream';
import { OrderList } from './OrderList';
import { OrderDetails } from './OrderDetail';
import { Sale } from '@/app/produccion/types/sales';

export function ProductionDashboard() {
  const [orders, setOrders] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Sale | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Use your existing streaming hook
  useSalesStream({
    onData: (text) => {
      if (!text) return;
      
      const salesData = text.split(';').map((sale: string) => {
        const [
          orderId = '',
          customerName = 'Sin nombre',
          total = '0',
          timestamp = '',
          orderType = 'EA',
          phone = '',
          email = '',
          address = '',
          product = '',
          status = 'Pendiente'
        ] = sale.split('|');

        return {
          orderId: orderId || '',
          customerName: customerName || 'Sin nombre',
          total: Number(total) || 0,
          timestamp: timestamp || new Date().toISOString(),
          orderType: (orderType === 'RA' ? 'RA' : 'EA') as 'EA' | 'RA',
          status: status || 'Pendiente',
          phone: phone || '',
          email: email || '',
          address: address || '',
          product: product || ''
        };
      });
      setOrders(salesData);
      setLoading(false);
    },
    onError: (errorMessage) => {
      setError(errorMessage);
      setLoading(false);
    }
  });

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchLower) ||
      order.orderId.toLowerCase().includes(searchLower) ||
      order.product.toLowerCase().includes(searchLower);
    return matchesStatus && matchesSearch;
  });

  const groupedOrders = {
    EA: filteredOrders.filter(order => order.orderType === 'EA'),
    RA: filteredOrders.filter(order => order.orderType === 'RA')
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      console.log('Updating status:', { orderId, newStatus }); // Debug log
      
      const response = await fetch('/api/orders/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status: newStatus
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update status');
      }

      // Update local state
      setOrders(orders.map(order =>
        order.orderId === orderId
          ? { ...order, status: newStatus }
          : order
      ));

      // Close the dialog
      setSelectedOrder(null);

    } catch (error) {
      console.error('Error updating status:', error);
      // Re-throw the error so it can be caught by the OrderDetails component
      throw error instanceof Error ? error : new Error('Failed to update status');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Panel de Producción</CardTitle>
            <div className="flex gap-4">
              <Input
                placeholder="Buscar orden..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <select
                className="border rounded-md px-3 py-1"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="en proceso">En Proceso</option>
                <option value="completado">Completado</option>
                <option value="entregado">Entregado</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="EA" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="EA">
                Envíos (EA) - {groupedOrders.EA.length}
              </TabsTrigger>
              <TabsTrigger value="RA">
                Retiros (RA) - {groupedOrders.RA.length}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="EA" className="mt-4">
              <OrderList
                orders={groupedOrders.EA}
                onSelectOrder={setSelectedOrder}
                loading={loading}
                error={error}
              />
            </TabsContent>
            
            <TabsContent value="RA" className="mt-4">
              <OrderList
                orders={groupedOrders.RA}
                onSelectOrder={setSelectedOrder}
                loading={loading}
                error={error}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={(newStatus) => handleStatusUpdate(selectedOrder.orderId, newStatus)}
        />
      )}
    </div>
  );
}