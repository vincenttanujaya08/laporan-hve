import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sparepart } from '../entities/sparepart.entity';
import { CreateSparepartDto } from '../dto/create-sparepart.dto';

@Injectable()
export class SparepartsService {
  constructor(
    @InjectRepository(Sparepart)
    private readonly sparepartRepository: Repository<Sparepart>,
  ) {}

  async create(dto: CreateSparepartDto): Promise<Sparepart> {
    const part = this.sparepartRepository.create(dto);
    return await this.sparepartRepository.save(part);
  }

  async findAll(): Promise<Sparepart[]> {
    return await this.sparepartRepository.find({
      order: { name: 'ASC' },
    });
  }

  async adjustQuantity(id: string, qty: number): Promise<Sparepart> {
    const part = await this.sparepartRepository.findOneBy({ id });
    if (!part) throw new NotFoundException('Sparepart tidak ditemukan');
    
    part.quantity += qty;
    return await this.sparepartRepository.save(part);
  }
}