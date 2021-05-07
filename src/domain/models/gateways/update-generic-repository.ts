export interface IUpdateTokenRepository {
    updateTokenRepository?: (id: string, value: string) => Promise<void>
}
