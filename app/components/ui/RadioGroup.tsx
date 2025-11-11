"use client"

import React from "react";

interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

interface RadioGroupProps {
  label?: React.ReactNode
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  required?: boolean
  error?: string
}

export default function RadioGroup({ label, options, value, onChange, required = false, error }: RadioGroupProps) {
  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-black">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className={`flex items-center space-x-3 ${option.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              disabled={option.disabled}
              className="w-4 h-4 text-black border-gray-300 focus:ring-black focus:ring-2 disabled:cursor-not-allowed"
            />
            <span className={`text-sm ${option.disabled ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
