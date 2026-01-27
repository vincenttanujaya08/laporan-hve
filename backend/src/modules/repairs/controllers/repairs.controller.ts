import { Controller, Get, Post, Body } from '@nestjs/common';
import { RepairsService } from '../services/repairs.service';
import { CreateRepairDto } from '../dto/create-repair.dto';

@Controller('repairs')
export class RepairsController {
  constructor(private readonly repairsService: RepairsService) {}

  @Post()
  async create(@Body() dto: CreateRepairDto) {
    return await this.repairsService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.repairsService.findAll();
  }
}