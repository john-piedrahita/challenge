import {IAuthService} from "@/domain/use-cases/auth-service";
import {IEncrypt} from "@/domain/use-cases/helpers/encrypt";
import {IHashCompare} from "@/domain/use-cases/helpers/hash-compare";
import {ILoadUserByFieldRepository} from "@/domain/models/gateways/load-generic-by-field-repository";
import {IUpdateTokenRepository} from "@/domain/models/gateways/update-generic-repository";

export class AuthServiceImpl implements IAuthService {

    constructor(
        private readonly encrypt: IEncrypt,
        private readonly hashCompare: IHashCompare,
        private readonly updateAccessTokenRepository: IUpdateTokenRepository,
        private readonly loadUserByEmailRepository: ILoadUserByFieldRepository
    ) {
    }

    async auth(data: IAuthService.Params): Promise<IAuthService.Result> {
        const account = await this.loadUserByEmailRepository.loadUserByFieldRepository(data.email)

        if (account) {
            const isValid = await this.hashCompare.compare(data.password, account.password)
            if (isValid) {
                const accessToken = await this.encrypt.encrypt(account.id)
                await this.updateAccessTokenRepository.updateTokenRepository(account.id, accessToken)
                return {
                    accessToken,
                    fullName: account.fullName
                }
            }
        }
        return null
    }
}
