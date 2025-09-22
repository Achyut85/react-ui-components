
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import type { Column, SortConfig } from './DataTable.types';

interface Props<T> {
  columns: Column<T>[];
  sortConfig: SortConfig;
  onSort: (column: Column<T>) => void;
  selectable?: boolean;
  isAllSelected?: boolean;
  isIndeterminate?: boolean;
  onSelectAll?: (checked: boolean) => void;
}

export function DataTableHeader<T>({ columns, sortConfig, onSort, selectable, isAllSelected, isIndeterminate, onSelectAll }: Props<T>) {
  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;
    if (sortConfig.key !== column.key) return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {selectable && (
          <th className="w-12 px-4 py-3">
            <input
              type="checkbox"
              checked={isAllSelected}
              ref={(input) => { if (input) input.indeterminate = !!isIndeterminate; }}
              onChange={(e) => onSelectAll?.(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </th>
        )}
        {columns.map((column) => (
          <th
            key={column.key}
            className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''}`}
            onClick={() => onSort(column)}
            tabIndex={column.sortable ? 0 : undefined}
          >
            <div className="flex items-center space-x-1">
              <span>{column.title}</span>
              {getSortIcon(column)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
