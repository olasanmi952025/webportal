import React, { useState } from 'react';
import { Button } from '../ui/atoms/Button';
import { DatePicker } from '../ui/atoms/DatePicker';
import { Select } from '../ui/atoms/Select';
import { Checkbox } from '../ui/atoms/Checkbox';
import { SearchInput } from '../ui/molecule/SearchInput';
import { DataTable } from '../ui/organism/DataTable';
import { Header } from '../ui/organism/DataTable/dataTable.types';
import { DetallesDocumentoModal } from '../components';

const BusquedaDocumentosPage: React.FC = () => {
  // Estados para filtros
  const [filtroPor, setFiltroPor] = useState('todos');
  const [grupoDocumento, setGrupoDocumento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroReferencia, setNumeroReferencia] = useState('');
  const [soloActivos, setSoloActivos] = useState(true);
  const [usuarioCreador, setUsuarioCreador] = useState('');
  const [todosUsuarios, setTodosUsuarios] = useState(true);
  const [locacion, setLocacion] = useState('');
  const [todasLocaciones, setTodasLocaciones] = useState(true);
  const [tipoLocacion, setTipoLocacion] = useState('');
  const [participante, setParticipante] = useState('');
  const [todosParticipantes, setTodosParticipantes] = useState(true);
  const [rol, setRol] = useState('');
  const [fechaDesde, setFechaDesde] = useState('12/10/2025');
  const [fechaHasta, setFechaHasta] = useState('18/10/2025');
  const [tipoFecha, setTipoFecha] = useState('FECHA DE ARRIBO');
  const [mostrarResultados, setMostrarResultados] = useState(false);
  
  // Estado para modal de detalles
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<any>(null);
  const [mostrarModalDetalles, setMostrarModalDetalles] = useState(false);

  // Datos mock para los resultados
  const documentosEncontrados = [
    {
      id: '1',
      tipoDocumento: 'C LISTA DE CARGA',
      numero: '84803',
      fechaCreacion: '2025-10-10 11:56:09.0',
      creador: 'ymendez',
      version: '0',
      activo: 'S'
    },
    {
      id: '2',
      tipoDocumento: 'C LISTA DE CARGA',
      numero: '84789',
      fechaCreacion: '2025-10-06 12:46:58.0',
      creador: 'ymendez',
      version: '0',
      activo: 'S'
    },
    {
      id: '3',
      tipoDocumento: 'C LISTA DE CARGA',
      numero: '84817',
      fechaCreacion: '2025-10-16 11:21:30.0',
      creador: 'ymendez',
      version: '0',
      activo: 'S'
    },
    {
      id: '4',
      tipoDocumento: 'C LISTA DE CARGA',
      numero: '84790',
      fechaCreacion: '2025-10-06 15:08:20.0',
      creador: 'ymendez',
      version: '0',
      activo: 'S'
    }
  ];

  // Headers para la tabla de resultados
  const headersDocumentos: Header<any>[] = [
    {
      key: 'tipoDocumento',
      label: 'Tipo Documento',
      sortable: true,
      align: 'center'
    },
    {
      key: 'numero',
      label: 'Número',
      sortable: true,
      align: 'center',
      render: (row: any) => (
        <span className="text-[#006FB3] underline cursor-pointer hover:text-[#005a9c]">
          {row.numero}
        </span>
      )
    },
    {
      key: 'fechaCreacion',
      label: 'Fecha Creación',
      sortable: true,
      align: 'center',
      render: (row: any) => (
        <span>{row.fechaCreacion}</span>
      )
    },
    {
      key: 'creador',
      label: 'Creador',
      sortable: true,
      align: 'center',
      render: (row: any) => (
        <span>{row.creador}</span>
      )
    },
    {
      key: 'version',
      label: 'Versión',
      sortable: true,
      align: 'center',
      render: (row: any) => (
        <span>{row.version}</span>
      )
    },
    {
      key: 'activo',
      label: 'Activo',
      sortable: true,
      align: 'left',
      render: (row: any) => (
        <span>{row.activo}</span>
      )
    },
    {
      key: 'acciones',
      label: 'Acciones',
      sortable: false,
      align: 'center',
      render: (row: any) => (
        <div className="flex items-center justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setDocumentoSeleccionado(row);
              setMostrarModalDetalles(true);
            }}
            className="flex items-center justify-center text-xs px-2 py-1 border-blue-300 text-blue-600 hover:bg-blue-50"
            title="Ver Datos"
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

  // Opciones para los selects
  const opcionesGrupoDocumento = [
    { label: '[Sin Filtro]', value: '' },
    { label: 'Manifiesto', value: 'MANIFIESTO' },
    { label: 'Guía', value: 'GUIA' },
    { label: 'Factura', value: 'FACTURA' },
    { label: 'Packing List', value: 'PACKING_LIST' }
  ];

  const opcionesTipoDocumento = [
    { label: '[Sin Filtro]', value: '' },
    { label: 'MFTOC', value: 'MFTOC' },
    { label: 'GTIME', value: 'GTIME' },
    { label: 'FACTURA_COMERCIAL', value: 'FACTURA_COMERCIAL' },
    { label: 'PACKING_LIST', value: 'PACKING_LIST' }
  ];

  const opcionesTipoLocacion = [
    { label: '[Sin Filtro]', value: '' },
    { label: 'Puerto de Embarque', value: 'PUERTO_EMBARQUE' },
    { label: 'Puerto de Desembarque', value: 'PUERTO_DESEMBARQUE' },
    { label: 'Aeropuerto', value: 'AEROPUERTO' },
    { label: 'Terminal', value: 'TERMINAL' }
  ];

  const opcionesRol = [
    { label: '[Sin Filtro]', value: '' },
    { label: 'Consignante', value: 'CONSIGNANTE' },
    { label: 'Consignatario', value: 'CONSIGNATARIO' },
    { label: 'Transportista', value: 'TRANSPORTISTA' },
    { label: 'Naviera', value: 'NAVIERA' }
  ];

  const opcionesTipoFecha = [
    { label: 'FECHA DE ARRIBO', value: 'FECHA_DE_ARRIBO' },
    { label: 'FECHA DE EMISIÓN', value: 'FECHA_DE_EMISION' },
    { label: 'FECHA DE CREACIÓN', value: 'FECHA_DE_CREACION' },
    { label: 'FECHA DE VENCIMIENTO', value: 'FECHA_DE_VENCIMIENTO' }
  ];

  // Handlers
  const handleBuscar = () => {
    console.log('Buscando documentos...', {
      filtroPor,
      grupoDocumento,
      tipoDocumento,
      numeroReferencia,
      soloActivos,
      usuarioCreador,
      todosUsuarios,
      locacion,
      todasLocaciones,
      tipoLocacion,
      participante,
      todosParticipantes,
      rol,
      fechaDesde,
      fechaHasta,
      tipoFecha
    });
    setMostrarResultados(true);
  };

  const handleVolver = () => {
    setMostrarResultados(false);
  };

  const handleLimpiarUsuario = () => {
    setUsuarioCreador('');
  };

  const handleLimpiarLocacion = () => {
    setLocacion('');
  };

  const handleLimpiarParticipante = () => {
    setParticipante('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-2">Búsqueda de Documentos</h1>
          <div className="mt-2 w-20 h-1 bg-gradient-to-r from-[#006FB3] to-[#FE6565] rounded-full"></div>
        </div>

        {/* Formulario de búsqueda */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {!mostrarResultados ? (
            <>
          {/* Filtrar por */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#111111] mb-4">Filtrar por:</h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="grupo-documento"
                  name="filtro-por"
                  value="grupo-documento"
                  checked={filtroPor === 'grupo-documento'}
                  onChange={(e) => setFiltroPor(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="grupo-documento" className="text-sm font-medium text-[#111111]">
                  Grupo Documento
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="tipo-documento"
                  name="filtro-por"
                  value="tipo-documento"
                  checked={filtroPor === 'tipo-documento'}
                  onChange={(e) => setFiltroPor(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="tipo-documento" className="text-sm font-medium text-[#111111]">
                  Tipo Documento
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="todos"
                  name="filtro-por"
                  value="todos"
                  checked={filtroPor === 'todos'}
                  onChange={(e) => setFiltroPor(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="todos" className="text-sm font-medium text-[#111111]">
                  Todos
                </label>
              </div>
            </div>
          </div>

           {/* Campos de filtro */}
           <div className="space-y-6">
             {/* Primera fila: Documentos */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="flex flex-col">
                 <label className="text-sm font-medium text-[#111111] mb-2 text-left">Grupo Documento:</label>
                 <Select
                   options={opcionesGrupoDocumento}
                   value={grupoDocumento}
                   onChange={setGrupoDocumento}
                   placeholder="[Sin Filtro]"
                   className="w-full"
                 />
               </div>
               <div className="flex flex-col">
                 <label className="text-sm font-medium text-[#111111] mb-2 text-left">Tipo Documento:</label>
                 <Select
                   options={opcionesTipoDocumento}
                   value={tipoDocumento}
                   onChange={setTipoDocumento}
                   placeholder="[Sin Filtro]"
                   className="w-full"
                 />
               </div>
               <div className="flex flex-col">
                 <label className="text-sm font-medium text-[#111111] mb-2 text-left">Número Referencia:</label>
                 <input
                   type="text"
                   value={numeroReferencia}
                   onChange={(e) => setNumeroReferencia(e.target.value)}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FB3] focus:border-transparent"
                   placeholder="Ingrese número de referencia"
                 />
               </div>
             </div>

             {/* Segunda fila: Usuario */}
             <div className="flex flex-col gap-4">
               <div className="flex flex-col">
                 <label className="text-sm font-medium text-[#111111] mb-2 text-left">Usuario Creador:</label>
                 <div className="flex items-center gap-4">
                   <SearchInput
                     value={usuarioCreador}
                     onChange={setUsuarioCreador}
                     placeholder="Ingrese usuario"
                     className="flex-1"
                     onSearch={() => console.log('Buscar usuario')}
                     onClear={handleLimpiarUsuario}
                   />
                   <div className="flex items-center gap-4">
                     <Checkbox
                       id="solo-activos"
                       label="Sólo Activos"
                       checked={soloActivos}
                       onChange={setSoloActivos}
                     />
                     <Checkbox
                       id="todos-usuarios"
                       label="Todos"
                       checked={todosUsuarios}
                       onChange={setTodosUsuarios}
                     />
                   </div>
                 </div>
               </div>
             </div>

             {/* Tercera fila: Locación */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="flex flex-col">
                 <label className="text-sm font-medium text-[#111111] mb-2 text-left">Locación:</label>
                 <div className="flex items-center gap-2">
                   <SearchInput
                     value={locacion}
                     onChange={setLocacion}
                     placeholder="Ingrese locación"
                     className="flex-1"
                     onSearch={() => console.log('Buscar locación')}
                     onClear={handleLimpiarLocacion}
                   />
                   <Checkbox
                     id="todas-locaciones"
                     label="Todas"
                     checked={todasLocaciones}
                     onChange={setTodasLocaciones}
                   />
                 </div>
               </div>
               <div className="flex flex-col">
                 <label className="text-sm font-medium text-[#111111] mb-2 text-left">Tipo Locación:</label>
                 <Select
                   options={opcionesTipoLocacion}
                   value={tipoLocacion}
                   onChange={setTipoLocacion}
                   placeholder="[Sin Filtro]"
                   className="w-full"
                 />
               </div>
             </div>

             {/* Cuarta fila: Participante */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="flex flex-col">
                 <label className="text-sm font-medium text-[#111111] mb-2 text-left">Participante:</label>
                 <div className="flex items-center gap-2">
                   <SearchInput
                     value={participante}
                     onChange={setParticipante}
                     placeholder="Ingrese participante"
                     className="flex-1"
                     onSearch={() => console.log('Buscar participante')}
                     onClear={handleLimpiarParticipante}
                   />
                   <Checkbox
                     id="todos-participantes"
                     label="Todos"
                     checked={todosParticipantes}
                     onChange={setTodosParticipantes}
                   />
                 </div>
               </div>
               <div className="flex flex-col">
                 <label className="text-sm font-medium text-[#111111] mb-2 text-left">Rol:</label>
                 <Select
                   options={opcionesRol}
                   value={rol}
                   onChange={setRol}
                   placeholder="[Sin Filtro]"
                   className="w-full"
                 />
               </div>
             </div>

             {/* Quinta fila: Fechas */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="flex flex-col">
                 <label className="text-sm font-medium text-[#111111] mb-2 text-left">Desde:</label>
                 <DatePicker
                   value={fechaDesde}
                   onChange={setFechaDesde}
                   placeholder="dd/MM/yyyy"
                   className="w-full"
                 />
               </div>
               <div className="flex flex-col">
                 <label className="text-sm font-medium text-[#111111] mb-2 text-left">Hasta:</label>
                 <DatePicker
                   value={fechaHasta}
                   onChange={setFechaHasta}
                   placeholder="dd/MM/yyyy"
                   className="w-full"
                 />
               </div>
               <div className="flex flex-col">
                 <label className="text-sm font-medium text-[#111111] mb-2 text-left">Tipo Fecha:</label>
                 <Select
                   options={opcionesTipoFecha}
                   value={tipoFecha}
                   onChange={setTipoFecha}
                   placeholder="Seleccionar tipo"
                   className="w-full"
                 />
               </div>
             </div>
           </div>

          {/* Botón de búsqueda */}
          <div className="flex justify-end mt-8">
            <Button
              onClick={handleBuscar}
              className="bg-[#006FB3] hover:bg-[#005a9c] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
            >
              Buscar
            </Button>
          </div>

            </>
          ) : (
            <>
              {/* Botón Volver */}
              <div className="flex justify-start mb-6">
                <Button
                  onClick={handleVolver}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                >
                  ← Volver
                </Button>
              </div>

              {/* Tabla de resultados */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#111111] text-left">
                      Documentos encontrados: {documentosEncontrados.length}
                    </h2>
                    <Button
                      onClick={() => console.log('Export XML')}
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
                      headers={headersDocumentos}
                      data={documentosEncontrados}
                      pageSize={5}
                      showPagination={true}
                      paginationSize="sm"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal de Detalles */}
      <DetallesDocumentoModal
        documento={documentoSeleccionado}
        isOpen={mostrarModalDetalles}
        onClose={() => {
          setMostrarModalDetalles(false);
          setDocumentoSeleccionado(null);
        }}
      />
    </div>
  );
};

export default BusquedaDocumentosPage;
