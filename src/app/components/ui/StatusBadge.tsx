export function StatusBadge({ status }: { status: string }) {
    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case 'pendiente':
          return 'bg-yellow-100 text-yellow-800';
        case 'Drive':
            return 'bg-brown-100 text-white-800';
        case 'Impreso':
            return 'bg-gray-100 text-black-800';
        case 'en proceso':
          return 'bg-blue-100 text-blue-800';
        case 'completado':
          return 'bg-green-100 text-green-800';
        case 'entregado':
          return 'bg-purple-100 text-purple-800';
        case 'PendienteDiseño':
          return 'bg-purple-100 text-purple-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
  
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
        {status}
      </span>
    );
  }