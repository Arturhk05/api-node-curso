import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators/index'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new EmailValidation('email', new EmailValidatorAdapter())
  ])
}
