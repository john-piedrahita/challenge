import {IUserService} from "@/domain/use-cases/user-service";
import {UserServiceImpl} from "@/domain/use-cases/impl/user-service-impl";
import {BcryptAdapter} from "@/infrastructure/driven-adapters/helpers/bcrypt-adapter";
import {UserMongoAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-adapter";

export const makeDbAddUserFactory = (): IUserService => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const userMongoRepositoryAdapter = new UserMongoAdapter()

    return new UserServiceImpl(
        bcryptAdapter,
        userMongoRepositoryAdapter,
        userMongoRepositoryAdapter
    )
}
