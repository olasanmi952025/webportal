import { useState } from "react";
import { FilterGridTemplate as SearchTableTemplate } from "../FilterGridTemplate";
import type { Header as InHeader } from "../../atoms/Table";
import { Button } from "../../atoms/Button";
import { Icon } from "../../atoms/Icons";
import { Tooltip } from "../../atoms/Tooltip";

interface FilterField {
  key: string;
  label: string;
  type: "text" | "select" | "date" | "daterange";
  options?: { value: string; label: string }[];
  placeholder?: string;
  searchable?: boolean;
  required?: boolean;
  error?: string;
  showError?: boolean;


}

interface FilterValues {
  [key: string]: string | { start: string; end: string };
}

type InMockData = {
  id: string;
  fecha: string;
  tipoDoc: string;
  tipoOperacion: string;
  rutConsignatario: string;
  nombreConsignatario: string;
  aduana: string;
  estado: string;
}




const mockData: InMockData[] = [
  {
    id: "20250004100",
    fecha: "16/08/2023 14:15",
    tipoDoc: "DECLARACIÓN DE INGRESO",
    tipoOperacion: "555-Reexpedición al Extranjero",
    rutConsignatario: "7752468-1",
    nombreConsignatario: "IMP.EXPSUPIER IMPERIAL SPA",
    aduana: "IQUIQUE",
    estado: "LEGALIZADA",
  },
  {
    id: "20250004210",
    fecha: "04/07/2023 18:08",
    tipoDoc: "DECLARACIÓN DE SALIDA",
    tipoOperacion: "555-Mercancía nacional al ext",
    rutConsignatario: "7781270-0",
    nombreConsignatario: "TUANWORLD SUPPLY LTDA",
    aduana: "PUNTA ARENAS",
    estado: "LEGALIZADA",
  },
  {
    id: "20250004301",
    fecha: "21/09/2023 09:30",
    tipoDoc: "DECLARACIÓN DE INGRESO",
    tipoOperacion: "123-Importación definitiva",
    rutConsignatario: "7691234-5",
    nombreConsignatario: "IMPORTACIONES DEL NORTE SPA",
    aduana: "ARICA",
    estado: "EN PROCESO",
  },
  {
    id: "20250004420",
    fecha: "10/10/2023 11:45",
    tipoDoc: "DECLARACIÓN DE SALIDA",
    tipoOperacion: "321-Exportación temporal",
    rutConsignatario: "7612345-6",
    nombreConsignatario: "EXPORTADORA SUR LIMITADA",
    aduana: "VALPARAISO",
    estado: "RECHAZADA",
  },
  {
    id: "20250004530",
    fecha: "05/11/2023 16:20",
    tipoDoc: "DECLARACIÓN DE INGRESO",
    tipoOperacion: "555-Reexpedición al Extranjero",
    rutConsignatario: "7654321-0",
    nombreConsignatario: "COMERCIALIZADORA PACIFICO",
    aduana: "IQUIQUE",
    estado: "LEGALIZADA",
  },
  {
    id: "20250004640",
    fecha: "18/12/2023 08:10",
    tipoDoc: "DECLARACIÓN DE SALIDA",
    tipoOperacion: "555-Mercancía nacional al ext",
    rutConsignatario: "7700000-1",
    nombreConsignatario: "LOGISTICA AUSTRAL SPA",
    aduana: "PUNTA ARENAS",
    estado: "EN PROCESO",
  },
  {
    id: "20250004750",
    fecha: "22/01/2024 13:55",
    tipoDoc: "DECLARACIÓN DE INGRESO",
    tipoOperacion: "123-Importación definitiva",
    rutConsignatario: "7711111-2",
    nombreConsignatario: "REPUESTOS Y PARTES LTDA",
    aduana: "ANTOFAGASTA",
    estado: "LEGALIZADA",
  },
  {
    id: "20250004860",
    fecha: "03/02/2024 17:40",
    tipoDoc: "DECLARACIÓN DE SALIDA",
    tipoOperacion: "321-Exportación temporal",
    rutConsignatario: "7722222-3",
    nombreConsignatario: "AGROEXPORT CHILE",
    aduana: "VALPARAISO",
    estado: "LEGALIZADA",
  },
  {
    id: "20250004970",
    fecha: "15/03/2024 10:25",
    tipoDoc: "DECLARACIÓN DE INGRESO",
    tipoOperacion: "555-Reexpedición al Extranjero",
    rutConsignatario: "7733333-4",
    nombreConsignatario: "INDUSTRIAS DEL SUR S.A.",
    aduana: "ARICA",
    estado: "EN PROCESO",
  },
  {
    id: "20250005080",
    fecha: "28/04/2024 12:00",
    tipoDoc: "DECLARACIÓN DE SALIDA",
    tipoOperacion: "555-Mercancía nacional al ext",
    rutConsignatario: "7744444-5",
    nombreConsignatario: "COMERCIAL ANDINA",
    aduana: "IQUIQUE",
    estado: "LEGALIZADA",
  },
  {
    id: "20250005190",
    fecha: "09/05/2024 15:35",
    tipoDoc: "DECLARACIÓN DE INGRESO",
    tipoOperacion: "123-Importación definitiva",
    rutConsignatario: "7755555-6",
    nombreConsignatario: "DISTRIBUIDORA CENTRAL",
    aduana: "ANTOFAGASTA",
    estado: "RECHAZADA",
  },
  {
    id: "20250005200",
    fecha: "20/06/2024 18:50",
    tipoDoc: "DECLARACIÓN DE SALIDA",
    tipoOperacion: "321-Exportación temporal",
    rutConsignatario: "7766666-7",
    nombreConsignatario: "EXPORTACIONES DEL NORTE",
    aduana: "PUNTA ARENAS",
    estado: "LEGALIZADA",
  },
];


const initialFilterFields: FilterField[] = [
  {
    key: "tipoObjeto",
    label: "Tipo Objeto a buscar",
    required: true,
    type: "select",
    error: "Seleccione un tipo de objeto",
    options: [
      { value: "vehiculo", label: "Vehículo" },
      { value: "persona", label: "Persona" },
      { value: "documento", label: "Documento" },
    ],
  },
  {
    key: "objeto",
    label: "Objeto Seleccionado a Buscar",
    error: "Seleccione un objeto",
    required: true,
    type: "select",
    options: [
      { value: "dui", label: "DUI" },
      { value: "mic", label: "MIC" },
      { value: "crt", label: "CRT" },
    ],
  },
  {
    key: "numeroId",
    label: "Número de Identificación",
    error: "Ingrese un número de identificación",
    type: "text",
    placeholder: "Ingrese número...",
  },
  {
    key: "aduana",
    label: "Aduana Tramitación",
    error: "Seleccione una aduana",
    required: true,
    type: "select",
    options: [
      { value: "arica", label: "Arica" },
      { value: "iquique", label: "Iquique" },
      { value: "antofagasta", label: "Antofagasta" },
      { value: "valparaiso", label: "Valparaíso" },
      { value: "punta_arenas", label: "Punta Arenas" },
      { value: "santiago", label: "Santiago" },
      { value: "talcahuano", label: "Talcahuano" },
      { value: "san_antonio", label: "San Antonio" },
      { value: "osorno", label: "Osorno" },
      { value: "puerto_montt", label: "Puerto Montt" },
      { value: "chillan", label: "Chillán" },
      { value: "copiapo", label: "Copiapó" },
      { value: "coquimbo", label: "Coquimbo" },
      { value: "los_andes", label: "Los Andes" },
      { value: "valdivia", label: "Valdivia" },
    ],
  },
  {
    key: "fechas",
    label: "Fecha Aceptación Inicio - Fin",
    error: "Debe ingresar el dato de rango de fechas para realizar la búsqueda",
    required: true,
    type: "daterange",
  },
];


const FilterGridExample = () => {
  const [filteredData, setFilteredData] = useState<InMockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterFields, setFilterFields] = useState(initialFilterFields);
  const [currentFilterValues, setCurrentFilterValues] = useState<FilterValues>({});


  const tableHeaders: InHeader<InMockData>[] = [
    { key: "id", label: "N° Identificación Documento", sortable: true, render: (row: typeof mockData[0]) => <a target="_blank" href="#" className="text-blue-600 hover:text-blue-800 text-sm underline">{row.id}</a> },
    { key: "fecha", label: "Fecha Aceptación", sortable: true },
    { key: "tipoDoc", label: "Tipo Documento", sortable: true },
    { key: "tipoOperacion", label: "Tipo de Operación", sortable: false },
    { key: "rutConsignatario", label: "Rut Consignatario", sortable: false },
    { key: "nombreConsignatario", label: "Nombre Consignatario", sortable: true },
    { key: "aduana", label: "Aduana Tramitación", sortable: true },
    { key: "estado", label: "Estado", sortable: true },
  ];

  const handleFiltersChange = (filters: FilterValues) => {
    // Se validan los filtros y se actualiza el estado showError en filtersFields
    const newFilterFields = filterFields.map((field) => ({
      ...field,
      showError: filters[field.key] ? false : field.showError,
    }));
    setFilterFields(newFilterFields);
    // Se actualiza el estado currentFilterValues


    setCurrentFilterValues(filters);
    console.log("Filtros actualizados:", filters);
  };

  const handleSearch = () => {
    //Se valida currentFilters value para actualizar el estado showError en filtersFields segun los sioguientes criterios:

    // 1. Si no existe filtro activo en currentFiltres se actualiza el estado showError en filtersFields a true a todos los campos required
    if (Object.keys(currentFilterValues).length === 0) {
      const newFilterFields = filterFields.map((field) => ({
        ...field,
        showError: field.required ? true : false,
      }));
      setFilterFields(newFilterFields);
      return
    }

    //Si existe el objeto numeroId en currentFiltres se actualiza el estado showError en filtersFields a false a todos los campos required, adicional en currentFilterValues solo se mantiene el objeto numeroId
    if (currentFilterValues.numeroId) {
      const newFilterFields = filterFields.map((field) => ({
        ...field,
        showError: false,
      }));
      setFilterFields(newFilterFields);
      setCurrentFilterValues({ numeroId: currentFilterValues.numeroId });
    } else {
      //Si no existe el objeto numeroId en currentFilters, debera existier en currentFilterValues los objetos tipoDoc, objeto, aduana y fechas. De lo contrario se actualiza el estado showError en filtersFields a true a todos los campos required
      const activeFilters = { ...currentFilterValues }

      // Si en filters viene fechas, se pregunta si existe start y end; si no existe alguno se remueve  el campo fecha en currentFilterValues
      if (activeFilters.fechas && typeof activeFilters.fechas === "object") {
        if (!activeFilters.fechas.start || !activeFilters.fechas.end) {
          delete activeFilters.fechas


        }
      }

      // se pregunta si existe el objeto tipoDoc, objeto, aduana y fechas en currentFilterValues si no existe se actualiza el estado showError en filtersFields a true a los campos required faltantes
      if (!activeFilters.tipoObjeto || !activeFilters.objeto || !activeFilters.aduana || !activeFilters.fechas) {
        const missingFields = ["tipoObjeto", "objeto", "aduana", "fechas"].filter((field) => !activeFilters[field]);

        const newFilterFields = filterFields.map((field) => ({
          ...field,
          showError: field.required && missingFields.includes(field.key) ? true : false,
        }));

        setCurrentFilterValues(activeFilters);
        return setFilterFields(newFilterFields);
      }
    }

    setIsLoading(true);
    if (currentFilterValues.numeroId) {
      alert("Busco por el numero de identificación")
      setFilteredData(mockData.filter((item) => item.id === currentFilterValues.numeroId));
    } else {
      alert("Busco por los filtros restantes : " + JSON.stringify(currentFilterValues))
      setFilteredData(mockData.filter((item) => item.estado === "LEGALIZADA"));
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleClearFilters = () => {
    setCurrentFilterValues({});
    setFilterFields(initialFilterFields);
    setFilteredData([]);
  };

  const handleActions = (row: typeof mockData[0]) => (
    <div className="flex bg-red-50 flex-1 mt-2">
      <Button variant="primary" onClick={() => alert(`Redirigo el documento ${row.id} a el formulario de Marcaje Manual`)} size="sm" className="w-full">
        <Tooltip text="Marcar">
          <Icon name="FileCheck" size={16} />
        </Tooltip>
      </Button>

    </div>
  );

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <SearchTableTemplate
          title="Búsqueda Marcaje Manual"
          subtitle="Consulte con parámetros de búsqueda, para esta fase serán documentos de tipo DUI"
          filterFields={filterFields}
          onFiltersChange={handleFiltersChange}
          onSearch={handleSearch}
          onClearFilters={handleClearFilters}
          headers={tableHeaders}
          data={filteredData}
          loading={isLoading}
          actions={handleActions}
          resultsInfo={`${filteredData.length} registros encontrados`}
        />
      </div>
    </div>
  );
}


export default FilterGridExample;