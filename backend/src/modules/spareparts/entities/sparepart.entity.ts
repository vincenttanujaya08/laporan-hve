import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, Check } from 'typeorm';

@Entity('spareparts')
@Check('`quantity` > 0')
@Check('`status` IN ("Pending", "Ordered", "Arrived")')
export class Sparepart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_spareparts_name')
  @Column({ length: 255 })
  name: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ length: 50 })
  unit: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Index('idx_spareparts_status')
  @Column({ type: 'varchar', length: 20, default: 'Pending' })
  status: string;

  @Column({ type: 'date', name: 'order_date', nullable: true })
  orderDate: string;

  @Column({ type: 'date', name: 'arrival_date', nullable: true })
  arrivalDate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}