import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(dto);
    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ['logs'],
      order: { deadline: 'ASC' },
    });
  }

  async updateProgress(id: string, progress: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('Task tidak ditemukan');

    task.progress = progress;
    if (progress >= 100) {
      task.status = 'Completed';
    } else if (progress > 0) {
      task.status = 'In Progress';
    } else {
      task.status = 'To Do';
    }
    
    return await this.taskRepository.save(task);
  }
}