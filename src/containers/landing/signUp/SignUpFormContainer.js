import { connect } from 'react-redux'
import SignUpForm from 'components/logIn/SignUpForm'
import { signUp } from 'actions/auth'
import { submit } from 'redux-form'

function mapStateToProps(state, { queryData }) {
  let autoSignUp = !!queryData.autoSignUp
  let queryObject = {}

  try {
    queryObject = JSON.parse(atob(queryData.data))
  } catch (e) {
    autoSignUp = false
  }

  let formData = {}

  if (autoSignUp) {
    formData = {
      userName: queryObject.userName,
      email: queryObject.email,
      password: queryObject.password
    }
  }

  return {
    autoSignUp,
    initialValues: formData
  }
}

// when reenabling the sign up form, we must pass query data to it from the parent - log in page

function mapDispatchToProps(dispatch, { queryData }) {
  const adSource = queryData.adSource || null
  return {
    logInDirectly: () => {
      dispatch(submit('signUp'))
    },
    onSubmit: data => dispatch(signUp({ ...data, source: adSource }))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)
