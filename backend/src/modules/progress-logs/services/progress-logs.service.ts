import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgressLog } from '../entities/progress-log.entity';
import { CreateProgressLogDto, UpdateProgressLogDto } from '../dto/progress-log.dto';
import { TasksService } from '../../tasks/services/tasks.service';

@Injectable()
export class ProgressLogsService {
  constructor(
    @InjectRepository(ProgressLog)
    private readonly logRepository: Repository<ProgressLog>,
    private readonly tasksService: TasksService,
  ) {}


  private async syncTaskProgress(taskId: string) {
    const logs = await this.logRepository.find({ where: { task: { id: taskId } } });
    const totalProgress = logs.reduce((sum, log) => sum + log.progress, 0);
    

    if (totalProgress > 100) {
      throw new BadRequestException(`Total progres melampaui 100% (saat ini: ${totalProgress}%)`);
    }
    
   
    await this.tasksService.updateProgress(taskId, totalProgress);
  }

  async create(dto: CreateProgressLogDto) {
  const today = new Date();
  today.setHours(23, 59, 59, 999); 
  
  const inputDate = new Date(dto.date);


  if (inputDate > today) {
    throw new BadRequestException('Tidak boleh menambahkan log dengan tanggal di masa depan.');
  }

  
  const log = this.logRepository.create({
    ...dto,
    task: { id: dto.taskId } as any,
  });
  
  const saved = await this.logRepository.save(log);
  await this.syncTaskProgress(dto.taskId);
  return saved;
}

  async update(id: string, dto: UpdateProgressLogDto) {
    
    if (dto.date) {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (new Date(dto.date) > today) {
      throw new BadRequestException('Tanggal update tidak boleh di masa depan');
    }
  }
    const log = await this.logRepository.findOne({ where: { id }, relations: ['task'] });
    if (!log) throw new NotFoundException('Log tidak ditemukan');

    Object.assign(log, dto);
    await this.logRepository.save(log);
    
    await this.syncTaskProgress(log.task.id);
    return log;
  }

  async remove(id: string) {
    const log = await this.logRepository.findOne({ where: { id }, relations: ['task'] });
    if (!log) throw new NotFoundException('Log tidak ditemukan');

    const taskId = log.task.id;
    await this.logRepository.remove(log);
    
    await this.syncTaskProgress(taskId);
    return { message: 'Riwayat progres berhasil dihapus' };
  }

  async findByTask(taskId: string) {
    return await this.logRepository.find({
      where: { task: { id: taskId } },
      order: { date: 'DESC' }, 
    });
  }
}