import { Injectable, Inject, HttpException, BadRequestException } from '@nestjs/common';
import { books } from './books.entity';


@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKS_REPOSITORY') private readonly BOOKS_REPOSITORY: typeof books) { }

  async findAll(): Promise<books[]> {

    return await this.BOOKS_REPOSITORY.findAll<books>();
  }

  async findOne(req): Promise<books> {
    let book: any = await this.BOOKS_REPOSITORY.findOne<books>({ where: { _id: req.params.id } });


    return book

  }


  async deleteBook(req): Promise<any> {

    if (req.params.id) {
      await this.BOOKS_REPOSITORY.destroy({ where: { _id: req.params.id } })

      return new HttpException('Add is done', 200);

    } else new BadRequestException()

  }

  async findBooksByTitle(req): Promise<books[]> {
    const Sequelize = require('sequelize');
    const title = req.params.title

    const Op = Sequelize.Op;
    const books = await this.BOOKS_REPOSITORY.findAll<books>({
      where:
      {
        title: {
          [Op.substring]: `${title}`
        }
      }
    });


    return books


  }


  async postBook(req): Promise<any> {


    if (req.body) {
      
      const book = req.body;
      await this.BOOKS_REPOSITORY.create<books>(book)

      return new HttpException('Add is done', 201);

    } else new BadRequestException()

  }

}