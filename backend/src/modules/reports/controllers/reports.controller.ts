import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { CreateReportDto } from '../dto/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async create(@Body() dto: CreateReportDto) {
    return await this.reportsService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.reportsService.findAll();
  }
}