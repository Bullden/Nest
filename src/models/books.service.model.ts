import { books } from "../entities";

export interface BookModel {
    success: boolean;
    message?: string;
}
export interface BookModelDelete {
    id:number
}
export interface BookModelPost {
    body: books
}
export interface BookModelGet {
    id:number
}