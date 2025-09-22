import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';

interface InputFieldProps {
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

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClear = false,
  showPasswordToggle = false,
  theme = 'light',
  className = '',
  id,
  name,
  required = false,
  autoFocus = false,
  maxLength,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const isPassword = type === 'password' || showPasswordToggle;
  const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const hasError = invalid || !!errorMessage;
  const hasValue = !!value;

  // Theme classes
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm h-8 px-3',
    md: 'text-base h-10 px-3', 
    lg: 'text-lg h-12 px-4',
  };

  // Variant classes
  const getVariantClasses = () => {
    const base = 'w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';
    
    if (disabled) {
      return `${base} cursor-not-allowed ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700 text-gray-400' 
          : 'bg-gray-50 border-gray-200 text-gray-400'
      }`;
    }

    const focusRing = hasError ? 'focus:ring-red-300' : 'focus:ring-blue-500';
    
    switch (variant) {
      case 'filled':
        return `${base} ${focusRing} ${
          theme === 'dark' 
            ? `bg-gray-800 border-gray-700 text-white placeholder-gray-400 hover:border-gray-600 ${hasError ? 'border-red-500' : ''}` 
            : `bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 hover:border-gray-300 ${hasError ? 'border-red-500' : ''}`
        }`;
      
      case 'ghost':
        return `${base} ${focusRing} bg-transparent border-transparent ${
          theme === 'dark'
            ? `text-white placeholder-gray-400 hover:bg-gray-800/50 ${hasError ? 'border-red-500' : ''}`
            : `text-gray-900 placeholder-gray-400 hover:bg-gray-50 ${hasError ? 'border-red-500' : ''}`
        }`;
      
      default: // outlined
        return `${base} ${focusRing} ${
          theme === 'dark'
            ? `bg-transparent border-gray-600 text-white placeholder-gray-400 hover:border-gray-500 ${hasError ? 'border-red-500' : ''}`
            : `bg-white border-gray-300 text-gray-900 placeholder-gray-400 hover:border-gray-400 ${hasError ? 'border-red-500' : ''}`
        }`;
    }
  };

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Remove the theme classes object and currentSize references

  return (
    <div className={className}>
      {label && (
        <label 
          htmlFor={inputId}
          className={`block font-medium mb-1 ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          } ${disabled ? 'opacity-50' : ''}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          maxLength={maxLength}
        
          className={`${getVariantClasses()} ${sizeClasses[size]} ${
            (showClear && hasValue) || showPasswordToggle || loading ? 'pr-10' : ''
          } ${
            (showClear && hasValue) && (showPasswordToggle || loading) ? 'pr-16' : ''
          }`}
          {...props}
        />
        
        {/* Icons container */}
        {((showClear && hasValue) || showPasswordToggle || loading) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
            {loading && (
              <Loader2 className="animate-spin w-4 h-4 text-gray-500" />
            )}
            
            {showClear && hasValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className={`text-gray-400 rounded p-1 transition-colors ${
                  theme === 'dark' 
                    ? 'hover:text-gray-100 hover:bg-gray-700' 
                    : 'hover:text-gray-700 hover:bg-gray-100'
                }`}
                tabIndex={-1}
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            {showPasswordToggle && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={`text-gray-400 rounded p-1 transition-colors ${
                  theme === 'dark' 
                    ? 'hover:text-gray-100 hover:bg-gray-700' 
                    : 'hover:text-gray-700 hover:bg-gray-100'
                }`}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <p className={`mt-1 text-sm ${
          hasError 
            ? 'text-red-500' 
            : theme === 'dark' 
              ? 'text-gray-300' 
              : 'text-gray-600'
        } ${disabled ? 'opacity-50' : ''}`}>
          {hasError ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;