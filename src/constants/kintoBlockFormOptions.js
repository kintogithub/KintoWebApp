import { APIDOC, NONE, SWAGGER } from 'constants/kintoBlockDocTypes'
import { STATIC, WEBAPP } from 'constants/websiteTypes'
import { HELM, DOCKERFILE, DOCKERHUB } from 'constants/serviceTypes'

import { HTTP, GRPC } from 'constants/protocolTypes'

export const isNewRepositoryOptions = [
  {
    value: true,
    label: 'Create new repository'
  },
  {
    value: false,
    label: 'Existing Repositories'
  }
]

export const isNewRepositoryOptionsForGithub = [
  {
    value: false,
    label: 'Existing Repositories'
  },
  {
    value: true,
    label: 'Create new repository',
    isDisabled: true,
    isComingSoon: true
  }
]

export const apiDocOptions = [
  {
    value: NONE,
    label: 'None'
  },
  {
    value: APIDOC,
    label: 'ApiDoc'
  },
  {
    value: SWAGGER,
    label: 'Swagger',
    isDisabled: true,
    isComingSoon: true
  }
]

export const apiDocMicroserviceOptions = [
  {
    value: APIDOC,
    label: 'ApiDoc'
  },
  {
    value: NONE,
    label: 'None'
  },
  {
    value: SWAGGER,
    label: 'Swagger',
    isDisabled: true,
    isComingSoon: true
  }
]

export const protocolOptions = [
  {
    value: HTTP,
    label: 'HTTP'
  },
  {
    value: GRPC,
    label: 'gRPC'
  }
]

export const websiteTypeOptions = [
  {
    value: STATIC,
    label: 'Static Website',
    isDisabled: false,
    isComingSoon: false
  },
  {
    value: WEBAPP,
    label: 'Dynamic Web App'
  }
]
export const serviceTypeOptions = [
  {
    value: HELM,
    label: 'Helm'
  },
  {
    value: DOCKERFILE,
    label: 'Docker File',
    isDisabled: true,
    isComingSoon: true
  },
  {
    value: DOCKERHUB,
    label: 'Docker Hub',
    isDisabled: true,
    isComingSoon: true
  }
]
