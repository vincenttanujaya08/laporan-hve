import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, Check } from 'typeorm';

@Entity('repairs')
@Check('`status` IN ("Pending", "In Progress", "Completed")')
@Check('`priority` IN ("Low", "Medium", "High")')

export class Repair {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_repairs_equipment')
  @Column({ length: 255 })
  equipment: string;

  @Column({ type: 'text' })
  issue: string;

  @Index('idx_repairs_status')
  @Column({ type: 'varchar', length: 20, default: 'Pending' })
  status: string;

  @Index('idx_repairs_priority')
  @Column({ type: 'varchar', length: 20 })
  priority: string;

  @Column({ length: 255, nullable: true })
  technician: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}