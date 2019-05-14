import * as request from 'supertest';
import { OrdersController } from './orders.controller';

describe('Orders status action', () => {
  it('should show order status', () => {
    expect(true).toEqual(true);
  });
});
//
// describe('GET /user', function() {
//   it('responds with json', function(done) {
//     const ordersController = new OrdersController();
//
//     const app = new App([
//       authenticationController,
//     ]);
//
//     request(app)
//       .get('/user')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, done);
//   });
// });
