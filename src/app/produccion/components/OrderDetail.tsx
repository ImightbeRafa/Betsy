import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/app/components/ui/dialog";
  import { Sale } from '../types/sales';
  
  interface OrderDetailsProps {
    order: Sale;
    onClose: () => void;
    onUpdateStatus: (newStatus: string) => Promise<void>;
  }
  
  export function OrderDetails({ order, onClose, onUpdateStatus }: OrderDetailsProps) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Orden {order.orderId}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Cliente</h4>
              <p>{order.customerName}</p>
            </div>
            <div>
              <h4 className="font-semibold">Teléfono</h4>
              <p>{order.phone}</p>
            </div>
            <div>
              <h4 className="font-semibold">Email</h4>
              <p>{order.email}</p>
            </div>
            <div>
              <h4 className="font-semibold">Estado</h4>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={order.status}
                onChange={(e) => onUpdateStatus(e.target.value)}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Completado">Completado</option>
                <option value="Entregado">Entregado</option>
              </select>
            </div>
            <div className="col-span-2">
              <h4 className="font-semibold">Dirección</h4>
              <p>{order.address}</p>
            </div>
            <div>
              <h4 className="font-semibold">Producto</h4>
              <p>{order.product}</p>
            </div>
            <div>
              <h4 className="font-semibold">Total</h4>
              <p className="font-bold">₡{order.total.toLocaleString()}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }