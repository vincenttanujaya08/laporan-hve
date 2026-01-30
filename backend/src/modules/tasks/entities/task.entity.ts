import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, Check, OneToMany } from 'typeorm';
import { ProgressLog } from '../../progress-logs/entities/progress-log.entity';

@Entity('tasks')
@Check('`priority` IN ("Low", "Medium", "High")')
@Check('`status` IN ("To Do", "In Progress", "Completed")')
@Check('`progress` >= 0 AND `progress` <= 100')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Index('idx_tasks_priority')
  @Column({ type: 'varchar', length: 20 })
  priority: string;

  @Index('idx_tasks_status')
  @Column({ type: 'varchar', length: 20, default: 'To Do' })
  status: string;

  @Column({ type: 'int', default: 0 })
  progress: number;

  @Index('idx_tasks_deadline')
  @Column({ type: 'date' })
  deadline: string;

  @OneToMany(() => ProgressLog, (log) => log.task)
  progressLogs: ProgressLog[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ default: false })
  isLate: boolean;
}