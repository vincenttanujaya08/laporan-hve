import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressLogsController } from './controllers/progress-logs.controller';
import { ProgressLogsService } from './services/progress-logs.service';
import { ProgressLog } from './entities/progress-log.entity';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgressLog]),
    TasksModule],
  controllers: [ProgressLogsController],
  providers: [ProgressLogsService],
})
export class ProgressLogsModule {}