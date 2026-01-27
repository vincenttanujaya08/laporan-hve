import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgressLog } from '../entities/progress-log.entity';
import { CreateProgressLogDto } from '../dto/progress-log.dto';

@Injectable()
export class ProgressLogsService {
  constructor(
    @InjectRepository(ProgressLog)
    private readonly logRepository: Repository<ProgressLog>,
  ) {}

  async create(dto: CreateProgressLogDto): Promise<ProgressLog> {
    const log = this.logRepository.create({
      progress: dto.progress,
      note: dto.note,
      task: { id: dto.taskId } as any,
    });
    return await this.logRepository.save(log);
  }

  async findByTask(taskId: string): Promise<ProgressLog[]> {
    return await this.logRepository.find({
      where: { task: { id: taskId } },
      order: { createdAt: 'DESC' },
    });
  }
}