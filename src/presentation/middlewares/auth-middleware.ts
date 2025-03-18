import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'
import type { HttpRequest, HttpResponse } from '../protocols'
import type { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve(forbidden(new AccessDeniedError()))
  }
}
