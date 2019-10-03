import { Injectable, Inject } from '@nestjs/common';
import { users_roles, users } from '../entities';

@Injectable()
export class UsersRepository {
  @Inject('USERS_REPOSITORY') public USERS_REPOSITORY: typeof users;

  async findAll() {
    return this.USERS_REPOSITORY.findAll<users>();
  }
  async findOne(parametrs: any) {
    return this.USERS_REPOSITORY.findOne<users>(parametrs);
  }
  async update(body: users, id: string) {
    return this.USERS_REPOSITORY.update<users>(body, { where: { _id: id } });
  }
  async create(newUser: users) {
    return this.USERS_REPOSITORY.create<users>(newUser);
  }
}

@Injectable()
export class UserRolesRepository {
  @Inject('USER_ROLES_REPO') public USER_ROLES_REPO: typeof users_roles;

  async create(newRole: any) {
    return this.USER_ROLES_REPO.create<users_roles>(newRole);
  }
}
