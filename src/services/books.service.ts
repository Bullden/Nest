import { BooksRepository } from './../repositories';
import { Injectable } from '@nestjs/common';
import { books } from '../entities/books.entity';
import { BookModel } from 'src/models/books.service.model';

@Injectable()
export class BooksService {
  constructor(public BooksRepository: BooksRepository) {}

  async findAll(): Promise<books[]> {
    return await this.BooksRepository.findAll();
  }

  async findOne(req): Promise<books> {
    let book: any = await this.BooksRepository.findOne(req);
    return book;
  }
  async deleteBook(req): Promise<BookModel> {
    console.log(req);
    
    if (req) {
      await this.BooksRepository.deleteBook(req);

      return {
        success: true,
      };
    }
  }

  async findBooksByTitle(req): Promise<books[]> {
    const books = await this.BooksRepository.findAll();

    return books;
  }

  async postBook(req): Promise<BookModel> {
    const book = req;
    await this.BooksRepository.addBook(book);

    return {
      success: true,
    };
  }
}
