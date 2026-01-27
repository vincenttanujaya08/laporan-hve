import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparepartsController } from './controllers/spareparts.controller';
import { SparepartsService } from './services/spareparts.service';
import { Sparepart } from './entities/sparepart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sparepart])],
  controllers: [SparepartsController],
  providers: [SparepartsService],
})
export class SparepartsModule {}