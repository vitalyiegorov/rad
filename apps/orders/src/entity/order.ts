import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { OrderStatusEnum, OrderStatusType } from '@app/common';
import { OrderInterface } from '@app/common';

@Entity()
export class Order implements OrderInterface {
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
