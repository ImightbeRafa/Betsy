# Sistema CRM Betsy

Un sistema CRM moderno y basado en la web diseñado para gestionar operaciones de ventas y producción, con autenticación segura y enfoque en la entrada de datos fácil de usar.

## 🚀 Características

### Autenticación y Seguridad
- 🔐 Autenticación con Google OAuth 2.0
- 👤 Control de acceso basado en correo electrónico
- 🛡️ Protección de rutas mediante middleware
- ⚡ Sesiones JWT

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
- **Autenticación**: NextAuth.js con Google Provider
- **Estilo**: Tailwind CSS con componentes de shadcn/ui
- **Backend**: Google Apps Script
- **Base de Datos**: Google Sheets
- **Despliegue**: Cloudflare Pages

## 🚀 Guía de Inicio

### Requisitos Previos
- Node.js >=18.18.0
- npm
- Cuenta de Google para acceso a Sheets
- Credenciales de OAuth 2.0 configuradas

### Variables de Entorno Requeridas

```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key
GOOGLE_ID=your-oauth-client-id
GOOGLE_SECRET=your-oauth-client-secret
NEXT_PUBLIC_SCRIPT_URL=your-google-apps-script-url
```

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
- ✅ Sistema de autenticación con Google
- ✅ Protección de rutas mediante middleware
- ✅ Funcionalidad básica del formulario de ventas
- ✅ Integración con Google Sheets
- ✅ Visualización de ventas recientes
- ✅ Estructura de navegación
- ✅ Creación y almacenamiento de pedidos
- ✅ Control de acceso basado en correo electrónico

### En Desarrollo
- 🚧 Módulo de producción
- 🚧 Reportes mejorados
- 🚧 Funcionalidad de búsqueda avanzada
- 🚧 Panel de administración
- 🚧 Sistema de notificaciones

## 📞 Contacto
Email: contact@laplacelab.xyz

## 🙏 Agradecimientos
- [NextAuth.js](https://next-auth.js.org/) por la autenticación
- [shadcn/ui](https://ui.shadcn.com/) por la biblioteca de componentes
- Google Sheets por la funcionalidad de base de datos
- Cloudflare por el alojamiento

---

Esta documentación se mantiene como parte del proyecto Betsy CRM y se actualizará a medida que se desarrollen nuevas características.