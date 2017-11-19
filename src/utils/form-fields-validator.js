export default class FormFieldsValidator {

  /**
   *
   * @param {Map<string, Array<function>>} fieldsValidators
   */
  constructor(fieldsValidators) {
    this.fieldsValidators = fieldsValidators
  }

  validateField(value, fieldId, allFields) {
    const fieldValidators = this.fieldsValidators[fieldId]

    /**
     * Validate for all rules and return the result of
     * the first one which fails, or null if all rules
     * are satisfied.
    */
    const validationError = (
      fieldValidators
        .map(fieldValidator => fieldValidator(value, allFields))
        .reduce((acc, cur) => {
          if (acc) return acc

          return cur
        }, null)
    )

    return validationError
  }

  validateAllFields(allFields) {
    const validationErrors =
      Object.keys(this.fieldsValidators)
        .map((fieldId) => {
          return { [fieldId]: this.validateField(allFields[fieldId], fieldId, allFields) }
        })
        .reduce((acc, validationError) => (
          Object.assign({}, acc, validationError)
        ), {})

    validationErrors.fieldsInvalid =
        Object.keys(validationErrors)
          .some(fieldId => validationErrors[fieldId])

    return validationErrors
  }
}
