import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from './schemas/pokemon.schema';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>,
  ) {}

  async findAll(search: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const searchQuery = search.trim().toLowerCase();

    const query = searchQuery
      ? {
          $or: [
            { name: { $regex: searchQuery, $options: 'i' } },
            { koreanName: { $regex: searchQuery, $options: 'i' } },
            { pokemonId: searchQuery.match(/^\d+$/) ? parseInt(searchQuery) : null }
          ].filter(condition => condition.pokemonId !== null)
        }
      : {};

    const total = await this.pokemonModel.countDocuments(query);
    const pokemons = await this.pokemonModel
      .find(query)
      .sort({ pokemonId: 1 })
      .skip(skip)
      .limit(limit);

    return {
      pokemons,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async findOne(id: number, skipViewCount: boolean = false) {
    let pokemon;

    if (skipViewCount) {
      pokemon = await this.pokemonModel.findOne({ pokemonId: id });
    } else {
      pokemon = await this.pokemonModel.findOneAndUpdate(
        { pokemonId: id },
        { $inc: { viewCount: 1 } },
        { new: true },
      );
    }

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }

    return pokemon;
  }

  async create(createPokemonDto: any) {
    const pokemon = new this.pokemonModel(createPokemonDto);
    return pokemon.save();
  }

  async update(id: number, updatePokemonDto: any) {
    const pokemon = await this.pokemonModel.findOneAndUpdate(
      { pokemonId: id },
      updatePokemonDto,
      { new: true, runValidators: true },
    );

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }

    return pokemon;
  }

  async remove(id: number) {
    const pokemon = await this.pokemonModel.findOneAndDelete({ pokemonId: id });

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }

    return pokemon;
  }
}
