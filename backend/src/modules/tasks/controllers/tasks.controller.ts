import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateProgressDto } from '../dto/update-progress.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

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

  @Patch(':id') 
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTaskDto) {
    return await this.tasksService.update(id, dto);
  }

  @Patch(':id/progress') 
  async updateProgress(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() dto: UpdateProgressDto
  ) {
    return await this.tasksService.updateProgress(id, dto.progress); 
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.tasksService.remove(id);
  }
}