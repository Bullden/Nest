import {
  Controller,
  Get,
  Post,
  Req,
  Put,
  Delete,
  UseGuards,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { BookModelDelete, BookModelPost, BookModelGet, BookModel } from 'src/models/books.service.model';
import { books } from 'src/entities';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<books[]> {
    return this.booksService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param() req: BookModelGet): Promise<books> {
    return this.booksService.findOne(req.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deleteBook(@Param() req: BookModelDelete): Promise<BookModel> {  
    return this.booksService.deleteBook(req.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  postBook(@Body() req: BookModelPost): Promise<BookModel> {   
    return this.booksService.postBook(req);
  }
}
