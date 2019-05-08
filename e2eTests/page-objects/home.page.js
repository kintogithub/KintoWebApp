import Page from './page'

class Home extends Page {
  open(wsID) {
    super.open('home')
  }

  get signUpBtn() {
    return $('a.button.default.navigation-button')
  }

  get loginBtn() {
    return $('a.button.secondary.navigation-button')
  }
}

export default new Home()
