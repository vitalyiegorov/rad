import { OrdersService } from './orders.service';
import { OrderStatusEnum } from '@app/common';

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
      [orderMock.id]: orderMock,
      [orderConfirmedMock.id]: orderConfirmedMock,
      [orderDeliveredMock.id]: orderDeliveredMock
    }[id];
  });

  const mockRepository = new (jest.fn().mockImplementation(() => ({
    create: createMock,
    save: saveMock,
    findOneOrFail: findMock
  })))();

  const mockAmqpService = new (jest.fn().mockImplementation(() => ({ sendToOrders: jest.fn() })))();

  beforeEach(() => {
    ordersService = new OrdersService(mockAmqpService, mockRepository);
  });

  it('should create new Order', async () => {
    expect(await ordersService.create()).toEqual(orderMock);
    expect(mockAmqpService.sendToOrders).toHaveBeenCalledWith({ id: orderMock.id, order: orderMock });
    expect(saveMock).toHaveBeenCalledWith(orderMock);
  });

  it('should cancel CREATED order by id', async () => {
    const order = await ordersService.cancel(orderMock.id);

    expect(order.status).toEqual(OrderStatusEnum.CANCELED);
    expect(saveMock).toHaveBeenCalledWith(orderMock);
  });

  it('should cancel CONFIRMED order by id', async () => {
    const order = await ordersService.cancel(orderConfirmedMock.id);

    expect(order.status).toEqual(OrderStatusEnum.CANCELED);
    expect(saveMock).toHaveBeenCalledWith(orderConfirmedMock);
  });

  it('should fail canceling order on wrong order status', async () => {
    await expect(ordersService.cancel(orderDeliveredMock.id)).rejects.toThrow(Error);
  });

  it('should show order status by id', async () => {
    expect(await ordersService.status(orderMock.id)).toEqual(orderMock.status);
  });
});
