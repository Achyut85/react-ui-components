import type { Column } from './DataTable.types';
import { DataTableRow } from './DataTableRow';

interface Props<T> {
  data: (T & { __rowId: number })[];
  columns: Column<T>[];
  selectable?: boolean;
  selectedRows?: Set<number>;
  onRowSelect?: (rowId: number, checked: boolean) => void;
}

export function DataTableBody<T>({ data, columns, selectable, selectedRows, onRowSelect }: Props<T>) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((row) => (
        <DataTableRow
          key={row.__rowId}
          row={row}
          columns={columns}
          selectable={selectable}
          isSelected={selectedRows?.has(row.__rowId)}
          onSelectRow={onRowSelect}
        />
      ))}
    </tbody>
  );
}
