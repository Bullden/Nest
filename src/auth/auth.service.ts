import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { users, roles } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as jwtr from 'jwt-then';
import env from '../config/config'

@Injectable()
export class AuthService {
  private test: any;

  public jwtService: JwtService;

  @Inject('AUTH_REPOSITORY') private readonly AUTH_REPOSITORY: typeof users;

  constructor(config: ConfigService) {
    this.test = config.get('APP');
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user: any = await this.AUTH_REPOSITORY.findOne<users>({
      where: { email: email },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const matchPasswords = await bcrypt.compare(
      password,
      user.dataValues.password,
    );
    if (user && matchPasswords) {
      return user.dataValues;
    } else throw new HttpException('Email or password incorrect', 401);
  }

  async login(user: any) {
    let permissions: any[] = [];

    await this.AUTH_REPOSITORY.findAll<users>({
      where: { email: user.email },
      include: [
        {
          model: roles,
        },
      ],
    }).then((rolen: any) =>
      rolen.forEach(el => {
        el.roleId.forEach(element => {
          permissions.push(element.dataValues.roleName);
        });
      }),
    );

    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      permissions: permissions,
    };
    const access_token = await jwtr.sign(payload, env.Production.ACCESS_TOKEN);

    return {
      token: access_token,
    };
  }
}
