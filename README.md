# 🎨 React Component Library

**Focus Area:** UI Components  
**Tech Stack:** React · TypeScript · TailwindCSS · Storybook

This project contains reusable React components with modern patterns, full TypeScript support, and comprehensive Storybook documentation.

## Live Demo
Check out the live Storybook here: [Live Storybook](https://ui-components-hksxf1we2-achyut85s-projects.vercel.app)

## 📦 Components

### 1. InputField

A flexible, fully typed input component with multiple states, sizes, and variants.

#### Features
- Text input with label, placeholder, helper text, and error message
- **States:** disabled, invalid, loading
- **Variants:** filled, outlined, ghost
- **Sizes:** sm, md, lg
- Clear button and password toggle functionality
- Light & dark theme support

#### Props Interface
```typescript
export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: string;
  showClear?: boolean;
  showPasswordToggle?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
}
```

### 2. DataTable

A fully typed, generic data table component with sorting, row selection, and loading states. Built with a modular architecture for maintainability and reusability.

#### Features
- Display tabular data with type safety
- Column sorting functionality
- Row selection (single/multiple)
- Loading state with skeleton UI
- Empty state handling
- Responsive design
- Modular component architecture

#### Component Architecture
- **DataTable.tsx**: Main container component
- **DataTableHeader.tsx**: Handles column headers and sorting logic
- **DataTableRow.tsx**: Individual row component with selection
- **DataTableBody.tsx**: Body container that maps and renders rows
- **LoadingSpinner.tsx**: Reusable loading state component
- **EmptyState.tsx**: Empty state with customizable messaging

#### Props Interface
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}
```

## 📖 Storybook Integration

### InputField Stories

- **Default:** Standard input with label and placeholder
- **Disabled:** Input in disabled state
- **Invalid/Error:** Displays error message and invalid styling
- **Loading:** Shows loading spinner
- **Variants:** filled, outlined, ghost demonstrations
- **Sizes:** sm, md, lg size comparisons
- **Clear Button & Password Toggle:** Interactive optional controls
- **Theme:** Light and Dark theme examples

#### Storybook Controls
| Control              | Type    | Description                                    |
|----------------------|---------|------------------------------------------------|
| `value`              | string  | Current input value                            |
| `placeholder`        | string  | Input placeholder text                         |
| `disabled`           | boolean | Toggle disabled state                          |
| `invalid`            | boolean | Toggle invalid/error state                     |
| `loading`            | boolean | Show/hide loading spinner                      |
| `variant`            | select  | Switch between `filled`, `outlined`, `ghost`  |
| `size`               | select  | Switch between `sm`, `md`, `lg`                |
| `showClear`          | boolean | Enable/disable clear button                    |
| `showPasswordToggle` | boolean | Enable/disable password toggle                 |
| `theme`              | select  | Switch between `light` and `dark`              |

### DataTable Stories

- **Default:** Interactive DataTable with row selection and configurable data
- **Loading:** Shows loading state with skeleton placeholders
- **Empty:** Displays empty state when no data is provided
- **LargeDataset:** Performance testing with 100+ rows
- **NonSelectable:** Table without row selection capabilities

#### Storybook Controls
| Control      | Type    | Description                      |
|--------------|---------|----------------------------------|
| `data`       | object  | Editable array of data rows      |
| `loading`    | boolean | Toggle loading state             |
| `selectable` | boolean | Enable/disable row selection     |

## ⚡ Setup Instructions

### 1. Clone Repository
```bash
git clone <repo-url>
cd react-component-library
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Run Storybook
```bash
npm run storybook
# or
yarn storybook
```

### 4. Run Project in Development
```bash
npm run dev
# or
yarn dev
```

## 🚀 Usage Examples

### InputField
```tsx
import { InputField } from './components/InputField';

function App() {
  const [value, setValue] = useState('');
  
  return (
    <InputField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Email Address"
      placeholder="Enter your email"
      variant="outlined"
      size="md"
    />
  );
}
```

### DataTable
```tsx
import { DataTable } from './components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' }
];

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true }
];

function App() {
  return (
    <DataTable<User>
      data={users}
      columns={columns}
      selectable
      onRowSelect={(rows) => console.log('Selected:', rows)}
    />
  );
}
```

## 🛠 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run storybook` - Run Storybook
- `npm run build-storybook` - Build Storybook for deployment
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Project Structure
```
src/
├── components/
│   ├── InputField/
│   │   ├── InputField.tsx
│   │   ├── InputField.types.ts
│   │   └── InputField.stories.tsx
│   └── DataTable/
│       ├── DataTable.tsx
│       ├── DataTable.types.ts
│       ├── DataTable.stories.tsx
│       ├── DataTableHeader.tsx    # Table headers with sorting
│       ├── DataTableRow.tsx       # Single table row
│       ├── DataTableBody.tsx      # Table body (maps rows)
│       ├── LoadingSpinner.tsx     # Loading state component
│       └── EmptyState.tsx         # Empty state component
└── styles/
    └── globals.css
```
