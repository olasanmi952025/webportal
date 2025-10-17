
import * as React from "react"
import { cn } from "../../../utils"
import type { SelectProps } from "./select.types"


const Select = ({
  id,
  ariaLabel,
  options,
  placeholder = "Selecciona un elemento",
  value,
  onChange,
  searchable = false,
  hasError = false,
  variant = "default",
  className,
}: SelectProps) => {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const selected = options.find((opt) => opt.value === value)

  const filtered = searchable
    ? options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    )
    : options

  const handleSelect = (val: string) => {
    onChange?.(val)
    setOpen(false)
    setSearch("")
  }

  const variantStyles = {
    default: "border border-gray-300 bg-white",
    outlined: "border-2 border-gray-400 bg-white",
    shadow: "bg-white shadow-md",
  }

  return (
    <div className={`relative ${className}`}>
      <button
        id={id}
        key={id}
        type="button"
        aria-label={ariaLabel}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm",
          variantStyles[variant],
          hasError && "bg-red-100 border-red-200"
        )}
      >
        {selected ? (
          <span>{selected.label}</span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        {!open ? (

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        )}

      </button>

      {open && (
        <div className="absolute mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg z-10">
          {/* Search input */}
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar..."
                className="w-full px-2 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-blue-400 focus:ring-offset-2 focus:ring-1 focus:border-0"
              />
            </div>
          )}

          <ul className="max-h-60 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    "px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm",
                    value === opt.value && "bg-gray-100 font-medium"
                  )}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-400 text-sm">
                No se encontraron resultados
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Select;
