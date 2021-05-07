import {AddUserParams, UserModel} from "@/domain/models/user";

export interface IUserRepository {
    addUserRepository: (data: AddUserParams) => Promise<UserModel | boolean>
}
