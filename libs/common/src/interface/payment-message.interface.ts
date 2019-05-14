import { PaymentStatusType } from '@app/common';

export interface PaymentMessageInterface {
  id: number;
  status: PaymentStatusType;
}
