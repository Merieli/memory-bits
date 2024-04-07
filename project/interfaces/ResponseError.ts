interface ErrorInResponse {
    detail: string
    pointer: string
}

/**
 * https://www.rfc-editor.org/rfc/rfc9457.html#name-instance
 */
export interface ResponseError {
    type: string,
    title?: string,
    status: number,
    detail?: string,
    instance: string,
    errors?: ErrorInResponse[],
}