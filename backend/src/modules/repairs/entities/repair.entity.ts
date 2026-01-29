import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, Check } from 'typeorm';

@Entity('repairs')
@Check('`status` IN ("Barang Diterima", "Sedang Dikerjakan", "Selesai")')
export class Repair {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_repairs_unit_name')
  @Column({ length: 255 })
  unitName: string;

  @Index('idx_repairs_item_name')
  @Column({ length: 255 })
  itemName: string;

  @Column({ length: 255 })
  location: string;

  @Column({ type: 'text' })
  issue: string;

  @Index('idx_repairs_status')
  @Column({ type: 'varchar', length: 25, default: 'Barang Diterima' })
  status: string;

  @Column({ type: 'date' })
  entryDate: Date;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  completionDate: Date;

  @Column({ length: 255, nullable: true })
  technician: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}