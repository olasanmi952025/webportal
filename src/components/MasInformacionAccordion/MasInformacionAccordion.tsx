import React from 'react';
import { Button } from '../../ui/atoms/Button';
import { DataTable } from '../../ui/organism/DataTable';
import { Header } from '../../ui/organism/DataTable/dataTable.types';

interface Participante extends Record<string, unknown> {
  id: string;
  rol: string;
  nombreDigitado: string;
  tipoId: string;
  numeroId: string;
  fechaParticipacion: string;
  nombreRegistradoAduana: string;
}

interface Prorroga extends Record<string, unknown> {
  id: string;
  fechaProrroga: string;
  fechaVencimiento: string;
  observacion: string;
  fechaVencimientoAnterior: string;
}

interface Locacion extends Record<string, unknown> {
  id: string;
  tipoLocacion: string;
  locacion: string;
  codigo: string;
  orden: string;
}

interface Fecha extends Record<string, unknown> {
  id: string;
  tipoFecha: string;
  fecha: string;
}

interface Estado extends Record<string, unknown> {
  id: string;
  tipoEstado: string;
  fechaActivacion: string;
  usuario: string;
  observaciones: string;
}

interface Observacion extends Record<string, unknown> {
  id: string;
  tipoObservacion: string;
  fecha: string;
  observacion: string;
  loginUsuario: string;
}

interface MasInformacionAccordionProps {
  participantes: Participante[];
  prorrogas: Prorroga[];
  locaciones: Locacion[];
  fechas: Fecha[];
  estados: Estado[];
  observaciones: Observacion[];
  acordeonAbierto: string | null;
  onToggleAcordeon: (seccion: string) => void;
}

export const MasInformacionAccordion: React.FC<MasInformacionAccordionProps> = ({
  participantes,
  prorrogas,
  locaciones,
  fechas,
  estados,
  observaciones,
  acordeonAbierto,
  onToggleAcordeon
}) => {
  // Headers para la tabla de participantes
  const headersParticipantes: Header<Participante>[] = [
    {
      key: 'rol',
      label: 'Rol',
      sortable: true
    },
    {
      key: 'nombreDigitado',
      label: 'Nombre Digitado',
      sortable: true
    },
    {
      key: 'tipoId',
      label: 'Tipo Id',
      sortable: true
    },
    {
      key: 'numeroId',
      label: 'N° Id',
      sortable: true
    },
    {
      key: 'fechaParticipacion',
      label: 'Fecha Participación',
      sortable: true
    },
    {
      key: 'nombreRegistradoAduana',
      label: 'Nombre Registrado en Aduana',
      sortable: true
    },
    {
      key: 'acciones',
      label: 'Acciones',
      sortable: false,
      render: (row: Participante) => (
        <div className="flex items-center justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => console.log('Ver participante:', row.id)}
            className="text-xs px-2 py-1 border-[#A8B7C7] text-[#006FB3] hover:bg-[#EEEEEE]"
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

  // Headers para la tabla de prorrogas
  const headersProrrogas: Header<Prorroga>[] = [
    {
      key: 'fechaProrroga',
      label: 'Fecha de Prorroga',
      sortable: true
    },
    {
      key: 'fechaVencimiento',
      label: 'Fecha de Vencimiento',
      sortable: true
    },
    {
      key: 'observacion',
      label: 'Observación',
      sortable: true
    },
    {
      key: 'fechaVencimientoAnterior',
      label: 'Fecha Vencimiento Anterior',
      sortable: true
    }
  ];

  // Headers para la tabla de locaciones
  const headersLocaciones: Header<Locacion>[] = [
    {
      key: 'tipoLocacion',
      label: 'Tipo Locación',
      sortable: true
    },
    {
      key: 'locacion',
      label: 'Locación',
      sortable: true
    },
    {
      key: 'codigo',
      label: 'Código',
      sortable: true
    },
    {
      key: 'orden',
      label: 'Orden',
      sortable: true
    }
  ];

  // Headers para la tabla de fechas
  const headersFechas: Header<Fecha>[] = [
    {
      key: 'tipoFecha',
      label: 'Tipo Fecha',
      sortable: true
    },
    {
      key: 'fecha',
      label: 'Fecha',
      sortable: true
    }
  ];

  // Headers para la tabla de estados
  const headersEstados: Header<Estado>[] = [
    {
      key: 'tipoEstado',
      label: 'Tipo Estado',
      sortable: true
    },
    {
      key: 'fechaActivacion',
      label: 'Fecha Activación',
      sortable: true
    },
    {
      key: 'usuario',
      label: 'Usuario',
      sortable: true
    },
    {
      key: 'observaciones',
      label: 'Observaciones',
      sortable: true
    }
  ];

  // Headers para la tabla de observaciones
  const headersObservaciones: Header<Observacion>[] = [
    {
      key: 'tipoObservacion',
      label: 'Tipo Observación',
      sortable: true
    },
    {
      key: 'fecha',
      label: 'Fecha',
      sortable: true
    },
    {
      key: 'observacion',
      label: 'Observación',
      sortable: true
    },
    {
      key: 'loginUsuario',
      label: 'Login Usuario',
      sortable: true
    }
  ];

  return (
    <div className="space-y-4">
      {/* Participantes */}
      <div className="bg-white border border-[#A8B7C7] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <button
          onClick={() => onToggleAcordeon('participantes')}
          className="w-full px-6 py-4 text-left bg-white text-[#006FB3] border-b border-[#A8B7C7] hover:bg-[#EEEEEE] transition-colors duration-200 flex items-center justify-between"
        >
          <span className="font-medium">Participantes ({participantes.length})</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              acordeonAbierto === 'participantes' ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {acordeonAbierto === 'participantes' && (
          <div className="border-t border-[#A8B7C7]">
            {/* Header con contador y botón Export XML */}
            <div className="px-6 py-4 bg-gray-50 border-b border-[#A8B7C7]">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-[#111111]">
                  Participantes encontrados: {participantes.length}
                </h4>
                <Button
                  variant="outline"
                  className="text-[#006FB3] hover:text-[#006FB3] text-sm font-medium border-[#A8B7C7] hover:border-white py-2"
                  title="Export XML"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export XML
                </Button>
              </div>
            </div>
            
            {/* Tabla de participantes */}
            <DataTable
              headers={headersParticipantes}
              data={participantes}
              pageSize={10}
              showPagination={false}
            />
          </div>
        )}
      </div>

      {/* Prorrogas */}
      <div className="bg-white border border-[#A8B7C7] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <button
          onClick={() => onToggleAcordeon('prorrogas')}
          className="w-full px-6 py-4 text-left bg-white text-[#006FB3] border-b border-[#A8B7C7] hover:bg-[#EEEEEE] transition-colors duration-200 flex items-center justify-between"
        >
          <span className="font-medium">Prorrogas ({prorrogas.length})</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              acordeonAbierto === 'prorrogas' ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {acordeonAbierto === 'prorrogas' && (
          <div className="border-t border-[#A8B7C7]">
            {/* Header con contador */}
            <div className="px-6 py-4 bg-gray-50 border-b border-[#A8B7C7]">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-[#111111]">
                  Prórrogas encontradas: {prorrogas.length}
                </h4>
              </div>
            </div>
            
            {/* Tabla de prorrogas */}
            <DataTable
              headers={headersProrrogas}
              data={prorrogas}
              pageSize={10}
              showPagination={false}
            />
          </div>
        )}
      </div>

      {/* Locaciones */}
      <div className="bg-white border border-[#A8B7C7] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <button
          onClick={() => onToggleAcordeon('locaciones')}
          className="w-full px-6 py-4 text-left bg-white text-[#006FB3] border-b border-[#A8B7C7] hover:bg-[#EEEEEE] transition-colors duration-200 flex items-center justify-between"
        >
          <span className="font-medium">Locaciones ({locaciones.length})</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              acordeonAbierto === 'locaciones' ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {acordeonAbierto === 'locaciones' && (
          <div className="border-t border-[#A8B7C7]">
            {/* Header con contador */}
            <div className="px-6 py-4 bg-gray-50 border-b border-[#A8B7C7]">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-[#111111]">
                  Locaciones encontradas: {locaciones.length}
                </h4>
              </div>
            </div>
            
            {/* Tabla de locaciones */}
            <DataTable
              headers={headersLocaciones}
              data={locaciones}
              pageSize={10}
              showPagination={false}
            />
          </div>
        )}
      </div>

      {/* Fechas */}
      <div className="bg-white border border-[#A8B7C7] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <button
          onClick={() => onToggleAcordeon('fechas')}
          className="w-full px-6 py-4 text-left bg-white text-[#006FB3] border-b border-[#A8B7C7] hover:bg-[#EEEEEE] transition-colors duration-200 flex items-center justify-between"
        >
          <span className="font-medium">Fechas ({fechas.length})</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              acordeonAbierto === 'fechas' ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {acordeonAbierto === 'fechas' && (
          <div className="border-t border-[#A8B7C7]">
            {/* Header con contador */}
            <div className="px-6 py-4 bg-gray-50 border-b border-[#A8B7C7]">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-[#111111]">
                  Fechas encontradas: {fechas.length}
                </h4>
              </div>
            </div>
            
            {/* Tabla de fechas */}
            <DataTable
              headers={headersFechas}
              data={fechas}
              pageSize={10}
              showPagination={false}
            />
          </div>
        )}
      </div>

      {/* Estados */}
      <div className="bg-white border border-[#A8B7C7] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <button
          onClick={() => onToggleAcordeon('estados')}
          className="w-full px-6 py-4 text-left bg-white text-[#006FB3] border-b border-[#A8B7C7] hover:bg-[#EEEEEE] transition-colors duration-200 flex items-center justify-between"
        >
          <span className="font-medium">Estados ({estados.length})</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              acordeonAbierto === 'estados' ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {acordeonAbierto === 'estados' && (
          <div className="border-t border-[#A8B7C7]">
            {/* Header con contador */}
            <div className="px-6 py-4 bg-gray-50 border-b border-[#A8B7C7]">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-[#111111]">
                  Estados encontrados: {estados.length}
                </h4>
              </div>
            </div>
            
            {/* Tabla de estados */}
            <DataTable
              headers={headersEstados}
              data={estados}
              pageSize={10}
              showPagination={false}
            />
          </div>
        )}
      </div>

      {/* Observaciones */}
      <div className="bg-white border border-[#A8B7C7] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <button
          onClick={() => onToggleAcordeon('observaciones')}
          className="w-full px-6 py-4 text-left bg-white text-[#006FB3] border-b border-[#A8B7C7] hover:bg-[#EEEEEE] transition-colors duration-200 flex items-center justify-between"
        >
          <span className="font-medium">Observaciones ({observaciones.length})</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              acordeonAbierto === 'observaciones' ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {acordeonAbierto === 'observaciones' && (
          <div className="border-t border-[#A8B7C7]">
            {/* Header con contador */}
            <div className="px-6 py-4 bg-gray-50 border-b border-[#A8B7C7]">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-[#111111]">
                  Observaciones encontradas: {observaciones.length}
                </h4>
              </div>
            </div>
            
            {/* Tabla de observaciones */}
            <DataTable
              headers={headersObservaciones}
              data={observaciones}
              pageSize={10}
              showPagination={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
