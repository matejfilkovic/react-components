import React from 'react'

export default function formStore(
  FormComponent,
  fieldsInitialValues
) {
  class FormStore extends React.Component {
    constructor(props) {
      super(props)

      /**
       * To avoid React's warning for switching between
       * controlled and uncontrolled inputs, we need
       * to provide initial values for fields.
       */
      this.state = {
        fields: fieldsInitialValues,
        validationErrors: {}
      }

      this.setFieldValue = this.setFieldValue.bind(this)
      this.setValidationError = this.setValidationError.bind(this)
      this.setValidationErrors = this.setValidationErrors.bind(this)
    }

    setFieldValue({ id, value }) {
      this.setState({
        fields: Object.assign(
          {},
          this.state.fields,
          { [id]: value }
        )
      })
    }

    setValidationError({ id, validationError }) {
      this.setState({
        validationErrors: Object.assign(
          {},
          this.state.validationErrors,
          { [id]: validationError }
        )
      })
    }

    setValidationErrors(validationErrors) {
      this.setState({ validationErrors })
    }

    render() {
      return (
        <FormComponent
          setFieldValue={this.setFieldValue}
          setValidationError={this.setValidationError}
          setValidationErrors={this.setValidationErrors}
          fields={this.state.fields}
          validationErrors={this.state.validationErrors}
          {...this.props}
        />
      )
    }
  }

  return FormStore
}
