import  { useState, useMemo ,  type ReactElement } from 'react';
import type { DataTableProps, SortConfig } from './DataTable.types';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import { DataTableHeader } from './DataTableHeader';
import { DataTableBody } from './DataTableBody';

export function DataTable<T extends Record<string, any>>({ data, columns, loading = false, selectable = false, onRowSelect }: DataTableProps<T>): ReactElement {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: null });
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const dataWithIds = useMemo(() => data.map((item, index) => ({ ...item, __rowId: index })), [data]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return dataWithIds;
    const column = columns.find(col => col.key === sortConfig.key);
    if (!column || !column.sortable) return dataWithIds;

    return [...dataWithIds].sort((a, b) => {
      const aValue = a[column.dataIndex ?? ''];
      const bValue = b[column.dataIndex ?? ''];
      if (aValue === bValue) return 0;

      let comparison = 0;
      if (typeof aValue === 'string' && typeof bValue === 'string') comparison = aValue.localeCompare(bValue);
      else if (typeof aValue === 'number' && typeof bValue === 'number') comparison = aValue - bValue;
      else comparison = String(aValue).localeCompare(String(bValue));

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [dataWithIds, sortConfig, columns]);

  const handleSort = (column: typeof columns[number]) => {
    if (!column.sortable) return;
    let newDirection: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === column.key) {
      if (sortConfig.direction === 'asc') newDirection = 'desc';
      else if (sortConfig.direction === 'desc') newDirection = null;
    }
    setSortConfig({ key: newDirection ? column.key : '', direction: newDirection });
  };

  const handleRowSelect = (rowId: number, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) newSelectedRows.add(rowId);
    else newSelectedRows.delete(rowId);
    setSelectedRows(newSelectedRows);
    onRowSelect?.(Array.from(newSelectedRows).map(id => data[id]));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(dataWithIds.map((_, index) => index));
      setSelectedRows(allIds);
      onRowSelect?.(data);
    } else {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    }
  };

  const isAllSelected = selectedRows.size === data.length && data.length > 0;
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < data.length;

  if (loading) return <div className="w-full bg-white rounded-lg border border-gray-200"><LoadingSpinner /></div>;
  if (data.length === 0) return <div className="w-full bg-white rounded-lg border border-gray-200"><EmptyState /></div>;

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <DataTableHeader
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort}
            selectable={selectable}
            isAllSelected={isAllSelected}
            isIndeterminate={isIndeterminate}
            onSelectAll={handleSelectAll}
          />
          <DataTableBody
            data={sortedData}
            columns={columns}
            selectable={selectable}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
          />
        </table>
      </div>
    </div>
  );
}
