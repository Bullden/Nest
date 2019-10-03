import { AuthRepository,BooksRepository, UserRolesRepository, UsersRepository } from './repositories';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './db.connection/db-module';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './secrets/jwtSecretKey';
import { UsersController, AuthController, BooksController } from './controllers';
import { LocalStrategy, JwtStrategy } from './common';
import { UsersService, AuthService, BooksService } from './services';
import { usersProviders, authProviders, rolesProviders, usersrolesProviders, booksProviders } from './providers';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),],
  controllers: [BooksController, UsersController, AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    BooksService,
    ...booksProviders,
    UsersService,
    ...usersProviders,
    AuthService,
    ...authProviders,
    ...rolesProviders,
    ...usersrolesProviders,
    AuthRepository,
    BooksRepository,
    UserRolesRepository,
    UsersRepository,
  ]
}
)
export class AppModule { }
