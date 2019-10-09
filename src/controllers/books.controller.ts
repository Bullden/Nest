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
import { BookModelDelete, BookModelPost, BookModelGet } from 'src/models/books.service.model';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): any {
    return this.booksService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param() req: BookModelDelete) {
    return this.booksService.findOne(req.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deleteBook(@Param() req: BookModelGet) { 
    console.log(req);
    
    return this.booksService.deleteBook(req.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  postBook(@Body() req: BookModelPost) {
    console.log(req);
    
    return this.booksService.postBook(req);
  }
}
