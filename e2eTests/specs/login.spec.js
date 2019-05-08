import { expect } from 'chai'
import Login from '../page-objects/login.page'
import Landing from '../page-objects/landing.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import testData from '../constants/testdata.json'
var currentDate = new Date()

describe('Login form', () => {
  //TC_31
  it('should redirect the user to landing if he is not logged in and is trying to access root', () => {
    browser.url('/')
    Landing.navbar.waitForExist()
    Landing.navbar.waitForVisible()
    expect(Landing.getUrl()).to.eql('/log-in')
  })

  //TC_36
  it('should validates inputs and deny access with wrong creds', () => {
    Login.open()
    Login.signupEmail.waitForVisible()
    Login.loginUsername.click()
    Login.loginSubmit()
    Login.loginUsernameError.waitForVisible()
    expect(Login.loginUsernameError.getText()).to.eql('Required')
    expect(Login.loginPasswordError.getText()).to.eql('Required')
    //Invalid Username and Password
    Login.loginUsername.setValue(testData.login.invalidUserName)
    Login.loginPassword.setValue(testData.login.invalidPassword)
    Login.loginSubmit()
    Login.loginFormError.waitForVisible()
    expect(Login.loginFormError.getText()).to.eql(
      'Invalid username or password.'
    )

    //Invalid Username and Valid Password
    Login.loginUsername.setValue(testData.login.invalidUserName)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    Login.loginFormError.waitForVisible()
    expect(Login.loginFormError.getText()).to.eql(
      'Invalid username or password.'
    )

    //Valid Username and Invalid Password
    Login.loginUsername.setValue(testData.login.validUserName)
    Login.loginPassword.setValue(testData.login.invalidPassword)
    Login.loginSubmit()
    Login.loginFormError.waitForVisible()
    expect(Login.loginFormError.getText()).to.eql(
      'Invalid username or password.'
    )
  })

  //TC_43
  it('should validates placeholder text ', () => {
    Login.open()
    Login.signupEmail.waitForVisible()
    var usernamePlaceholder = Login.loginUsername.getAttribute('placeholder')
    expect(usernamePlaceholder).to.eq('Enter username or email')
    var pwdPlaceholder = Login.loginPassword.getAttribute('placeholder')
    expect(pwdPlaceholder).to.eq('Enter a password')
  })

  //TC_32
  it('should validate the landing page text', () => {
    expect(Login.loginH3Text.getText()).to.eql(
      'KintoHub makes it easy to code, combine and deploy microservices. Request access today to get an introduction to building and consuming microservice-based applications in minutes'
    )
    expect(Login.loginH1Text.getText()).to.eql(
      'The one-stop shop for microservices'
    )
  })

  //TC_34
  it('should redirect the user to dashboard after he login successfully', () => {
    Login.login()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    expect(Login.getUrl()).to.eql('/app/dashboard/' + ws)
  })

  //TC_59
  it('should redirect the user to dashboard home if he is logged in and is trying to access root', () => {
    browser.url('/')
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    expect(Login.getUrl()).to.eql('/app/dashboard/' + ws)
  })

  //TC_37
  it('should reveal the password string when clicked on the eye and hide the password if clicked again', () => {
    Login.logout()
    Login.open()
    Login.loginPassword.waitForVisible()
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginPasswordEye.click()
    var pwdAttrib = Login.loginPassword.getAttribute('type')
    expect(pwdAttrib).to.eq('text')
    Login.loginPasswordEye.waitForVisible()
    Login.loginPasswordEye.click()
    pwdAttrib = Login.loginPassword.getAttribute('type')
    expect(pwdAttrib).to.eq('password')
  })

  //TC_41
  it('should redirect the user to dashboard on using valid username with Upper case letters', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(testData.login.validCAPSUserName)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    expect(Login.getUrl()).to.eql('/app/dashboard/' + ws)
    Login.logout()
  })

  //TC_42
  it('should redirect the user to dashboard on using valid email with Upper case letters', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(testData.login.validCAPSEmail)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    Login.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    expect(Login.getUrl()).to.eql('/app/dashboard/' + ws)
    Login.logout()
  })

  it('should verify that user stays in the dashboard page, when user try to navigate to previous page as soon as login', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(testData.login.validUserName)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    browser.pause(5000)
    Login.loadingFinished.waitForExist()
    browser.back()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    Login.logout()
  })

  it('should allow user to login using valid email', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    var currentDate = new Date()
    Login.signupUsername.setValue(
      testData.signup.validUserName + currentDate.getTime()
    )
    var validEmail =
      testData.signup.validUserName + currentDate.getTime() + '@kintoe2e.com'
    Login.signupEmail.setValue(validEmail)
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.loadingFinished.waitForExist()
    Login.skipTutorialBtn.waitForVisible()
    Login.skipTutorialBtn.click()
    Login.loadingFinished.waitForExist()
    Login.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(validEmail)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should send password reset link to users email', () => {
    Login.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(testData.login.validGmailUser)
    Login.forgotPasswordLink.click()
    browser.pause(3000)
    Login.forgotPasswordUNEmail.waitForVisible()
    expect(Login.forgotPasswordUNEmail.getValue()).to.eql(
      testData.login.validGmailUser
    )
    Login.resetPwdBtn.click()
    browser.pause(5000)
    Login.pwdResetConfirmation.waitForVisible()
    expect(Login.pwdResetConfirmation.getText()).to.eql(
      'A confirmation link has been sent to your email.'
    )
    browser.newWindow('https://accounts.google.com/signin')
    browser.pause(5000)
    Login.gmailUsernameField.waitForVisible()
    Login.gmailUsernameField.setValue(testData.login.validGmailUser)
    browser.keys('Enter')
    Login.gmailPwdField.waitForVisible()
    Login.gmailPwdField.setValue(testData.login.validGmailPwd)
    browser.keys('Enter')
    browser.pause(5000)
    browser.url('https://mail.google.com/mail/u/0/#inbox')
    browser.pause(5000)
    Login.searchBarForGmailInbox.waitForVisible()
    Login.searchBarForGmailInbox.setValue('Password Reset')
    browser.pause(5000)
    browser.keys('Enter')
    browser.pause(5000)
    Login.openMail.waitForVisible()
  })

  it('should reset the password using the reset link', () => {
    Login.openMail.click()
    browser.pause(5000)
    if (Login.collapseExpandedEmail.isVisible() === true) {
      Login.collapseExpandedEmail.click()
      browser.pause(5000)
      Login.expandTrimmedEmail.waitForVisible()
      browser.scroll(0, 2000)
      Login.expandTrimmedEmail.click()
      browser.scroll(0, 10000)
      browser.keys('Tab')
      browser.keys('Enter')
    } else {
      browser.pause(5000)
      Login.resetLink.moveToObject()
      Login.resetLink.waitForVisible()
      Login.resetLink.click()
    }
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[2])
    browser.pause(5000)
    Login.newPwdInputField.waitForVisible()
    Login.newPwdInputField.setValue(testData.signup.validPassword)
    Login.newPwdInputFieldConfirm.setValue(testData.signup.validPassword)
    expect(Login.newPwdInputFieldConfirm.getValue()).to.eql(
      testData.signup.validPassword
    )
    Login.createNewPwdBtn.click()
    browser.pause(5000)
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(testData.login.validGmailUser)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    Login.loadingFinished.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    Login.logout()
  })
})

describe('Signup form', () => {
  //TC_09
  it('should validates inputs', () => {
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[0])
    browser.pause(2000)
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.signupSubmit()
    Login.signupUsernameError.waitForVisible()
    expect(Login.signupUsernameError.getText()).to.eql('Required')
    expect(Login.signupEmailError.getText()).to.eql('Required')
    expect(Login.signupPasswordError.getText()).to.eql('Required')
    Login.signupEmail.setValue(testData.signup.validUserName)
    browser.keys('Tab')
    expect(Login.signupEmailError.getText()).to.eql('Invalid email address')
    Login.signupPassword.setValue(testData.signup.invalidPwdShort)
    expect(Login.signupPasswordError.getText()).to.eql(
      'Must be 8 characters or more'
    )
    Login.signupPassword.setValue(testData.signup.invalidPwdLong)
    expect(Login.signupPasswordError.getText()).to.eql(
      'Must be 128 characters or less'
    )
  })

  //TC_22
  it('should validates placeholder text ', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    var usernamePlaceholder = Login.signupUsername.getAttribute('placeholder')
    expect(usernamePlaceholder).to.eq('Enter username')
    var pwdPlaceholder = Login.signupPassword.getAttribute('placeholder')
    expect(pwdPlaceholder).to.eq('Create a password')
    var emailPlaceholder = Login.signupEmail.getAttribute('placeholder')
    expect(emailPlaceholder).to.eq('Enter your email address')
  })

  //TC_06
  it('should create a new user successfully', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    var currentDate = new Date()
    Login.signupUsername.setValue(
      testData.signup.validUserName + currentDate.getTime()
    )
    Login.signupEmail.setValue(
      testData.signup.validUserName + currentDate.getTime() + '@kintoe2e.com'
    )
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.loadingFinished.waitForExist()
    Login.skipTutorialBtn.waitForVisible()
    expect(Login.skipTutorialBtn.isVisible()).to.eql(true)
  })

  //TC_43
  it('should display "Welcome" pop up as soon as user sign up for first time', () => {
    Login.loadingFinished.waitForExist()
    DashboardIndex.tutorialPopUp.waitForVisible()
    expect(DashboardIndex.tutorialPopUp.isVisible()).to.eql(true)
  })

  //TC_44
  it('should verify that "Welcome" pop up displays "Pop up title", "title", "subtitle", "Image", "Skip button" and "start button"', () => {
    expect(DashboardIndex.modalTitle.getText()).to.eql('Welcome to KintoHub')
    expect(DashboardIndex.titleInTutorialPopUp.getText()).to.eql(
      'We can’t wait to reshape the microservices landscape with you.'
    )
    expect(DashboardIndex.subtitleInTutorialPopUp.getText()).to.eql(
      'It’s developers like you that make us who we are.'
    )
    expect(DashboardIndex.imageInTutorialPopUp.isVisible()).to.eql(true)
    expect(DashboardIndex.skipTutorialBtn.isVisible()).to.eql(true)
    expect(DashboardIndex.darkBtn.getText()).to.eql('Start')
    expect(DashboardIndex.darkBtn.isVisible()).to.eql(true)
  })

  //TC_45
  it('should display "The basics" pop up, when user clicks on "start" button in "Welcome" pop up', () => {
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.darkBtn.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.tutorialPopUp.waitForVisible()
    expect(DashboardIndex.tutorialPopUp.isVisible()).to.eql(true)
  })

  //TC_46
  it('should verify that "The basics" pop up displays "Pop up title", "title", "subtitle", "Image", "Skip button" and "next button"', () => {
    expect(DashboardIndex.modalTitle.getText()).to.eql('The Basics')
    expect(DashboardIndex.titleInTutorialPopUp.getText()).to.eql(
      'Let’s start with the basics…'
    )
    expect(DashboardIndex.subtitleInTutorialPopUp.getText()).to.eql(
      'You build KintoBlocks (microservices), add them to deployments, deploy them then call the APIs.'
    )
    expect(DashboardIndex.imageInTutorialPopUp.isVisible()).to.eql(true)
    expect(DashboardIndex.skipTutorialBtn.isVisible()).to.eql(true)
    expect(DashboardIndex.darkBtn.getText()).to.eql('Next')
    expect(DashboardIndex.darkBtn.isVisible()).to.eql(true)
  })

  //TC_47
  it('should display "Create New Application" pop up, when user clicks on "Next" button in "The basics" pop up', () => {
    DashboardIndex.darkBtn.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.tutorialPopUp.waitForVisible()
    expect(DashboardIndex.tutorialPopUp.isVisible()).to.eql(true)
  })

  //TC_48
  it('should verify that KA tutorial pop up displays "Pop up title", "title", "subtitle", "Image", "Skip button" and "create button"', () => {
    DashboardIndex.tutorialPopUp.waitForVisible()
    expect(DashboardIndex.modalTitle.getText()).to.eql(
      '👩‍💻 Create Your First Deployment & Deploy It'
    )
    expect(DashboardIndex.titleInTutorialPopUp.getText()).to.eql(
      'An example KintoBlock (microservices) has been added to help you.'
    )
    expect(DashboardIndex.subtitleInTutorialPopUp.getText()).to.eql(
      'Now you try creating an deployment…'
    )
    expect(DashboardIndex.imageInTutorialPopUp.isVisible()).to.eql(true)
    expect(DashboardIndex.skipTutorialBtn.isVisible()).to.eql(true)
    expect(DashboardIndex.createBtnInTutorialPopUp.isVisible()).to.eql(true)
  })

  //TC_49
  it('should navigate to dashboard page, when user clicks on "Skip" button in the tutorial pop up', () => {
    DashboardIndex.skipTutorialBtn.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    Login.loadingFinished.waitForExist()
    Login.logout()
  })

  //TC_13
  it('should validate unique email and username', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.signupUsername.setValue(testData.login.validUserName)
    Login.signupEmail.setValue(testData.login.validEmail)
    Login.signupPassword.setValue(testData.login.validPassword)
    Login.signupSubmit()
    Login.signUpFormError.waitForVisible()
    expect(Login.signUpFormError.getText()).to.eql(
      'Username or Email already in use.'
    )
  })

  //TC_12
  it('should validate that username does not accept less than 3 characters', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    var currentDate = new Date()
    Login.signupUsername.setValue(testData.signup.twoLetterUserName)
    Login.signupEmail.setValue(
      testData.signup.twoLetterUserName +
        currentDate.getTime() +
        '@kintoe2e.com'
    )
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.signupUsernameError.waitForVisible()
    expect(Login.signupUsernameError.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  //TC_12
  it('should validate that username does not accept more than 35 characters', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.signupUsername.setValue(testData.signup.maxLetterUserName)
    Login.signupEmail.setValue(testData.signup.validEmailWithChar)
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.signupUsernameError.waitForVisible()
    expect(Login.signupUsernameError.getText()).to.eql(
      'Must be 35 characters or less'
    )
  })

  //TC_14
  it('should validate that username accepts letters (a-z, both caps), numbers (0-9), dashes, underscores, apostrophes, periods (.), at (@)', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    var currentDate = new Date()
    Login.signupUsername.setValue(testData.signup.allCharInvalidUserName)
    Login.signupEmail.setValue(testData.signup.validEmailWithDot)
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.signupUsernameError.waitForVisible()
    expect(Login.signupUsernameError.getText()).to.eql(
      "Only the following special characters @_'. are valid"
    )
    Login.signupUsername.setValue(
      testData.signup.allCharValidUserName + currentDate.getTime()
    )
    Login.signupEmail.setValue(
      testData.signup.allCharValidUserName +
        currentDate.getTime() +
        'kintoe2e.com'
    )
    Login.signupSubmit()
    Login.loadingFinished.waitForExist()
    Login.skipTutorialBtn.waitForVisible()
    expect(Login.skipTutorialBtn.isVisible()).to.eql(true)
    Login.skipTutorialBtn.click()
    Login.loadingFinished.waitForExist()
    Login.logout()
  })

  //TC_16
  it('should validate that username should not accept space between characters', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.signupUsername.setValue(testData.signup.validUserNameWithSpace)
    Login.signupEmail.setValue(testData.signup.validEmailWithdash)
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    expect(Login.signupUsernameError.getText()).to.eql(
      "Only the following special characters @_'. are valid"
    )
  })

  //TC_19
  it('should validate that email accepts only letters (a-z, both caps), numbers (0-9), dashes (-), underscores (_), apostrophes,periods (.), at (@)', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    var currentDate = new Date()
    Login.signupUsername.setValue(
      testData.signup.validUserNameWithNumber + currentDate.getTime()
    )
    Login.signupEmail.setValue(
      testData.signup.validEmailWithMultiChar +
        currentDate.getTime() +
        '@kintoe2e.com'
    )
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.loadingFinished.waitForExist()
    Login.skipTutorialBtn.waitForVisible()
    expect(Login.skipTutorialBtn.isVisible()).to.eql(true)
    Login.skipTutorialBtn.click()
  })

  //TC_18
  it('should validate that email does not accept value less than 5 characters', () => {
    Login.loadingFinished.waitForExist()
    Login.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.signupUsername.setValue(testData.signup.validUserNameWithChar)
    Login.signupEmail.setValue(testData.signup.invalidEmailLength4)
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupEmailError.waitForVisible()
    expect(Login.signupEmailError.getText()).to.eql('Invalid email address')
  })

  //TC_11
  it('should validate password complexity rule is displayed on the Sign Up form', () => {
    expect(Login.password_rule.getText()).to.include(
      'Between 8 - 128 Characters'
    )
  })

  //TC_21
  it('should reveal the password string when clicked on the eye and hide the password if clicked again', () => {
    Login.open()
    Login.signupEmail.waitForVisible()
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupPasswordEye.click()
    var pwdAttrib = Login.signupPassword.getAttribute('type')
    expect(pwdAttrib).to.eq('text')
    Login.signupPasswordEye.waitForVisible()
    Login.signupPasswordEye.click()
    pwdAttrib = Login.signupPassword.getAttribute('type')
    expect(pwdAttrib).to.eq('password')
  })

  //TC_10
  it('should validate that password accepts a password which is with 8 characters, at least 1 number and 1 letter', () => {
    Login.open()
    Login.signupUsername.waitForVisible()
    var currentDate = new Date()
    Login.signupUsername.setValue(
      testData.signup.validUserNameWithDash + currentDate.getTime()
    )
    Login.signupEmail.setValue(
      testData.signup.validUserNameWithDash +
        currentDate.getTime() +
        '@kintoe2e.com'
    )
    Login.signupPassword.setValue(testData.signup.validPasswordEightChar)
    Login.signupSubmit()
    Login.loadingFinished.waitForExist()
    Login.skipTutorialBtn.waitForVisible()
    expect(Login.skipTutorialBtn.isVisible()).to.eql(true)
    Login.skipTutorialBtn.click()
  })

  //TC_10
  it('should validate that password accepts a password which is with 20 characters, at least 1 number and 1 letter', () => {
    Login.loadingFinished.waitForExist()
    Login.logout()
    Login.open()
    Login.signupEmail.waitForVisible()
    var currentDate = new Date()
    Login.signupUsername.setValue(
      testData.signup.validUserNameWithDot + currentDate.getTime()
    )
    Login.signupEmail.setValue(
      testData.signup.validUserNameWithDot +
        currentDate.getTime() +
        '@kintoe2e.com'
    )
    Login.signupPassword.setValue(testData.signup.validPasswordTwentyChar)
    Login.signupSubmit()
    Login.loadingFinished.waitForExist()
    Login.skipTutorialBtn.waitForVisible()
    expect(Login.skipTutorialBtn.isVisible()).to.eql(true)
    Login.skipTutorialBtn.click()
  })

  //TC_23
  it('should validate that password accepts special characters @,dashes(-),underscores(_),apostrophes', () => {
    Login.loadingFinished.waitForExist()
    Login.logout()
    Login.open()
    Login.signupEmail.waitForVisible()
    var currentDate = new Date()
    Login.signupUsername.setValue(
      testData.signup.validUserNameWithAt + currentDate.getTime()
    )
    Login.signupEmail.setValue(
      testData.signup.validUserNameWithAt +
        currentDate.getTime() +
        'kintoe2e.com'
    )
    Login.signupPassword.setValue(testData.signup.validPasswordSpecialChar)
    Login.signupSubmit()
    Login.loadingFinished.waitForExist()
    Login.skipTutorialBtn.waitForVisible()
    expect(Login.skipTutorialBtn.isVisible()).to.eql(true)
    Login.skipTutorialBtn.click()
  })

  //TC_27
  it('should validate that password accepts with all capital letters and one number', () => {
    Login.loadingFinished.waitForExist()
    Login.logout()
    Login.open()
    Login.signupEmail.waitForVisible()
    var currentDate = new Date()
    Login.signupUsername.setValue(
      testData.signup.validUserNameWiths + currentDate.getTime()
    )
    Login.signupEmail.setValue(
      testData.signup.validLongEmail + currentDate.getTime() + '@kintoe2e.com'
    )
    Login.signupPassword.setValue(testData.signup.validPasswordUC)
    Login.signupSubmit()
    Login.loadingFinished.waitForExist()
    Login.skipTutorialBtn.waitForVisible()
    expect(Login.skipTutorialBtn.isVisible()).to.eql(true)
    Login.skipTutorialBtn.click()
  })

  it('should allow user to sign up with special characters as password', () => {
    Login.loadingFinished.waitForExist()
    Login.logout()
    Login.open()
    Login.signupEmail.waitForVisible()
    Login.signupUsername.setValue(
      testData.signup.validUserName + currentDate.getTime()
    )
    Login.signupPassword.setValue(testData.signup.validSpecialCharPassword)
    var validEmail = currentDate.getTime() + testData.signup.validEmailWith$
    Login.signupEmail.setValue(validEmail)
    Login.signupSubmit()
    Login.loadingFinished.waitForExist()
    Login.skipTutorialBtn.waitForVisible()
    expect(Login.skipTutorialBtn.isVisible()).to.eql(true)
    Login.skipTutorialBtn.click()
  })

  it('should verify that user stays in the dashboard page, when user try to navigate to previous page as soon as sign up', () => {
    Login.loadingFinished.waitForExist()
    Login.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    var currentDate = new Date()
    Login.signupUsername.setValue(
      testData.signup.validUserNameWithOddNum + currentDate.getTime()
    )
    Login.signupEmail.setValue(
      testData.signup.validUserNameWithOddNum +
        currentDate.getTime() +
        '@kintoe2e.com'
    )
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.loadingFinished.waitForExist()
    browser.back()
    DashboardIndex.container.waitForExist()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  //TC_18
  //Email > 35 characters is valid and Nadeem wil update the validation criteria.
  //Its a bug accepts more than 254 characters
  it('should validate that email does not accept value more than 254 characters', () => {
    Login.logout()
    Login.open()
    Login.signupUsername.waitForVisible()
    var currentDate = new Date()
    Login.signupUsername.setValue(
      testData.signup.validUserNameWithChar + currentDate.getTime()
    )
    Login.signupEmail.setValue(
      testData.signup.invalidEmailLength255 +
        currentDate.getTime() +
        '@kintoe2e.com'
    )
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.signupEmailError.waitForVisible()
    expect(Login.signupEmailError.getText()).to.eql('Invalid email address')
  })

  it('should not allow user to sign-up using same username in uppercase', () => {
    Login.loadingFinished.waitForExist()
    Login.skipTutorialBtn.waitForVisible()
    Login.skipTutorialBtn.click()
    Login.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    var time = currentDate.getTime()
    Login.signupUsername.setValue('te' + time)
    Login.signupEmail.setValue(
      'te1357' + currentDate.getTime() + '@kintoe2e.com'
    )
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.loadingFinished.waitForExist()
    Login.skipTutorialBtn.waitForVisible()
    Login.skipTutorialBtn.click()
    Login.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.signupUsername.setValue('TE' + time)
    Login.signupEmail.setValue(
      'TE2468' + currentDate.getTime() + '@kintoe2e.com'
    )
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.signUpFormError.waitForVisible()
    expect(Login.signUpFormError.getText()).to.eql(
      'Username or Email already in use.'
    )
  })
})
