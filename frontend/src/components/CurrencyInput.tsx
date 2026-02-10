import { useState, useEffect } from 'react';

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string | number;
    onValueChange: (value: string) => void;
}

export default function CurrencyInput({ value, onValueChange, className, ...props }: CurrencyInputProps) {
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        if (value === '' || value === undefined || value === null) {
            setDisplayValue('');
            return;
        }
        // Format initial value
        const num = Number(value);
        if (!isNaN(num)) {
            setDisplayValue(new Intl.NumberFormat('es-PY').format(num));
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove all non-digits
        const rawValue = e.target.value.replace(/\D/g, '');

        if (rawValue === '') {
            onValueChange('');
            setDisplayValue('');
            return;
        }

        const numericValue = Number(rawValue);
        onValueChange(String(numericValue));

        // Format for display
        setDisplayValue(new Intl.NumberFormat('es-PY').format(numericValue));
    };

    return (
        <input
            {...props}
            type="text"
            value={displayValue}
            onChange={handleChange}
            className={className}
        />
    );
}
