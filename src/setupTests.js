import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import axios from 'axios'
import 'jest-localstorage-mock'

Enzyme.configure({ adapter: new Adapter() })

axios.interceptors.response.use(
  response => {
    const data = response.data || {}
    if (data.errors) {
      if (data.errors.error) {
        data.errors._error = data.errors.error
        delete data.errors.error
      }
      return Promise.reject(data)
    }
    return data
  },
  error => {
    return Promise.reject(error)
  }
)
