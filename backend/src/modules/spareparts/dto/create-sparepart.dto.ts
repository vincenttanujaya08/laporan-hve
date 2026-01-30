import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsDateString,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSparepartDto {
  @ApiProperty({
    example: 'Fan Belt',
    description: 'Nama sparepart',
  })
  @IsString()
  @IsNotEmpty()
  name: string; 

  @ApiProperty({
    example: 10,
    description: 'Jumlah sparepart',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  quantity: number; 

  @ApiProperty({
    example: 'pcs',
    description: 'Satuan sparepart',
  })
  @IsString()
  @IsNotEmpty()
  unit: string; 

  @ApiPropertyOptional({
    example: 'Sparepart untuk mesin pendingin',
    description: 'Deskripsi tambahan',
  })
  @IsString()
  @IsOptional()
  description?: string; 

  @ApiPropertyOptional({
    example: 'Pending',
    description: 'Status pemesanan sparepart',
    enum: ['Pending', 'Ordered', 'Arrived'],
  })
  @IsString()
  @IsOptional()
  @IsIn(['Pending', 'Ordered', 'Arrived']) 
  status?: string; 

  @ApiPropertyOptional({
    example: '2025-01-20',
    description: 'Tanggal pemesanan sparepart (ISO format)',
  })
  @IsDateString()
  @IsOptional()
  orderDate?: string;

  @ApiPropertyOptional({
    example: '2025-01-25',
    description: 'Tanggal kedatangan sparepart (ISO format)',
  })
  @IsDateString()
  @IsOptional()
  arrivalDate?: string; 
}
