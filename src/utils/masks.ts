export const CURRENCYMask = (value: string) => {
    const parsedValue = parseFloat(value.replace(/\D/g, '')) / 100
    return parsedValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }
  
  export const removeCurrencyMask = (value: string): number => {
    const cleanedValue = value.replace(/\D/g, '');

    const parsedValue = parseFloat(cleanedValue) / 100;

   return parsedValue
};

export const integerMask = (value: string): string  => {
    const cleanedValue = value.replace(/\D/g, '');
  
    if (cleanedValue === '') {
        return '';
    }
  
    return cleanedValue;
  };