import { books } from "../entities";

export interface BookModel {
    success: boolean;
    message?: string;
}
export interface BookModelDelete {
    id:number
//     params: {
//         id:string
//     }
}
export interface BookModelPost {
    body: books
}