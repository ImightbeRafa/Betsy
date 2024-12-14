'use client';
import { useState, useEffect } from "react";
import axios from "axios";

export default function Estadisticas() {
  const [filters, setFilters] = useState({ startDate: "", endDate: "", seller: "", orderType: "" });
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [totals, setTotals] = useState({ totalSales: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/sales/stream`);
        const orders = response.data?.data || [];
        setData(orders);
        setFilteredData(orders);
        calculateTotals(orders);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = Array.isArray(data) ? [...data] : [];
    if (filters.startDate) {
      filtered = filtered.filter(record => new Date(record.saleDate) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      filtered = filtered.filter(record => new Date(record.saleDate) <= new Date(filters.endDate));
    }
    if (filters.seller) {
      filtered = filtered.filter(record => record.seller.toLowerCase().includes(filters.seller.toLowerCase()));
    }
    if (filters.orderType) {
      filtered = filtered.filter(record => record.orderType === filters.orderType);
    }

    setFilteredData(filtered);
    calculateTotals(filtered);
  };

  const calculateTotals = (filtered: any[]) => {
    const totalSales = filtered.reduce((sum, record) => sum + (record.total || 0), 0);
    const totalOrders = filtered.length;
    setTotals({ totalSales, totalOrders });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen font-sans">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Estadísticas de Ventas</h1>

      {/* Filter Inputs */}
      <div className="bg-white shadow rounded-md p-4 mb-6 flex space-x-4 items-center">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Fecha Inicio"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Fecha Fin"
        />
        <input
          type="text"
          name="seller"
          value={filters.seller}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Vendedor"
        />
        <input
          type="text"
          name="orderType"
          value={filters.orderType}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Tipo de Orden"
        />
      </div>

      {/* Totals Section */}
      <div className="bg-white shadow rounded-md p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Resumen</h2>
        <p className="text-gray-600">Total Ventas: <span className="font-bold">{totals.totalSales.toLocaleString()} CRC</span></p>
        <p className="text-gray-600">Total Pedidos: <span className="font-bold">{totals.totalOrders}</span></p>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-gray-600 text-center mb-4">Cargando datos...</div>
      ) : (
        <div className="bg-white shadow rounded-md p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Detalles</h2>
          <table className="table-auto w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-gray-600">ID</th>
                <th className="border px-4 py-2 text-gray-600">Cliente</th>
                <th className="border px-4 py-2 text-gray-600">Vendedor</th>
                <th className="border px-4 py-2 text-gray-600">Fecha de Venta</th>
                <th className="border px-4 py-2 text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map(record => (
                  <tr key={record.orderId}>
                    <td className="border px-4 py-2">{record.orderId}</td>
                    <td className="border px-4 py-2">{record.customerName}</td>
                    <td className="border px-4 py-2">{record.seller}</td>
                    <td className="border px-4 py-2">{record.saleDate}</td>
                    <td className="border px-4 py-2">{record.total.toLocaleString()} CRC</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-600">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
