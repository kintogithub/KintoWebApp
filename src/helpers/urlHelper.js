import pathToRegexp from 'path-to-regexp'
import qs from 'query-string'
import { githubUrl, bitbucketUrl, GITHUB } from 'constants/gitRepos'
import { urls } from 'constants/pages'

export const getPageUrl = (page, urlParams, queryParams, ignoreError) => {
  let url = urls[page]
  if (!url) {
    throw new Error('there is no url defined for that page')
  }
  url = getUrl(url, urlParams, ignoreError)
  if (!queryParams) {
    return url
  }
  Object.keys(queryParams).forEach((key, index) => {
    const prefix = index === 0 ? '?' : '&'
    url += `${prefix}${key}=${queryParams[key]}`
  })
  return url
}

export const gitConnectUrl = (workspaceId, gitSource, options = {}) => {
  if (!workspaceId) {
    return ''
  }

  const isGithub = gitSource === GITHUB
  const pageType = options.pageType || ''
  const tutorial = options.isTutorial ? 'tutorial' : ''
  const params = `${pageType}-${tutorial}`
  const clientId = isGithub
    ? process.env.REACT_APP_GITHUB_CLIENT_ID
    : process.env.REACT_APP_BITBUCKET_CLIENT_ID
  return isGithub
    ? githubUrl(clientId, workspaceId, params)
    : bitbucketUrl(clientId, workspaceId, params)
}

export const getServerUrl = (microservice, url = '', queryStrings) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL
  let updatedBaseUrl = baseUrl
  const type = process.env.REACT_APP_URL_TYPE || 'append'
  if (microservice) {
    switch (type) {
      case 'subdomain':
        const http = baseUrl.match(/^(https?):\/\//)[0]
        updatedBaseUrl = baseUrl.replace(http, `${http}${microservice}.`)
        break
      case 'append':
        updatedBaseUrl = `${baseUrl}/${microservice}`
        break
      case 'null':
        updatedBaseUrl = baseUrl
        break
      default:
        throw new Error('you have to set REACT_APP_URL_TYPE correctly')
    }
  }
  let updatedQueryStrings = ''
  if (queryStrings) {
    updatedQueryStrings = `?${qs.stringify(queryStrings)}`
  }
  return updatedBaseUrl + url + updatedQueryStrings
}

export const getUrl = (url, params, ignoreError) => {
  try {
    return pathToRegexp.compile(url)(params)
  } catch (e) {
    if (ignoreError) {
      return ''
    }
    throw new Error(e)
  }
}
