export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-PE', {
        style: 'currency',
        currency: 'SOL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}