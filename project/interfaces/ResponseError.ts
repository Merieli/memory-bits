interface ErrorInResponse {
    detail: string
    pointer: string
}

export interface ResponseError {
    type: string
    title: string
    detail?: string
    errors: ErrorInResponse[]
}