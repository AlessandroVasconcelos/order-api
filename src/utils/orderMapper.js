function normalizeOrderId(numeroPedido) {
  if (typeof numeroPedido !== 'string') return '';
  return numeroPedido.trim().replace(/-\d+$/, '');
}

function mapRequestToDb(body, forcedOrderId) {
  const orderId = normalizeOrderId(forcedOrderId || body.numeroPedido);

  return {
    orderId,
    value: Number(body.valorTotal),
    creationDate: new Date(body.dataCriacao),
    items: Array.isArray(body.items)
      ? body.items.map((item) => ({
          orderId,
          productId: Number(item.idItem),
          quantity: Number(item.quantidadeItem),
          price: Number(item.valorItem),
        }))
      : [],
  };
}

function mapDbToResponse(order) {
  return {
    orderId: order.orderId,
    value: Number(order.value),
    creationDate: new Date(order.creationDate).toISOString(),
    items: Array.isArray(order.items)
      ? order.items.map((item) => ({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
          price: Number(item.price),
        }))
      : [],
  };
}

module.exports = {
  normalizeOrderId,
  mapRequestToDb,
  mapDbToResponse,
};
