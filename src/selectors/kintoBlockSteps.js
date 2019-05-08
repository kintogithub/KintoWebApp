import { createSelector } from 'reselect'
import groupBy from 'lodash/groupBy'
import { TAG } from 'constants/version'
import { RUNNING, WORKFLOW_END_STEP_NAME } from 'constants/buildStates'

export const getKintoBlockBuilds = createSelector(
  state => state.kintoBlockSteps,
  state => state.kintoBlocks.byId,
  (kintoBlockSteps, kintoBlocks) => {
    const kb = kintoBlocks[kintoBlockSteps.blockId] || {}
    const versions = kb.versions || []
    const builds = kintoBlockSteps.builds || []
    // sort steps in asc by index
    const sortedBuilds = builds.concat().sort((a, b) => a.index - b.index)
    const groupedBuilds = groupBy(sortedBuilds, b => b.buildId)
    const result = Object.keys(groupedBuilds).map(buildId => {
      const steps = groupedBuilds[buildId]
      const firstStep = steps[0]
      const lastStep = steps[steps.length - 1]
      const workflowStatus =
        lastStep.name === WORKFLOW_END_STEP_NAME ? lastStep.status : RUNNING

      const commit = {
        sha: firstStep.commitSha,
        message: firstStep.commitMessage,
        date: firstStep.commitDate
      }
      const version =
        versions.find(v => v.activeBuildId === buildId && v.type === TAG) || {}
      return {
        id: buildId,
        status: workflowStatus,
        createdAt: firstStep.createdAt,
        commit,
        tag: version.name,
        steps: steps.map(s => ({
          name: s.displayName,
          createdAt: s.createdAt,
          endedAt: s.endedAt,
          status: s.status,
          isEndStep: s.name === WORKFLOW_END_STEP_NAME // add this so it can be removed again before returning
        }))
      }
    })
    // sort desc now to show the latest builds first and take the first 5 builds
    const firstFiveBuilds = result
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)

    firstFiveBuilds.forEach(b => {
      if (b.steps[b.steps.length - 1].isEndStep) {
        b.steps.pop()
      }
    })

    return firstFiveBuilds
  }
)
