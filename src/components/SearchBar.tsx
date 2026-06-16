import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

/**
 * Trazabilidad REQ-F05:
 * Filtro de consulta del inventario por codigo, nombre o categoria del producto.
 */
export const SearchBar = ({
  onSearch,
  placeholder = "Buscar por código, nombre, categoría...",
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 pl-11 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
        />
        <span className="absolute left-3 text-slate-500">
          <Search className="h-5 w-5" />
        </span>
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 rounded-full p-1 text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
            title="Limpiar búsqueda"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
