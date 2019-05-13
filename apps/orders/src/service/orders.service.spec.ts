import { OrdersService } from './orders.service';
import { OrderStatusEnum } from '@app/common';

let ordersService: OrdersService;
const orderMock = { id: 1, total: 0, user: '', status: OrderStatusEnum.CREATED };
const orderDeliveredMock = { id: 2, total: 0, user: '', status: OrderStatusEnum.DELIVERED };

const createMock = jest.fn(() => {
  return orderMock;
});

const saveMock = jest.fn((dto: any) => {
  return dto;
});

const findMock = jest.fn((id: number) => {
  return id === orderMock.id ? orderMock : orderDeliveredMock;
});

const MockRepository = jest.fn().mockImplementation(() => {
  return {
    create: createMock,
    save: saveMock,
    findOneOrFail: findMock
  };
});

const mockRepository = new MockRepository();

describe('Orders service', () => {
  beforeEach(() => {
    ordersService = new OrdersService(jest.fn(), mockRepository);
  });

  it('should create new Order', async () => {
    expect(await ordersService.create()).toEqual(orderMock);
  });

  it('should cancel order by id', async () => {
    const order = await ordersService.cancel(orderMock.id);

    expect(order.status).toEqual(OrderStatusEnum.CANCELED);
  });

  it('should fail canceling order on wrong order status', async () => {
    await expect(ordersService.cancel(orderDeliveredMock.id)).rejects.toThrow(Error);
  });

  it('should show order status by id', async () => {
    expect(await ordersService.status(orderMock.id)).toEqual(orderMock.status);
  });
});
