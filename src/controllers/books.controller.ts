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
} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { BookModelDelete, BookModelPost } from 'src/models/books.service.model';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): any {
    return this.booksService.findAll();
  }

  @Get('/id/:id')
  findOne(@Req() req: Request) {
    return this.booksService.findOne(req.params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deleteBook(@Req() req: BookModelDelete) { 
    return this.booksService.deleteBook(req.params.id);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  postBook(@Req() req: BookModelPost) {
    return this.booksService.postBook(req.body);
  }
}
