import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepairsService } from '../services/repairs.service';
import { CreateRepairDto } from '../dto/create-repair.dto';

@Controller('repairs')
export class RepairsController {
  constructor(private readonly repairsService: RepairsService) {}


  //fetch all repairs
  @Get()
  async findAll() {
    return await this.repairsService.findAll();
  }

  //create new repair
  @Post()
  async create(@Body() dto: CreateRepairDto) {
    return await this.repairsService.create(dto);
  }

  //update repair by id
  @Patch(':id') 
  async update(@Param('id') id: string, @Body() dto: Partial<CreateRepairDto>) {
    return await this.repairsService.update(id, dto);
  }

  //delete repair by id
  @Delete(':id') 
  async remove(@Param('id') id: string) {
    return await this.repairsService.remove(id);
  }
}