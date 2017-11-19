import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Protected from './index'

describe('<Protected />', () => {
  const history = { push() {} }
  let getSessionStub
  let historyStub

  beforeEach(() => {
    getSessionStub = sinon.stub()
    historyStub = sinon.stub(history, 'push')
  })

  afterEach(() => {
    historyStub.restore()
  })

  test('renders child if user is authenticated', () => {
    const wrapper = shallow(
      <Protected
        isAuthenticated
        registrationStatus={{}}
        getSession={() => {}}
        history={history}
      >
        <span />
      </Protected>
    )

    expect(wrapper.find('span').exists()).toBe(true)
  })

  describe('componentDidMount', () => {
    describe("user isn't authenticated", () => {
      let wrapper

      beforeEach(() => {
        wrapper = shallow(
          <Protected
            isAuthenticated={false}
            getSession={getSessionStub}
            history={history}
          >
            <span />
          </Protected>, {
            disableLifecycleMethods: true
          }
        )
      })

      test('tries to obtain a session', () => {
        getSessionStub.returns(Promise.resolve())
        return (
          wrapper.instance().componentDidMount()
            .then(() => {
              expect(getSessionStub.callCount).toBe(1)
              expect(historyStub.callCount).toBe(0)
            })
        )
      })

      test('redirects to / if session can not be obtained', () => {
        getSessionStub.returns(Promise.reject())

        return (
          wrapper.instance().componentDidMount()
            .then(() => {
              expect(historyStub.calledWith('/')).toBe(true)
            })
        )
      })
    })

  })

  describe('componentWillReceiveProps', () => {
    test('redirects to / if user logs out', () => {
      const wrapper = shallow(
        <Protected
          isAuthenticated
          history={history}
          getSession={() => {}}
        >
          <span />
        </Protected>, {
          disableLifecycleMethods: true
        }
      )

      wrapper.instance().componentWillReceiveProps({ isAuthenticated: false })

      expect(historyStub.calledWith('/')).toBe(true)
    })
  })
})
