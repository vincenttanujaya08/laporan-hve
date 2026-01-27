import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    return await this.tasksService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Patch(':id/progress')
  async updateProgress(@Param('id') id: string, @Body('progress') progress: number) {
    return await this.tasksService.updateProgress(id, progress);
  }
}