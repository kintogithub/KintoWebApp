export const GITHUB = 'GITHUB'
export const BITBUCKET = 'BITBUCKET'
export const GITLAB = 'GITLAB'
export const GITHUBQS = '---GITHUB'

export const githubUrl = (clientId, workspaceId, params) => {
  return `https://github.com/apps/${
    process.env.REACT_APP_GITAPP_AUTH_URL_NAME
  }?scope=repo%20write:repo_hook&state=${workspaceId}-${params}-${GITHUB}&client_id=${clientId}`
}

export const bitbucketUrl = (clientId, workspaceId, params) => {
  return `https://bitbucket.org/site/oauth2/authorize?scope=repository:write%20webhook&state=${workspaceId}-${params}-${BITBUCKET}&client_id=${clientId}&response_type=code`
}

export const pageTypes = {
  KB_CREATE: 'KB_CREATE',
  KB_TYPE_SELECT: 'KB_TYPE_SELECT',
  KB_TYPE_WORKSPACE: 'KB_TYPE_WORKSPACE'
}

export const gitRepoTypes = [GITHUB, BITBUCKET, GITLAB]
