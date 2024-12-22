import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SpritesDto {
  @IsString()
  @IsNotEmpty()
  front_default: string;
}

export class CreateBookmarkDto {
  @IsNumber()
  @IsNotEmpty()
  readonly pokemonId: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly koreanName: string;

  @ValidateNested()
  @Type(() => SpritesDto)
  readonly sprites: SpritesDto;
}
