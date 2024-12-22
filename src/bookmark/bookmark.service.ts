import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark } from './schemas/bookmark.schema';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<Bookmark>,
  ) {}

  async findAll(userId: string) {
    return this.bookmarkModel.find({ userId });
  }

  async create(userId: string, createBookmarkDto: any) {
    const bookmark = new this.bookmarkModel({
      ...createBookmarkDto,
      userId,
    });
    return bookmark.save();
  }

  async remove(
    userId: string,
    pokemonId: number,
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return this.bookmarkModel.deleteOne({ userId, pokemonId });
  }
}
