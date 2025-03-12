import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, unauthorized, ok } from '../../helpers/http-helper'
import type { Controller, HttpRequest, HttpResponse, EmailValidator, Authentication } from './login-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(String(email))
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.authentication.auth(String(email), String(password))

      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      if (error instanceof Error) {
        return serverError(error)
      }
      return serverError(new Error('Unknown error'))
    }
  }
}
