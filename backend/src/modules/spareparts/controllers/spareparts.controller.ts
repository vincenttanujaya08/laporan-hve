import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { SparepartsService } from '../services/spareparts.service';
import { CreateSparepartDto } from '../dto/create-sparepart.dto';
import { UpdateStockDto } from '../dto/update-stock.dto';

@Controller('spareparts')
export class SparepartsController {
  constructor(private readonly sparepartsService: SparepartsService) {}

  @Post()
  async create(@Body() dto: CreateSparepartDto) {
    return await this.sparepartsService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.sparepartsService.findAll();
  }

  @Patch(':id/stock')
  async adjustStock(@Param('id') id: string, @Body() dto: UpdateStockDto) {
    return await this.sparepartsService.adjustQuantity(id, dto.qty);
  }
}