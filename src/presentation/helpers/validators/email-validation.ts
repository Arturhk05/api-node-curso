import { InvalidParamError } from '../../errors'
import type { EmailValidator } from '../../protocols/email-validator'
import type { Validation } from '../../protocols/validation'

export class EmailValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly emailValidator: EmailValidator) {}

  validate (input: any): Error | null {
    const isValid = this.emailValidator.isValid(String(input[this.fieldName]))
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
