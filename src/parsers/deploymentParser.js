export const getDependencyInfo = (data, metadata) => {
  const mainMetadata = metadata[data.id]
  if (!mainMetadata) {
    return data
  }
  const dependencies = mainMetadata.dependencies || []
  return {
    ...data,
    name: mainMetadata.name,
    description: mainMetadata.description,
    versions: mainMetadata.versions || [],
    dependencies: dependencies.map(d => ({
      name: metadata[d].name,
      description: metadata[d].description,
      type: metadata[d].type
    }))
  }
}
