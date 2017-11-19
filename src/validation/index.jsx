import { ExtendableError } from '../utils/error'

export class EmailValidationError extends ExtendableError {}
export class InputFieldRequiredError extends ExtendableError {}

export function validationRequiredInput(inputValue) {
  if (!inputValue) return new InputFieldRequiredError()

  return null
}

export function validateEmail(email) {
  /* eslint-disable max-len */
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  /* eslint-enable max-len */

  if (!re.test(email)) return new EmailValidationError()

  return null
}
