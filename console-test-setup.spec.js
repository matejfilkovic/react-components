import sinon from 'sinon'

/**
 * Since react will console.error propType warnings,that which we'd rather have
 * as errors, we use sinon.js to stub it into throwing these warning as errors
 * instead.
 */
beforeEach(() => {
  const errorStub = sinon.stub(console, 'error')
  errorStub.callsFake((warning) => {
    throw new Error(warning)
  })
})

/* eslint-disable no-console */
afterEach(() => {
  console.error.restore()
})
/* eslint-enable no-console */
