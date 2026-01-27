import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity('progress_logs')
export class ProgressLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  progress: number;

  @Column({ type: 'text' })
  note: string; 

  @ManyToOne(() => Task, (task) => task.logs, { onDelete: 'CASCADE' })
  task: Task;

  @CreateDateColumn()
  createdAt: Date;
}