import Page from './page'
import { expect } from 'chai'
import DashboardIndex from './dashboard.index.page'
import testData from '../constants/testdata.json'

class Login extends Page {
  open() {
    super.open('log-in')
  }

  login() {
    this.open()
    this.loginUsername.waitForVisible()
    this.loginUsername.setValue(this.TEST_USERNAME)
    this.loginPassword.setValue(this.TEST_PASSWORD)
    this.loginSubmit()
    DashboardIndex.container.waitForExist()
    this.loadingFinished.waitForExist()
  }

  registerAndLogin(prefix) {
    var username
    this.open()
    this.signupUsername.waitForVisible()
    var currentTime = new Date()
    username = prefix + 'test' + currentTime.getTime()
    this.signupUsername.setValue(username)
    this.signupEmail.setValue(username + '@kintoe2e.com')
    this.signupPassword.setValue(testData.signup.validPassword)
    this.signupSubmit()
    this.loadingFinished.waitForExist()
    this.skipTutorialBtn.waitForExist()
    this.skipTutorialBtn.waitForVisible()
    this.skipTutorialBtn.click()
    this.loadingFinished.waitForExist()
    expect(this.skipTutorialBtn.isVisible()).to.eql(false)
    return username
  }

  get skipTutorialBtn() {
    return $('.kh-modal-actions .button.secondary')
  }

  get loginUsername() {
    return $('[data-test=loginUsername] input')
  }
  get loginUsernameError() {
    return $('[data-test=loginUsername] .error-message')
  }
  get loginPassword() {
    return $('[data-test=loginPassword] input')
  }
  get loginPasswordError() {
    return $('[data-test=loginPassword] .error-message')
  }

  get loginPasswordEye() {
    return $('[data-test=loginForm] .show-password')
  }

  get loginRememberMe() {
    return $('#KeepSignedIn')
  }

  get loginForm() {
    return $('[data-test=loginForm]')
  }

  get loginH3Text() {
    return $('.content > h3')
  }

  get loginH1Text() {
    return $('.content > h1')
  }

  get loginFormError() {
    return $('[data-test=loginForm] [data-test=form-error]')
  }

  get signupUsername() {
    return $('[data-test=signupUsername] input')
  }

  get signupUsernameError() {
    return $('[data-test=signupUsername] .error-message')
  }

  get signUpFormError() {
    return $('[data-test=signupForm] [data-test=form-error]')
  }

  get signupEmail() {
    return $('[data-test=signupEmail] input')
  }

  get signupEmailError() {
    return $('[data-test=signupEmail] .error-message')
  }

  get signupPassword() {
    return $('[data-test=signupPassword] input')
  }

  get signupPasswordError() {
    return $('[data-test=signupPassword] .error-message')
  }
  get signupPasswordEye() {
    return $('[data-test=signupForm] .show-password')
  }

  get signupSuccess() {
    return $('[data-test=signupSuccess]')
  }

  get signupForm() {
    return $('[data-test=signupForm]')
  }

  get password_rule() {
    return $('.byline > h6')
  }

  signupSubmit() {
    this.signupForm.submitForm()
  }

  loginSubmit() {
    this.loginForm.submitForm()
  }

  get forgotPasswordLink() {
    return $('[data-test=loginForm] .forgot-password')
  }

  get forgotPasswordUNEmail() {
    return $('[data-test=forgotPassword] input')
  }

  get resetPwdBtn() {
    return $('button.button.secondary ')
  }

  get pwdResetConfirmation() {
    return $('.forgot-password-confirmation h2')
  }

  get gmailUsernameField() {
    return $('input#identifierId')
  }

  get gmailPwdField() {
    return $(`input[name='password']`)
  }

  get gmailInbox() {
    return $(`[href="https://mail.google.com"]`)
  }

  get expandTrimmedEmail() {
    return $(
      `[role="listitem"]:last-of-type [data-tooltip="Show trimmed content"]`
    )
  }

  get searchBarForGmailInbox() {
    return $(`input[placeholder="Search mail"]`)
  }

  get openMail() {
    return $('tbody tr:nth-of-type(1) [title="Inbox"]')
  }

  get resetLink() {
    return $('strong a')
  }

  get collapseExpandedEmail() {
    return $(`.hk.J-J5-Ji [aria-label="Collapse all"]`)
  }

  get newPwdInputField() {
    return $('input#createNewPassword')
  }

  get newPwdInputFieldConfirm() {
    return $('input#createNewPasswordConfirm')
  }

  get createNewPwdBtn() {
    return $('button.button.default')
  }
}

export default new Login()
