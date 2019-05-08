const request = require('request-promise-native')

const callApi = async (url, token, options = {}) => {
  if (!options.method) {
    options.method = 'GET'
  }
  const baseOptions = {
    uri: process.env.REACT_APP_SERVER_URL + url,
    json: true,
    auth: {
      bearer: token
    }
  }
  Object.assign(baseOptions, options)
  return request(baseOptions)
}

// const token = await getToken(..clientId, ..clientSecret)  // token will equal the actual token value you will need to pass it to other api calls
export const getToken = async (clientId, clientSecret) => {
  return request({
    method: 'POST',
    uri: process.env.REACT_APP_SERVER_URL + '/authorize',
    body: {
      clientId: clientId,
      clientSecret: clientSecret
    },
    json: true
  }).then(res => {
    return res.data.token
  })
}

// const message = callExampleLogin(..token) // message will equal `Logged in successfully`
export const callExampleHelloWorld = async token => {
  const result = await callApi('/helloworld/hello/world', token, {
    method: 'GET'
  })
  return result.message
}

//TO CHECK FOR 400 RESPONSE CODE
export const callExampleLoginWithoutPassword = async (token, loginKbName) => {
  try {
    const result = await callApi(`/${loginKbName}/login`, token, {
      method: 'POST',
      body: {
        username: 'kintohub'
      }
    })
    return result
  } catch (err) {
    return err.error
  }
}

//Console logs and ENV parameter
export const callUserKB = async (token, kbName) => {
  try {
    const result = await callApi(`/${kbName}/hello/KintoUser`, token)
    return result
  } catch (err) {}
}

/* API call method for python, ruby, Php, java, Csharp 2.0, Csharp 2.1 and Elixir*/
export const ApiCall = async (kbName, token, endpoint) => {
  try {
    const result = await callApi(`/${kbName}/${endpoint}/KintoUser`, token, {
      method: 'GET'
    })
    return result
  } catch (err) {}
}

//Go
export const callGoApp = async (kbName, token) => {
  try {
    const result = await callApi(`/${kbName}/`, token, {
      method: 'GET'
    })
    return result
  } catch (err) {}
}
