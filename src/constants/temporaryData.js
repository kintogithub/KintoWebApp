import moment from 'moment'

export const tempPrismaData = [
  {
    id: 1234,
    index: 0,
    name: 'name',
    displayName: 'processing some stuff',
    status: 'RUNNING',
    createdAt: moment()
      .subtract(1, 'h')
      .format(),
    endedAt: null,
    workflowStatus: 'RUNNING',
    deploymentId: '1.0.0',
    deploymentNumber: 1,
    environmentId: 'bdb28d37-72f0-410f-a850-ad46174e6315',
    groupName: 'DEPLOYMENT',
    kintoBlockName: 'kintoargoworkflowgenerator',
    kintoBlockVersionName: '0.1.0',
    kintoBlockVersionType: 'BRANCH'
  },
  {
    id: 2345,
    index: 1,
    name: 'name',
    displayName: 'processing some stuff',
    status: 'PENDING',
    createdAt: moment()
      .subtract(1, 'h')
      .format(),
    endedAt: null,
    workflowStatus: 'RUNNING',
    deploymentId: '1.0.0',
    deploymentNumber: 1,
    environmentId: 'bdb28d37-72f0-410f-a850-ad46174e6315',
    groupName: 'DEPLOYMENT',
    kintoBlockName: 'kintocrud',
    kintoBlockVersionName: '0.0.2',
    kintoBlockVersionType: 'BRANCH'
  },
  {
    id: 3456,
    index: 2,
    name: 'name',
    displayName: 'deploying some stuff',
    status: 'RUNNING',
    createdAt: moment()
      .subtract(1, 'h')
      .format(),
    endedAt: null,
    workflowStatus: 'RUNNING',
    deploymentId: '1.0.0',
    deploymentNumber: 1,
    environmentId: 'bdb28d37-72f0-410f-a850-ad46174e6315',
    groupName: 'DEPLOYMENT',
    kintoBlockName: 'kintoargoworkflowgenerator',
    kintoBlockVersionName: '0.1.0',
    kintoBlockVersionType: 'BRANCH'
  },
  {
    id: 3456,
    index: 2,
    name: 'name',
    displayName: 'deploying some stuff',
    status: 'SUCCESS',
    createdAt: moment()
      .subtract(1, 'h')
      .format(),
    endedAt: null,
    workflowStatus: 'RUNNING',
    deploymentId: '1.0.0',
    deploymentNumber: 1,
    environmentId: 'bdb28d37-72f0-410f-a850-ad46174e6315',
    groupName: 'TESTING',
    kintoBlockName: 'kintocrud',
    kintoBlockVersionName: '0.0.2',
    kintoBlockVersionType: 'BRANCH'
  },
  {
    id: 3456,
    index: 2,
    name: 'name',
    displayName: 'deploying some stuff',
    status: 'SUCCESS',
    createdAt: moment()
      .subtract(1, 'h')
      .format(),
    endedAt: null,
    workflowStatus: 'RUNNING',
    deploymentId: '1.0.0',
    deploymentNumber: 1,
    environmentId: 'bdb28d37-72f0-410f-a850-ad46174e6315',
    groupName: 'TESTING',
    kintoBlockName: 'kintoargoworkflowgenerator',
    kintoBlockVersionName: '0.1.0',
    kintoBlockVersionType: 'BRANCH'
  },
  {
    id: 3456,
    index: 2,
    name: 'name',
    displayName: 'deploying some stuff',
    status: 'SUCCESS',
    createdAt: moment()
      .subtract(1, 'h')
      .format(),
    endedAt: null,
    workflowStatus: 'RUNNING',
    deploymentId: '1.0.0',
    deploymentNumber: 1,
    environmentId: 'bdb28d37-72f0-410f-a850-ad46174e6315',
    groupName: 'TESTING',
    kintoBlockName: 'kintoargoworkflowgenerator',
    kintoBlockVersionName: '0.1.0',
    kintoBlockVersionType: 'BRANCH'
  },
  {
    id: 3456,
    index: 2,
    name: 'name',
    displayName: 'deploying some stuff',
    status: 'SUCCESS',
    createdAt: moment()
      .subtract(1, 'h')
      .format(),
    endedAt: moment().format(),
    workflowStatus: 'RUNNING',
    deploymentId: 1,
    deploymentNumber: '2',
    environmentId: 'bdb28d37-72f0-410f-a850-ad46174e6315',
    groupName: 'TESTING',
    kintoBlockName: 'kintoargoworkflowgenerator',
    kintoBlockVersionName: '0.1.0',
    kintoBlockVersionType: 'BRANCH'
  },
  {
    id: 4567,
    index: 3,
    name: 'name',
    displayName: 'deploying some stuff',
    status: 'SUCCESS',
    createdAt: moment().format(),
    endedAt: moment().format(),
    workflowStatus: 'FAILED',
    deploymentId: '0.0.9',
    deploymentNumber: 2,
    environmentId: 'bdb28d37-72f0-410f-a850-ad46174e6315',
    groupName: 'DEPLOYMENT',
    kintoBlockName: 'kintoargoworkflowgenerator',
    kintoBlockVersionName: '0.0.2',
    kintoBlockVersionType: 'BRANCH'
  },
  {
    id: 4321,
    index: 4,
    name: 'name',
    displayName: 'deploying some stuff',
    status: 'SUCCESS',
    createdAt: moment()
      .subtract(1, 'h')
      .format(),
    endedAt: moment().format(),
    workflowStatus: 'FAILED',
    deploymentId: '0.0.9',
    deploymentNumber: 2,
    environmentId: 'bdb28d37-72f0-410f-a850-ad46174e6315',
    groupName: 'DEPLOYMENT',
    kintoBlockName: 'kintoargoworkflowgenerator',
    kintoBlockVersionName: '0.0.2',
    kintoBlockVersionType: 'BRANCH'
  },
  {
    id: 4324,
    index: 5,
    name: 'name',
    displayName: 'deploying some stuff',
    status: 'SUCCESS',
    createdAt: moment()
      .subtract(1, 'h')
      .format(),
    endedAt: moment().format(),
    workflowStatus: 'FAILED',
    deploymentId: '0.0.9',
    deploymentNumber: 1,
    environmentId: 'bdb28d37-72f0-410f-a850-ad46174e6315',
    groupName: 'DEPLOYMENT',
    kintoBlockName: 'kintocrud',
    kintoBlockVersionName: '0.0.1',
    kintoBlockVersionType: 'BRANCH'
  },
  {
    id: 3434,
    index: 6,
    name: 'name',
    displayName: 'deploying some stuff',
    status: 'SUCCESS',
    createdAt: moment()
      .subtract(1, 'h')
      .format(),
    endedAt: moment().format(),
    workflowStatus: 'FAILED',
    deploymentId: '0.0.9',
    deploymentNumber: 1,
    environmentId: 'bdb28d37-72f0-410f-a850-ad46174e6315',
    groupName: 'DEPLOYMENT',
    kintoBlockName: 'kintoargoworkflowgenerator',
    kintoBlockVersionName: '0.0.2',
    kintoBlockVersionType: 'BRANCH'
  },
  {
    id: 6543,
    index: 7,
    name: 'name',
    displayName: 'deploying some stuff',
    status: 'FAILED',
    createdAt: moment()
      .subtract(1, 'h')
      .format(),
    endedAt: moment().format(),
    workflowStatus: 'FAILED',
    deploymentId: '0.0.9',
    deploymentNumber: 1,
    environmentId: 'bdb28d37-72f0-410f-a850-ad46174e6315',
    groupName: 'DEPLOYMENT',
    kintoBlockName: 'kintocrud',
    kintoBlockVersionName: '0.0.1',
    kintoBlockVersionType: 'BRANCH'
  }
]

export const changelogData = {
  modifiedBlocks: [
    {
      blockId: '1',
      blockName: 'Super Wordpress',
      blockVersion: {
        lastUpdated: '2018-01-15T10:44:53.226533200Z',
        name: 'master',
        note: 'No builds yet...',
        type: 'BRANCH'
      },
      changes: [
        {
          type: 'VERSION',
          oldValue: {
            lastUpdated: '2018-01-15T10:44:53.226533200Z',
            name: 'master',
            note: 'No builds yet...',
            type: 'BRANCH'
          },
          newValue: {
            lastUpdated: '2018-01-15T10:44:53.226533200Z',
            name: 'production',
            note: 'No builds yet...',
            type: 'BRANCH'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          oldValue: {
            key: 'modified value',
            value: 'abc'
          },
          newValue: {
            key: 'modified value',
            value: 'def'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          newValue: {
            key: 'Added param',
            value: 'QW12ER'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          oldValue: {
            key: 'removed param',
            value: 'UI12UI'
          }
        },
        {
          type: 'HARDWARE_REQUIREMENTS',
          oldValue: {
            key: 'memory limits',
            value: '64MB'
          },
          newValue: {
            key: 'memory limits',
            value: '128MB'
          }
        },
        {
          type: 'HARDWARE_REQUIREMENTS',
          oldValue: {
            key: 'cpu limits',
            value: '400 m'
          }
        },
        {
          type: 'HARDWARE_REQUIREMENTS',
          newValue: {
            key: 'dedicated cpus',
            value: 'Yes'
          }
        }
      ]
    },
    {
      blockId: '1',
      blockName: 'All The Block',
      blockVersion: {
        lastUpdated: '2018-01-15T10:44:53.226533200Z',
        name: 'master',
        note: 'No builds yet...',
        type: 'BRANCH'
      },
      changes: [
        {
          type: 'VERSION',
          oldValue: {
            lastUpdated: '2018-01-15T10:44:53.226533200Z',
            name: 'master',
            note: 'No builds yet...',
            type: 'BRANCH'
          },
          newValue: {
            lastUpdated: '2018-01-15T10:44:53.226533200Z',
            name: '0.1.1',
            note: 'No builds yet...', //commit message
            type: 'TAG'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          oldValue: {
            key: 'modified value',
            value: 'abc'
          },
          newValue: {
            key: 'modified value',
            value: 'def'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          newValue: {
            key: 'Added param',
            value: 'QW12ER'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          oldValue: {
            key: 'removed param',
            value: 'UI12UI'
          }
        }
      ]
    },
    {
      blockId: '1',
      blockName: 'More Marquise Please',
      blockVersion: {
        lastUpdated: '2018-01-15T10:44:53.226533200Z',
        name: 'master',
        note: 'No builds yet...',
        type: 'BRANCH'
      },
      changes: [
        {
          type: 'VERSION',
          oldValue: {
            lastUpdated: '2018-01-15T10:44:53.226533200Z',
            name: 'lalalalalaitslateaf',
            note: 'No builds yet...',
            type: 'BRANCH'
          },
          newValue: {
            lastUpdated: '2018-01-15T10:44:53.226533200Z',
            name: '0.1.1',
            note: 'New Commit Message', //commit message
            type: 'TAG'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          oldValue: {
            key: 'modified value',
            value: 'abc'
          },
          newValue: {
            key: 'modified value',
            value: 'def'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          newValue: {
            key: 'Added param',
            value: 'QW12ER'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          oldValue: {
            key: 'removed param',
            value: 'UI12UI'
          }
        }
      ]
    },
    {
      blockId: '1',
      blockName: 'Tag Name Change',
      blockVersion: {
        lastUpdated: '2018-01-15T10:44:53.226533200Z',
        name: 'master',
        note: 'No builds yet...',
        type: 'BRANCH'
      },
      changes: [
        {
          type: 'VERSION',
          oldValue: {
            lastUpdated: '2018-01-15T10:44:53.226533200Z',
            name: '1.1.1',
            note: 'No builds yet...',
            type: 'TAG'
          },
          newValue: {
            lastUpdated: '2018-01-15T10:44:53.226533200Z',
            name: '1.1.2',
            note: 'No builds yet...',
            type: 'TAG'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          oldValue: {
            key: 'modified value',
            value: 'abc'
          },
          newValue: {
            key: 'modified value',
            value: 'def'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          newValue: {
            key: 'Added param',
            value: 'QW12ER'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          oldValue: {
            key: 'removed param',
            value: 'UI12UI'
          }
        }
      ]
    },
    {
      blockId: '1',
      blockName: 'New Tag Example',
      blockVersion: {
        lastUpdated: '2018-01-15T10:44:53.226533200Z',
        name: 'master',
        note: 'No builds yet...',
        type: 'BRANCH'
      },
      changes: [
        {
          type: 'VERSION',
          newValue: {
            lastUpdated: '2018-01-15T10:44:53.226533200Z',
            name: '1.1.2',
            note: 'No builds yet...',
            type: 'TAG'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          oldValue: {
            key: 'modified value',
            value: 'abc'
          },
          newValue: {
            key: 'modified value',
            value: 'def'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          newValue: {
            key: 'Added param',
            value: 'QW12ER'
          }
        },
        {
          type: 'CUSTOM_PARAM',
          oldValue: {
            key: 'removed param',
            value: 'UI12UI'
          }
        }
      ]
    }
  ],
  newBlocks: [
    {
      blockId: '123',
      blockName: 'P5',
      blockVersion: {
        lastUpdated: '2018-01-15T10:44:53.226533200Z',
        name: '1.1.1 (4)',
        note: 'No builds yet...',
        type: 'TAG'
      }
    },
    {
      blockId: '456',
      blockName: 'Nier',
      blockVersion: {
        lastUpdated: '2018-01-15T10:44:53.226533200Z',
        name: '2.3.1 (2)',
        note: 'No builds yet...',
        type: 'TAG'
      }
    }
  ],
  deletedBlocks: [
    {
      blockId: '123',
      blockName: 'Hatoful Boyfriend',
      blockVersion: {
        lastUpdated: '2018-01-15T10:44:53.226533200Z',
        name: 'master',
        note: 'No builds yet...',
        type: 'BRANCH'
      }
    },
    {
      blockId: '234',
      blockName: 'Overwatch',
      blockVersion: {
        lastUpdated: '2018-01-15T10:44:53.226533200Z',
        name: 'dev',
        note: 'No builds yet...',
        type: 'BRANCH'
      }
    }
  ]
}
