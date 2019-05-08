import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import pageOptions from './pageOptions'
import kintoBlocks from './kintoBlocks'
import deployments from './deployments'
import workspaces from './workspaces'
import documentation from './documentation'
import auth from './auth'
import kintoBlocksDependenciesCache from './kintoBlocksDependenciesCache'
import currentUser from './currentUser'
import tutorial from './tutorial'
import deploymentLogs from './deploymentLogs'
import kintoBlockSteps from './kintoBlockSteps'
import deploymentWorkflow from './deploymentWorkflow'
import kintoBlockBuilds from './kintoBlockBuilds'
import deploymentEnvironments from './deploymentEnvironments'

const rootReducer = combineReducers({
  form: formReducer,
  router: routerReducer,
  pageOptions,
  kintoBlocks,
  deployments,
  workspaces,
  auth,
  documentation,
  kintoBlocksDependenciesCache,
  currentUser,
  tutorial,
  deploymentLogs,
  kintoBlockSteps,
  deploymentWorkflow,
  kintoBlockBuilds,
  deploymentEnvironments
})
export default rootReducer
