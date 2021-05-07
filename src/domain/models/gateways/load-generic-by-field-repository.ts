export interface ILoadUserByFieldRepository {
    loadUserByFieldRepository: (value: string) => Promise<ILoadUserByFieldRepository.Result>
}

export namespace ILoadUserByFieldRepository {
    export type Result = {
        id: string,
        fullName: string,
        email: string,
        password: string
    }
}
