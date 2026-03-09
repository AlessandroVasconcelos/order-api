function isInvalidNumber(value) {
  return !Number.isFinite(Number(value));
}

function validateItems(items, errors, { requireAtLeastOne = true } = {}) {
  if (!Array.isArray(items)) {
    errors.push('items deve ser um array.');
    return;
  }

  if (requireAtLeastOne && items.length === 0) {
    errors.push('items deve conter pelo menos 1 item.');
    return;
  }

  items.forEach((item, index) => {
    if (!item.idItem || isInvalidNumber(item.idItem)) {
      errors.push(`items[${index}].idItem deve ser numérico.`);
    }

    if (isInvalidNumber(item.quantidadeItem) || Number(item.quantidadeItem) <= 0) {
      errors.push(`items[${index}].quantidadeItem deve ser maior que zero.`);
    }

    if (isInvalidNumber(item.valorItem) || Number(item.valorItem) < 0) {
      errors.push(`items[${index}].valorItem deve ser maior ou igual a zero.`);
    }
  });
}

function validateCreatePayload(body) {
  const errors = [];

  if (!body.numeroPedido || typeof body.numeroPedido !== 'string') {
    errors.push('numeroPedido é obrigatório e deve ser uma string.');
  }

  if (isInvalidNumber(body.valorTotal) || Number(body.valorTotal) < 0) {
    errors.push('valorTotal é obrigatório e deve ser maior ou igual a zero.');
  }

  if (!body.dataCriacao || Number.isNaN(new Date(body.dataCriacao).getTime())) {
    errors.push('dataCriacao é obrigatória e deve ser uma data válida.');
  }

  validateItems(body.items, errors, { requireAtLeastOne: true });

  return errors;
}

function validateUpdatePayload(body) {
  const errors = [];

  if ('valorTotal' in body && (isInvalidNumber(body.valorTotal) || Number(body.valorTotal) < 0)) {
    errors.push('valorTotal deve ser maior ou igual a zero.');
  }

  if ('dataCriacao' in body && Number.isNaN(new Date(body.dataCriacao).getTime())) {
    errors.push('dataCriacao deve ser uma data válida.');
  }

  if ('items' in body) {
    validateItems(body.items, errors, { requireAtLeastOne: true });
  }

  return errors;
}

module.exports = {
  validateCreatePayload,
  validateUpdatePayload,
};
