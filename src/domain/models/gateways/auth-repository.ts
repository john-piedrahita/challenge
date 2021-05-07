export interface IAuthRepository {
    auth(data: IAuthRepository.Params): Promise<IAuthRepository.Result>
}

export namespace IAuthRepository {
    export type Params = {
        email: string
        password: string
    }

    export type Result = {
        accessToken: string
        name: string
    }
}
