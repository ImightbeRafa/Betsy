import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { useState } from "react";
import { Sale, SaleKeys } from '../types/sales';
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Pencil, X } from "lucide-react";

interface OrderDetailsProps {
  order: Sale;
  onClose: () => void;
  onUpdateStatus: (newStatus: string) => Promise<void>;
  onUpdateOrder: (orderId: string, updatedData: Partial<Sale>) => Promise<void>;
}

export function OrderDetails({ 
  order, 
  onClose, 
  onUpdateStatus,
  onUpdateOrder 
}: OrderDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState<Sale>(order);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: SaleKeys, value: any) => {
    setEditedOrder(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onUpdateOrder(order.orderId, editedOrder);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving order:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderField = (label: string, field: SaleKeys, type: string = 'text') => {
    const value = editedOrder[field as keyof Sale];
    
    if (!isEditing) {
      return (
        <div className="group relative space-y-1 py-2">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</label>
          <p className="text-sm text-gray-900 dark:text-gray-100">
            {type === 'number' && typeof value === 'number' 
              ? value.toLocaleString()
              : value?.toString() || '-'
            }
          </p>
        </div>
      );
    }

    if (field === 'comments') {
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{label}</label>
          <Textarea
            value={value?.toString() || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="min-h-[120px] resize-none"
            placeholder={`Ingrese ${label.toLowerCase()}...`}
          />
        </div>
      );
    }

    if (field === 'status') {
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{label}</label>
          <select
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm 
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={value?.toString()}
            onChange={(e) => {
              handleInputChange(field, e.target.value);
              onUpdateStatus(e.target.value);
            }}
          >
            {['Pendiente', 'En Proceso', 'Completado', 'Entregado', 'Drive', 'Impreso', 'PendienteDiseño']
              .map(status => (
                <option key={status} value={status}>{status}</option>
              ))
            }
          </select>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">{label}</label>
        <Input
          type={type}
          value={value?.toString() || ''}
          onChange={(e) => handleInputChange(field, 
            type === 'number' ? parseFloat(e.target.value) : e.target.value
          )}
          placeholder={`Ingrese ${label.toLowerCase()}...`}
          className="bg-transparent"
        />
      </div>
    );
  };

  const renderSection = (title: string, fields: Array<[string, SaleKeys, string?]>) => (
    <div className="rounded-lg border border-gray-100 dark:border-gray-800 p-4 space-y-4">
      <h3 className="font-medium text-sm text-gray-600 dark:text-gray-300">{title}</h3>
      <div className="grid gap-4">
        {fields.map(([label, field, type]) => renderField(label, field, type))}
      </div>
    </div>
  );

  const commonFields: Array<[string, SaleKeys, string?]> = [
    ['Usuario', 'username'],
    ['Cliente', 'customerName'],
    ['Teléfono', 'phone'],
    ['Email', 'email'],
    ['Negocio', 'business'],
    ['Producto', 'product'],
    ['Cantidad', 'quantity', 'number'],
    ['Tamaño', 'size'],
    ['Color', 'color'],
    ['Empaque', 'packaging'],
    ['Personalización', 'customization'],
    ['Total', 'total', 'number'],
    ['Delivery', 'delivery'],
    ['Timestamp', 'timestamp']
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium">Orden {order.orderId}</span>
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800">
                {order.orderType}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={() => {
                  if (isEditing) {
                    setEditedOrder(order);
                  }
                  setIsEditing(!isEditing);
                }}
              >
                {isEditing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
              </Button>
              {isEditing && (
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full sm:w-auto"
                >
                  {isSaving ? "Guardando..." : "Guardar Cambios"}
                </Button>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 h-full max-h-[calc(90vh-8rem)]">
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {renderSection('Información del Cliente', commonFields)}
            </div>

            <div className="space-y-6">
              {renderSection('Estado', [
                ['Estado', 'status', 'status'],
                ['Canal', 'funnel', 'funnel']
              ].map(([label, field, type]) => [label, field, type]))}

              {order.orderType === 'EA' && renderSection('Detalles de Envío', [
                ['Dirección', 'address'],
                ['Fecha Esperada', 'expectedDate'],
                ['Fecha de Venta', 'saleDate'],
                ['Mensajería', 'courier'],
                ['Vendedor', 'seller'],
                ['Provincia', 'province'],
                ['Cantón', 'canton'],
                ['Distrito', 'district'],
                ['Costo de Producto', 'productCost', 'number'],
                ['Costo de Envío', 'shippingCost', 'number'],
                ['IVA', 'iva', 'number']
              ])}

              {order.orderType === 'RA' && renderSection('Detalles de Retiro', [
                ['Dirección', 'address'],
                ['Fecha Acordada', 'agreedDate'],
                ['Fecha de Retiro', 'pickupDate'],
                ['Vendedor', 'seller'],
                ['Costo de Producto', 'productCost', 'number'],
                ['IVA', 'iva', 'number']
              ])}

              {renderSection('Comentarios', [['Comentarios', 'comments']])}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}