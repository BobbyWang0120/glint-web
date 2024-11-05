'use client'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  id: string
  name: string
  label: string
  value?: string
  options: Option[]
  disabled?: boolean
  required?: boolean
  onChange?: (value: string) => void
  className?: string
}

export default function Select({
  id,
  name,
  label,
  value = '',
  options,
  disabled = false,
  required = false,
  onChange,
  className = '',
}: SelectProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <select
          id={id}
          name={name}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          disabled={disabled}
          required={required}
          className={`
            appearance-none
            block w-full
            px-4 py-3
            bg-white
            border border-gray-300
            rounded-lg
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-black
            focus:border-black
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map(option => (
            <option 
              key={option.value} 
              value={option.value}
              className="py-2"
            >
              {option.label}
            </option>
          ))}
        </select>
        {/* Custom arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  )
} 