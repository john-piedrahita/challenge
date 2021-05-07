import {IAuthService} from "@/domain/use-cases/auth-service";
import {AuthServiceImpl} from "@/domain/use-cases/impl/auth-service-impl";
import {JwtAdapter} from "@/infrastructure/driven-adapters/helpers/jwt-adapter";
import {SESSION_SECRET} from "@/application/config/environment";
import {BcryptAdapter} from "@/infrastructure/driven-adapters/helpers/bcrypt-adapter";
import {UserMongoAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-adapter";

export const makeAuthFactory = (): IAuthService => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(SESSION_SECRET)
    const userMongoAdapter = new UserMongoAdapter()

    return new AuthServiceImpl(
        jwtAdapter,
        bcryptAdapter,
        userMongoAdapter,
        userMongoAdapter
    )
}
