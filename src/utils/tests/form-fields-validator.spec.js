import FormFieldsValidator from '../form-fields-validator'

import {
  EmailValidationError,
  InputFieldRequiredError,
  validationRequiredInput,
  validateEmail
} from '../../validation'

describe('FormFieldsValidator', () => {
  const fieldsValidators = {
    email: [validationRequiredInput, validateEmail],
    password: [validationRequiredInput]
  }

  const formFieldsValidator = new FormFieldsValidator(fieldsValidators)

  describe('validateField', () => {
    const testCases = [
      { inputValue: '', expected: InputFieldRequiredError },
      { inputValue: 'some@thing', expected: EmailValidationError },
      { inputValue: 'some.thing@some.com', expected: null }
    ]

    testCases.forEach((tc) => {
      test('validates a field', () => {
        const validationError = formFieldsValidator.validateField(tc.inputValue, 'email')

        if (tc.expected) {
          return expect(validationError).toBeInstanceOf(tc.expected)
        }

        expect(validationError).toEqual(tc.expected)
      })
    })
  })

  describe('validateAllFields', () => {
    describe('negativeCase', () => {
      const negativeCaseInputFields = {
        email: 'some@thing',
        password: ''
      }

      test('validates all fields', () => {
        const validationErrors = formFieldsValidator.validateAllFields(negativeCaseInputFields)

        expect(validationErrors.email).toBeInstanceOf(EmailValidationError)
        expect(validationErrors.password).toBeInstanceOf(InputFieldRequiredError)
      })

      test('sets fieldsInvalid property to true', () => {
        const validationErrors = formFieldsValidator.validateAllFields(negativeCaseInputFields)

        expect(validationErrors.fieldsInvalid).toBe(true)
      })
    })

    describe('positiveCase', () => {
      const positiveCaseInputFields = {
        email: 'some@thing.com',
        password: 'some'
      }

      test('validates all fields', () => {
        const validationErrors = formFieldsValidator.validateAllFields(positiveCaseInputFields)

        expect(validationErrors.email).toBe(null)
        expect(validationErrors.password).toBe(null)
      })

      test('sets fieldsInvalid property to false', () => {
        const validationErrors = formFieldsValidator.validateAllFields(positiveCaseInputFields)

        expect(validationErrors.fieldsInvalid).toBe(false)
      })
    })
  })
})
