import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import type { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationConposite } from '../../presentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationConposite).toHaveBeenCalledWith(validations)
  })
})
