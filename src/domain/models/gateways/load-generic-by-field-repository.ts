export interface ILoadUserByFieldRepository {
    loadGenericByFieldRepository: (value: string) => Promise<ILoadUserByFieldRepository.Result>
}

export namespace ILoadUserByFieldRepository {
    export type Result = {
        id: string,
        name: string,
        email?: string,
        password: string,
        linkReset?: string
    }
}
