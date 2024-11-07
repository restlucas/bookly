export const formatTime = (value) => {
  const sanitizedValue = String(value).replace(/\D/g, '').padStart(4, '0') // Remove caracteres não numéricos e completa com zeros à esquerda
  return sanitizedValue.replace(/(\d{2})(\d{2})/, '$1:$2') // Formata como "00:00"
}

export const formatCurrency = (inputValue: string) => {
  const numericValue = inputValue.replace(/\D/g, '')
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseFloat(numericValue) / 100)
}

export const formatPhone = (value: string) => {
  const numericValue = value.replace(/\D/g, '')

  if (numericValue.length <= 10) {
    return numericValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  } else {
    return numericValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
}
