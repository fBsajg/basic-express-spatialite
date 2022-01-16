//interfaces
export interface IGeoJsonObject {
    name: string,
    type: string,
    features: never[],
}

export interface IPgConnectionParams<T, N> {
    user: T | undefined,
    host: T | undefined,
    database: T | undefined,
    password: T | undefined,
    port: N
}

export interface IRouteApiObject {
    coordinates: number[][],
    language: string,
    instructions?: boolean,
    preference: TRoutePreference,
}

export interface ITransactionsCredentials<T> {
    username: T,
    password: T,
    connectionString: T,
}

//types
export type TRoutePreference = "shortest" | "fastest" | "recommended"
