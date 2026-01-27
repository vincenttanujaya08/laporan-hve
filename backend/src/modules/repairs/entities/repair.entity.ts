import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('repairs')
export class Repair {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  equipment: string;

  @Column({ type: 'text' })
  issue: string;

  @Column({ default: 'Pending' })
  status: string;

  @Column()
  priority: string;

  @Column({ nullable: true })
  technician: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}