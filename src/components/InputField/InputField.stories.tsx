import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
    title: 'Components/InputField',
    component: InputField,
    tags: ['autodocs'], // Enables automatic prop table generation
    argTypes: {
        variant: { control: 'radio', options: ['outlined', 'filled', 'ghost'], description: 'Visual style of the input' },
        size: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Size of the input field' },
        theme: { control: 'radio', options: ['light', 'dark'], description: 'Light or dark mode styling' },
        type: { control: 'text', description: 'HTML input type' },
        value: { control: 'text', description: 'Input value' },
        placeholder: { control: 'text', description: 'Placeholder text' },
        disabled: { control: 'boolean', description: 'Disable input field' },
        invalid: { control: 'boolean', description: 'Shows input in error state' },
        helperText: { control: 'text', description: 'Helper text under input' },
        errorMessage: { control: 'text', description: 'Error message under input' },
        showClear: { control: 'boolean', description: 'Show clear button' },
        showPasswordToggle: { control: 'boolean', description: 'Show password visibility toggle' },
        loading: { control: 'boolean', description: 'Show loading spinner' },
    },
    parameters: {
        docs: {
            description: {
                component: 'A flexible InputField component supporting labels, helper text, error states, sizes, variants, and dark mode.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof InputField>;

/** ---------------- Default Input ---------------- */
export const Default: Story = {
    render: (args) => (
        <div className={`${args.theme === 'dark' ? 'dark bg-gray-900 p-4' : 'bg-white p-4'}`}>
            <InputField {...args} />
        </div>
    ),
    args: {
        label: 'Name',
        placeholder: 'Enter your name',
        helperText: 'This is a helper text',
        size: 'md',
        variant: 'outlined',
        theme: 'light',
    },
    parameters: {
        docs: { description: { story: 'Default input with label, placeholder, and helper text.' } },
    },
};

/** ---------------- Input with Error ---------------- */
export const ErrorState: Story = {
    args: {
        label: 'Email',
        placeholder: 'Enter your email',
        errorMessage: 'Invalid email address',
        invalid: true,
        size: 'md',
        variant: 'outlined',
        theme: 'light',
        value: '12@g.com',
    },
    parameters: {
        docs: { description: { story: 'Shows error state with a message under the input.' } },
    },
};

/** ---------------- Disabled Input ---------------- */
export const Disabled: Story = {
    args: {
        label: 'Disabled',
        placeholder: 'Cannot type here',
        disabled: true,
        size: 'md',
        variant: 'outlined',
        theme: 'light',
    },
    parameters: {
        docs: { description: { story: 'Disabled input that cannot be edited.' } },
    },
};

/** ---------------- Loading Input ---------------- */
export const Loading: Story = {
    args: {
        label: 'Loading Input',
        placeholder: 'Loading...',
        loading: true,
        size: 'md',
        variant: 'outlined',
        theme: 'light',
    },
    parameters: {
        docs: { description: { story: 'Input field showing a loading spinner.' } },
    },
};

/** ---------------- Input with Clear Button ---------------- */
export const WithClearButton: Story = {
    render: (args) => {
        const [value, setValue] = useState('Some text');
        return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} showClear />;
    },
    args: {
        label: 'Clearable Input',
        placeholder: 'Type something...',
        size: 'md',
        variant: 'outlined',
        theme: 'light',
    },
    parameters: {
        docs: { description: { story: 'Input with a clear button to reset its value.' } },
    },
};

/** ---------------- Password Input ---------------- */
export const PasswordField: Story = {
    render: (args) => {
        const [value, setValue] = useState('');
        return <InputField {...args} type="password" showPasswordToggle value={value} onChange={(e) => setValue(e.target.value)} />;
    },
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        size: 'md',
        variant: 'outlined',
        theme: 'light',
    },
    parameters: {
        docs: { description: { story: 'Password input with visibility toggle.' } },
    },
};

/** ---------------- Input Sizes ---------------- */
export const SmallSize: Story = { args: { label: 'Small', size: 'sm', placeholder: 'Small size', variant: 'outlined' } };
export const MediumSize: Story = { args: { label: 'Medium', size: 'md', placeholder: 'Medium size', variant: 'outlined' } };
export const LargeSize: Story = { args: { label: 'Large', size: 'lg', placeholder: 'Large size', variant: 'outlined' } };

/** ---------------- Input Variants ---------------- */
export const OutlinedVariant: Story = { args: { label: 'Outlined', variant: 'outlined', placeholder: 'Outlined style' } };
export const FilledVariant: Story = { args: { label: 'Filled', variant: 'filled', placeholder: 'Filled style' } };
export const GhostVariant: Story = { args: { label: 'Ghost', variant: 'ghost', placeholder: 'Ghost style' } };

/** ---------------- Dark Mode Example ---------------- */
export const DarkTheme: Story = {
    render: (args) => (
        <div className="dark bg-gray-900 p-4">
            <InputField {...args} theme="dark" />
        </div>
    ),
    args: {
        label: 'Dark Theme',
        placeholder: 'Dark mode input',
        size: 'md',
        variant: 'outlined',
    },
    parameters: {
        docs: { description: { story: 'Input field in dark mode.' } },
    },
};
