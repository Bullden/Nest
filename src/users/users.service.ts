import { Injectable, Inject, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { users, users_roles, roles } from './users.entity';
import * as bcrypt from "bcrypt"


interface User {
  email: string,
  password: string,
  name: string,
}

@Injectable()
export class UsersService {
  constructor(

    @Inject('USERS_REPOSITORY') private readonly USERS_REPOSITORY: typeof users,
    @Inject('USER_ROLES_REPO') private readonly USER_ROLES_REPO: typeof users_roles

  ) { }

  async findAll(res): Promise<any> {
    try {
      const users: any = await this.USERS_REPOSITORY.findAll<users>({
        include: [roles]
      });
      if (users.length !== 0) {
        return res.status(200).send({
          success: true,
          users
        });
      } else {
        return new NotFoundException
      }
    } catch (err) {
      throw new InternalServerErrorException
    }
  }

  async findOne(req, res): Promise<any> {
    try {
      const user = await this.USERS_REPOSITORY.findOne<users>({ attributes: ['_id', 'name', 'password', 'email'], where: { _id: req.params._id } });
      if (user) {
        return res.status(200).send({
          success: true,
          user
        });
      } else {
        return new NotFoundException

      }
    } catch (err) {
      throw new InternalServerErrorException
    }
  }

  async update(req, res): Promise<any> {
    try {
      const check = await this.USERS_REPOSITORY.findOne<users>({ where: { _id: req.params.id } });

      if (check) {

        await this.USERS_REPOSITORY.update<users>(req.body, { where: { _id: req.params.id } });
        return res.status(200).send({
          success: true,
          message: 'Update is done'
        });
      } else {
        return new NotFoundException

      }
    } catch (err) {
      throw new InternalServerErrorException
    }
  }

  async registerNewUser(req, res): Promise<any> {
    const newUser: any = {
      _id: null,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      name: req.body.name,
    };
    try {
      const matchUser: any = await this.USERS_REPOSITORY.findOne<any>({attributes: ['_id'], where: { email: req.body.email } })

      if (!matchUser) {
        await this.USERS_REPOSITORY.create<users>(newUser);
        
      
        const user: any = await this.USERS_REPOSITORY.findOne<users>({ attributes: ['_id'], where: { email: newUser.email } });
        const newId = user.dataValues._id
        const newRole = {
          users_id: newId,
          roles_id: 3
        }
        await this.USER_ROLES_REPO.create<users_roles>(newRole);
        res.status(200).send({
          success: true,
          message: "User Successfully created"
        });
      } else return new UnauthorizedException
    } catch (err) {
      throw new InternalServerErrorException
    }
  }
}