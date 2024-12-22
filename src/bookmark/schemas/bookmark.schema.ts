import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Bookmark extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  pokemonId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  koreanName: string;

  @Prop({ type: Object, required: true })
  sprites: {
    front_default: string;
  };
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
BookmarkSchema.index({ userId: 1, pokemonId: 1 }, { unique: true });
