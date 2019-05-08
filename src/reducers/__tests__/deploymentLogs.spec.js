import reducer from '../deploymentLogs'
import * as actions from '../../actions/deploymentLogs'

describe('Deployment Logs Reducer', () => {
  it('deploymentRequestLogsReceive sets the request log', () => {
    const result = reducer(
      undefined,
      actions.deploymentRequestLogsReceive('1', 'test', '0.1.0', ['1', '2'])
    )

    expect(result.requestLogs.length).toBe(2)
  })

  it('deploymentRequestLogsReceive should replace old date with new data', () => {
    const initialState = {
      id: '1',
      envId: 'test',
      appVersion: '0.1.0',
      requestLog: ['1', '2'],
      consoleLogs: {}
    }

    const result = reducer(
      initialState,
      actions.deploymentRequestLogsReceive('2', 'sausage', '9.9.9', ['D', 'E'])
    )

    expect(result.envId).toEqual('sausage')
    expect(result.requestLogs[0]).toEqual('D')
  })

  it('deploymentRequestConsoleLogsReceive sets the initial onboarding data', () => {
    const testData = [{ id: 'B' }, { id: 'A' }]
    const initialState = {
      id: '1',
      envId: 'test',
      appVersion: '0.1.0',
      requestLog: ['1', '2'],
      requestConsoleLogs: {}
    }

    const result = reducer(
      initialState,
      actions.deploymentRequestConsoleLogsReceive(
        '1',
        'test',
        '123',
        '0.1.0',
        testData
      )
    )
    expect(result.requestConsoleLogs['123']).toEqual([{ id: 'B' }, { id: 'A' }])
  })

  it('deploymentConsoleLogsReceive adds to the logs if isPollingRequest is true', () => {
    const initialState = {
      id: '1',
      envId: 'test',
      appVersion: '0.1.0',
      consoleLogs: {
        blockName: 'blockname',
        logs: [1, 2, 3]
      }
    }

    const result = reducer(
      initialState,
      actions.deploymentConsoleLogsReceive(
        '1',
        '0.1.0',
        'env',
        '1',
        'blockname',
        true,
        ['A', 'B']
      )
    )
    expect(result.consoleLogs.logs).toEqual([1, 2, 3, 'A', 'B'])
  })

  it('deploymentConsoleLogReceive removes old block if isPollingRequest is false', () => {
    const initialState = {
      id: '1',
      envId: 'test',
      appVersion: '0.1.0',
      consoleLogs: {
        blockName: 'oldblock',
        logs: [1, 2, 3]
      }
    }

    const result = reducer(
      initialState,
      actions.deploymentConsoleLogsReceive(
        '1',
        '0.1.0',
        'env',
        '1',
        'newBlock',
        false,
        ['A', 'B']
      )
    )
    expect(result.consoleLogs.logs).toEqual(['A', 'B'])
  })
})
