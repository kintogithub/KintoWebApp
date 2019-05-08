import { expect } from 'chai'
import Login from '../page-objects/login.page'
import testData from '../constants/testdata.json'
import Landing from '../page-objects/landing.page'
import WorkspaceCreate from '../page-objects/workspace.create.page'
import WorkspaceManage from '../page-objects/workspace.manage.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import DeploymentCreate from '../page-objects/deployment.create.page'
import DeploymentManage from '../page-objects/deployment.manage.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import EnvironmentManage from '../page-objects/environment.manage.page'
import EnvironmentList from '../page-objects/environment.list.page'
import EnvironmentCreate from '../page-objects/environment.create.page'
import DeploymentList from '../page-objects/deployment.list.page'
import {
  getToken,
  callExampleHelloWorld,
  callExampleLoginWithoutPassword,
  callUserKB,
  ApiCall,
  callGoApp
} from '../helpers/apiHelpers'

var currentDate = new Date()
var userOne
var userTwo
var ws
var wsName
var kbName
var reponame
var kaName
var envName
var randomName
var loginKbName
var pythonKbName
var rubyKbName
var PhpKbName
var javaKbName
var GoKbName
var CsharpKbName
var ElixirKbName
var message
var curlCommand, id, key

describe('Sanity - basic test suite', () => {
  it('should allow to sign-up as a new user', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    userOne = testData.signup.validUserName + currentDate.getTime()
    Login.signupUsername.setValue(userOne)
    Login.signupEmail.setValue(
      testData.signup.validUserName + currentDate.getTime() + '@kintoe2e.com'
    )
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.loadingFinished.waitForExist()
    Login.skipTutorialBtn.waitForVisible()
    expect(Login.skipTutorialBtn.isVisible()).to.eql(true)
    Login.loadingFinished.waitForExist()
    Login.skipTutorialBtn.click()
    Login.logout()
  })

  it('should send password reset link to users email', () => {
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

  it('should allow to login an existing user', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(userOne)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    Login.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
  })

  it('should create a new workspace', () => {
    DashboardIndex.workspaceDropdown.selectByValue(0)
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    wsName = testData.workspace.validWorkSpaceName + '1' + currentDate.getTime()
    WorkspaceCreate.name.input.setValue(wsName)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForVisible()
    WorkspaceCreate.workspaceCongratsBtn.click()
    WorkspaceCreate.warningBtn.waitForVisible()
    WorkspaceCreate.warningBtn.click()
    WorkspaceManage.form.waitForVisible()
  })

  it('should allow an admin to change permissions to the members of the workspace', () => {
    DashboardIndex.editWorkspace.click()
    WorkspaceCreate.loadingFinished.waitForExist()
    browser.scroll(0, 400)
    WorkspaceCreate.workspaceEmailInputField.click()
    WorkspaceCreate.workspaceEmailInputField.setValue(
      testData.login.validGmailUser
    )
    WorkspaceCreate.workspacePermissionField.click()
    WorkspaceCreate.workspaceAddIcon.click()
    browser.pause(2000)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    expect(
      WorkspaceManage.getMemberPermissions(2).getText('option:checked')
    ).to.eql('Member')
    WorkspaceManage.getMemberPermissions(2).selectByIndex(1)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    expect(
      WorkspaceManage.getMemberPermissions(2).getText('option:checked')
    ).to.eql('Admin')
    browser.pause(5000)
  })

  it('should allow an admin to delete added member from the workspace', () => {
    WorkspaceCreate.workspaceEmailInputField.click()
    WorkspaceCreate.workspaceEmailInputField.setValue(testData.login.validEmail)
    WorkspaceCreate.workspacePermissionField.click()
    WorkspaceCreate.workspaceAddIcon.click()
    browser.pause(2000)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.getdeleteIcon(3).click()
    browser.pause(5000)
    WorkspaceCreate.revokeAccessBtn.click()
    browser.pause(5000)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
  })

  it('should allow workspace to link with github organisation', () => {
    WorkspaceManage.linkGithub()
  })

  it('should allow workspace to link with bitbucket organisation', () => {
    WorkspaceManage.linkBitbucket()
  })

  it('should sign in into gmail user account', () => {
    WorkspaceManage.logout()
    browser.newWindow('https://accounts.google.com/signin')
    browser.pause(2000)
    browser.url('https://mail.google.com/mail/u/0/#inbox')
    browser.pause(5000)
    WorkspaceManage.searchBarForGmailInbox.waitForVisible()
    WorkspaceManage.searchBarForGmailInbox.setValue('join the workspace')
    browser.keys('Enter')
    browser.pause(5000)
    WorkspaceManage.openMail.waitForVisible()
    WorkspaceManage.openMail.click()
    browser.pause(20000)
  })

  it('should click on the mail and accept the invite', () => {
    if (WorkspaceManage.collapseExpandedEmail.isVisible() === true) {
      WorkspaceManage.collapseExpandedEmail.click()
      browser.pause(5000)
      expect(WorkspaceManage.expandEmail.isVisible()).to.eql(true)
      WorkspaceManage.acceptInviteLink.waitForVisible()
      WorkspaceManage.acceptInviteLink.moveToObject()
      WorkspaceManage.acceptInviteLink.leftClick()
    } else {
      browser.pause(5000)
      WorkspaceManage.acceptInviteLink.waitForVisible()
      WorkspaceManage.acceptInviteLink.moveToObject()
      WorkspaceManage.acceptInviteLink.leftClick()
    }
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[4])
    browser.pause(5000)
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(testData.login.validGmailUser)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    Login.loadingFinished.waitForExist()
    WorkspaceManage.gotItBtn.waitForVisible()
    expect(DashboardIndex.titleInTutorialPopUp.getText()).to.eql(
      `You've joined the workspace "${wsName}".`
    )
    WorkspaceManage.gotItBtn.click()
    WorkspaceManage.loadingFinished.waitForExist()
    expect(WorkspaceManage.gotItBtn.isVisible()).to.eql(false)
    WorkspaceManage.loadingFinished.waitForExist()
    DashboardIndex.logout()
  })

  it('should create a new KintoBlock with new repository in GitHub', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(userOne)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    Login.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.workspaceDropdown.selectByIndex(2)
    DashboardIndex.container.waitForVisible()
    Landing.workspaceSelect.waitForVisible()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbName = testData.kintoblock.validKintoBlockName + '25' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions('11.7.0').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions('11.7.0').click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql('11.7.0')
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    KintoBlockCreate.organisationDropDown.click()
    KintoBlockCreate.getOrganisationOptions('GittestCC').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('GittestCC').click()
    browser.pause(2000)
    reponame = testData.kintoblock.validRepoNameWithChar + '1' + randomName
    KintoBlockCreate.repository.input.setValue(reponame)
    KintoBlockCreate.prepopulateRepoSwitch.scroll(0, 2000)
    KintoBlockCreate.prepopulateRepoSwitch.waitForVisible()
    KintoBlockCreate.prepopulateRepoSwitch.click()
    KintoBlockCreate.prePopulatedIsOn.waitForExist()
    expect(KintoBlockCreate.prePopulatedIsOn.getValue()).to.eql('true')
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForExist()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should create a KintoBlock with existing repository of GitHub', () => {
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    randomName = KintoBlockCreate.randomName()
    KintoBlockCreate.loadingFinished.waitForExist()
    loginKbName =
      testData.kintoblock.validKintoBlockNameWithDigit + '26' + randomName
    KintoBlockCreate.name.input.setValue(loginKbName)
    KintoBlockCreate.kbDisplayName.setValue(loginKbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions('11.7.0').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions('11.7.0').click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql('11.7.0')
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.repoResourceDropDown.click()
    KintoBlockCreate.getOrganisationOptions('GitHub').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('GitHub').click()
    browser.pause(2000)
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(testData.kintoblock.validLoginRepo)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validLoginRepo
    ).waitForVisible()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validLoginRepo
    ).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the KintoBlock with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether KintoBlock with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should verify whether documentation page is displayed for a KintoBlock', () => {
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.viewEndpointsTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
    expect(KintoBlockManage.endpointDefinition.isVisible()).to.eql(true)
  })

  it('should verify new commits are generated automatically, when "AutoBuild" toggle is enabled', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.autoBuildSwitchState.getValue()).to.eql('true')
    browser.scroll(0, 800)
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[5])
    browser.pause(5000)
    KintoBlockManage.readMeEditForLogin.waitForVisible()
    KintoBlockManage.readMeEditForLogin.click()
    KintoBlockManage.editIconInGitHub.waitForVisible()
    KintoBlockManage.editIconInGitHub.click()
    browser.pause(2000)
    expect(KintoBlockManage.editIconInGitHub.isVisible()).to.eql(false)
    KintoBlockManage.updateReadMeName.waitForVisible()
    randomName = KintoBlockCreate.randomName()
    var readMeName = testData.kintoblock.validReadMeName + randomName + 's74'
    KintoBlockManage.updateReadMeName.setValue(readMeName)
    KintoBlockManage.commitChangesBtn.click()
    browser.pause(5000)
    browser.switchTab(tabIds[4])
    browser.pause(5000)
    expect(KintoBlockManage.previousCommit.isVisible()).to.eql(true)
  })

  it('should create a KintoBlock with existing repository of Bitbucket', () => {
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    randomName = KintoBlockCreate.randomName()
    KintoBlockCreate.loadingFinished.waitForExist()
    kbName = testData.kintoblock.validKBNameWithStar + '818' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions('11.7.0').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions('11.7.0').click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql('11.7.0')
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.repoResourceDropDown.click()
    KintoBlockCreate.getOrganisationOptions('Bitbucket').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('Bitbucket').click()
    browser.pause(2000)
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(
      testData.kintoblock.validRepoWithCommit
    )
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.getExistingRepoList(
      testData.bitbucket.organisationName,
      testData.kintoblock.validRepoWithCommit
    ).waitForVisible()
    KintoBlockCreate.getExistingRepoList(
      testData.bitbucket.organisationName,
      testData.kintoblock.validRepoWithCommit
    ).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should create a customservice KB with new repository - GitHub', () => {
    KintoBlockCreate.createCustomServiceKB(
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should create a customservice KB with existing repository - GitHub', () => {
    KintoBlockCreate.createCustomServiceKB(
      testData.kbrepo.repository2,
      testData.github.repoSource,
      testData.github.username,
      testData.kintoblock.validHelmCustomServicerepo
    )
  })

  it('should create a custom service KB with new repository - BitBucket', () => {
    KintoBlockCreate.createCustomServiceKB(
      testData.kbrepo.repository1,
      testData.bitbucket.organisationName
    )
  })

  it('should create a customservice KB with existing repository - BitBucket', () => {
    KintoBlockCreate.createCustomServiceKB(
      testData.kbrepo.repository2,
      testData.bitbucket.repoSource,
      testData.bitbucket.organisationName,
      testData.kintoblock.validHelmCustomServicerepo
    )
  })

  it('should create a website KB with new repository - GitHub', () => {
    KintoBlockCreate.createWebsiteKB(
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should create a website KB with existing repository - GitHub', () => {
    KintoBlockCreate.createWebsiteKB(
      testData.kbrepo.repository2,
      testData.github.repoSource,
      testData.github.username,
      testData.kintoblock.validDynamicWebAppRepo
    )
    browser.scroll(0, 700)
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    browser.pause(2000)
    KintoBlockCreate.portFieldInAdvancedOptions.setValue('5000')
    browser.pause(2000)
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should create a website KB with new repository - Bitbucket', () => {
    KintoBlockCreate.createWebsiteKB(
      testData.kbrepo.repository1,
      testData.bitbucket.organisationName
    )
  })

  it('should create a website KB with ex repository - Bitbucket', () => {
    KintoBlockCreate.createWebsiteKB(
      testData.kbrepo.repository2,
      testData.bitbucket.repoSource,
      testData.bitbucket.organisationName,
      testData.kintoblock.validDynamicWebAppRepo
    )
  })

  it('Should tag the Microservice KB build', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.getTagThisBuildBtn(1).waitForVisible()
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.click()
    KintoBlockManage.majorVersion.setValue('1')
    browser.keys('Tab')
    KintoBlockManage.minorVersion.setValue('0')
    browser.keys('Tab')
    KintoBlockManage.revision.setValue('1')
    KintoBlockManage.notes.click()
    KintoBlockManage.notes.setValue(testData.kintoblock.validKintoBlockName)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should deploy and build a KB for NodeJS', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    kaName = testData.kintoapp.validKintoAppName + '10' + randomName
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(loginKbName)
    KintoBlockList.getFilteredKB(loginKbName).waitForVisible()
    KintoBlockList.getFilteredKB(loginKbName).click()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.deploySuccessBtn()
    DeploymentManage.loadingFinished.waitForExist()
  })

  it('static wait for login app', () => {
    browser.pause(100000)
  })

  it('checking deployment reached success for login app', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should create a new KintoApp using preexisting sample KBs', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kaName = testData.kintoapp.validKintoAppName + '04' + randomName
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    browser.scroll(0, -800)
  })

  it('Should wait for the deployment Success', () => {
    browser.pause(100000)
  })

  it('should deploy a KintoApp using pre-existing sample KBs', () => {
    //Deployment gets auto deployed just checking deployment is successfull
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('Should add new KB to an existing deployment', () => {
    browser.scroll(0, 600)
    DeploymentManage.kbdropDown.scroll()
    DeploymentManage.kbdropDown.setValue(loginKbName)
    KintoBlockList.getFilteredKB(loginKbName).waitForVisible()
    browser.pause(2000)
    KintoBlockList.getFilteredKB(loginKbName).click()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentManage.deployBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
  })

  it('Should wait for the second deployment Success', () => {
    browser.pause(100000)
  })

  it('Should check for the deployment Success', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('Should check the logs of the Deployed KB', () => {
    browser.refresh()
    DeploymentManage.loadingFinished.waitForExist()
    browser.scroll(0, 300)
    DeploymentManage.expandDeploymentHistory.click()
    DeploymentManage.getViewLogsBtn(1).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.getKintoBlockDropDown(2).click()
    DeploymentManage.Logs.waitForVisible()
    expect(DeploymentManage.Logs.isVisible()).to.eql(true)
    DeploymentManage.getKintoBlockDropDown(2).click()
    browser.keys('Down Arrow')
    browser.keys('Enter')
    DeploymentManage.Logs.waitForVisible()
    expect(DeploymentManage.Logs.isVisible()).to.eql(true)
    DeploymentCreate.getenvCardSelect(2).click()
    DeploymentManage.loadingFinished.waitForExist()
  })

  it('should create a new environment for KA deployed using pre-existing KBs', () => {
    DeploymentManage.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    envName =
      testData.Environment.allValidEnvChar + '4' + currentDate.getTime() + 'y'
    EnvironmentCreate.envNameField.setValue(envName)
    EnvironmentCreate.addNewEnvBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.getEnvCardTitle(3).getText()).to.eql(
      envName.toUpperCase()
    )
  })

  it.skip('should deploy another version of the KintoApp deployed using pre-existing KBs', () => {
    //CHECKING PREVIOUS DEPLOYMENT
    DeploymentManage.deployBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.checkforDeploymentSuccess()
    browser.scroll(0, 500)
    DeploymentManage.expandDeploymentHistory.click()
    expect(DeploymentManage.getDeploymentHistory(1).getText()).to.eql('0.0.2')
  })

  it('should verify that the POST API call is successful for the KA deployed using "helloworld" example KB', async () => {
    // clientId, clientSecret
    // get clientid and secret values
    curlCommand = DeploymentManage.clientAndSecretKey.getText().split(':')
    id = curlCommand[2].split('"')
    let clientID = id[1]
    key = curlCommand[3].split('"')
    let clientSecret = key[1]
    const token = await getToken(clientID, clientSecret) // token = 8273782997832792937897823
    const successMessage = await callExampleHelloWorld(token) // successMessage = Logged in successfully
    expect(successMessage).to.eql('Hello world')
  })

  it.skip('should check the response is "200" for successful API call of helloworld example KB', () => {
    EnvironmentManage.requestBtn.waitForVisible()
    EnvironmentManage.requestBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentList.envBuildViewLogsPageTitle.waitForVisible()
    browser.refresh()
    EnvironmentManage.loadingFinished.waitForExist()
    browser.refresh()
    EnvironmentManage.loadingFinished.waitForExist()
    browser.refresh()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.getMessageInEachLogsRow(1, 'one').waitForExist()
    EnvironmentManage.getMessageInEachLogsRow(1, 'one').waitForVisible()
    expect(
      EnvironmentManage.getMessageInEachLogsRow(1, 'one').getText()
    ).to.eql('200')
  })

  it('should delete a KB from an existing deployment', () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForExist()
    DeploymentList.getCard(1).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentCreate.getenvCardSelect(2).click()
    DeploymentManage.loadingFinished.waitForExist()
    browser.scroll(0, 1000)
    KintoBlockManage.getDependenciesDeleteIcon(3).click()
    browser.pause(3000)
    expect(DeploymentManage.getDependenciesDeleteIcon(3).isVisible()).to.eql(
      false
    )
    DeploymentManage.deployBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
  })

  //API call method for login without password
  it('should call API multiple times for invalid login', async () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    curlCommand = DeploymentManage.clientAndSecretKey.getText().split(':')
    id = curlCommand[2].split('"')
    let clientID = id[1]
    key = curlCommand[3].split('"')
    let clientSecret = key[1]
    const token = await getToken(clientID, clientSecret)
    var errorMessage = await callExampleLoginWithoutPassword(token, loginKbName)
    message = errorMessage['error']
    expect(message).to.eql('username and passwords are required')
  })

  it.skip('should check the response is "400" for successful API call of login without password', () => {
    EnvironmentManage.requestBtn.waitForVisible()
    EnvironmentManage.requestBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envBuildViewLogsPageTitle.waitForVisible()
    browser.refresh()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.getMessageInEachLogsRow(1, 'one').waitForExist()
    EnvironmentManage.getMessageInEachLogsRow(1, 'one').waitForVisible()
    expect(
      EnvironmentManage.getMessageInEachLogsRow(1, 'one').getText()
    ).to.eql('400')
  })

  //Env parameters and console logs
  it('should create KB using repo containing console logs', () => {
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbName = testData.kintoblock.validKintoBlockName + '205' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions('11.7.0').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions('11.7.0').click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql('11.7.0')
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.repoResourceDropDown.click()
    KintoBlockCreate.getOrganisationOptions('GitHub').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('GitHub').click()
    browser.pause(2000)
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(
      testData.kintoblock.validRepoWithConsoleLogs
    )
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validRepoWithConsoleLogs
    ).waitForVisible()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validRepoWithConsoleLogs
    ).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the logs KintoBlock build move to PROCESSING', () => {
    browser.pause(100000)
  })

  it('should wait for the logs KintoBlock build move to PROCESSING', () => {
    browser.pause(100000)
  })

  it('should check whether logs KintoBlock build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should add environment variable to KB and deploy the KB', () => {
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    KintoBlockManage.addCustomKey.setValue(
      testData.kintoblock.validEnvKeyForApiCall
    )
    KintoBlockManage.addCustomValue.setValue(
      testData.kintoblock.validEnvValueForApiCall
    )
    KintoBlockManage.addIconOfCustomParam.click()
    browser.pause(2000)
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    browser.scroll(0, 300)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.setValue('0')
    KintoBlockManage.revision.setValue('0')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should create and deploy KA with KB having environment parameter', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    kaName =
      testData.kintoapp.validKANamewithChars + '49' + currentDate.getTime()
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(kbName)
    DeploymentCreate.getFilteredKB(kbName).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentManage.branchAndTagDropDown.scroll(0, 800)
    DeploymentManage.branchAndTagDropDown.waitForVisible()
    DeploymentManage.branchAndTagDropDown.leftClick()
    browser.isVisible('.icon.search')
    KintoBlockManage.getTab('tag').waitForVisible()
    KintoBlockManage.getTab('tag').leftClick()
    DeploymentManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(DeploymentManage.getTagFromBranchTagSwitcher(1).getText()).to.eql(
      '1.0.0'
    )
    DeploymentManage.getTagFromBranchTagSwitcher(1).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
  })

  it('static wait for console log deployment', () => {
    browser.pause(100000)
  })

  it('check console log deployment reached success', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should verify that the GET API call is successful for the KA deployed using existing KBs', async () => {
    curlCommand = DeploymentManage.clientAndSecretKey.getText().split(':')
    id = curlCommand[2].split('"')
    let clientID = id[1]
    key = curlCommand[3].split('"')
    let clientSecret = key[1]
    const token = await getToken(clientID, clientSecret)
    var successMessage = await callUserKB(token, kbName)
    message = successMessage['message']
    expect(message).to.includes(`Hello requestId value: ${ws}-${clientID}`)
  })

  it('should verify whether console logs are displayed for a log', () => {
    browser.scroll(0, 200)
    DeploymentManage.expandDeploymentHistory.click()
    browser.scroll(0, 300)
    EnvironmentManage.getViewLogsBtn(1).waitForVisible()
    EnvironmentManage.getViewLogsBtn(1).click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logsPage.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logMessageFilterSearchBar.setValue('loggedLabel')
    browser.pause(2000)
    EnvironmentManage.getLogMessageFromLogsTable(1).waitForVisible()
    expect(
      EnvironmentManage.getLogMessageFromLogsTable(1).getText()
    ).to.includes('"loggedLabel":"Test Value","loggedValue":"Test Value"')
    DeploymentManage.goBackBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
  })

  it('should create a deployment via "Add to Deployment" button in KB manage page', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(1).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockManage.addToDeployment()
    KintoBlockManage.addToNewDeployment()
  })

  it('should check whether KB build with bitbucket is moved to success', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(2).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should check whether custom service KB with new GitHub repo is moved to success', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(3).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should check whether custom service KB with existing GitHub repo is moved to success', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(4).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should check whether custom service KB with new BitBucket repo is moved to success', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(5).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should check whether custom service KB with existing BitBucket repo is moved to success', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(6).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should check for the website KB with new Github repo is moved to PROCESSING', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(7).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should check for the website KB with existing Github repo is moved to PROCESSING', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(8).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should check for the website KB with new bitbucket repo is moved to PROCESSING', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(9).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should check for the website KB with existing bitbucket repo is moved to PROCESSING', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(10).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy a website KB with existing repo', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(8).waitForVisible()
    kbName = KintoBlockList.getKbCardName(8).getText()
    DeploymentCreate.createKaAndDeploy(kbName, ws)
  })

  it('should wait for the website deployment', () => {
    browser.pause(100000)
  })

  it('should wait for the website deployment', () => {
    browser.pause(100000)
  })

  it('Should check for the website KB deployment Success', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should deploy a website KB with existing repo', () => {
    browser.scroll(0, 2000)
    DeploymentCreate.getwebsiteopen(3).click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[6])
    expect(DeploymentManage.webAppTitle.getText()).to.eql('Payco web app')
  })

  it('should logout from sanity suite', () => {
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[4])
    KintoBlockCreate.logout()
  })

  // TODO
  it.skip('should deploy and build a KB for Python ', () => {})

  // TODO
  it.skip('should deploy and build a KB for Ruby ', () => {})
})

describe('Sanity - KintoBlock Builds - GitHub', () => {
  it('should login as new user and link workspace with GitHub', () => {
    userTwo = Login.registerAndLogin('KBB')
    Login.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
  })

  it('should create a Nodejs KB of microservice type for version 11.7.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.NodeJsRepo
    )
  })

  it('should create a Java KB of microservice type for version 7 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java4,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.JavaRepo
    )
  })

  it('should create a Python KB of microservice type for version 3.7.2 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.PythonRepo
    )
  })

  it('should create a Ruby KB of microservice type for version 2.6.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.RubyRepo
    )
  })

  it('should create a Go KB of microservice type for version 1.11.4 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Go,
      testData.kbversion.Go1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.GoRepo
    )
  })

  it('should create a Csharp KB of microservice type for version 2.2.103 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Csharp,
      testData.kbversion.Csharpnet1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.CsharpRepo
    )
  })

  it('should create a Elixir KB of microservice type for version 1.8.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.ElixirRepo
    )
  })

  it('should create a PHP KB of microservice type for version 7.3.1-cli using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.PHP,
      testData.kbversion.PHP1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.PhpRepo
    )
  })

  //TC_1267
  it('should create a workspace and link to GitHub', () => {
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceCreate.open(ws)
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForVisible()
    WorkspaceCreate.workspaceCongratsBtn.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForVisible()
  })

  it('should create a Nodejs KB of microservice type for version 11.7.0 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs1,
      'Create new repository',
      'GittestCC'
    )
  })

  it('should create a Java KB of microservice type for version 7 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java4,
      'Create new repository',
      'GittestCC'
    )
  })

  it('should create a Python KB of microservice type for version 3.7.2 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python1,
      'Create new repository',
      'GittestCC'
    )
  })

  it('should create a Ruby KB of microservice type for version 2.6.0 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby1,
      'Create new repository',
      'GittestCC'
    )
  })

  it('should create a Go KB of microservice type for version 1.11.4 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Go,
      testData.kbversion.Go1,
      'Create new repository',
      'GittestCC'
    )
  })

  it('should create a Csharp KB of microservice type for version 2.2.103 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Csharp,
      testData.kbversion.Csharpnet1,
      'Create new repository',
      'GittestCC'
    )
  })

  it('should create a Elixir KB of microservice type for version 1.8.0 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir1,
      'Create new repository',
      'GittestCC'
    )
  })

  it('should create a PHP KB of microservice type for version 7.3.1-cli by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.PHP,
      testData.kbversion.PHP1,
      'Create new repository',
      'GittestCC'
    )
  })

  it('should deploy Microservice KB - NodeJS version 11.7.0', () => {
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    KintoBlockCreate.BuildRefresh(0)
  })

  it('should wait for the NodeJs KintoBlock of version 11.7.0 to move to Running', () => {
    browser.pause(100000)
  })

  it('should verify NodeJs KintoBlock of version 11.7.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 7', () => {
    KintoBlockCreate.BuildRefresh(1)
  })

  it('should wait for the Java KintoBlock of version 7 to move to Running', () => {
    browser.pause(100000)
  })

  it('should verify Java KintoBlock of version 7 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.7.2', () => {
    KintoBlockCreate.BuildRefresh(2)
  })

  it('should wait for the Python KintoBlock of version 3.7.2 to move to Running', () => {
    browser.pause(100000)
  })

  it('should verify Python KintoBlock of version 3.7.2 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.6.0', () => {
    KintoBlockCreate.BuildRefresh(3)
  })

  it('should wait for the Ruby KintoBlock of version 2.6.0 to move to Running', () => {
    browser.pause(100000)
  })

  it('should verify Ruby KintoBlock of version 2.6.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Go version 1.11.4', () => {
    KintoBlockCreate.BuildRefresh(4)
  })

  it('should wait for the Go KintoBlock of version 1.11.4 to move to Running', () => {
    browser.pause(100000)
  })

  it('should check whether Go KintoBlock for versio 1.11.4 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Csharp version 2.2.103', () => {
    KintoBlockCreate.BuildRefresh(5)
  })

  it('should wait for the Csharp KintoBlock of version 2.2.103 to move to Running', () => {
    browser.pause(100000)
  })

  it('should check whether Csharp KintoBlock for versio 2.2.103 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.8.0', () => {
    KintoBlockCreate.BuildRefresh(6)
  })

  it('should wait for the Elixir KintoBlock of version 1.8.0 to move to Running', () => {
    browser.pause(100000)
  })

  it('should check whether Elixir KintoBlock for versio 1.8.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - PHP version 7.3.1-cli', () => {
    KintoBlockCreate.BuildRefresh(7)
  })

  it('should wait for the PHP KintoBlock of version 7.3.1-cli to move to Running', () => {
    browser.pause(100000)
  })

  it('should check whether PHP KintoBlock for versio 7.3.1-cli is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - NodeJS version 11.7.0', () => {
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.workspaceDropdown.selectByIndex(2)
    KintoBlockCreate.BuildRefresh(0)
  })

  it('should wait for the NodeJs KintoBlock of version 11.7.0 to move to Running', () => {
    browser.pause(100000)
  })

  it('should verify NodeJs KintoBlock of version 11.7.0 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 7', () => {
    KintoBlockCreate.BuildRefresh(1)
  })

  it('should wait for the Java KintoBlock of version 7 with pre-populated repo to move to Running', () => {
    browser.pause(100000)
  })

  it('should verify Java KintoBlock of version 7 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.7.2', () => {
    KintoBlockCreate.BuildRefresh(2)
  })

  it('should wait for the Python KintoBlock of version 3.7.2 with pre-populated repo to move to Running', () => {
    browser.pause(100000)
  })

  it('should verify Python KintoBlock of version 3.7.2 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.6.0', () => {
    KintoBlockCreate.BuildRefresh(3)
  })

  it('should wait for the Ruby KintoBlock of version 2.6.0 with pre-populated repo to move to Running', () => {
    browser.pause(100000)
  })

  it('should verify Ruby KintoBlock of version 2.6.0 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Go version 1.11.4', () => {
    KintoBlockCreate.BuildRefresh(4)
  })

  it('should wait for the Go KintoBlock of version 1.11.4 with pre-populated repo to move to Running', () => {
    browser.pause(100000)
  })

  it('should check whether Go KintoBlock for versio 1.11.4 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Csharp version 2.2.103', () => {
    KintoBlockCreate.BuildRefresh(5)
  })

  it('should wait for the Csharp KintoBlock of version 2.2.103 with pre-populated repo to move to Running', () => {
    browser.pause(100000)
  })

  it('should check whether Csharp KintoBlock for versio 2.2.103 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.8.0', () => {
    KintoBlockCreate.BuildRefresh(6)
  })

  it('should wait for the Elixir KintoBlock of version 1.8.0 with pre-populated repo to move to Running', () => {
    browser.pause(100000)
  })

  it('should check whether Elixir KintoBlock for versio 1.8.0 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - PHP version 7.3.1-cli', () => {
    KintoBlockCreate.BuildRefresh(7)
  })

  it('should wait for the PHP KintoBlock of version 7.3.1-cli with pre-populated repo to move to Running', () => {
    browser.pause(100000)
  })

  it('should check whether PHP KintoBlock for versio 7.3.1-cli with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should logout from KB - builds of bitbucket repos', () => {
    KintoBlockManage.logout()
  })
})

describe('Sanity - Deployments API Calls', () => {
  it('should make 3 KBs public in the following account', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(userTwo)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    Login.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
    pythonKbName = KintoBlockManage.shareKbToPublic(0)
    rubyKbName = KintoBlockManage.shareKbToPublic(3)
    javaKbName = KintoBlockManage.shareKbToPublic(1)
  })

  it('should make 5 KBs public in the following account', () => {
    GoKbName = KintoBlockManage.shareKbToPublic(4)
    CsharpKbName = KintoBlockManage.shareKbToPublic(5)
    ElixirKbName = KintoBlockManage.shareKbToPublic(6)
    PhpKbName = KintoBlockManage.shareKbToPublic(7)
  })

  it('should create a deployment with python KB and deploy it', () => {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.createKaAndDeploy(pythonKbName, ws)
  })

  it('checking deployment reached success for python app', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should call API multiple times for python deployment', async () => {
    curlCommand = DeploymentManage.clientAndSecretKey.getText().split(':')
    id = curlCommand[2].split('"')
    let clientID = id[1]
    key = curlCommand[3].split('"')
    let clientSecret = key[1]
    const token = await getToken(clientID, clientSecret)
    var successMessage = await ApiCall(pythonKbName, token, 'hello')
    message = successMessage['message']
    expect(message).to.eql('Hello KintoUser')
  })

  it('should create a deployment with Ruby KB and deploy it', () => {
    DeploymentCreate.createKaAndDeploy(rubyKbName, ws)
  })

  it('checking deployment reached success for ruby app', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should call API multiple times for ruby deployment', async () => {
    curlCommand = DeploymentManage.clientAndSecretKey.getText().split(':')
    id = curlCommand[2].split('"')
    let clientID = id[1]
    key = curlCommand[3].split('"')
    let clientSecret = key[1]
    const token = await getToken(clientID, clientSecret)
    var successMessage = await ApiCall(rubyKbName, token, 'hello')
    message = successMessage['message']
    expect(message).to.eql('Hello KintoUser')
  })

  it('should create a deployment with Php KB and deploy it', () => {
    DeploymentCreate.createKaAndDeploy(PhpKbName, ws)
  })

  it('checking deployment reached success for php app', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should call API multiple times for Php deployment', async () => {
    curlCommand = DeploymentManage.clientAndSecretKey.getText().split(':')
    id = curlCommand[2].split('"')
    let clientID = id[1]
    key = curlCommand[3].split('"')
    let clientSecret = key[1]
    const token = await getToken(clientID, clientSecret)
    var successMessage = await ApiCall(PhpKbName, token, 'hello')
    message = successMessage['message']
    expect(message).to.eql('Hello KintoUser')
  })

  it('should create a deployment with java KB and deploy it', () => {
    DeploymentCreate.createKaAndDeploy(javaKbName, ws)
  })

  it('checking deployment reached success for java app', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should call API multiple times for java deployment', async () => {
    curlCommand = DeploymentManage.clientAndSecretKey.getText().split(':')
    id = curlCommand[2].split('"')
    let clientID = id[1]
    key = curlCommand[3].split('"')
    let clientSecret = key[1]
    const token = await getToken(clientID, clientSecret)
    var successMessage = await ApiCall(javaKbName, token, 'sample')
    message = successMessage['output']
    expect(message).to.eql('KintoUser')
  })

  it('should create a deployment with Go KB and deploy it', () => {
    DeploymentCreate.createKaAndDeploy(GoKbName, ws)
  })

  it('checking deployment reached success for Go app', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should call API multiple times for Go deployment', async () => {
    curlCommand = DeploymentManage.clientAndSecretKey.getText().split(':')
    id = curlCommand[2].split('"')
    let clientID = id[1]
    key = curlCommand[3].split('"')
    let clientSecret = key[1]
    const token = await getToken(clientID, clientSecret)
    var successMessage = await callGoApp(GoKbName, token)
    expect(successMessage).to.eql('Hello astaxie!')
  })

  it('should create a deployment with Csharp KB and deploy it', () => {
    DeploymentCreate.createKaAndDeploy(CsharpKbName, ws)
  })

  it('checking deployment reached success for Csharp 2.0 app', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should call API multiple times for Csharp 2.0 deployment', async () => {
    curlCommand = DeploymentManage.clientAndSecretKey.getText().split(':')
    id = curlCommand[2].split('"')
    let clientID = id[1]
    key = curlCommand[3].split('"')
    let clientSecret = key[1]
    const token = await getToken(clientID, clientSecret)
    var successMessage = await ApiCall(CsharpKbName, token, 'sample')
    expect(successMessage).to.eql('KintoUser')
  })

  it('should create a deployment with Elixir KB and deploy it', () => {
    DeploymentCreate.createKaAndDeploy(ElixirKbName, ws)
  })

  it('checking deployment reached success for Elixir app', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should call API multiple times for Elixir deployment', async () => {
    curlCommand = DeploymentManage.clientAndSecretKey.getText().split(':')
    id = curlCommand[2].split('"')
    let clientID = id[1]
    key = curlCommand[3].split('"')
    let clientSecret = key[1]
    const token = await getToken(clientID, clientSecret)
    var successMessage = await ApiCall(ElixirKbName, token, 'sample')
    expect(successMessage).to.eql('KintoUser')
  })

  it('should logout from usertwo account', () => {
    DeploymentManage.logout()
  })
})

describe('Sanity - ShutDown deployments', () => {
  it('should login into userone account', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(userOne)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    Login.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
  })

  it('should shut down first two deployments deployed in userone account', () => {
    DashboardIndex.workspaceDropdown.selectByIndex(2)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentManage.shutDownDeployment(0, ws, 2)
    DeploymentManage.shutDownDeployment(1, ws, 2)
  })

  it('should shut down next three deployments deployed in userone account', () => {
    DeploymentManage.shutDownDeployment(2, ws, 2)
    DeploymentManage.shutDownDeployment(3, ws, 2)
    DeploymentManage.shutDownDeployment(4, ws, 2)
  })

  it('should logout from userone account', () => {
    DeploymentManage.logout()
  })

  it('should login into usertwo account', () => {
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(userTwo)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    Login.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
  })

  it('should shut down first three deployments deployed in usertwo account', () => {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentManage.shutDownDeployment(0, ws, 2)
    DeploymentManage.shutDownDeployment(1, ws, 2)
    DeploymentManage.shutDownDeployment(2, ws, 2)
  })

  it('should shut down next three deployments deployed in usertwo account', () => {
    DeploymentManage.shutDownDeployment(3, ws, 2)
    DeploymentManage.shutDownDeployment(4, ws, 2)
    DeploymentManage.shutDownDeployment(5, ws, 2)
  })

  it('should shut down last one deployments deployed in usertwo account', () => {
    DeploymentManage.shutDownDeployment(6, ws, 2)
  })

  it('should logout from usertwo account', () => {
    DeploymentManage.logout()
  })
})
