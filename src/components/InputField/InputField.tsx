import type { InputFieldProps } from "./InputField.types"
import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
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
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const isPassword = type === 'password' || showPasswordToggle;
    const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const hasError = invalid || !!errorMessage;
    const hasValue = value && value.length > 0;

    // Theme classes
    const themeClasses = {
        light: {
            container: 'text-gray-900',
            label: 'text-gray-700',
            input: 'text-gray-900 placeholder-gray-400',
            helperText: 'text-gray-600',
            errorText: 'text-red-600',
            icon: 'text-gray-400 hover:text-gray-600',
        },
        dark: {
            container: 'text-white',
            label: 'text-gray-200',
            input: 'text-white placeholder-gray-400',
            helperText: 'text-gray-300',
            errorText: 'text-red-400',
            icon: 'text-gray-400 hover:text-gray-200',
        }
    };

    // Size classes
    const sizeClasses = {
        sm: {
            container: 'text-sm',
            input: 'h-8 px-3 text-sm',
            label: 'text-xs mb-1',
            icon: 'w-4 h-4',
            helperText: 'text-xs mt-1',
        },
        md: {
            container: 'text-base',
            input: 'h-10 px-3 text-sm',
            label: 'text-sm mb-1.5',
            icon: 'w-4 h-4',
            helperText: 'text-sm mt-1.5',
        },
        lg: {
            container: 'text-lg',
            input: 'h-12 px-4 text-base',
            label: 'text-base mb-2',
            icon: 'w-5 h-5',
            helperText: 'text-sm mt-2',
        }
    };

    // Variant classes
    const getVariantClasses = () => {
        const baseClasses = 'w-full border transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0';

        if (disabled) {
            return `${baseClasses} ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-400'} cursor-not-allowed`;
        }

        const focusRing = hasError ? 'focus:ring-red-200' : 'focus:ring-blue-200';

        switch (variant) {
            case 'filled':
                return `${baseClasses} ${focusRing} ${theme === 'dark'
                    ? `bg-gray-800 border-gray-700 ${hasError ? 'border-red-500' : isFocused ? 'border-blue-400' : 'border-gray-700'} hover:border-gray-600`
                    : `bg-gray-50 border-gray-200 ${hasError ? 'border-red-500' : isFocused ? 'border-blue-500' : 'border-gray-200'} hover:border-gray-300`
                    }`;

            case 'ghost':
                return `${baseClasses} ${focusRing} ${theme === 'dark'
                    ? `bg-transparent border-transparent ${hasError ? 'border-red-500' : isFocused ? 'border-gray-600 bg-gray-800/50' : 'hover:bg-gray-800/50'}`
                    : `bg-transparent border-transparent ${hasError ? 'border-red-500' : isFocused ? 'border-gray-200 bg-gray-50' : 'hover:bg-gray-50'}`
                    }`;

            default: // outlined
                return `${baseClasses} ${focusRing} ${theme === 'dark'
                    ? `bg-transparent border-gray-600 ${hasError ? 'border-red-500' : isFocused ? 'border-blue-400' : 'border-gray-600'} hover:border-gray-500`
                    : `bg-white border-gray-300 ${hasError ? 'border-red-500' : isFocused ? 'border-blue-500' : 'border-gray-300'} hover:border-gray-400`
                    }`;
        }
    };

    const handleClear = () => {
        if (onChange) {
            const syntheticEvent = {
                target: { value: '' }
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const currentTheme = themeClasses[theme];
    const currentSize = sizeClasses[size];

    return (
        <div className={`${currentSize.container} ${currentTheme.container} ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className={`block font-medium ${currentSize.label} ${currentTheme.label} ${disabled ? 'opacity-50' : ''}`}
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
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`${getVariantClasses()} ${currentSize.input} ${currentTheme.input} ${(showClear && hasValue) || showPasswordToggle || loading ? 'pr-10' : ''
                        } ${(showClear && hasValue) && (showPasswordToggle || loading) ? 'pr-16' : ''
                        }`}
                    {...props}
                />

                {/* Icons container */}
                {((showClear && hasValue) || showPasswordToggle || loading) && (
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        {loading && (
                            <Loader2
                                className={`${currentSize.icon} ${currentTheme.icon} animate-spin mr-3`}
                            />
                        )}

                        {showClear && hasValue && !disabled && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className={`${currentSize.icon} ${currentTheme.icon} ${theme === 'dark'? "hover:text-gray-100" : "hover:text-gray-700"} rounded p-0.5 mr-2 transition-colors`}
                                tabIndex={-1}
                            >
                                <X className={currentSize.icon} />
                            </button>
                        )}

                        {showPasswordToggle && (
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className={`${currentSize.icon} ${currentTheme.icon} ${theme === 'dark'? "hover:text-gray-100" : "hover:text-gray-700"}rounded p-0.5 mr-3 transition-colors`}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff className={currentSize.icon} /> : <Eye className={currentSize.icon} />}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Helper text or error message */}
            
            {(helperText || errorMessage) && (
                <div className={`${currentSize.helperText} ${hasError ? currentTheme.errorText : currentTheme.helperText} ${disabled ? 'opacity-50' : ''}`}>
                    {hasError ? errorMessage : helperText}
                </div>
            )}
        </div>
    );
});
InputField.displayName = 'InputField';


export default InputField