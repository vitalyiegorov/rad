import { OrdersService } from './orders.service';
import { OrderStatusEnum, PaymentStatusEnum } from '@app/common';

describe('Orders service', () => {
  let ordersService: OrdersService;
  const orderMock = { id: 1, total: 0, user: '', status: OrderStatusEnum.CREATED };
  const orderConfirmedMock = { id: 2, total: 0, user: '', status: OrderStatusEnum.CONFIRMED };
  const orderDeliveredMock = { id: 3, total: 0, user: '', status: OrderStatusEnum.DELIVERED };

  const createMock = jest.fn(() => {
    return orderMock;
  });

  const saveMock = jest.fn((dto: any) => {
    return dto;
  });

  const findMock = jest.fn((id: number) => {
    return {
      [orderMock.id]: { ...orderMock },
      [orderConfirmedMock.id]: { ...orderConfirmedMock },
      [orderDeliveredMock.id]: { ...orderDeliveredMock }
    }[id];
  });

  const mockRepository = new (jest.fn().mockImplementation(() => ({
    create: createMock,
    save: saveMock,
    findOneOrFail: findMock
  })))();

  const mockAmqpService = new (jest.fn().mockImplementation(() => ({
    sendToOrders: jest.fn(),
    sendToDelivery: jest.fn()
  })))();

  beforeEach(() => {
    ordersService = new OrdersService(mockAmqpService, mockRepository);
  });

  it('should create new Order', async () => {
    expect(await ordersService.create()).toEqual(orderMock);
    expect(mockAmqpService.sendToOrders).toHaveBeenCalledWith({ id: orderMock.id, order: orderMock });
    expect(saveMock).toHaveBeenCalledWith(orderMock);
  });

  describe('Order cancellation', () => {
    it('should cancel CREATED order by id', async () => {
      const order = await ordersService.cancel(orderMock.id);

      expect(order.status).toEqual(OrderStatusEnum.CANCELED);
      expect(saveMock).toHaveBeenCalledWith(orderMock);
    });

    it('should cancel CONFIRMED order by id', async () => {
      const order = await ordersService.cancel(orderConfirmedMock.id);

      expect(order.status).toEqual(OrderStatusEnum.CANCELED);
      expect(saveMock).toHaveBeenCalledWith({ ...orderConfirmedMock, status: OrderStatusEnum.CANCELED });
    });

    it('should fail canceling order on wrong order status', async () => {
      await expect(ordersService.cancel(orderDeliveredMock.id)).rejects.toThrow(Error);
    });
  });

  it('should show order status by id', async () => {
    expect(await ordersService.status(orderMock.id)).toEqual(orderMock.status);
  });

  describe('Order payments', () => {
    it('should process DECLINED order payment', async () => {
      const canceled = { ...orderMock, status: OrderStatusEnum.CANCELED };
      expect(await ordersService.payment(orderMock.id, PaymentStatusEnum.DECLINED)).toEqual(canceled);
      expect(mockAmqpService.sendToDelivery).not.toHaveBeenCalledWith({ id: orderMock.id });
    });

    it('should process CONFIRMED order payment', async () => {
      const confirmed = { ...orderMock, status: OrderStatusEnum.CONFIRMED };

      expect(await ordersService.payment(orderMock.id, PaymentStatusEnum.CONFIRMED)).toEqual(confirmed);
      expect(mockAmqpService.sendToDelivery).toHaveBeenCalledWith({ id: orderMock.id });
    });

    it('should throw error for orders with wrong status', async () => {
      await expect(ordersService.payment(orderConfirmedMock.id, PaymentStatusEnum.DECLINED)).rejects.toThrow(Error);
    });
  });

  it('should deliver order', async () => {
    expect(await ordersService.delivered(orderMock.id)).toEqual(OrderStatusEnum.DELIVERED);
  });
});
