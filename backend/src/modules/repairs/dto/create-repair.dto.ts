import { IsString, IsNotEmpty, IsOptional, IsIn, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRepairDto {
  @ApiProperty({ example: 'Linde', description: 'Unit Alat' })
  @IsString()
  @IsNotEmpty()
  unitName: string;

  @ApiProperty({ example: 'APC Transmisi', description: 'Item Perbaikan' })
  @IsString()
  @IsNotEmpty()
  itemName: string;

  @ApiProperty({ example: 'Depo Langon', description: 'Lokasi Operasi' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'Arduino Nano blank', description: 'Deskripsi kerusakan' })
  @IsString()
  @IsNotEmpty()
  issue: string;

  @ApiPropertyOptional({ 
    example: 'Barang Diterima', 
    enum: ['Barang Diterima', 'Sedang Dikerjakan', 'Selesai'] 
  })
  @IsString()
  @IsOptional()
  @IsIn(['Barang Diterima', 'Sedang Dikerjakan', 'Selesai'])
  status?: string;

  @ApiProperty({ example: '2025-12-15', description: 'Tanggal barang diterima' })
  @IsDateString()
  @IsNotEmpty()
  entryDate: string;

  @ApiPropertyOptional({ example: '2025-12-15' })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ example: '2025-12-15' })
  @IsDateString()
  @IsOptional()
  completionDate?: string;

  @ApiPropertyOptional({ example: 'Budi Santoso' })
  @IsString()
  @IsOptional()
  technician?: string;

  @ApiPropertyOptional({ example: 'Catatan tambahan' })
  @IsString()
  @IsOptional()
  notes?: string;
}