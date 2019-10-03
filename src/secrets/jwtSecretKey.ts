import config from '../enviroment/config'

export const jwtConstants = {
    secret: config.Production.JWT_ENCRYPTION,
};