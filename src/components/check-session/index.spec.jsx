import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import CheckSession from './index'

describe('<CheckSession />', () => {
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

  describe('componentDidMount', () => {
    describe('getSession', () => {
      test('redirects to a returned route ', () => {
        const redirectionRoute = '/app'

        getSessionStub.returns(Promise.resolve(redirectionRoute))

        const wrapper = shallow(
          <CheckSession
            getSession={getSessionStub}
            history={history}
          >
            <div>Some child</div>
          </CheckSession>, {
            disableLifecycleMethods: true
          }
        )

        const inst = wrapper.instance()

        return (
          inst.componentDidMount()
            .then(() => {
              expect(historyStub.calledWith(redirectionRoute)).toBe(true)
            })
        )
      })
    })
  })

  describe('render', () => {
    test('renders loader if session checking is in progress', () => {
      const wrapper = shallow(
        <CheckSession
          getSession={() => Promise.resolve()}
          history={history}
          renderLoader={() => <span />}
        >
          <div>Some child</div>
        </CheckSession>, {
          disableLifecycleMethods: true
        }
      )

      expect(wrapper.find('span').exists()).toBe(true)
    })

    test('renders a child if session check is not in progress', () => {
      const wrapper = shallow(
        <CheckSession
          getSession={() => Promise.resolve()}
          history={history}
          renderLoader={() => <span />}
        >
          <div>Some child</div>
        </CheckSession>, {
          disableLifecycleMethods: true
        }
      )

      wrapper.setState({ sessionCheckingInProgress: false })

      expect(wrapper.find('div').exists()).toBe(true)
      expect(!wrapper.find('span').exists()).toBe(true)
    })
  })
})
