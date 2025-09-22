import type { Column } from './DataTable.types';

interface Props<T> {
  row: T & { __rowId: number };
  columns: Column<T>[];
  selectable?: boolean;
  isSelected?: boolean;
  onSelectRow?: (rowId: number, checked: boolean) => void;
}

export function DataTableRow<T>({
  row,
  columns,
  selectable,
  isSelected,
  onSelectRow,
}: Props<T>) {
  return (
    <tr className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}>
      {selectable && (
        <td className="w-12 px-4 py-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelectRow?.(row.__rowId, e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </td>
      )}
      {columns.map((col) => (
        <td
          key={`${row.__rowId}-${col.key}`}
          className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
        >
          {col.render
            ? col.render(row)
            : col.dataIndex
            ? String(row[col.dataIndex] ?? '')
            : ''}
        </td>
      ))}
    </tr>
  );
}
