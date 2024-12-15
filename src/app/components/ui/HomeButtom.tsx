'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, ShoppingCart, Factory, BarChart } from 'lucide-react';

const NavigationMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { path: '/home', label: 'Inicio', icon: Home },
    { path: '/ventas', label: 'Ventas', icon: ShoppingCart },
    { path: '/produccion', label: 'Producción', icon: Factory },
    { path: '/estadisticas', label: 'Estadísticas', icon: BarChart },
  ];

  const isActivePath = (path: string) => pathname === path;

  return (
    <div className="flex items-center gap-4 p-2 bg-white rounded-lg shadow-sm">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = isActivePath(item.path);
        
        return (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`
              group flex items-center gap-2 px-4 py-2 rounded-lg
              transition-all duration-200 ease-in-out
              ${isActive 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-500'}
            `}
          >
            <Icon 
              className={`
                transition-transform group-hover:-translate-x-1
                ${isActive ? '' : 'group-hover:text-blue-500'}
              `}
              size={20}
            />
            <span className="font-medium">{item.label}</span>
          </button>
        )
      })}
    </div>
  );
};

export default NavigationMenu;