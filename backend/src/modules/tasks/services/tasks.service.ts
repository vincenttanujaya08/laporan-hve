import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto'; 

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(dto);
    // Logika otomatisasi status awal
    if (task.progress >= 100) task.status = 'Completed';
    else if (task.progress > 0) task.status = 'In Progress';
    
    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ['progressLogs'], 
      order: { deadline: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Task> {
  const task = await this.taskRepository.findOne({
    where: { id },
    relations: ['progressLogs'], 
  });
  if (!task) throw new NotFoundException('Task tidak ditemukan');
  return task;
}

  
  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('Task tidak ditemukan');

    Object.assign(task, dto);
    
    // Update status otomatis berdasarkan progress
    if (task.progress >= 100) task.status = 'Completed';
    else if (task.progress > 0) task.status = 'In Progress';
    else task.status = 'To Do';

    return await this.taskRepository.save(task);
  }

  // Pengganti req.method === "DELETE" di Sheets
  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Task tidak ditemukan');
  }

  async updateProgress(id: string, progress: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('Task tidak ditemukan');

    task.progress = progress;
    task.status = progress >= 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'To Do';
    
    return await this.taskRepository.save(task);
  }
}