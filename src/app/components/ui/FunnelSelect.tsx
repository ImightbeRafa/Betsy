// components/FunnelSelect.tsx
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/app/components/ui/select"
  import { Label } from "@/app/components/ui/label"
  
  interface FunnelSelectProps {
    value: string;
    onChange: (value: 'Instagram' | 'Whatsapp') => void;
  }
  
  export function FunnelSelect({ value, onChange }: FunnelSelectProps) {
    return (
      <div className="space-y-2">
        <Label htmlFor="funnel">Canal de Venta</Label>
        <Select 
          value={value} 
          onValueChange={onChange as (value: string) => void}
        >
          <SelectTrigger id="funnel" className="w-full">
            <SelectValue placeholder="Seleccionar canal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Instagram">
              Instagram
            </SelectItem>
            <SelectItem value="Whatsapp">
              WhatsApp
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }