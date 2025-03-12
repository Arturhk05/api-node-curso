import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { ValidationConposite } from '../../presentation/helpers/validators/validation-composite'

export const makeSignUpValidation = (): ValidationConposite => {
  return new ValidationConposite([
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new RequiredFieldValidation('passwordConfirmation')
  ])
}
