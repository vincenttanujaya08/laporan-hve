import { IsString, IsNotEmpty, IsNumber, Min, Max, IsUUID } from 'class-validator';

export class CreateProgressLogDto {
  @IsUUID()
  @IsNotEmpty()
  taskId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  progress: number;

  @IsString()
  @IsNotEmpty()
  note: string;
}