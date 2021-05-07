import {IHash} from "@/domain/use-cases/helpers/hash";
import {IUserService} from "@/domain/use-cases/user-service";
import {AddUserParams, UserModel} from "@/domain/models/user";
import {IUserRepository} from "@/domain/models/gateways/user-repository";
import {ICheckUserByEmailRepository} from "@/domain/models/gateways/check-user-by-email-repository";

export class UserServiceImpl implements IUserService {

    constructor(
        private readonly hash: IHash,
        private readonly addUserRepository: IUserRepository,
        private readonly checkUserByEmailRepository: ICheckUserByEmailRepository,
    ) {
    }

    async addUserService(data: AddUserParams): Promise<boolean | UserModel> {
        const userExist = await this.checkUserByEmailRepository.checkUserRepository(data.email)
        if (userExist) return false

        if (!userExist) {
            const hashPassword = await this.hash.hash(data.password)
            const user = await this.addUserRepository.addUserRepository({ ...data, password: hashPassword })

            if (user) return user
        }

        return null
    }
}
