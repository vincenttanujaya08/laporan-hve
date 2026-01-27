import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepairsController } from './controllers/repairs.controller';
import { RepairsService } from './services/repairs.service';
import { Repair } from './entities/repair.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Repair])],
  controllers: [RepairsController],
  providers: [RepairsService],
})
export class RepairsModule {}