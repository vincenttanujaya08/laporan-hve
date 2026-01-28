import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProgressLogsService } from '../services/progress-logs.service';
import { CreateProgressLogDto, UpdateProgressLogDto } from '../dto/progress-log.dto';

@Controller('progress-logs')
export class ProgressLogsController {
  constructor(private readonly service: ProgressLogsService) {}

  @Post()
  create(@Body() dto: CreateProgressLogDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProgressLogDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get('task/:taskId')
  findByTask(@Param('taskId') taskId: string) {
    return this.service.findByTask(taskId);
  }
}