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

  //post
  async create(dto: CreateSparepartDto): Promise<Sparepart> {
    const part = this.sparepartRepository.create(dto);
    return await this.sparepartRepository.save(part);
  }

  //get
  async findAll(): Promise<Sparepart[]> {
    return await this.sparepartRepository.find({
      order: { name: 'ASC' },
    });
  }

  //put/patch
  async update(id: string, dto: Partial<CreateSparepartDto>): Promise<Sparepart> {
    const part = await this.sparepartRepository.findOneBy({ id });
    if (!part) throw new NotFoundException('Sparepart tidak ditemukan');
    
    Object.assign(part, dto);
    return await this.sparepartRepository.save(part);
  }

  //delete
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.sparepartRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Sparepart tidak ditemukan');
    return { message: 'Sparepart berhasil dihapus' };
  }

  // adjust quantity
  async adjustQuantity(id: string, qty: number): Promise<Sparepart> {
    const part = await this.sparepartRepository.findOneBy({ id });
    if (!part) throw new NotFoundException('Sparepart tidak ditemukan');
    
    part.quantity += qty;
    return await this.sparepartRepository.save(part);
  }
}