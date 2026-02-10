export const formatCurrency = (value: number | string) => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) return '₲ 0';

    return '₲ ' + new Intl.NumberFormat('es-PY', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numberValue);
};
