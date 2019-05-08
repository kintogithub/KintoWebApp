export const getInput = (selector, type = 'input') => ({
  input: $(`[data-test=${selector}] ${type}`),
  error: $(`[data-test=${selector}] .error-message`)
})

export const getDataTest = selector => $(`[data-test=${selector}]`)
