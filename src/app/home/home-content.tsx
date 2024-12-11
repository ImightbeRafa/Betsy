'use client';
// src/app/page.tsx

import { useRouter } from "next/navigation";

export default function HomeContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Betsy CRM</h1>
          <p className="text-gray-600">Sistema de Gestión</p>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Ventas Card */}
          <a
            href="/ventas"
            className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Ventas</h2>
              <p className="text-gray-600 text-center text-sm">Gestionar pedidos y clientes</p>
            </div>
          </a>

          {/* Production Card - Updated to match Ventas styling */}
          <a
            href="/produccion" // Make it a link to the Producción page
            className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 opacity-100" // Removed opacity for visibility
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Producción</h2>
              <p className="text-gray-500 text-center text-sm">Gestionar producción y órdenes</p>
            </div>
          </a>

          {/* Statistics Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 opacity-75">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Estadísticas</h2>
              <p className="text-gray-500 text-center text-sm">Próximamente</p>
              <span className="mt-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">En desarrollo</span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2024 Betsy CRM. Hecho por Rafa:) </p>
          <p>v0.1.3 </p>
        </footer>
      </main>
    </div>
  );
}
