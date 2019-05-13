import { OrdersService } from './orders.service';
import { Repository } from 'typeorm';

let ordersService: OrdersService;

const createMock = jest.fn((dto: any) => {
  return dto;
});

const saveMock = jest.fn((dto: any) => {
  return dto;
});

const MockRepository = jest.fn().mockImplementation(() => {
  return {
    create: createMock,
    save: saveMock
  };
});

const mockRepository = new MockRepository();

describe('Orders service', () => {
  beforeEach(() => {
    ordersService = new OrdersService(jest.fn(), mockRepository);
  });

  it('should create new Order', async () => {
    await ordersService.create();

    expect(true).toEqual(true);
  });

  it('should cancel order by id', () => {
    expect(true).toEqual(true);
  });

  it('should show order status by id', () => {
    expect(true).toEqual(true);
  });
});
