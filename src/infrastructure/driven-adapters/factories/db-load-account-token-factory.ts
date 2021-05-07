import {ILoadAccountTokenService} from "@/domain/use-cases/load-account-token-service";
import {LoadAccountTokenServiceImpl} from "@/domain/use-cases/impl/load-account-token-service-impl";
import {JwtAdapter} from "@/infrastructure/driven-adapters/helpers/jwt-adapter";
import {SESSION_SECRET} from "@/application/config/environment";
import {UserMongoAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-adapter";

export const makeDbLoadAccountTokenFactory = (): ILoadAccountTokenService => {
    const jwtAdapter = new JwtAdapter(SESSION_SECRET)
    const userMongoRepositoryAdapter = new UserMongoAdapter()

    return new LoadAccountTokenServiceImpl(
        jwtAdapter,
        userMongoRepositoryAdapter
    )
}
