import { MissingParamError } from '../../presentation/errors'
import type { Validation } from '../../presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissingParamError(`${this.fieldName}`)
    }
    return null
  }
}
