import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('reports')
@Index('idx_reports_date', (report) => ({ date: -1 })) //descending order
@Index('idx_reports_project', ['project'])

export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time', name: 'start_time' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time' })
  endTime: string;

  @Column({ length: 255 })
  location: string;

  @Column({ length: 255 })
  project: string;

  @Column({ length: 255 })
  activity: string; 

  @Column({ length: 255, nullable: true })
  equipment: string; 

  @Column({ length: 50 })
  status: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}