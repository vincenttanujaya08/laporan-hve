import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProgressLogsService } from '../services/progress-logs.service';
import { CreateProgressLogDto } from '../dto/progress-log.dto';

@Controller('progress-logs')
export class ProgressLogsController {
  constructor(private readonly logService: ProgressLogsService) {}

  @Post()
  async create(@Body() dto: CreateProgressLogDto) {
    return await this.logService.create(dto);
  }

  @Get('task/:taskId')
  async findByTask(@Param('taskId') taskId: string) {
    return await this.logService.findByTask(taskId);
  }
}