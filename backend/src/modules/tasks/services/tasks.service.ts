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
    
    if (task.progress >= 100) task.status = 'Completed';
    else if (task.progress > 0) task.status = 'In Progress';
    else task.status = 'To Do';

    return await this.taskRepository.save(task);
  }


  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Task tidak ditemukan');
  }


  async updateProgress(id: string, progress: number): Promise<Task> {
  const task = await this.findOne(id);
  

  const today = new Date();
  const deadlineDate = new Date(task.deadline);

  task.progress = progress;


  if (progress === 0) {
    task.status = 'To Do';
  } else if (progress < 100) {
    task.status = 'In Progress';
  } else {
    task.status = 'Completed';
  }

  
  if (today > deadlineDate && progress < 100) {
    task.isLate = true;
  }

  return await this.taskRepository.save(task);
}
}