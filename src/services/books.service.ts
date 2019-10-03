import { BooksRepository } from './../repositories';
import {
  Injectable,
} from '@nestjs/common';
import { books } from '../entities/books.entity';

@Injectable()
export class BooksService {
  constructor(public BooksRepository: BooksRepository) {}

  async findAll(): Promise<books[]> {
    return await this.BooksRepository.findAll();
  }

  async findOne(req): Promise<books> {
    let book: any = await this.BooksRepository.findOne(req.params.id);
    return book;
  }
  async deleteBook(req): Promise<BookModel> {
    if (req.params.id) {
      await this.BooksRepository.deleteBook(req.params.id);
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
    const book = req.body;
    await this.BooksRepository.addBook(book);

    return {
      success: true
    };
  }
}
