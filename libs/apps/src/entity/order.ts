import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { OrderStatusEnum } from '../../../../libs/enum/order-status.enum';
import { OrderStatusType } from '../../../../libs/type/order-status.type';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  @IsNotEmpty()
  user: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column('enum', { enum: OrderStatusEnum, default: OrderStatusEnum.CREATED })
  @IsNotEmpty()
  status: OrderStatusType;
}
