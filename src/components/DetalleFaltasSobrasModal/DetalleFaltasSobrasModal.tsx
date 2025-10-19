import React from 'react';

interface Guia {
  numeroGuia: string;
  consignante: string;
  consignatario: string;
  cantidadBultosFaltante: number;
  pesoFaltante: number;
  valorFaltante: number;
  cantidadBultosSobrante: number;
  pesoSobrante: number;
  valorSobrante: number;
  esAnulada: boolean;
}

interface DetalleFaltaSobra {
  numeroManifiesto: string;
  ciaCourier: string;
  numeroMaster: string;
  numeroVuelo: string;
  fechaEmision: string;
  puertoEmbarque: string;
  fechaArribo: string;
  totalPesoOriginal: number;
  totalPesoConFyS: number;
  totalBultosOriginal: number;
  totalBultosConFyS: number;
  guias: Guia[];
}

interface DetalleFaltasSobrasModalProps {
  detalle: DetalleFaltaSobra | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DetalleFaltasSobrasModal: React.FC<DetalleFaltasSobrasModalProps> = ({
  detalle,
  isOpen,
  onClose
}) => {
  if (!isOpen || !detalle) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
      <div className="relative w-full max-w-7xl max-h-[95vh] mx-auto">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-h-[95vh] flex flex-col">
          {/* Header */}
          <div className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-semibold text-[#111111]">
                Detalle por Guía
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

          {/* Body */}
          <div className="bg-white overflow-y-auto flex-1 p-4 sm:p-6">
            {/* Información principal */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 mb-4">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">Información Principal</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Nº de Manifiesto:</span>
                    <span className="text-sm font-semibold text-blue-900">{detalle.numeroManifiesto}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Cía Courier:</span>
                    <span className="text-sm text-blue-900">{detalle.ciaCourier}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Fecha de Emisión:</span>
                    <span className="text-sm text-blue-900">{detalle.fechaEmision}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Nº de C.A. Master:</span>
                    <span className="text-sm text-blue-900">{detalle.numeroMaster}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Nº Vuelo:</span>
                    <span className="text-sm text-blue-900">{detalle.numeroVuelo}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Puerto de Embarque:</span>
                    <span className="text-sm text-blue-900">{detalle.puertoEmbarque}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Fecha de Arribo:</span>
                    <span className="text-sm text-blue-900">{detalle.fechaArribo}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Total Peso Original:</span>
                    <span className="text-sm text-blue-900">{detalle.totalPesoOriginal}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Total Peso con F y S:</span>
                    <span className="text-sm text-blue-900">{detalle.totalPesoConFyS}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Total Bultos Original:</span>
                    <span className="text-sm text-blue-900">{detalle.totalBultosOriginal}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Total Bultos con F y S:</span>
                    <span className="text-sm text-blue-900">{detalle.totalBultosConFyS}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de guías */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200 bg-[#006FB3] text-white">
                <h4 className="font-bold">Número de Guías encontradas = {detalle.guias.length}</h4>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#EEEEEE]">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-[#111111] uppercase tracking-wider border-r border-gray-200">
                        Nº Guía
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-[#111111] uppercase tracking-wider border-r border-gray-200">
                        Consignante
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-[#111111] uppercase tracking-wider border-r border-gray-200">
                        Consignatario
                      </th>
                      <th colSpan={3} className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider border-r border-gray-200 bg-[#006FB3]">
                        Mercancía Faltante
                      </th>
                      <th colSpan={3} className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider border-r border-gray-200 bg-[#FE6565]">
                        Mercancía Sobrante
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-[#111111] uppercase tracking-wider">
                        Es Anulada
                      </th>
                    </tr>
                    <tr className="bg-[#EEEEEE]">
                      <th className="border-r border-gray-200"></th>
                      <th className="border-r border-gray-200"></th>
                      <th className="border-r border-gray-200"></th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-[#111111] uppercase border-r border-gray-200">
                        Cant.Bultos
                      </th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-[#111111] uppercase border-r border-gray-200">
                        Peso
                      </th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-[#111111] uppercase border-r border-gray-200">
                        Valor
                      </th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-[#111111] uppercase border-r border-gray-200">
                        Cant.Bultos
                      </th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-[#111111] uppercase border-r border-gray-200">
                        Peso
                      </th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-[#111111] uppercase border-r border-gray-200">
                        Valor
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {detalle.guias.map((guia, index) => (
                      <tr key={index} className="hover:bg-[#EEEEEE]">
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-[#111111] border-r border-gray-200">
                          {guia.numeroGuia}
                        </td>
                        <td className="px-3 py-4 text-sm text-[#4A4A4A] border-r border-gray-200">
                          {guia.consignante}
                        </td>
                        <td className="px-3 py-4 text-sm text-[#4A4A4A] border-r border-gray-200">
                          {guia.consignatario}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-[#111111] border-r border-gray-200">
                          {guia.cantidadBultosFaltante}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-[#111111] border-r border-gray-200">
                          {guia.pesoFaltante}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-[#111111] border-r border-gray-200">
                          {guia.valorFaltante}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-[#111111] border-r border-gray-200">
                          {guia.cantidadBultosSobrante}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-[#111111] border-r border-gray-200">
                          {guia.pesoSobrante}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-[#111111] border-r border-gray-200">
                          {guia.valorSobrante}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-[#111111]">
                          <input
                            type="checkbox"
                            checked={guia.esAnulada}
                            readOnly
                            className="w-4 h-4 accent-[#006FB3]"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

