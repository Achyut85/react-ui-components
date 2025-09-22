import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import type { Column } from './DataTable.types';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Shows loading state',
    },
    selectable: {
      control: 'boolean',
      description: 'Enable row selection',
    },
    data: {
      control: 'object',
      description: 'Table data array',
    },
    columns: {
      control: false, // Disable control for columns to avoid type issues
      description: 'Column definitions',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', joinDate: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active', joinDate: '2023-04-05' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active', joinDate: '2023-05-12' },
];

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { key: 'status', title: 'Status', dataIndex: 'status', sortable: true },
  { key: 'joinDate', title: 'Join Date', dataIndex: 'joinDate', sortable: true },
];

// ✅ Default DataTable with configurable data
export const Default: Story = {
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    
    return (
      <div className="p-6">
        <DataTable<User>
          {...args}
          columns={columns} // Keep columns fixed to avoid type issues
          onRowSelect={setSelectedRows}
        />
        {selectedRows.length > 0 && (
          <div className="mt-4 text-blue-700">
            Selected: {selectedRows.map(r => r.name).join(', ')}
          </div>
        )}
      </div>
    );
  },
  args: {
    data: sampleData,
    loading: false,
    selectable: true,
  },
};

// ✅ Loading state
export const Loading: Story = {
  render: (args) => <DataTable<User> {...args} columns={columns} />,
  args: {
    data: sampleData,
    loading: true,
  },
};

// ✅ Empty state
export const Empty: Story = {
  render: (args) => <DataTable<User> {...args} columns={columns} />,
  args: {
    data: [],
    loading: false,
  },
};

// ✅ Large Dataset
export const LargeDataset: Story = {
  render: (args) => <DataTable<User> {...args} columns={columns} />,
  args: {
    data: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'Editor', 'Viewer'][i % 3],
      status: ['Active', 'Inactive'][i % 2],
      joinDate: `2023-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    })),
    loading: false,
    selectable: true,
  },
};

// ✅ Non-selectable
export const NonSelectable: Story = {
  render: (args) => <DataTable<User> {...args} columns={columns} />,
  args: {
    data: sampleData,
    loading: false,
    selectable: false,
  },
};