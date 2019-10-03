import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { users, roles } from '../entities';

@Injectable()
export class AuthRepository {
    @Inject('AUTH_REPOSITORY') public AUTH_REPOSITORY: typeof users

    async findOne(email: string) {
        const user = await this.AUTH_REPOSITORY.findOne<users>({ where: { email: email } })
        return user
    }

    async findAll( email, permissions){
        await this.AUTH_REPOSITORY.findAll<users>({
               where: { email: email },
               include: [{
                 model: roles,
              }]
            }).then((rolen: any) => rolen.forEach(el => {
                el.roleId.forEach(element => {
                  permissions.push(element.dataValues.roleName);
                });
            }))
        return permissions
    }
}