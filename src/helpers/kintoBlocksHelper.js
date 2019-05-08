import { MICROSERVICE, WEBSITE, TASK, SERVICE } from 'constants/kintoBlockTypes'
import { getVersionBuildConfig } from 'constants/microserviceAdvancedDefaults'
import { HTTP } from 'constants/protocolTypes'
import { NONE } from 'constants/kintoBlockDocTypes'
import { isBranchVersionEqual } from './versionHelper'

export const pastedEnvVariablePatternRegex = /(.)\w+=(.)\w/
export const seperateVariablesRegex = /=(.+)/

export const isDependencySimple = dependency => {
  return dependency.versions || dependency.dependencies
}

export const getDependencyInfo = (dependency, dependenciesCache, isSimple) => {
  const dependencyMeta = dependenciesCache[dependency.blockId]
  if (!dependencyMeta) {
    return {
      ...dependency,
      dependencies: []
    }
  }
  let result = {
    ...dependency,
    ...dependencyMeta
  }
  if (!isSimple) {
    result.dependencies = findAssociatedDependencies(
      dependency.version,
      dependencyMeta.dependencies || [],
      dependenciesCache
    )
  }
  return result
}

export const getClassNameForType = type => {
  switch (type) {
    case 'KINTOBLOCK':
      return 'kintoblock'
    case 'SERVICE':
      return 'service'
    default:
      // TODO throw new Error('Invalid kintoblock type for classname')
      return ''
  }
}

export const findDependency = (dependencies = [], dependencyId) => {
  let foundDependency = null
  dependencies.forEach(d => {
    if (foundDependency) {
      return
    }
    if (d.dependencyId === dependencyId) {
      foundDependency = d
      return
    }
    const children = d.dependencies || []
    const child = children.find(d => d.dependencyId === dependencyId)
    if (child) {
      foundDependency = child
    }
  })
  return foundDependency
}

function findAssociatedDependencies(version, dependencies, cache) {
  return dependencies
    .filter(d => d.residesIn.some(rv => isBranchVersionEqual(rv, version)))
    .map(d => {
      return {
        ...d,
        ...cache[d.blockId]
      }
    })
}

export const getKbTypeClass = type => {
  switch (type) {
    case MICROSERVICE:
      return 'microservice'
    case WEBSITE:
      return 'website'
    case TASK:
      return 'task'
    case SERVICE:
      return 'service'
    default:
      return 'microservice'
  }
}

export const getKintoBlockInitialFormData = kintoBlock => {
  const getDefault = key => getVersionBuildConfig(key, kintoBlock)

  return {
    name: kintoBlock.name,
    displayName: kintoBlock.displayName || kintoBlock.name,
    shortDescription: kintoBlock.shortDescription,
    dependencies: kintoBlock.dependencies,
    environmentVariables: kintoBlock.environmentVariables,
    configParameters: kintoBlock.configParameters,
    isPublic: kintoBlock.isPublic,
    isShared: !!kintoBlock.isShared, //set to false by default this is for previous blocks that havent had this value set.
    memberIds: kintoBlock.memberIds || [],
    protocol: kintoBlock.protocol || HTTP,
    language: kintoBlock.language,
    isAutoBuild: !!kintoBlock.isAutoBuild, // set to false by default in the case it has not been set
    versionBuildConfigData: {
      port: getDefault('port'),
      buildCommand: getDefault('buildCommand'),
      runCommand: getDefault('runCommand'),
      docFormat:
        kintoBlock.type === WEBSITE
          ? NONE
          : kintoBlock.version.versionBuildConfigData.docFormat
    }
  }
}

export const getVariablesForCopyButton = variables => {
  if (!variables) {
    return ''
  } else {
    const arrayOfStrings = variables.map(variableObject => {
      return `${variableObject.key}=${variableObject.value}`
    })
    return arrayOfStrings.join('\n')
  }
}

export const processUserVariablesForForm = (data, originalData = []) => {
  const newPairs = data.split('\n')
  const newKeyValues = newPairs.map(pair => {
    const array = pair.split(seperateVariablesRegex)
    return {
      key: array[0],
      value: array[1]
    }
  })

  const untouchedOldData = originalData.filter(
    old => !newKeyValues.find(newPair => newPair.key === old.key)
  )

  const updatedOldDataAndNewData = newKeyValues.map(newPair => {
    if (originalData.find(data => data.key === newPair.key)) {
      return {
        key: newPair.key,
        value: newPair.value
      }
    } else {
      return newPair
    }
  })

  const allData = [...updatedOldDataAndNewData, ...untouchedOldData]

  return allData
}
