import { connect } from 'react-redux'
import { getServerUrl } from 'helpers/urlHelper'
import { getDependenciesFactory } from 'selectors/kintoDependencies'
import AccessYourApi from 'components/dashboard/deployments/deploymentManage/AccessYourApi'

function mapStateToProps(state, { deployment }) {
  const getDependencies = getDependenciesFactory()
  const depHash = getDependencies(state, deployment.appDependencies)
  const dependencies = deployment.appDependencies.map(d => depHash[d.blockId])

  const isExample = dependencies.every(d => d.isExample)
  const { selectedWorkspace } = state.workspaces
  const { selectedEnvironmentId } = state.pageOptions
  const environment =
    deployment.environments.find(
      environment => environment.id === selectedEnvironmentId
    ) || {}

  return {
    authUrl: getAuthUrl(environment),
    accessUrl: getAccessUrl(),
    tutorialUrl: getTutorialUrl(),
    publicUrl: getPublicUrl(environment),
    internalUrl: getInternalUrl(),
    styledBodyText: getStyledBodyText(),
    dependencies,
    isExample,
    workspaceId: selectedWorkspace,
    deployment,
    environment,
    envId: selectedEnvironmentId || '1'
  }
}

function getStyledBodyText() {
  const url = getServerUrl()
  const styledBody = [url, '/', { text: '<KintoBlock>', color: 'green' }]
  return styledBody
}

function getAuthUrl(env) {
  const url = getServerUrl(null, '/authorize')
  const curl = `curl -H "Content-Type: application/json" -X POST -d '{"clientId":"${
    env.clientId
  }","clientSecret":"${env.secret}"}' ${url}`
  return {
    url,
    curl
  }
}

function getInternalUrl() {
  const styledUrl = [
    'http://',
    { text: '<KintoBlock', color: 'green' },
    '/',
    { text: '<endpoint>', color: 'orange' }
  ]
  const styledGatewayCurl = [
    'curl -H "Kinto-Authorization: Bearer ',
    { text: '<token>', color: 'blue' },
    ' " ',
    'http://omniscient-gateway.kintohub.svc.cluster.local/',
    { text: '<KintoBlock>', color: 'green' },
    '/',
    { text: '<endpoint>', color: 'orange' }
  ]
  return {
    gatewayCurl: getPlainUrl(styledGatewayCurl),
    styledGatewayCurl,
    url: getPlainUrl(styledUrl),
    styledUrl
  }
}

function getAccessUrl() {
  const url = getServerUrl()
  const styledCurl = [
    'curl -H "Kinto-Authorization: Bearer ',
    { text: '<token>', color: 'blue' },
    '" ',
    url,
    '/',
    { text: '<KintoBlock>', color: 'green' },
    '/',
    { text: '<endpoint>', color: 'orange' }
  ]

  const styledBaseUrl = [url, '/', { text: '<KintoBlock>', color: 'green' }]
  return {
    url,
    styledCurl,
    curl: getPlainUrl(styledCurl),
    styledBaseUrl
  }
}

function getPublicUrl(env) {
  const url = getServerUrl()
  const styledCurl = [
    'curl ',
    url,
    '/',
    { text: `${env.clientId}`, color: 'blue' },
    '/',
    { text: '<KintoBlock>', color: 'green' },
    '/',
    { text: '<endpoint>', color: 'orange' }
  ]

  return {
    styledCurl,
    curl: getPlainUrl(styledCurl)
  }
}

function getTutorialUrl() {
  const url = getServerUrl()
  const styledLoginCurl = [
    'curl ',
    " -H 'Kinto-Authorization: Bearer ",
    { text: '<token>', color: 'blue' },
    "' ",
    url,
    '/',
    { text: 'authexample', color: 'green' },
    '/',
    { text: 'login', color: 'orange' }
  ]

  const styledArticleCurl = [
    'curl ',
    " -H 'Kinto-Authorization: Bearer ",
    { text: '<token>', color: 'blue' },
    "' ",
    url,
    '/',
    { text: 'authexample', color: 'green' },
    '/',
    { text: 'article', color: 'orange' }
  ]

  return {
    styledLoginCurl,
    styledArticleCurl,
    loginCurl: getPlainUrl(styledLoginCurl),
    articleCurl: getPlainUrl(styledArticleCurl)
  }
}

function getPlainUrl(styledUrl) {
  return styledUrl.reduce((acc, curr) => {
    if (typeof curr === 'string') {
      return acc + curr
    }
    return acc + curr.text
  }, '')
}

export default connect(
  mapStateToProps,
  undefined
)(AccessYourApi)
