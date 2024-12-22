import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SpritesDto {
  @IsString()
  @IsNotEmpty()
  front_default: string;
}

class TypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

class StatNameDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

class StatDto {
  @ValidateNested()
  @Type(() => StatNameDto)
  stat: StatNameDto;

  @IsNumber()
  @IsNotEmpty()
  base_stat: number;
}

export class CreatePokemonDto {
  @IsNumber()
  @IsNotEmpty()
  readonly pokemonId: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly koreanName: string;

  @IsString()
  @IsNotEmpty()
  readonly genus: string;

  @ValidateNested()
  @Type(() => SpritesDto)
  readonly sprites: SpritesDto;

  @ValidateNested({ each: true })
  @Type(() => TypeDto)
  readonly types: TypeDto[];

  @ValidateNested({ each: true })
  @Type(() => StatDto)
  readonly stats: StatDto[];
}
