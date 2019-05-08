import { pages, urls } from './pages'
import { DEPLOYMENT, KINTOBLOCK } from './switcherTypes'

const DeploymentsText = {
  component: 'LinkContainer',
  text: 'Deployments',
  url: urls[pages.dashboardDeploymentsList]
}

const KintoBlocksText = {
  component: 'LinkContainer',
  text: 'KintoBlocks',
  url: urls[pages.dashboardKintoBlocksList]
}

//TODO: improve the LinkContainer component, add in config what it needs from store

export default {
  [pages.dashboardKintoBlocksList]: [KintoBlocksText],
  [pages.dashboardKintoBlocksCreate]: [
    KintoBlocksText,
    {
      component: 'Link',
      text: 'Create New KintoBlock'
    }
  ],
  [pages.dashboardKintoBlocksTypeSelect]: [
    KintoBlocksText,
    {
      component: 'Link',
      text: 'Create New KintoBlock'
    }
  ],
  [pages.dashboardKintoBlocksManage]: [
    KintoBlocksText,
    {
      component: 'KintoSwitcherContainer',
      type: KINTOBLOCK
    },
    {
      component: 'KintoBlockTagAndBranchDropDownContainer',
      url: urls[pages.dashboardKintoBlocksManage]
    }
  ],
  [pages.dashboardKintoBlocksBuildLogs]: [
    KintoBlocksText,
    {
      component: 'Link',
      text: 'Build Logs'
    }
  ],
  [pages.dashboardDeploymentsList]: [DeploymentsText],
  [pages.dashboardDeploymentsCreate]: [
    DeploymentsText,
    {
      component: 'Link',
      text: 'Create New Deployment'
    }
  ],
  [pages.dashboardDeploymentsManage]: [
    DeploymentsText,
    {
      component: 'KintoSwitcherContainer',
      type: DEPLOYMENT
    }
  ],
  [pages.dashboardDeploymentsChangelogs]: [
    DeploymentsText,
    {
      component: 'KintoSwitcherContainer',
      type: DEPLOYMENT
    },
    {
      component: 'Link',
      text: 'Changelogs'
    }
  ],
  //TODO hack to show same breadcrumb on parent and child
  [pages.dashboardDocumentation]: [
    KintoBlocksText,
    {
      component: 'KintoSwitcherContainer',
      type: KINTOBLOCK
    },
    {
      component: 'KintoBlockTagAndBranchDropDownContainer',
      url: urls[pages.dashboardDocumentation],
      isDocumentation: true
    },
    {
      component: 'Link',
      text: 'Documentation'
    }
  ],
  [pages.dashboardDocumentationEndpoints]: [
    KintoBlocksText,
    {
      component: 'KintoSwitcherContainer',
      type: KINTOBLOCK
    },
    {
      component: 'KintoBlockTagAndBranchDropDownContainer',
      url: urls[pages.dashboardDocumentation],
      isDocumentation: true
    },
    {
      component: 'Link',
      text: 'Documentation'
    }
  ],
  [pages.dashboardDeploymentsPathDocumentation]: [
    DeploymentsText,
    {
      component: 'KintoSwitcherContainer',
      type: DEPLOYMENT
    },
    {
      component: 'DeploymentSelectedEnvironmentNameTextContainer'
    },
    {
      component: 'SelectedKintoBlockNameTextContainer'
    },
    {
      component: 'Link',
      text: 'Documentation'
    }
  ],
  [pages.dashboardDeploymentsPathDocumentationEndpoints]: [
    DeploymentsText,
    {
      component: 'KintoSwitcherContainer',
      type: DEPLOYMENT
    },
    {
      component: 'DeploymentSelectedEnvironmentNameTextContainer'
    },
    {
      component: 'SelectedKintoBlockNameTextContainer'
    },
    {
      component: 'Link',
      text: 'Documentation'
    }
  ],
  [pages.dashboardDeploymentsRequestLogs]: [
    DeploymentsText,
    {
      component: 'KintoSwitcherContainer',
      type: DEPLOYMENT
    },
    {
      component: 'DeploymentEnvironmentReleaseSwitcherContainer',
      url: urls[pages.dashboardDeploymentsRequestLogs]
    },
    {
      component: 'Link',
      text: 'View Requests'
    }
  ],
  [pages.dashboardDeploymentsConsoleLogs]: [
    DeploymentsText,
    {
      component: 'KintoSwitcherContainer',
      type: DEPLOYMENT
    },
    {
      component: 'Link',
      text: 'View Console Logs'
    }
  ],
  [pages.dashboardDeploymentsDependenciesConfig]: [
    DeploymentsText,
    {
      component: 'KintoSwitcherContainer',
      type: DEPLOYMENT
    },
    {
      component: 'EnvironmentSwitcherContainer'
    }
  ],
  [pages.workspaceCreate]: [
    {
      component: 'Link',
      text: 'Workspaces'
    },
    {
      component: 'Link',
      text: 'Create New Workspace'
    }
  ],
  [pages.workspaceEdit]: [
    {
      component: 'Link',
      text: 'Workspaces'
    },
    {
      component: 'WorkspaceSwitcherContainer'
    }
  ],
  [pages.dashboardServices]: [
    {
      component: 'Link',
      text: 'Services'
    }
  ],
  [pages.dashboardHome]: [
    {
      component: 'Link',
      text: 'Overview'
    }
  ]
}
