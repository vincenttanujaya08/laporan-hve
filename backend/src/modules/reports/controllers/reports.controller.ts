import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
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

  
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() dto: Partial<CreateReportDto>
  ) {
    return await this.reportsService.update(id, dto);
  }

  
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.reportsService.remove(id);
  }
}