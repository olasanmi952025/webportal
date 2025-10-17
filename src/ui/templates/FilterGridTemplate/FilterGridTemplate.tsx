import { useState } from "react";
import { Search, Calendar, X, FileText } from "lucide-react";
import { DataTable } from "../../organism/DataTable";
import { Select } from "../../atoms/Select";
import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";
import { SearchInput } from "../../molecule";
import clsx from "clsx";
import type { FilterField, FilterValues, SearchTableTemplateProps } from ".";


function SearchTableTemplate<T extends Record<string, unknown>>({
  title = "",
  subtitle,
  filterFields,
  onFiltersChange,
  onSearch,
  onClearFilters,
  headers,
  data,
  loading = false,
  error = null,
  actions,
  showResults = true,
  resultsInfo,
}: SearchTableTemplateProps<T>) {
  const [filters, setFilters] = useState<FilterValues>({});
  const [searchValue, setSearchValue] = useState("");


  const handleFilterChange = (key: string, value: string | { start: string; end: string }) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClear = () => {
    setFilters({});
    setSearchValue("");
    onClearFilters();
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // Aquí puedes agregar lógica adicional para la búsqueda principal
    alert(`Buscando por el valor: ${value}`);
  };

  const handleSearchClear = () => {
    setSearchValue("");
  };


  const renderFilterField = (field: FilterField) => {
    const dateRange = filters[field.key] as { start: string; end: string } || { start: "", end: "" };

    switch (field.type) {
      case "select":
        return (
          <Select
            id={field.key}
            ariaLabel={field.key}
            placeholder={field.placeholder}
            searchable={field.searchable}
            options={field.options || []}
            key={field.key}
            value={filters[field.key] as string || ""}
            onChange={(value) => handleFilterChange(field.key, value)}
            hasError={field.showError}

          />
        );

      case "date":
        return (
          <div key={field.key} className="relative">
            <input
              aria-label={field.key}
              id={field.key}
              type="date"
              value={filters[field.key] as string || ""}
              onChange={(e) => handleFilterChange(field.key, e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        );

      case "daterange":
        return (
          <div key={field.key} className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              aria-label={field.key}
              id={field.key}
              type="date"
              value={dateRange.start}
              onChange={(e) => handleFilterChange(field.key, { ...dateRange, start: e.target.value })}
              className={clsx("px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm",
                field.showError && "bg-red-100 border-red-200")}
            />
            <input
              aria-label={field.key}
              type="date"
              value={dateRange.end}
              onChange={(e) => handleFilterChange(field.key, { ...dateRange, end: e.target.value })}
              className={clsx("px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm",
                field.showError && "bg-red-100 border-red-200")}
            />
          </div>
        );

      case "search":
        return (
          <SearchInput
            key={field.key}
            value={filters[field.key] as string || ""}
            onChange={(value) => handleFilterChange(field.key, value)}
            onSearch={(value) => handleFilterChange(field.key, value)}
            onClear={() => handleFilterChange(field.key, "")}
            placeholder={field.placeholder || "Buscar..."}
            hasError={field.showError}
            searchButtonText="Buscar"
            showSearchButton={true}
            showClearButton={true}
            searchButtonVariant="primary"
            searchButtonSize="md"
            externalButton={false}
          />
        );

      default:
        return (

          <Input
            aria-label={field.key}
            id={field.key}
            key={field.key}
            type="text"
            value={filters[field.key] as string || ""}
            onChange={(e) => handleFilterChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            hasError={field.showError}
          />


        );
    }
  };


  return (
    <section className="space-y-6">
      {/**Seccion de busqueda principal */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Búsqueda Principal</h2>
          </div>
          
          <div className="max-w-md">
            <SearchInput
              value={searchValue}
              onChange={setSearchValue}
              onSearch={handleSearch}
              onClear={handleSearchClear}
              placeholder="Buscar en todos los campos..."
              searchButtonText="Buscar"
              externalButton={true}
              showClearButton={true}
              showSearchButton={true}
              searchButtonVariant="outline"
              searchButtonSize="md"
              internalButtonVariant={"outline"}
              internalButtonSize={"md"}
              searchButtonClassName="text-primary rounded-md hover:bg-dark-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium flex items-center gap-2"
              clearButtonClassName="text-warning border-warning hover:bg-red-500 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium flex items-center gap-2"
            />
          </div>
        </div>
      </div>

      {/* Sección de Filtros */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>

          {subtitle && (
            <p className="text-sm text-gray-600 mb-6">{subtitle}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {filterFields && filterFields.map((field) => (
              <div key={field.key} className="space-y-1">
                <Label htmlFor={field.key} required={field.required} >
                  {field.label}
                </Label>
                {renderFilterField(field)}
                {field.showError && <p className="ml-1 text-xs text-red-400">{field.error}</p>}

              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onSearch}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-dark-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Search size={16} />
              Buscar
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-2 bg-white text-black border border-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <X size={16} />
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {showResults && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="hidden md:block text-green-600" size={20} />
                <h3 className="text-sm md:text-lg  font-semibold text-gray-900">Resultado de la Búsqueda</h3>
              </div>
              {resultsInfo && (
                <span className="text-xs text-gray-600">{resultsInfo}</span>
              )}
            </div>

            <DataTable
              headers={headers}
              data={data}
              loading={loading}
              error={error}
              actions={actions}
            />
          </div>
        </div>
      )}
    </section>
  );
}


export default SearchTableTemplate;