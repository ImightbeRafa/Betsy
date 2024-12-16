// src/app/produccion/components/GuiaGenerator.tsx
import React, { useState } from 'react';
import { Sale } from '../types/sales';
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { ScrollArea } from "@/app/components/ui/scroll-area";

interface GuiaGeneratorProps {
  orders: Sale[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateOrder: (orderId: string, updatedData: Partial<Sale>) => Promise<Sale>;
}

interface OrderGuiaData {
  orderId: string;
  guiaNumber: string;
  selected: boolean;
}

export function GuiaGenerator({ orders, isOpen, onClose, onUpdateOrder }: GuiaGeneratorProps) {
  const [orderGuias, setOrderGuias] = useState<OrderGuiaData[]>(
    orders
      .filter(order => order.orderType === 'EA')
      .map(order => ({
        orderId: order.orderId,
        guiaNumber: '',
        selected: false,
      }))
  );

  const handleToggleOrder = (orderId: string) => {
    setOrderGuias(prev =>
      prev.map(og =>
        og.orderId === orderId
          ? { ...og, selected: !og.selected }
          : og
      )
    );
  };

  const handleGuiaNumberChange = (orderId: string, value: string) => {
    setOrderGuias(prev =>
      prev.map(og =>
        og.orderId === orderId
          ? { ...og, guiaNumber: value }
          : og
      )
    );
  };

  const handlePrint = () => {
    const selectedOrders = orderGuias.filter(og => og.selected);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const orderElements = selectedOrders.map(og => {
      const order = orders.find(o => o.orderId === og.orderId);
      if (!order) return '';

      return `
        <div class="guia-container page-break">
          <div class="header">
            <h1>Guía de Envío</h1>
            <h2>Número de Guía: ${og.guiaNumber}</h2>
          </div>
          <div class="info-row">
            <span class="info-label">Orden:</span>
            <span class="info-value">${order.orderId}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Teléfono:</span>
            <span class="info-value">${order.phone}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Cliente:</span>
            <span class="info-value">${order.customerName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Producto:</span>
            <span class="info-value">${order.product}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Dirección:</span>
            <span class="info-value">${order.address}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Negocio:</span>
            <span class="info-value">${order.business}</span>
          </div>
        </div>
      `;
    }).join('');

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Guías de Envío</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              margin: 0;
            }
            .guia-container {
              border: 2px solid #000;
              padding: 20px;
              margin-bottom: 20px;
              page-break-inside: avoid;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
            }
            .info-row {
              margin: 10px 0;
              display: flex;
              justify-content: space-between;
            }
            .info-label {
              font-weight: bold;
              margin-right: 10px;
            }
            .info-value {
              flex: 1;
            }
            .page-break {
              page-break-after: always;
            }
            @media print {
              body {
                padding: 0;
              }
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          ${orderElements}
          <button class="no-print" onclick="window.print()">Imprimir</button>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  const canPrint = orderGuias.some(og => og.selected && og.guiaNumber);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Generar Guías de Envío</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] px-4">
          <div className="space-y-4">
            {orderGuias.map((og) => {
              const order = orders.find(o => o.orderId === og.orderId);
              if (!order) return null;

              return (
                <div key={og.orderId} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Checkbox
                    checked={og.selected}
                    onCheckedChange={() => handleToggleOrder(og.orderId)}
                  />
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Orden: {og.orderId}</p>
                      <p className="text-sm text-gray-500">{order.customerName}</p>
                    </div>
                    <Input
                      placeholder="Número de guía"
                      value={og.guiaNumber}
                      onChange={(e) => handleGuiaNumberChange(og.orderId, e.target.value)}
                      disabled={!og.selected}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handlePrint} disabled={!canPrint}>
            Generar e Imprimir Seleccionados
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}