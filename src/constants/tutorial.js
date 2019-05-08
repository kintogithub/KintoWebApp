import { pages } from './pages'

export const skipDefaultChangeAction = [
  {
    form: 'deploymentForm',
    field: 'appDependencies'
  }
]

export const requireTwoItemsToBeDone = [
  {
    form: 'WorkspaceFormCreate',
    field: 'members'
  }
]

export default {
  [pages.dashboardDeploymentsCreate]: {
    fields: ['name', 'shortDescription', 'appDependencies', 'submit'], // sorted tutorial form fields
    name: {
      step: '1',
      description:
        'Step 1: Enter the name for your application. You can come back and modify it later.'
    },
    shortDescription: {
      step: '2',
      description:
        'Step 2: Enter a short description for your deployment. You can come back and modify it later.'
    },
    appDependencies: {
      step: '3',
      description:
        'Step 3: Add the example Hello World KintoBlock as dependency.'
    },
    submit: {
      // the form submit button
      step: '4',
      description: 'Step 4: Click "Create New Deployment".'
    }
  },
  [pages.dashboardKintoBlocksCreate]: {
    fields: [
      'name',
      'shortDescription',
      'language',
      'repositoryName',
      'createExampleProject',
      'submit'
    ],
    name: {
      step: '1',
      description: 'Step 1: Enter the name of your KintoBlock.'
    },
    displayName: {
      step: '2',
      description: 'Step 2: Enter the display name of your KintoBlock.'
    },
    shortDescription: {
      step: '3',
      description:
        'Step 2: Enter a short description for your KintoBlock. You can come back and modify it later.'
    },
    language: {
      step: '4',
      description: 'Step 3: Choose the language.'
    },
    repositoryName: {
      step: '5',
      description: 'Step 4: Create a new repository or choose an existing one.'
    },
    createExampleProject: {
      step: '6',
      description:
        'Step 5: We recommend adding example projects to help get you started.'
    },
    submit: {
      step: '7',
      description: 'Step 6: Click "Create New KintoBlock".'
    }
  },
  [pages.workspaceCreate]: {
    fields: ['name', 'members', 'submit'],
    name: {
      step: '1',
      description:
        'Step 1: Enter the name for your workspace. You can come back and modify it later.'
    },
    members: {
      step: '2',
      description:
        'Step 2: Add members to your workspace and assign roles to them.'
    },
    submit: {
      step: '3',
      description: 'Step 3: Click "Create New Workspace"'
    }
  }
}
