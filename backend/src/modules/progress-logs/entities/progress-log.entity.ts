import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Index, Check } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity('progress_logs')
@Check('`progress` >= 0 AND `progress` <= 100')
export class ProgressLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  progress: number;

  @Column({ type: 'text' })
  note: string;

  @Index('idx_progress_logs_task_id')
  @ManyToOne(() => Task, (task) => task.progressLogs, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}