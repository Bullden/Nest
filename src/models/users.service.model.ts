import { users } from "../entities";


export interface UserModel {
    success: boolean;
    message?: string;
    errorValid?: boolean;
    data?: users|{} ;
}