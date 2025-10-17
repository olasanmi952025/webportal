import React from 'react';
import { Button } from '../../ui/atoms/Button';
import { DataTable } from '../../ui/organism/DataTable';
import { Header } from '../../ui/organism/DataTable/dataTable.types';

interface Guia extends Record<string, unknown> {
  numeroGuia: string;
  motivoMarca: string;
  resultadoSeleccionDetalle: string;
}

interface GuiasModalProps {
  isOpen: boolean;
  guias: Guia[];
  onClose: () => void;
  onVerDetalles: (guia: Guia) => void;
  onExportXML: () => void;
}

export const GuiasModal: React.FC<GuiasModalProps> = ({
  isOpen,
  guias,
  onClose,
  onVerDetalles,
  onExportXML
}) => {
  // Headers de la tabla de guías
  const headersGuias: Header<Guia>[] = [
    {
      key: 'numeroGuia',
      label: 'Numero Guía',
      sortable: true
    },
    {
      key: 'motivoMarca',
      label: 'Motivo Marca',
      sortable: true
    },
    {
      key: 'seleccion',
      label: 'Selección',
      sortable: false,
      render: (row: Guia) => (
        <div className="flex items-center justify-center">
          <span>-</span>
        </div>
      )
    },
    {
      key: 'detalles',
      label: 'Detalles',
      sortable: false,
      render: (row: Guia) => (
        <div className="flex items-center justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onVerDetalles(row)}
            className="flex items-center justify-center text-xs px-2 py-1 border-blue-300 text-blue-600 hover:bg-blue-50"
            title="Ver detalles"
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header del Modal */}
          <div className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-semibold text-[#111111]">
                Guías Asociadas
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenido del Modal */}
          <div className="bg-white">
            {/* Header de la tabla */}
            <div className="px-4 sm:px-6 py-4 bg-[#006FB3]">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">
                  Guías Courier Encontrados: {guias.length}
                </h4>
                <Button
                  onClick={onExportXML}
                  variant="outline"
                  className="text-[#006FB3] hover:text-[#006FB3] text-sm font-medium border-[#A8B7C7] hover:border-white py-2"
                  title="Export XML"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Tabla de guías */}
            <div className="overflow-x-auto">
              <DataTable 
                headers={headersGuias} 
                data={guias}
                pageSize={10}
                showPagination={false}
              />
            </div>
          </div>

          {/* Footer del Modal */}
          <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4">
            {/* Sin botón Volver */}
          </div>
        </div>
      </div>
    </div>
  );
};
