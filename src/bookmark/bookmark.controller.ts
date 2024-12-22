import { Controller, Get, Post, Delete, Body, Query } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  async findAll() {
    const userId = 'tempUserId';
    return this.bookmarkService.findAll(userId);
  }

  @Post()
  async create(@Body() createBookmarkDto: CreateBookmarkDto) {
    const userId = 'tempUserId';
    return this.bookmarkService.create(userId, createBookmarkDto);
  }

  @Delete()
  async remove(@Query('pokemonId') pokemonId: string): Promise<void> {
    const userId = 'tempUserId';
    await this.bookmarkService.remove(userId, +pokemonId);
  }
}
