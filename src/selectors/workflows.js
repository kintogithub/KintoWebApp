import { groupBy } from 'lodash'
import { createSelector } from 'reselect'
import { FAILED, SUCCESS } from 'constants/buildStates'

export const getWorkflowGroups = createSelector(
  state => state.deploymentWorkflow.workflow.workflowData,
  workflowData => {
    if (!workflowData || !workflowData.length)
      return { workflows: [], percentageProgress: 0 }

    const groupedWorkflows = groupBy(workflowData, 'deploymentNumber')

    const workflows = Object.keys(groupedWorkflows)
      .reverse()
      .map(key => {
        const workflowSteps = groupedWorkflows[key].concat()
        const finalStep = workflowSteps.find(step => step.name === 'END')

        return {
          deploymentNumber: workflowSteps[0].deploymentNumber,
          status: finalStep ? finalStep.status : 'RUNNING',
          time: workflowSteps[0].endedAt || workflowSteps[0].createdAt,
          deploymentId: workflowSteps[0].deploymentId,
          groups: getGroups(workflowSteps).subGroups,
          totalSteps: workflowSteps[0].totalSteps,
          hasFinished: !!finalStep,
          finalStep: finalStep ? finalStep : workflowSteps[0]
        }
      })

    const lastWorkflow = workflows[0] ? workflows[0] : { groups: [] }

    const allCurrentStepsCount = lastWorkflow.totalSteps

    const completedStepsCount = lastWorkflow.groups.filter(group =>
      group.steps.find(
        step => step.status === SUCCESS || step.status === FAILED
      )
    ).length

    const percentageProgress =
      lastWorkflow.status === FAILED || lastWorkflow.hasFinished
        ? 100
        : Math.floor((completedStepsCount / allCurrentStepsCount) * 100)

    return {
      workflows,
      percentageProgress,
      workflowStatus: lastWorkflow.status,
      workflowEndTime: lastWorkflow.time
    }
  }
)

const getGroups = data => {
  const initialSubGroup = groupBy(data, 'groupName')
  const subGroups = Object.keys(initialSubGroup).map(key => {
    const groups = initialSubGroup[key].map(step => {
      return {
        kintoBlockName: step.kintoBlockName,
        kintoBlockVersion: step.kintoBlockVersionName,
        text: step.displayName,
        time: step.endedAt || step.createdAt,
        status: step.status,
        stepName: step.name
      }
    })

    return {
      groupName: key,
      steps: groups
    }
  })

  return {
    subGroups
  }
}
