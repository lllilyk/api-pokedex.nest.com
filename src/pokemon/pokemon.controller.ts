import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(
    @Query('search') search: string = '',
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    console.log('NestJS - Pokemon findAll 호출됨:', { search, page, limit });
    return this.pokemonService.findAll(search, +page, +limit);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('skipViewCount') skipViewCount?: string,
  ) {
    console.log('NestJS - Pokemon findOne 호출됨:', { id, skipViewCount });
    return this.pokemonService.findOne(+id, skipViewCount === 'true');
  }

  @Post()
  async create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}
