import * as dotenv from 'dotenv';
dotenv.config();

export default {
  Production: {
    PORT: process.env.PORT || 4201,
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME || 'users',
    DB_PASSWORD: process.env.DB_PASSWORD || 'denis',
    DB_PORT: process.env.DB_PORT || 3306,
    DB_USER: process.env.DB_USER || 'users',
    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
    // ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'fgfdhVGFV06fg7q87FGVnn',
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  },
};
