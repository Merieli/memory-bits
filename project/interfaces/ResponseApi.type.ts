import type { ResponseError } from "./ResponseError"

export interface ResponseSuccess<T> {
    data: T
}

export type ResponseApi<T> = ResponseSuccess<T> | ResponseError