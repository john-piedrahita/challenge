import {AddUserParams, UserModel} from "@/domain/models/user";

export interface IUserService {
    addUserService: (data: AddUserParams) => Promise<UserModel | boolean>
}
