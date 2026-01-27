import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import All Feature Modules
import { ReportsModule } from './modules/reports/reports.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ProgressLogsModule } from './modules/progress-logs/progress-logs.module';
import { SparepartsModule } from './modules/spareparts/spareparts.module';
import { RepairsModule } from './modules/repairs/repairs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

   
    ReportsModule,
    TasksModule,
    ProgressLogsModule,
    SparepartsModule,
    RepairsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}