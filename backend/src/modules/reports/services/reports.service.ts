import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';
import { CreateReportDto } from '../dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  // POST 
  async create(dto: CreateReportDto): Promise<Report> {
    const report = this.reportRepository.create(dto);
    return await this.reportRepository.save(report);
  }

  // GET 
  async findAll(): Promise<Report[]> {
    return await this.reportRepository.find({
      order: { date: 'DESC' }, 
    });
  }

  // PUT/PATCH 
  async update(id: string, dto: Partial<CreateReportDto>): Promise<Report> {
    const report = await this.reportRepository.findOneBy({ id });
    if (!report) {
      throw new NotFoundException(`Laporan dengan ID ${id} tidak ditemukan`);
    }
    
    Object.assign(report, dto);
    return await this.reportRepository.save(report);
  }

  // DELETE 
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.reportRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Laporan dengan ID ${id} tidak ditemukan`);
    }
    return { message: 'Data laporan berhasil dihapus' };
  }
}