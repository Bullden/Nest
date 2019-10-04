import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { users, roles } from '../entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
// import { ConfigService } from '../enviroment/config.service';
import * as jwtr from 'jwt-then';
import env from '../enviroment/config'
import { validLogin } from '../help/login.valid';
import { AuthRepository } from './../repositories'
import { jwtConstants } from '../secrets/jwtSecretKey';

@Injectable()
export class AuthService {
  public jwtService: JwtService;

  constructor(public AuthRepository : AuthRepository) {}

  async validateUser(email: string, password: string): Promise<any> {
    
    let loginValid = await validLogin(email,password)

    // console.log(loginValid.stateValid)
    if(loginValid.stateValid === 3){
      throw new HttpException(loginValid.errorObj, 404);
    }

    const user: any = await this.AuthRepository.findOne(email)

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

    permissions = await this.AuthRepository.findAll(user.email, permissions)

    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      permissions: permissions,
    };
    const access_token = await jwtr.sign(payload, jwtConstants.secret);

    return {
      token: access_token,
    };
  }
}
