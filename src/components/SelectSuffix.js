import Select from 'react-select'

export const SelectSuffix = ({ value, onChange, error }) => {

    const options = [
        { value: '', label: 'N/A' },
        { value: 'Jr', label: 'Jr' },
        { value: 'Sr', label: 'Sr' },
        { value: 'I', label: 'I' },
        { value: 'II', label: 'II' },
        { value: 'III', label: 'III' },
        { value: 'IV', label: 'IV' },
        { value: 'V', label: 'V' },
        { value: 'JR III', label: 'JR III' }

    ];

    const selectStyle = {
        control: (provided, state) => ({
            ...provided,
            border: error ? '1px solid #ef4444' : state.isFocused ? '1px solid #ffffff' : '1px solid #d1d5db',
            outline: error ? '3px solid #fecaca' : 'none',
            boxShadow: state.isFocused ? '0 0 0 2px #6b7280' : 'none',
            borderRadius: '0.5rem',
            backgroundColor: '#f9fafb',
            fontSize: '0.875rem',
            height: '1.8rem',
            minHeight: '1.8rem',
            '&:hover': {
                border: error ? '1px solid #f05252' : '1px solid #d1d5db',
            }
        }),
        input: (base) => ({
            ...base,
            "input[type='text']:focus": { boxShadow: 'none' },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: error ? '#ef4444' : '#6b7280',
            fontSize: '0.875rem',
            marginBottom: '0.55rem'
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '0.5rem',
            marginTop: '0.25rem',
            backgroundColor: '#f9fafb',
            padding: '0.25rem 0'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#e5e7eb' : (state.isFocused ? '#f3f4f6' : 'white'),
            color: '#1f2937',
            fontSize: '0.875rem',
            padding: '0.1rem 1rem',
            margin: '0.2rem 0',
            borderRadius: '0.5rem',
            boxSizing: 'border-box'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#1f2937',
            marginBottom: '0.55rem'
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
            marginBottom: '0.55rem',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            outline: 'none',
            boxShadow: 'none',
            paddingTop: '0',
            transform: 'translateY(0)',
        }),
    };

    return (
        <div>
            <Select
                id="suffix"
                name="suffix"
                options={options}
                value={options.find(option => option.value === value)}
                onChange={selectedOption => onChange({ target: { name: 'suffix', value: selectedOption.value } })}
                className={`${error ? 'border-red-500' : 'border-gray-200'} react-select-container`}
                classNamePrefix="select"
                placeholder="Select"
                styles={selectStyle}
            />
        </div>
    )
}
