import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Pokemon extends Document {
  @Prop({ required: true, unique: true })
  pokemonId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  koreanName: string;

  @Prop({ required: true })
  genus: string;

  @Prop({ type: Object, required: true })
  sprites: {
    front_default: string;
  };

  @Prop([
    {
      name: { type: String, required: true },
    },
  ])
  types: Array<{ name: string }>;

  @Prop([
    {
      stat: { name: { type: String, required: true } },
      base_stat: { type: Number, required: true },
    },
  ])
  stats: Array<{ stat: { name: string }; base_stat: number }>;

  @Prop({ default: 0 })
  viewCount: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
