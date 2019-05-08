import reducer from '../documentation'

import * as actions from '../../actions/documentation'

describe('documentation reducer', () => {
  it('kintoBlockForDocumentationReceive should store the kintoBlock data, selectedBuildId, selectedKintoBlockId, and set isEndpoint to true', () => {
    const sampleResponseData = {
      name: 'YourPersona',
      id: '1',
      activeBuild: {
        id: '666'
      }
    }
    const newState = reducer(
      undefined,
      actions.kintoBlockForDocumentationReceive('1', sampleResponseData)
    )
    expect(newState.selectedKintoBlockId).toBe('1')
    expect(newState.selectedBuildId).toBe('666')
    expect(newState.selectedKintoBlock.name).toBe('YourPersona')
  })

  it('kintoBlockForDocumentationReceive sets activeBuildId to false if its not received', () => {
    const sampleResponseData = {
      name: 'YourPersona',
      id: '1'
    }
    const newState = reducer(
      undefined,
      actions.kintoBlockForDocumentationReceive('1', sampleResponseData)
    )
    expect(newState.selectedKintoBlockId).toBe('1')
    expect(newState.selectedKintoBlock.name).toBe('YourPersona')
    expect(newState.selectedBuildId).toBe(false)
  })

  it('documentationReceive should store all endpoints in allIds', () => {
    const sampleResponseData = [
      {
        id: '1'
      },
      {
        id: '2'
      }
    ]

    const newState = reducer(
      undefined,
      actions.documentationReceive('1', '2', sampleResponseData)
    )

    expect(newState.allIds.length).toBe(2)
  })

  it('documentationEndpointReceive should store the endpoint information in byId', () => {
    const documentationMockState = {
      allIds: ['1', '2'],
      byId: {}
    }

    const sampleResponseData = {
      id: '2',
      name: 'Ann Takamaki'
    }

    const newState = reducer(
      documentationMockState,
      actions.documentationEndpointReceive('1', '1', '2', sampleResponseData)
    )

    expect(newState.byId['2'].name).toBe('Ann Takamaki')
  })

  it('documentationEndpointProtocolReceive should add the protocol information to the correct endpoint information', () => {
    const documentationMockState = {
      allIds: ['3', '4'],
      byId: {
        '4': {
          name: 'The Velvet Room'
        }
      }
    }

    const sampleResponseData = {
      message: 'I am thou, thou art I...'
    }

    const newState = reducer(
      documentationMockState,
      actions.documentationEndpointProtocolReceive(
        '1',
        '2',
        '4',
        'GRPC',
        sampleResponseData
      )
    )

    expect(newState.byId[4].protocol.message).toBe('I am thou, thou art I...')
    expect(newState.byId[4].name).toBe('The Velvet Room')
  })
})
