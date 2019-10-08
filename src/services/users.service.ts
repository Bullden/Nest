import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { users, users_roles, roles } from '../entities/users.entity';
import { validRegister } from '../help/register.valid';
import * as bcrypt from 'bcrypt';
import {UserRolesRepository, UsersRepository} from '../repositories'

@Injectable()
export class UsersService {
  constructor(
    public UserRolesRepository: UserRolesRepository,
    public UsersRepository: UsersRepository

  ) {}

  async findAll(res): Promise<UserModel> {
    try {
      const users: any = await this.UsersRepository.findAll()
      if (users.length !== 0) {
        return res.status(200).send({
          users,
        });
      } else {
        return {
          success: false,
          message: 'Users not found',
          data: null,
        };
      }
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(req, res): Promise<users[]> {
    try {
      const user = await this.UsersRepository.findOne({attributes: ['_id', 'name', 'password', 'email'],where: { _id: req }})
      if (user) {
        return res.status(200).send({
          user,
        });
      } else {
        return res.status(200).send({
          success: false,
          message: 'User not found',
          data: null,
        });
      }
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async update(reqBody,reqId, res): Promise<UserModel> {
    try {
      const check = await this.UsersRepository.findOne({where: { _id: reqId }});

      if (check) {
        await this.UsersRepository.update(reqBody, reqId);
        return res.status(200).send({
          message: 'Update is done',
        });
      } else {
        return res.status(200).send({
          success: false,
          message: 'User not found',
          data: null,
        });
      }
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async registerNewUser(req, res): Promise<UserModel> {
    let valid = await validRegister(req);
    if (valid.stateValid) {
      const newUser: any = {
        _id: null,
        email: req.email,
        password: await bcrypt.hash(req.password, 10),
        name: req.name,
      };
      try {
        const matchUser: any = await this.UsersRepository.findOne({
          // attributes: ['_id'],
          where: { email: req.email },
        });

        if (!matchUser) {
          await this.UsersRepository.create(newUser);

          const user: any = await this.UsersRepository.findOne({
            attributes: ['_id'],
            where: { email: newUser.email },
          });
          const newId = user.dataValues._id;
          const newRole = {
            users_id: newId,
            roles_id: 3,
          };
          await this.UserRolesRepository.create(newRole);
          res.status(200).send({
            message: 'User Successfully created',
          });
        } else
          return res.status(401).send({
            success: false,
            errorValid: false,
            message: `User with E-mail:${matchUser.email} alredy exist!`,
          });
      } catch (err) {
        throw new InternalServerErrorException();
      }
    }
  }
}
