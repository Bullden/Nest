import { Injectable, Inject } from '@nestjs/common';
import { books } from '../entities';


@Injectable()
export class BooksRepository {
    @Inject('BOOKS_REPOSITORY') public BOOKS_REPOSITORY: typeof books
   
    async findAll(){
        return  this.BOOKS_REPOSITORY.findAll<books>();
    }
    async findOne(id: string){
        return this.BOOKS_REPOSITORY.findOne<books>({ where: { _id: id }})
    }
    async deleteBook(id: string){
        return this.BOOKS_REPOSITORY.destroy({ where: { _id: id } })
    }
    async addBook(book: books){
        return this.BOOKS_REPOSITORY.create<books>(book)
    }
}