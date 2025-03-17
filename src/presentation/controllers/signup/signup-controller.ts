import { EmailInUseError } from '../../errors'
import { badRequest, serverError, ok, forbidden } from '../../helpers/http/http-helper'
import type { HttpRequest, HttpResponse, Controller, AddAccount, Validation, Authentication } from './signup-controller-protocols'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount, private readonly validation: Validation, private readonly authentication: Authentication) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const accoumt = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!accoumt) {
        return forbidden(new EmailInUseError())
      }
      const accesToken = await this.authentication.auth({ email, password })
      return ok({ accesToken })
    } catch (error) {
      if (error instanceof Error) {
        return serverError(error)
      }
      return serverError(new Error('Unknown error'))
    }
  }
}
