import { Controller, Get, Post, Req, Res, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import * as Request1 from "@nestjs/common"

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

    @Get()
    findAll(@Res() res: Response): any {
        return this.usersService.findAll(res);
    }

    @Get('/:id')
    findOne(@Req() req: Request, @Res() res: Response): any {
        return this.usersService.findOne(req, res);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    update(@Req() req: Request, @Res() res: Response): any {
        return this.usersService.update(req, res);
    }

    @Post('/registration')
    registerNewUser(@Req() req: Request, @Res() res: Response): any {
        return this.usersService.registerNewUser(req, res);
    }

}
