import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProgressLog } from '../../progress-logs/entities/progress-log.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  priority: string;

  @Column({ default: 'To Do' })
  status: string;

  @Column({ default: 0 })
  progress: number;

  @Column({ type: 'date' })
  deadline: Date;

  @OneToMany(() => ProgressLog, (log) => log.task)
  logs: ProgressLog[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}