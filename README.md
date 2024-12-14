# Sistema CRM Betsy

Un sistema CRM moderno y basado en la web diseñado para gestionar operaciones de ventas y producción, con un enfoque en la entrada de datos fácil de usar y el seguimiento de ventas en tiempo real.

## 🚀 Características

### Gestión de Ventas
- 📝 Captura y almacenamiento de información del cliente
- 🛍️ Sistema de pedidos de productos
- 💰 Cálculo de precios en tiempo real con IVA
- 🚚 Gestión de costos de envío
- 📊 Seguimiento de ventas diarias
- 📋 Visualización de pedidos recientes

### Seguimiento de Pedidos
- 🏷️ Generación de ID de pedido único
- 📌 Seguimiento de estado
- 📦 Gestión de información de entrega
- 📜 Historial de pedidos

### Gestión Financiera
- 💵 Totales de ventas diarias
- 🧮 Cálculo automático de IVA
- 📊 Seguimiento de costos de envío
- 💰 Gestión de costos de productos

## 🛠️ Stack Técnico

- **Frontend**: Next.js 14 con TypeScript
- **Estilo**: Tailwind CSS con componentes de shadcn/ui
- **Backend**: Google Apps Script
- **Base de Datos**: Google Sheets
- **Despliegue**: Cloudflare Pages

## 🚀 Guía de Inicio
api/sales/stream 
structure
{
  "orderId": "EA4942",                     // Unique identifier for the order
  "status": "Pendiente",                   // Current status of the order
  "delivery": "",                          // Delivery information (if applicable)
  "customerName": "Nancy Alfaro Perez",    // Name of the customer
  "username": "",                          // Username (if applicable)
  "phone": "89986635",                     // Customer's phone number
  "email": "nancyap1713@hotmail.com",      // Customer's email address
  "business": "WAS",                       // Business name
  "product": "Taza 3D",                    // Product name
  "quantity": 1,                           // Quantity ordered
  "size": "11oz",                          // Size of the product
  "color": "Magica",                       // Color of the product
  "packaging": "Normal",                   // Type of packaging
  "customization": "no",                   // Customization details
  "comments": "Sables la direccion exacta esta en el chat", // Additional comments
  "productCost": 11900,                    // Cost of the product
  "iva": 0,                                // Tax amount (if applicable)
  "total": 14897,                          // Total cost of the order
  "timestamp": "Fri Dec 13 2024 17:03:54 GMT-0600 (hora estándar central)", // Order timestamp
  "funnel": "Whatsapp",                    // Source of the order
  "orderType": "EA",                       // Type of order (e.g., EA, RA)
  "expectedDate": "Mon Dec 16 2024 00:00:00 GMT-0600 (hora estándar central)", // Expected delivery date
  "saleDate": "Fri Dec 13 2024 00:00:00 GMT-0600 (hora estándar central)", // Date of sale
  "courier": "Privada",                    // Courier service
  "seller": "Rafa",                        // Seller's name
  "province": "San José central",          // Province of the delivery address
  "canton": "moravia",                     // Canton of the delivery address
  "district": "platanares",                // District of the delivery address
  "address": "2X4V+4R8 Moravia, San José", // Delivery address
  "shippingCost": 2997                     // Shipping cost
}

### Requisitos Previos
- Node.js >=18.18.0
- npm
- Cuenta de Google para acceso a Sheets

### Instalación

1. Clona el repositorio:

   ```bash
   git clone [repository-url]
   cd Betsy/crm
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   ```bash
   cp .env.example .env.local
   # Actualiza con la URL de despliegue de tu Google Apps Script
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

### Configuración de Google Sheets
1. Crea una nueva hoja de cálculo de Google.
2. Configura las columnas requeridas según la estructura de datos.
3. Despliega el Google Apps Script con el código proporcionado.
4. Actualiza la URL de despliegue en tus variables de entorno.

## 📁 Estructura del Proyecto

Betsy/
└── crm/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── ui/
    │   │   │   │   ├── alert.tsx
    │   │   │   │   ├── card.tsx
    │   │   │   │   └── dialog.tsx
    │   │   │   └── RecentSales.tsx
    │   │   ├── ventas/
    │   │   │   ├── components/
    │   │   │   │   └── SalesForm.tsx
    │   │   │   └── page.tsx
    │   │   ├── produccion/
    │   │   │   └── page.tsx
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   └── globals.css
    │   └── lib/
    │       └── utils.ts
    ├── public/
    ├── .gitignore
    ├── next.config.js
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.ts
    └── tsconfig.json

## 🔧 Desarrollo

### Construcción para Producción

```bash
npm run build
npm start
```

### Estructura de Datos

#### Información del Cliente
- Nombre
- Teléfono
- Provincia
- Cantón
- Distrito
- Correo Electrónico
- Nombre de Usuario
- Dirección
- Negocio

#### Información del Producto
- Tipo
- Color
- Tamaño
- Empaque
- Comentarios
- Costo del Producto
- Costo de Envío
- IVA
- Total

## ✨ Estado Actual

### Características Completadas
- ✅ Funcionalidad básica del formulario de ventas
- ✅ Integración con Google Sheets
- ✅ Visualización de ventas recientes
- ✅ Estructura de navegación
- ✅ Creación y almacenamiento de pedidos

### En Desarrollo
- 🚧 Módulo de producción
- 🚧 Reportes mejorados
- 🚧 Autenticación de usuarios
- 🚧 Funcionalidad de búsqueda avanzada

## 🤝 Contribuciones

1. Haz un fork del repositorio
2. Crea tu rama de características (`git checkout -b feature/amazing-feature`)
3. Realiza tus cambios (`git commit -m 'Add some amazing feature'`)
4. Sube a la rama (`git push origin feature/amazing-feature`)
5. Abre una Pull Request

## 📄 Licencia
[Tipo de Licencia] - Consulta LICENSE.md para más detalles

## 📞 Contacto
Mantenedor del Proyecto - [Tu Información de Contacto]

## 🙏 Agradecimientos
- [shadcn/ui](https://ui.shadcn.com/) por la biblioteca de componentes
- Google Sheets por la funcionalidad de base de datos
- Cloudflare por el alojamiento

---

Esta documentación se mantiene como parte del proyecto Betsy CRM y se actualizará a medida que se desarrollen nuevas características.