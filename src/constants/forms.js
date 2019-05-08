import { pages } from './pages'

export default {
  [pages.dashboardKintoBlocksCreate]: {
    submitLabel: 'Create New KintoBlock',
    formName: 'kintoBlockCreateForm' // must match redux form name
  },
  [pages.dashboardKintoBlocksManage]: {
    submitLabel: 'Save Changes',
    buttonClass: 'secondary',
    formName: 'kintoBlockManageForm',
    toggleVisibility: true // whether the button should switch between save and tag and deploy
  },
  [pages.dashboardDeploymentsManage]: {
    submitLabel: 'Deploy',
    formName: 'deploymentForm',
    buttonClass: 'button-success',
    toggleVisibility: true
  },
  [pages.dashboardDeploymentsCreate]: {
    submitLabel: 'Create New Deployment',
    formName: 'deploymentForm'
  },
  [pages.dashboardDeploymentsDependenciesConfig]: {
    submitLabel: 'Save Changes',
    buttonClass: 'secondary',
    formName: 'deploymentConfigForm'
  },
  [pages.dashboardDeploymentsEnvironmentEdit]: {
    submitLabel: 'Save Changes',
    buttonClass: 'secondary',
    formName: 'DeploymentEnvironmentForm'
  },
  [pages.workspaceCreate]: {
    submitLabel: 'Create New Workspace',
    formName: 'WorkspaceFormCreate'
  },
  [pages.workspaceEdit]: {
    submitLabel: 'Save Changes',
    buttonClass: 'secondary',
    formName: 'WorkspaceFormEdit'
  }
}
