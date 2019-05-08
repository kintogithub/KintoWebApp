import keyBy from 'lodash/keyBy'
import { createSelector } from 'reselect'
import { getDependencyInfo } from '../helpers/kintoBlocksHelper'

export const getDependenciesFactory = () => {
  return createSelector(
    (_, dependencies) => dependencies,
    state => state.kintoBlocksDependenciesCache,
    (dependencies, dependenciesCache) => {
      if (!dependencies || !dependencies.length) {
        return {}
      }
      const result = dependencies.map(d => {
        return getDependencyInfo(d, dependenciesCache)
      })
      return keyBy(result, 'blockId')
    }
  )
}
