import reducer from '../deploymentWorkflow'
import * as actions from '../../actions/deploymentWorkflow'

describe('Deployment Workflow Reducer', () => {
  const defaultState = {
    workflow: { workflowData: [], appId: '', envId: '' }
  }

  it('deploymentWorkflow reducer sets the received data with the appId and envId', () => {
    const result = reducer(
      defaultState,
      actions.deploymentWorkflowReceive([{ workflow: 1 }], 'appId', 'envId')
    )

    expect(result.workflow).toEqual({
      workflowData: [{ workflow: 1 }],
      appId: 'appId',
      envId: 'envId'
    })
  })
})
