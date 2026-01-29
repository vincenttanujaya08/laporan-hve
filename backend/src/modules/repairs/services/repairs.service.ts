import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repair } from '../entities/repair.entity';
import { CreateRepairDto } from '../dto/create-repair.dto';

@Injectable()
export class RepairsService {
  constructor(
    @InjectRepository(Repair)
    private readonly repairRepository: Repository<Repair>,
  ) {}

  async create(dto: CreateRepairDto): Promise<Repair> {
    const repair = this.repairRepository.create(dto);
    return await this.repairRepository.save(repair);
  }

  async findAll(): Promise<Repair[]> {
    return await this.repairRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, dto: Partial<CreateRepairDto>): Promise<Repair> {
    const repair = await this.repairRepository.findOneBy({ id });
    if (!repair) {
      throw new NotFoundException(`Repair dengan ID ${id} tidak ditemukan`);
    }
    
    if (dto.completionDate && !dto.status) {
      dto.status = 'Selesai';
    }

    Object.assign(repair, dto);
    return await this.repairRepository.save(repair);
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.repairRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Repair dengan ID ${id} tidak ditemukan`);
    }
    return { message: 'Data repair berhasil dihapus' };
  }
}