const sequelize = require('../config/database');
const { Order, Item } = require('../models');
const {
  normalizeOrderId,
  mapRequestToDb,
  mapDbToResponse,
} = require('../utils/orderMapper');
const {
  validateCreatePayload,
  validateUpdatePayload,
} = require('../utils/orderValidator');

async function loadOrder(orderId) {
  return Order.findByPk(orderId, {
    include: [
      {
        model: Item,
        as: 'items',
      },
    ],
  });
}

async function createOrder(req, res, next) {
  try {
    const errors = validateCreatePayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Payload inválido.',
        errors,
      });
    }

    const mappedOrder = mapRequestToDb(req.body);

    if (!mappedOrder.orderId) {
      return res.status(400).json({
        message: 'Não foi possível gerar o orderId a partir de numeroPedido.',
      });
    }

    const existingOrder = await Order.findByPk(mappedOrder.orderId);
    if (existingOrder) {
      return res.status(409).json({
        message: 'Já existe um pedido com esse orderId.',
      });
    }

    await sequelize.transaction(async (transaction) => {
      await Order.create(
        {
          orderId: mappedOrder.orderId,
          value: mappedOrder.value,
          creationDate: mappedOrder.creationDate,
        },
        { transaction }
      );

      await Item.bulkCreate(mappedOrder.items, { transaction });
    });

    const createdOrder = await loadOrder(mappedOrder.orderId);

    return res.status(201).json(mapDbToResponse(createdOrder));
  } catch (error) {
    return next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const orderId = normalizeOrderId(req.params.orderId);
    const order = await loadOrder(orderId);

    if (!order) {
      return res.status(404).json({
        message: 'Pedido não encontrado.',
      });
    }

    return res.status(200).json(mapDbToResponse(order));
  } catch (error) {
    return next(error);
  }
}

async function listOrders(req, res, next) {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Item,
          as: 'items',
        },
      ],
      order: [['creationDate', 'DESC']],
    });

    return res.status(200).json(orders.map(mapDbToResponse));
  } catch (error) {
    return next(error);
  }
}

async function updateOrder(req, res, next) {
  try {
    const orderId = normalizeOrderId(req.params.orderId);
    const existingOrder = await loadOrder(orderId);

    if (!existingOrder) {
      return res.status(404).json({
        message: 'Pedido não encontrado.',
      });
    }

    const errors = validateUpdatePayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Payload inválido.',
        errors,
      });
    }

    await sequelize.transaction(async (transaction) => {
      const orderDataToUpdate = {};

      if ('valorTotal' in req.body) {
        orderDataToUpdate.value = Number(req.body.valorTotal);
      }

      if ('dataCriacao' in req.body) {
        orderDataToUpdate.creationDate = new Date(req.body.dataCriacao);
      }

      if (Object.keys(orderDataToUpdate).length > 0) {
        await Order.update(orderDataToUpdate, {
          where: { orderId },
          transaction,
        });
      }

      if ('items' in req.body) {
        await Item.destroy({
          where: { orderId },
          transaction,
        });

        const mappedOrder = mapRequestToDb(
          {
            numeroPedido: orderId,
            valorTotal: req.body.valorTotal ?? existingOrder.value,
            dataCriacao: req.body.dataCriacao ?? existingOrder.creationDate,
            items: req.body.items,
          },
          orderId
        );

        await Item.bulkCreate(mappedOrder.items, { transaction });
      }
    });

    const updatedOrder = await loadOrder(orderId);
    return res.status(200).json(mapDbToResponse(updatedOrder));
  } catch (error) {
    return next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const orderId = normalizeOrderId(req.params.orderId);
    const existingOrder = await Order.findByPk(orderId);

    if (!existingOrder) {
      return res.status(404).json({
        message: 'Pedido não encontrado.',
      });
    }

    await sequelize.transaction(async (transaction) => {
      await Item.destroy({
        where: { orderId },
        transaction,
      });

      await Order.destroy({
        where: { orderId },
        transaction,
      });
    });

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder,
};
