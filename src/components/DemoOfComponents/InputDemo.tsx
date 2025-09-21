import InputField from "../InputField";
import { useState } from "react";
const InputDemo = () => {
const [formData, setFormData] = useState({
    basic: '',
    email: 'user@example.com',
    password: '',
    disabled: 'Cannot edit this',
    error: 'invalid@email',
    loading: 'Processing...',
  });

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="container mx-auto p-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Flexible Input Components
          </h1>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 shadow-sm'
            }`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Variants */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Variants
            </h2>
            <div className="space-y-6">
              <InputField
                label="Outlined (Default)"
                placeholder="Enter text..."
                value={formData.basic}
                onChange={handleInputChange('basic')}
                variant="outlined"
                theme={theme}
                showClear
              />
              <InputField
                label="Filled"
                placeholder="Enter text..."
                value={formData.email}
                onChange={handleInputChange('email')}
                variant="filled"
                theme={theme}
                showClear
              />
              <InputField
                label="Ghost"
                placeholder="Enter text..."
                value={formData.password}
                onChange={handleInputChange('password')}
                variant="ghost"
                theme={theme}
              />
            </div>
          </div>

          {/* Sizes */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Sizes
            </h2>
            <div className="space-y-6">
              <InputField
                label="Small"
                placeholder="Small input..."
                size="sm"
                theme={theme}
              />
              <InputField
                label="Medium (Default)"
                placeholder="Medium input..."
                size="md"
                theme={theme}
              />
              <InputField
                label="Large"
                placeholder="Large input..."
                size="lg"
                theme={theme}
              />
            </div>
          </div>

          {/* States */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              States
            </h2>
            <div className="space-y-6">
              <InputField
                label="Normal"
                placeholder="Normal state..."
                helperText="This is a helper text"
                theme={theme}
              />
              <InputField
                label="Disabled"
                placeholder="Disabled state..."
                value={formData.disabled}
                disabled
                helperText="This field is disabled"
                theme={theme}
              />
              <InputField
                label="Error"
                placeholder="Error state..."
                value={formData.error}
                onChange={handleInputChange('error')}
                invalid
                errorMessage="Please enter a valid email address"
                theme={theme}
              />
              <InputField
                label="Loading"
                placeholder="Loading state..."
                value={formData.loading}
                onChange={handleInputChange('loading')}
                loading
                helperText="Processing your request..."
                theme={theme}
              />
            </div>
          </div>

          {/* Special Features */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Special Features
            </h2>
            <div className="space-y-6">
              <InputField
                label="Email with Clear Button"
                type="email"
                placeholder="Enter email..."
                value={formData.email}
                onChange={handleInputChange('email')}
                showClear
                helperText="Click X to clear the field"
                theme={theme}
              />
              <InputField
                label="Password Toggle"
                placeholder="Enter password..."
                value={formData.password}
                onChange={handleInputChange('password')}
                showPasswordToggle
                helperText="Click eye icon to toggle visibility"
                theme={theme}
              />
              <InputField
                label="Required Field"
                placeholder="This field is required..."
                required
                helperText="Required fields are marked with *"
                theme={theme}
              />
              <InputField
                label="With Max Length"
                placeholder="Max 20 characters..."
                maxLength={20}
                helperText={`${formData.basic.length}/20 characters`}
                value={formData.basic}
                onChange={handleInputChange('basic')}
                theme={theme}
              />
            </div>
          </div>
        </div>

        <div className={`mt-8 p-6 rounded-xl border ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Form Example
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="First Name"
              placeholder="John"
              required
              theme={theme}
            
            />
            <InputField
              label="Last Name"
              placeholder="Doe"
              required
              theme={theme}
              
            />
            <InputField
              label="Email Address"
              type="email"
              placeholder="john.doe@example.com"
              required
              showClear
              theme={theme}
            />
            <InputField
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              theme={theme}
            />
            <InputField
              label="Password"
              placeholder="Enter secure password"
              showPasswordToggle
              required
              theme={theme}
            />
            <InputField
              label="Confirm Password"
              placeholder="Confirm password"
              showPasswordToggle
              required
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputDemo