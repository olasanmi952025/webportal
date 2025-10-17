import React from 'react';
import { Button } from '../../ui/atoms/Button';
import { DataTable } from '../../ui/organism/DataTable';
import { Header } from '../../ui/organism/DataTable/dataTable.types';

interface Manifiesto extends Record<string, unknown> {
  nroAceptacion: string;
  nroRefOriginal: string;
  emisor: string;
  fechaAceptacion: string;
  fechaConformacion: string;
  totalGuias: number;
  totalGuiasMarcadas: number;
  totalGuiasRevisadas: string;
}

interface ManifiestosTableProps {
  manifiestos: Manifiesto[];
  onVerManifiesto: (manifiesto: Manifiesto) => void;
  onExportXML: () => void;
}

export const ManifiestosTable: React.FC<ManifiestosTableProps> = ({
  manifiestos,
  onVerManifiesto,
  onExportXML
}) => {
  // Headers de la tabla
  const headers: Header<Manifiesto>[] = [
    {
      key: 'nroAceptacion',
      label: 'Nro. Aceptación',
      sortable: true
    },
    {
      key: 'nroRefOriginal',
      label: 'Nro. Ref Original',
      sortable: true
    },
    {
      key: 'emisor',
      label: 'Emisor',
      sortable: true
    },
    {
      key: 'fechaAceptacion',
      label: 'Fecha Aceptación',
      sortable: true
    },
    {
      key: 'fechaConformacion',
      label: 'Fecha Conformación',
      sortable: true
    },
    {
      key: 'totalGuias',
      label: 'Total Guías',
      sortable: true
    },
    {
      key: 'totalGuiasMarcadas',
      label: 'Total Guías Marcadas',
      sortable: true,
    },
    {
      key: 'totalGuiasRevisadas',
      label: 'Total Guías Revisadas',
      sortable: true,
      render: (row) => row.totalGuiasRevisadas || '-'
    },
    {
      key: 'acciones',
      label: 'Acciones',
      sortable: false,
      render: (row) => (
        <div className="flex items-center justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onVerManifiesto(row)}
            className="flex items-center justify-center text-xs px-2 py-1 border-blue-300 text-blue-600 hover:bg-blue-50"
            title="Ver manifiesto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#111111] text-left">
            Manifiestos Courier Encontrados: {manifiestos.length}
          </h2>
          <Button
            onClick={onExportXML}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm sm:text-base px-4 py-2"
          >
            Exportar
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <DataTable 
            headers={headers} 
            data={manifiestos}
            pageSize={5}
            showPagination={true}
            paginationSize="sm"
          />
        </div>
      </div>
    </div>
  );
};
