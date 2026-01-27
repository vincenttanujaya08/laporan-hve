import { IsString, IsNotEmpty, IsNumber, Min, Max, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProgressLogDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID task yang dilaporkan progresnya',
    format: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  taskId: string;

  @ApiProperty({
    example: 75,
    description: 'Persentase progres task (0 - 100)',
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  progress: number;

  @ApiProperty({
    example: 'Implementasi API sudah selesai',
    description: 'Catatan progres pekerjaan',
  })
  @IsString()
  @IsNotEmpty()
  note: string;
}
