export const pages = {
  dashboardKintoBlocksList: 'DASHBOARD_KINTO_BLOCKS_LIST',
  dashboardKintoBlocksCreate: 'DASHBOARD_KINTO_BLOCKS_CREATE',
  dashboardKintoBlocksTypeSelect: 'DASHBOARD_KINTO_BLOCKS_TYPE_SELECT',
  dashboardKintoBlocksManage: 'DASHBOARD_KINTO_BLOCKS_VIEW',
  dashboardKintoBlocksBuildLogs: 'DASHBOARD_KINTO_BLOCKS_LOGS',
  dashboardDeploymentsList: 'DASHBOARD_DEPLOYMENTS_LIST',
  dashboardDeploymentsCreate: 'DASHBOARD_DEPLOYMENTS_CREATE',
  dashboardDeploymentsManage: 'DASHBOARD_DEPLOYMENTS_MANAGE',
  dashboardDeploymentsRequestLogs: 'DASHBOARD_DEPLOYMENTS_REQUEST_LOGS',
  dashboardDeploymentsConsoleLogs: 'DASHBOARD_DEPLOYMENTS_CONSOLE_LOGS',
  dashboardDeploymentsChangelogs: 'DASHBOARD_DEPLOYMENTS_CHANGELOGS',
  dashboardDocumentation: 'DASHBOARD_DOCUMENTATION',
  dashboardDeploymentsPathDocumentation:
    'DASHBOARD_DEPLOYMENT_PATH_DOCUMENTATION',
  dashboardDeploymentsPathDocumentationEndpoints:
    'DASHBOARD_DEPLOYMENT_PATH_DOCUMENTATION_ENDPOINTS',
  dashboardDocumentationEndpoints: 'DASHBOARD_DOCUMENTATION_ENDPOINTS',
  dashboardDeploymentsDependenciesConfig:
    'DASHBOARD_DEPLOYMENTS_DEPENDENCIES_CONFIG',
  dashboardHome: 'DASHBOARD_HOME',
  dashboardAnalytics: 'DASHBOARD_ANALYTICS',
  dashboardServices: 'DASHBOARD_SERVICES',
  workspaceCreate: 'WORKSPACE_CREATE',
  workspaceEdit: 'WORKSPACE_EDIT'
}

export const urls = {
  [pages.dashboardKintoBlocksList]:
    '/app/dashboard/:workspaceId/kintoblocks/list',
  [pages.dashboardKintoBlocksCreate]:
    '/app/dashboard/:workspaceId/kintoblocks/create',
  [pages.dashboardKintoBlocksTypeSelect]:
    '/app/dashboard/:workspaceId/kintoblocks/typeselect',
  [pages.dashboardKintoBlocksManage]:
    '/app/dashboard/:workspaceId/kintoblocks/:id/versions/:version/:type',
  [pages.dashboardKintoBlocksBuildLogs]:
    '/app/dashboard/:workspaceId/kintoblocks/:id/:name/builds/:buildId',
  [pages.dashboardDocumentation]:
    '/app/dashboard/:workspaceId/kintoblocks/:id/version/:version/:type/endpoints/documentation',
  [pages.dashboardDocumentationEndpoints]:
    '/app/dashboard/:workspaceId/kintoblocks/:id/version/:version/:type/endpoints/documentation/:endpointId',
  [pages.dashboardDeploymentsPathDocumentation]:
    '/app/dashboard/:workspaceId/deployments/:depId/environment/:envId/kintoblock/:id/versions/:version/:type/documentation',
  [pages.dashboardDeploymentsPathDocumentationEndpoints]:
    '/app/dashboard/:workspaceId/deployments/:depId/environment/:envId/kintoblock/:id/versions/:version/:type/documentation/:endpointId',
  [pages.dashboardDeploymentsList]:
    '/app/dashboard/:workspaceId/deployments/list',
  [pages.dashboardDeploymentsCreate]:
    '/app/dashboard/:workspaceId/deployments/create',
  [pages.dashboardDeploymentsManage]:
    '/app/dashboard/:workspaceId/deployments/:id/environments/:envId',
  [pages.dashboardDeploymentsChangelogs]:
    '/app/dashboard/:workspaceId/deployments/:id/changelogs',
  [pages.dashboardDeploymentsRequestLogs]:
    '/app/dashboard/:workspaceId/deployments/:id/versions/:version/environment/:envId/releases/:releaseNumber/requestLogs',
  [pages.dashboardDeploymentsConsoleLogs]:
    '/app/dashboard/:workspaceId/deployments/:id/versions/:version/environment/:envId/releases/:releaseNumber/consoleLogs',
  [pages.dashboardDeploymentsDependenciesConfig]:
    '/app/dashboard/:workspaceId/deployments/:id/versions/:version/config/:envId',
  [pages.dashboardHome]: '/app/dashboard/:workspaceId',
  [pages.dashboardAnalytics]: '/app/dashboard/:workspaceId/analytics',
  [pages.dashboardServices]: '/app/dashboard/:workspaceId/services',
  [pages.workspaceCreate]: '/app/dashboard/:workspaceId/create',
  [pages.workspaceEdit]: '/app/dashboard/:workspaceId/edit'
}

export const dashboardSidebar = [
  {
    key: pages.dashboardHome,
    title: 'Overview',
    isOverview: true,
    className: 'home',
    url: urls[pages.dashboardHome],
    group: 1
  },
  {
    title: 'Deployments',
    className: 'kintoapps',
    isOverview: false,
    url: urls[pages.dashboardDeploymentsList],
    addUrl: urls[pages.dashboardDeploymentsCreate],
    children: [
      {
        key: pages.dashboardDeploymentsList,
        url: urls[pages.dashboardDeploymentsList]
      },
      {
        key: pages.dashboardDeploymentsCreate,
        url: urls[pages.dashboardDeploymentsCreate]
      },
      {
        key: pages.dashboardDeploymentsManage,
        url: urls[pages.dashboardDeploymentsManage]
      },
      {
        key: pages.dashboardDeploymentsDependenciesConfig,
        url: urls[pages.dashboardDeploymentsDependenciesConfig]
      },
      {
        key: pages.dashboardDeploymentsChangelogs,
        url: urls[pages.dashboardDeploymentsChangelogs]
      },
      {
        key: pages.dashboardDeploymentsRequestLogs,
        url: urls[pages.dashboardDeploymentsRequestLogs]
      },
      {
        key: pages.dashboardDeploymentsConsoleLogs,
        url: urls[pages.dashboardDeploymentsConsoleLogs]
      },
      {
        key: pages.dashboardDeploymentsPathDocumentation,
        url: urls[pages.dashboardDeploymentsPathDocumentation]
      }
    ],
    group: 1
  },
  {
    key: pages.dashboardAnalytics,
    title: 'Analytics',
    className: 'analytics',
    isOverview: false,
    disableForProd: true,
    url: urls[pages.dashboardAnalytics],
    group: 1
  },
  {
    title: 'KintoBlocks',
    className: 'kintoblocks',
    isOverview: false,
    url: urls[pages.dashboardKintoBlocksList],
    addUrl: urls[pages.dashboardKintoBlocksTypeSelect],
    children: [
      {
        key: pages.dashboardKintoBlocksList,
        url: urls[pages.dashboardKintoBlocksList]
      },
      {
        key: pages.dashboardKintoBlocksManage,
        url: urls[pages.dashboardKintoBlocksManage]
      },
      {
        key: pages.dashboardKintoBlocksTypeSelect,
        url: urls[pages.dashboardKintoBlocksTypeSelect]
      },
      {
        key: pages.dashboardKintoBlocksCreate,
        url: urls[pages.dashboardKintoBlocksCreate]
      },
      {
        key: pages.dashboardDocumentationEndpoints,
        url: urls[pages.dashboardDocumentationEndpoints]
      },
      {
        key: pages.dashboardKintoBlocksBuildLogs,
        url: urls[pages.dashboardKintoBlocksBuildLogs]
      }
    ],
    group: 1
  }
]

export const marketSidebar = []
