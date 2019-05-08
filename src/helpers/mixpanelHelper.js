import { Mixpanel } from 'helpers/tracking/Mixpanel'

export const identifyLogIn = (email, id, userName) => {
  Mixpanel.identify(email)
  Mixpanel.track('Successful log in', { $user_id: id })
  Mixpanel.people.set({
    $user_name: userName,
    $email: email,
    $user_id: id,
    $logged_in_at: new Date()
  })
  Mixpanel.people.increment('number_of_times_logged_in')
}

export const trackLogIn = () => {
  Mixpanel.track('Logged In', { $logged_in_at: new Date() })
}

export const trackSignUp = email => {
  Mixpanel.track('Sign up', { $user_email: email })
}

// this is to test that mixpanel is working, place this function anywhere and click the thing.
export const testTracking = () => {
  Mixpanel.track('testing', { page: 'sidebar' })
  console.log('hit tracking')
}
