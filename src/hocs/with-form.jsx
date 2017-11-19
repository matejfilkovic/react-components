import React from 'react'
import PropTypes from 'prop-types'

import FormFieldsValidator from '../utils/form-fields-validator'

export default function withForm(
  Component,
  fieldsValidators
) {
  const formsFieldsValidator = new FormFieldsValidator(fieldsValidators)

  class WithForm extends React.Component {
    constructor(props) {
      super(props)

      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
      this.onBlur = this.onBlur.bind(this)
      this.onFocus = this.onFocus.bind(this)
    }

    onBlur(event) {
      const { id } = event.target

      const value = this.props.fields[id]

      const validationError =
        formsFieldsValidator.validateField(
          value,
          id,
          this.props.fields
        )

      this.props.setValidationError({ id, validationError })
    }

    onFocus(event) {
      const { id } = event.target

      this.props.setValidationError({ id, validationError: null })
    }

    onChange(event) {
      const { value, id } = event.target

      this.props.setFieldValue({ id, value })
    }

    onSubmit(event) {
      event.preventDefault()

      const {
        fields,
        setValidationErrors,
        onValidFieldsSubmit
      } = this.props

      const validationErrors = formsFieldsValidator.validateAllFields(fields)
      if (validationErrors.fieldsInvalid) {
        return setValidationErrors(validationErrors)
      }

      setValidationErrors({})

      return onValidFieldsSubmit(fields)
    }

    render() {
      return (
        <Component
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onSubmit={this.onSubmit}
          {...this.props}
        />
      )
    }
  }

  WithForm.propTypes = {
    onValidFieldsSubmit: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    setValidationError: PropTypes.func.isRequired,
    setValidationErrors: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    validationErrors: PropTypes.object.isRequired
  }

  return WithForm
}
