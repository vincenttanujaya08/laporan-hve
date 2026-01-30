import { IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateProgressDto {
  @ApiProperty({
    example: 60,
    description: 'Progress task dalam persen (0 - 100)',
    minimum: 0,
    maximum: 100,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  progress: number;
}
