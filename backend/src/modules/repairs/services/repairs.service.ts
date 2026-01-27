import { Injectable } from '@nestjs/common';
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
}