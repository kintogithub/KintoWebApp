import { expect } from 'chai'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import DeploymentCreate from '../page-objects/deployment.create.page'
import DeploymentManage from '../page-objects/deployment.manage.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import WorkspaceManage from '../page-objects/workspace.manage.page'
import Login from '../page-objects/login.page'
import Landing from '../page-objects/landing.page'
import testData from '../constants/testdata.json'
import MembersBar from '../page-objects/members.bar.page'
import WorkspaceCreate from '../page-objects/workspace.create.page'
import landingPage from '../page-objects/landing.page'
import EnvironmentCreate from '../page-objects/environment.create.page'

var reponame
var KBName
var currentTime = new Date()
var currentDate = new Date()
var memberOne
var memberTwo
var memberThree
var memberFour
var username
var memberOneEmail
var memberTwoEmail
var memberThreeEmail
var memberFourEmail
var memberFiveEmail
var dict
var firstOption
var randomName

describe('KB - 1 - create kintoBlock', () => {
  it('should redirect the user to login, when he is trying to access list of kbs and he is not logged in', () => {
    KintoBlockList.open(1) //Default workspace ID 1 passed as user is not yet logged in in this case
    Login.loginForm.waitForVisible()
    expect(Login.getUrl()).to.eql('/log-in')
  })

  //Skipping this as there are always some existing KBs in the Application now
  it.skip('should redirect the user to create kb when he is trying to access list kbs with no kbs created', () => {
    Login.registerAndLogin()
    WorkspaceManage.linkGithub()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.form.isVisible()).to.eq(true)
  })

  it('should validate inputs and not allow user to create a kb with invalid data', () => {
    username = Login.registerAndLogin('A')
    WorkspaceManage.linkGithub()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName +
        '23' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'u'
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.repoError.waitForVisible()
    expect(KintoBlockCreate.repoError.getText()).to.eql('Required')
    expect(KintoBlockCreate.shortDescription.error.getText()).to.eql('Required')
    expect(KintoBlockCreate.languageError.getText()).to.eql('Required')
  })

  it('should validate inputs and not allow user to create a kb with name less than 3 characters', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  it('should validate inputs and not allow user to create a kb with name more than 24 characters', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBFortyChar)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Must be 24 characters or less'
    )
  })

  it('should validate inputs and not allow user to create a kb with name in Upper case', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBCAPSChar)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Must contain only lowercase characters, digits and hyphens'
    )
  })

  it('should validate inputs and not allow user to create a kb with name containing special characters', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.invalidKBNameWithChar
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Must contain only lowercase characters, digits and hyphens'
    )
  })

  it('should validate inputs and not allow user to create a kb with name starting with number', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.invalidKBNameWithDigit
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      "The first character can't be a digit"
    )
  })

  it('should validate inputs and not allow  user to create a kb with description more than 200 characters', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName
    )
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.invalidKBDescription
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.shortDescription.error.waitForVisible()

    expect(KintoBlockCreate.shortDescription.error.getText()).to.eql(
      'Must be 200 characters or less'
    )
  })

  it('should check whether github icon is displayed in microservice create page', () => {
    KintoBlockCreate.organisationIconwithText.waitForVisible()
    expect(KintoBlockCreate.organisationIconwithText.isVisible()).to.eql(true)
  })

  it('should create a new kb and redirect to list kbs page', () => {
    randomName = KintoBlockCreate.randomName()
    KBName = testData.kintoblock.validKintoBlockName + '25' + randomName
    KintoBlockCreate.name.input.setValue(KBName)
    KintoBlockCreate.kbDisplayName.setValue(KBName + '09')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
    KintoBlockCreate.versionDropDown.waitForVisible()
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions('11.7.0').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions('11.7.0').click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql('11.7.0')
    browser.scroll(0, 1000)
    KintoBlockCreate.organisationDropDown.click()
    KintoBlockCreate.getOrganisationOptions('GittestCC').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('GittestCC').click()
    KintoBlockCreate.loadingFinished.waitForExist()
    reponame = testData.kintoblock.validRepoName + '1' + randomName
    KintoBlockCreate.repository.input.setValue(reponame)
    browser.scroll(0, 2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForVisible()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should check whether success message is displayed in the blue banner bar', () => {
    expect(KintoBlockManage.kbCreationSuccessMsgText.isVisible()).to.eql(true)
  })

  it('should display alert pop up message, when user try to navigate to any page of KH from `create new kintoblock` page while `create new kintoblock` button is enabled', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    expect(KintoBlockCreate.submitBtn.isEnabled()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()
  })

  it('should be able to select already existing Repo from my Github account', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName =
      testData.kintoblock.validKintoBlockNameWithDigit + '26' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '15')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    KintoBlockCreate.selectExistingRepository()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should check whether check for new commits button, tag build button, recent builds, open repo etc are visible', () => {
    browser.pause(8000)
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    expect(KintoBlockManage.refreshCommitBtn.isVisible()).to.eql(true)
    KintoBlockManage.recentBuildBlock.waitForVisible()
    expect(KintoBlockManage.recentBuildBlock.isVisible()).to.eql(true)
    KintoBlockManage.getTagThisBuildBtn(1).waitForVisible()
    expect(KintoBlockManage.getTagThisBuildBtn(1).isVisible()).to.eql(true)
    browser.scroll(0, 600)
    KintoBlockManage.openRepoBtn.waitForVisible()
    expect(KintoBlockManage.openRepoBtn.isVisible()).to.eql(true)
    browser.scroll(0, 400)
    KintoBlockManage.advancedOptionBlock.waitForVisible()
    expect(KintoBlockManage.advancedOptionBlock.isVisible()).to.eql(true)
    KintoBlockManage.autoBuildSwitch.waitForVisible()
    expect(KintoBlockManage.autoBuildSwitch.isVisible()).to.eql(true)
    KintoBlockManage.envParametersComponent.waitForVisible()
    expect(KintoBlockManage.envParametersComponent.isVisible()).to.eql(true)
    KintoBlockManage.requiredToggleForCustomParam.waitForVisible()
    expect(KintoBlockManage.requiredToggleForCustomParam.isVisible()).to.eql(
      true
    )
  })

  it('should click on view example project link and navigated to documentation page', () => {
    browser.scroll(0, 800)
    KintoBlockManage.viewExampleProjectsLink.waitForVisible()
    KintoBlockManage.viewExampleProjectsLink.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[1])
    browser.pause(2000)
    browser.switchTab(tabIds[0])
  })

  it('should click on open repo btn and should be navigated to github page', () => {
    KintoBlockManage.openRepoBtn.waitForVisible()
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[2])
    browser.pause(2000)
    browser.switchTab(tabIds[0])
  })

  it('should expand Advanced options toggle in KB manage page', () => {
    browser.scroll(0, 600)
    KintoBlockManage.advancedOptionsExpandIcon.waitForVisible()
    KintoBlockManage.advancedOptionsExpandIcon.click()
  })

  it('should check whether auto-build switch is on by default', () => {
    expect(KintoBlockManage.autoBuildSwitch.isEnabled()).to.eql(true)
  })

  it('should check whether port field, build field and run command field are visible in Advanced Options', () => {
    KintoBlockManage.portFieldInAdvancedOptions.waitForVisible()
    expect(KintoBlockManage.portFieldInAdvancedOptions.isVisible()).to.eql(true)
    KintoBlockManage.buildCommandInAdvancedOptions.waitForVisible()
    expect(KintoBlockManage.buildCommandInAdvancedOptions.isVisible()).to.eql(
      true
    )
    KintoBlockManage.runCommandInAdvancedOptions.waitForVisible()
    expect(KintoBlockManage.runCommandInAdvancedOptions.isVisible()).to.eql(
      true
    )
  })

  it('should check whether user is able toggle between the protocol options in Microservice KB', () => {
    browser.scroll(0, 900)
    KintoBlockManage.advancedOptionBlockOpen.waitForVisible()
    expect(KintoBlockManage.advancedOptionBlockOpen.isVisible()).to.eql(true)
    KintoBlockManage.protocolFieldIn.waitForVisible()
    KintoBlockManage.protocolFieldIn.click()
    browser.pause(2000)
    browser.keys('Down arrow')
    browser.keys('Up arrow')
    browser.keys('Enter')
  })

  it('should allow user to toggle between te Doc options', () => {
    KintoBlockCreate.docFormat.click()
    expect(KintoBlockManage.getDocFormatOptions('ApiDoc').isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getDocFormatOptions('None').isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getDocFormatOptions('Swagger').isVisible()).to.eql(
      true
    )
    KintoBlockManage.getDocFormatOptions('None').click()
  })

  // it('should check whether build and run commands are visible with the default values', () => {
  //   KintoBlockCreate.buildCommandInAdvancedOptions.waitForVisible()
  //   expect(KintoBlockCreate.buildCommandInAdvancedOptions.isVisible()).to.eql(true)
  //   KintoBlockCreate.runCommandInAdvancedOptions.waitForVisible()
  //   expect(KintoBlockCreate.runCommandInAdvancedOptions.isVisible()).to.eql(true)
  // })

  // it('should check for the text in the pop-up displayed when clicked on "?" symbol next to doc format in micro KB create page', () => {
  //   browser.scroll(0,200)
  //   KintoBlockCreate.docToolTip.click()
  //   browser.pause(2000)
  //   expect(KintoBlockCreate.docToolTipText.getText()).to.equal('The protocol you would like this microservice to communicate with')
  // })

  // it('should check whether options ApiDoc,None and Swagger options are displayed in doc drop down of micro KB create page', () =>{
  //   KintoBlockCreate.docFormat.click()
  //   expect(KintoBlockManage.getDocFormatOptions('ApiDoc').isVisible()).to.eql(true)
  //   expect(KintoBlockManage.getDocFormatOptions('None').isVisible()).to.eql(true)
  //   expect(KintoBlockManage.getDocFormatOptions('Swagger').isVisible()).to.eql(true)
  //   KintoBlockManage.getDocFormatOptions('ApiDoc').click()
  // })

  it('should be able to fill the environment variables in KB Manage page', () => {
    browser.scroll(0, 200)
    KintoBlockManage.addCustomKey.waitForVisible()
    KintoBlockManage.addCustomKey.setValue(
      testData.kintoblock.validEnvKeyForApiCall
    )
    KintoBlockManage.addCustomValue.setValue(
      testData.kintoblock.validEnvValueForApiCall
    )
  })

  it('should check whether required toggle is visible in micro KB Manage page', () => {
    expect(KintoBlockManage.requiredToggleForCustomParam.isVisible()).to.eql(
      true
    )
    KintoBlockManage.requiredToggleForCustomParam.click()
    KintoBlockManage.addIconOfCustomParam.click()
    browser.pause(2000)
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.submitGlobal()
  })

  it('should click on edit icon in Microservice KB Manage Page', () => {
    browser.scroll(0, -100)
    KintoBlockManage.basicInfoEditIcon.waitForVisible()
    KintoBlockManage.basicInfoEditIcon.click()
    browser.pause(5000)
    expect(KintoBlockManage.basicInfoNameFieldTitle.isVisible()).to.eql(true)
    expect(KintoBlockManage.basicInfoDisplayFieldTitle.isVisible()).to.eql(true)
    expect(KintoBlockManage.basicInfoDescriptionFieldTitle.isVisible()).to.eql(
      true
    )
  })

  it('should check whether language and version fields are visible in the microservice edit page', () => {
    expect(KintoBlockManage.languageFieldTitle.isVisible()).to.eql(true)
    expect(KintoBlockManage.versionFieldTitle.isVisible()).to.eql(true)
    KintoBlockManage.basicInfoCancelBtn.click()
  })

  it('should check whether "view endpoints" btn is not visible if "none" is selected in Micro KB Manage page', () => {
    expect(KintoBlockManage.viewEndpointsBtn.isVisible()).to.eql(false)
  })

  it('should not allow user to create duplicate KB across different user accounts', () => {
    var KbTitle = KintoBlockManage.title.getText().split(' - ')
    var KbName = KbTitle[0]
    KintoBlockManage.logout()
    Login.registerAndLogin('DU')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.name.input.setValue(KbName)
    KintoBlockCreate.kbDisplayName.setValue(KbName + '56')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    KintoBlockCreate.selectExistingRepository()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    //Commented as user is able to create a duplicate KB
    // KintoBlockCreate.duplicateNameError.waitForVisible()
    // expect(KintoBlockCreate.duplicateNameError.getText()).to.eql(
    //   'The name already exists on KintoHub. Please choose a unique name.'
    // )
    //Remove the below lines once the bug is fixed
    KintoBlockManage.amazingBtn.waitForVisible()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.form.isVisible()).to.eql(false)
  })
})

describe('KB - 2 - Success MSG on Creation - Component', () => {
  //TC_449
  it('should dislay success message for KB creation, if that KB doesn`t have any commits', () => {
    expect(KintoBlockManage.noCommit.getText()).to.eql(
      'No build was built successfully yet.'
    )
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(true)
  })

  //TC_450
  it('should display success message for KB creation below top navigation bar', () => {
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(true)
  })

  //TC_451
  it('should display success message for KB creation untill user dismisses it', () => {
    //Already its displayed
    KintoBlockManage.successMsgCloseBtn.click()
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(false)
  })

  //TC_452
  it('should display success message for KB creation in other pages of KH, if its not yet dismissed', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.kbSuccessMsg.waitForVisible()
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(true)
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(true)
    KintoBlockManage.successMsgCloseBtn.leftClick()
    DashboardIndex.homeLeftnav.click()
    DashboardIndex.loadingFinished.waitForExist()
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(false)
  })

  //TC_454
  it('should display success message for KB creation as `Kudos for creating a KintoBlock - head over to Github and start coding!`', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(true)
    expect(KintoBlockManage.kbSuccessMsg.getText()).to.eql(
      'Kudos for creating a KintoBlock - head over to your repo source and start coding!'
    )
  })

  //TC_455
  it('should display close icon for success message for KB creation on left side of blue bar', () => {
    expect(KintoBlockManage.successMsgCloseBtn.isVisible()).to.eql(true)
  })
})

describe.skip('KB - 2 - Projects KB create page - Members bar', () => {
  //TC_660
  it('should display icon with first two letters of the owner for owner icon in KB create page members bar', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    //Getting icon text from logout btn as it has first two letters of owner
    var ownerText = MembersBar.ownerIconText.getText()
    MembersBar.ownerIconInForm.isVisible()
    //Getting icon text from the KA form
    expect(MembersBar.ownerIconInForm.getText()).to.eql(ownerText)
    KintoBlockCreate.logout()
    //Creating members
    memberOne = Login.registerAndLogin('B') + '@kintoe2e.com'
    Login.logout()
    memberTwo = Login.registerAndLogin('C') + '@kintoe2e.com'
    Login.logout()
    memberThree = Login.registerAndLogin('D') + '@kintoe2e.com'
  })

  //TC_661
  it('should display icon with first two letters of the member for member icons in KB create page members bar', () => {
    Login.logout()
    memberFour = Login.registerAndLogin('E') + '@kintoe2e.com'
    Login.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    WorkspaceManage.workspaceEmailInputField.waitForVisible()
    memberOneEmail = WorkspaceManage.getAddedMemberEmail(1).getValue()

    WorkspaceManage.workspaceEmailInputField.setValue(memberOne)
    WorkspaceManage.workspaceAddIcon.click()
    memberTwoEmail = WorkspaceManage.getAddedMemberEmail(2).getValue()
    expect(memberTwoEmail).to.eql(memberOne)

    WorkspaceManage.workspaceEmailInputField.setValue(memberTwo)
    WorkspaceManage.workspaceAddIcon.click()
    memberThreeEmail = WorkspaceManage.getAddedMemberEmail(3).getValue()
    expect(memberThreeEmail).to.eql(memberTwo)

    WorkspaceManage.workspaceEmailInputField.setValue(memberThree)
    WorkspaceManage.workspaceAddIcon.click()
    memberFourEmail = WorkspaceManage.getAddedMemberEmail(4).getValue()
    expect(memberFourEmail).to.eql(memberThree)

    WorkspaceManage.workspaceEmailInputField.setValue(memberFour)
    WorkspaceManage.workspaceAddIcon.click()
    memberFiveEmail = WorkspaceManage.getAddedMemberEmail(5).getValue()
    expect(memberFiveEmail).to.eql(memberFour)

    WorkspaceManage.submitGlobal()
    WorkspaceManage.loadingFinished.waitForExist()
    dict = MembersBar.initialsOfMembers()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    MembersBar.getMembersIconInForm(1).waitForVisible()
    expect(MembersBar.getMembersIconInForm(1).getText()).to.eql(dict[0])
    expect(MembersBar.getMembersIconInForm(2).getText()).to.eql(dict[1])
    expect(MembersBar.getMembersIconInForm(3).getText()).to.eql(dict[2])
    expect(MembersBar.getMembersIconInForm(4).getText()).to.eql(dict[3])
  })

  //TC_662
  it('should display title of `Edit collaborators pop up` and `members list`, `search bar`, `members list`, `ok` and `invite members btn` in `Edit Collab` pop up via KB create page', () => {
    MembersBar.toggleBarSwitch.click()
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollabPopUpTitle.waitForVisible()
    expect(MembersBar.editCollabPopUpTitle.getText()).to.eql(
      'Edit Collaborators'
    )
    expect(MembersBar.editCollabSearchBar.isVisible()).to.eql(true)
    expect(MembersBar.titleOfEditCollabMembersList.getText()).to.eql(
      'Select ( ✓ ) the members who have access to this project:'
    )
    expect(
      MembersBar.getMemberIconTextFromEditCollabPopUp(1).isVisible()
    ).to.eql(true)
    expect(MembersBar.getMembersEmailFromEditCollabPopUp(1).isVisible()).to.eql(
      true
    )
    expect(MembersBar.getPermissionDropDownInEditCollab(1).isVisible()).to.eql(
      true
    )
    expect(MembersBar.getCheckBoxesOfMembersInEditCollab(1).isVisible()).to.eql(
      true
    )
    expect(MembersBar.inviteMembersInEditCollab.isVisible()).to.eql(true)
    expect(MembersBar.OkBtnInEditCollabPopUp.isVisible()).to.eql(true)
  })

  //TC_664
  it('should display all members of workspace in members list of `Edit collaborators` pop up triggered via KB create page', () => {
    expect(
      MembersBar.getMembersEmailFromEditCollabPopUp(1).getValue()
    ).to.include(memberOneEmail)
    expect(
      MembersBar.getMembersEmailFromEditCollabPopUp(2).getValue()
    ).to.include(memberTwoEmail)
    expect(
      MembersBar.getMembersEmailFromEditCollabPopUp(3).getValue()
    ).to.include(memberThreeEmail)
    expect(
      MembersBar.getMembersEmailFromEditCollabPopUp(4).getValue()
    ).to.include(memberFourEmail)
    expect(
      MembersBar.getMembersEmailFromEditCollabPopUp(5).getValue()
    ).to.include(memberFiveEmail)
  })
  //663
  it('should verify that owner icon has a crown on its top in members bar of KB create page', () => {
    MembersBar.OkBtnInEditCollabPopUp.click()
    KintoBlockCreate.form.waitForVisible()
    var ownerText = MembersBar.ownerIconText.getText()
    expect(MembersBar.ownerIconInForm.getText()).to.eql(ownerText)
    MembersBar.crownOfOwnerIcon.waitForVisible()
    expect(MembersBar.crownOfOwnerIcon.isVisible()).to.eql(true)
  })

  // //TC_665
  // it('should display `+X` icon, when there are more than 5 members to display and toggle bar is switched on in KB create page members bar', () => {
  //   //TODO
  // })

  // //TC_666
  // it('should display `+X` icon with `Edit icon` in KB create page members bar, when toggle bar is switched off', () => {
  //   //TODO
  // })

  //TC_667
  it('should verify that members as "Admin" are listed first in the row of KB create page members bar', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceManage.open(ws)
    browser.alertAccept()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.getMemberPermissions(5).waitForVisible()
    var currentFifthMember = WorkspaceManage.getAddedMemberEmail(5).getValue()
    //For now only 5 members can be in a workspace including owner of workspace
    //Now expect owner all members have member permission only
    //Changing 5th member permission to admin
    WorkspaceManage.getMemberPermissions(5).selectByIndex(1)
    WorkspaceManage.submitGlobal()
    //After changing permission 5th member come to position 2
    WorkspaceManage.loadingFinished.waitForExist()
    expect(WorkspaceManage.getAddedMemberEmail(2).getValue()).to.eql(
      currentFifthMember
    )
    dict = MembersBar.initialsOfMembers()
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(MembersBar.getMembersIconInForm(1).getText()).to.eql(dict[0])
  })

  //TC_668
  it('should verify that "Admin" icons has star icon on its top of KB create page members bar', () => {
    //For now only one member is admin
    expect(
      MembersBar.getAdminStarIconOfMembersInProjectsBar(1).isVisible()
    ).to.eql(true)
  })

  //TC_669
  it('should display `Edit icon`, when toggle bar is switched off in KB create page members bar', () => {
    MembersBar.toggleBarSwitch.click()
    MembersBar.editIconInForm.waitForVisible()
    expect(MembersBar.editIconInForm.isVisible()).to.eql(true)
  })

  //TC_670
  it('should display `Edit Collaborators` pop up, when edit icon is clicked in KB create page members bar', () => {
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    expect(MembersBar.editCollaboratorsPopUp.isVisible()).to.eql(true)
    MembersBar.OkBtnInEditCollabPopUp.click()
  })

  //TC_671
  it('should verify that "Edit icon" disappears, when toggle bar is switched on in KB create page members bar', () => {
    KintoBlockCreate.form.waitForVisible()
    //Turning on toggle bar
    MembersBar.toggleBarSwitch.click()
    expect(MembersBar.editIconInForm.isVisible()).to.eql(false)
  })

  //TC_674
  it('should allow "owner" of the project to edit the members of the project in KB create page', () => {
    MembersBar.toggleBarSwitch.click()
    //Turning off toggle bar
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    MembersBar.getCheckBoxesOfMembersInEditCollab(3).leftClick()
    var checkedMember = MembersBar.getMemberIconTextFromEditCollabPopUp(
      3
    ).getText()
    MembersBar.OkBtnInEditCollabPopUp.click()
    expect(checkedMember).to.eql(MembersBar.getMembersIconInForm(2).getText())
    browser.refresh()
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
  })

  //TC_673
  it('should allow "Admin" of the project to edit the members of the project in KB create page', () => {
    KintoBlockCreate.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(memberFour)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    MembersBar.toggleBarSwitch.waitForVisible()
    MembersBar.toggleBarSwitch.click()
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    MembersBar.getCheckBoxesOfMembersInEditCollab(3).leftClick()
    var checkedMember = MembersBar.getMemberIconTextFromEditCollabPopUp(
      3
    ).getText()
    MembersBar.OkBtnInEditCollabPopUp.click()
    expect(checkedMember).to.eql(MembersBar.getMembersIconInForm(2).getText())
  })

  // //TC_675
  // it('should verify that toggle bar is switched on in KB create page members bar, when toggle bar is switched on in workspace manage page', () => {
  //   //TODO as for now there is no toggle bar in workspace manage bar
  // })

  // //TC_677
  // it('should verify that toggle bar is switched off in KB create page members bar, when toggle bar is switched off in workspace manage page', () => {
  //   //TODO as for now there is no toggle bar in workspace manage bar
  // })

  //TC_688
  it('should save changes made in `Edit collaborators` pop up, when "Save Changes" button is clicked in KB create page', () => {
    DashboardIndex.workspaceDropdown.selectByIndex(2)
    browser.alertAccept()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    WorkspaceManage.linkGithubSecondTime()
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    WorkspaceManage.workspaceEmailInputField.waitForVisible()

    WorkspaceManage.workspaceEmailInputField.setValue(memberTwo)
    WorkspaceManage.workspaceAddIcon.click()
    memberThreeEmail = WorkspaceManage.getAddedMemberEmail(2).getValue()
    expect(memberThreeEmail).to.eql(memberTwo)

    WorkspaceManage.workspaceEmailInputField.setValue(memberThree)
    WorkspaceManage.workspaceAddIcon.click()
    memberFourEmail = WorkspaceManage.getAddedMemberEmail(3).getValue()
    expect(memberFourEmail).to.eql(memberThree)

    WorkspaceManage.submitGlobal()
    WorkspaceManage.loadingFinished.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    MembersBar.toggleBarSwitch.waitForVisible()
    MembersBar.toggleBarSwitch.click()
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    MembersBar.getCheckBoxesOfMembersInEditCollab(2).leftClick()
    MembersBar.OkBtnInEditCollabPopUp.click()
    var kbName = testData.kintoblock.validKintoBlockName + '85' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    KintoBlockCreate.language.input.selectByIndex(1)
    KintoBlockCreate.protocol.input.selectByIndex(1)
    KintoBlockCreate.repositoryType.input.selectByIndex(0)
    browser.keys('Tab')
    browser.keys('Down arrow')
    browser.pause(2000)
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    reponame =
      testData.kintoblock.validRepoNameWithChar + '21' + currentDate.getTime()
    KintoBlockCreate.repository.input.setValue(reponame)
    browser.keys('Tab')
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForVisible()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    expect(
      MembersBar.getCheckBoxesOfMembersInEditCollab(2).isSelected()
    ).to.eql(true)
    expect(
      MembersBar.getCheckBoxesOfMembersInEditCollab(3).isSelected()
    ).to.eql(false)
  })

  //TC_680
  it('should verify that role field of members with role "Admin/Owner" are greyed out in "Edit collaborators" pop up triggered via KB create page', () => {
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    MembersBar.toggleBarSwitch.waitForVisible()
    MembersBar.toggleBarSwitch.click()
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.greyedOutNameAndRoleField(1)
    MembersBar.greyedOutNameAndRoleField(2)
  })

  //TC_681
  it('should verify that role field of members with role "Editor" are not greyed out in "Edit collaborators" pop up triggered via KB create page', () => {
    MembersBar.greyedOutNameAndRoleField(3)
    MembersBar.greyedOutNameAndRoleField(4)
    MembersBar.greyedOutNameAndRoleField(5)
  })

  // //TC_682
  // it('should verify that checkboxes are selected by default for all members in "Edit collaborators" pop up triggered via KB create page', () => {
  //   //TODO
  // })

  //TC_683
  it('should verify that checkboxes for members with role "Admin/Owner" are greyed out in "Edit collaborators" pop up triggered via KB create page', () => {
    MembersBar.checkBoxGreyedOut(1)
    MembersBar.checkBoxGreyedOut(2)
  })

  //TC_871
  it('should verify that checkboxes for members with role "Editor" are not greyed out in "Edit collaborators" pop up triggered via KB create page', () => {
    MembersBar.checkBoxGreyedOut(3)
    MembersBar.checkBoxGreyedOut(4)
    MembersBar.checkBoxGreyedOut(5)
  })

  //TC_684
  it('should verify that chechboxes can be unchecked for members with "Editor" role in "Edit collaborators" pop up triggered via KB create page', () => {
    MembersBar.getCheckMembersInEditCollabPopUp(3).click()
    MembersBar.getCheckMembersInEditCollabPopUp(4).click()
    MembersBar.getCheckMembersInEditCollabPopUp(5).click()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(3).isSelected()).to.eql(
      true
    )
    MembersBar.getCheckMembersInEditCollabPopUp(3).click()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(3).isSelected()).to.eql(
      false
    )
    expect(MembersBar.getCheckMembersInEditCollabPopUp(4).isSelected()).to.eql(
      true
    )
    MembersBar.getCheckMembersInEditCollabPopUp(4).click()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(4).isSelected()).to.eql(
      false
    )
    expect(MembersBar.getCheckMembersInEditCollabPopUp(5).isSelected()).to.eql(
      true
    )
    MembersBar.getCheckMembersInEditCollabPopUp(5).click()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(5).isSelected()).to.eql(
      false
    )
  })

  //TC_685
  it('should display checked members from the "Edit collaborators" in the KB create page members bar', () => {
    MembersBar.getCheckMembersInEditCollabPopUp(3).click()
    MembersBar.getCheckMembersInEditCollabPopUp(4).click()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(3).isSelected()).to.eql(
      true
    )
    expect(MembersBar.getCheckMembersInEditCollabPopUp(4).isSelected()).to.eql(
      true
    )
    var checkedMemberOne = MembersBar.getMemberIconTextFromEditCollabPopUp(
      2
    ).getText()
    var checkedMemberTwo = MembersBar.getMemberIconTextFromEditCollabPopUp(
      3
    ).getText()
    var checkedMemberThree = MembersBar.getMemberIconTextFromEditCollabPopUp(
      4
    ).getText()
    MembersBar.OkBtnInEditCollabPopUp.click()
    KintoBlockCreate.form.waitForVisible()
    expect(MembersBar.getMembersIconInForm(1).getText()).to.eql(
      checkedMemberOne
    )
    expect(MembersBar.getMembersIconInForm(2).getText()).to.eql(
      checkedMemberTwo
    )
    expect(MembersBar.getMembersIconInForm(3).getText()).to.eql(
      checkedMemberThree
    )
  })

  //TC_686
  it('should not display unchecked members from the "Edit collaborators" in the KB create page members bar', () => {
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(5).isSelected()).to.eql(
      false
    )
    MembersBar.OkBtnInEditCollabPopUp.click()
    KintoBlockCreate.form.waitForVisible()
    expect(MembersBar.getMembersIconInForm(4).isVisible()).to.eql(false)
  })

  //TC_687
  it('should navigate to KB create page, when `OK` button is clicked in `Edit collaborators` pop up', () => {
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    MembersBar.OkBtnInEditCollabPopUp.click()
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.form.isVisible()).to.eql(true)
  })

  //TC_689
  it('should display text as `Everyone in This Workspace Is an Editor of This Project` beside the toggle bar of KB create page', () => {
    MembersBar.toggleMessage.waitForVisible()
    var collabText = MembersBar.toggleMessage.getText().split('\n')
    var editText = collabText[1]
    expect(editText).to.eql('All members can view & edit')
  })

  //TC_690
  it('should verify that members list in `Edit Collaborators` triggered via KB create page are filtered as per key words entered in search bar', () => {
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    MembersBar.editCollabSearchBar.setValue('unknown')
    browser.pause(2000)
    expect(
      MembersBar.getMemberIconTextFromEditCollabPopUp(1).isVisible()
    ).to.eql(false)
    expect(MembersBar.getMembersEmailFromEditCollabPopUp(1).isVisible()).to.eql(
      false
    )
    expect(MembersBar.getPermissionDropDownInEditCollab(1).isVisible()).to.eql(
      false
    )
    expect(MembersBar.getCheckBoxesOfMembersInEditCollab(1).isVisible()).to.eql(
      false
    )
  })

  //TC_691
  it('should display text as "No collaborators match your search query" in `Edit Collaborators` members list of KB create page, when no members match keyword in search bar', () => {
    //As already there is no matching text
    MembersBar.noMatchingText.waitForVisible()
    expect(MembersBar.noMatchingText.isVisible()).to.eql(true)
  })

  //TC_692
  it('should verify that name and role field for members as "Admin/Owner" are greyed out in "Edit collaborators" pop up triggered via KB create page', () => {
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    MembersBar.greyedOutNameAndRoleField(1)
    MembersBar.greyedOutNameAndRoleField(2)
  })

  //TC_693
  it('should verify that name field for members as "Editor" are greyed out in "Edit collaborators" pop up triggered via KB create page', () => {
    MembersBar.greyedOutNameAndRoleField(3)
    MembersBar.greyedOutNameAndRoleField(4)
    MembersBar.greyedOutNameAndRoleField(5)
  })

  //TC_694
  it('should verify that role field for members as "Editor" are editable in "Edit collaborators" pop up triggered via KB create page', () => {
    MembersBar.greyedOutNameAndRoleField(3)
    MembersBar.greyedOutNameAndRoleField(4)
    MembersBar.greyedOutNameAndRoleField(5)
  })
})

describe.skip('KB - 3 - Projects KB manage page - Members bar', () => {
  //TC_660
  it('should display icon with first two letters of the owner for owner icon in KB manage page members bar', () => {
    MembersBar.OkBtnInEditCollabPopUp.click()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.logout()
    browser.alertAccept()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    //Getting icon text from logout btn as it has first two letters of owner
    var ownerText = MembersBar.ownerIconText.getText()
    MembersBar.ownerIconInForm.isVisible()
    //Getting icon text from the KA form
    expect(MembersBar.ownerIconInForm.getText()).to.eql(ownerText)
  })

  //TC_661
  it('should display icon with first two letters of the member for member icons in KB manage page members bar', () => {
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    dict = MembersBar.initialsOfMembers()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    MembersBar.getMembersIconInForm(1).waitForVisible()
    expect(MembersBar.getMembersIconInForm(1).getText()).to.eql(dict[0])
    expect(MembersBar.getMembersIconInForm(2).getText()).to.eql(dict[1])
    expect(MembersBar.getMembersIconInForm(3).getText()).to.eql(dict[2])
    expect(MembersBar.getMembersIconInForm(4).getText()).to.eql(dict[3])
  })

  //TC_662
  it('should display title of `Edit collaborators pop up` and `members list`, `search bar`, `members list`, `ok` and `invite members btn` in `Edit Collab` pop up via KB manage page', () => {
    MembersBar.toggleBarSwitch.click()
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollabPopUpTitle.waitForVisible()
    expect(MembersBar.editCollabPopUpTitle.getText()).to.eql(
      'Edit Collaborators'
    )
    expect(MembersBar.editCollabSearchBar.isVisible()).to.eql(true)
    expect(MembersBar.titleOfEditCollabMembersList.getText()).to.eql(
      'Select ( ✓ ) the members who have access to this project:'
    )
    expect(
      MembersBar.getMemberIconTextFromEditCollabPopUp(1).isVisible()
    ).to.eql(true)
    expect(MembersBar.getMembersEmailFromEditCollabPopUp(1).isVisible()).to.eql(
      true
    )
    expect(MembersBar.getPermissionDropDownInEditCollab(1).isVisible()).to.eql(
      true
    )
    expect(MembersBar.getCheckBoxesOfMembersInEditCollab(1).isVisible()).to.eql(
      true
    )
    expect(MembersBar.inviteMembersInEditCollab.isVisible()).to.eql(true)
    expect(MembersBar.OkBtnInEditCollabPopUp.isVisible()).to.eql(true)
  })

  //663
  it('should verify that owner icon has a crown on its top in members bar of KB manage page', () => {
    MembersBar.OkBtnInEditCollabPopUp.click()
    KintoBlockManage.form.waitForVisible()
    var ownerText = MembersBar.ownerIconText.getText()
    expect(MembersBar.ownerIconInForm.getText()).to.eql(ownerText)
    MembersBar.crownOfOwnerIcon.waitForVisible()
    expect(MembersBar.crownOfOwnerIcon.isVisible()).to.eql(true)
  })

  //TC_664
  it('should display all members of workspace in members list of `Edit collaborators` pop up triggered via KB manage page', () => {
    DashboardIndex.editWorkspace.click()
    browser.alertAccept()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    var emails = MembersBar.emailsOfMembers()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    MembersBar.toggleBarSwitch.click()
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.getMembersEmailFromEditCollabPopUp(1).waitForVisible()
    expect(
      MembersBar.getMembersEmailFromEditCollabPopUp(1).getValue()
    ).to.include(emails[0])
    expect(
      MembersBar.getMembersEmailFromEditCollabPopUp(2).getValue()
    ).to.include(emails[1])
    expect(
      MembersBar.getMembersEmailFromEditCollabPopUp(3).getValue()
    ).to.include(emails[2])
    expect(
      MembersBar.getMembersEmailFromEditCollabPopUp(4).getValue()
    ).to.include(emails[3])
    expect(
      MembersBar.getMembersEmailFromEditCollabPopUp(5).getValue()
    ).to.include(emails[4])
  })

  // //TC_665
  // it('should display `+X` icon, when there are more than 5 members to display and toggle bar is switched on in KB manage page members bar', () => {
  //   //TODO
  // })

  // //TC_666
  // it('should display `+X` icon with `Edit icon` in KB manage page members bar, when toggle bar is switched off', () => {
  //   //TODO
  // })

  //TC_667
  it('should verify that members as "Admin" are listed first in the row of KB manage page members bar', () => {
    var adminMember = MembersBar.getMemberIconTextFromEditCollabPopUp(
      2
    ).getText()
    MembersBar.OkBtnInEditCollabPopUp.click()
    expect(MembersBar.getMembersIconInForm(1).getText()).to.eql(adminMember)
  })

  //TC_668
  it('should verify that "Admin" icons has star icon on its top of KB manage page members bar', () => {
    expect(
      MembersBar.getAdminStarIconOfMembersInProjectsBar(1).isVisible()
    ).to.eql(true)
  })

  //TC_669
  it('should display `Edit icon`, when toggle bar is switched off in KB manage page members bar', () => {
    //Already edit icon is displayed as toggle is switched off
    MembersBar.editIconInForm.waitForVisible()
    expect(MembersBar.editIconInForm.isVisible()).to.eql(true)
  })

  //TC_670
  it('should display `Edit Collaborators` pop up, when edit icon is clicked in KB manage page members bar', () => {
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    expect(MembersBar.editCollaboratorsPopUp.isVisible()).to.eql(true)
    MembersBar.OkBtnInEditCollabPopUp.click()
  })

  //TC_671
  it('should verify that "Edit icon" disappears, when toggle bar is switched on in KB manage page members bar', () => {
    KintoBlockManage.form.waitForVisible()
    //Turning on toggle bar
    MembersBar.toggleBarSwitch.click()
    expect(MembersBar.editIconInForm.isVisible()).to.eql(false)
  })

  //TC_674
  it('should allow "owner" of the project to edit the members of the project in KB manage page', () => {
    MembersBar.toggleBarSwitch.click()
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    MembersBar.getCheckBoxesOfMembersInEditCollab(3).leftClick()
    var checkedMember = MembersBar.getMemberIconTextFromEditCollabPopUp(
      3
    ).getText()
    MembersBar.OkBtnInEditCollabPopUp.click()
    expect(checkedMember).to.eql(MembersBar.getMembersIconInForm(2).getText())
    browser.refresh()
    browser.alertAccept()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  //TC_673
  it('should allow "Admin" of the project to edit the members of the project in KB manage page', () => {
    KintoBlockManage.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(memberFour)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    MembersBar.toggleBarSwitch.waitForVisible()
    MembersBar.toggleBarSwitch.click()
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    MembersBar.getCheckBoxesOfMembersInEditCollab(3).leftClick()
    var checkedMember = MembersBar.getMemberIconTextFromEditCollabPopUp(
      3
    ).getText()
    MembersBar.OkBtnInEditCollabPopUp.click()
    expect(checkedMember).to.eql(MembersBar.getMembersIconInForm(2).getText())
  })

  // //TC_675
  // it('should verify that toggle bar is switched on in KB manage page members bar, when toggle bar is switched on in workspace manage page', () => {
  //   //TODO as for now there is no toggle bar in workspace manage bar
  // })

  // //TC_677
  // it('should verify that toggle bar is switched off in KB manage page members bar, when toggle bar is switched off in workspace manage page', () => {
  //   //TODO as for now there is no toggle bar in workspace manage bar
  // })

  //TC_680
  it('should verify that role field of members with role "Admin/Owner" are greyed out in "Edit collaborators" pop up triggered via KB manage page', () => {
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.greyedOutNameAndRoleField(1)
    MembersBar.greyedOutNameAndRoleField(2)
  })

  //TC_681
  it('should verify that role field of members with role "Editor" are not greyed out in "Edit collaborators" pop up triggered via KB manage page', () => {
    MembersBar.greyedOutNameAndRoleField(3)
    MembersBar.greyedOutNameAndRoleField(4)
    MembersBar.greyedOutNameAndRoleField(5)
  })

  // //TC_682
  // it('should verify that checkboxes are selected by default for all members in "Edit collaborators" pop up triggered via KB manage page', () => {
  //   //TODO
  // })

  //TC_683
  it('should verify that checkboxes for members with role "Admin/Owner" are greyed out in "Edit collaborators" pop up triggered via KB manage page', () => {
    MembersBar.checkBoxGreyedOut(1)
    MembersBar.checkBoxGreyedOut(2)
  })

  //TC_871
  it('should verify that checkboxes for members with role "Editor" are not greyed out in "Edit collaborators" pop up triggered via KB manage page', () => {
    MembersBar.checkBoxGreyedOut(3)
    MembersBar.checkBoxGreyedOut(4)
    MembersBar.checkBoxGreyedOut(5)
  })

  //TC_684
  it('should verify that chechboxes can be unchecked for members with "Editor" role in "Edit collaborators" pop up triggered via KB manage page', () => {
    MembersBar.getCheckMembersInEditCollabPopUp(4).click()
    MembersBar.getCheckMembersInEditCollabPopUp(5).click()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(3).isSelected()).to.eql(
      true
    )
    MembersBar.getCheckMembersInEditCollabPopUp(3).click()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(3).isSelected()).to.eql(
      false
    )
    expect(MembersBar.getCheckMembersInEditCollabPopUp(4).isSelected()).to.eql(
      true
    )
    MembersBar.getCheckMembersInEditCollabPopUp(4).click()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(4).isSelected()).to.eql(
      false
    )
    expect(MembersBar.getCheckMembersInEditCollabPopUp(5).isSelected()).to.eql(
      true
    )
    MembersBar.getCheckMembersInEditCollabPopUp(5).click()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(5).isSelected()).to.eql(
      false
    )
  })

  //TC_685
  it('should display checked members from the "Edit collaborators" in the KB manage page members bar', () => {
    MembersBar.getCheckMembersInEditCollabPopUp(3).click()
    MembersBar.getCheckMembersInEditCollabPopUp(4).click()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(3).isSelected()).to.eql(
      true
    )
    expect(MembersBar.getCheckMembersInEditCollabPopUp(4).isSelected()).to.eql(
      true
    )
    var checkedMemberOne = MembersBar.getMemberIconTextFromEditCollabPopUp(
      1
    ).getText()
    var checkedMemberTwo = MembersBar.getMemberIconTextFromEditCollabPopUp(
      3
    ).getText()
    var checkedMemberThree = MembersBar.getMemberIconTextFromEditCollabPopUp(
      4
    ).getText()
    MembersBar.OkBtnInEditCollabPopUp.click()
    KintoBlockManage.form.waitForVisible()
    expect(MembersBar.getMembersIconInForm(1).getText()).to.eql(
      checkedMemberOne
    )
    expect(MembersBar.getMembersIconInForm(2).getText()).to.eql(
      checkedMemberTwo
    )
    expect(MembersBar.getMembersIconInForm(3).getText()).to.eql(
      checkedMemberThree
    )
  })

  //TC_686
  it('should not display unchecked members from the "Edit collaborators" in the KB manage page members bar', () => {
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(5).isSelected()).to.eql(
      false
    )
    MembersBar.OkBtnInEditCollabPopUp.click()
    KintoBlockManage.form.waitForVisible()
    expect(MembersBar.getMembersIconInForm(4).isVisible()).to.eql(false)
  })

  //TC_687
  it('should navigate to KB manage page, when `OK` button is clicked in `Edit collaborators` pop up', () => {
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    MembersBar.OkBtnInEditCollabPopUp.click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
  })

  //TC_688
  it('should save changes made in `Edit collaborators` pop up, when "Save Changes" button is clicked in KB manage page', () => {
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.pause(2000)
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Tag Latest Commit')
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(3).isSelected()).to.eql(
      true
    )
    expect(MembersBar.getCheckMembersInEditCollabPopUp(4).isSelected()).to.eql(
      true
    )
  })

  //TC_689
  it('should display text as `Everyone in This Workspace Is an Editor of This Project` beside the toggle bar of KB manage page', () => {
    MembersBar.toggleMessage.waitForVisible()
    var collabText = MembersBar.toggleMessage.getText().split('\n')
    var editText = collabText[1]
    expect(editText).to.eql('All members can view & edit')
  })

  //TC_690
  it('should verify that members list in `Edit Collaborators` triggered via KB manage page are filtered as per key words entered in search bar', () => {
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    MembersBar.editCollabSearchBar.setValue('unknown')
    browser.pause(2000)
    expect(
      MembersBar.getMemberIconTextFromEditCollabPopUp(1).isVisible()
    ).to.eql(false)
    expect(MembersBar.getMembersEmailFromEditCollabPopUp(1).isVisible()).to.eql(
      false
    )
    expect(MembersBar.getPermissionDropDownInEditCollab(1).isVisible()).to.eql(
      false
    )
    expect(MembersBar.getCheckBoxesOfMembersInEditCollab(1).isVisible()).to.eql(
      false
    )
  })

  //TC_691
  it('should display text as "No collaborators match your search query" in `Edit Collaborators` members list of KB manage page, when no members match keyword in search bar', () => {
    //As already there is no matching text
    MembersBar.noMatchingText.waitForVisible()
    expect(MembersBar.noMatchingText.isVisible()).to.eql(true)
  })

  //TC_692
  it('should verify that name and role field for members as "Admin/Owner" are greyed out in "Edit collaborators" pop up triggered via KB manage page', () => {
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    MembersBar.greyedOutNameAndRoleField(1)
    MembersBar.greyedOutNameAndRoleField(2)
  })

  //TC_693
  it('should verify that name field for members as "Editor" are greyed out in "Edit collaborators" pop up triggered via KB manage page', () => {
    MembersBar.greyedOutNameAndRoleField(3)
    MembersBar.greyedOutNameAndRoleField(4)
    MembersBar.greyedOutNameAndRoleField(5)
  })

  //TC_694
  it('should verify that role field for members as "Editor" are greyed out in "Edit collaborators" pop up triggered via KB manage page', () => {
    MembersBar.greyedOutNameAndRoleField(3)
    MembersBar.greyedOutNameAndRoleField(4)
    MembersBar.greyedOutNameAndRoleField(5)
  })

  //TC_672
  it('should verify that toggle bar is not displayed for member as an editor of the project in KB manage page', () => {
    MembersBar.OkBtnInEditCollabPopUp.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(memberOne)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(MembersBar.toggleBarSwitch.isVisible()).to.eql(false)
  })
})

describe('KB - 3 - Create new block page', () => {
  //TC_502
  it('should navigate user to KB select flavour page, when user clicks on add icon displayed next to KintoBlocks in left navigation bar', () => {
    KintoBlockManage.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DashboardIndex.open(ws)
    DashboardIndex.loadingFinished.waitForExist()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    expect(KintoBlockCreate.kintoBlockTypeSelectPage.isVisible()).to.eql(true)
  })

  //TC_503
  it('should navigate user to KB select flavour page, when user clicks on `create new kintoblock` button displayed via breadcrumb drop down of KB name in KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.kbListDropDown.click()
    KintoBlockManage.dropdownIsShownShort.waitForVisible()
    KintoBlockManage.createNewKbBtnInBreadcrumb.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    expect(KintoBlockCreate.kintoBlockTypeSelectPage.isVisible()).to.eql(true)
  })

  //TC_504
  it('should navigate user to KB microservice create page, when user enters URL of the page', () => {
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    var url = KintoBlockCreate.getUrl()
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
    browser.url(url)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.form.isVisible()).to.eql(true)
  })

  //TC_505
  it('should display create kintoblocks page title as `Create KintoBlocks` in KB microservice create page', () => {
    expect(KintoBlockCreate.pageTitle.getText()).to.eql('Create KintoBlocks')
  })

  //TC_506
  it('should display what is a kintoblock help text below the page title in KB microservice create page', () => {
    expect(KintoBlockCreate.whatisaKintoBlock.getText()).to.eql(
      'What is a KintoBlock?\nKintoBlocks make coding microservices easy for all your deployment needs. Build, combine, manage dependencies, document, CI/CD, host and scale across languages. Start building KintoBlocks below or learn more here.'
    )
  })

  //TC_507
  it('should navigate user to help page, when user clicks on `learn more here` text link in KB microservice create page', () => {
    KintoBlockCreate.learnMoreHere.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[1])
    browser.pause(2000)
    expect(KintoBlockCreate.kintoDocsPage.isVisible()).to.eql(true)
    browser.switchTab(tabIds[0])
    browser.pause(2000)
  })

  //TC_508
  it('should display projects member tool bar in KB microservice create page', () => {
    expect(KintoBlockCreate.membersToolBar.isVisible()).to.eql(true)
  })

  //TC_511
  it('should display `create new kintoblock` button as disabled by default, when user navigates to KB microservice create page', () => {
    //Already in create page without any data entered
    expect(KintoBlockCreate.submitBtn.isEnabled()).to.eql(false)
  })

  //TC_512
  it.skip('should display validation error message for choose language and protocolin KB microservice create page, when user changes options to default from selected options and click submit button', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName +
        '30' +
        currentTime.getMinutes() +
        currentTime.getSeconds()
    )
    KintoBlockCreate.submitGlobal()
    expect(KintoBlockCreate.language.error.isVisible()).to.eql(true)
    expect(KintoBlockCreate.protocol.error.isVisible()).to.eql(true)
    KintoBlockCreate.languageField.selectByIndex(1)
    KintoBlockCreate.protocolField.selectByIndex(1)
    expect(KintoBlockCreate.language.error.isVisible()).to.eql(false)
    expect(KintoBlockCreate.protocol.error.isVisible()).to.eql(false)
    KintoBlockCreate.languageField.selectByIndex(0)
    KintoBlockCreate.protocolField.selectByIndex(0)
    KintoBlockCreate.submitBtn.click()
    expect(KintoBlockCreate.language.error.isVisible()).to.eql(true)
    expect(KintoBlockCreate.protocol.error.isVisible()).to.eql(true)
  })

  //TC_513
  it('should verify that first triggered error message is disappeared in KB microservice create page, when user enters valid data in second try', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.form.isVisible()).to.eql(true)
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.isVisible()).to.eql(true)
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName +
        '31' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'w'
    )
    expect(KintoBlockCreate.name.error.isVisible()).to.eql(false)
  })

  //TC_514
  it('should display all languages in the language drop down options of KB microservice create page', () => {
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    expect(KintoBlockCreate.getLanguageOptions('Node.js').isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.getLanguageOptions('C#.net').isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.getLanguageOptions('Java').isVisible()).to.eql(true)
    expect(KintoBlockCreate.getLanguageOptions('Python').isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.getLanguageOptions('Ruby').isVisible()).to.eql(true)
    expect(KintoBlockCreate.getLanguageOptions('Go').isVisible()).to.eql(true)
    // expect(
    //   KintoBlockCreate.getLanguageOptions('PHP (7.2.5)').isVisible()
    // ).to.eql(true)
    expect(KintoBlockCreate.getLanguageOptions('Elixir').isVisible()).to.eql(
      true
    )
  })

  //TC_516
  it('should display repository type drop down options as `create new repository` and `Existing Repositories in KB microservice create page`', () => {
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    expect(
      KintoBlockCreate.getRepoTypeOptions('Existing Repositories').isVisible()
    ).to.eql(true)
    expect(
      KintoBlockCreate.getRepoTypeOptions('Create new repository').isVisible()
    ).to.eql(true)
  })

  //TC_515
  it('should display protocol drop down options as `HTTP` and `gRPC` in KB microservice create page', () => {
    browser.scroll(0, 2000)
    KintoBlockCreate.protocolDropDown.click()
    KintoBlockCreate.getProtocolOptions('HTTP').waitForVisible()
    expect(KintoBlockCreate.getProtocolOptions('HTTP').isVisible()).to.eql(true)
    expect(KintoBlockCreate.getProtocolOptions('gRPC').isVisible()).to.eql(true)
  })

  //TC_518
  it('should display organisation drop down field in KB microservice create page, when user selects `create new repository` option in repository type drop down', () => {
    //selected repository type as 'create new repositroy'
    browser.scroll(0, -2000)
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    KintoBlockCreate.organisationField.waitForVisible()
    expect(KintoBlockCreate.organisationField.isVisible()).to.eql(true)
  })

  //TC_519
  it('should pre-populate the organisation name in the `repository` input field of KB microservice page, when user selects an organisation', () => {
    var orgName = KintoBlockCreate.orgNameFromOrgField.getText()
    expect(KintoBlockCreate.orgNameFromRepoInputField.getText()).to.eql(
      orgName + '/'
    )
  })

  //TC_520
  it('should verify that `create new KintoBlock` button stays clickable in KB microservice create page, if validation conditons are not met', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBFortyChar)
    expect(KintoBlockCreate.name.error.isVisible()).to.eql(true)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.invalidKBDescription
    )
    expect(KintoBlockCreate.shortDescription.error.isVisible()).to.eql(true)
    KintoBlockCreate.submitGlobal()
    expect(KintoBlockCreate.submitBtn.isEnabled()).to.eql(true)
  })

  //TC_517
  it('should display existing repositories of linked GitHub account to workspace, when user selects `existing repositories` option in repository type drop down', () => {
    var org = KintoBlockCreate.orgNameFromOrgField.getText()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    var repoName = testData.kintoblock.validRepoWithCommit
    KintoBlockCreate.existingRepo.setValue(repoName)
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.pause(5000)
    KintoBlockCreate.getExistingRepoList(org, repoName).waitForVisible()
    expect(
      KintoBlockCreate.getExistingRepoList(org, repoName).isVisible()
    ).to.eql(true)
  })

  //TC_522
  it('should display repository created via microservice KB is listed in GitHub account repository list', () => {
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.click()
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(1).waitForVisible()
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var KbName = testData.kintoblock.validKBNameEight + '2' + randomName
    KintoBlockCreate.name.input.setValue(KbName)
    KintoBlockCreate.kbDisplayName.setValue(KbName + '87')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions('11.7.0').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions('11.7.0').click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql('11.7.0')
    browser.scroll(0, 1000)
    KintoBlockCreate.organisationDropDown.click()
    KintoBlockCreate.getOrganisationOptions('GittestCC').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('GittestCC').click()
    KintoBlockCreate.loadingFinished.waitForExist()
    reponame = testData.kintoblock.validRepoName + '7' + randomName
    KintoBlockCreate.repository.input.setValue(reponame)
    KintoBlockCreate.submitGlobal()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(2).waitForVisible()
    KintoBlockList.getCard(2).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 800)
    var repositoryName = KintoBlockManage.repoName.getValue()
    browser.url('https://github.com/login')
    WorkspaceManage.gitRepoSearchFilterField.waitForVisible()
    WorkspaceManage.gitRepoSearchFilterField.setValue(reponame)
    expect(WorkspaceManage.getSearchForRepo(repositoryName).isVisible()).to.eql(
      true
    )
  })

  //TC_510
  it('should verify that workspace with GitHub integration displays KB microservice create page with following components', () => {
    var frontEndURL = KintoBlockManage.TEST_ENV
    browser.url(frontEndURL)
    DashboardIndex.loadingFinished.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.nameField.isVisible()).to.eql(true)
    expect(KintoBlockCreate.descriptionField.isVisible()).to.eql(true)
    expect(KintoBlockCreate.languageDropDown.isVisible()).to.eql(true)
    expect(KintoBlockCreate.protocolDropDown.isVisible()).to.eql(true)
    expect(KintoBlockCreate.repoDropDown.isVisible()).to.eql(true)
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    expect(KintoBlockCreate.repositoryNameField.isVisible()).to.eql(true)
    expect(KintoBlockCreate.organisationField.isVisible()).to.eql(true)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    expect(KintoBlockCreate.existingRepo.isVisible()).to.eql(true)
    expect(KintoBlockCreate.submitBtn.isVisible()).to.eql(true)
  })

  //TC_523
  it('should navigate user to "KintoBlock type select page", when user clicks on "Create New KintoBlock" card in KB list page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.kbCreateCard.waitForVisible()
    KintoBlockList.kbCreateCard.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.kintoBlockTypeSelectPage.isVisible()).to.eql(true)
  })

  //TC_524
  it('should navigate user to "KintoBlock type select page", when user the URL of the page', () => {
    var url = browser.getUrl()
    DashboardIndex.kintoBlocksleftnav.click()
    DashboardIndex.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
    browser.url(url)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.kintoBlockTypeSelectPage.isVisible()).to.eql(true)
  })

  //TC_525
  it('should verify that breadcrumb options "KintoBlocks" and "Create New KintoBlock" are displayed in "KintoBlock type select page"', () => {
    expect(KintoBlockCreate.kintoBlockListFromBreadcrumb.isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.kintoBlockListFromBreadcrumb.getText()).to.eql(
      'KintoBlocks'
    )
    KintoBlockCreate.createNewKintoBlockFromBreadcrumb.waitForVisible()
    expect(
      KintoBlockCreate.createNewKintoBlockFromBreadcrumb.isVisible()
    ).to.eql(true)
    expect(KintoBlockCreate.createNewKintoBlockFromBreadcrumb.getText()).to.eql(
      'Create New KintoBlock'
    )
  })

  //TC_526
  it('should display "KintoBlock type select page" title as "Create New KintoBlock"', () => {
    expect(KintoBlockCreate.pageTitle.getText()).to.eql('Create New KintoBlock')
  })

  //TC_527
  it('should display "KintoBlock type select page" type select section title as "Please select a KintoBlock flavour:"', () => {
    expect(KintoBlockCreate.selectFlavourTitle.getText()).to.eql(
      'Please select a KintoBlock flavour:'
    )
  })

  //TC_528
  it('should display three select options under type select section', () => {
    expect(KintoBlockCreate.getKBTypesSection(1).isVisible()).to.eql(true)
    expect(KintoBlockCreate.getKBTypesSection(2).isVisible()).to.eql(true)
    expect(KintoBlockCreate.getKBTypesSection(3).isVisible()).to.eql(true)
  })

  //TC_529
  it('should display title and description as per concerned type of KB type section', () => {
    expect(KintoBlockCreate.getTitleOfKBTypeCard(1).getText()).to.eql(
      'MICROSERVICE'
    )
    expect(KintoBlockCreate.getSubtitleOfKBTypeCard(1).getText()).to.eql(
      `There's only one rule in Microservice Club. With great power comes only one, single & simple responsibility.`
    )
    expect(KintoBlockCreate.getTitleOfKBTypeCard(2).getText()).to.eql('WEBSITE')
    expect(KintoBlockCreate.getSubtitleOfKBTypeCard(2).getText()).to.eql(
      'Host and manage static HTML, CSS and JavaScript files straight from a repo source!'
    )
    expect(KintoBlockCreate.getTitleOfKBTypeCard(3).getText()).to.eql(
      'CUSTOM SERVICE'
    )
    expect(KintoBlockCreate.getSubtitleOfKBTypeCard(3).getText()).to.eql(
      `Define always on, resilient stateful applications such as Databases, Cache, Queues and more!`
    )
  })

  //TC_530
  it('should display definition title and description of KintoBlock at bottom of "KintoBlock type select page"', () => {
    expect(KintoBlockCreate.whatisaKintoBlock.getText()).to.eql(
      'What is a KintoBlock?\nKintoBlocks make coding microservices easy for all your application needs. Build, combine, manage dependencies, document, CI/CD, host and scale across languages. Start building KintoBlocks below or learn more here.'
    )
  })

  //TC_531
  it('should navigate to documents page, when user clicks on hyper link text "learn more here" in KintoBlock definition', () => {
    KintoBlockCreate.learnMoreHere.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[2])
    browser.pause(2000)
    expect(KintoBlockCreate.kintoDocsPage.isVisible()).to.eql(true)
    browser.switchTab(tabIds[0])
    browser.pause(2000)
  })

  //TC_532
  it('should navigate to document page, when user clicks on "?" icon in KintoBlock definition section', () => {
    KintoBlockCreate.questionIcon.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[3])
    browser.pause(2000)
    expect(KintoBlockCreate.kintoDocsPage.isVisible()).to.eql(true)
    browser.switchTab(tabIds[0])
    browser.pause(2000)
  })

  //TC_533
  it('should navigate user to concerned create page of KintoBlock, when user selects a flavour', () => {
    //Micro service
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.microserviceTypeIcon.waitForVisible()
    expect(KintoBlockCreate.microserviceTypeIcon.isVisible()).to.eql(true)
    //Website
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.kbCreateCard.waitForVisible()
    KintoBlockList.kbCreateCard.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.websiteTypeIcon.waitForVisible()
    expect(KintoBlockCreate.websiteTypeIcon.isVisible()).to.eql(true)
    // //Task
    // KintoBlockList.open(ws)
    // KintoBlockList.loadingFinished.waitForExist()
    // KintoBlockList.myKintoBlocksList.waitForVisible()
    // KintoBlockList.loadingFinished.waitForExist()
    // KintoBlockList.kbCreateCard.waitForVisible()
    // KintoBlockList.kbCreateCard.click()
    // KintoBlockList.loadingFinished.waitForExist()
    // KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    // KintoBlockCreate.loadingFinished()
    // //For now click is disabled
    // //KintoBlockCreate.selectKBFlavour(3).click()
    // KintoBlockCreate.loadingFinished.waitForExist()
    // KintoBlockCreate.form.waitForVisible()
    // KintoBlockCreate.loadingFinished.waitForExist()
    // KintoBlockCreate.taskTypeIcon.waitForVisible()
    // expect(KintoBlockCreate.taskTypeIcon.isVisible()).to.eql(true)
  })

  //TC_534
  it('should display validation error message in KB microservice create page, when user duplicate a KB name', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getKbCardName(0).waitForVisible()
    KintoBlockList.kbCreateCard.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.microserviceTypeIcon.waitForVisible()
    KintoBlockCreate.name.input.setValue(KBName)
    KintoBlockCreate.kbDisplayName.setValue(KBName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    KintoBlockCreate.selectExistingRepository()
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.duplicateNameError.waitForVisible()
    expect(KintoBlockCreate.duplicateNameError.getText()).to.eql(
      'The name already exists on KintoHub. Please choose a unique name.'
    )
  })

  //TC_535
  it('should verify that example project is imported to the new repository of KB, when pre-populate toggle bar is switched on while creating microservice KB', () => {
    browser.refresh()
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + '90' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '15')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    browser.keys('Tab')
    browser.keys('Down arrow')
    browser.pause(2000)
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    reponame = testData.kintoblock.validRepoName + '19' + randomName
    KintoBlockCreate.repository.input.setValue(reponame)
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.prepopulateRepoSwitch.scroll(0, 2000)
    KintoBlockCreate.prepopulateRepoSwitch.waitForVisible()
    KintoBlockCreate.prepopulateRepoSwitch.click()
    KintoBlockCreate.prePopulatedIsOn.waitForExist()
    expect(KintoBlockCreate.prePopulatedIsOn.getValue()).to.eql('true')
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.openRepoBtn.scroll(0, 500)
    KintoBlockManage.openRepoBtn.waitForVisible()
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[4])
    browser.pause(2000)
    KintoBlockManage.commitTextFromGitHub.waitForVisible()
    expect(KintoBlockManage.commitTextFromGitHub.getText()).to.eql(
      'KintoHub example project'
    )
    browser.switchTab(tabIds[0])
    browser.pause(2000)
  })

  //TC_536
  it('should verify that pre-populate repository section disappears as user selects repository type as "Existing repository" in KB microservice create page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getKbCardName(0).waitForVisible()
    KintoBlockList.kbCreateCard.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.microserviceTypeIcon.waitForVisible()
    expect(KintoBlockCreate.prepopulateRepoSwitch.isVisible()).to.eql(true)
    //Selecting existing repo
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    browser.pause(2000)
    expect(KintoBlockCreate.prepopulateRepoSwitch.isVisible()).to.eql(false)
  })

  it('should verify user is navigated to website KB create page, when user enters the url of the page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.kbCreateCard.waitForVisible()
    KintoBlockList.kbCreateCard.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.websiteTypeIcon.waitForVisible()
    var url = browser.getUrl()
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
    browser.url(url)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.websiteTypeIcon.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.form.isVisible()).to.eql(true)
  })

  it('should verify that user is navigated to select flavour page, when user clicks on pen icon in the KB website create page', () => {
    KintoBlockCreate.penIconInPageTitle.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    expect(KintoBlockCreate.kintoBlockTypeSelectPage.isVisible()).to.eql(true)
  })

  it('should verify KB website create page displays breadcrumbs, page title, definition, "?" in definition, projects member bar, basic info component and create button', () => {
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.websiteTypeIcon.waitForVisible()
    //Breadcrumbs
    KintoBlockCreate.kintoBlockListFromBreadcrumb.waitForVisible()
    expect(KintoBlockCreate.kintoBlockListFromBreadcrumb.isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.kintoBlockListFromBreadcrumb.getText()).to.eql(
      'KintoBlocks'
    )
    KintoBlockCreate.createNewKintoBlockFromBreadcrumb.waitForVisible()
    expect(
      KintoBlockCreate.createNewKintoBlockFromBreadcrumb.isVisible()
    ).to.eql(true)
    expect(KintoBlockCreate.createNewKintoBlockFromBreadcrumb.getText()).to.eql(
      'Create New KintoBlock'
    )
    //Page title
    expect(KintoBlockCreate.websiteTypeIcon.isVisible()).to.eql(true)
    expect(KintoBlockCreate.pageTitle.getText()).to.eql('Create KintoBlocks')
    expect(KintoBlockCreate.penIconInPageTitle.isVisible()).to.eql(true)
    //Definition
    expect(KintoBlockCreate.whatisaKintoBlock.getText()).to.eql(
      'What is a KintoBlock?\nKintoBlocks make coding microservices easy for all your deployment needs. Build, combine, manage dependencies, document, CI/CD, host and scale across languages. Start building KintoBlocks below or learn more here.'
    )
    //Projects member bar
    expect(KintoBlockCreate.membersToolBar.isVisible()).to.eql(true)
    //Basic info component
    expect(KintoBlockCreate.basicInfoComponent.isVisible()).to.eql(true)
    //create button
    expect(KintoBlockCreate.submitBtn.getText()).to.eql('Create New KintoBlock')
  })

  it('should verify basic info in KB website create page displays title and subtitle', () => {
    expect(KintoBlockCreate.basicInfoComponentTitle.getText()).to.eql(
      'Basic Info'
    )
    expect(KintoBlockCreate.basicInfoComponentSubtitle.getText()).to.eql(
      'Choose the name for this KintoBlock and give it a short description so you can easily find it back later. Let us know your preferred coding flavor and connect your repo. Only lowercase characters, digits and hyphens are allowed - no spaces and no caps for now please.'
    )
  })

  it('should verify that name, description, repository and organisation data fields are present in KB website create page', () => {
    expect(KintoBlockCreate.nameField.isVisible()).to.eql(true)
    expect(KintoBlockCreate.descriptionField.isVisible()).to.eql(true)
    expect(KintoBlockCreate.repoDropDown.isVisible()).to.eql(true)
    browser.scroll(0, 2000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    expect(KintoBlockCreate.repositoryNameField.isVisible()).to.eql(true)
    expect(KintoBlockCreate.organisationField.isVisible()).to.eql(true)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    expect(KintoBlockCreate.existingRepo.isVisible()).to.eql(true)
  })

  it('should display titles for name, description, repository type, repository input and organisation in KB website create page', () => {
    expect(KintoBlockCreate.basicInfoComponentNameFieldTitle.getText()).to.eql(
      'KINTOBLOCK NAME'
    )
    expect(
      KintoBlockCreate.basicInfoComponentDescriptionFieldTitle.getText()
    ).to.eql('DESCRIPTION')
    expect(KintoBlockCreate.repositoryTypeFieldTitle.getText()).to.eql(
      'REPOSITORY TYPE'
    )
    browser.refresh()
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.organisationFieldTitle.waitForVisible()
    expect(KintoBlockCreate.organisationFieldTitle.getText()).to.eql(
      'ORGANIZATION'
    )
    expect(KintoBlockCreate.repositoryNameFieldTitle.getText()).to.eql(
      'REPOSITORY NAME'
    )
  })

  it('should display placeholder text in kintoBlock name field and description of KB website create page', () => {
    expect(KintoBlockCreate.name.input.getAttribute('placeholder')).to.eql(
      'Enter a name for your KintoBlock'
    )
    expect(
      KintoBlockCreate.shortDescription.input.getAttribute('placeholder')
    ).to.eql('Enter a short description of your KintoBlock')
  })

  it('should validate inputs and not allow user to create a kb with name less than 3 characters in KB website create page', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  it('should validate inputs and not allow user to create a kb with name more than 24 characters in KB website create page', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBFortyChar)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Must be 24 characters or less'
    )
  })

  it('should validate inputs and not allow user to create a kb with name containing special characters in KB website create page', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.invalidKBNameWithChar
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Must contain only lowercase characters, digits and hyphens'
    )
  })

  it('should validate inputs and not allow user to create a kb with description more than 200 characters in KB website create page', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName
    )
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.invalidKBDescription
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.shortDescription.error.waitForVisible()

    expect(KintoBlockCreate.shortDescription.error.getText()).to.eql(
      'Must be 200 characters or less'
    )
  })

  it('should validate inputs and not allow user to create a kb with name starting with number in KB website create page', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.invalidKBNameWithDigit
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      "The first character can't be a digit"
    )
  })

  it('should verify that first triggered error message is disappeared, when user enters valid data in second try in KB website create page', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.isVisible()).to.eql(true)
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName +
        '31' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'l'
    )
    expect(KintoBlockCreate.name.error.isVisible()).to.eql(false)
  })

  it('should display validation error message in KB website create page, when user duplicate a KB name', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getKbCardName(0).waitForVisible()
    KintoBlockList.kbCreateCard.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.websiteTypeIcon.waitForVisible()
    KintoBlockCreate.name.input.setValue(KBName)
    KintoBlockCreate.kbDisplayName.setValue(KBName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    // for website type
    browser.keys('Tab')
    browser.keys('Down arrow')
    browser.pause(2000)
    browser.keys('Tab')
    //
    browser.scroll(0, 2000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.selectExistingRepository()
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.duplicateNameError.waitForVisible()
    expect(KintoBlockCreate.duplicateNameError.getText()).to.eql(
      'The name already exists on KintoHub. Please choose a unique name.'
    )
  })

  it('should navigate to documents page, when user clicks on hyper link text "learn more here" in KintoBlock definition of KB website create page', () => {
    KintoBlockCreate.learnMoreHere.scroll(0, -2000)
    KintoBlockCreate.learnMoreHere.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[5])
    browser.pause(2000)
    expect(KintoBlockCreate.kintoDocsPage.isVisible()).to.eql(true)
    browser.switchTab(tabIds[0])
    browser.pause(2000)
  })

  it('should navigate to documents page, when user clicks on "?" icon in KintoBlock definition section of KB website create page', () => {
    KintoBlockCreate.questionIcon.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[6])
    browser.pause(2000)
    expect(KintoBlockCreate.kintoDocsPage.isVisible()).to.eql(true)
    browser.switchTab(tabIds[0])
    browser.pause(2000)
  })

  it('should display organisation drop down field, when user selects `create new repository` option in repository type drop down of KB website create page', () => {
    //selected repository type as 'create new repositroy'
    browser.refresh()
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    KintoBlockCreate.organisationField.waitForVisible()
    expect(KintoBlockCreate.organisationField.isVisible()).to.eql(true)
  })

  it('should display repository type drop down options as `create new repository` and `Existing Repositories in KB website create page`', () => {
    browser.refresh()
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    expect(
      KintoBlockCreate.getRepoTypeOptions('Existing Repositories').isVisible()
    ).to.eql(true)
    expect(
      KintoBlockCreate.getRepoTypeOptions('Create new repository').isVisible()
    ).to.eql(true)
  })

  it('should pre-populate the organisation name in the `repository` name field, when user selects an organisation in KB website create page', () => {
    var orgName = KintoBlockCreate.orgNameFromOrgField.getText()
    expect(KintoBlockCreate.orgNameFromRepoInputField.getText()).to.eql(
      orgName + '/'
    )
  })

  it('should verify that `create new KintoBlock` button stays clickable in KB website create page, if validation conditons are not met', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBFortyChar)
    KintoBlockCreate.submitGlobal()
    expect(KintoBlockCreate.name.error.isVisible()).to.eql(true)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.invalidKBDescription
    )
    expect(KintoBlockCreate.shortDescription.error.isVisible()).to.eql(true)
    KintoBlockCreate.submitGlobal()
    expect(KintoBlockCreate.submitBtn.isEnabled()).to.eql(true)
  })

  it.skip('should verify a KB is created using "create new repository" type in KB website create page', () => {
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.click()
    browser.alertAccept()
    KintoBlockCreate.selectKBFlavour(2).waitForVisible()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKBNameEight + '29' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '10')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    // for website type
    KintoBlockCreate.WebsiteTypeDropDown.click()
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').click()
    browser.scroll(0, 2000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    browser.pause(2000)
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    reponame = testData.kintoblock.validRepoName + '73' + randomName
    KintoBlockCreate.repository.input.setValue(reponame)
    KintoBlockCreate.submitGlobal()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it.skip('should display repository created via KintoHub in GitHub account repository list', () => {
    //In previous script created now validating the repository
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(3).waitForVisible()
    KintoBlockList.getCard(3).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 1000)
    var repositoryName = KintoBlockManage.repoName.getValue()
    browser.url('https://github.com/login')
    WorkspaceManage.gitRepoSearchFilterField.waitForVisible()
    WorkspaceManage.gitRepoSearchFilterField.setValue(reponame)
    expect(WorkspaceManage.getSearchForRepo(repositoryName).isVisible()).to.eql(
      true
    )
  })

  it.skip('should verify user is able to create a KB using existing repository type in KB website create page', () => {
    var frontEndURL = KintoBlockManage.TEST_ENV
    browser.url(frontEndURL)
    DashboardIndex.loadingFinished.waitForExist()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.click()
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).waitForVisible()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + '99' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '122')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.WebsiteTypeDropDown.click()
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').click()
    browser.scroll(0, 2000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(
      testData.kintoblock.validDynamicWebAppRepo
    )
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validDynamicWebAppRepo
    ).waitForVisible()
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should create a website KB with new repository - GitHub', () => {
    var websiteName = testData.kintoblock.validWebsiteWithDigit + randomName
    KintoBlockCreate.name.input.setValue(websiteName)
    KintoBlockCreate.kbDisplayName.setValue(websiteName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validWebsiteDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.WebsiteTypeDropDown.click()
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').click()
    browser.pause(2000)
    browser.scroll(0, 1000)
    KintoBlockCreate.repositoryNameField.click()
    var repoName = testData.kintoblock.validRepoName + randomName
    KintoBlockCreate.repository.input.setValue(repoName)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.deploySuccessBtn()
    KintoBlockManage.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
  })

  it('should check whether check for microservice new commits button, tag build button, recent builds, open repo etc are visible', () => {
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    expect(KintoBlockManage.refreshCommitBtn.isVisible()).to.eql(true)
    KintoBlockManage.recentBuildBlock.waitForVisible()
    expect(KintoBlockManage.recentBuildBlock.isVisible()).to.eql(true)
    KintoBlockManage.getTagThisBuildBtn(1).waitForVisible()
    expect(KintoBlockManage.getTagThisBuildBtn(1).isVisible()).to.eql(true)
    KintoBlockManage.openRepoBtn.waitForVisible()
    expect(KintoBlockManage.openRepoBtn.isVisible()).to.eql(true)
    KintoBlockManage.advancedOptionBlock.waitForVisible()
    expect(KintoBlockManage.advancedOptionBlock.isVisible()).to.eql(true)
    KintoBlockManage.autoBuildSwitch.waitForVisible()
    expect(KintoBlockManage.autoBuildSwitch.isVisible()).to.eql(true)
    KintoBlockManage.envParametersComponent.waitForVisible()
    expect(KintoBlockManage.envParametersComponent.isVisible()).to.eql(true)
    DeploymentManage.requiredToggleForCustomParam.waitForVisible()
    expect(DeploymentManage.requiredToggleForCustomParam.isVisible()).to.eql(
      true
    )
  })

  it('should click on view example project link and navigated to documentation page', () => {
    KintoBlockManage.viewExampleProjectsLink.waitForVisible()
    KintoBlockManage.viewExampleProjectsLink.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[1])
    browser.pause(2000)
    browser.switchTab(tabIds[0])
  })

  it('should click on open repo btn and should be navigated to github page', () => {
    browser.scroll(0, 800)
    KintoBlockManage.openRepoBtn.waitForVisible()
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[2])
    browser.pause(2000)
    browser.switchTab(tabIds[0])
  })

  it('should expand Advanced options toggle in KB manage page', () => {
    browser.scroll(0, 600)
    KintoBlockManage.advancedOptionsExpandIcon.waitForVisible()
    KintoBlockManage.advancedOptionsExpandIcon.click()
  })

  it('should check whether auto-build switch is on by default', () => {
    expect(KintoBlockManage.autoBuildSwitch.isEnabled()).to.eql(true)
  })

  it('should check whether port field, build field and run command field are visible in Advanced Options', () => {
    KintoBlockManage.portFieldInAdvancedOptions.waitForVisible()
    expect(KintoBlockManage.portFieldInAdvancedOptions.isVisible()).to.eql(true)
    KintoBlockManage.buildCommandInAdvancedOptions.waitForVisible()
    expect(KintoBlockManage.buildCommandInAdvancedOptions.isVisible()).to.eql(
      true
    )
    KintoBlockManage.runCommandInAdvancedOptions.waitForVisible()
    expect(KintoBlockManage.runCommandInAdvancedOptions.isVisible()).to.eql(
      true
    )
  })

  it('should add environment variables in website KB manage page', () => {
    KintoBlockManage.addCustomKey.waitForVisible()
    KintoBlockManage.addCustomKey.setValue(
      testData.kintoblock.validEnvKeyForApiCall
    )
    KintoBlockManage.addCustomValue.setValue(
      testData.kintoblock.validEnvValueForApiCall
    )
    KintoBlockManage.requiredToggleForCustomParam.click()
    KintoBlockManage.addIconOfCustomParam.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.submitGlobal()
  })

  it('should check for the text displayed inside the pop-up when clicked on the Add To Deployment btn in KB manage page', () => {
    KintoBlockManage.addDeploymentBtn.click()
    expect(KintoBlockManage.addDeploymentBtn.isVisible()).to.eql(true)
    KintoBlockManage.addDeploymentPopup.waitForVisible()
    expect(KintoBlockManage.addDeploymentPopup.isVisible()).to.eql(true)
    KintoBlockManage.addToDeployText.waitForVisible()
    expect(KintoBlockManage.addToDeployText.getText()).to.eql(
      `You don't have any deployments yet, please create one by clicking the button below.`
    )
  })

  it('should check whether search bar is visible in Add to Deployment pop-up', () => {
    DeploymentManage.depSearchBar.waitForVisible()
    expect(DeploymentManage.depSearchBar.isVisible()).to.eql(true)
  })

  it('should deploy the website KB using Add to Deployment in KB manage page', () => {
    KintoBlockManage.addToDeployment()
    KintoBlockManage.addToNewDeployment()
  })

  it('should check for deployment success of website KB', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should be able to add another KB in the same deployment', () => {
    DeploymentCreate.getenvCardLink(2).click()
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
  })

  // it('should check whether url, copy button, open button are visible', () => {
  //   browser.scroll(0,2500)
  //   DeploymentManage.websiteUrl.waitForVisible()
  //   expect(DeploymentManage.websiteUrl.isVisible()).to.eql(true)
  //   DeploymentCreate.getwebsiteopen(2).waitForVisible()
  //   expect(DeploymentCreate.getwebsiteopen(2).isVisible()).to.eql(true)
  //   DeploymentCreate.getwebsiteopen(3).waitForVisible()
  //   expect(DeploymentCreate.getwebsiteopen(3).isVisible()).to.eql(true)
  // })

  // it('should be able to click on copy button in website deployment', () => {
  //   DeploymentCreate.getwebsiteopen(2).click()
  // })

  // it('should deploy a website KB and should be able to open it', () => {
  //   DeploymentCreate.getwebsiteopen(3).click()
  //   var tabIds = browser.getTabIds()
  //   browser.switchTab(tabIds[6])
  //   expect(DeploymentManage.webAppTitle.getText()).to.eql('Payco web app')
  // })
})

describe('KB - 4 - List Page overall', () => {
  //TC_442
  it('should navigate user to KB list page, when user clicks on `KintoBlocks` in breadcrumb of KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.toKbListPage.leftClick()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
  })

  it('should navigate to documentation page of the KB selected via KB search drop down list displayed in KB list page', () => {
    KintoBlockList.kbSearchBar.setValue('Hello World')
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    KintoBlockList.getFilteredKB('helloworld').click()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.kbNameInBreacdcrumb.getText()).to.eql('Hello World')
    expect(KintoBlockManage.endPointPageTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  //TC_443
  it('should navigate user to KB list page, if user enter KB list page URL in browser', () => {
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
  })

  //TC_444
  it('should display KB list page title as `My KIntoBlocks`', () => {
    expect(KintoBlockList.listPageTitle.getText()).to.eql('My KintoBlocks')
  })

  //TC_445
  it('should display `create new kintoblock` button on top right of KB list page', () => {
    expect(KintoBlockList.createNewKbBtn.isVisible()).to.eql(true)
  })

  //TC_446
  it('should display first card in KB list page as `create new kintoblock` with pulsing `+` blue icon', () => {
    expect(KintoBlockList.kbCreateCard.isVisible()).to.eql(true)
  })

  //TC_448
  it('should navigate user to KB select flavour page, when user clicks on `create new kintoblock` button on top right of KB list page', () => {
    KintoBlockList.createNewKbBtn.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.kintoBlockTypeSelectPage.isVisible()).to.eql(true)
  })

  //TC_449
  it('should verify that create KB card is entirely clickable, when user clicks on it should navigate to KB select flavour page', () => {
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.kbCreateCardImg.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.kintoBlockTypeSelectPage.isVisible()).to.eql(true)
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.kbCreateCardAddIcon.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.kintoBlockTypeSelectPage.isVisible()).to.eql(true)
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
  })

  //TC_450
  it('should verify that any KB card is entirely clickable, when user clicks on it should navigate to Kb manage page', () => {
    KintoBlockList.getKbCardImg(0).waitForVisible()
    KintoBlockList.getKbCardImg(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getKbCardName(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
  })

  //TC_451
  it('should display newly created KB card next to KB create card in KB list page', () => {
    KintoBlockList.createNewKbBtn.waitForVisible()
    KintoBlockList.createNewKbBtn.click()
    KintoBlockCreate.selectKBFlavour(1).waitForVisible()
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKBNameWithDollar + '23' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions('11.7.0').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions('11.7.0').click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql('11.7.0')
    // browser.scroll(0, 1000)
    // KintoBlockCreate.repoDropDown.click()
    // KintoBlockCreate.getRepoTypeOptions(
    //   'Create new repository'
    // ).waitForVisible()
    // browser.pause(2000)
    // KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    // browser.keys('Tab')
    // browser.keys('Down arrow')
    // browser.pause(2000)
    // browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    reponame = testData.kintoblock.validRepoName + '8' + randomName
    KintoBlockCreate.repository.input.setValue(reponame)
    // browser.scroll(0, 1000)
    // KintoBlockCreate.prepopulateRepoSwitch.waitForVisible()
    // KintoBlockCreate.prepopulateRepoSwitch.click()
    // KintoBlockCreate.prePopulatedIsOn.waitForExist()
    // expect(KintoBlockCreate.prePopulatedIsOn.getValue()).to.eql('true')
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    //this will fail its a bug
    expect(KintoBlockList.getKbCardName(0).getText()).to.eql(kbName)
  })

  //TC_452
  it('should display recently modified KB card next to KB create card in KB list page', () => {
    var kbName = KintoBlockList.getKbCardName(1).getText()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockManage.descriptionField.waitForVisible()
    KintoBlockManage.descriptionField.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.pause(2000)
    KintoBlockManage.basicInfoSaveBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    //this will fail its a bug
    expect(KintoBlockList.getKbCardName(0).getText()).to.eql(kbName)
  })

  //	  //TC_453
  //	  it('should display KB list as per the workspace they were created', () => {
  //	    //TODO
  //	  })

  it('should verify that KB search bar is displayed in top of the Kb list page', () => {
    KintoBlockList.kbSearchBar.waitForVisible()
    expect(KintoBlockList.kbSearchBar.isVisible()).to.eql(true)
  })

  it('should verify whether KB search drop down is displayed, when KB search bar is focused', () => {
    KintoBlockList.kbSearchBar.setValue('101kb`s')
    KintoBlockList.kbSearchBarFocused.waitForVisible()
    KintoBlockList.kbSearchDropDownList.waitForExist()
    expect(KintoBlockList.kbSearchDropDownList.isVisible()).to.eql(true)
  })

  it('should verify that KB search bar act as real time filter', () => {
    KintoBlockList.kbSearchBar.clearElement()
    KintoBlockList.kbSearchBar.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    expect(KintoBlockList.getFilteredKB('helloworld').isVisible()).to.eql(true)
  })

  it('should navigate to KB documentation page, when user clicks on any KB from the KB drop down list', () => {
    KintoBlockList.getFilteredKB('helloworld').click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockManage.kbNameInBreacdcrumb.waitForVisible()
    expect(KintoBlockManage.kbNameInBreacdcrumb.getText()).to.eql('Hello World')
    KintoBlockManage.viewEndpointsTitle.waitForVisible()
    expect(KintoBlockManage.viewEndpointsTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  it('should not display private KB in the KB search drop down list', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    var privateKB = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.kbSearchBar.setValue(privateKB)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.noOptionsText.waitForVisible()
    expect(KintoBlockList.noOptionsText.isVisible()).to.eql(true)
  })

  it('should verify "No options" text is displayed,  if there is no matching KB ', () => {
    expect(KintoBlockList.noOptionsText.getText()).to.eql('No options')
  })

  it('should verify that user can search KB in KB search bar using prefix and suffix of KB name', () => {
    //Prefix
    KintoBlockList.kbSearchBar.setValue('hell')
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    expect(KintoBlockList.getFilteredKB('helloworld').isVisible()).to.eql(true)
    //Suffix
    KintoBlockList.kbSearchBar.setValue('rld')
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    expect(KintoBlockList.getFilteredKB('helloworld').isVisible()).to.eql(true)
  })

  //For below test case : User "B" is a member of user A's personal workspace
  it.skip('should display user A`s public KB in public list of user B`s personal workspace', () => {
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    var publicKb = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, -1000)
    KintoBlockManage.shareKBIcon.click()
    browser.pause(2000)
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.logout()
    Login.loginUsername.waitForVisible()
    var onlyUsername = memberOne.split('@')
    var userName = onlyUsername[0]
    Login.loginUsername.setValue(userName)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.workspaceDropdown.selectByIndex(2)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    WorkspaceManage.linkGithubSecondTime()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.kbSearchBar.setValue(publicKb)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getFilteredKB(publicKb).waitForVisible()
    expect(KintoBlockList.getFilteredKB(publicKb).isVisible()).to.eql(true)
  })

  it('should display a KB in public KB list of all other workspaces except its own workspace if it`s public', () => {
    Login.logout()
    Login.registerAndLogin('P')
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    WorkspaceManage.linkGithubSecondTime()
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.kbCreateCard.waitForVisible()
    KintoBlockList.kbCreateCard.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockTypeSelectPage.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + '092' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions('11.7.0').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions('11.7.0').click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql('11.7.0')
    KintoBlockCreate.loadingFinished.waitForExist()
    reponame = testData.kintoblock.validRepoName + '183' + randomName
    KintoBlockCreate.repository.input.setValue(reponame)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForExist()
    KintoBlockManage.amazingBtn.waitForVisible()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.shareKBIcon.scroll(0, -1000)
    KintoBlockManage.shareKBIcon.click()
    browser.pause(2000)
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.kbSearchBar.setValue(kbName)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getFilteredKB(kbName).waitForVisible()
    expect(KintoBlockList.getFilteredKB(kbName).isVisible()).to.eql(false)
    WorkspaceCreate.open(ws)
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.name.input.setValue(
      testData.workspace.validWorkSpaceName + currentDate.getTime()
    )
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.workspaceCongratsBtn.waitForVisible()
    WorkspaceCreate.workspaceCongratsBtn.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.kbSearchBar.setValue(kbName)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getFilteredKB(kbName).waitForVisible()
    expect(KintoBlockList.getFilteredKB(kbName).isVisible()).to.eql(true)
  })
})

describe('KB - 5 - List cards', () => {
  //TC_462
  it('should display icon for every KB on new KB creation', () => {
    KintoBlockManage.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName =
      testData.kintoblock.validKintoBlockNameWithDigit + '22' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions('11.7.0').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions('11.7.0').click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql('11.7.0')
    KintoBlockCreate.loadingFinished.waitForExist()
    reponame = testData.kintoblock.validRepoNameWithDigit + '3' + randomName
    KintoBlockCreate.repository.input.setValue(reponame)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getKbCardImg(5).waitForVisible() //Change to 7 when user is able to create website type KB
    expect(KintoBlockList.getKbCardImg(5).isVisible()).to.eql(true)
    expect(KintoBlockList.getKbCardName(5).getText()).to.eql(kbName)
  })

  //TC_463
  it.skip('should display branch name on top right of any KB card', () => {
    //TODO For latest commit of branch
    KintoBlockList.getKbBranchNameFromCard(0).waitForVisible()
    expect(KintoBlockList.getKbBranchNameFromCard(0).isVisible()).to.eql(true)
  })

  //TC_464
  it('should display KB card title text as per KB created or modified', () => {
    //As 10 KB's are created switching to workspace 2
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceCreate.open(ws)
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    var wsName =
      testData.workspace.validWorkSpaceName +
      currentTime.getMinutes() +
      currentTime.getSeconds()
    WorkspaceCreate.name.input.setValue(wsName)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.workspaceCongratsBtn.waitForVisible()
    WorkspaceCreate.workspaceCongratsBtn.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForExist()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName =
      testData.kintoblock.validKBNameWithOddNumbers + '11' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    KintoBlockCreate.selectExistingRepository()
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockList.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    expect(KintoBlockList.getKbCardName(0).getText()).to.eql(kbName)
  })

  //Skipped for now as the feature is removed in alpha release
  //TC_465
  it.skip('should display upto four dependencies of KB in stacked manner if there is more than four dependencies in a KB', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.getCard(4).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    DeploymentCreate.kbdropDown.setValue('d')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    DeploymentCreate.kbdropDown.setValue('d')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    DeploymentCreate.kbdropDown.setValue('d')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    DeploymentCreate.kbdropDown.setValue('d')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    DeploymentCreate.kbdropDown.setValue('d')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoBlockManage.submitGlobal()
    browser.pause(2000)
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getStackedDependenciesFromKbCard(4, 1).waitForVisible()
    expect(
      KintoBlockList.getStackedDependenciesFromKbCard(4, 1).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockList.getStackedDependenciesFromKbCard(4, 2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockList.getStackedDependenciesFromKbCard(4, 3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockList.getStackedDependenciesFromKbCard(4, 4).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockList.getStackedDependenciesFromKbCard(4, 5).isVisible()
    ).to.eql(false)
  })

  //Skipped for now as the feature is removed in alpha release
  //TC_466
  it.skip('should display `+X` if dependencies count is more than four, where X is total count of dependencies which is not displayed', () => {
    //Try to get environments counts by for loop, instead of hard coding value 1
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getRemainingDependenciesCount(4).waitForVisible()
    expect(KintoBlockList.getRemainingDependenciesCount(4).getText()).to.eql(
      '+1'
    )
  })

  //TC_467
  //   it('should display remaining number of dependencies in `+X`, where X is remaining number of dependencies', () => {
  //     //TODO Try to get environments counts by for loop, instead of hard coding X value
  //   })

  //TC_468
  it.skip('should display branch name on top right of KB card', () => {
    KintoBlockList.getKbBranchNameFromCard(0).waitForVisible()
    expect(KintoBlockList.getKbBranchNameFromCard(0).isVisible()).to.eql(true)
  })

  //TC_469
  it('should display `...` button in every KB card', () => {
    KintoBlockList.getkbListDropDown(0).waitForVisible()
    expect(KintoBlockList.getkbListDropDown(0).isVisible()).to.eql(true)
  })

  //TC_470
  it('should display options edit branch, view all branches and tags and view endpoints in drop down displayed via `...` button on KB card', () => {
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.getEditBranchOption(0).waitForVisible()
    expect(KintoBlockList.getEditBranchOption(0).isVisible()).to.eql(true)
    expect(
      KintoBlockList.getBranchNameFromKbCardDropDown(0).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockList.getViewAllBranchesAndTagsOption(0).isVisible()
    ).to.eql(true)
    expect(KintoBlockList.getViewEndpointsOption(0).isVisible()).to.eql(true)
  })

  //TC_471
  it('should display 2 tabs(Branches and tags), search bar, scrollable branch list, scrollable tags list and commit code with time&date and comments in `view all branches and tags` drop down', () => {
    //Branch
    KintoBlockList.getEditBranchOption(0).waitForVisible()
    expect(KintoBlockList.getEditBranchOption(0).isVisible()).to.eql(true)
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.getBranchListFromKbDropDown(0).waitForVisible()
    expect(KintoBlockList.getBranchListFromKbDropDown(0).isVisible()).to.eql(
      true
    )
    //Tag
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getkbListDropDown(1).click()
    expect(KintoBlockList.getEditBranchOption(1).isVisible()).to.eql(true)
    KintoBlockList.getViewAllBranchesAndTagsOption(1).click()
    KintoBlockList.getTagsListFromKbDropDown(1).click()
    expect(KintoBlockList.getTagsListFromKbDropDown(1).isVisible()).to.eql(true)
    expect(
      KintoBlockList.getViewAllBranchesAndTagSearchBar(1).isVisible()
    ).to.eql(true)
    KintoBlockList.getViewAllBranchesAndTagSearchBar(1).setValue('1')
    //TODO for checking scrollable
    expect(KintoBlockList.getTagVersionFromTagList(1, 1).isVisible()).to.eql(
      true
    )
    expect(
      KintoBlockList.getTagTimeAndDateFromTagList(1, 1).isVisible()
    ).to.eql(true)
    //Commented as notes not displayed
    // expect(KintoBlockList.getTagNotesFromTagList(1, 1).isVisible()).to.eql(true)
  })

  //Commented for now as the feature is removed in alpha release
  //TC_472
  it.skip('should display dependencies drop down title as `Dependencies(X), where X is the total count of dependencies`', () => {
    KintoBlockList.getRemainingDependenciesCount(4).click()
    KintoBlockList.kbListDropDown.waitForVisible()
    //For now hard coding the count
    expect(KintoBlockList.getDependenciesDropDownTitle(4).getText()).to.eql(
      'Dependencies (5)'
    )
  })

  // //TC_473
  // it('should display total count of dependencies currently in KA, where X in `Dependencies(X)` is total count', () => {
  //   //TODO Try to get environments counts by for loop, instead of hard coding X value
  // })

  //TC_474
  // it('should display dependencies drop down as a scrollable list', () => {
  //   //TODO Need clarification on how to check whether its scrollable or not
  // })

  //Commented for now as the feature is removed in alpha release
  //TC_475
  it.skip('should display dependencies drop down, when user clicks on stacked dependencies icon or `+X` icon next to stacked dependencies', () => {
    KintoBlockList.getStackedDependenciesFromKbCard(4, 3).click()
    expect(KintoBlockList.getDependenciesDropDown(4).isVisible()).to.eql(true)
    KintoBlockList.getStackedDependenciesFromKbCard(4, 3).click()
    KintoBlockList.getRemainingDependenciesCount(4).click()
    expect(KintoBlockList.getDependenciesDropDown(4).isVisible()).to.eql(true)
  })

  //TC_476
  //   it('should turn `+X` icon to blue which is next to stacked dependencies, when user hover over it', () => {
  //     //TODO
  //   })

  //TC_477
  //   it('should display grey highlight for any row for drop down which is visible, when user clicks on `...` button in any KB card', () => {
  //     //TODO
  //   })

  //TC_478
  it('should navigate user to KB manage page, when user clicks on `edit branch` option which appears via `...` button in any KB card', () => {
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getKbCardName(0).waitForVisible()
    var kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.getEditBranchOption(0).waitForVisible()
    KintoBlockList.getEditBranchOption(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
    expect(KintoBlockManage.kbNameInBreacdcrumb.getText()).to.eql(kbName)
  })

  //TC_479
  it('should replace first drop down displayed via `...` button in any KB card with drop down visible via `view all branches and tags` drop down', () => {
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    //first drop down
    KintoBlockList.kbListDropDown.waitForVisible()
    expect(KintoBlockList.kbListDropDown.isVisible()).to.eql(true)
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    //second drop down
    KintoBlockList.kbListDropDown.waitForVisible()
    expect(KintoBlockList.kbListDropDown.isVisible()).to.eql(true)
    expect(
      KintoBlockList.getViewAllBranchesAndTagSearchBar(0).isVisible()
    ).to.eql(true)
  })

  //TC_480
  it('should navigate to documentation page of that KB current version, when user clicks on `view endpoints` option via `...` button in KB card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    var kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.getViewEndpointsOption(0).waitForVisible()
    KintoBlockList.getViewEndpointsOption(0).click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockManage.kbNameInBreacdcrumb.waitForVisible()
    expect(KintoBlockManage.kbNameInBreacdcrumb.getText()).to.eql(kbName)
    KintoBlockList.viewEndpointsTitle.waitForVisible()
    expect(KintoBlockList.viewEndpointsTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  //TC_481
  it.skip('should display upto 5 branches and upto 2 tags in drop down displayed via `view all branches and tags`', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getkbListDropDown(5).click()
    KintoBlockList.kbListDropDown.waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(5).click()
    KintoBlockList.getViewAllBranchesAndTagSearchBar(5).waitForVisible()
    expect(KintoBlockList.getBranchFromBranchList(5, 1).isVisible()).to.eql(
      true
    )
    expect(KintoBlockList.getBranchFromBranchList(5, 2).isVisible()).to.eql(
      true
    )
    expect(KintoBlockList.getBranchFromBranchList(5, 3).isVisible()).to.eql(
      true
    )
    expect(KintoBlockList.getBranchFromBranchList(5, 4).isVisible()).to.eql(
      true
    )
    expect(KintoBlockList.getBranchFromBranchList(5, 5).isVisible()).to.eql(
      true
    )
    //TODO for tag list
  })

  //TC_482
  it('should filter branches and tags list using the search bar displayed via `view all branches and tags`', () => {
    //For filtering branches
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.kbListDropDown.waitForVisible()
    browser.scroll(0, 2000)
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.getViewAllBranchesAndTagSearchBar(0).waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagSearchBar(0).setValue('master')
    browser.scroll(0, 2000)
    KintoBlockList.getBranchFromBranchList(0, 1).waitForVisible()
    expect(KintoBlockList.getBranchFromBranchList(0, 1).getText()).to.eql(
      'master'
    )
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getkbListDropDown(1).click()
    KintoBlockList.kbListDropDown.waitForVisible()
    browser.scroll(0, 2000)
    KintoBlockList.getViewAllBranchesAndTagsOption(1).click()
    KintoBlockList.getViewAllBranchesAndTagSearchBar(1).waitForVisible()
    //For filtering tags
    KintoBlockList.getTagsListFromKbDropDown(1).click()
    browser.scroll(0, 2000)
    KintoBlockList.getTagFromTagsList(1, 1).waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagSearchBar(1).setValue('1')
    //This fails as there is no commit done in script
    browser.scroll(0, 2000)
    expect(KintoBlockList.getTagVersionFromTagList(1, 1).getText()).to.eql(
      '1.0.0'
    )
  })

  //TC_483
  it('should navigate user to KB manage page of that branch, when user clicks on any branch from branch drop down list', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.kbListDropDown.waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.getViewAllBranchesAndTagSearchBar(0).waitForVisible()
    KintoBlockList.getBranchListFromKbDropDown(0).click()
    KintoBlockList.getBranchFromBranchList(0, 1).waitForVisible()
    var branchName = KintoBlockList.getBranchFromBranchList(0, 1).getText()
    KintoBlockList.getBranchFromBranchList(0, 1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    expect(branchName).to.eql(
      KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    )
  })

  //TC_484
  it('should navigate user to KB tagged page of that version, when user clicks on any tag from tags drop down list', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getkbListDropDown(1).click()
    KintoBlockList.getViewAllBranchesAndTagsOption(1).waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(1).click()
    KintoBlockList.getViewAllBranchesAndTagSearchBar(1).waitForVisible()
    KintoBlockList.getTagsListFromKbDropDown(1).click()
    KintoBlockList.getViewAllBranchesAndTagSearchBar(1).setValue('1')
    var tagVersion = KintoBlockList.getTagFromTagsList(1, 1).getText()
    KintoBlockList.getTagFromTagsList(1, 1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(tagVersion).to.eql(
      KintoBlockManage.tagVersionFromBreadcrumb.getText()
    )
  })

  //TC_485
  it.skip('should verify that only basic info component is editable in KB tagged page', () => {
    expect(KintoBlockManage.submitBtn.isEnabled()).to.eql(false)
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKintoBlockName + '12' + currentDate.getTime()
    )
    KintoBlockManage.submitBtn.waitForVisible()
    expect(KintoBlockManage.submitBtn.isEnabled()).to.eql(true)
    KintoBlockManage.submitGlobal()
    browser.pause(2000)
    expect(KintoBlockManage.submitBtn.isEnabled()).to.eql(false)
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    KintoBlockManage.submitBtn.waitForVisible()
    expect(KintoBlockManage.submitBtn.isEnabled()).to.eql(true)
    KintoBlockManage.submitGlobal()
    browser.pause(2000)
    //for now not able to add dependencies as there is a bug, but below expect passes as there will no dependencies
    expect(KintoBlockManage.getDependenciesDeleteIcon(1).isVisible()).to.eql(
      false
    )
  })

  //TC_486
  it('should make disappear drop downs visible via KB card, when user clicks any where on page other than on KB card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.kbListDropDown.waitForVisible()
    expect(KintoBlockList.kbListDropDown.isVisible()).to.eql(true)
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    expect(KintoBlockList.kbListDropDown.isVisible()).to.eql(false)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.kbListDropDown.waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.branchesAndTagsDropDownVisible.waitForVisible()
    expect(KintoBlockList.branchesAndTagsDropDownVisible.isVisible()).to.eql(
      true
    )
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    expect(KintoBlockList.kbListDropDown.isVisible()).to.eql(false)
  })
})

describe('KB - 6 - Basic info Component', () => {
  //TC_565
  it('should display title for "Basic Info" component as `Basic Info` in KB manage and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    var title = KintoBlockManage.kbNameInBreacdcrumb.getText()
    KintoBlockManage.basicInfoEditIcon.click()
    expect(KintoBlockManage.basicInfoComponentTitle.getText()).to.eql(
      `Edit Basic Info - ${title}`
    )
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    title = KintoBlockManage.kbNameInBreacdcrumb.getText()
    KintoBlockManage.basicInfoEditIcon.click()
    expect(KintoBlockManage.basicInfoComponentTitle.getText()).to.eql(
      `Edit Basic Info - ${title}`
    )
  })

  //TC_566
  it.skip('should display subtitle for "Basic Info" component as `Choose the name for this KintoBlock and give a a short description. If you make the KintoBlock public, they will help other people discover your application. Let us know your preferred coding flavor and connect your repo.` in in KB manage and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(DeploymentCreate.basicInfoComponentSubtitle.getText()).to.eql(
      'Choose the name for this KintoBlock and give a short description so you can easily find it back later. Let us know your preferred coding flavor and connect your repo.'
    )
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(DeploymentCreate.basicInfoComponentSubtitle.getText()).to.eql(
      'Choose the name for this KintoBlock and give a short description so you can easily find it back later. Let us know your preferred coding flavor and connect your repo.'
    )
  })

  //TC_567
  it('should display title for language, protocol and repository fields in KB manage and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockManage.languageFieldTitle.waitForVisible()
    expect(KintoBlockManage.languageFieldTitle.getText()).to.eql('LANGUAGE')
    KintoBlockManage.basicInfoCancelBtn.click()
    expect(KintoBlockManage.repositoryFieldTitle.getText()).to.eql('REPOSITORY')
    browser.scroll(0, 1000)
    KintoBlockManage.advancedOptionsExpandIcon.click()
    expect(KintoBlockManage.protocolFieldTitle.getText()).to.eql('PROTOCOL')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockManage.languageFieldTitle.waitForVisible()
    expect(KintoBlockManage.languageFieldTitle.getText()).to.eql('LANGUAGE')
    KintoBlockManage.basicInfoCancelBtn.click()
    expect(KintoBlockManage.repositoryFieldTitle.getText()).to.eql('REPOSITORY')
    browser.scroll(0, 1000)
    KintoBlockManage.advancedOptionsExpandIcon.click()
    expect(KintoBlockManage.protocolFieldTitle.getText()).to.eql('PROTOCOL')
  })

  // //TC_568
  // it('should display one line input field and text area field under basic info component in KB manage page and tagged page', () => {
  //     //TODO
  // })

  //TC_569
  it('should display title for text fields in "Basic Info" component in KB manage page and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockManage.basicInfoNameFieldTitle.waitForVisible()
    expect(KintoBlockManage.basicInfoNameFieldTitle.getText()).to.eql(
      'KINTOBLOCK NAME'
    )
    var descriptionTitle = KintoBlockManage.basicInfoDescriptionFieldTitle
      .getText()
      .split('\n')
    expect(descriptionTitle[0]).to.eql('DESCRIPTION')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockManage.basicInfoNameFieldTitle.waitForVisible()
    expect(KintoBlockManage.basicInfoNameFieldTitle.getText()).to.eql(
      'KINTOBLOCK NAME'
    )
    var descriptionTitleInTagPage = KintoBlockManage.basicInfoDescriptionFieldTitle
      .getText()
      .split('\n')
    expect(descriptionTitleInTagPage[0]).to.eql('DESCRIPTION')
  })

  //TC_570
  it('should display placeholder text as "Enter a name for your KintoBlock" in KB name field of KB create page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.nameField.getAttribute('placeholder')).to.eql(
      'Enter a name for your KintoBlock'
    )
  })

  //TC_571
  it.skip('should display placeholder text as "Enter a short description of your KintoBlock" in KB description field of KB create, manage and tagged page', () => {
    //Already in KB create page
    expect(
      KintoBlockManage.descriptionField.getAttribute('placeholder')
    ).to.eql('Enter a short description of your KintoBlock')
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockCreate.nameField.waitForVisible()
    expect(
      KintoBlockCreate.descriptionField.getAttribute('placeholder')
    ).to.eql('Enter a short description of your KintoBlock')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(7).waitForVisible()
    KintoBlockList.getCard(7).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockCreate.nameField.waitForVisible()
    expect(
      KintoBlockCreate.descriptionField.getAttribute('placeholder')
    ).to.eql('Enter a short description of your KintoBlock')
  })

  //TC_572
  it('should display language, protocol and repository fields greyed out/disabled in KB manage and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockManage.languageField.waitForVisible()
    expect(KintoBlockManage.languageField.isEnabled()).to.eql(false)
    KintoBlockManage.basicInfoCancelBtn.click()
    expect(KintoBlockManage.repositoryField.isEnabled()).to.eql(false)
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockManage.languageField.waitForVisible()
    expect(KintoBlockManage.languageField.isEnabled()).to.eql(false)
    KintoBlockManage.basicInfoCancelBtn.click()
    expect(KintoBlockManage.repositoryField.isEnabled()).to.eql(false)
  })

  // //TC_573
  // it('should display an icon in "Basic Info" component and `Expand` button on top right of the component', () => {
  //     //TODO Not implemented
  // })

  //TC_574
  it('should display "Basic Info" component text fields as empty, when user navigates to KB create page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.nameField.getText()).to.eql('')
    expect(KintoBlockCreate.descriptionField.getText()).to.eql('')
  })

  //TC_575
  it('should verify that `create new kintoblock` button becomes enabled, when user enters at least KB name or description', () => {
    //Already in KB create page
    expect(KintoBlockCreate.submitBtn.isEnabled()).to.eql(false)
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName + '13pl'
    )
    expect(KintoBlockCreate.submitBtn.isEnabled()).to.eql(true)
  })

  //TC_576
  it('should not allow user to create a KB without entering the description', () => {
    //Previously entered KB name only in KB create page
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.shortDescription.error.isVisible()).to.eql(true)
  })

  //TC_577
  it.skip('should verify that only KB name and description fields are editable in "Basic Info" component of KB manage and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKintoBlockName + '6'
    )
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    expect(KintoBlockManage.languageField.isEnabled()).to.eql(false)
    expect(KintoBlockManage.protocolField.isEnabled()).to.eql(false)
    expect(KintoBlockManage.repositoryField.isEnabled()).to.eql(false)
    KintoBlockManage.submitBtn.waitForVisible()
    KintoBlockManage.submitGlobal()
    //TODO in KB tagged page as in local we can't do tag latest commit
  })

  //TC_578
  it.skip('should display previously saved KB name and description in KB manage and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    var kbName =
      testData.kintoblock.validKBNameWithOddNumbers +
      '15' +
      currentDate.getTime()
    KintoBlockManage.name.input.setValue(kbName)
    var kbDescription = testData.kintoblock.validKBDescriptionWithChar
    KintoBlockManage.description.input.setValue(kbDescription)
    KintoBlockManage.submitBtn.waitForVisible()
    KintoBlockManage.submitGlobal()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.nameField.getValue()).to.eql(kbName)
    expect(KintoBlockManage.descriptionField.getText()).to.eql(kbDescription)
  })

  //TC_579
  it.skip('should allow user to edit and save KB name as well as description for multiple times', () => {
    //Already in KB manage page
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Tag Latest Commit')
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKintoBlockName + '16' + currentDate.getTime()
    )
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.pause(3000)
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
    KintoBlockManage.submitBtn.click()
    browser.pause(3000)
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Tag Latest Commit')
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKintoBlockNameWithDigit + currentDate.getTime()
    )
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.pause(3000)
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
    KintoBlockManage.submitBtn.click()
    browser.pause(3000)
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Tag Latest Commit')
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKBNameWithDollar + currentDate.getTime()
    )
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.pause(3000)
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
    browser.pause(3000)
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
  })

  //TC_580
  it.skip('should reflect the changes of KB name and description, where ever its displayed', () => {
    //Already edited and saved
    var branchName = KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    var kbName = KintoBlockManage.kbNameInBreacdcrumb.getText()
    var kbDescription = KintoBlockManage.descriptionField.getText()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - ' + branchName)
    expect(KintoBlockManage.kbNameInBreacdcrumb.getText()).to.eql(kbName)
    expect(KintoBlockCreate.nameField.getValue()).to.eql(kbName)
    expect(KintoBlockCreate.descriptionField.getText()).to.eql(kbDescription)
    KintoBlockManage.kbListDropDown.click()
    KintoBlockManage.getKbNameFromDropDown(1).waitForVisible()
    expect(KintoBlockManage.getKbNameFromDropDown(1).getText()).to.eql(kbName)
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockList.viewEndpointsTitle.waitForVisible()
    expect(KintoBlockManage.kbNameInBreacdcrumb().getText()).to.eql(kbName)
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getKbCardName(0).waitForVisible()
    expect(KintoBlockList.getKbCardName(0).getText()).to.eql(kbName)
    //TODO for KB tagged page
  })

  // //TC_581
  // it('should verify that language, protocol and repository name are displayed in KB manage page as per entered during KB creation', () => {
  //   var ws = Landing.workspaceSelect.getAttribute('data-test')
  //   KintoBlockCreate.open(ws)
  //   KintoBlockCreate.form.waitForVisible()
  //   KintoBlockCreate.loadingFinished.waitForExist()
  //   var kbName = testData.kintoblock.validKBNameWithOddNumbers+ '10' +currentTime.getMinutes() + currentTime.getSeconds()
  //   KintoBlockCreate.name.input.setValue(kbName)
  //   KintoBlockCreate.shortDescription.input.setValue(
  //     testData.kintoblock.validKBDescription
  //   )
  //   KintoBlockCreate.language.input.selectByIndex(1)
  //   var language = KintoBlockCreate.languageField.getText('option:checked')
  //   KintoBlockCreate.protocol.input.selectByIndex(1)
  //   var protocol = KintoBlockCreate.protocolField.getText('option:checked')
  //   var repoName = testData.kintoblock.validRepoNameWithEvenNumbers+ '6' + currentDate.getTime()
  //   KintoBlockCreate.repository.input.setValue(
  //     repoName
  //   )
  //   KintoBlockCreate.submitGlobal()
  //   KintoBlockList.loadingFinished.waitForExist()
  //   KintoBlockList.myKintoBlocksList.waitForVisible()
  //   KintoBlockList.getCard(5).waitForVisible()
  //   KintoBlockList.getCard(5).click()
  //   KintoBlockManage.form.waitForVisible()
  //   KintoBlockManage.loadingFinished.waitForExist()
  //   var branchName = KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
  //   //var kbName = KintoBlockManage.kbNameInBreacdcrumb.getText()
  //   expect(KintoBlockManage.title.getText()).to.eql(
  //     kbName + ' - ' + branchName
  //   )
  //   expect(KintoBlockManage.languageField.getText('option:checked')).to.eql(
  //     language
  //   )
  //   expect(KintoBlockManage.protocolField.getText('option:checked')).to.eql(
  //     protocol
  //   )
  //   expect(KintoBlockManage.repositoryField.getText('option:checked')).to.eql(
  //     repoName
  //   )
  // })
})

describe('KB - 7 - manage kintoBlock', () => {
  it('should show kb manage when clicking on that kintoblock in list', () => {
    KintoBlockList.logout()
    browser.alertAccept()
    browser.pause(2000)
    Login.registerAndLogin('MKB')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName =
      testData.kintoblock.validKintoBlockNameWithDigit + '62' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    KintoBlockCreate.selectExistingRepository()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForVisible()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.title.waitForVisible()
    expect(KintoBlockManage.title.getText()).to.eq(kbName + ' - master')
  })

  it('should display alert pop up message, when user try to navigate to any page of KH from `manage KB` page without saving the changes made', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.click('.toggle-content .toggle-slider')
    DashboardIndex.kintoBlocksleftnav.click()
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it.skip('show an error message when clicking tag latest commit', () => {
    KintoBlockManage.createTagButton.click()
    expect(KintoBlockManage.createTagError.isVisible()).to.eql(true)
    expect(KintoBlockManage.createTagError.getText()).to.eql(
      'At least one commit must be built successfully in order to create a tag'
    )
  })

  it.skip('tag latest commit is only shown when the form has no unsaved changes', () => {
    expect(KintoBlockManage.createTagButton.isVisible()).to.eql(true)
    browser.scroll(0, -2000)
    browser.click('.toggle-content .toggle-slider')
    browser.pause(2000)
    expect(KintoBlockManage.createTagButton.isVisible()).to.eql(false)
    KintoBlockCreate.submitGlobal()
    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
    expect(KintoBlockManage.createTagButton.isVisible()).to.eql(true)
  })

  it.skip('env params add button should be disabled when added data is empty', () => {
    expect(
      KintoBlockManage.envInput
        .element('.bottom .icon-column button')
        .isEnabled()
    ).to.eql(false)
    KintoBlockManage.addEnvKey.setValue(testData.kintoblock.validEnvironmentKey)
    KintoBlockManage.addEnvValue.setValue(
      testData.kintoblock.validEnvironmentValue
    )
    expect(
      KintoBlockManage.envInput
        .element('.bottom .icon-column button')
        .isEnabled()
    ).to.eql(true)
  })

  it.skip('should add a new env row when entering data correctly', () => {
    expect(
      KintoBlockManage.envInput.element('.empty-message').isVisible()
    ).to.eql(true)
    KintoBlockManage.addEnvKey.setValue(testData.kintoblock.validEnvironmentKey)
    KintoBlockManage.addEnvValue.setValue(
      testData.kintoblock.validEnvironmentValue
    )
    KintoBlockManage.addIconOfEnvVariables.click()
    browser.pause(3000)
    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validEnvironmentKey)
    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validEnvironmentValue)
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should add a new custom parameter row when entering data correctly', () => {
    browser.scroll(0, 2000)
    KintoBlockManage.addCustomKey.setValue(testData.kintoblock.validCustomKey)
    KintoBlockManage.addCustomValue.setValue(
      testData.kintoblock.validCustomValue
    )
    KintoBlockManage.addIconOfCustomParam.click()
    browser.pause(3000)
    expect(
      KintoBlockManage.getParamsRow(0)
        .element('[data-test="configParameters[0].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validCustomKey)
    expect(
      KintoBlockManage.getParamsRow(0)
        .element('[data-test="configParameters[0].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validCustomValue)
    KintoBlockManage.submitGlobal()
    KintoBlockList.loadingFinished.waitForExist()
  })

  it('should display the updated kb data after successfully updating it', () => {
    browser.scroll(0, -2000)
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockManage.descriptionField.waitForVisible()
    KintoBlockManage.descriptionField.setValue(
      testData.kintoblock.validUpdatedKBDescription
    )
    KintoBlockManage.basicInfoSaveBtn.click()
    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForExist()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.title.waitForVisible()
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockManage.descriptionField.waitForVisible()
    expect(KintoBlockManage.description.input.getText()).to.eq(
      testData.kintoblock.validUpdatedKBDescription
    )
    // expect(
    //   KintoBlockManage.getEnvRow(0)
    //     .element('[data-test="environmentVariables[0].key"] input')
    //     .getValue()
    // ).to.eql(testData.kintoblock.validEnvironmentKey)
    // expect(
    //   KintoBlockManage.getEnvRow(0)
    //     .element('[data-test="environmentVariables[0].value"] input')
    //     .getValue()
    // ).to.eql(testData.kintoblock.validEnvironmentValue)
  })

  it.skip('should be able to edit the environmental parameter and value', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.title.waitForVisible()
    browser.element(`[data-test="params-add-key"]`).moveToObject()
    KintoBlockManage.getEnvRow(0)
      .element('[data-test="environmentVariables[0].key"] input')
      .setValue(testData.kintoblock.updatedEnvironmentKey)
    KintoBlockManage.getEnvRow(0)
      .element('[data-test="environmentVariables[0].value"] input')
      .setValue(testData.kintoblock.updatedEnvironmentValue)
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.title.waitForVisible()
    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.updatedEnvironmentKey)
    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.updatedEnvironmentValue)
  })

  it('should be able to edit the custom parameters and value', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.title.waitForVisible()
    KintoBlockManage.getParamsRow(0)
      .element('[data-test="configParameters[0].key"] input')
      .setValue(testData.kintoblock.updatedCustomKey)
    KintoBlockManage.getParamsRow(0)
      .element('[data-test="configParameters[0].value"] input')
      .setValue(testData.kintoblock.updatedCustomValue)
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.title.waitForVisible()
    expect(
      KintoBlockManage.getParamsRow(0)
        .element('[data-test="configParameters[0].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.updatedCustomKey)
    expect(
      KintoBlockManage.getParamsRow(0)
        .element('[data-test="configParameters[0].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.updatedCustomValue)
  })

  it('should highlight the correct list when I click on the corresponding tab in the dropdown, and selected tab matches the breadcrumb', () => {
    KintoBlockManage.breadcrumb.click()
    KintoBlockManage.getTab('branch').click()
    expect(KintoBlockManage.getDropdown('tag').isVisible()).to.eql(true)
    const currentBranchName = KintoBlockManage.breadCrumbTitle.getText()
    expect(
      KintoBlockManage.getDropdown('tag')
        .$('.tag-name')
        .getText()
    ).to.eql(currentBranchName)
    KintoBlockManage.getTab('tag').click()
    expect(KintoBlockManage.activeTagSection.isVisible()).to.eql(true)
  })

  it('should reset search bar while switching tabs', () => {
    KintoBlockManage.getTab('branch').click()
    KintoBlockManage.dropDownfilter.setValue('test')
    KintoBlockManage.getTab('tag').click()
    expect(KintoBlockManage.dropDownfilter.getValue()).to.eql('')
    KintoBlockManage.dropDownfilter.setValue('test')
    KintoBlockManage.getTab('branch').click()
    expect(KintoBlockManage.dropDownfilter.getValue()).to.eql('')
  })

  it.skip('should be able to add multiple environmental parameters', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.title.waitForVisible()
    KintoBlockManage.addEnvKey.setValue(
      testData.kintoblock.validEnvironmentKeyWithSpecialChars
    )
    KintoBlockManage.addEnvValue.setValue(
      testData.kintoblock.validEnvironmentValueWithSpecialChars
    )
    KintoBlockManage.addIconOfEnvVariables.click()
    expect(
      KintoBlockManage.getEnvRow(1)
        .element('[data-test="environmentVariables[1].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validEnvironmentKeyWithSpecialChars)
    expect(
      KintoBlockManage.getEnvRow(1)
        .element('[data-test="environmentVariables[1].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validEnvironmentValueWithSpecialChars)
    KintoBlockManage.submitGlobal()
    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
  })

  it.skip('should validate and show error message when adding duplicate environmental parameters', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.title.waitForVisible()
    KintoBlockManage.addEnvKey.setValue(
      testData.kintoblock.updatedEnvironmentKey
    )
    KintoBlockManage.addEnvValue.setValue(
      testData.kintoblock.validEnvironmentValueWithSpecialChars
    )
    KintoBlockManage.addIconOfEnvVariables.click()
    expect(
      KintoBlockManage.getEnvRow(2)
        .element('[data-test="environmentVariables[2].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.updatedEnvironmentKey)
    expect(
      KintoBlockManage.getEnvRow(2)
        .element('[data-test="environmentVariables[2].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validEnvironmentValueWithSpecialChars)
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].key"] .error-message')
        .getText()
    ).to.eql('Must be unique')
    KintoBlockManage.getEnvRow(2)
      .element('[data-test="environmentVariables[2].key"] input')
      .setValue(testData.kintoblock.validEnvKeyWithCAPS)
    KintoBlockManage.submitGlobal()

    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
  })

  it('it should be able to see three options - Edit Branch, View all branches and tags and  Delete kintoblock options for my KintoBlock', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockManage.dropDownMenu.click()
    KintoBlockManage.dropDownMenuOptions.waitForVisible()

    expect(KintoBlockManage.editBranch.getText()).to.eql('Edit Branch\nmaster')
    expect(KintoBlockManage.viewBranchesAndTag.getText()).to.eql(
      'View All Branches & Tags'
    )
    //expect(KintoBlockManage.delKB.getText()).to.eql('Delete KintoBlock')
  })

  it('it should be able to click on View all branches and tags and switch between Branches and Tags', () => {
    KintoBlockManage.viewBranchesAndTag.click()
    KintoBlockManage.dropDownTabs.waitForVisible()
    expect(KintoBlockManage.getTab('branch').isVisible()).to.eql(true)
    KintoBlockManage.getTab('tag').click()
    expect(KintoBlockManage.getTab('tag').isVisible()).to.eql(true)
  })

  it('should be able to add multiple custom parameters', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.title.waitForVisible()
    KintoBlockManage.addCustomKey.setValue(
      testData.kintoblock.validCustomKeyWithSpecialChars
    )
    KintoBlockManage.addCustomValue.setValue(
      testData.kintoblock.validCustomValueWithSpecialChars
    )
    KintoBlockManage.addIconOfCustomParam.click()
    expect(
      KintoBlockManage.getParamsRow(1)
        .element('[data-test="configParameters[1].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validCustomKeyWithSpecialChars)
    expect(
      KintoBlockManage.getParamsRow(1)
        .element('[data-test="configParameters[1].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validCustomValueWithSpecialChars)
    KintoBlockManage.submitBtn.waitForVisible()
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
  })
})

describe('KB - 8 - Edit Page Overall', () => {
  it('should verify all the data fields of example KintoBlock "Helloworld" are greyed out', () => {
    KintoBlockManage.logout()
    Login.registerAndLogin('EPO')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.basicInfoEditIcon.click()
    browser.pause(2000)
    expect(KintoBlockManage.name.input.isEnabled()).to.eql(false)
    expect(KintoBlockManage.description.input.isEnabled()).to.eql(false)
    expect(KintoBlockManage.language.isEnabled()).to.eql(false)
    KintoBlockManage.basicInfoCancelBtn.click()
    browser.scroll(0, 1000)
    KintoBlockManage.advancedOptionsExpandIcon.click()
    browser.pause(2000)
    expect(KintoBlockManage.protocolFieldDisabled.isVisible()).to.eql(true)
    expect(KintoBlockManage.portFieldInAdvancedOptions.isEnabled()).to.eql(
      false
    )
    expect(KintoBlockManage.buildCommandInAdvancedOptions.isEnabled()).to.eql(
      false
    )
    expect(KintoBlockManage.runCommandInAdvancedOptions.isEnabled()).to.eql(
      false
    )
  })

  //TC_523
  it('should navigate to KB manage page, when user selects a KB from KB drop down list displayed via breadcrumb', () => {
    KintoBlockManage.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.kbListDropDown.click()
    KintoBlockManage.kbListDropDownVisible.waitForVisible()
    var kbName = KintoBlockManage.getKbNameFromDropDown(1).getText()
    KintoBlockManage.getKbFromBreadcrumbDropDown(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.kbNameInBreacdcrumb.getText()).to.eql(kbName)
  })

  //TC_524
  it('should navigate user to KB manage page, when user enters the URL of KB manage page in the browser', () => {
    //Already in KB manage page
    var url = KintoBlockManage.getUrl().split('/')
    var ws = url[3]
    var kbId = url[5]
    var branchName = url[7]
    //Navigating to KB list page
    var kbTitle = KintoBlockManage.title.getText()
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
    //Entering URL for KB manage page
    browser.url(
      `/app/dashboard/${ws}/kintoblocks/${kbId}/versions/${branchName}/branch`
    )
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
    expect(KintoBlockManage.title.getText()).to.eql(kbTitle)
  })

  it('should display "name", "description", "language", "repository", "share" toggle, "mongoDB" toggle, "open repo" button, "view projects" link and "protocol" fields in KB microservice manage page', () => {
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockManage.disabledNameField.waitForVisible()
    expect(KintoBlockManage.disabledNameField.isVisible()).to.eql(true)
    expect(KintoBlockManage.descriptionField.isVisible()).to.eql(true)
    expect(KintoBlockManage.languageField.isVisible()).to.eql(true)
    KintoBlockManage.basicInfoCancelBtn.click()
    //expect(KintoBlockManage.protocolField.isVisible()).to.eql(true)
    expect(KintoBlockManage.repositoryField.isVisible()).to.eql(true)
    expect(KintoBlockManage.shareKBIcon.isVisible()).to.eql(true)
    //Removed in sprint 29 after new changes
    // expect(
    //   ServicesPage.getToggleSwitchOfServicesInKB('MONGODB').isVisible()
    // ).to.eql(true)
    expect(KintoBlockManage.openRepoBtn.isVisible()).to.eql(true)
    expect(KintoBlockManage.viewExampleProjectsLink.isVisible()).to.eql(true)
  })

  //TC_525
  it('should display `view endpoints` button on top right of KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.waitForVisible()
    expect(KintoBlockManage.viewEndpointsBtn.isVisible()).to.eql(true)
    expect(KintoBlockManage.viewEndpointsBtn.getText()).to.eql('View Endpoints')
  })

  //TC_526
  it.skip('should display KB manage title as per KB selected', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    var branchName = KintoBlockList.getKbBranchNameFromCard(0).getText()
    var kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getValue()).to.eql(
      kbName + ' - ' + branchName
    )
  })

  it('should verify user can make a KB public or private', () => {
    // DashboardIndex.workspaceDropdown.selectByIndex(2)
    // DashboardIndex.loadingFinished.waitForExist()
    // DashboardIndex.container.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(3).waitForVisible()
    KintoBlockList.getCard(3).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.shareKBIcon.scroll(0, -1000)
    expect(KintoBlockManage.shareOptionStatus.getValue()).to.eql('false')
    KintoBlockManage.shareKBIcon.click()
    browser.pause(2000)
    expect(KintoBlockManage.shareOptionStatus.getValue()).to.eql('true')
    KintoBlockManage.shareKBIcon.click()
    browser.pause(2000)
    expect(KintoBlockManage.shareOptionStatus.getValue()).to.eql('false')
    browser.pause(2000)
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should verify that user can enable share toggle for a KB', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.shareKBIcon.scroll(0, -1000)
    KintoBlockManage.shareKBIcon.click()
    browser.pause(2000)
    expect(KintoBlockManage.shareOptionStatus.getValue()).to.eql('true')
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should verify share toggle bar for a KB cannot be disabled once its enabled', () => {
    //Already enabled
    KintoBlockManage.shareKBIcon.scroll(0, -1000)
    KintoBlockManage.shareKBIcon.click()
    browser.pause(2000)
    expect(KintoBlockManage.shareOptionStatus.getValue()).to.not.eql('false')
  })

  it.skip('should verify once a KB is shared public that KB should be displayed in public KB list of my member workspace', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(1).waitForVisible()
    var kbName = KintoBlockList.getKbCardName(1).getText()
    KintoBlockManage.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(memberThree)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.kbSearchBar.setValue(kbName)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getFilteredKB(kbName).waitForVisible()
    expect(KintoBlockList.getFilteredKB(kbName).isVisible()).to.eql(true)
  })

  //TC_527
  it('should display members tool bar component of KB manage page', () => {
    KintoBlockList.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.membersToolBar.isVisible()).to.eql(true)
  })

  //TC_528
  it('should display basic info component of KB manage page', () => {
    KintoBlockManage.basicInfoEditIcon.click()
    expect(KintoBlockManage.basicInfoComponent.isVisible()).to.eql(true)
  })

  //TC_529
  it.skip('should display dependencies component of KB manage page', () => {
    expect(KintoBlockManage.dependenciesComponent.isVisible()).to.eql(true)
  })

  //TC_530
  it.skip('should display environment and custom parameters component of KB manage page', () => {
    expect(KintoBlockManage.envParametersComponent.isVisible()).to.eql(true)
  })

  //TC_531
  it.skip('should display `Tag latest commit` button on bottom right of KB manage page', () => {
    expect(KintoBlockManage.tagLatestCommitBtn.isVisible()).to.eql(true)
    expect(KintoBlockManage.tagLatestCommitBtn.getText()).to.eql(
      'Tag Latest Build'
    )
  })

  //TC_532
  it.skip('should display validation error message as `Must be 3 characters or more`, when user enters less than 3 characters in KB name field', () => {
    KintoBlockManage.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    browser.keys('Tab')
    KintoBlockManage.name.error.waitForVisible()
    expect(KintoBlockManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  //TC_533
  it.skip('should display validation error message as `Must be 24 characters or less`, when user enters more than 24 characters in KB name field', () => {
    KintoBlockManage.name.input.setValue(testData.kintoblock.invalidKBFortyChar)
    browser.keys('Tab')
    KintoBlockManage.name.error.waitForVisible()
    expect(KintoBlockManage.name.error.getText()).to.eql(
      'Must be 24 characters or less'
    )
  })

  //TC_534
  it('should display validation error message as `Must be 200 characters or less`, when user enters more than 200 characters in KB description field', () => {
    KintoBlockManage.descriptionField.waitForVisible()
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.invalidKBDescription
    )
    browser.keys('Tab')
    KintoBlockManage.description.error.waitForVisible()
    expect(KintoBlockManage.description.error.getText()).to.eql(
      'Must be 200 characters or less'
    )
    KintoBlockManage.basicInfoCancelBtn.click()
  })

  //TC_535
  it.skip('should display validation error message as `Only lowercase characters and digits are allowed`, when user enters invalid characters in KB name field', () => {
    KintoBlockManage.name.input.setValue(testData.kintoblock.invalidKBCAPSChar)
    browser.keys('Tab')
    expect(KintoBlockManage.name.error.getText()).to.eql(
      'Must contain only lowercase characters and digits'
    )
  })

  //TC_536
  it.skip('should display validation error message as `The first character can`t be a digit`, when user enters first character as number in KB name field', () => {
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.invalidKBNameWithDigit
    )
    browser.keys('Tab')
    expect(KintoBlockManage.name.error.getText()).to.eql(
      `The first character can't be a digit`
    )
  })

  //TC_537
  it.skip('should make disappear triggered error message, when user enters valid data in second try', () => {
    KintoBlockManage.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    expect(KintoBlockManage.name.error.isVisible()).to.eql(true)
    //Entering valid data on second try
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKBNameWithStar
    )
    expect(KintoBlockManage.name.error.isVisible()).to.eql(false)
  })

  //TC_538
  it.skip('should display `Tag latest commit` button enabled, when user open up a KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.tagLatestCommitBtn.isEnabled()).to.eql(true)
  })

  //TC_539
  it('should trigger `tag this Build` pop up, when user clicks on `tag build` button', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.buildStatusText.getText()).to.eql('SUCCESS')
    browser.scroll(0, 400)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    expect(KintoBlockManage.tagLatestCommitPopUp.isVisible()).to.eql(true)
    KintoBlockManage.cancelTagBtn.click()
  })

  //TC_540
  it.skip('should revert `Tag latest commit` button to `save changes` button, when user edits the KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.tagLatestCommitBtn.getText()).to.eql(
      'Tag Latest Build'
    )
    //Added line for switching off/on toggle bar
    browser.click('.toggle-content .toggle-slider')
    browser.pause(2000)
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
  })

  //TC_541
  it.skip('should revert `save changes` button to `Tag latest commit` button, when user save the changes', () => {
    //Saving the previous changes
    KintoBlockManage.submitGlobal()
    browser.pause(2000)
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.tagLatestCommitBtn.getText()).to.eql(
      'Tag Latest Build'
    )
  })

  //TC_542
  it.skip('should not revert back to `Tag latest commit` button from `save changes` button, when validation conditions are not met during edit', () => {
    expect(KintoBlockManage.tagLatestCommitBtn.getText()).to.eql(
      'Tag Latest Build'
    )
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockManage.descriptionField.waitForVisible()
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.invalidKBDescription
    )
    browser.pause(2000)
    KintoBlockManage.basicInfoSaveBtn.click()
    expect(KintoBlockManage.description.error.isVisible()).to.eql(true)
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
  })

  //TC_543
  it('should navigate to documentation that KB, when user clicks on `view endpoints` button in KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    //browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockList.viewEndpointsTitle.waitForVisible()
    expect(KintoBlockList.viewEndpointsTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  it('should trigger alert pop up, when user try to navigate to other pages without saving the changes made in KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.click('.toggle-content .toggle-slider')
    DashboardIndex.kintoBlocksleftnav.click()
    browser.alertDismiss()
    KintoBlockManage.form.waitForVisible()
  })

  //TC_545
  it('should navigate user to requested page, when user accepts the alert message while editing the KB manage page', () => {
    DashboardIndex.kintoBlocksleftnav.click()
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
  })

  //TC_546
  it('should retain user in KB manage page, when user declines the alert message', () => {
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.click('.toggle-content .toggle-slider')
    browser.pause(2000)
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
    DashboardIndex.kintoBlocksleftnav.click()
    browser.alertDismiss()
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
  })

  it.skip('should verify privately shared KB is displayed only for the member with whom it`s shared', () => {
    DashboardIndex.kintoBlocksleftnav.click()
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(2).waitForVisible()
    var kbName = KintoBlockList.getKbCardName(2).getText()
    KintoBlockList.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    var onlyUsername = memberOne.split('@')
    var userName = onlyUsername[0]
    Login.loginUsername.setValue(userName)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(2).waitForVisible()
    expect(KintoBlockList.getKbCardName(2).getText()).to.eql(kbName)
    KintoBlockList.logout()
    Login.registerAndLogin('M')
    DashboardIndex.container.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    expect(KintoBlockList.getCard(2).isVisible()).to.eql(false)
  })

  //Remove the skip when website kb cretaion bug is resolved
  it.skip('should verify name, description and repository data fields are displayed in KB website manage page', () => {
    KintoBlockList.logout()
    //
    browser.alertAccept()
    browser.pause(5000)
    //
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    //Again switching back to workspace 1
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(4).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.kbWebsiteTypeIcon.waitForVisible()
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockManage.descriptionField.waitForVisible()
    expect(KintoBlockManage.disabledNameField.isVisible()).to.eql(true)
    expect(KintoBlockManage.descriptionField.isVisible()).to.eql(true)
    KintoBlockManage.basicInfoCancelBtn.click()
    expect(KintoBlockManage.repositoryField.isVisible()).to.eql(true)
  })

  //Remove the skip when website kb cretaion bug is resolved
  it.skip('should verify whether commits component is displayed in KB website manage page', () => {
    browser.scroll(0, 1500)
    expect(KintoBlockManage.commitComponentInManagePage.isVisible()).to.eql(
      true
    )
  })

  //Remove the skip when website kb cretaion bug is resolved
  it.skip('should verify that user is navigated to website manage page, if user selects website KB in KB list page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    expect(KintoBlockList.getKbCardWebsiteType(4).isVisible()).to.eql(true)
    KintoBlockList.getCard(4).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.kbWebsiteTypeIcon.waitForVisible()
    expect(KintoBlockManage.kbWebsiteTypeIcon.isVisible()).to.eql(true)
  })

  //Remove the skip when website kb cretaion bug is resolved
  it.skip('should navigate user to manage page of website KB, when user enter the url of that page', () => {
    var url = browser.getUrl()
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
    browser.url(url)
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.kbWebsiteTypeIcon.waitForVisible()
    expect(KintoBlockManage.kbWebsiteTypeIcon.isVisible()).to.eql(true)
  })

  it('should verify that recent commit section is updated as per recent commit made in GitHub', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 600)
    KintoBlockManage.openRepoBtn.waitForVisible()
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[7])
    browser.pause(2000)
    KintoBlockManage.commitTextFromGitHub.waitForVisible()
    var recentCommit = KintoBlockManage.commitTextFromGitHub.getText()
    browser.switchTab(tabIds[0])
    browser.pause(2000)
    browser.scroll(0, -300)
    //KintoBlockManage.getBuildTextInRecentCommits(1).click()
    KintoBlockManage.commitText.waitForVisible()
    expect(KintoBlockManage.commitText.getText()).to.eql(recentCommit)
  })

  it.skip('should verify whether "Tag Latest commit" button is displayed at bottom of the KB website manage page', () => {
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Tag Latest Build')
  })

  it.skip('should revert `Tag latest commit` button to `save changes` button, when user edits the KB website manage page', () => {
    browser.scroll(0, -1000)
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Tag Latest Build')
    KintoBlockManage.basicInfoEditIcon.click()
    KintoBlockManage.descriptionField.waitForVisible()
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.pause(2000)
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
  })

  it.skip('should revert `save changes` button to `Tag latest commit` button in KB website manage page, when user save the changes', () => {
    //Saving the previous changes
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.tagLatestCommitBtn.waitForVisible()
    expect(KintoBlockManage.tagLatestCommitBtn.getText()).to.eql(
      'Tag Latest Build'
    )
  })

  it.skip('should not revert back to `Tag latest commit` button from `save changes` button in KB website manage page, when validation conditions are not met during edit', () => {
    expect(KintoBlockManage.tagLatestCommitBtn.getText()).to.eql(
      'Tag Latest Build'
    )
    KintoBlockManage.descriptionField.waitForVisible()
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.invalidKBDescription
    )
    browser.pause(2000)
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.description.error.isVisible()).to.eql(true)
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
  })

  it('should trigger `tag this build` pop up in KB website manage page, when user clicks on `tag build` button', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    KintoBlockManage.refreshCommitBtn.scroll(0, 1000)
    KintoBlockManage.buildStatusText.waitForVisible()
    expect(KintoBlockManage.buildStatusText.getText()).to.eql('SUCCESS')
    browser.scroll(0, 400)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    expect(KintoBlockManage.tagLatestCommitPopUp.isVisible()).to.eql(true)
  })

  it('should tag KB with the tag version entered at the time of deployment', () => {
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.setValue('0')
    KintoBlockManage.revision.setValue('1')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.tagVersionFromBreadcrumb.getText()).to.eql('1.0.1')
  })
})

describe('KB - 9 - Link Repo resources pop up', () => {
  //TC_1298
  it('should verify whether "link repo resources" pop up is displayed when user try to create a KB without linking to any resources', () => {
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockCreate.logout()
    Login.registerAndLogin('LRR')
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    DashboardIndex.loadingFinished.waitForExist()
    KintoBlockCreate.linkRepoPopUp.waitForVisible()
    expect(KintoBlockCreate.linkRepoPopUp.isVisible()).to.eql(true)
  })

  //TC_1299
  it('should verify whether "link repo resources" pop up displays "GitHub", "Bitbucket" link buttons and "GitLab" coming soon button', () => {
    //GitHub
    expect(
      KintoBlockCreate.getRepoResourcesLinkBtnInLinkRepoPopUp(1).isVisible()
    ).to.eql(true)
    //Bitbucket
    expect(
      KintoBlockCreate.getRepoResourcesLinkBtnInLinkRepoPopUp(2).isVisible()
    ).to.eql(true)
    //GitLab
    expect(KintoBlockCreate.comingSoonBtnOfGitLab.isVisible()).to.eql(true)
  })

  //TC_1300
  it('should verify whether repo resources icon are displayed in the dedicated sections', () => {
    //GitHub icon
    expect(
      KintoBlockCreate.getRepoResourceCardIcon(1, 'github').isVisible()
    ).to.eql(true)
    //Bitbucket icon
    expect(
      KintoBlockCreate.getRepoResourceCardIcon(2, 'bitbucket').isVisible()
    ).to.eql(true)
    //GitLab
    expect(
      KintoBlockCreate.getRepoResourceCardIcon(3, 'gitlab').isVisible()
    ).to.eql(true)
  })

  //TC_1301
  it('should verify buttons for linking to repo resources displays text as "Link"', () => {
    //GitHub
    expect(
      KintoBlockCreate.getRepoResourcesLinkBtnInLinkRepoPopUp(1).getText()
    ).to.eql('Link')
    //Bitbucket
    expect(
      KintoBlockCreate.getRepoResourcesLinkBtnInLinkRepoPopUp(2).getText()
    ).to.eql('Link')
  })

  //TC_1304
  it('should verify whether text "Please link at least one repo source:" is displayed in the link repo resources pop up', () => {
    //Exclamation icon
    expect(KintoBlockCreate.linkRepoInfromationIcon.isVisible()).to.eql(true)
    //Text
    expect(KintoBlockCreate.linkRepoInfromationText.getText()).to.eql(
      'Please link at least one repo source:'
    )
  })

  //TC_1302
  it('should navigate user to overview page, when user clicks on "cancel" button in "Link repo" pop up', () => {
    KintoBlockCreate.cancelBtnInLinkRepoPopUp.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  //TC_1303
  it('should verify whether "link" button for any repo card is turned to green button "Linked", when user links to repo resource', () => {
    //Linking GitHub
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    DashboardIndex.loadingFinished.waitForExist()
    KintoBlockCreate.linkRepoPopUp.waitForVisible()
    KintoBlockCreate.getRepoResourcesLinkBtnInLinkRepoPopUp(1).leftClick()
    browser.pause(3000)
    WorkspaceManage.gitHubAuthorize()
    browser.pause(3000) //Static wait as the page goes blank
    // var url = browser.getUrl()
    // browser.pause(1000)
    // var frontEndURL = WorkspaceManage.TEST_ENV
    // url = url.replace('https://staging.kintohub.com', `${frontEndURL}`)
    // browser.url(url)
    // browser.pause(5000)
    WorkspaceManage.loadingFinished.waitForExist()
    //Added wait as page goes blank while connencting
    browser.pause(10000)
    KintoBlockCreate.getSuccessBtnInLinkRepoPopUp(1).waitForVisible()
    expect(KintoBlockCreate.getSuccessBtnInLinkRepoPopUp(1).isVisible()).to.eql(
      true
    )
  })

  //TC_1305
  it('should verify that "I`M Done" button is displayed in "link repo" pop up, when anyone of the repo resources is been linked', () => {
    //Already connected to GitHub repo resource
    expect(KintoBlockCreate.iAmDoneBtnInRepoResourcesPopUp.isVisible()).to.eql(
      true
    )
  })

  //TC_1306
  it('should verify whether user is navigated to KB select flavour page, when user clicks on "I`M Done" button in "link repo" pop up', () => {
    KintoBlockCreate.iAmDoneBtnInRepoResourcesPopUp.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectFlavourTitle.waitForVisible()
    expect(KintoBlockCreate.selectFlavourTitle.getText()).to.eql(
      'Please select a KintoBlock flavour:'
    )
  })

  //TC_1307
  it('should verify whether linked organisation first in the list of organisation drop down of KB microservice type is selected by default - 1', () => {
    //GitHub linked
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('GittestCC').waitForVisible()
    firstOption = KintoBlockCreate.getOrganisationOptions('GittestCC').getText()
    expect(KintoBlockCreate.orgNameFromOrgField.getText()).to.eql(firstOption)
  })

  //TC_1307
  it('should verify whether linked organisation first in the list of organisation drop down of KB microservice type is selected by default - 2', () => {
    //Bitbucket linked
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceCreate.open(ws)
    browser.alertAccept()
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
    WorkspaceManage.linkBitbucket()
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    DashboardIndex.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    KintoBlockCreate.getOrganisationOptions('bittestcc').waitForVisible()
    firstOption = KintoBlockCreate.getOrganisationOptions('bittestcc').getText()
    expect(KintoBlockCreate.orgNameFromOrgField.getText()).to.eql(firstOption)
  })

  //TC_1308
  it('should verify whether "Repository resources" not linked is displayed in the "organisation" drop down of KB microservice type, when user selects repo type as "create new repo"', () => {
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    browser.alertAccept()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    DashboardIndex.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    //For now only github is connected
    KintoBlockCreate.getOrganisationOptions('Bitbucket').waitForVisible()
    expect(
      KintoBlockCreate.getOrganisationOptions('Bitbucket').isVisible()
    ).to.eql(true)
    expect(
      KintoBlockCreate.getOrganisationOptions('GitLab').isVisible()
    ).to.eql(true)
  })

  //TC_1309
  it('should verify whether "Repository resources" not linked is displays text "not linked" in the "organisation" drop down of KB microservice type, when user selects repo type as "create new repo"', () => {
    var organisationStatus = KintoBlockCreate.getOrganisationOptions(
      'Bitbucket'
    )
      .getText()
      .split('\n')
    expect(organisationStatus[1]).to.eql('NOT LINKED')
    organisationStatus = KintoBlockCreate.getOrganisationOptions('GitLab')
      .getText()
      .split('\n')
    expect(organisationStatus[1]).to.eql('COMING SOON')
  })

  //TC_1310
  it('should trigger "link repo resources" pop up, when user clicks on unlinked repo resources in the organisation drop down of KB microservice type while user selects repo type as "create new repo"', () => {
    browser.keys('Down arrow')
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.linkRepoPopUp.waitForVisible()
    expect(KintoBlockCreate.linkRepoPopUp.isVisible()).to.eql(true)
  })

  //TC_1311
  it('should verify whether linked organisation first in the list of organisation drop down of KB microservice type is selected by default and repository type as "existing repo" - 1', () => {
    KintoBlockCreate.iAmDoneBtnInRepoResourcesPopUp.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    //GitHub linked
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    KintoBlockCreate.getRepositoryResourceOptions('GitHub').waitForVisible()
    var splitText = KintoBlockCreate.getRepositoryResourceOptions('GitHub')
      .getText()
      .split('\n')
    firstOption = splitText[0]
    expect(KintoBlockCreate.selectedRepoResource.getText()).to.eql(firstOption)
  })

  //TC_1311
  it('should verify whether linked organisation first in the list of organisation drop down of KB microservice type is selected by default and repository type as "existing repo" - 2', () => {
    //Bitbucket linked
    DashboardIndex.workspaceDropdown.selectByIndex(2)
    browser.alertAccept()
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    DashboardIndex.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    KintoBlockCreate.getRepositoryResourceOptions('Bitbucket').waitForVisible()
    var splitText = KintoBlockCreate.getRepositoryResourceOptions('Bitbucket')
      .getText()
      .split('\n')
    firstOption = splitText[0]
    expect(KintoBlockCreate.selectedRepoResource.getText()).to.eql(firstOption)
  })

  //TC_1312
  it('should verify whether "Repository resources" not linked is displayed in the "organisation" drop down of KB microservice type, when user selects repo type as "existing repo"', () => {
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    browser.alertAccept()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    DashboardIndex.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    //For now only github is connected
    KintoBlockCreate.getOrganisationOptions('Bitbucket').waitForVisible()
    expect(
      KintoBlockCreate.getOrganisationOptions('Bitbucket').isVisible()
    ).to.eql(true)
    expect(
      KintoBlockCreate.getOrganisationOptions('GitLab').isVisible()
    ).to.eql(true)
  })

  //TC_1313
  it('should verify whether "Repository resources" not linked is displays text "not linked" in the "organisation" drop down of KB microservice type, when user selects repo type as "existing repo"', () => {
    var organisationStatus = KintoBlockCreate.getOrganisationOptions(
      'Bitbucket'
    )
      .getText()
      .split('\n')
    expect(organisationStatus[1]).to.eql('NOT LINKED')
    organisationStatus = KintoBlockCreate.getOrganisationOptions('GitLab')
      .getText()
      .split('\n')
    expect(organisationStatus[1]).to.eql('COMING SOON')
  })

  //TC_1314
  it('should trigger "link repo resources" pop up, when user clicks on unlinked repo resources in the organisation drop down of KB microservice type while user selects repo type as "existing repo"', () => {
    browser.keys('Down arrow')
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.linkRepoPopUp.waitForVisible()
    expect(KintoBlockCreate.linkRepoPopUp.isVisible()).to.eql(true)
  })

  //TC_1316
  it('should verify whether linked organisation first in the list of organisation drop down of KB website type is selected by default - 1', () => {
    KintoBlockCreate.iAmDoneBtnInRepoResourcesPopUp.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    browser.alertAccept()
    DashboardIndex.loadingFinished.waitForExist()
    //GitHub linked
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('GittestCC').waitForVisible()
    firstOption = KintoBlockCreate.getOrganisationOptions('GittestCC').getText()
    expect(KintoBlockCreate.orgNameFromOrgField.getText()).to.eql(firstOption)
  })

  //TC_1316
  it('should verify whether linked organisation first in the list of organisation drop down of KB website type is selected by default - 2', () => {
    //Bitbucket
    DashboardIndex.workspaceDropdown.selectByIndex(2)
    browser.alertAccept()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    DashboardIndex.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    KintoBlockCreate.getOrganisationOptions('bittestcc').waitForVisible()
    firstOption = KintoBlockCreate.getOrganisationOptions('bittestcc').getText()
    expect(KintoBlockCreate.orgNameFromOrgField.getText()).to.eql(firstOption)
  })

  //TC_1317
  it('should verify whether "Repository resources" not linked is displayed in the "organisation" drop down of KB website type, when user selects repo type as "create new repo"', () => {
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    browser.alertAccept()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    DashboardIndex.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    //For now only github is connected
    KintoBlockCreate.getOrganisationOptions('Bitbucket').waitForVisible()
    expect(
      KintoBlockCreate.getOrganisationOptions('Bitbucket').isVisible()
    ).to.eql(true)
    expect(
      KintoBlockCreate.getOrganisationOptions('GitLab').isVisible()
    ).to.eql(true)
  })

  //TC_1318
  it('should verify whether "Repository resources" not linked is displays text "not linked" in the "organisation" drop down of KB website type, when user selects repo type as "create new repo"', () => {
    var organisationStatus = KintoBlockCreate.getOrganisationOptions(
      'Bitbucket'
    )
      .getText()
      .split('\n')
    expect(organisationStatus[1]).to.eql('NOT LINKED')
    organisationStatus = KintoBlockCreate.getOrganisationOptions('GitLab')
      .getText()
      .split('\n')
    expect(organisationStatus[1]).to.eql('COMING SOON')
  })

  //TC_1319
  it('should trigger "link repo resources" pop up, when user clicks on unlinked repo resources in the organisation drop down of KB website type while user selects repo type as "create new repo"', () => {
    browser.keys('Down arrow')
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.linkRepoPopUp.waitForVisible()
    expect(KintoBlockCreate.linkRepoPopUp.isVisible()).to.eql(true)
  })

  //TC_1320
  it('should verify whether organisation first in the list of organisation drop down of KB website type is selected by default and repository type as "existing repo" - 1', () => {
    KintoBlockCreate.iAmDoneBtnInRepoResourcesPopUp.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    //GitHub linked
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    KintoBlockCreate.getRepositoryResourceOptions('GitHub').waitForVisible()
    var splitText = KintoBlockCreate.getRepositoryResourceOptions('GitHub')
      .getText()
      .split('\n')
    firstOption = splitText[0]
    expect(KintoBlockCreate.selectedRepoResource.getText()).to.eql(firstOption)
  })

  //TC_1320
  it('should verify whether organisation first in the list of organisation drop down of KB website type is selected by default and repository type as "existing repo" - 2', () => {
    DashboardIndex.workspaceDropdown.selectByIndex(2)
    browser.alertAccept()
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    DashboardIndex.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    KintoBlockCreate.getRepositoryResourceOptions('Bitbucket').waitForVisible()
    var splitText = KintoBlockCreate.getRepositoryResourceOptions('Bitbucket')
      .getText()
      .split('\n')
    firstOption = splitText[0]
    expect(KintoBlockCreate.selectedRepoResource.getText()).to.eql(firstOption)
  })

  //TC_1321
  it('should verify whether "Repository resources" not linked is displayed in the "organisation" drop down of KB website type, when user selects repo type as "existing repo"', () => {
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    browser.alertAccept()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    DashboardIndex.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    //For now only github is connected
    KintoBlockCreate.getOrganisationOptions('Bitbucket').waitForVisible()
    expect(
      KintoBlockCreate.getOrganisationOptions('Bitbucket').isVisible()
    ).to.eql(true)
    expect(
      KintoBlockCreate.getOrganisationOptions('GitLab').isVisible()
    ).to.eql(true)
  })

  //TC_1322
  it('should verify whether "Repository resources" not linked is displays text "not linked" in the "organisation" drop down of KB website type, when user selects repo type as "existing repo"', () => {
    var organisationStatus = KintoBlockCreate.getOrganisationOptions(
      'Bitbucket'
    )
      .getText()
      .split('\n')
    expect(organisationStatus[1]).to.eql('NOT LINKED')
    organisationStatus = KintoBlockCreate.getOrganisationOptions('GitLab')
      .getText()
      .split('\n')
    expect(organisationStatus[1]).to.eql('COMING SOON')
  })

  //TC_1323
  it('should trigger "link repo resources" pop up, when user clicks on unlinked repo resources in the organisation drop down of KB website type while user selects repo type as "existing repo"', () => {
    browser.keys('Down arrow')
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.linkRepoPopUp.waitForVisible()
    expect(KintoBlockCreate.linkRepoPopUp.isVisible()).to.eql(true)
  })
})

describe('KB - 10 - Microservice Manage & Create 0.4.0', () => {
  it('should login, link to github and create a KB', () => {
    KintoBlockCreate.iAmDoneBtnInRepoResourcesPopUp.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.logout()
    browser.alertAccept()
    browser.pause(3000)
    Login.registerAndLogin('MMC')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    var randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + 'mmc' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '76')
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
    KintoBlockCreate.organisationDropDown.click()
    KintoBlockCreate.getOrganisationOptions('GittestCC').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('GittestCC').click()
    KintoBlockCreate.loadingFinished.waitForExist()
    reponame = testData.kintoblock.validRepoName + '1' + randomName
    KintoBlockCreate.repository.input.setValue(reponame)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForVisible()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should verify whether "Advanced options" expands, when user click on "expand" icon in microservice manage page', () => {
    browser.scroll(0, 700)
    //Already collapsed
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Expand')
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    //Expanding
    browser.pause(2000)
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Collapse')
  })

  it('should verify whether "Advanced options" displays "Port", "Build command", "protocol", "run" command and "Doc format" in micoservice manage page', () => {
    KintoBlockManage.protocolFieldTitle.waitForVisible()
    expect(KintoBlockCreate.protocolFieldInAdvancedOptions.isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.portFieldInAdvancedOptions.isVisible()).to.eql(true)
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.runCommandInAdvancedOptions.isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.docFormat.isVisible()).to.eql(true)
  })

  it('should verify whether "Advanced options" collapses, when user click on "collapse" icon in microservice manage page', () => {
    //Already expanded
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Collapse')
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    //Collapsing
    browser.pause(2000)
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Expand')
  })

  it('should display "Doc form" drop down options "Api Doc", "none" and "Swagger in microsrvice manage page', () => {
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    browser.pause(2000)
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    expect(KintoBlockManage.getDocFormatOptions('ApiDoc').isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getDocFormatOptions('None').isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getDocFormatOptions('Swagger').isVisible()).to.eql(
      true
    )
  })

  it.skip('should expand and collapse "Basic info component" in microservice manage page', () => {
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    //By default it will be collapsed
    expect(KintoBlockManage.basicInfoExpandAndCollapseText.getText()).to.eql(
      'Expand'
    )
    KintoBlockManage.basicInfoEditIcon.click()
    //Expanding
    KintoBlockManage.basicInfoExpandAndCollapseText.waitForVisible()
    browser.pause(2000)
    expect(KintoBlockManage.basicInfoExpandAndCollapseText.getText()).to.eql(
      'Collapse'
    )
    //Collapsing
    KintoBlockManage.basicInfoEditIcon.click()
    browser.pause(2000)
    expect(KintoBlockManage.basicInfoExpandAndCollapseText.getText()).to.eql(
      'Expand'
    )
  })

  it('should verify user can edit "Build command", "Run" command and "port" fields in "Advanced options" in microservice manage page', () => {
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 700)
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    browser.pause(2000)
    //Build command before editing
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'npm install'
    )
    KintoBlockCreate.buildCommandInAdvancedOptions.setValue(
      'Edited build command'
    )
    browser.pause(2000)
    //Build command after editing
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'Edited build command'
    )
    //Run command before editing
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'npm run prod'
    )
    KintoBlockCreate.runCommandInAdvancedOptions.setValue('Edited run command')
    browser.pause(2000)
    //Run command after editing
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'Edited run command'
    )
    //Port before editing
    expect(KintoBlockCreate.portFieldInAdvancedOptions.getValue()).to.eql('80')
    KintoBlockCreate.portFieldInAdvancedOptions.setValue('5000')
    browser.pause(2000)
    //Port after editing
    expect(KintoBlockCreate.portFieldInAdvancedOptions.getValue()).to.eql(
      '5000'
    )
  })

  it('should display validation error in microservice create page, when user try to create a KB using duplicate repository name', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + '83' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '29')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions('11.7.0').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions('11.7.0').click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql('11.7.0')
    KintoBlockCreate.repository.input.setValue(reponame)
    browser.keys('Tab')
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.duplicateRepoError.waitForVisible()
    expect(KintoBlockManage.duplicateRepoError.getText()).to.eql(
      `There is already a repository named '${reponame}' for the current account.`
    )
  })

  it('should verify whether "Advanced options" drop down displays "protocol", "build command", "run command" and "doc format" fields', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(KintoBlockCreate.protocolFieldInAdvancedOptions.isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.portFieldInAdvancedOptions.isVisible()).to.eql(true)
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.runCommandInAdvancedOptions.isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.docFormat.isVisible()).to.eql(true)
  })

  it('should verify whether "Advanced options" collapses, when user click on "collapse" icon in microservice create page', () => {
    //Already expanded
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Collapse')
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    //Collapsing
    browser.pause(2000)
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Expand')
  })

  it('should verify whether "Advanced options" expands, when user click on "expand" icon in microservice create page', () => {
    //Already collapsed
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Expand')
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    //Expanding
    browser.pause(2000)
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Collapse')
  })

  it('should verify "Doc format" drop down displays "ApiDoc", "None" and "Swagger" as options', () => {
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    expect(KintoBlockManage.getDocFormatOptions('ApiDoc').isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getDocFormatOptions('None').isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getDocFormatOptions('Swagger').isVisible()).to.eql(
      true
    )
  })

  it('should verify whether relevant commands are updated for language "Node JS" in "Build command" and "run" fields', () => {
    browser.scroll(0, -2000)
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
    browser.scroll(0, 1000)
    //Build command
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'npm install'
    )
    //Build run command
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'npm run prod'
    )
  })

  it('should verify whether relevant commands are updated for language "Java" in "Build command" and "run" fields', () => {
    browser.scroll(0, -2000)
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.Java
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.Java).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.Java
    )
    browser.scroll(0, 1000)
    //Build command
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'mvn clean compile assembly:single'
    )
    //Build run command
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'java -jar ./target/start-jar-with-dependencies.jar'
    )
  })

  it('should verify whether relevant commands are updated for language "Python" in "Build command" and "run" fields', () => {
    browser.scroll(0, -2000)
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.Python
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.Python).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.Python
    )
    browser.scroll(0, 1000)
    //Build command
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'pip install -r requirements.txt'
    )
    //Build run command
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'flask run --port 80 --host 0.0.0.0'
    )
  })

  it.skip('should verify whether relevant commands are updated for language "PHP" in "Build command" and "run" fields', () => {
    browser.scroll(0, -2000)
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('PHP (7.2.5)').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('PHP (7.2.5)').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('PHP (7.2.5)')
    browser.scroll(0, 1000)
    //Build command
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'composer install --no-interaction'
    )
    //Build run command
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'php -S 0.0.0.0:80'
    )
  })

  it('should verify whether relevant commands are updated for language "Ruby" in "Build command" and "run" fields', () => {
    browser.scroll(0, -2000)
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.Ruby
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.Ruby).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.Ruby
    )
    browser.scroll(0, 1000)
    //Build command
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'bundle install && bundle package --all'
    )
    //Build run command
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'bundle exec ruby app.rb'
    )
  })

  it('should verify whether relevant commands are updated for language "GO" in "Build command" and "run" fields', () => {
    browser.scroll(0, -2000)
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.Go).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.Go).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.Go
    )
    browser.scroll(0, 1000)
    //Build command
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'go get -d -v ./... && go install -v ./...'
    )
    //Build run command
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'app'
    )
  })

  it('should verify whether relevant commands are updated for language "C# 2.1" in "Build command" and "run" fields', () => {
    browser.scroll(0, -2000)
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.Csharp
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.Csharp).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.Csharp
    )
    browser.scroll(0, 1000)
    //Build command
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'dotnet restore && dotnet publish -c Release -o ./'
    )
    //Build run command
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'dotnet sample/sample.dll'
    )
  })

  it('should verify whether relevant commands are updated for language "Elixir" in "Build command" and "run" fields', () => {
    browser.scroll(0, -2000)
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.Elixir
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.Elixir).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.Elixir
    )
    browser.scroll(0, 1000)
    //Build command
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'mix local.hex --force  && mix local.rebar --force && mix deps.get && mix compile'
    )
    //Build run command
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'mix run --no-halt'
    )
  })

  it('should verify "Port" field displays port number as "80" by default', () => {
    expect(KintoBlockCreate.portFieldInAdvancedOptions.getValue()).to.eql('80')
  })

  it('should verify user can edit "Build command", "Run" command and "port" fields in "Advanced options" in microservice create page', () => {
    browser.scroll(0, -2000)
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
    browser.scroll(0, 1000)
    //Build command before editing
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'npm install'
    )
    KintoBlockCreate.buildCommandInAdvancedOptions.setValue(
      'Edited build command'
    )
    browser.pause(2000)
    //Build command after editing
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'Edited build command'
    )
    //Run command before editing
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'npm run prod'
    )
    KintoBlockCreate.runCommandInAdvancedOptions.setValue('Edited run command')
    browser.pause(2000)
    //Run command after editing
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'Edited run command'
    )
    //Port before editing
    expect(KintoBlockCreate.portFieldInAdvancedOptions.getValue()).to.eql('80')
    KintoBlockCreate.portFieldInAdvancedOptions.setValue('5000')
    browser.pause(2000)
    //Port after editing
    expect(KintoBlockCreate.portFieldInAdvancedOptions.getValue()).to.eql(
      '5000'
    )
  })

  it('should verify "View endpoint" button is displayed, if user selects "ApiDoc" option in "Doc format" field', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName =
      testData.kintoblock.validKintoBlockNameWithDigit + '201' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '73')
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
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.selectExistingRepository()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.viewEndpointsBtn.isVisible()).to.eql(true)
  })

  it('should display validation error in website create page, when user try to create a KB using duplicate repository name', () => {
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).waitForVisible()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKBNameEight + '909' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '45')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.WebsiteTypeDropDown.click()
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').click()
    browser.scroll(0, 2000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    browser.pause(2000)
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.repository.input.setValue(reponame)
    KintoBlockCreate.submitGlobal()
    KintoBlockList.loadingFinished.waitForExist()
    //Now there is validation displayed and bug is reported
    //To do validate error
  })

  it('should verify whether "Website type" field displays "static website" and "Dynamic web app" options', () => {
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.click()
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).waitForVisible()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 400)
    KintoBlockCreate.WebsiteTypeDropDown.click()
    KintoBlockCreate.getWebsiteTypeOptions('Static Website').waitForVisible()
    expect(
      KintoBlockCreate.getWebsiteTypeOptions('Static Website').isVisible()
    ).to.eql(true)
    expect(
      KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').isVisible()
    ).to.eql(true)
  })

  it('should verify whether "Advanced Options" is displayed when user selects website type as "dynamic web app"', () => {
    browser.pause(2000)
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').click()
    browser.pause(2000)
    KintoBlockCreate.advancedOptionsSection.waitForVisible()
    expect(KintoBlockCreate.advancedOptionsSection.isVisible()).to.eql(true)
  })

  it('should verify tool tip text is displayed, when user clicks on tool tip icon of "website type" section', () => {
    KintoBlockCreate.websiteTypeToolTipIcon.click()
    KintoBlockCreate.toolTipInnerText.waitForVisible()
    expect(KintoBlockCreate.toolTipInnerText.getText()).to.eql(
      'Static Website serves your files to the internet. A Web App gives you control on how you want to serve your web content from a custom node based service.'
    )
  })

  it('should verify "Required" error mesage is displayed for "website type" field, when user doesn`t select type', () => {
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.click()
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).waitForVisible()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.websiteTypeError.waitForVisible()
    expect(KintoBlockCreate.websiteTypeError.isVisible()).to.eql(true)
  })

  it('should verify whether "Advanced options" drop down displays "protocol", "build command" and "run command" fields in website create page', () => {
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.click()
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).waitForVisible()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 400)
    KintoBlockCreate.WebsiteTypeDropDown.click()
    KintoBlockCreate.getWebsiteTypeOptions('Static Website').waitForVisible()
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').click()
    KintoBlockCreate.portFieldInAdvancedOptions.waitForVisible()
    expect(KintoBlockCreate.portFieldInAdvancedOptions.isVisible()).to.eql(true)
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.runCommandInAdvancedOptions.isVisible()).to.eql(
      true
    )
  })

  it('should verify whether "Advanced options" collapses, when user click on "collapse" icon website create page', () => {
    browser.scroll(0, 500)
    //Already expanded
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Collapse')
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    //Collapsing
    browser.pause(2000)
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Expand')
  })

  it('should verify whether "Advanced options" expands, when user click on "expand" icon in website create page', () => {
    //Already collapsed
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Expand')
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    //Expanding
    browser.pause(2000)
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Collapse')
  })

  it('should verify user can edit "Build command", "Run" command and "port" fields in "Advanced options" of website create page', () => {
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.click()
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).waitForVisible()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 400)
    KintoBlockCreate.WebsiteTypeDropDown.click()
    KintoBlockCreate.getWebsiteTypeOptions('Static Website').waitForVisible()
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').click()
    KintoBlockCreate.portFieldInAdvancedOptions.waitForVisible()
    //Build command before editing
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'npm install'
    )
    KintoBlockCreate.buildCommandInAdvancedOptions.setValue(
      'Edited build command'
    )
    browser.pause(2000)
    //Build command after editing
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'Edited build command'
    )
    //Run command before editing
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'npm start'
    )
    KintoBlockCreate.runCommandInAdvancedOptions.setValue('Edited run command')
    browser.pause(2000)
    //Run command after editing
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'Edited run command'
    )
    //Port before editing
    expect(KintoBlockCreate.portFieldInAdvancedOptions.getValue()).to.eql('80')
    KintoBlockCreate.portFieldInAdvancedOptions.setValue('5000')
    browser.pause(2000)
    //Port after editing
    expect(KintoBlockCreate.portFieldInAdvancedOptions.getValue()).to.eql(
      '5000'
    )
  })

  it.skip('should verify whether user can create a website type with new repository for "Dynamic web app"', () => {
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.click()
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).waitForVisible()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKBNameEight + '909' + randomName
    )
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.WebsiteTypeDropDown.click()
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').waitForVisible()
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').click()
    browser.scroll(0, 2000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    this.getOrganisationOptions('Bitbucket').waitForVisible()
    browser.pause(2000)
    this.getOrganisationOptions('Bitbucket').click()
    KintoBlockCreate.loadingFinished.waitForExist()
    reponame = testData.kintoblock.validRepoNameWithChar + '75' + randomName
    KintoBlockCreate.repository.input.setValue(reponame)
    KintoBlockCreate.submitGlobal()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.websiteTypeIcon.isVisible()).to.eql(true)
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
  })

  it.skip('should display website type in "Basic info" of manage page as per type selected during KB creation', () => {
    //"Dynamic website type is selected"
    KintoBlockManage.basicInfoEditIcon.click()
    browser.pause(2000)
    KintoBlockManage.websiteTypeField.waitForVisible()
    expect(KintoBlockManage.websiteTypeField.getText('option:checked')).to.eql(
      'Dynamic Web App'
    )
  })

  it('should update "Build" and "run" commands with relevant commands, when user selects "Dynamic" type in website create page', () => {
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.click()
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(2).waitForVisible()
    KintoBlockCreate.selectKBFlavour(2).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKBNameEight + '909' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '11')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.WebsiteTypeDropDown.click()
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').waitForVisible()
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').click()
    //Build command
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'npm install'
    )
    //Run command
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'npm start'
    )
    //Port
    expect(KintoBlockCreate.portFieldInAdvancedOptions.getValue()).to.eql('80')
  })

  it('should verify whether user can create a website type with existing repository for "Dynamic web app"', () => {
    browser.scroll(0, 2000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(
      testData.kintoblock.validDynamicWebAppRepo
    )
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validDynamicWebAppRepo
    ).waitForVisible()
    browser.keys('Tab')
    browser.pause(3000)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should display "Advanced options" in website manage page', () => {
    browser.scroll(0, 700)
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    browser.pause(2000)
    expect(KintoBlockCreate.portFieldInAdvancedOptions.isVisible()).to.eql(true)
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.runCommandInAdvancedOptions.isVisible()).to.eql(
      true
    )
  })

  it.skip('should expand and collapse "Basic info component" in website manage page', () => {
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    //By default it will be collapsed
    expect(KintoBlockManage.basicInfoExpandAndCollapseText.getText()).to.eql(
      'Expand'
    )
    KintoBlockManage.basicInfoEditIcon.click()
    //Expanding
    KintoBlockManage.basicInfoExpandAndCollapseText.waitForVisible()
    browser.pause(2000)
    expect(KintoBlockManage.basicInfoExpandAndCollapseText.getText()).to.eql(
      'Collapse'
    )
    //Collapsing
    KintoBlockManage.basicInfoEditIcon.click()
    browser.pause(2000)
    expect(KintoBlockManage.basicInfoExpandAndCollapseText.getText()).to.eql(
      'Expand'
    )
  })

  it('should verify whether website type field is displayed in website basic info component', () => {
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.basicInfoEditIcon.click()
    browser.pause(2000)
    expect(KintoBlockManage.websiteTypeField.isVisible()).to.eql(true)
  })

  it('should verify whether website type field is disabled in website basic info component', () => {
    expect(KintoBlockManage.websiteTypeField.isEnabled()).to.eql(false)
  })

  it('should verify whether "Advanced options" expands, when user click on "expand" icon in website manage page', () => {
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 700)
    //Already Collapsed
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Expand')
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    //Expanding
    browser.pause(2000)
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Collapse')
  })

  it('should verify "port" field displays port 80 as default port in website manage page', () => {
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 700)
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    browser.pause(2000)
    expect(KintoBlockCreate.portFieldInAdvancedOptions.getValue()).to.eql('80')
  })

  it('should verify user can edit "Build command", "Run" command and "port" fields in "Advanced options" in website manage page', () => {
    //Build command before editing
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'npm install'
    )
    KintoBlockCreate.buildCommandInAdvancedOptions.setValue(
      'Edited build command'
    )
    browser.pause(2000)
    //Build command after editing
    expect(KintoBlockCreate.buildCommandInAdvancedOptions.getValue()).to.eql(
      'Edited build command'
    )
    //Run command before editing
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'npm start'
    )
    KintoBlockCreate.runCommandInAdvancedOptions.setValue('Edited run command')
    browser.pause(2000)
    //Run command after editing
    expect(KintoBlockCreate.runCommandInAdvancedOptions.getValue()).to.eql(
      'Edited run command'
    )
    //Port before editing
    expect(KintoBlockCreate.portFieldInAdvancedOptions.getValue()).to.eql('80')
    KintoBlockCreate.portFieldInAdvancedOptions.setValue('8080')
    browser.pause(2000)
    //Port after editing
    expect(KintoBlockCreate.portFieldInAdvancedOptions.getValue()).to.eql(
      '8080'
    )
  })

  it('should verify whether "Advanced options" collapses, when user click on "collapse" icon in website manage page', () => {
    browser.refresh()
    browser.alertAccept()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 700)
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    browser.pause(2000)
    //Already collapsed
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Collapse')
    KintoBlockCreate.advancedOptionsExpandIcon.click()
    //Expanding
    browser.pause(2000)
    expect(
      KintoBlockCreate.advancedOptionsCollapseAndExpandText.getText()
    ).to.eql('Expand')
  })

  it('should create new workspace and link to github', () => {
    DashboardIndex.workspaceDropdown.selectByValue(0)
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.name.input.setValue(
      testData.workspace.validWorkSpaceName + '1' + currentDate.getTime()
    )
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForVisible()
    WorkspaceCreate.workspaceCongratsBtn.click()
    WorkspaceCreate.warningBtn.waitForVisible()
    WorkspaceCreate.warningBtn.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.linkGithubSecondTime()
  })

  it('should verify relevent "Build" and "Run" commands are updated for "Nodejs" KB', () => {
    Landing.workspaceSelect.waitForVisible()
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.NodeJsRepo
    )
    KintoBlockCreate.validateBuildAndRunCommands(
      0,
      'npm install',
      'npm run prod'
    )
  })

  it('should verify relevent "Build" and "Run" commands are updated for  "python" KB', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.PythonRepo
    )
    KintoBlockCreate.validateBuildAndRunCommands(
      1,
      'pip install -r requirements.txt',
      'flask run --port 80 --host 0.0.0.0'
    )
  })

  it('should verify relevent "Build" and "Run" commands are updated for "ruby" KB', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.RubyRepo
    )
    KintoBlockCreate.validateBuildAndRunCommands(
      2,
      'bundle install && bundle package --all',
      'bundle exec ruby app.rb'
    )
  })

  it('should verify relevent "Build" and "Run" commands are updated for "Go" KB', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Go,
      testData.kbversion.Go1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.GoRepo
    )
    KintoBlockCreate.validateBuildAndRunCommands(
      3,
      'go get -d -v ./... && go install -v ./...',
      'app'
    )
  })

  it.skip('should verify relevent "Build" and "Run" commands are updated for "php" KB', () => {
    KintoBlockCreate.validateBuildAndRunCommands(
      'PHP (7.2.5)',
      'php',
      '85',
      'composer install --no-interaction',
      'php -S 0.0.0.0:80'
    )
  })

  it('should verify relevent "Build" and "Run" commands are updated for "CSharp" KB', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Csharp,
      testData.kbversion.Csharpnet1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.CsharpRepo
    )
    KintoBlockCreate.validateBuildAndRunCommands(
      4,
      'dotnet restore && dotnet publish -c Release -o ./',
      'dotnet sample/sample.dll'
    )
  })

  it('should verify relevent "Build" and "Run" commands are updated for "java" KB', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.JavaRepo
    )
    KintoBlockCreate.validateBuildAndRunCommands(
      5,
      'mvn clean compile assembly:single',
      'java -jar ./target/start-jar-with-dependencies.jar'
    )
  })

  it('should verify relevent "Build" and "Run" commands are updated for "Elixir" KB', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.ElixirRepo
    )
    KintoBlockCreate.validateBuildAndRunCommands(
      6,
      'mix local.hex --force  && mix local.rebar --force && mix deps.get && mix compile',
      'mix run --no-halt'
    )
  })
})

describe('KB - 11 - Manage page EnhanceMents', () => {
  //TC_1325
  it('should verify workspace name is displayed next to "members toggle bar" in KB manage page', () => {
    KintoBlockCreate.logout()
    Login.registerAndLogin('KBE')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    var randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + '095' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '01')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    KintoBlockCreate.selectExistingRepository()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForVisible()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    MembersBar.toggleMessage.waitForVisible()
    var collabText = MembersBar.toggleMessage.getText().split('\n')
    var editText = collabText[0]
    expect(editText).to.eql('Personal Workspace')
  })

  it('should verify whether latest build is not updated, when KB build is in "Running" status', () => {
    KintoBlockManage.buildStatusText.waitForVisible()
    expect(KintoBlockManage.buildStatusText.getText()).to.eql('RUNNING')
    expect(KintoBlockManage.noCommit.getText()).to.eql(
      'No build was built successfully yet.'
    )
  })

  it('should not display "Tag this commit" pop up, when build is in "RUNNING" status', () => {
    browser.scroll(0, 400)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    expect(KintoBlockManage.tagLatestCommitPopUp.isVisible()).to.eql(false)
  })

  it.skip('should verify whether "elapsed time" is lesser than "estimated time" for KB build', () => {
    //default estimated time is 5:00
    expect(KintoBlockManage.buildStatusText.getText()).to.eql('RUNNING')
    browser.waitUntil(
      function() {
        browser.pause(10000)
        KintoBlockManage.refreshCommitBtn.click()
        KintoBlockManage.loadingFinished.waitForExist()
        return KintoBlockManage.buildStatusText.getText() === 'RUNNING'
      },
      10000,
      'expected text to be different '
    )
    var estimatedTime = KintoBlockManage.getEstimatedTimeOfBuild(1)
      .getText()
      .split(' ')
    var elapsedTime = KintoBlockManage.getElapsedTimeOfBuild(1)
      .getText()
      .split(' ')
    var elapsedMinutes = estimatedTime[0]
    var estimatedMinutes = elapsedTime[0]
    expect(elapsedMinutes < estimatedMinutes).to.eql(true)
  })

  it('should wait for the KintoBlock moved to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock moved to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether KintoBlock build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it.skip('should verify whether duplicate recent commits are not displayed in commits component of KB manage page', () => {
    expect(KintoBlockManage.getBuildTextInRecentCommits(2).isVisible()).to.eql(
      false
    )
  })

  //TC_1346
  it('should navigate user to repository page of following repo resources, when user clicks on "open repo" button in KB manage page of example block', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 600)
    KintoBlockManage.openRepoBtn.waitForVisible()
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[8]) //8
    browser.pause(2000)
    var exampleKBText = KintoBlockManage.textFromExampleBlocks.getText()
    browser.switchTab(tabIds[0])
    browser.pause(2000)
    var repositoryName = KintoBlockManage.repoName.getValue()
    expect(repositoryName).to.eql(exampleKBText)
  })

  it('should display "Retry" button when KB build status is "Running"', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.buildStatusText.waitForVisible()
    KintoBlockManage.buildStatusText.scroll(0, 500)
    expect(KintoBlockManage.buildStatusText.getText()).to.eql('SUCCESS')
    expect(KintoBlockManage.getRetryBtnForBuilds(1).isVisible()).to.eql(true)
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName =
      testData.kintoblock.validKintoBlockNameWithDigit + '26' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '84')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    KintoBlockCreate.selectExistingRepository()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 400)
    browser.waitUntil(
      function() {
        browser.pause(20000)
        KintoBlockManage.refreshCommitBtn.click()
        KintoBlockManage.loadingFinished.waitForExist()
        return KintoBlockManage.buildStatusText.getText() === 'RUNNING'
      },
      10000,
      'expected text to be different '
    )
    expect(KintoBlockManage.buildStatusText.getText()).to.eql('RUNNING')
    expect(KintoBlockManage.getRetryBtnForBuilds(1).isVisible()).to.eql(true)
  })

  it('should create a KB for checking retry button in failed build', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName =
      testData.kintoblock.validKintoBlockNameWithDigit + '26' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '233')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(testData.kintoblock.failedRepo)
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.failedRepo
    ).waitForVisible()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.failedRepo
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

  it('should wait for build to reach failure status', () => {
    browser.pause(100000)
  })

  it('should display "Retry" button when KB build status is "Failed"', () => {
    browser.scroll(0, 400)
    browser.waitUntil(
      function() {
        browser.pause(5000)
        KintoBlockManage.refreshCommitBtn.click()
        KintoBlockManage.loadingFinished.waitForExist()
        return KintoBlockManage.buildStatusText.getText() === 'FAILED'
      },
      60000,
      'expected text to be different '
    )
    expect(KintoBlockManage.buildStatusText.getText()).to.eql('FAILED')
    expect(KintoBlockManage.getRetryBtnForBuilds(1).isVisible()).to.eql(true)
  })

  it('should display elapsed and estimated time sections for processing builds', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName =
      testData.kintoblock.validKintoBlockNameWithDigit + '26' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '90e')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    KintoBlockCreate.selectExistingRepository()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.pause(15000)
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    KintoBlockManage.refreshCommitBtn.scroll(0, 400)
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.getElapsedTimeOfBuild(1).waitForVisible()
    //Elapsed time
    expect(KintoBlockManage.getElapsedTimeOfBuild(1).isVisible()).to.eql(true)
  })

  it.skip('should display estimated time as 3:52 for KB builds', () => {
    var time = KintoBlockManage.getEstimatedTimeOfBuild(1)
      .getText()
      .split(' ')
    expect(time[1]).to.eql('3:52')
  })

  it.skip('should display "Retry" button for the all build rows in the recent commits', () => {
    //For there is only one build row
    expect(KintoBlockManage.getRetryBtnForBuilds(1).isVisible()).to.eql(true)
    //Generating second build by clicking retry
    KintoBlockManage.getRetryBtnForBuilds(1).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.getRetryBtnForBuilds(2).waitForVisible()
    expect(KintoBlockManage.getRetryBtnForBuilds(2).isVisible()).to.eql(true)
  })

  it('should display new branch created for the repository in "Branch/Tag switcher" drop down of KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + '008' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + 's2')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    browser.keys('Tab')
    browser.keys('Down arrow')
    browser.pause(2000)
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    reponame = testData.kintoblock.validRepoNameWithChar + '190' + randomName
    KintoBlockCreate.repository.input.setValue(reponame)
    KintoBlockCreate.prepopulateRepoSwitch.scroll(0, 2000)
    KintoBlockCreate.prepopulateRepoSwitch.waitForVisible()
    KintoBlockCreate.prepopulateRepoSwitch.click()
    KintoBlockCreate.prePopulatedIsOn.waitForExist()
    expect(KintoBlockCreate.prePopulatedIsOn.getValue()).to.eql('true')
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.openRepoBtn.scroll(0, 600)
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[9]) //9
    browser.pause(2000)
    KintoBlockManage.branchsDropDownInGitHub.waitForVisible()
    KintoBlockManage.branchsDropDownInGitHub.leftClick()
    KintoBlockManage.searchBranchInGitHub.waitForVisible()
    KintoBlockManage.searchBranchInGitHub.setValue('newBranch')
    browser.pause(5000)
    KintoBlockManage.githubBranchCreateBtn.click()
    browser.pause(5000)
    KintoBlockManage.branchsDropDownInGitHub.waitForVisible()
    KintoBlockManage.branchsDropDownInGitHub.click()
    KintoBlockManage.getBranchNameFromGitHubBranchList(2).waitForVisible()
    // var newBranch = KintoBlockManage.getBranchNameFromGitHubBranchList(
    //   1
    // ).getAttribute('data-name')
    browser.switchTab(tabIds[0])
    browser.pause(2000)
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).isVisible()
    ).to.eql(true)
    expect('newBranch').to.eql(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).getText()
    )
  })

  it('should create a KB using existing repository and verify whether new branch is displayed in "Branch/Tag" switcher drop down', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + '73' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '2w2')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(reponame)
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      reponame
    ).waitForVisible()
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).isVisible()
    ).to.eql(true)
    expect('newBranch').to.eql(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).getText()
    )
  })

  it('should not display deleted branch from GitHub repository in "Branch/Tag switcher" drop down of KB manage page', () => {
    KintoBlockManage.openRepoBtn.scroll(0, 600)
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[10]) //10
    browser.pause(5000)
    KintoBlockManage.branchsDropDownInGitHub.waitForVisible()
    KintoBlockManage.branchsDropDownInGitHub.leftClick()
    KintoBlockManage.getBranchNameFromGitHubBranchList(2).waitForVisible()
    KintoBlockManage.branchsDropDownInGitHub.leftClick()
    KintoBlockManage.branchesPageInGitHub.click()
    browser.pause(5000)
    KintoBlockManage.branchDeleteIconInGiHub.waitForVisible()
    KintoBlockManage.branchDeleteIconInGiHub.click()
    browser.pause(5000)
    browser.back()
    browser.refresh()
    KintoBlockManage.branchsDropDownInGitHub.waitForVisible()
    KintoBlockManage.branchsDropDownInGitHub.click()
    KintoBlockManage.getBranchNameFromGitHubBranchList(1).waitForVisible()
    browser.switchTab(tabIds[0])
    browser.pause(5000)
    browser.scroll(0, -2000)
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    expect('master').to.eql(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).getText()
    )
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).isVisible()
    ).to.eql(false)
  })

  it('should link with bitbucket and create a KB with new repository in Bitbucket', () => {
    WorkspaceManage.linkBitbucketSecondTime()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.microserviceTypeIcon.waitForVisible()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKBNameWithOddNumbers + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '9oe')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    KintoBlockCreate.getOrganisationOptions('bittestcc').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('bittestcc').click()
    reponame = testData.kintoblock.validRepoNameWithChar + randomName
    KintoBlockCreate.repository.input.setValue(reponame)
    KintoBlockCreate.prepopulateRepoSwitch.waitForVisible()
    KintoBlockCreate.prepopulateRepoSwitch.click()
    KintoBlockCreate.prePopulatedIsOn.waitForExist()
    expect(KintoBlockCreate.prePopulatedIsOn.getValue()).to.eql('true')
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should create a new branch in bitbucket repository and verify new repository created is reflected in KintoBlock', () => {
    KintoBlockManage.openRepoBtn.scroll(0, 500)
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[11]) //11
    browser.pause(10000)
    var url = browser.getUrl()
    url = url.replace('src/master/', 'branches')
    browser.url(url)
    browser.pause(5000)
    KintoBlockManage.createBranchBtnInBitbucket.waitForVisible()
    KintoBlockManage.createBranchBtnInBitbucket.click()
    browser.pause(5000)
    browser.keys('n')
    browser.keys('e')
    browser.keys('w')
    browser.keys('B')
    browser.keys('r')
    browser.keys('a')
    browser.keys('n')
    browser.keys('c')
    browser.keys('h')
    browser.pause(5000)
    KintoBlockManage.createBranchBtn.waitForVisible()
    KintoBlockManage.createBranchBtn.click()
    browser.pause(5000)
    KintoBlockManage.titleOfBranchPage.waitForVisible()
    var newBranch = KintoBlockManage.titleOfBranchPage.getText()
    expect(newBranch).to.eql('newBranch')
    browser.switchTab(tabIds[0])
    browser.pause(5000)
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).isVisible()
    ).to.eql(true)
    expect(newBranch).to.eql(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).getText()
    )
  })

  it('should create a KB with existing repository in Bitbucket', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.microserviceTypeIcon.waitForVisible()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockNameWithDigit + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName + '980')
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql('Node.js')
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
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(reponame)
    KintoBlockCreate.getExistingRepoList(
      testData.bitbucket.organisationName,
      reponame
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getExistingRepoList(
      testData.bitbucket.organisationName,
      reponame
    ).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should verify deleted branch in bitbucket is not displayed in "Branch/Tag" switcher dropd down', () => {
    KintoBlockManage.openRepoBtn.scroll(0, 500)
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[12]) //12
    browser.pause(10000)
    var url = browser.getUrl()
    url = url.replace('src/master/', 'branches')
    browser.url(url)
    browser.pause(5000)
    KintoBlockManage.branchSearchDropdown.waitForVisible()
    KintoBlockManage.branchSearchDropdown.click()
    browser.pause(10000)
    browser.keys('A')
    browser.keys('L')
    browser.keys('L')
    browser.keys('Enter')
    KintoBlockManage.getBranchOptions(2).waitForVisible()
    KintoBlockManage.getBranchOptions(2).click()
    browser.pause(5000)
    KintoBlockManage.deleteOptionForBranch.waitForVisible()
    KintoBlockManage.deleteOptionForBranch.click()
    browser.pause(5000)
    browser.keys('Enter')
    browser.pause(5000)
    KintoBlockManage.successMsgForBranchDeletion.waitForVisible()
    expect(KintoBlockManage.successMsgForBranchDeletion.isVisible()).to.eql(
      true
    )
    browser.switchTab(tabIds[0])
    browser.scroll(5000)
    browser.scroll(0, -2000)
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    expect('master').to.eql(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).getText()
    )
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).isVisible()
    ).to.eql(false)
  })
})

describe('KB - 12 - Environment parameters', () => {
  it('should verify whether Environment parameter section displayed via navigating to KB manage page', () => {
    KintoBlockManage.logout()
    Login.registerAndLogin('EP')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.NodeJsRepo
    )
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.envParametersComponent.isVisible()).to.eql(true)
  })

  it('should wait for the environment parameter KintoBlock build move to PROCESSING', () => {
    browser.pause(100000)
  })

  it('should wait for the environment parameter KintoBlock build move to PROCESSING', () => {
    browser.pause(100000)
  })

  it('should check whether environment parameter KintoBlock build is moved to success or failed', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should verify whether Environment parameter section displayed via navigating to KB manage page using `Edit Branch` option', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getkbListDropDown(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.getEditBranchOption(0).waitForVisible()
    KintoBlockList.getEditBranchOption(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.envParametersComponent.isVisible()).to.eql(true)
  })

  it('should verify whether Environment parameter section displayed via navigating to KB manage page posting URL of KB manage page', () => {
    var URL = browser.getUrl()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
    browser.url(URL)
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.envParametersComponent.isVisible()).to.eql(true)
  })

  it('should verify whether Environment parameter section displayed via navigating to KB manage page using `branch/tag` switcher in KB list page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.getBranchFromBranchList(0, 1).waitForVisible()
    KintoBlockList.getBranchFromBranchList(0, 1).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.envParametersComponent.isVisible()).to.eql(true)
  })

  it('should verify whether Environment parameter section displayed via navigating to KB manage page using `KB` switcher', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.kbListDropDown.leftClick()
    KintoBlockManage.dropdownIsShownShort.waitForVisible()
    KintoBlockManage.getKBNameFromDropDown(1).waitForVisible()
    KintoBlockManage.getKBNameFromDropDown(1).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.envParametersComponent.isVisible()).to.eql(true)
  })

  it('should verify whether Environment parameter section displayed via navigating to KB manage page using `branch/tag` switcher in KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).click()
    expect(KintoBlockManage.envParametersComponent.isVisible()).to.eql(true)
  })

  it('should verify Environment parameters displays `Variable` and `Values` field', () => {
    expect(KintoBlockManage.addEnvKey.isVisible()).to.eql(true)
    expect(KintoBlockManage.addEnvValue.isVisible()).to.eql(true)
  })

  it('should verify "This is required value" text is displayed for "Required" toggle switch', () => {
    expect(KintoBlockManage.envRequiredToggleText.getText()).to.eql(
      'This is a required value'
    )
  })

  it('should verify whether user can add a new environment parameter to a KB', () => {
    KintoBlockManage.addEnvKey.setValue(
      testData.kintoblock.validEnvKeyForApiCall
    )
    KintoBlockManage.addEnvValue.setValue(
      testData.kintoblock.validEnvValueForApiCall
    )
    KintoBlockManage.addIconOfEnvVariables.click()
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.getupdateEnvVarParam(0).getValue()).to.eql(
      testData.kintoblock.validEnvKeyForApiCall
    )
    expect(KintoBlockManage.getupdateEnvValueParam(0).getValue()).to.eql(
      testData.kintoblock.validEnvValueForApiCall
    )
  })

  it('should verify whether duplicate error message is displayed, when duplicate environment parameter is created', () => {
    KintoBlockManage.addEnvKey.setValue(
      testData.kintoblock.validEnvKeyForApiCall
    )
    KintoBlockManage.addEnvValue.setValue(
      testData.kintoblock.validEnvValueForApiCall
    )
    KintoBlockManage.addIconOfEnvVariables.click()
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.getenvParamErrorMessage(1).waitForVisible()
    expect(KintoBlockManage.getenvParamErrorMessage(1).getText()).to.eql(
      'Must be unique'
    )
  })

  it('should verify add icon for environment parameter is disabled by default', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.addIconOfEnvVariables.isEnabled()).to.eql(false)
  })

  it('should verify whether add icon of environment parameter is enabled, when variable is entered', () => {
    KintoBlockManage.addEnvKey.setValue(
      testData.kintoblock.validEnvKeyForApiCall
    )
    browser.pause(2000)
    expect(KintoBlockManage.addIconOfEnvVariables.isEnabled()).to.eql(true)
  })

  it('should verify whether "Required" toggle button is disabled by default', () => {
    expect(KintoBlockManage.getenvRequiredToggleState(0).getValue()).to.eql('')
  })

  it('should verify whether user can enable the required toggle', () => {
    KintoBlockManage.getenvRequiredToggleBtn(0).click()
    browser.pause(3000)
    expect(KintoBlockManage.getenvRequiredToggleState(0).getValue()).to.eql(
      'true'
    )
  })

  it('should verify whether user can disable the required toggle', () => {
    KintoBlockManage.getenvRequiredToggleBtn(0).click()
    browser.pause(3000)
    expect(KintoBlockManage.getenvRequiredToggleState(0).getValue()).to.eql(
      'false'
    )
  })

  it('should verify user can delete environment parameter', () => {
    KintoBlockManage.getenvParamDeleteOption(0).click()
    browser.pause(3000)
    expect(KintoBlockManage.getenvParamDeleteOption(0).isVisible()).to.eql(
      false
    )
  })

  it('should display validation error message, when environment variable key is less than 2 characters', () => {
    KintoBlockManage.addEnvKey.setValue('q')
    KintoBlockManage.addIconOfEnvVariables.click()
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.getenvParamErrorMessage(0).waitForVisible()
    expect(KintoBlockManage.getenvParamErrorMessage(0).getText()).to.eql(
      'Must not start with a digit, can only contain characters, digits and underscores, must be at least two characters'
    )
  })

  it('should verify whether validation error message is disappeared, when valid environment variable key is entered', () => {
    KintoBlockManage.getupdateEnvVarParam(0).setValue(
      testData.kintoblock.validEnvKeyForApiCall
    )
    KintoBlockManage.getupdateEnvValueParam(0).setValue(
      testData.kintoblock.validEnvValueForApiCall
    )
    expect(KintoBlockManage.getenvParamErrorMessage(0).isVisible()).to.eql(
      false
    )
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should display all environment parameters of selected dependency in a deployment', () => {
    KintoBlockManage.addEnvKey.setValue(
      testData.kintoblock.validEnvironmentKeyWithSpecialChars
    )
    KintoBlockManage.addEnvValue.setValue(
      testData.kintoblock.validEnvironmentValueWithCaps
    )
    KintoBlockManage.addIconOfEnvVariables.click()
    var KBName = KintoBlockManage.kbNameInBreacdcrumb.getText()
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.addToDeployment()
    KintoBlockManage.addToNewDeployment()
    DeploymentManage.loadingFinished.waitForExist()
    var editDep = DeploymentManage.editDepBtn.getAttribute('href')
    browser.url(editDep)
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.depSearchBarInEditDepPage.waitForVisible()
    DeploymentManage.depSearchBarInEditDepPage.setValue(KBName)
    DeploymentManage.getenvKeyParam(0, 0).waitForVisible()
    expect(DeploymentManage.getenvKeyParam(0, 0).getText()).to.eql(
      testData.kintoblock.validEnvKeyForApiCall
    )
    expect(DeploymentManage.getenvKeyParam(0, 1).getText()).to.eql(
      testData.kintoblock.validEnvironmentKeyWithSpecialChars
    )
  })
})

describe('KB - 13 - Custom Service Kintoblock', () => {
  it('should be navigated to KB create page when custom service flavour is selected', () => {
    KintoBlockManage.logout()
    Login.registerAndLogin('CS')
    WorkspaceManage.linkGithubSecondTime()
    WorkspaceManage.linkBitbucketSecondTime()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.customserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
  })

  it('should check whether user is able to see Breadcrumbs, edit icon, member bar etc in KB create page', () => {
    KintoBlockCreate.createNewKintoBlockFromBreadcrumb.waitForVisible()
    expect(
      KintoBlockCreate.createNewKintoBlockFromBreadcrumb.isVisible()
    ).to.eql(true)
    KintoBlockCreate.serviceTypeIcon.waitForVisible()
    expect(KintoBlockCreate.serviceTypeIcon.isVisible()).to.eql(true)
    KintoBlockCreate.penIconInPageTitle.waitForVisible()
    expect(KintoBlockCreate.penIconInPageTitle.isVisible()).to.eql(true)
    KintoBlockCreate.definition.waitForVisible()
    expect(KintoBlockCreate.definition.isVisible()).to.eql(true)
    KintoBlockCreate.membersToolBar.waitForVisible()
    expect(KintoBlockCreate.membersToolBar.isVisible()).to.eql(true)
    KintoBlockCreate.basicInfoComponent.waitForVisible()
    expect(KintoBlockCreate.basicInfoComponent.isVisible()).to.eql(true)
  })

  it('should check whether "learn more here" link is clicked and navigated to Docs page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.customserviceTypeOpen(ws)
    KintoBlockCreate.learnMoreHere.waitForVisible()
    KintoBlockCreate.learnMoreHere.click()
    var tabIds = browser.getTabIds()
    //Change to id according to the new scripts
    browser.switchTab(tabIds[1]) //??
    browser.pause(5000)
    browser.switchTab(tabIds[0])
  })

  it('should check when clicked on "?" symbol in KB Create page it navigates to docs page', () => {
    KintoBlockCreate.questionIcon.waitForVisible()
    KintoBlockCreate.questionIcon.click()
    var tabIds = browser.getTabIds()
    //Change to id according to the new scripts
    browser.switchTab(tabIds[2]) //??
    browser.pause(5000)
    browser.switchTab(tabIds[0])
  })

  it('should check for basic info title and subtitle', () => {
    expect(KintoBlockCreate.basicInfoComponentTitle.isVisible()).to.eql(true)
    expect(KintoBlockCreate.basicInfoComponentSubtitle.isVisible()).to.eql(true)
  })

  it('should check whether "name" and "description" field displays the placeholder text', () => {
    expect(KintoBlockCreate.name.input.getAttribute('placeholder')).to.eql(
      'Enter a name for your KintoBlock'
    )
    expect(
      KintoBlockCreate.shortDescription.input.getAttribute('placeholder')
    ).to.eql('Enter a short description of your KintoBlock')
  })

  it('should check whether Repository is changed to Organization when Create New repo is selected', () => {
    browser.scroll(0, 1000)
    KintoBlockCreate.organisationFieldTitle.waitForVisible()
    expect(KintoBlockCreate.organisationFieldTitle.isVisible()).to.eql(true)
  })

  it('should check repository name is pre-populated with organization name', () => {
    KintoBlockCreate.orgNameFromRepoInputField.waitForVisible()
    expect(KintoBlockCreate.orgNameFromRepoInputField.isVisible()).to.eql(true)
  })

  it('should validate inputs and not allow user to create a service kb with name less than 3 characters', () => {
    browser.scroll(0, -1000)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  it('should check whether Create new kintoblock button is enabled in KB Create Page', () => {
    KintoBlockCreate.submitBtn.waitForVisible()
    expect(KintoBlockCreate.submitBtn.isEnabled()).to.eql(true)
  })

  it('should validate inputs and not allow user to create a service kb with name more than 24 characters', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBFortyChar)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Must be 24 characters or less'
    )
  })

  it('should validate inputs and not allow user to create a service kb with name in Upper case', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBCAPSChar)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Must contain only lowercase characters, digits and hyphens'
    )
  })

  it('should validate inputs and not allow user to create a service kb with name containing special characters', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.invalidKBNameWithChar
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Must contain only lowercase characters, digits and hyphens'
    )
  })

  it('should validate inputs and not allow user to create a service kb with name starting with number', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.invalidKBNameWithDigit
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      "The first character can't be a digit"
    )
  })

  it('should validate inputs and not allow  user to create a service kb with description more than 200 characters', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName
    )
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.invalidKBDescription
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.shortDescription.error.waitForVisible()

    expect(KintoBlockCreate.shortDescription.error.getText()).to.eql(
      'Must be 200 characters or less'
    )
  })

  it('should create a customservice KB with new repository - GitHub', () => {
    var ws = landingPage.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockCreate.createCustomServiceKB(
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the KB with GitHub repo to move to PROCESSING', () => {
    browser.pause(30000)
  })

  it('should check whether KB build with GitHub is moved to success', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should create a custom service KB with new repository - BitBucket', () => {
    KintoBlockCreate.createCustomServiceKB(
      testData.kbrepo.repository1,
      testData.bitbucket.organisationName
    )
  })

  it('should wait for the KB with BitBucket repo to move to PROCESSING', () => {
    browser.pause(30000)
  })

  it('should check whether KB build with BitBucket is moved to success', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should create a service KB with existing repository - GitHub', () => {
    KintoBlockCreate.createCustomServiceKB(
      testData.kbrepo.repository2,
      testData.github.repoSource,
      testData.github.username,
      testData.kintoblock.validHelmCustomServicerepo
    )
  })

  it('should wait for the KB with GitHub repo to move to PROCESSING', () => {
    browser.pause(30000)
  })

  it('should check whether KB build with GitHub is moved to success', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should create a service KB with ex repository - Bitbucket', () => {
    KintoBlockCreate.createCustomServiceKB(
      testData.kbrepo.repository2,
      testData.bitbucket.repoSource,
      testData.bitbucket.organisationName,
      testData.kintoblock.validHelmCustomServicerepo
    )
  })

  it('should wait for the KB with bitbucket repo to move to PROCESSING', () => {
    browser.pause(30000)
  })

  it('should check whether KB build with bitbucket is moved to success', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should check whether Build latest commit button is visible', () => {
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    expect(KintoBlockManage.refreshCommitBtn.isVisible()).to.eql(true)
  })

  it.skip('should reflect the commit changes made in github in Service KB manage Page', () => {
    KintoBlockCreate.createCustomServiceKB(
      testData.kbrepo.repository1,
      testData.github.username
    )
    browser.pause(10000)
    browser.scroll(0, 800)
    // KintoBlockManage.autoDeploy()
    // browser.scroll(0,-1000)
    KintoBlockManage.openRepoBtn.scroll(0, 600)
    KintoBlockManage.openRepoBtn.leftClick()
    var tabIds = browser.getTabIds()
    //Change to id according to the new scripts
    browser.switchTab(tabIds[3]) //??
    browser.pause(5000)
    KintoBlockManage.readMeEdit.waitForVisible()
    KintoBlockManage.readMeEdit.click()
    browser.pause(3000)
    KintoBlockManage.editIconInGitHub.waitForVisible()
    KintoBlockManage.editIconInGitHub.leftClick()
    browser.pause(2000)
    expect(KintoBlockManage.editIconInGitHub.isVisible()).to.eql(false)
    KintoBlockManage.updateReadMeName.waitForVisible()
    randomName = KintoBlockCreate.randomName()
    var readMeName = testData.kintoblock.validReadMeName + randomName + 'o9d'
    KintoBlockManage.updateReadMeName.setValue(readMeName)
    KintoBlockManage.commitChangesBtn.click()
    browser.pause(3000)
    browser.switchTab(tabIds[0])
    browser.pause(3000)
  })

  it('should tag the custom service KB build', () => {
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

  it('should verify whether the Recent builds, Tag Build btn, Open repo btn and auto build switch are visible', () => {
    var ws = landingPage.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(2).waitForVisible()
    KintoBlockList.getCard(2).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.recentBuildBlock.waitForVisible()
    expect(KintoBlockManage.recentBuildBlock.isVisible()).to.eql(true)
    KintoBlockManage.getTagThisBuildBtn(1).waitForVisible()
    expect(KintoBlockManage.getTagThisBuildBtn(1).isVisible()).to.eql(true)
    KintoBlockManage.openRepoBtn.waitForVisible()
    expect(KintoBlockManage.openRepoBtn.isVisible()).to.eql(true)
    KintoBlockManage.autoBuildSwitch.waitForVisible()
    expect(KintoBlockManage.autoBuildSwitch.isVisible()).to.eql(true)
  })

  it('should navigate to the example repository page in GtHub when clicked on View example project link', () => {
    browser.scroll(0, 800)
    KintoBlockManage.viewExampleProjectsLink.waitForVisible()
    KintoBlockManage.viewExampleProjectsLink.click()
    var tabIds = browser.getTabIds()
    //Change to id according to the new scripts
    browser.switchTab(tabIds[4]) //??
    browser.pause(5000)
    browser.switchTab(tabIds[0])
  })

  it('should  navigate to GitHub repo page when clicked on open repo buton in KB Manage Page', () => {
    browser.scroll(0, 500)
    KintoBlockManage.openRepoBtn.waitForVisible()
    expect(KintoBlockManage.openRepoBtn.isVisible()).to.eql(true)
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    //Change to id according to the new scripts
    browser.switchTab(tabIds[5]) //??
    browser.pause(5000)
    browser.switchTab(tabIds[0])
  })

  it('should check whether auto-build switch is visible', () => {
    KintoBlockManage.autoBuildSwitch.waitForVisible()
    expect(KintoBlockManage.autoBuildSwitch.isVisible()).to.eql(true)
  })

  it('should check whether add to deployment button is visible in service KB manage page', () => {
    KintoBlockManage.addDeploymentBtn.waitForVisible()
    expect(KintoBlockManage.addDeploymentBtn.isVisible()).to.eql(true)
  })

  it('should check whether pop-up is displayed when clicked on add to deployment btn', () => {
    KintoBlockManage.addDeploymentBtn.click()
    KintoBlockManage.addDeploymentPopup.waitForVisible()
    expect(KintoBlockManage.addDeploymentPopup.isVisible()).to.eql(true)
    browser.pause(8000)
  })

  it('should be able to see the message in the Add to deployment btn pop-up', () => {
    DeploymentManage.depPopUp.waitForVisible()
    expect(DeploymentManage.depPopUp.isVisible()).to.eql(true)
  })

  it('should check whether search bar in Add to Deployment pop-up', () => {
    DeploymentManage.depSearchBar.waitForVisible()
    expect(DeploymentManage.depSearchBar.isVisible()).to.eql(true)
    KintoBlockManage.addDeploymentBtn.click()
  })

  it('should add the KB to deployment when clicked on add to deployment btn in KB manage page', () => {
    KintoBlockManage.addToDeployment()
    KintoBlockManage.addToNewDeployment()
  })

  it('should check whether an added KB is visible in deployment create page', () => {
    browser.scroll(0, 1000)
    DeploymentManage.getblock(2).waitForVisible()
    expect(DeploymentManage.getblock(2).isVisible()).to.eql(true)
  })

  it('should be able to add other KB to the same deployment', () => {
    browser.scroll(0, 600)
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

  it('should create an environment for deployment deployed with custom service KB', () => {
    DeploymentManage.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    var envName =
      testData.Environment.allValidEnvChar + '4' + currentDate.getTime() + 'y'
    EnvironmentCreate.envNameField.setValue(envName)
    EnvironmentCreate.addNewEnvBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
  })

  it('should delete an existing environment created for deployment with custom service deployed in it', () => {
    DeploymentCreate.getenvCardSelect(3).click()
    browser.pause(2000)
    browser.scroll(0, 2750)
    DeploymentManage.deleteEnv.click()
    DeploymentManage.confirmDeleteInput.setValue(
      testData.kintoblock.deleteEnvironment
    )
    var title = DeploymentManage.envDeletePopTitle.getText().split(' - ')
    var envName = title[1]
    DeploymentManage.envDeleteBtn.click()
    browser.pause(2000)
    expect(KintoBlockManage.kbSuccessMsg.getText()).to.eql(
      `The environment "${envName}" has been successfully deleted.`
    )
  })

  it('should shutdown an environment of deployment deployed with custom service', () => {
    DeploymentManage.shutDownBtn.waitForVisible()
    DeploymentManage.shutDownBtn.click()
    browser.pause(2000)
    DeploymentManage.shutDownAnywayBtn.waitForVisible()
    DeploymentManage.shutDownAnywayBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.shutDownBtn.isVisible()).to.eql(false)
  })

  it('should wait for the deployment to shut down', () => {
    browser.pause(100000)
  })

  it('should check whether an environment can be redeployed with service KB which is shutdown', () => {
    browser.scroll(0, 1500)
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validServiceKB)
    KintoBlockList.getFilteredKB('service').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.deploySuccessBtn()
    DeploymentManage.form.waitForVisible()
  })

  it.skip('should verify user is able to view logs of environment deployed with custom service', () => {
    DeploymentCreate.getenvCardSelect(2).click()
    browser.scroll(0, -150)
    DeploymentManage.goBackBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    var ws = landingPage.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(2).waitForVisible()
    KintoBlockList.getCard(2).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.addToDeployment()
    KintoBlockManage.addToNewDeployment()
  })

  it('should check deployment process of custom service', () => {
    DeploymentCreate.checkforDepSuccess()
  })

  it('Should check the logs of the Deployed custom KB', () => {
    browser.refresh()
    DeploymentManage.loadingFinished.waitForExist()
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
    DeploymentManage.goBackBtn.click()
  })

  it('should verify whether Custom service KB can be made public and shared', () => {
    KintoBlockCreate.createCustomServiceKB(
      testData.kbrepo.repository2,
      testData.github.repoSource,
      testData.github.username,
      testData.kintoblock.validHelmCustomServicerepo
    )

    it('should wait for the KB with GitHub repo to move to PROCESSING', () => {
      browser.pause(30000)
    })

    it('should check whether KB build with GitHub is moved to success', () => {
      KintoBlockManage.checkForBuildSuccess(1)
    })

    it('should check whether service KB can be shared or made public', () => {
      KintoBlockManage.shareKBIcon.waitForVisible()
      KintoBlockManage.shareKBIcon.click()
      KintoBlockCreate.submitGlobal()
      KintoBlockManage.loadingFinished.waitForExist()
    })

    it('should click on open log button of the build in KB Manage Page', () => {
      KintoBlockManage.getOpenLogLinkOfBuilds(1).waitForVisible()
      KintoBlockManage.getOpenLogLinkOfBuilds(1).click()
      var tabIds = browser.getTabIds()
      //Change to id according to the new scripts
      browser.switchTab(tabIds[6]) //??
      browser.pause(5000)
      browser.switchTab(tabIds[0])
    })

    it('should search for the public KB in KB list page', () => {
      var ws = Landing.workspaceSelect.getAttribute('data-test')
      KintoBlockList.open(ws)
      KintoBlockList.kbSearchBar.setValue('service')
      KintoBlockList.loadingFinished.waitForExist()
      KintoBlockList.getFilteredKB('service').waitForVisible()
      KintoBlockList.getFilteredKB('service').click()
      expect(KintoBlockList.getFilteredKB('service').isVisible()).to.eql(true)
    })
  })
})
