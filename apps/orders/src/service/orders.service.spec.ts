import { OrdersService } from './orders.service';

const getRepository = () => {};

describe('Orders service', () => {
  it('should create new Order', async () => {
    await OrdersService.create();

    expect(true).toEqual(true);
  });

  it('should cancel order by id', () => {
    expect(true).toEqual(true);
  });

  it('should show order status by id', () => {
    expect(true).toEqual(true);
  });
});
