import { expect } from 'chai'
//import MembersBar from '../page-objects/members.bar.page'
import DeploymentList from '../page-objects/deployment.list.page'
import DeploymentCreate from '../page-objects/deployment.create.page'
import DeploymentManage from '../page-objects/deployment.manage.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import EnvironmentManage from '../page-objects/environment.manage.page'
import WorkspaceCreate from '../page-objects/workspace.create.page'
import WorkspaceManage from '../page-objects/workspace.manage.page'
import EnvironmentList from '../page-objects/environment.list.page'
import EnvironmentCreate from '../page-objects/environment.create.page'
import Login from '../page-objects/login.page'
import Landing from '../page-objects/landing.page'
import testData from '../constants/testdata.json'
import { getToken, callUserKB } from '../helpers/apiHelpers'

var kbNameOne
var kbNameTwo
var kbNameThree
var kbNameFour
var kbNameFive
var kbNameSix
var kaNameGlob
var currentDate = new Date()
var currentTime = new Date()
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
var kbLog
var secondUser
var userThree
var randomName
var ws
var MembersBar

describe('KA - 1  create kintoApp', () => {
  // TODO let workspaceId
  //  const wdio = require('wdio')
  //
  //   beforeEach(wdio.wrap( {
  //	    workspaceId = Landing.workspaceSelect.getAttribute('data-test')
  //  })	)

  it('should redirect the user to login  when he is trying to access list of kintoApps and he is not logged in', () => {
    DeploymentList.open(1) // Default workspace ID 1 passed as user is not yet logged in in this case
    Login.loginForm.waitForVisible()
    expect(Login.getUrl()).to.eql('/log-in')
  })

  it('should redirect the user to create kintoapps when he is trying to access list kintoapps with no kintoapps created', () => {
    username = Login.registerAndLogin('A')
    WorkspaceManage.linkGithub()
    Landing.workspaceSelect.waitForVisible()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eq(true)
  })

  it('should redirect the user to create kintoapps when he clicks on kintoapps with no kintoapps created', () => {
    DashboardIndex.applicationLeftnav.click()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eq(true)
  })

  it.skip('should validate inputs and not allow user to create a kintoApp without invalid data', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppName + currentTime.getTime()
    )
    DeploymentCreate.submitGlobal()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.shortDescription.error.getText()).to.eql('Required')
  })

  it('should validate inputs and not allow user to create a kintoApp with description more than 200 characters', () => {
    DeploymentCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.invalidKintoAppDescription
    )
    DeploymentCreate.submitGlobal()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.shortDescription.error.waitForVisible()
    expect(DeploymentCreate.shortDescription.error.getText()).to.eql(
      'Must be 200 characters or less'
    )
  })

  it('should not be able to create a new ka without selecting any KintoBlock', () => {
    var kaName =
      testData.kintoapp.validKintoAppName + currentTime.getTime() + 'a'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.submitGlobal()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.errorMsg.getText()).to.eql(
      'Must select a KintoBlock'
    )
  })

  it('should display alert pop up message, when user try to navigate to any page of KH from `create new application` page while `create new application` button is enabled', () => {
    DeploymentCreate.open(ws)
    browser.pause(1000)
    browser.alertAccept()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppName + currentTime.getTime()
    )
    expect(DeploymentCreate.submitBtn.isEnabled()).to.eql(true)
    DashboardIndex.kintoBlocksleftnav.click()
    browser.pause(1000)
    browser.alertAccept()
  })

  it('should create the first KB with valid name and description ', () => {
    //Create a KB as this spec is dependent on KB.
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbNameOne = testData.kintoblock.validKBNameWithDollar + '98' + randomName
    KintoBlockCreate.name.input.setValue(kbNameOne)
    KintoBlockCreate.kbDisplayName.setValue(kbNameOne)
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
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
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
    KintoBlockManage.amazingBtn.waitForExist()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for 100000 seconds', () => {
    browser.pause(100000)
  })

  it('should wait for 100000 seconds', () => {
    browser.pause(100000)
  })

  it('check build success for first created', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should create the second KB with valid name and description ', () => {
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbNameTwo =
      testData.kintoblock.validKintoBlockNameWithDigit + '16' + randomName
    KintoBlockCreate.name.input.setValue(kbNameTwo)
    KintoBlockCreate.kbDisplayName.setValue(kbNameTwo)
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
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
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
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for 100000 seconds', () => {
    browser.pause(100000)
  })

  it('should wait for 100000 seconds', () => {
    browser.pause(100000)
  })

  it('check build success for second created', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it("should show the description for 'What is an Application?' on the right", () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.whatisanApp.waitForVisible()
    expect(DeploymentCreate.whatisanApp.getText()).to.eql(
      'What is a Deployment?\nDeployments are tailored back-end features packages, ready to be consumed by your clients and whose feature can scale independently to fit your needs. They are composed of KintoBlocks and services with unique configuration parameters, and either a client or a protocol to allow your clients to talk to the deployment. Start building an deployment below or learn more here.'
    )
  })

  it('should show the switch for managing edit permission of workspace and the switch is ON by default', () => {
    expect(DeploymentCreate.switchTogglerBtn.isVisible()).to.eql(true)
    expect(DeploymentCreate.switchValueForWS.getAttribute('value')).to.eql(
      'true'
    )
  })

  it('should show the button to edit the workspace editors when the switch is turned off', () => {
    DeploymentCreate.switchTogglerBtn.click()
    expect(DeploymentCreate.switchValueForWS.getAttribute('value')).to.eql(
      'false'
    )
    DeploymentCreate.wsEditorButton.waitForVisible()
    expect(DeploymentCreate.wsEditorButton.isVisible()).to.eql(true)
    DeploymentCreate.switchTogglerBtn.click()
  })

  it('should create a new KA selecting a single KintoBlock', () => {
    var kaName =
      testData.kintoapp.validKintoAppName + currentTime.getTime() + 'b'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    DeploymentCreate.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.amazingBtn.waitForVisible()
    DeploymentCreate.amazingBtn.click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible() //TODO Change this to 0, after the bug to display the latest KA on top is fixed
    // const kaNameCard = DeploymentList.getCard(1) //TODO Change this to 0, after the bug to display the latest KA on top is fixed
    // .element('.name')
    // .getText()
    var kaNameCard = DeploymentList.getKaNameFromKaCard(0).getText()
    expect(kaNameCard).to.eql(kaName)
    DeploymentList.getCard(0).click() //TODO Change this to 0, after the bug to display the latest KA on top is fixed
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.title.waitForVisible()
    var fullTitle = DeploymentManage.title.getText().split(' - ')
    expect(fullTitle[0]).to.eq(kaNameCard)
  })

  it('should create a new KA selecting multiple KintoBlock', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    var kaName =
      testData.kintoapp.validKANamewithDot + currentTime.getTime() + 'c'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.waitForVisible()
    DeploymentCreate.kbdropDown.setValue(kbNameOne)
    DeploymentCreate.getFilteredKB(kbNameOne).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    browser.keys('Tab')
    DeploymentCreate.kbdropDown.setValue(kbNameTwo)
    DeploymentCreate.getFilteredKB(kbNameTwo).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(1).waitForVisible()
    const name = DeploymentList.getCard(1) //TODO  Change this to 0, after the bug to display the latest KA on top is fixed
      .element('.name')
      .getText()
    expect(name).to.eql(kaName)
    DeploymentList.getCard(1).click() //TODO  Change this to 0, after the bug to display the latest KA on top is fixed
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.title.waitForVisible()
    var fullTitle = DeploymentManage.title.getText().split(' - ')
    expect(fullTitle[0]).to.eq(name)
  })

  it.skip('should display alert pop up message, when user try to navigate to any page of KH from `manage KA` page without saving the changes made', () => {
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.basicInfoEditIcon.waitForVisible()
    DeploymentManage.basicInfoEditIcon.click()
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKintoAppName + currentTime.getTime() + 'j'
    )
    DashboardIndex.open(ws)
    browser.pause(1000)
    browser.alertAccept()
  })
})

describe.skip('KA - Projects KA create page - Members bar', () => {
  //TC_847
  it('should display icon with first two letters of the owner for owner icon in KA create page members bar', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    //Getting icon text from logout btn as it has first two letters of owner
    var ownerText = MembersBar.ownerIconText.getText()
    MembersBar.ownerIconInForm.isVisible()
    //Getting icon text from the KA form
    expect(MembersBar.ownerIconInForm.getText()).to.eql(ownerText)
    DeploymentCreate.logout()
    //Creating members
    memberOne = Login.registerAndLogin('B') + '@kintoe2e.com'
    Login.logout()
    memberTwo = Login.registerAndLogin('C') + '@kintoe2e.com'
    Login.logout()
    memberThree = Login.registerAndLogin('D') + '@kintoe2e.com'
  })

  //TC_848
  it('should display icon with first two letters of the member for member icons in KA create page members bar', () => {
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
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    MembersBar.getMembersIconInForm(1).waitForVisible()
    expect(MembersBar.getMembersIconInForm(1).getText()).to.eql(dict[0])
    expect(MembersBar.getMembersIconInForm(2).getText()).to.eql(dict[1])
    expect(MembersBar.getMembersIconInForm(3).getText()).to.eql(dict[2])
    expect(MembersBar.getMembersIconInForm(4).getText()).to.eql(dict[3])
  })

  //TC_849
  it('should display title of `Edit collaborators pop up` and `members list`, `search bar`, `members list`, `ok` and `invite members btn` in `Edit Collab` pop up via KA manage page', () => {
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

  //TC_851
  it('should display all members of workspace in members list of `Edit collaborators` pop up triggered via KA create page', () => {
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

  //TC_850
  it('should verify that owner icon has a crown on its top in members bar of KA create page', () => {
    MembersBar.OkBtnInEditCollabPopUp.click()
    DeploymentCreate.form.waitForVisible()
    var ownerText = MembersBar.ownerIconText.getText()
    expect(MembersBar.ownerIconInForm.getText()).to.eql(ownerText)
    MembersBar.crownOfOwnerIcon.waitForVisible()
    expect(MembersBar.crownOfOwnerIcon.isVisible()).to.eql(true)
  })

  // //TC_665
  // it('should display `+X` icon, when there are more than 5 members to display and toggle bar is switched on in KA create page members bar', () => {
  //   //TODO
  // })

  // //TC_666
  // it('should display `+X` icon with `Edit icon` in KA create members bar, when toggle bar is switched off', () => {
  //   //TODO
  // })

  //TC_854
  it('should verify that members as "Admin" are listed first in the row of KA create page members bar', () => {
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
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(MembersBar.getMembersIconInForm(1).getText()).to.eql(dict[0])
  })

  //TC_855
  it('should verify that "Admin" icons has star icon on its top of KA create page members bar', () => {
    MembersBar.getAdminStarIconOfMembersInProjectsBar(1).waitForVisible()
    //For now only one member is admin
    expect(
      MembersBar.getAdminStarIconOfMembersInProjectsBar(1).isVisible()
    ).to.eql(true)
  })

  //TC_856
  it('should display `Edit icon`, when toggle bar is switched off in KA create page members bar', () => {
    MembersBar.toggleBarSwitch.click()
    MembersBar.editIconInForm.waitForVisible()
    expect(MembersBar.editIconInForm.isVisible()).to.eql(true)
  })

  //TC_857
  it('should display `Edit Collaborators` pop up, when edit icon is clicked in KA create page members bar', () => {
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    expect(MembersBar.editCollaboratorsPopUp.isVisible()).to.eql(true)
    MembersBar.OkBtnInEditCollabPopUp.click()
  })

  //TC_858
  it('should verify that "Edit icon" disappears, when toggle bar is switched on in KA create page members bar', () => {
    DeploymentCreate.form.waitForVisible()
    //Turning on toggle bar
    MembersBar.toggleBarSwitch.click()
    expect(MembersBar.editIconInForm.isVisible()).to.eql(false)
  })

  //TC_861
  it('should allow "owner" of the project to edit the members of the project in KA create page', () => {
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
    DeploymentCreate.loadingFinished.waitForExist()
  })

  //TC_860
  it('should allow "Admin" of the project to edit the members of the project in KA create page', () => {
    DeploymentCreate.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    let unonly = memberFour.split('@')
    Login.loginUsername.setValue(unonly[0])
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
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

  //TC_875
  it('should save changes made in `Edit collaborators` pop up and apply it for new KA, when a KA is created', () => {
    DashboardIndex.workspaceDropdown.selectByIndex(2)
    browser.alertAccept()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
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
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    MembersBar.toggleBarSwitch.waitForVisible()
    MembersBar.toggleBarSwitch.click()
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    MembersBar.getCheckBoxesOfMembersInEditCollab(2).leftClick()
    MembersBar.OkBtnInEditCollabPopUp.click()
    var kaName =
      testData.kintoapp.validUpdatedKintoAppName + '04' + currentTime.getTime()
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    DeploymentCreate.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
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

  // //TC_675
  // it('should verify that toggle bar is switched on in KA create page members bar, when toggle bar is switched on in workspace manage page', () => {
  //   //TODO as for now there is no toggle bar in workspace manage bar
  // })

  // //TC_677
  // it('should verify that toggle bar is switched off in KA create page members bar, when toggle bar is switched off in workspace manage page', () => {
  //   //TODO as for now there is no toggle bar in workspace manage bar
  // })

  //TC_867
  it('should verify that role field of members with role "Admin/Owner" are greyed out in "Edit collaborators" pop up triggered via KA create page', () => {
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    MembersBar.toggleBarSwitch.waitForVisible()
    MembersBar.toggleBarSwitch.click()
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.greyedOutNameAndRoleField(1)
    MembersBar.greyedOutNameAndRoleField(2)
  })

  //TC_868
  it('should verify that role field of members with role "Editor" are not greyed out in "Edit collaborators" pop up triggered via KA create page', () => {
    MembersBar.greyedOutNameAndRoleField(3)
    MembersBar.greyedOutNameAndRoleField(4)
    MembersBar.greyedOutNameAndRoleField(5)
  })

  // //TC_682
  // it('should verify that checkboxes are selected by default for all members in "Edit collaborators" pop up triggered via KA create page', () => {
  //   //TODO
  // })

  //TC_870
  it('should verify that checkboxes for members with role "Admin/Owner" are greyed out in "Edit collaborators" pop up triggered via KA create page', () => {
    MembersBar.checkBoxGreyedOut(1)
    MembersBar.checkBoxGreyedOut(2)
  })

  //TC_871
  it('should verify that checkboxes for members with role "Editor" are not greyed out in "Edit collaborators" pop up triggered via KA create page', () => {
    MembersBar.checkBoxGreyedOut(3)
    MembersBar.checkBoxGreyedOut(4)
    MembersBar.checkBoxGreyedOut(5)
  })

  //TC_872
  it('should verify that chechboxes can be unchecked for members with "Editor" role in "Edit collaborators" pop up triggered via KA create page', () => {
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

  //TC_873
  it('should display checked members from the "Edit collaborators" in the KA create page members bar', () => {
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
    DeploymentCreate.form.waitForVisible()
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

  //TC_874
  it('should not display unchecked members from the "Edit collaborators" in the KA create page members bar', () => {
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(5).isSelected()).to.eql(
      false
    )
    MembersBar.OkBtnInEditCollabPopUp.click()
    DeploymentCreate.form.waitForVisible()
    expect(MembersBar.getMembersIconInForm(4).isVisible()).to.eql(false)
  })

  //TC_875
  it('should navigate to KA create page, when `OK` button is clicked in `Edit collaborators` pop up', () => {
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    MembersBar.OkBtnInEditCollabPopUp.click()
    DeploymentCreate.form.waitForVisible()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
  })

  //TC_876
  it('should display text as `Everyone in This Workspace Is an Editor of This Project` beside the toggle bar of KA create page', () => {
    MembersBar.toggleMessage.waitForVisible()
    var collabText = MembersBar.toggleMessage.getText().split('\n')
    var editText = collabText[1]
    expect(editText).to.eql('All members can view & edit')
  })

  //TC_877
  it('should verify that members list in `Edit Collaborators` triggered via KA create page are filtered as per key words entered in search bar', () => {
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

  //TC_878
  it('should display text as "No collaborators match your search query" in `Edit Collaborators` members list of KA create, when no members match keyword in search bar', () => {
    //As already there is no matching text
    MembersBar.noMatchingText.waitForVisible()
    expect(MembersBar.noMatchingText.isVisible()).to.eql(true)
  })

  //TC_879
  it('should verify that name field for members as "Admin/Owner" are greyed out in "Edit collaborators" pop up triggered via KA create page', () => {
    // MembersBar.editCollabSearchBar.clearElement()
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

  //TC_880
  it('should verify that name field for members as "Editor" are greyed out in "Edit collaborators" pop up triggered via KA create page', () => {
    MembersBar.greyedOutNameAndRoleField(3)
    MembersBar.greyedOutNameAndRoleField(4)
    MembersBar.greyedOutNameAndRoleField(5)
  })

  //TC_881
  it('should verify that role field for members as "Editor" are editable in "Edit collaborators" pop up triggered via KA manage page', () => {
    MembersBar.greyedOutNameAndRoleField(3)
    MembersBar.greyedOutNameAndRoleField(4)
    MembersBar.greyedOutNameAndRoleField(5)
  })

  // //TC_672
})

describe.skip('KA - Projects KA manage page - Members bar', () => {
  //TC_660
  it('should display icon with first two letters of the owner for owner icon in KA manage page members bar', () => {
    MembersBar.OkBtnInEditCollabPopUp.click()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.logout()
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
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    //Getting icon text from logout btn as it has first two letters of owner
    var ownerText = MembersBar.ownerIconText.getText()
    MembersBar.ownerIconInForm.isVisible()
    //Getting icon text from the KA form
    expect(MembersBar.ownerIconInForm.getText()).to.eql(ownerText)
  })

  //TC_661
  it('should display icon with first two letters of the member for member icons in KA manage page members bar', () => {
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    dict = MembersBar.initialsOfMembers()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    MembersBar.getMembersIconInForm(1).waitForVisible()
    expect(MembersBar.getMembersIconInForm(1).getText()).to.eql(dict[0])
    expect(MembersBar.getMembersIconInForm(2).getText()).to.eql(dict[1])
    expect(MembersBar.getMembersIconInForm(3).getText()).to.eql(dict[2])
    expect(MembersBar.getMembersIconInForm(4).getText()).to.eql(dict[3])
  })

  //TC_662
  it('should display title of `Edit collaborators pop up` and `members list`, `search bar`, `members list`, `ok` and `invite members btn` in `Edit Collab` pop up via KA manage page', () => {
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
  it('should verify that owner icon has a crown on its top in members bar of KA manage page', () => {
    MembersBar.OkBtnInEditCollabPopUp.click()
    DeploymentManage.form.waitForVisible()
    var ownerText = MembersBar.ownerIconText.getText()
    expect(MembersBar.ownerIconInForm.getText()).to.eql(ownerText)
    MembersBar.crownOfOwnerIcon.waitForVisible()
    expect(MembersBar.crownOfOwnerIcon.isVisible()).to.eql(true)
  })

  //TC_664
  it('should display all members of workspace in members list of `Edit collaborators` pop up triggered via KA manage page', () => {
    DashboardIndex.editWorkspace.click()
    browser.alertAccept()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    var emails = MembersBar.emailsOfMembers()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
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
  // it('should display `+X` icon, when there are more than 5 members to display and toggle bar is switched on in KA manage page members bar', () => {
  //   //TODO
  // })

  // //TC_666
  // it('should display `+X` icon with `Edit icon` in KA manage members bar, when toggle bar is switched off', () => {
  //   //TODO
  // })

  //TC_667
  it('should verify that members as "Admin" are listed first in the row of KA manage page members bar', () => {
    var adminMember = MembersBar.getMemberIconTextFromEditCollabPopUp(
      2
    ).getText()
    MembersBar.OkBtnInEditCollabPopUp.click()
    expect(MembersBar.getMembersIconInForm(1).getText()).to.eql(adminMember)
  })

  //TC_668
  it('should verify that "Admin" icons has star icon on its top of KA manage page members bar', () => {
    expect(
      MembersBar.getAdminStarIconOfMembersInProjectsBar(1).isVisible()
    ).to.eql(true)
  })

  //TC_669
  it('should display `Edit icon`, when toggle bar is switched off in KA manage page members bar', () => {
    //Already edit icon is displayed as toggle is switched off
    MembersBar.editIconInForm.waitForVisible()
    expect(MembersBar.editIconInForm.isVisible()).to.eql(true)
  })

  //TC_670
  it('should display `Edit Collaborators` pop up, when edit icon is clicked in KA manage page members bar', () => {
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    expect(MembersBar.editCollaboratorsPopUp.isVisible()).to.eql(true)
    MembersBar.OkBtnInEditCollabPopUp.click()
  })

  //TC_671
  it('should verify that "Edit icon" disappears, when toggle bar is switched on in KA manage page members bar', () => {
    DeploymentManage.form.waitForVisible()
    //Turning on toggle bar
    MembersBar.toggleBarSwitch.click()
    expect(MembersBar.editIconInForm.isVisible()).to.eql(false)
  })

  //TC_674
  it('should allow "owner" of the project to edit the members of the project in KA manage page', () => {
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
    DeploymentManage.loadingFinished.waitForExist()
  })

  //TC_673
  it('should allow "Admin" of the project to edit the members of the project in KA manage page', () => {
    DeploymentManage.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    let unonly = memberFour.split('@')
    Login.loginUsername.setValue(unonly[0])
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
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
  // it('should verify that toggle bar is switched on in KA manage page members bar, when toggle bar is switched on in workspace manage page', () => {
  //   //TODO as for now there is no toggle bar in workspace manage bar
  // })

  // //TC_677
  // it('should verify that toggle bar is switched off in KA manage page members bar, when toggle bar is switched off in workspace manage page', () => {
  //   //TODO as for now there is no toggle bar in workspace manage bar
  // })

  //TC_680
  it('should verify that role field of members with role "Admin/Owner" are greyed out in "Edit collaborators" pop up triggered via KA manage page', () => {
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.greyedOutNameAndRoleField(1)
    MembersBar.greyedOutNameAndRoleField(2)
  })

  //TC_681
  it('should verify that role field of members with role "Editor" are not greyed out in "Edit collaborators" pop up triggered via KA manage page', () => {
    MembersBar.greyedOutNameAndRoleField(3)
    MembersBar.greyedOutNameAndRoleField(4)
    MembersBar.greyedOutNameAndRoleField(5)
  })

  // //TC_682
  // it('should verify that checkboxes are selected by default for all members in "Edit collaborators" pop up triggered via KA manage page', () => {

  // })

  //TC_683
  it('should verify that checkboxes for members with role "Admin/Owner" are greyed out in "Edit collaborators" pop up triggered via KA manage page', () => {
    MembersBar.checkBoxGreyedOut(1)
    MembersBar.checkBoxGreyedOut(2)
  })

  //TC_683
  it('should verify that checkboxes for members with role "Editor" are not greyed out in "Edit collaborators" pop up triggered via KA manage page', () => {
    MembersBar.checkBoxGreyedOut(3)
    MembersBar.checkBoxGreyedOut(4)
    MembersBar.checkBoxGreyedOut(5)
  })

  //TC_684
  it('should verify that chechboxes can be unchecked for members with "Editor" role in "Edit collaborators" pop up triggered via KA manage page', () => {
    //MembersBar.getCheckMembersInEditCollabPopUp(3).click()
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
  it('should display checked members from the "Edit collaborators" in the KA manage page members bar', () => {
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
    DeploymentManage.form.waitForVisible()
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
  it('should not display unchecked members from the "Edit collaborators" in the KA manage page members bar', () => {
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    expect(MembersBar.getCheckMembersInEditCollabPopUp(5).isSelected()).to.eql(
      false
    )
    MembersBar.OkBtnInEditCollabPopUp.click()
    DeploymentManage.form.waitForVisible()
    expect(MembersBar.getMembersIconInForm(4).isVisible()).to.eql(false)
  })

  //TC_687
  it('should navigate to KA manage page, when `OK` button is clicked in `Edit collaborators` pop up', () => {
    MembersBar.editIconInForm.waitForVisible()
    MembersBar.editIconInForm.leftClick()
    MembersBar.editCollaboratorsPopUp.waitForVisible()
    MembersBar.OkBtnInEditCollabPopUp.click()
    DeploymentManage.form.waitForVisible()
    expect(DeploymentManage.form.isVisible()).to.eql(true)
  })

  //TC_688
  it('should save changes made in `Edit collaborators` pop up, when "Save Changes" button is clicked in KA manage page', () => {
    expect(DeploymentManage.submitBtn.getText()).to.eql('Save Changes')
    DeploymentManage.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    browser.pause(2000)
    expect(DeploymentManage.submitBtn.getText()).to.eql('Tag and Deploy')
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
  it('should display text as `Everyone in This Workspace Is an Editor of This Project` beside the toggle bar of KA manage page', () => {
    MembersBar.toggleMessage.waitForVisible()
    var collabText = MembersBar.toggleMessage.getText().split('\n')
    var editText = collabText[1]
    expect(editText).to.eql('All members can view & edit')
  })

  //TC_690
  it('should verify that members list in `Edit Collaborators` triggered via KA manage page are filtered as per key words entered in search bar', () => {
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
  it('should display text as "No collaborators match your search query" in `Edit Collaborators` members list of KA manage, when no members match keyword in search bar', () => {
    //As already there is no matching text
    MembersBar.noMatchingText.waitForVisible()
    expect(MembersBar.noMatchingText.isVisible()).to.eql(true)
  })

  //TC_692
  it('should verify that name and role field for members as "Admin/Owner" are greyed out in "Edit collaborators" pop up triggered via KA manage page', () => {
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
  it('should verify that name field for members as "Editor" are greyed out in "Edit collaborators" pop up triggered via KA manage page', () => {
    MembersBar.greyedOutNameAndRoleField(3)
    MembersBar.greyedOutNameAndRoleField(4)
    MembersBar.greyedOutNameAndRoleField(5)
  })

  //TC_694
  it('should verify that role field for members as "Editor" are greyed out in "Edit collaborators" pop up triggered via KA manage page', () => {
    MembersBar.greyedOutNameAndRoleField(3)
    MembersBar.greyedOutNameAndRoleField(4)
    MembersBar.greyedOutNameAndRoleField(5)
  })

  //TC_672
  it('should verify that toggle bar is not displayed for member as an editor of the project in KA manage page', () => {
    MembersBar.OkBtnInEditCollabPopUp.click()
    DeploymentManage.form.waitForVisible()
    browser.pause(20000)
    DeploymentManage.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    let unonly = memberOne.split('@')
    Login.loginUsername.setValue(unonly[0])
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(MembersBar.toggleBarSwitch.isVisible()).to.eql(false)
  })
})

describe('KA 2 - List Overall Page', () => {
  //TC_316
  it('should navigate user to deployments list page, when user clicks on `Deployments` form breadcrumb of deployments manage page', () => {
    DeploymentManage.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaListPageFromKaManagePage.waitForVisible()
    DeploymentManage.kaListPageFromKaManagePage.click()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    expect(DeploymentList.myDeploymentList.isVisible()).to.eql(true)
  })

  //TC_317
  it('should navigate user to KA list page, when user Tabs URL of KA list page', () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    expect(DeploymentList.getUrl()).to.eql(
      `/app/dashboard/${ws}/deployments/list`
    )
    DeploymentList.myDeploymentList.waitForVisible()
  })

  //TC_318
  it('should display `Deployments` in breadcrumb of deployments list page as disabled', () => {
    DeploymentList.applicationsDisabledInBreadcrumb.waitForVisible()
    expect(DeploymentList.applicationsDisabledInBreadcrumb.isVisible()).to.eql(
      true
    )
  })

  //TC_319
  it('should display deployments list page title as `My Deployments`', () => {
    expect(DeploymentList.kaPageTitle.getText()).to.eql('My Deployments')
  })

  //TC_320
  it('should display `Create new Deployment` button on top right of deployments list page', () => {
    expect(DeploymentList.kaCreateBtnInKaListPage.isVisible()).to.eql(true)
    expect(DeploymentList.kaCreateBtnInKaListPage.getText()).to.eql(
      'Create New Deployment'
    )
  })

  //TC_322
  it('should navigate user to "deployment create page", when user click on `create new deployment` button on top right of deployments list page', () => {
    DeploymentList.kaCreateBtnInKaListPage.click()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
  })

  //TC_323
  it('should verify that `create new deployment` card is entirely clickable and navigate user to "deployment create page", when user clicks the card anywhere on it', () => {
    DashboardIndex.applicationLeftnav.click()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.kaCreateCradImg.click()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.kaCreateCardText.click()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    DashboardIndex.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.kaCreateCardIconSection.click()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.kaCreateCardPlusIcon.click()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
  })

  //TC_324
  it('should verify that any deployment card is entirely clickable and navigate user to deployment manage page, when user clicks on any deployment card', () => {
    DeploymentList.getExistingKaCardImg(0).waitForVisible()
    DeploymentList.getExistingKaCardImg(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.form.isVisible()).to.eql(true)
    DeploymentManage.goBackBtn.click()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getKaNameFromKaCard(0).waitForVisible()
    DeploymentList.getKaNameFromKaCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.form.isVisible()).to.eql(true)
    DeploymentManage.goBackBtn.click()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
  })

  // //TC_325
  it.skip('should display KA cards as per workspace they are created for in KA list page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceCreate.open(ws)
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    var wsName = testData.workspace.validWorkSpaceName + currentDate.getTime()
    WorkspaceCreate.name.input.setValue(wsName)
    WorkspaceCreate.submitGlobal()
    browser.waitForVisible('button.button.dark')
    browser.click('button.button.dark')
    WorkspaceCreate.warningBtn.waitForVisible()
    WorkspaceCreate.warningBtn.click()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.form.waitForVisible()
    DashboardIndex.applicationLeftnav.click()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppName + '6' + currentDate.getTime()
    )
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.kbdropDown.waitForVisible()
    DeploymentCreate.kbdropDown.setValue(kbNameTwo)
    DeploymentCreate.getFilteredKB(kbNameTwo).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.kaCreateCardPlusIcon.click()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppNameDigit + '8' + currentDate.getTime()
    )
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.kbdropDown.waitForVisible()
    DeploymentCreate.kbdropDown.setValue(kbNameTwo)
    DeploymentCreate.getFilteredKB(kbNameTwo).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    var firstKaCard = DeploymentList.getKaNameFromKaCard(0).getText()
    var secondKaCard = DeploymentList.getKaNameFromKaCard(1).getText()
    var ws2 = Landing.workspaceSelect.getAttribute('data-test')
    browser.url(`/app/dashboard/${ws2}/kintoapps/list`)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    expect(wsName).to.eql(DashboardIndex.getWSDropdownElement(3).getText())
    expect(firstKaCard).to.eql(DeploymentList.getKaNameFromKaCard(0).getText())
    expect(secondKaCard).to.eql(DeploymentList.getKaNameFromKaCard(1).getText())
  })

  //TC_326
  it('should display newly created deployment as deployment card next to `create new deployment` card', () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.kaCreateCardPlusIcon.click()
    var kaName =
      testData.kintoapp.validKANameWithDash + '09' + currentTime.getTime() + 'd'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.kbdropDown.waitForVisible()
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(kbNameTwo)
    DeploymentCreate.getFilteredKB(kbNameTwo).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    //this validation will fail as it's a bug
    expect(DeploymentList.getKaNameFromKaCard(0).getText()).to.eql(kaName)
  })

  //TC_327
  it('should display recently modified deploymetn as deployment card next to `create new deployment` card', () => {
    DeploymentList.getCard(1).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    var kaName =
      testData.kintoapp.validKANamewithChars +
      '10' +
      currentTime.getMinutes() +
      currentTime.getSeconds() +
      'nw'
    DeploymentManage.basicInfoEditIcon.click()
    DeploymentManage.name.input.setValue(kaName)
    DeploymentManage.basicInfoSaveBtn.waitForVisible()
    DeploymentManage.basicInfoSaveBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.goBackBtn.click()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getKaNameFromKaCard(0).waitForVisible()
    expect(DeploymentList.getKaNameFromKaCard(0).getText()).to.eql(kaName)
  })
})

describe('KA 3 - List cards', () => {
  //TC_330
  it('should display icon for every deployment on new deployment creation', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    var kaName =
      testData.kintoapp.validKintoAppNameDigit +
      '11' +
      currentTime.getTime() +
      'e'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.kbdropDown.waitForVisible()
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(kbNameTwo)
    DeploymentCreate.getFilteredKB(kbNameTwo).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getExistingKaCardImg(3).waitForVisible()
    expect(DeploymentList.getKaNameFromKaCard(3).getText()).to.eql(kaName)
    expect(DeploymentList.getExistingKaCardImg(3).isVisible()).to.eql(true)
  })

  it('should create a new environment in the existing deployment', () => {
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    var envName =
      testData.Environment.allValidEnvChar + '4' + currentDate.getTime() + 'd'
    EnvironmentCreate.envNameField.setValue(envName)
    EnvironmentCreate.addNewEnvBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.getEnvCardTitle(3).waitForVisible()
    //Verifying new environment is created
    expect(envName).to.eql(
      DeploymentManage.getEnvCardTitle(3)
        .getText()
        .toLowerCase()
    )
  })

  it('should add KintoBlock to newly created environment', () => {
    DeploymentManage.getenvCardSelect(3).moveToObject()
    DeploymentManage.getenvCardSelect(3).click()
    DeploymentManage.kbdropDown.scroll()
    DeploymentManage.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    KintoBlockList.getFilteredKB('helloworld').click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.deployBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
  })

  it('should check for successfully deployment of new environment', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  //TC_331
  it('should display upto two deployed environments with their deployed version number in the deployment card, where environment name truncated after four characters', () => {
    browser.refresh()
    DeploymentManage.loadingFinished.waitForExist()
    var firstEnv = DeploymentManage.getEnvCardTitle(2)
      .getText()
      .toUpperCase()
    var secondEnv = DeploymentManage.getEnvCardTitle(3)
      .getText()
      .toUpperCase()
    DeploymentManage.goBackBtn.click()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getEnvNameFromKaCardList(0, 1).waitForVisible()
    expect(DeploymentList.getEnvNameFromKaCardList(0, 1).getText()).to.eql(
      firstEnv
    )
    expect(DeploymentList.getEnvNameFromKaCardList(0, 2).getText()).to.eql(
      secondEnv
    )
  })

  // // TC_332
  // it('should update displaying upto two deployed environments of that KA in the KA card, when re-ordering of environment is made', () => {
  //   DeploymentList.getCard(0).click()
  //   DeploymentManage.form.waitForVisible()
  //   DeploymentManage.viewEnvironments.click()
  //   EnvironmentList.envList.waitForVisible()
  //   EnvironmentList.dragAndDrop(
  //     EnvironmentList.getEnvCardTopLeftHandle(1),
  //     EnvironmentList.getEnvCardTopLeftHandle(2)
  //   )
  //   browser.sleep('2000')
  //   var firstEnv = EnvironmentList.getEnvCardTitle(1).getText()
  //   var secondEnv = EnvironmentList.getEnvCardTitle(2).getText()
  //   DashboardIndex.applicationLeftnav.click()
  //   DeploymentList.myDeploymentList.waitForVisible()
  //   //Below validation will fail as its a bug env cards don't get re ordered
  //   expect(DeploymentList.getEnvNameFromKaCardList(0, 1).getText()).to.eql(
  //     firstEnv
  //   )
  //   expect(DeploymentList.getEnvNameFromKaCardList(0, 2).getText()).to.eql(
  //     secondEnv
  //   )
  // })

  // //TC_333
  // it('should not display shutdown environment in KA card', () => {
  //   //Not implemented
  // })

  //TC_334
  // it('should display `+X` below the environments listed in KA card, where `X` is the number of environments remaining to be displayed', () => {
  //   expect(DeploymentList.getEnvNameFromKaCardList(0, 3).getText()).to.eql('+1')
  //   //Try to get environments counts by for loop, instead of hard coding value 1
  // })
  //
  //	  //TC_335
  //	  it('should display number of environments which is not visible in the KA card in `+X`, where X is which displays number of environments', () => {
  //	    //TODO Try to get environments counts by for loop, instead of hard coding X value
  //	  })
  //

  //TC_336
  it('should display deployment card title text as per deployment created or modified', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    var kaName =
      testData.kintoapp.validKintoAppNameDigit +
      '12' +
      currentTime.getTime() +
      'f'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.kbdropDown.waitForVisible()
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(kbNameTwo)
    DeploymentCreate.getFilteredKB(kbNameTwo).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getKaNameFromKaCard(4).waitForVisible()
    expect(DeploymentList.getKaNameFromKaCard(4).getText()).to.eql(kaName)
    DeploymentList.getCard(4).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.basicInfoEditIcon.click()
    var updatedKaName =
      testData.kintoapp.validUpdatedKintoAppName +
      '13' +
      currentDate.getTime() +
      'p'
    DeploymentManage.name.input.setValue(updatedKaName)
    DeploymentManage.basicInfoSaveBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getKaNameFromKaCard(4).waitForVisible()
    expect(DeploymentList.getKaNameFromKaCard(4).getText()).to.eql(
      updatedKaName
    )
  })

  it('should create KB - 1 to verify KB icon stacking on deployment card', () => {
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbNameThree = testData.kintoblock.validKBNameWithDollar + '00' + randomName
    KintoBlockCreate.name.input.setValue(kbNameThree)
    KintoBlockCreate.kbDisplayName.setValue(kbNameThree)
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
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
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
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for 100000 seconds', () => {
    browser.pause(100000)
  })

  it('should wait for 100000 seconds', () => {
    browser.pause(100000)
  })

  it('check build success for KB - 1 to verify KB icon stacking on deployment card', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should create KB - 2 to verify KB icon stacking on deployment card', () => {
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbNameFour =
      testData.kintoblock.validKintoBlockNameWithDigit + '11' + randomName
    KintoBlockCreate.name.input.setValue(kbNameFour)
    KintoBlockCreate.kbDisplayName.setValue(kbNameFour)
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
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
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
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for 100000 seconds', () => {
    browser.pause(100000)
  })

  it('should wait for 100000 seconds', () => {
    browser.pause(100000)
  })

  it('check build success for KB - 2 to verify KB icon stacking on deployment card', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_337
  it('should display upto four dependencies of deployments in stacked manner if there is more than one dependency in a deployments', () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kbdropDown.scroll()
    DeploymentManage.kbdropDown.setValue(kbNameFour)
    DeploymentManage.getFilteredKB(kbNameFour).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    browser.keys('Tab')
    DeploymentManage.kbdropDown.setValue(kbNameThree)
    DeploymentManage.getFilteredKB(kbNameThree).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    browser.pause(5000)
    DeploymentManage.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    DeploymentList.getStackedDependenciesFromKACard(1, 1).waitForVisible()
    expect(
      DeploymentList.getStackedDependenciesFromKACard(1, 1).isVisible()
    ).to.eql(true)
    expect(
      DeploymentList.getStackedDependenciesFromKACard(1, 2).isVisible()
    ).to.eql(true)
    expect(
      DeploymentList.getStackedDependenciesFromKACard(1, 3).isVisible()
    ).to.eql(true)
    expect(
      DeploymentList.getStackedDependenciesFromKACard(1, 4).isVisible()
    ).to.eql(true)
  })

  //TC_338
  // it('should display `+X` if dependencies count is more than four, where X is total count of dependencies which is not displayed', () => {
  //   //Try to get environments counts by for loop, instead of hard coding value 1
  //   expect(DeploymentList.getRemainingDependenciesCount(3).getText()).to.eql('+1')
  // })

  //	  //TC_339
  //	  it('should display remaining number of dependencies in `+X`, where X is remaining number of dependencies', () => {
  //	    //TODO Try to get environments counts by for loop, instead of hard coding X value
  //	  })

  //TC_340
  it('should display `...` button in every KA card', () => {
    expect(DeploymentList.getkaListDropDown(0).isVisible()).to.eql(true)
  })

  //TC_341
  it('should display dependencies drop down title as `Dependencies(X), where X is the total count of dependencies`', () => {
    DeploymentList.getStackedDependenciesFromKACard(1, 1).leftClick()
    DeploymentList.kaListDropDown.waitForVisible()
    //For now hard coding the count
    expect(DeploymentList.getDependenciesDropDownTitle(1).getText()).to.eql(
      'Dependencies (4)'
    )
  })

  // //TC_342
  // it('should display total count of dependencies currently in KA, where X in `Dependencies(X)` is total count', () => {
  //   //TODO Try to get environments counts by for loop, instead of hard coding X value
  // })

  // //TC_343
  // it('should display dependencies drop down as a scrollable list', () => {
  //   //TODO Need clarification on how to check whether its scrollable or not
  // })

  //TC_344
  it.skip('should display edit branch, edit branch icon, view all tags, compare versions and view environments, when user clicks on `...` button in any KA card', () => {
    DeploymentList.getkaListDropDown(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    expect(DeploymentList.getEditDraftFromDropDown(0).isVisible()).to.eql(true)
    expect(DeploymentList.getEditDraftIcon(0).isVisible()).to.eql(true)
    expect(DeploymentList.getKaListDropDownViewTags(0).isVisible()).to.eql(true)
    expect(DeploymentList.getCompareVersionsFromDropDown(0).isVisible()).to.eql(
      true
    )
    expect(DeploymentList.getKaAppListViewEnv(0).isVisible()).to.eql(true)
  })

  //TC_345
  it.skip('should display search bar field, draft text, draft icon, tag of environments and scrollable list of tags via view all tags options', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getkaListDropDown(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getKaListDropDownViewTags(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    expect(DeploymentList.getSearchFieldFromKaDropDown(0).isVisible()).to.eql(
      true
    )
    expect(DeploymentList.getDraftFromViewTags(0).getText()).to.eql('Draft')
    expect(DeploymentList.getDraftIconFromViewTags(0).isVisible()).to.eql(true)
    expect(
      DeploymentList.getTaggedVersionNumberFromKaDropDown(0, 2).isVisible()
    ).to.eql(true)
  })

  //TC_346
  it('should display dependencies drop down, when user clicks on stacked dependencies icon or `+X` icon next to stacked dependencies', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getStackedDependenciesFromKACard(1, 2).leftClick()
    expect(DeploymentList.getDependenciesDropDown(1).isVisible()).to.eql(true)
  })

  // //TC_349
  // it('should navigate to KB manage page, when user clicks on any dependencies from dependencies drop down', () => {
  //   //TODO Not implemented
  // })

  // //TC_350
  // it('should display grey high light for any row for drop down which is visible, when user clicks on `...` button in any KA card', () => {
  //   //TODO
  // })

  //TC_351
  it.skip('should navigate user to KA manage page, when user clicks on `edit draft` option which appears via `...` button in any KA card', () => {
    var kaName = DeploymentList.getKaNameFromKaCard(0).getText()
    DeploymentList.getkaListDropDown(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getEditDraftFromDropDown(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.form.waitForVisible())
    expect(kaName).to.eql(DeploymentManage.title.getText())
  })

  //TC_352
  it.skip('should replace first drop down displayed via `...` button in any KA card with drop down visible via `view all tags` drop down', () => {
    DashboardIndex.applicationLeftnav.click()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getkaListDropDown(0).waitForVisible()
    DeploymentList.getkaListDropDown(0).click()
    //first drop down
    DeploymentList.kaListDropDown.waitForVisible()
    expect(DeploymentList.kaListDropDown.isVisible()).to.eql(true)
    DeploymentList.getKaListDropDownViewTags(0).click()
    //second drop down
    DeploymentList.getSearchFieldFromKaDropDown(0).waitForVisible()
    expect(DeploymentList.getSearchFieldFromKaDropDown(0).isVisible()).to.eql(
      true
    )
  })

  //TC_353
  it.skip('should navigate user to version page of that KA, when user clicks on `compare versions` option via `...` button in any KA card', () => {
    DeploymentList.getkaListDropDown(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    //This fails as compare versions is removed in alpha release
    DeploymentList.getCompareVersionsFromDropDown(0).click()
    DeploymentList.loadingFinished.waitForExist()
    //TODO  for now it navigates to change logs page
  })

  //TC_354
  it.skip('should allow user to filter tags via search field displayed, search field visible via `view all tags` drop down', () => {
    DashboardIndex.applicationLeftnav.click()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getkaListDropDown(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getKaListDropDownViewTags(0).click()
    DeploymentList.getSearchFieldFromKaDropDown(0).waitForVisible()
    DeploymentList.getSearchFieldFromKaDropDown(0).setValue('1')
    //During search tag item index starts from index (1), previously env deployed build 1.2.4
    DeploymentList.getTaggedVersionNumberFromKaDropDown(0, 1).waitForVisible()
    expect(
      DeploymentList.getTaggedVersionNumberFromKaDropDown(0, 1).isVisible()
    ).to.eql(true)
  })

  //TC_356
  it.skip('should navigate user to KA manage page, when user clicks on `draft` which is visible via `view all tags` drop down', () => {
    var kaName = DeploymentList.getKaNameFromKaCard(0).getText()
    DeploymentList.getkaListDropDown(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getKaListDropDownViewTags(0).click()
    DeploymentList.getSearchFieldFromKaDropDown(0).waitForVisible()
    DeploymentList.getDraftFromViewTags(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.form.isVisible()).to.eql(true)
    expect(kaName).to.eql(DeploymentManage.title.getText())
  })

  //TC_357
  it.skip('should navigate user to KA manage page of selected tag version which is visible via `view all tags` drop down', () => {
    DashboardIndex.applicationLeftnav.click()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    var kaName = DeploymentList.getKaNameFromKaCard(0).getText()
    DeploymentList.getkaListDropDown(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getKaListDropDownViewTags(0).click()
    DeploymentList.getSearchFieldFromKaDropDown(0).waitForVisible()
    var tagVersion = DeploymentList.getTaggedVersionNumberFromKaDropDown(
      0,
      2
    ).getText()
    DeploymentList.getTaggedVersionNumberFromKaDropDown(0, 2).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(kaName).to.eql(DeploymentManage.title.getText())
    expect(tagVersion).to.eql(
      DeploymentManage.tagVersionFromBreadcrumb.getText()
    )
  })

  //TC_358 TO DO
  //  it('should not allow user to edit other than basic info and cross version in KA manage page of selected tag versions', () => {
  //    DeploymentManage.name.input.setValue(testData.kintoapp.validKANameWithDash)
  //    DeploymentManage.description.input.setValue(
  //      testData.kintoapp.validKintoAppDescription
  //    )
  //    //Need clarification for cross versions
  //    expect(DeploymentManage.saveChangesBtn.getText()).to.eql('Save Changes')
  //    expect(DeploymentCreate.kbdropDown.isVisible()).to.eql(false)
  //    DashboardIndex.applicationLeftnav.waitForVisible()
  //    browser.pause(5000)
  //    DashboardIndex.applicationLeftnav.click()
  //    browser.alertAccept()
  //  })

  //TC_359
  it.skip('should make disappear drop downs visible via KA card, when user clicks any where on page other than on KA card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getkaListDropDown(0).waitForVisible()
    DeploymentList.getkaListDropDown(0).click()
    //first drop down
    DeploymentList.kaListDropDown.waitForVisible()
    expect(DeploymentList.getEditDraftFromDropDown(0).isVisible()).to.eql(true)
    DeploymentManage.kaListPageFromKaManagePage.click()
    expect(DeploymentList.kaListDropDown.isVisible()).to.eql(false)
    DeploymentList.getkaListDropDown(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getKaListDropDownViewTags(0).click()
    //second drop down
    DeploymentList.getSearchFieldFromKaDropDown(0).waitForVisible()
    expect(DeploymentList.getSearchFieldFromKaDropDown(0).isVisible()).to.eql(
      true
    )
    DeploymentManage.kaListPageFromKaManagePage.click()
    expect(DeploymentList.kaListDropDown.isVisible()).to.eql(false)
    //Third drop down
    DeploymentList.getStackedDependenciesFromKACard(1, 3).leftClick()
    DeploymentList.getDependenciesDropDown(1).waitForVisible()
    expect(DeploymentList.getDependenciesDropDown(1).isVisible()).to.eql(true)
    DeploymentManage.kaListPageFromKaManagePage.click()
    expect(DeploymentList.kaListDropDown.isVisible()).to.eql(false)
  })
})

describe('KA 4 - Breadcrumb Dropdown Components', () => {
  //TC_582
  it.skip('should navigate user to "Edit Dependencies" page, when user clicks on `Edit dependencies` button in the dependencies component', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    var editDep = DeploymentManage.editDepBtn.getAttribute('href')
    browser.url(editDep)
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.environmentDefaultsTextFromBreadcrumb.waitForVisible()
    expect(
      DeploymentManage.environmentDefaultsTextFromBreadcrumb.getText()
    ).to.eql('Environment Defaults')
  })

  //TC_583
  //Commented as there is no icon like that in alpha release
  it.skip('should navigate user to "Edit Dependencies" page, when user clicks on `edit icon` displayed below "Edit Dependencies" button', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.editDependenciesIconBelowBtnRow.click()
    DeploymentManage.environmentDefaultsTextFromBreadcrumb.waitForVisible()
    expect(
      DeploymentManage.environmentDefaultsTextFromBreadcrumb.getText()
    ).to.eql('Environment Defaults')
  })

  //TC_584
  it.skip('should navigate user to "Edit Dependencies" page, when user clicks on `edit icon` of any dependency card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    var editDep = DeploymentManage.getEditDepIconFromDepCard(2).getAttribute(
      'href'
    )
    browser.url(editDep)
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.environmentDefaultsTextFromBreadcrumb.waitForVisible()
    expect(
      DeploymentManage.environmentDefaultsTextFromBreadcrumb.getText()
    ).to.eql('Environment Defaults')
  })

  //TC_589
  it.skip('should display environment defaults switcher drop down, when user clicks `...` next to `Environment Defaults` text in edit dependencies page breadcrumb', () => {
    DeploymentManage.environmentDefaultsDropDown.click()
    DeploymentManage.kaDropDownVisible.waitForVisible()
    expect(DeploymentManage.kaDropDownVisible.isVisible()).to.eql(true)
  })

  //   //TC_607
  //   it('should verify that environment defaults switcher drop down list is a scroll-able list',()=>{
  //       //TODO
  //   })

  // //TC_608
  // it('should display environments of the selected KA with their currently deployed tag in environment defaults drop down, like 5 environments at a time',()=>{
  //     //TODO
  // })

  //TC_609
  it.skip('should display "Environment Default" option selected as default in the environment defaults drop down', () => {
    //Already environment default is selected as default option
    DeploymentManage.environmentDefaultsTextFromBreadcrumb.waitForVisible()
    expect(
      DeploymentManage.environmentDefaultsTextFromBreadcrumb.getText()
    ).to.eql('Environment Defaults')
  })

  //TC_610
  it.skip('should verify that "Environment defaults" text is replaced with selected environment text from ennironment defaults drop down', () => {
    //Previously it was Environment Defaults
    DeploymentManage.getEnvironmentDefaultsDropDownEnvText(2).waitForVisible()
    var envName = DeploymentManage.getEnvironmentDefaultsDropDownEnvText(
      2
    ).getText()
    DeploymentManage.getEnvironmentDefaultsDropDownEnvText(2).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.environmentDefaultsTextFromBreadcrumb.waitForVisible()
    expect(
      DeploymentManage.environmentDefaultsTextFromBreadcrumb.getText()
    ).to.eql(envName)
  })

  //TC_585
  it('should display deployment switcher drop down, when user clicks on `...` next to deployment name in deployment manage page breadcrumb', () => {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaListDropDownBtn.waitForVisible()
    DeploymentManage.kaListDropDownBtn.click()
    DeploymentManage.kaDropDownVisible.waitForVisible()
    expect(DeploymentManage.kaDropDownVisible.isVisible()).to.eql(true)
  })

  //TC_590
  it('should allow user to filter KA list using the search filter in application switcher drop down', () => {
    var title = DeploymentManage.title.getText().split(' - ')
    DeploymentManage.searchFilterInAppSwitcherDropDown.setValue(title[0])
    DeploymentManage.getKaNameFromDropDown(1).waitForVisible()
    expect(DeploymentManage.getKaNameFromDropDown(1).getText()).to.eql(title[0])
  })

  //   //TC_591
  //   it('should verify that application switcher drop down list is a scroll-able list',()=>{
  //       //TODO
  //   })

  //    //TC_592
  //    it('should display all KA in the application drop down list of the workspace, like 5 KA visiable at a time',()=>{
  //     //TODO
  //    })

  //TC_586
  it.skip('should display draft/tag switcher drop down, when user clicks on `...` next to draft text in KA manage page breadcrumb', () => {
    //Already in KA manage page
    DeploymentManage.draftDropDownFromBreadcrumb.waitForVisible()
    DeploymentManage.draftDropDownFromBreadcrumb.click()
    DeploymentManage.draftDropDownVisible.waitForVisible()
    expect(DeploymentManage.draftDropDownVisible.isVisible()).to.eql(true)
  })

  //TC_593
  it.skip('should allow user to filter draft/tags in search filter of draft/tag switcher drop down', () => {
    DeploymentManage.draftDropDownFilter.setValue('draft')
    DeploymentManage.draftOptionFromDraftDropDown.waitForVisible()
    expect(DeploymentManage.draftOptionFromDraftDropDown.getText()).to.eql(
      'draft'
    )
    DeploymentManage.draftDropDownFilter.setValue('1.2.4')
    DeploymentManage.getTagNumberFromDraftDropDown(1).waitForVisible()
    expect(DeploymentManage.getTagNumberFromDraftDropDown(1).getText()).to.eql(
      '1.2.4'
    )
  })

  //   //TC_594
  //   it('should verify that draft/tag switcher drop down list is scroll-able list',()=>{
  //     //TODO
  //   })

  // //TC_595
  // it('should display previous tags of the selected KA, like 2 tags at a time',()=>{
  //     //TODO
  // })

  //TC_596
  it.skip('should display tag number, time & date and notes ( if entered ) for every tag in draft/tag switcher drop down', () => {
    expect(
      DeploymentManage.getTagNumberFromDraftDropDown(1).isVisible()
    ).to.eql(true)
    expect(DeploymentManage.getTagDateFromTagDropDown(1).isVisible()).to.eql(
      true
    )
    expect(DeploymentManage.getTagNotesFromTagDropDown(1).isVisible()).to.eql(
      true
    )
  })

  //TC_587
  it.skip('should display environment switcher drop down, when user clicks on `...` next to environment name in environment edit page breadcrumb', () => {
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEditEnv(1).click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.breadcrumbEnv.click()
    EnvironmentManage.breadcrumbEnvDropDown.waitForVisible()
    expect(EnvironmentManage.breadcrumbEnvDropDown.isVisible()).to.eql(true)
  })

  //TC_597
  it.skip('should allow user to filter environments in search filter of environment switcher drop down', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.viewEnvironments.waitForVisible()
    DeploymentManage.viewEnvironments.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.envList.waitForVisible()
    EnvironmentList.getEnvCardTitle(2).waitForVisible()
    var envName = EnvironmentList.getEnvCardTitle(2).getText()
    EnvironmentList.getEditEnv(1).click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envSwitcher.waitForVisible()
    EnvironmentManage.envSwitcher.click()
    EnvironmentManage.searchFilterInEnvSwitcherDropDown.setValue(envName)
    EnvironmentManage.getbreadCrumbEnvText(1).waitForVisible()
    expect(EnvironmentManage.getbreadCrumbEnvText(1).getText()).to.eql(envName)
  })

  //    //TC_598
  //    it('should verify that environment switcher drop down list is scroll-able list',()=>{
  //        //TODO
  //    })

  // //TC_599
  // it('should display all the environments of the selected KA, like 4 environment visible at a time',()=>{
  //     //TODO
  // })

  // //TC_600
  // it('should verify that environment doesn`t display tag in environment switcher drop down, if the environment is not yet deployed',()=>{
  //     //TODO
  // })

  // //TC_601
  // it('should verify that environment displays its current deployed tag in environment switcher drop down',()=>{
  //     //TODO
  // })

  //TC_602
  it.skip('should verify that environment edit page title changes as per environment selected from environment switcher drop down', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    var kaName = DeploymentList.getKaNameFromKaCard(0).getText()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.viewEnvironments.waitForVisible()
    DeploymentManage.viewEnvironments.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.envList.waitForVisible()
    EnvironmentList.getEditEnv(1).waitForVisible()
    EnvironmentList.getEditEnv(1).click()
    EnvironmentManage.loadingFinished.waitForExist()
    var envOne = EnvironmentManage.envNameFromBreadcrumb.getText()
    expect(kaName + ' - ' + envOne).to.eql(EnvironmentManage.envTitle.getText())
    EnvironmentManage.envSwitcher.waitForVisible()
    EnvironmentManage.envSwitcher.click()
    EnvironmentManage.getbreadCrumbEnvText(2).waitForVisible()
    var envTwo = EnvironmentManage.getbreadCrumbEnvText(2).getText()
    EnvironmentManage.getbreadCrumbEnv(2).click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envTitle.waitForVisible()
    expect(kaName + ' - ' + envTwo).to.eql(EnvironmentManage.envTitle.getText())
  })

  //TC_588
  it.skip('should display log switcher drop down, when user clicks on `...` next to tag number in logs page breadcrumb', () => {
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).waitForVisible()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.logsTableTitle.waitForVisible()
    EnvironmentList.tagsDropDownInLogsPage.click()
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    expect(EnvironmentList.tagsDropDownIsShown.isVisible()).to.eql(true)
  })

  //    //TC_603
  //    it('should verify that log switcher drop down list is a scroll-able list',()=>{
  //        //TODO
  //    })

  // //TC_604
  // it('should verify that previous tags of KA are displayed in log switcher drop down, like 4 to 5 tags at a time',()=>{
  //     //TODO
  // })

  //TC_605
  it.skip('should allow user to filter tags in the search filter of log switcher drop down', () => {
    EnvironmentList.tagsSearchField.setValue('1.2.4')
    EnvironmentList.getTagsFromTagsDropDownList(1).waitForVisible()
    expect(EnvironmentList.getTagsFromTagsDropDownList(1).getText()).to.eql(
      '1.2.4'
    )
  })

  // //TC_606
  // it('should display tag number, time & date and notes ( if entered ) for every tag in log switcher drop down list', () => {
  //     //Not implemented
  // })
})

describe('KA 5 - Create/Edit Page', () => {
  it('should create a KB for checking Auto Deploy in deployment', () => {
    Login.logout()
    secondUser = Login.registerAndLogin('CP')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForVisible()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs1,
      'Create new repository',
      'GittestCC'
    )
  })

  it('should wait for KB created for Auto Deploy check to reach Success', () => {
    browser.pause(100000)
  })

  it('should wait for KB created for Auto Deploy check to reach Success', () => {
    browser.pause(100000)
  })

  it('should verify build of KB created for Auto Deploy check reached Success', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_360
  it('should blue highlight `Applications` in the left navigation bar on click and when user click on `+` next to applications navigates to KA create page', () => {
    DashboardIndex.open(ws)
    DashboardIndex.loadingFinished.waitForExist()
    browser.moveToObject('.kintoapps')
    //TODO check blue highlight of applications
    DashboardIndex.kaHoveraddicon.click()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
    DeploymentCreate.loadingFinished.waitForExist()
  })

  it('should verify "Auto Deploy" toggle is disabled by default in Deployment create page', () => {
    expect(DeploymentCreate.autoDeployState.getValue()).to.eql('false')
  })

  it('should create the first deployment for the second sign-up', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    var KBName = KintoBlockManage.kbNameInBreacdcrumb.getText()
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    var kaName =
      testData.kintoapp.validKintoAppNamePrimeNumbers +
      '45' +
      currentDate.getTime() +
      'g'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(KBName)
    DeploymentCreate.getFilteredKB(KBName).waitForVisible()
    DeploymentCreate.getFilteredKB(KBName).click()
    DeploymentCreate.loadingFinished.waitForExist()
    browser.pause(2000)
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.amazingBtn.waitForExist()
    DeploymentManage.amazingBtn.click()
  })

  it('should verify dedicated "Copy" button is displayed for "ClientID" and "SecretKey" beside Deployment title in Deployment manage page', () => {
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.copyBtnInTitle.isVisible()).to.eql(true)
    expect(DeploymentManage.secretKeyBtnInTitle.isVisible()).to.eql(true)
  })

  it('should verify dedicated "Copy" button is displayed for "ClientID" and "SecretKey" API access section in Deployment manage page', () => {
    expect(DeploymentManage.copyBtnInAPIAccess.isVisible()).to.eql(true)
    expect(DeploymentManage.secretKeyBtnInAPIAccess.isVisible()).to.eql(true)
  })

  it('should verify "External Access, Interna Access & Public & Webhook Access" are displayed under API access section', () => {
    expect(DeploymentManage.getDiffApiAccess(1).isVisible()).to.eql(true)
    expect(DeploymentManage.getDiffApiAccess(1).getText()).to.eql(
      'External Access'
    )
    expect(DeploymentManage.getDiffApiAccess(2).isVisible()).to.eql(true)
    expect(DeploymentManage.getDiffApiAccess(2).getText()).to.eql(
      'Internal Access'
    )
    expect(DeploymentManage.getDiffApiAccess(3).isVisible()).to.eql(true)
    expect(DeploymentManage.getDiffApiAccess(3).getText()).to.eql(
      'Public & Webhook Access'
    )
  })

  it('should verify "Auto Deploy" toggle is disabled, when its disabled while deployment creation', () => {
    //In previous script Auto deploy is disabled while creation
    //Initially Auto Deploy value is null
    expect(DeploymentCreate.autoDeployState.getValue()).to.eql('')
  })

  it('should allow user to change "Auto Deploy" setting in deployment manage page', () => {
    //Previous state of Auto deploy is null in manage page
    browser.scroll(0, 800)
    DeploymentCreate.autoDeploySwitch.click()
    browser.pause(2000)
    expect(DeploymentCreate.autoDeployState.getValue()).to.eql('true')
    DeploymentCreate.autoDeploySwitch.click()
    browser.pause(2000)
    expect(DeploymentCreate.autoDeployState.getValue()).to.eql('false')
  })

  it('checking deployment reached success for deployment created in the second sign-up', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should do a new commit for KB', () => {
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.openRepoBtn.scroll(0, 600)
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[1])
    browser.pause(3000)
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
    browser.pause(5000)
    browser.switchTab(tabIds[0])
    browser.pause(5000)
  })

  it('should wait for new commit build to reach success', () => {
    browser.pause(100000)
  })

  it('should check build of new commit reached success', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should verify whether new deployment is not generated for a new commit in KintoBlock added to deployment', () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.deploymentInitiative.isVisible()).to.eql(false)
  })

  //TC_361
  it('should navigate to KA create page, when user clicks on `create new application` button via KA manage breadcrumb', () => {
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaListDropDownBtn.click()
    DeploymentManage.kaDropDownVisible.waitForVisible()
    DeploymentManage.createNewKaBtnInBreadcrumb.click()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
  })

  it('should create a deployment to check Auto Deployment', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    var KBName = KintoBlockManage.kbNameInBreacdcrumb.getText()
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppNamePrimeNumbers +
        '654' +
        currentDate.getTime() +
        'g'
    )
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(KBName)
    DeploymentCreate.getFilteredKB(KBName).waitForVisible()
    DeploymentCreate.getFilteredKB(KBName).click()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.autoDeploySwitch.click()
    browser.pause(2000)
    expect(DeploymentCreate.autoDeployState.getValue()).to.eql('true')
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
  })

  it('should verify "Auto Deploy" switch is enabled, when it is enabled during creation', () => {
    //Enabled in previous script
    expect(DeploymentCreate.autoDeployState.getValue()).to.eql('true')
  })

  it('should enable Auto Deploy switch and Helloworld KB to deployment', () => {
    browser.scroll(0, 600)
    DeploymentManage.kbdropDown.scroll()
    DeploymentManage.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB(
      testData.kintoblock.validHelloWorldKB
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockList.getFilteredKB(testData.kintoblock.validHelloWorldKB).click()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.autoDeploySwitch.click()
    browser.pause(2000)
    expect(DeploymentCreate.autoDeployState.getValue()).to.eql('true')
    DeploymentManage.deployBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
  })

  it('static wait for checking deployment success', () => {
    browser.pause(100000)
  })

  it('check deployment to check Auto Deploy is deployed successfully', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should do a new commit for checking Auto Deploy in deployments', () => {
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.openRepoBtn.scroll(0, 600)
    KintoBlockManage.openRepoBtn.leftClick()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[2])
    browser.pause(3000)
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
    browser.pause(5000)
    browser.switchTab(tabIds[0])
    browser.pause(5000)
  })

  it('should wait for new commit build to reach success', () => {
    browser.pause(100000)
  })

  it('should check build of new commit reached success', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should verify whether new deployment is generated for a new commit in KintoBlock added to deployment', () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.deploymentInitiative.waitForVisible()
    browser.pause(20000)
    expect(DeploymentManage.getenvCardVerNumber(2).isVisible()).to.eql('0.0.3')
  })

  //TC_362
  it('should navigate to deployment manage page, when user clicks on any deployment from drop down visible via `...` button next to deployment name in deployment manage page breadcrumb', () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaListDropDownBtn.click()
    DeploymentManage.kaDropDownVisible.waitForVisible()
    var kaName = DeploymentManage.getKaNameFromDropDown(1).getText()
    DeploymentManage.getKaFromBreadcrumbDropDown(1).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    var title = DeploymentManage.title.getText().split(' - ')
    expect(title[0]).to.eql(kaName)
  })

  //TC_363
  it('should navigate user to deployment create page, when user enters URL of deployment create page', () => {
    //Previously where are in KA manage page
    expect(DeploymentManage.form.isVisible()).to.eql(true)
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
  })

  //TC_364
  it('should navigate to deployment manage page, when user enters URL of deployment manage page', () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    var kaName = DeploymentManage.title.getText()
    var url = DeploymentManage.getUrl()
    //Redirecting to KA create page
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    //Entering the manage page url
    browser.url(url)
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.form.isVisible()).to.eql(true)
    expect(DeploymentManage.title.getText()).to.eql(kaName)
  })

  //TC_365
  it.skip('should navigate user to deployment manage page, when user clicks on draft option from draft drop down visible via `...` button next to draft in breadcrumb', () => {
    //Already in KA manage page
    DeploymentManage.draftDropDownFromBreadcrumb.leftClick()
    DeploymentList.kaListDropDown.waitForVisible()
    var tag = DeploymentManage.getTagNumberFromDraftDropDown(2).getText()
    DeploymentManage.getTagNumberFromDraftDropDown(2).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.tagNumberFromBreadcrumb.getText()).to.eql(tag)
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentManage.draftOptionFromDraftDropDown.click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.form.isVisible()).to.eql(true)
    DeploymentManage.draftTextFormBreadcrumb.waitForVisible()
    expect(DeploymentManage.draftTextFormBreadcrumb.getText()).to.eql('draft')
  })

  //TC_366
  it('sdhould display deployment create page title as `Create New Deployment`', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.createKintoAppTitle.getText()).to.eql(
      'Create New Deployment'
    )
  })

  //TC_383
  it('should verify that `Create New Deployment` button on bottom right of Deployment create page is disabled/unclickable', () => {
    expect(DeploymentCreate.submitBtn.isEnabled()).to.eql(false)
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.invalidThreeCharKaName
    )
    browser.pause(2000)
    expect(DeploymentCreate.submitBtn.getText()).to.eql('Create New Deployment')
  })

  //TC_385
  it('should verify that `Create New Deployment` is only clickable, but not creating deployment. If validation condition fails', () => {
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.invalidThreeCharKaName
    )
    browser.keys('Tab')
    expect(DeploymentCreate.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.invalidKintoAppDescription
    )
    browser.keys('Tab')
    expect(DeploymentCreate.shortDescription.error.getText()).to.eql(
      'Must be 200 characters or less'
    )
    expect(
      DeploymentCreate.kaCreateNewApplicationBtnDisabled.isVisible()
    ).to.eql(false)
  })

  it('should display validation error `The first character can`t be a digit`, when user enter number as first character in deployment name field of deployment create page', () => {
    DeploymentManage.name.input.setValue(
      testData.kintoapp.invalidKintoAppNameFirstCharNumber
    )
    expect(DeploymentManage.name.error.getText()).to.eql(
      `The first character can't be a digit`
    )
  })

  //TC_367
  it('should display deployment manage page title as per deployment selected', () => {
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    var kaName = DeploymentList.getKaNameFromKaCard(0).getText()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    var title = DeploymentManage.title.getText().split(' - ')
    expect(title[0]).to.eql(kaName)
  })

  //TC_368
  it('should display projects members bar in deployment create page', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.membersToolBar.isVisible()).to.eql(true)
  })

  //TC_370
  it('should display basic component in deployment create page', () => {
    expect(DeploymentCreate.basicInfoComponent.isVisible()).to.eql(true)
  })

  //TC_372
  it('should display dependencies component in deployment create page', () => {
    expect(DeploymentCreate.dependenciesComponent.isVisible()).to.eql(true)
  })

  //TC_374
  it('should display validation error `Must be 3 characters or more`, when KA name is less than 3 characters in deployment create page', () => {
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.invalidThreeCharKaName
    )
    browser.keys('Tab')
    expect(DeploymentCreate.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  //TC_376
  it('should display validation error `Must be 24 characters or less`, when deployment name is more than 24 characters in deployment create page', () => {
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.invalidThirtyFiveCharKaName
    )
    browser.keys('Tab')
    expect(DeploymentCreate.name.error.getText()).to.eql(
      'Must be 24 characters or less'
    )
  })

  //TC_378
  it('should display valiadation error `Only lowercase characters and digits are allowed`, when user enters other than letters in lowercase and numbers in deployment name field of deployment manage page', () => {
    DeploymentCreate.name.input.setValue(testData.kintoapp.allInvalidKaChars)
    DeploymentCreate.name.error.waitForVisible()
    expect(DeploymentCreate.name.error.getText()).to.eql(
      `Must consist of alphanumeric characters, '-', '_' or '.'`
    )
  })

  //TC_380
  it('should do validation blur if user enters valid data in deployment name field of deployment create page in second try', () => {
    //Previously name field is showing validation error
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppName + 'p'
    )
    expect(DeploymentCreate.name.error.isVisible()).to.eql(false)
  })

  //TC_382
  it('should display `Create New Deployment` button on bottom right of deployment create page', () => {
    expect(DeploymentCreate.submitBtn.getText()).to.eql('Create New Deployment')
    expect(DeploymentCreate.submitBtn.isVisible()).to.eql(true)
  })

  //TC_388
  it('should navigate to deployment create page, when user clicks on `+` icon of applicatons in side bar while user is in deployment create page with validation errors', () => {
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.invalidThreeCharKaName
    )
    browser.keys('Tab')
    expect(DeploymentCreate.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
    DashboardIndex.kaHoveraddicon.click()
    browser.alertAccept()
    browser.pause(10000)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.name.error.isVisible()).to.eql(false)
  })

  //TC_369
  it('should diplay projects members bar in deployment manage page', () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentCreate.membersToolBar.isVisible()).to.eql(true)
  })

  //TC_371
  it('should display basic info component in deployment manage page', () => {
    DeploymentManage.basicInfoEditIcon.click()
    expect(DeploymentManage.basicInfoPopUp.isVisible()).to.eql(true)
  })

  //TC_373
  it('should display dependencies component in deployment manage page', () => {
    expect(DeploymentCreate.dependenciesComponent.isVisible()).to.eql(true)
  })

  //TC_386
  it.skip('should verify that `Tag and Deploy` button is changes to `save changes` button, when user edits in deployment manage page', () => {
    expect(DeploymentManage.kaTagNDeploy.getText()).to.eql('Tag and Deploy')
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKANamewithChars +
        '14' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'q'
    )
    expect(DeploymentManage.submitBtn.getText()).to.eql('Save Changes')
  })

  //TC_387
  it.skip('should verify that `save changes` button is changes to `Tag and Deploy` button, when user clicks on `save changes` after editing', () => {
    //Already its save changes button only
    DeploymentManage.submitGlobal()
    browser.pause(3000)
    expect(DeploymentManage.kaTagNDeploy.getText()).to.eql('Tag and Deploy')
  })

  //TC_388
  it.skip('should verify that `save changes` button is clickable, but doesn`t save the changes if validation conditions are not met', () => {
    DeploymentManage.name.input.setValue(
      testData.kintoapp.invalidThreeCharKaName
    )
    browser.keys('Tab')
    expect(DeploymentManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.invalidKintoAppDescription
    )
    DeploymentManage.submitGlobal()
    expect(DeploymentCreate.shortDescription.error.getText()).to.eql(
      'Must be 200 characters or less'
    )
    expect(DeploymentManage.submitBtn.getText()).to.eql('Save Changes')
    DeploymentManage.submitGlobal()
    expect(DeploymentManage.submitBtn.getText()).to.eql('Save Changes')
  })

  //TC_375
  it('should display validation error `Must be 3 characters or more`, when deployment name is less than 3 characters in deployment manage page', () => {
    DeploymentManage.name.input.setValue(
      testData.kintoapp.invalidThreeCharKaName
    )
    browser.keys('Tab')
    expect(DeploymentManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  //TC_377
  it('should display validation error `Must be 24 characters or less`, when KA name is more than 24 characters in deployment manage page', () => {
    DeploymentManage.name.input.setValue(
      testData.kintoapp.invalidThirtyFiveCharKaName
    )
    browser.keys('Tab')
    expect(DeploymentManage.name.error.getText()).to.eql(
      'Must be 24 characters or less'
    )
  })

  //TC_379
  it('should display valiadation error `Only lowercase characters and digits are allowed`, when user enters other than letters in lowercase and numbers in deployment name field of deployment manage page', () => {
    DeploymentManage.name.input.setValue(testData.kintoapp.allInvalidKaChars)
    DeploymentManage.name.error.waitForVisible()
    expect(DeploymentManage.name.error.getText()).to.eql(
      `Must contain only lowercase characters and digits`
    )
  })

  // TC_381
  it('should do validation blur if user enters valid data in deployment name field of deployment manage page in second try', () => {
    //Previously name field is showing validation error
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKintoAppName + '15' + currentDate.getTime() + 'o'
    )
    expect(DeploymentManage.name.error.isVisible()).to.eql(false)
    DeploymentManage.basicInfoCancelBtn.click()
    DeploymentManage.form.waitForVisible()
    // DashboardIndex.applicationLeftnav.click()
    // browser.alertAccept()
    // DeploymentList.loadingFinished.waitForExist()
    // DeploymentList.myDeploymentList.waitForVisible()
  })
})

describe('KA 6 - Basic info component', () => {
  //TC_410
  it('should verify basic info component fields are empty on opening deployment create form', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.nameField.getText()).to.eql('')
    expect(DeploymentCreate.shortDescription.input.getText()).to.eql('')
  })

  //TC_389
  it('should display title as `Basic Info` for basic info component in deployment create page', () => {
    expect(DeploymentCreate.basicInfoComponentTitle.getText()).to.eql(
      'Basic Info'
    )
  })

  //TC_392
  it('should display  subtitle as "Choose the name for this application and give a a short description. If you make the application public, this will help other people discover your application." in deployment create page.', () => {
    expect(DeploymentCreate.basicInfoComponentSubtitle.getText()).to.eql(
      'Choose the name for this deployment and give a a short description.'
    )
  })

  //TC_395
  it('should display titles for text fields in basic info component of deployment create page', () => {
    expect(DeploymentCreate.basicInfoComponentNameFieldTitle.getText()).to.eql(
      'DEPLOYMENT NAME'
    )
    var descriptionTitle = DeploymentCreate.basicInfoComponentDescriptionFieldTitle
      .getText()
      .split('\n')
    expect(descriptionTitle[0]).to.eql('DESCRIPTION')
  })

  // //TC_398
  // it('should display one line input field and text area field under basic info component in KA create page', () => {
  //   $("input#name").each(function () {
  //     var $this = $(this);
  //     if ($this.is("input")) {
  //       return true;
  //     }
  //     else if ($this.is("textarea")) {
  //       return false;
  //     }
  //   });
  //   $("textarea#shortDescription").each(function () {
  //     var $this = $(this);
  //     if ($this.is("input")) {
  //       return false;
  //     }
  //     else if ($this.is("textarea")) {
  //       return true;
  //     }
  //   });
  // })

  //TC_401
  it('should display placeholder text as `enter a name for your application` in application name field of deployment create page', () => {
    expect(DeploymentCreate.nameField.getAttribute('placeholder')).to.eql(
      'Enter the deployment name'
    )
  })

  //TC_404
  it('should display placeholder text as `enter a short description of your application` in description text area of deployment create page', () => {
    expect(
      DeploymentCreate.shortDescription.input.getAttribute('placeholder')
    ).to.eql('Enter a short description')
  })

  //TC_407
  it('should validate text fields in basic info component in deployment create page with blur', () => {
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppName + '11' + currentDate.getTime()
    )
  })

  //TC_411
  it('should verify that `create new application` button is enabled/clickable', () => {
    expect(
      DeploymentCreate.kaCreateNewApplicationBtnDisabled.isVisible()
    ).to.eql(false)
  })

  //TC_412
  it.skip('should dispaly validation error message `Required`, when user clicks `create new application` without entering application description', () => {
    DeploymentCreate.submitGlobal()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.shortDescription.error.waitForVisible()
    expect(DeploymentCreate.shortDescription.error.getText()).to.eql('Required')
  })

  //TC_419
  it('should display max count `200` above top right of application description text box in deployment create page', () => {
    expect(DeploymentManage.appDescriptonMaxCount.getText()).to.eql('200')
  })

  //TC_422
  it('should verify that max count `200` of application description in deployment create page reduces as per text entereded', () => {
    DeploymentManage.description.input.leftClick()
    DeploymentManage.description.input.setValue('a')
    expect(DeploymentManage.appDescriptonMaxCount.getText()).to.eql('199')
  })

  //TC_425
  it.skip('should display text `owner` for user of that kintohub account in members tool bar of deployment create page', () => {
    expect(DeploymentCreate.ownerTextFromMembersBar.getText()).to.eql('Owner')
  })

  //TC_428
  it('should display alert message in deployment create page, when try to navigate from create page after entering application name and description', () => {
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppName + '12' + currentDate.getTime()
    )
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DashboardIndex.applicationLeftnav.click()
    browser.pause(1000)
    browser.alertAccept()
  })

  //TC_431
  it('should navigate to requested page, when user accepts the alert message in deployment create page', () => {
    //Trying to navigate to deployments list page
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    expect(DeploymentList.myDeploymentList.isVisible()).to.eql(true)
  })

  //TC_434
  it('should not navigate to requested page, when user clicks `cancel` in alert pop up of deployment create page', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppName + '13' + currentDate.getTime()
    )
    DashboardIndex.applicationLeftnav.click()
    browser.pause(1000)
    browser.alertDismiss()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    browser.pause(1000)
    browser.alertAccept()
  })

  //TC_413
  it('should display previous saved text in application name and description of selected deployment in deployment manage', () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.basicInfoEditIcon.click()
    var kaName =
      testData.kintoapp.validKintoAppName +
      '23' +
      currentTime.getMinutes() +
      currentTime.getSeconds() +
      't'
    var kaDescription = testData.kintoapp.validKintoAppDescription
    DeploymentManage.name.input.setValue(kaName)
    DeploymentManage.description.input.setValue(kaDescription)
    DeploymentManage.basicInfoSaveBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.basicInfoEditIcon.click()
    expect(DeploymentManage.nameField.getValue()).to.eql(kaName)
    expect(DeploymentManage.description.input.getText()).to.eql(kaDescription)
  })

  //TC_426
  it.skip('should display text `owner` for user of that kintohub account in members tool bar of deployment manage page', () => {
    expect(DeploymentCreate.ownerTextFromMembersBar.getText()).to.eql('Owner')
  })

  //TC_390
  it('should display title as `Basic Info` for basic info component in deployment manage page', () => {
    var title = DeploymentManage.title.getText().split(' - ')
    expect(DeploymentManage.basicInfoComponentTitle.getText()).to.eql(
      `Edit Basic Info - ${title[0]}`
    )
  })

  //TC_393
  it.skip('should display subtitle as "Choose the name for this application and give a a short description. If you make the application public, this will help other people discover your application." in deployment manage page.', () => {
    expect(DeploymentCreate.basicInfoComponentSubtitle.getText()).to.eql(
      'Choose the name for this deployment and give it a short description. Only lowercase characters and digits are allowed in the name - no spaces and no caps for now please.'
    )
  })

  //TC_396
  it('should display titles for text fields in basic info component of deployment manage page', () => {
    expect(DeploymentCreate.basicInfoComponentNameFieldTitle.getText()).to.eql(
      'DEPLOYMENT NAME'
    )
    var descriptionTitle = DeploymentCreate.basicInfoComponentDescriptionFieldTitle
      .getText()
      .split('\n')
    expect(descriptionTitle[0]).to.eql('DESCRIPTION')
  })

  //   //TC_399
  //   it('should display one line input field and text area field under basic info component in KA manage page', () => {
  //     $("input#name").each(function () {
  //       var $this = $(this);
  //       if ($this.is("input")) {
  //         return true;
  //       }
  //       else if ($this.is("textarea")) {
  //         return false;
  //       }
  //     });
  //     $("textarea#shortDescription").each(function () {
  //       var $this = $(this);
  //       if ($this.is("input")) {
  //         return false;
  //       }
  //       else if ($this.is("textarea")) {
  //         return true;
  //       }
  //     });
  //   })
  // })

  //TC_402
  it('should display placeholder text as `Enter a name for your application` in application name field of deployment manage page', () => {
    expect(DeploymentManage.nameField.getAttribute('placeholder')).to.eql(
      'Edit the deployment name'
    )
  })

  //TC_405
  it('should display placeholder text as `Enter a short description of your application` in description text area of deployment manage page', () => {
    expect(
      DeploymentManage.description.input.getAttribute('placeholder')
    ).to.eql('Edit your short description')
  })

  //TC_408
  it('should validate text fields in basic info component in deployment manage page with blur', () => {
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKintoAppName + '14' + currentDate.getTime() + 'q'
    )
    DeploymentManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    //TODO for validation blur
  })

  //TC_414
  it('should allow user to edit and save basic component fields for infinite times in deployment manage page', () => {
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKANameWithDash +
        '15' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'fi'
    )
    DeploymentManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentManage.basicInfoSaveBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.basicInfoEditIcon.click()
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKintoAppName +
        '16' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'se'
    )
    DeploymentManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentManage.basicInfoSaveBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.basicInfoEditIcon.click()
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKANameWithDash +
        '17' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'th'
    )
    DeploymentManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentManage.basicInfoSaveBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.basicInfoEditIcon.click()
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKANamewithChars +
        '18' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'fr'
    )
    DeploymentManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentManage.basicInfoSaveBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
  })

  //TC_416
  it('should reflect changes of deployment name made in deployment manage page, where ever its displayed', () => {
    DeploymentManage.basicInfoEditIcon.click()
    kaNameGlob =
      testData.kintoapp.validKANamewithDot +
      '19' +
      currentTime.getMinutes() +
      currentTime.getSeconds() +
      'z'
    DeploymentManage.name.input.setValue(kaNameGlob)
    DeploymentManage.basicInfoSaveBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    var title = DeploymentManage.title.getText().split(' - ')
    expect(title[0]).to.eql(kaNameGlob)
    DeploymentManage.basicInfoEditIcon.click()
    expect(DeploymentManage.nameField.getValue()).to.eql(kaNameGlob)
    DeploymentManage.basicInfoCancelBtn.click()
    expect(DeploymentManage.kaFromEnvListBreadcrumb.getText()).to.eql(
      kaNameGlob
    )
    DeploymentManage.kaListDropDownBtn.click()
    DeploymentManage.kaDropDownVisible.waitForVisible()
    //check with index
    expect(DeploymentManage.getKaNameFromDropDown(1).getText()).to.eql(
      kaNameGlob
    )
    // DeploymentManage.form.waitForVisible()
    // DeploymentManage.loadingFinished.waitForExist()
    // DeploymentManage.draftDropDownFromBreadcrumb.click()
    // DeploymentList.kaListDropDown.waitForVisible()
    // DeploymentManage.getTagNumberFromDraftDropDown(1).click()
    // DeploymentManage.form.waitForVisible()
    // DeploymentManage.loadingFinished.waitForExist()
    // expect(DeploymentManage.title.getText()).to.eql(kaNameGlob)
    // expect(DeploymentManage.nameField.getValue()).to.eql(kaNameGlob)
    // var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    expect(DeploymentList.getKaNameFromKaCard(0).getText()).to.eql(kaNameGlob)
  })

  //TC_420
  it('should display max count `200` above top right of application description text box in deployment manage page', () => {
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.basicInfoEditIcon.click()
    DeploymentManage.appDescriptonMaxCount.waitForVisible()
    expect(DeploymentManage.appDescriptonMaxCount.getText()).to.eql('171')
  })

  //TC_423
  it('should verify that max count `200` of application description in deployment manage page reduces as per text entered', () => {
    DeploymentManage.descriptionField.clearElement()
    DeploymentManage.description.input.setValue('a')
    expect(DeploymentManage.appDescriptonMaxCount.getText()).to.eql('199')
  })

  //TC_429
  it.skip('should display alert message in deployment manage page, when try to navigate from create page after entering application name and description', () => {
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKintoAppName +
        '20' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'al'
    )
    DeploymentManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DashboardIndex.open(ws)
    browser.pause(1000)
    browser.alertAccept()
    browser.pause(1000)
  })

  //TC_432
  it.skip('should navigate to requested page, when user accepts the alert message in deployment manage page', () => {
    //previously navigating to dashboard page
    DashboardIndex.container.waitForExist()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  //TC_435
  it.skip('should not navigate to requested page, when user clicks `cancel` in alert pop up of deployment manage page', () => {
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.basicInfoEditIcon.click()
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppName + '21' + currentTime.getTime()
    )
    DashboardIndex.open(ws)
    browser.pause(1000)
    browser.alertDismiss()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
    DashboardIndex.open(ws)
    browser.pause(1000)
    browser.alertAccept()
  })

  //TC_391
  it.skip('should display title as `Basic Info` for basic component in KA tagged page', () => {
    DeploymentList.loadingFinished.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getkaListDropDown(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getKaListDropDownViewTags(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getTaggedVersionNumberFromKaDropDown(0, 2).waitForVisible()
    DeploymentList.getTaggedVersionNumberFromKaDropDown(0, 2).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentManage.basicInfoComponentTitle.waitForVisible()
    expect(DeploymentManage.basicInfoComponentTitle.getText()).to.eql(
      'Basic Info'
    )
  })

  //TC_427
  it.skip('should display text `owner` for user of that kintohub account in members tool bar of KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    expect(DeploymentManage.ownerTextFromMembersBar.getText()).to.eql('Owner')
  })

  //TC_394
  it.skip('should display subtitle as "Choose the name for this application and give a a short description. If you make the application public, this will help other people discover your application." in KA tagged page.', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    expect(DeploymentManage.basicInfoComponentSubtitle.getText()).to.eql(
      'Choose the name for this deployment and give it a short description. Only lowercase characters and digits are allowed in the name - no spaces and no caps for now please.'
    )
  })

  //TC_397
  it.skip('should display titles for text fields in basic info component of KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    expect(DeploymentManage.basicInfoComponentNameFieldTitle.getText()).to.eql(
      'DEPLOYMENT NAME'
    )
    expect(
      DeploymentManage.basicInfoComponentDescriptionFieldTitle.getText()
    ).to.eql('DESCRIPTION')
  })

  // //TC_400
  // it('should display one line input field and text area field under basic info component in KA tagged page', () => {
  //   $("input#name").each(function () {
  //     var $this = $(this);
  //     if ($this.is("input")) {
  //       return true;
  //     }
  //     else if ($this.is("textarea")) {
  //       return false;
  //     }
  //   });
  //   $("textarea#shortDescription").each(function () {
  //     var $this = $(this);
  //     if ($this.is("input")) {
  //       return false;
  //     }
  //     else if ($this.is("textarea")) {
  //       return true;
  //     }
  //   });
  // })

  //TC_403
  it.skip('should display placeholder text as `Enter a name for your application` in application name field of KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    expect(DeploymentManage.nameField.getAttribute('placeholder')).to.eql(
      'Enter a name for your deployment'
    )
  })

  //TC_406
  it.skip('should display placeholder text as `Enter a short description of your application` in description text area of KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    expect(
      DeploymentManage.descriptionField.getAttribute('placeholder')
    ).to.eql('Enter a short description of your deployment')
  })

  //TC_409
  it.skip('should validate text fields in basic info component in KA tagged page with blur', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKintoAppName +
        '21' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'bs'
    )
    DeploymentManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
  })

  //TC_415
  it.skip('should allow user to edit and save basic component fields for infinite times in KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentManage.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKANameWithDash +
        '22' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'kt'
    )
    DeploymentManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentManage.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKintoAppName +
        '23' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'su'
    )
    DeploymentManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentManage.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKANameWithDash +
        '24' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'oy'
    )
    DeploymentManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentManage.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKANamewithChars +
        '25' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'ls'
    )
    DeploymentManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentManage.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
  })

  //TC_417
  it.skip('should verify that only application name and description are editable in KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKANameWithDash +
        '26' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'sx'
    )
    DeploymentManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentManage.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    //TODO check toggle switch button
    //TODO check delete icon
  })

  //TC_418
  it.skip('should reflect changes of KA name made in KA tagged page, where ever its displayed', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    var kaName =
      testData.kintoapp.validKANamewithDot +
      '27' +
      currentTime.getMinutes() +
      currentTime.getSeconds() +
      'sl'
    DeploymentManage.name.input.setValue(kaName)
    DeploymentManage.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.title.getText()).to.eql(kaName)
    expect(DeploymentManage.nameField.getValue()).to.eql(kaName)
    expect(DeploymentManage.kaFromEnvListBreadcrumb.getText()).to.eql(kaName)
    DeploymentManage.kaListDropDownBtn.click()
    DeploymentManage.kaDropDownVisible.waitForVisible()
    expect(DeploymentManage.getKaNameFromDropDown(1).getText()).to.eql(kaName)
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    //TODO get KA name from env list subtitle
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.draftDropDownFromBreadcrumb.click()
    DeploymentManage.dropdownIsShown.waitForVisible()
    DeploymentManage.getTagNumberFromDraftDropDown(1).leftClick()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.title.getText()).to.eql(kaName)
    expect(DeploymentManage.nameField.getValue()).to.eql(kaName)
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    expect(DeploymentList.getKaNameFromKaCard(0).getText()).to.eql(kaName)
  })

  //TC_421
  it.skip('should display max count `200` above top right of application description text box in KA tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getkaListDropDown(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getKaListDropDownViewTags(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getTaggedVersionNumberFromKaDropDown(0, 2).waitForVisible()
    DeploymentList.getTaggedVersionNumberFromKaDropDown(0, 2).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    expect(DeploymentManage.appDescriptonMaxCount.getText()).to.eql('200')
  })

  //TC_424
  it.skip('should verify that max count `200` of application description in KA tagged page reduces as per text entered', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentManage.description.input.setValue('a')
    expect(DeploymentManage.appDescriptonMaxCount.getText()).to.eql('199')
  })

  //TC_430
  it.skip('should display alert message in KA tagged page, when try to navigate to other page after editing   application name and description', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKintoAppName +
        '27' +
        currentTime.getMinutes() +
        currentTime.getSeconds() +
        'al'
    )
    DeploymentManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DashboardIndex.applicationLeftnav.click()
    browser.pause(1000)
    browser.alertAccept()
  })

  //TC_433
  it.skip('should navigate to requested page, when user accepts the alert message in KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    expect(DeploymentList.myDeploymentList.isVisible()).to.eql(true)
  })

  //TC_436
  it.skip('should not navigate to requested page, when user clicks `cancel` in alert pop up of KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getkaListDropDown(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getKaListDropDownViewTags(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getTaggedVersionNumberFromKaDropDown(0, 2).waitForVisible()
    DeploymentList.getTaggedVersionNumberFromKaDropDown(0, 2).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    DashboardIndex.applicationLeftnav.click()
    browser.alertDismiss()
    browser.pause(1000)
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    browser.pause(1000)
    browser.alertAccept()
  })
})

describe('KA 7 - manage kintoApp', () => {
  it('should show ka manage when clicking on that kintoapp in list', () => {
    DeploymentManage.basicInfoCancelBtn.click()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    const name = DeploymentList.getCard(0)
      .element('.name')
      .getText()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.title.waitForVisible()
    var title = DeploymentManage.title.getText().split(' - ')
    expect(title[0]).to.eq(name)
  })

  it('should show "deploy" button when we open a KA', () => {
    expect(DeploymentManage.deployBtn.isVisible()).to.eql(true)
  })

  it.skip('should display Compare versions and View Environments for each KA', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.title.waitForVisible()
    //Commented as compare versions button is removed
    // expect(DeploymentManage.compareVersions.getText()).to.eql('Compare Versions')
    expect(DeploymentManage.viewEnvironments.getText()).to.eql(
      'View Environments'
    )
  })

  it('should allow user to edit the name of the KA', () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.title.waitForVisible()
    DeploymentManage.basicInfoEditIcon.click()
    var kaName =
      testData.kintoapp.validUpdatedKintoAppName +
      '5' +
      currentTime.getTime() +
      'sw'
    DeploymentManage.name.input.setValue(kaName)
    DeploymentManage.basicInfoSaveBtn.click()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.title.waitForVisible()
    var title = DeploymentManage.title.getText().split(' - ')
    expect(title[0]).to.eq(kaName)
  })

  it.skip('should display Tag and Deploy modal with all fields required for deployment and environment as DEFAULT', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.title.waitForVisible()
    DeploymentManage.kaTagNDeploy.waitForVisible()
    DeploymentManage.kaTagNDeploy.click()
    expect(DeploymentManage.majorVersion.isVisible()).to.eql(true)
    expect(DeploymentManage.minorVersion.isVisible()).to.eql(true)
    expect(DeploymentManage.revision.isVisible()).to.eql(true)
    expect(DeploymentManage.notes.isVisible()).to.eql(true)
    var envName = DeploymentManage.envName.getText().split('\n')
    expect(envName[0]).to.eql('master')
  })

  it.skip('should display error message if Create button is clicked after selecting environment', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.title.waitForVisible()
    DeploymentManage.kaTagNDeploy.waitForVisible()
    DeploymentManage.kaTagNDeploy.click()
    expect(DeploymentManage.majorVersion.isVisible()).to.eql(true)
    expect(DeploymentManage.minorVersion.isVisible()).to.eql(true)
    expect(DeploymentManage.revision.isVisible()).to.eql(true)
    expect(DeploymentManage.notes.isVisible()).to.eql(true)
    var envName = DeploymentManage.envName.getText().split('\n')
    expect(envName[0]).to.eql('master')
    DeploymentManage.majorVersion.clearElement()
    DeploymentManage.minorVersion.clearElement()
    DeploymentManage.revision.clearElement()
    expect(DeploymentManage.cancelTagBtn.isVisible()).to.eql(true)
    expect(DeploymentManage.createTagBtn.isVisible()).to.eql(true)
    DeploymentManage.createTagBtn.click()
    expect(browser.isVisible('.error-message')).to.eql(true)
  })

  it.skip('should show error messages when mandatory fields version and revision are not filled for tag and deploy ', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.title.waitForVisible()
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKANameWithDollar +
        '9' +
        currentTime.getTime() +
        'th'
    )
    DeploymentCreate.submitGlobal() // Save changes
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.waitForVisible()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.click()
    DeploymentManage.minorVersion.click()
    DeploymentManage.majorVersion.clearElement()
    DeploymentManage.minorVersion.clearElement()
    DeploymentManage.revision.clearElement()
    DeploymentManage.createTagBtn.click()
    DeploymentManage.tagDeployErrMsg.waitForVisible()
    expect(DeploymentManage.tagDeployErrMsg.getText()).to.eql('Required')
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.createTagBtn.click()
    expect(DeploymentManage.tagDeployErrMsg.getText()).to.eql('Required')
    DeploymentManage.minorVersion.setValue('2')
    DeploymentManage.createTagBtn.click()
    expect(DeploymentManage.tagDeployErrMsg.getText()).to.eql('Required')
    DeploymentManage.revision.setValue('3')
    DeploymentManage.notes.setValue(testData.kintoapp.validNotes)
    expect(DeploymentManage.tagDeployErrMsg.isVisible()).to.eql(false)
  })

  it.skip('should allow user to tag and deploy changes to KA', () => {
    DeploymentManage.createTagBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.deploySuccessBtn()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envListFromBreadCrumb.waitForVisible()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    DeploymentManage.envList.waitForVisible()
    DeploymentManage.successDeployMsg.waitForVisible()
    expect(EnvironmentList.getenvCardVerNumber(1).getText()).to.eql('1.2.3')
  })

  it.skip('should show error message if duplicate major,minor and revision values are entered', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.title.waitForVisible()
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKANameWithDash +
        '01' +
        currentTime.getTime() +
        'gy'
    )
    DeploymentCreate.submitGlobal() // Save changes
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.waitForVisible()
    DeploymentManage.kaTagNDeploy.click()
    //Enter duplicate version details
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.minorVersion.click()
    DeploymentManage.minorVersion.setValue('2')
    DeploymentManage.revision.setValue('3')
    DeploymentManage.notes.setValue(testData.kintoapp.validNotes)
    DeploymentManage.createTagBtn.click()
    DeploymentManage.errorMsgDuplicateVersion.waitForVisible()
    expect(DeploymentManage.errorMsgDuplicateVersion.getText()).to.eql(
      'Tag with the same version is already created'
    )
  })

  it.skip('should allow user to tag and deploy without entering Notes', () => {
    DeploymentManage.cancelTagBtn.click()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.title.waitForVisible()
    DeploymentManage.kaTagNDeploy.waitForVisible()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.setValue('2')
    DeploymentManage.minorVersion.setValue('1')
    DeploymentManage.revision.setValue('1')
    DeploymentManage.notes.click()
    DeploymentManage.createTagBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    DeploymentManage.deploySuccessBtn()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envListFromBreadCrumb.waitForVisible()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    expect(EnvironmentList.getenvCardVerNumber(1).getText()).to.eql('2.1.1')
  })

  it('should allow user to view environment and add a new environment', () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.title.waitForVisible()
    DeploymentManage.addEnv.click()
    var envName =
      testData.kintoapp.validEnvName +
      '4' +
      currentTime.getMinutes() +
      currentTime.getSeconds() +
      'a'
    EnvironmentCreate.envNameField.setValue(envName)
    EnvironmentCreate.addNewEnvBtn.click()
    DeploymentManage.addEnv.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.getEnvCardTitle(3).getText()).to.eql(
      envName.toUpperCase()
    )
    // expect(
    //   DeploymentManage.getenvListItem(2)
    //     .element('.top > h3')
    //     .getText()
    // ).to.eql(envName) // Environment name is in CAPS in the listing page(Not now)
  })
})

describe('KA 8 - Dependencies Component', () => {
  //TC_615
  it('should verify that "configure dependencies" button is disabled in KA create page', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.depConfigureBtnDisabled.waitForVisible()
    expect(DeploymentCreate.depConfigureBtnDisabled.isVisible()).to.eql(true)
  })

  //TC_619
  it('should verify that dependencies card list is empty by default in KA create page', () => {
    expect(DeploymentCreate.getDependenciesCards(1).isVisible()).to.eql(false)
  })

  //TC_611
  it('should display "Dependencies" component title as "Dependencies"', () => {
    DeploymentCreate.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    browser.scroll(0, 400)
    expect(DeploymentManage.dependenciesTitle.getText()).to.eql('KintoBlocks')
  })

  //TC_612
  it('should display "Dependencies" component subtitle as "If your Appliication needs other KintoBlocks to work (like an Auth KintoBlock or a Leaderboard KintoBlock), pick and chose them here. You can then configure each of them when building your application."', () => {
    expect(DeploymentManage.dependenciesSubtitle.getText()).to.eql(
      'This is where the magic happens: add KintoBlocks to deliver the features you need in your client - we make them all work together. Because we know your application is special, you can specify unique configuration parameters for each of the features you are adding. You can also decide to combine or split instances of the same KintoBlock to save on costs.'
    )
  })

  //TC_613
  it('should display search field in the dependencies component', () => {
    expect(DeploymentManage.dependenciesSearchBar.isVisible()).to.eql(true)
  })

  // //TC_614
  // it('should verify that search field is not displayed in the KA tagged page',()=>{
  //   //TODO
  // })

  // //TC_616
  // it('should verify that "Edit dependencies" button and "Edit icon" are disabled in KA manage page, when there no existing dependencies', () => {
  //   var ws = Landing.workspaceSelect.getAttribute('data-test')
  //   DeploymentList.open(ws)
  //   DeploymentList.myDeploymentList.waitForVisible()
  //   DeploymentList.getCard(4).waitForVisible()
  //   DeploymentList.getCard(4).click()
  //   DeploymentManage.form.waitForVisible()
  //   //For now KA doesn't have any dependencies
  //   expect(DeploymentManage.editDependneciesBtn.isEnabled()).to.eql(false)
  //   expect(DeploymentManage.editDependenciesIconBelowBtnRow.isEnabled()).to.eql(
  //     false
  //   )
  // })

  // //TC_617
  // it('should verify that "Edit dependencies" button and "Edit icon" are enabled in KA manage page, when dependencies are added', () => {
  //   //Adding dependencies
  //   DeploymentManage.dependenciesSearchBar.setValue(
  //     testData.kintoblock.validKintoBlockName
  //   )
  //   browser.keys('Tab')
  //   expect(DeploymentManage.editDependneciesBtn.isEnabled()).to.eql(true)
  //   expect(DeploymentManage.editDependenciesIconBelowBtnRow.isEnabled()).to.eql(
  //     true
  //   )
  // })

  // //TC_618
  // it('should verify that "Edit dependencies" button and "Edit icon" are not displayed in KA tagged page',()=>{
  //   //TODO
  // })

  // //TC_620
  // it('should display all the added dependencies to a KA, when user naviagtes to some other page and again returns to KA manage page', () => {
  //   DeploymentCreate.name.input.setValue(testData.kintoapp.validKANamewithDot)

  //   DeploymentCreate.shortDescription.input.setValue(
  //     testData.kintoapp.validKintoAppDescriptionWithChars
  //   )
  //   DeploymentCreate.kbdropDown.setValue('z')
  //   browser.leftClick('div.Select-input > input')
  //   browser.keys('Return')
  //   DeploymentCreate.kbdropDown.setValue('d')
  //   browser.leftClick('div.Select-input > input')
  //   browser.keys('Return')
  //   DeploymentCreate.submitGlobal()
  //   DeploymentList.myDeploymentList.waitForVisible()
  //   DeploymentList.getCard(6).waitForVisible()
  //   DeploymentList.getCard(6).click()
  //   DeploymentManage.form.waitForVisible()
  //   DeploymentManage.getDependenciesCards(1).waitForVisible()
  //   expect(DeploymentManage.getDependenciesCardTitle(1).getText()).to.eql(
  //     testData.kintoblock.validKBNameWithStar
  //   )
  //   expect(DeploymentManage.getDependenciesCardTitle(2).getText()).to.eql(
  //     testData.kintoblock.validKBNameWithStar
  //   )
  // })

  //TC_621
  it('should display every KB card with an icon, name, description, delete icon, edit icon and branche & tag switcher', () => {
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.getDependenciesCardIcon(1).isVisible()).to.eql(true)
    expect(DeploymentManage.getDependenciesCardTitle(1).isVisible()).to.eql(
      true
    )
    expect(DeploymentManage.getDependenciesCardSubtitle(1).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getDependenciesDeleteIcon(2).isVisible()).to.eql(
      true
    )
    expect(
      DeploymentManage.getEditDependenciesIconFromDependenciesCard(
        1
      ).isVisible()
    ).to.eql(true)
    expect(
      DeploymentManage.getDepBranchAndTagSwitcherField(2).isVisible()
    ).to.eql(true)
  })

  // //TC_622
  // it('should display 2nd level dependency in a stacked manner in any dependency card', () => {
  //   var ws = Landing.workspaceSelect.getAttribute('data-test')
  //   KintoBlockList.open(ws)
  //   KintoBlockList.myKintoBlocksList.waitForVisible()
  //   KintoBlockList.getCard(1).waitForVisible()
  //   KintoBlockList.getCard(1).click()
  //   KintoBlockManage.form.waitForVisible()
  //   DeploymentManage.dependenciesSearchBar.setValue(
  //     testData.kintoblock.validKBNameWithStar
  //   )
  //   browser.keys('Tab')
  //   DeploymentManage.dependenciesSearchBar.setValue(
  //     testData.kintoblock.validKBNameWithStar
  //   )
  //   browser.keys('Tab')
  //   DeploymentManage.dependenciesSearchBar.setValue(
  //     testData.kintoblock.validKBNameWithStar
  //   )
  //   browser.keys('Tab')
  //   DeploymentManage.dependenciesSearchBar.setValue(
  //     testData.kintoblock.validKBNameWithStar
  //   )
  //   browser.keys('Tab')
  //   DeploymentManage.dependenciesSearchBar.setValue(
  //     testData.kintoblock.validKBNameWithStar
  //   )
  //   browser.keys('Tab')
  //   KintoBlockManage.submitBtn.waitForVisible()
  //   KintoBlockManage.submitGlobal()
  //   DeploymentList.open(ws)
  //   DeploymentList.myDeploymentList.waitForVisible()
  //   DeploymentList.getCard(6).waitForVisible()
  //   DeploymentList.getCard(6).click()
  //   DeploymentManage.form.waitForVisible()
  //   DeploymentManage.getSecondLevelDependencyStackedIcons(3, 1).waitForVisible()
  //   expect(
  //     DeploymentManage.getSecondLevelDependencyStackedIcons(3, 1).isVisible()
  //   ).to.eql(true)
  //   expect(
  //     DeploymentManage.getSecondLevelDependencyStackedIcons(3, 2).isVisible()
  //   ).to.eql(true)
  //   expect(
  //     DeploymentManage.getSecondLevelDependencyStackedIcons(3, 3).isVisible()
  //   ).to.eql(true)
  //   expect(
  //     DeploymentManage.getSecondLevelDependencyStackedIcons(3, 4).isVisible()
  //   ).to.eql(true)
  // })

  // //TC_623
  // it('should display "+X" if there are more than four dependencies to display in 2nd level dependency', () => {
  //   expect(
  //     DeploymentManage.getSecondLevelDependencyAddIcon(3).isVisible()
  //   ).to.eql(true)
  // })

  // //TC_624
  // it('should verify that clicking on "Expand" for any 2nd level dependency expands the stacked dependency list',()=>{
  //   //TODO Not implemented
  // })

  // //TC_625
  // it('should display icon, name and description for 2nd level dependency of any dependency card', () => {
  //   expect(
  //     DeploymentManage.getSecondLevelDependencyTitle(3, 1).isVisible()
  //   ).to.eql(true)
  //   expect(
  //     DeploymentManage.getSecondLevelDependencySubtitle(3, 1).isVisible()
  //   ).to.eql(true)
  //   expect(
  //     DeploymentManage.getSecondLevelDependencyIcon(3, 1).isVisible()
  //   ).to.eql(true)
  // })

  // //TC_626
  // it('should verify that search field in dependencies component on click gets blue highlight border',()=>{
  //   //TODO
  // })

  // //TC_627
  // it('should verify that search field in dependencies component filters dependency list as per user data entered',()=>{
  //   //TODO
  // })

  // //TC_628
  // it('should verify that dependency are added using mouse click, Arrow+enter and enter KB full name + enter from dependency list',()=>{
  //   //TODO
  // })

  //TC_629
  it.skip('should display an alert message, when user clicks on "configure dependencies" while editing the KA manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.name.input.setValue(
      testData.kintoapp.validKANameWithDash +
        '09' +
        currentTime.getMinutes() +
        currentTime.getSeconds()
    )
    DeploymentManage.submitBtn.waitForVisible()
    expect(DeploymentManage.submitBtn.getText()).to.eql('Save Changes')
    var editDep = DeploymentManage.editDepBtn.getAttribute('href')
    browser.url(editDep)
    browser.alertDismiss()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
  })

  //TC_630
  it('should delete dependency from dependency list, when user clicks on "X" red icon on top left of dependency card', () => {
    DeploymentManage.getDependenciesDeleteIcon(4).waitForVisible()
    DeploymentManage.getDependenciesDeleteIcon(5).waitForVisible()
    expect(DeploymentManage.getDependenciesDeleteIcon(5).isVisible()).to.eql(
      true
    )
    browser.scroll(0, 1000)
    KintoBlockManage.getDependenciesDeleteIcon(4).click()
    browser.pause(3000)
    expect(DeploymentManage.getDependenciesDeleteIcon(5).isVisible()).to.eql(
      false
    )
  })

  it('should verify "Dependencies list" in deployment manage is not disappearing, when user deletes any exsiting dependency from the list', () => {
    //Already user had deleted an existing dependency
    //Verifying dependencies list is displayed
    DeploymentManage.deploybtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.dependencyList.isVisible()).to.eql(true)
  })

  it('should verify whether undeleted dependencies are not removed from the dependencies list, when user deletes an existing dependency from the list', () => {
    //Now there are three dependencies, deleting the last dependency
    DeploymentManage.getDependenciesDeleteIcon(3).waitForVisible()
    DeploymentManage.getDependenciesDeleteIcon(4).waitForVisible()
    expect(DeploymentManage.getDependenciesDeleteIcon(4).isVisible()).to.eql(
      true
    )
    KintoBlockManage.getDependenciesDeleteIcon(4).leftClick()
    browser.pause(3000)
    expect(DeploymentManage.getDependenciesDeleteIcon(4).isVisible()).to.eql(
      false
    )
    DeploymentManage.deploybtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    //Verify whether other dependencies are still there
    expect(DeploymentManage.getDependencies(1).isVisible()).to.eql(true)
    expect(DeploymentManage.getDependencies(2).isVisible()).to.eql(true)
  })

  it('should verify deleted dependency is not displayed in dependencies list, when user navigates to other pages and return to deployments manage page', () => {
    var KbOne = DeploymentManage.getDependenciesCardTitle(1).getText()
    DeploymentManage.getDependenciesDeleteIcon(2).waitForVisible()
    DeploymentManage.getDependenciesDeleteIcon(3).waitForVisible()
    expect(DeploymentManage.getDependenciesDeleteIcon(3).isVisible()).to.eql(
      true
    )
    //Now there are two dependencies, deleting the second one
    KintoBlockManage.getDependenciesDeleteIcon(3).click()
    browser.pause(3000)
    expect(DeploymentManage.getDependenciesDeleteIcon(3).isVisible()).to.eql(
      false
    )
    DeploymentManage.submitBtn.waitForVisible()
    DeploymentManage.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    // var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    //Validating second dependency is not displayed
    expect(DeploymentManage.getDependenciesDeleteIcon(3).isVisible()).to.eql(
      false
    )
    expect(KbOne).to.eql(DeploymentManage.getDependenciesCardTitle(1).getText())
  })

  it('should display "No options" text in dependency drop down list, when user search for an existing dependency in dependency list', () => {
    var existingKB = DeploymentManage.getDependenciesCardTitle(1).getText()
    DeploymentManage.kbdropDown.scroll()
    DeploymentManage.kbdropDown.setValue(existingKB)
    DeploymentManage.noOptionsText.waitForVisible()
    expect(DeploymentManage.noOptionsText.isVisible()).to.eql(true)
  })

  //TC_631
  it.skip('should navigate to documentation page, when user clicks on "i" icon for any dependency card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    var href = DeploymentManage.getDepViewEndpointsBtn(1).getAttribute('href')
    browser.url(href)
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kbDocumentionPage.waitForVisible()
    expect(DeploymentManage.kbDocumentionPage.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  //TC_632
  it.skip('should navigate to KA - Edit Dependencies Page with a KB  name as pre-filter text in search field, when user clicks on "edit" icon of dependency card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    var kbName = DeploymentManage.getDependenciesCardTitle(3).getText()
    var editDepPage = DeploymentManage.getEditDepIconFromDepCard(
      3
    ).getAttribute('href')
    browser.url(editDepPage)
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.environmentDefaultsTextFromBreadcrumb.waitForVisible()
    expect(
      DeploymentManage.environmentDefaultsTextFromBreadcrumb.getText()
    ).to.eql('Environment Defaults')
    expect(
      DeploymentManage.getFocusedKbInEditDependenciesPage(3).getText()
    ).to.eql(kbName)
  })
})

describe('KA 9 - Edit Dependencies Page overall', () => {
  it('should create two KBs using existing repositories', () => {
    KintoBlockManage.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(secondUser)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbNameFive =
      testData.kintoblock.validKintoBlockNameWithDescendingNumbers +
      '00' +
      randomName
    KintoBlockCreate.name.input.setValue(kbNameFive)
    KintoBlockCreate.kbDisplayName.setValue(kbNameFive)
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
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
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
    KintoBlockManage.loadingFinished.waitForExist()
    // Second KB Creation
    KintoBlockCreate.open(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbNameSix = testData.kintoblock.validKBNameWithDollar + '59' + randomName
    KintoBlockCreate.name.input.setValue(kbNameSix)
    KintoBlockCreate.kbDisplayName.setValue(kbNameSix)
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
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
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
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the KintoBlock with existing repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock with existing repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether KintoBlock with existing repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_633
  it('should navigate user to "Edit Dependencies page", when user enters the URL of the page', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    var kaName =
      testData.kintoapp.validKintoAppName + '100' + currentTime.getTime() + 'h'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(kbNameFive)
    DeploymentCreate.getFilteredKB(kbNameFive).waitForVisible()
    DeploymentCreate.getFilteredKB(kbNameFive).click()
    DeploymentCreate.loadingFinished.waitForExist()
    browser.pause(3000)
    browser.keys('Tab')
    DeploymentCreate.kbdropDown.setValue(kbNameSix)
    DeploymentCreate.getFilteredKB(kbNameSix).waitForVisible()
    DeploymentCreate.getFilteredKB(kbNameSix).click()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    var editDep = DeploymentManage.editDepBtn.getAttribute('href')
    browser.url(editDep)
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.editDependenciesPageTitle.waitForVisible()
    var url = browser.getUrl()
    //navigating to KA list page
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    expect(DeploymentList.myDeploymentList.isVisible()).to.eql(true)
    browser.url(url)
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.editDependenciesPageTitle.waitForVisible()
    expect(DeploymentManage.editDependenciesPageTitle.getText()).to.eql(
      'ENVIRONMENT VARIABLES'
    )
  })

  //TC_634
  it('should display "Edit dependencies page" title as "ENVIRONMENT VARIABLES"', () => {
    expect(DeploymentManage.editDependenciesPageTitle.getText()).to.eql(
      'ENVIRONMENT VARIABLES'
    )
  })

  //TC_635
  it('should display search field bar for filtering dependencies', () => {
    expect(DeploymentManage.depSearchBarInEditDepPage.isVisible()).to.eql(true)
  })

  //TC_636
  it('should display dependency list below the search field bar of dependencies', () => {
    expect(DeploymentManage.dependenciesListInEditDepPage.isVisible()).to.eql(
      true
    )
  })

  //TC_637
  it('should display search field bar for custom parameter component', () => {
    expect(DeploymentManage.customParameterSearchBar.isVisible()).to.eql(true)
  })

  //TC_638
  it('should display input field for environment parameter key', () => {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.addCustomKey.setValue(testData.kintoblock.validCustomKey)
    KintoBlockManage.addCustomValue.setValue(
      testData.kintoblock.validCustomValue
    )
    KintoBlockManage.addIconOfCustomParam.waitForVisible()
    KintoBlockManage.addIconOfCustomParam.click()
    browser.pause(3000)
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    var editDep = DeploymentManage.editDepBtn.getAttribute('href')
    browser.url(editDep)
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.depSearchBarInEditDepPage.waitForVisible()
    DeploymentManage.depSearchBarInEditDepPage.setValue(kbNameFive)
    DeploymentManage.getCustomParamValuesInEditDepPage(0, 0).waitForVisible()
    expect(
      DeploymentManage.getCustomParamValuesInEditDepPage(0, 0).isVisible()
    ).to.eql(true)
    expect(
      DeploymentManage.getCustomParamValuesInEditDepPage(0, 0).getValue()
    ).to.eql(testData.kintoblock.validCustomValue)
  })

  //TC_639
  it('should verify that "Save Bar" is displayed at the bottom of page', () => {
    expect(DeploymentManage.savebar.isVisible()).to.eql(true)
  })

  //TC_640
  it('should not display custom parameter key`s input field as greyed out, when draft version is selected', () => {
    //Commented as there is no draft now
    // expect(DeploymentManage.versionTextFromBreadcrumb.getText()).to.eql('draft')
    expect(
      DeploymentManage.getCustomParamValuesInEditDepPage(0, 0).isVisible()
    ).to.eql(true)
  })

  //TC_641
  it.skip('should make username account`s KB public and add custom parameter to it', () => {
    DeploymentManage.logout()
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
    KintoBlockList.getCard(3).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    KintoBlockManage.addCustomKey.setValue(testData.kintoblock.validCustomKey)
    KintoBlockManage.addCustomValue.setValue(
      testData.kintoblock.validCustomValue
    )
    KintoBlockManage.addIconOfCustomParam.click()
    browser.pause(2000)
    KintoBlockManage.shareKBIcon.scroll(0, -1000)
    KintoBlockManage.shareKBIcon.click()
    browser.pause(2000)
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  //TC_641
  it.skip('should display custom parameter key`s input field as greyed out, when tag version is selected', () => {
    KintoBlockManage.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(secondUser)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    var kaName =
      testData.kintoapp.validKintoAppNameWithQwerty +
      '96' +
      currentTime.getTime() +
      'i'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.waitForVisible()
    DeploymentCreate.kbdropDown.setValue(kbNameOne)
    DeploymentCreate.getFilteredKB(kbNameOne).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    browser.keys('Tab')
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    DeploymentCreate.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    browser.pause(3000)
    DeploymentCreate.submitGlobal()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.waitForVisible()
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.minorVersion.setValue('1')
    DeploymentManage.revision.setValue('1')
    DeploymentManage.createTagBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    DeploymentManage.loadingFinished.waitForExist()
    var editDep = DeploymentManage.editDepBtn.getAttribute('href')
    browser.url(editDep)
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.versionSwitcherDropdown.waitForVisible()
    DeploymentManage.versionSwitcherDropdown.click()
    DeploymentManage.getTagNumberFromDraftDropDown(2).waitForVisible()
    DeploymentManage.getTagNumberFromDraftDropDown(2).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.versionTextFromBreadcrumb.waitForVisible()
    expect(DeploymentManage.versionTextFromBreadcrumb.getText()).to.eql('1.1.1')
    DeploymentManage.loadingFinished.waitForExist()
    expect(
      DeploymentManage.getCustomParamValuesInEditDepPage(0, 0).isEnabled()
    ).to.eql(false)
  })

  //TC_643
  it.skip('should display "Save Changes" button always deactivated, when tag version is selected', () => {
    expect(DeploymentManage.submitBtn.isEnabled()).to.eql(false)
  })

  //TC_642
  it.skip('should allow user to switch between tags via version swithcer drop down', () => {
    //previously selected tagged version
    expect(DeploymentManage.versionTextFromBreadcrumb.getText()).to.eql('1.1.1')
    DeploymentManage.getTagNumberFromDraftDropDown(1).waitForVisible()
    DeploymentManage.getTagNumberFromDraftDropDown(1).click()
    DeploymentManage.loadingFinished.waitForExist()
    //Switched to Draft version
    DeploymentManage.versionTextFromBreadcrumb.waitForVisible()
    expect(DeploymentManage.versionTextFromBreadcrumb.getText()).to.eql('draft')
  })

  //TC_644
  it('should filter dependencies list according to the keywords entered in the search field', () => {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    var editDep = DeploymentManage.editDepBtn.getAttribute('href')
    browser.url(editDep)
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.editDependenciesPageTitle.waitForVisible()
    var secondDep = DeploymentManage.getTextOfKBFromKBListInDepPage(2).getText()
    //Now searching for second dependency
    DeploymentManage.depSearchBarInEditDepPage.setValue(secondDep)
    expect(DeploymentManage.getTextOfKBFromKBListInDepPage(1).getText()).to.eql(
      secondDep
    )
  })

  //TC_645
  it('should filter out mis matching dependency from the list', () => {
    browser.refresh()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.depSearchBarInEditDepPage.waitForVisible()
    DeploymentManage.getTextOfKBFromKBListInDepPage(2).waitForVisible()
    var firstDep = DeploymentManage.getTextOfKBFromKBListInDepPage(1).getText()
    //Now searching for first dependency, so second dependency disappears
    DeploymentManage.depSearchBarInEditDepPage.setValue(firstDep)
    expect(DeploymentManage.getTextOfKBFromKBListInDepPage(1).getText()).to.eql(
      firstDep
    )
    expect(
      DeploymentManage.getTextOfKBFromKBListInDepPage(2).isVisible()
    ).to.eql(false)
  })

  // //TC_646
  // it('should filter second level dependency in the dependency list', () => {
  //   var ws = Landing.workspaceSelect.getAttribute('data-test')
  //   KintoBlockCreate.open(ws)
  //   KintoBlockCreate.loadingFinished.waitForExist()
  //   KintoBlockCreate.form.waitForVisible()
  //   var thirdKB = testData.kintoblock.validKBNameWithStar + '56' + currentTime.getMinutes() + currentTime.getSeconds()
  //   KintoBlockCreate.name.input.setValue(thirdKB)
  //   KintoBlockCreate.shortDescription.input.setValue(
  //     testData.kintoblock.validKBDescriptionWithChar
  //   )
  //   KintoBlockCreate.language.input.selectByIndex(1)
  //   KintoBlockCreate.protocol.input.selectByIndex(1)
  //   KintoBlockCreate.repository.input.setValue(testData.kintoblock.validRepoName + currentDate.getTime())
  //   KintoBlockCreate.submitGlobal()
  //   KintoBlockList.loadingFinished.waitForExist()
  //   KintoBlockList.myKintoBlocksList.waitForVisible()
  //   DeploymentList.open(ws)
  //   DeploymentList.getCard(0).waitForVisible()
  //   DeploymentList.getCard(0).click()
  //   DeploymentManage.loadingFinished.waitForExist()
  //   DeploymentManage.form.waitForVisible()
  //   DeploymentManage.dependenciesSearchBar.setValue(thirdKB)
  //   browser.pause(3000)
  //   browser.keys('Tab')
  //   DeploymentManage.submitGlobal()
  //   DeploymentManage.editDependneciesBtn.click()
  //   DeploymentManage.loadingFinished.waitForExist()
  //   DeploymentManage.depSearchBarInEditDepPage.waitForVisible()
  //   DeploymentManage.depSearchBarInEditDepPage.setValue(thirdKB)
  //   browser.waitForVisible(`//*[contains(text(),${thirdKB})]`)
  //   expect(browser.isVisible(`//*[contains(text(),${thirdKB})]`))
  // })

  //TC_647
  it('should display all dependencies of selected KA in the dependencies page', () => {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    var firstDep = DeploymentManage.getDependenciesCardTitle(1).getText()
    var secondDep = DeploymentManage.getDependenciesCardTitle(2).getText()
    var editDep = DeploymentManage.editDepBtn.getAttribute('href')
    browser.url(editDep)
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.dependenciesListInEditDepPage.waitForVisible()
    expect(DeploymentManage.getTextOfKBFromKBListInDepPage(1).getText()).to.eql(
      firstDep
    )
    expect(DeploymentManage.getTextOfKBFromKBListInDepPage(2).getText()).to.eql(
      secondDep
    )
  })

  // //TC_648
  // it('should display second level dependency icon smaller than first level dependency icon', () => {
  //   //TODO
  // })

  // //TC_649
  // //TODO

  // //TC_650
  // it('should hightlight dependency, when user scrolls the list', () => {
  //   //TODO
  // })

  // //TC_651
  // it('should highlight custom parameters field of certain dependency, when that dependency is selected', () => {
  //   //TODO
  // })

  //TC_652
  it('should allow user to filter using keywords in the custom parameter search bar using key name', () => {
    DeploymentManage.customParameterSearchBar.setValue(
      testData.kintoblock.validCustomKey
    )
    expect(
      DeploymentManage.getCustomParamValuesInEditDepPage(0, 0).getValue()
    ).to.eql(testData.kintoblock.validCustomValue)
  })

  // //TC_653
  // it('should display name(key) and input field for any custom parameter', () => {
  //   //Need clarification
  //   expect(DeploymentManage.getCustomParameterKeyText(1).isVisible()).to.eql(true)
  //   expect(DeploymentManage.customParameterInputField.isVisible()).to.eql(true)
  // })

  // //TC_654
  // it('should display all custom parameters of selected dependnecy', () => {
  //   //TODO
  // })

  // //TC_655
  // it('should display "Required" tag for custom parameter if required tag is given', () => {
  //   //Need clarification
  // })

  //TC_656
  it('should verify that "Save Changes" button is disabled by default, when user navigates to "Edit Dependencies" page', () => {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    var editDep = DeploymentManage.editDepBtn.getAttribute('href')
    browser.url(editDep)
    DeploymentManage.submitBtn.waitForVisible()
    expect(DeploymentManage.submitBtn.isEnabled()).to.eql(false)
  })

  //TC_657
  it('should enable "Save Changes" button, when user edit any field', () => {
    DeploymentManage.customParameterSearchBar.waitForVisible()
    DeploymentManage.customParameterSearchBar.setValue(
      testData.kintoblock.validCustomKey
    )
    DeploymentManage.getCustomParamValuesInEditDepPage(0, 0).waitForExist()
    DeploymentManage.getCustomParamValuesInEditDepPage(0, 0).waitForVisible()
    DeploymentManage.getCustomParamValuesInEditDepPage(0, 0).setValue(
      testData.kintoblock.validCustomKeyWithSpecialChars
    )
    expect(DeploymentManage.submitBtn.isEnabled()).to.eql(true)
  })

  //TC_658
  it('should disable "Save Changes" button, when user save the changes', () => {
    DeploymentManage.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.submitBtn.isEnabled()).to.eql(false)
  })

  //TC_659
  it('should prompt alert message, when user navigate to other page without saving the changes in "Edit Dependencies" page', () => {
    DeploymentManage.customParameterSearchBar.setValue(
      testData.kintoblock.validCustomKey
    )
    DeploymentManage.getCustomParamValuesInEditDepPage(0, 0).waitForExist()
    DeploymentManage.getCustomParamValuesInEditDepPage(0, 0).waitForVisible()
    DeploymentManage.getCustomParamValuesInEditDepPage(0, 0).setValue(
      testData.kintoblock.validCustomKeyWithSpecialChars
    )
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
  })
})

describe('KA 10 - Deployments Logs', () => {
  it('should login, link GitHub and create a KB with existing repository', () => {
    DeploymentList.logout()
    userThree = Login.registerAndLogin('LP')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForVisible()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    randomName = KintoBlockCreate.randomNumbers()
    KintoBlockCreate.loadingFinished.waitForExist()
    kbLog = testData.kintoblock.validKBNameEight + '26' + randomName + 'ex'
    KintoBlockCreate.name.input.setValue(kbLog)
    KintoBlockCreate.kbDisplayName.setValue(kbLog)
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
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(
      testData.kintoblock.validRepoWithConsoleLogs
    )
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validRepoWithConsoleLogs
    ).waitForVisible()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validRepoWithConsoleLogs
    ).click()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForExist()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the logs KintoBlock for running', () => {
    browser.pause(100000)
  })

  it('should wait for the logs KintoBlock for running', () => {
    browser.pause(100000)
  })

  it('should check build reached success for logs KintoBlock', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should create a deployment and deploy it for Logs page over all describe', () => {
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    randomName = DeploymentCreate.randomName()
    var kaName = testData.kintoapp.validKAEnv + randomName
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    KintoBlockList.getFilteredKB('helloworld').click()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.kbdropDown.setValue(kbLog)
    KintoBlockList.getFilteredKB(kbLog).waitForVisible()
    KintoBlockList.getFilteredKB(kbLog).click()
    DeploymentCreate.loadingFinished.waitForExist()
    browser.pause(2000)
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.amazingBtn.waitForExist()
    DeploymentManage.amazingBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
  })

  it('static wait for log deployment', () => {
    browser.pause(100000)
  })

  it('check log deployment reached success', () => {
    DeploymentManage.checkforDeploymentSuccess()
  })

  it('should verify that the GET API call is successful for the KA deployed using existing and example KB', async () => {
    var curlCommand = DeploymentManage.clientAndSecretKey.getText().split(':')
    var id = curlCommand[2].split('"')
    let clientID = id[1]
    var key = curlCommand[3].split('"')
    let clientSecret = key[1]
    const token = await getToken(clientID, clientSecret)
    await callUserKB(token, kbLog)
  })

  it('should navigate user to "logs" page, when user clicks on "View Logs" button displayed for a deployment', () => {
    browser.scroll(0, 200)
    DeploymentManage.expandDeploymentHistory.click()
    browser.scroll(0, 300)
    EnvironmentManage.getViewLogsBtn(1).waitForVisible()
    EnvironmentManage.getViewLogsBtn(1).click()
    EnvironmentManage.loadingFinished.waitForExist()
    expect(EnvironmentManage.logsPage.isVisible()).to.eql(true)
  })

  it('should navigate user to "logs" page, when user enters URL of the logs page', () => {
    var url = browser.getUrl()
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
    browser.url(url)
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logsPage.waitForVisible()
    expect(EnvironmentManage.logsPage.isVisible()).to.eql(true)
  })

  it('should verify breadcrumb of logs page displays "Deployments > { Deployment name } > View Console Logs"', () => {
    //Deployment text
    expect(DeploymentManage.kaListPageFromKaManagePage.isVisible()).to.eql(true)
    expect(DeploymentManage.kaListPageFromKaManagePage.getText()).to.eql(
      'Deployments'
    )
    //Deployment name
    expect(DeploymentManage.kaFromEnvListBreadcrumb.isVisible()).to.eql(true)
    //View console log text
    expect(
      EnvironmentList.viewConsoleLogsTextDisabledInLogsPage.isVisible()
    ).to.eql(true)
  })

  it.skip('should check whether `view console logs` in breadcrumb of `logs` page is disabled/not clickable', () => {
    expect(EnvironmentList.viewLogsDisabledInLogsPage.isVisible()).to.eql(true)
  })

  it('should verify console log header titles are displayed as "DATE RANGE" and "KINTOBLOCK"', () => {
    //Date range
    expect(EnvironmentManage.getConsoleLogsHeaderTitle(1).getText()).to.eql(
      'DATE RANGE'
    )
    //KintoBlock
    expect(EnvironmentManage.getConsoleLogsHeaderTitle(2).getText()).to.eql(
      'KINTOBLOCKS'
    )
  })

  it('should display logs table title in following format {EnvName} - {build number} - {index number of deployment}', () => {
    var envName = DeploymentCreate.getEnvCardTitle(2)
      .getText()
      .toLowerCase()
    expect(EnvironmentManage.consoleLogsTableTitle.getText()).to.eql(
      envName + ' - 0.0.1 - 1'
    )
  })

  it('should verify whether logs messages are scrollable', () => {
    expect(EnvironmentManage.scrollableBarInLogsTable.isVisible()).to.eql(true)
  })

  it('should verify logs table has two columns "Time" and "Message"', () => {
    expect(EnvironmentManage.timeColumnNameInLogsTable.getText()).to.eql('TIME')
    expect(EnvironmentManage.messageColumnNameInLogsTable.getText()).to.eql(
      'MESSAGE'
    )
  })

  it('should verify placeholder text of serach bar for filtering messages', () => {
    expect(
      EnvironmentManage.logMessageFilterSearchBar.getAttribute('placeholder')
    ).to.eql('Filter messages...')
  })

  it('should allow user to filter log messages using text filter search bar in console log table', () => {
    EnvironmentManage.KintoBlockDropDown.click()
    browser.pause(2000)
    browser.keys('Down arrow')
    browser.keys('Tab')
    browser.pause(5000)
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logMessageFilterSearchBar.setValue('loggedLabel')
    browser.pause(2000)
    EnvironmentManage.getLogMessageFromLogsTable(1).waitForVisible()
    expect(
      EnvironmentManage.getLogMessageFromLogsTable(1).getText()
    ).to.includes('"loggedLabel":"Test Value","loggedValue":"Test Value"')
  })

  it('should allow user to switch between log messages of different KintoBlocks', () => {
    browser.refresh()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logMessageFilterSearchBar.waitForVisible()
    //First KB
    EnvironmentManage.KintoBlockDropDown.click()
    browser.pause(2000)
    browser.keys('Tab')
    browser.pause(5000)
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logMessageFilterSearchBar.setValue(
      'node-example@0.1.0 prod /app'
    )
    browser.pause(2000)
    EnvironmentManage.getLogMessageFromLogsTable(1).waitForVisible()
    expect(
      EnvironmentManage.getLogMessageFromLogsTable(1).getText()
    ).to.includes('node-example@0.1.0 prod /app')
    browser.refresh()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logMessageFilterSearchBar.waitForVisible()
    //Second KB
    EnvironmentManage.KintoBlockDropDown.click()
    browser.pause(2000)
    browser.keys('Down arrow')
    browser.keys('Tab')
    browser.pause(5000)
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logMessageFilterSearchBar.setValue(
      '"loggedLabel":"Test Value","loggedValue":"Test Value"'
    )
    browser.pause(2000)
    EnvironmentManage.getLogMessageFromLogsTable(1).waitForVisible()
    expect(
      EnvironmentManage.getLogMessageFromLogsTable(1).getText()
    ).to.includes('"loggedLabel":"Test Value","loggedValue":"Test Value"')
  })

  it('should verify whether user can turn on/off the toggle switch for pinning users to bottom of the logs', () => {
    EnvironmentManage.toggleSwitchToPinLogsAtBottom.waitForVisible()
    //Switchin on
    EnvironmentManage.toggleSwitchToPinLogsAtBottom.click()
    browser.pause(2000)
    //Switchin off
    EnvironmentManage.toggleSwitchToPinLogsAtBottom.click()
    browser.pause(2000)
  })

  it('should display text "Keep Console Pinned to the Bottom" next to toggle switch for pinning users to bottom of the logs', () => {
    expect(
      EnvironmentManage.toggleSwitchTextToPinLogsAtBottom.getText()
    ).to.eql('Keep Console Pinned to the Bottom')
  })
})

describe('KA 11 - should shutdown the deployments', () => {
  it('should login into userone account', () => {
    Login.logout()
    browser.pause(3000)
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    Login.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
  })

  it('should shutdown 2 enviroments in first deployment', () => {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.getenvCardSelect(2).click()
    DeploymentManage.shutDownBtn.waitForVisible()
    DeploymentManage.shutDownBtn.click()
    DeploymentManage.shutDownAnywayBtn.waitForVisible()
    DeploymentManage.shutDownAnywayBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    // expect(DeploymentManage.shutDownBtn.isVisible()).to.eql(false)
    DeploymentManage.getenvCardSelect(3).click()
    DeploymentManage.shutDownBtn.waitForVisible()
    DeploymentManage.shutDownBtn.click()
    DeploymentManage.shutDownAnywayBtn.waitForVisible()
    DeploymentManage.shutDownAnywayBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.shutDownBtn.isVisible()).to.eql(false)
  })

  it('should shutdown 2 deployments in first user account', () => {
    DeploymentManage.shutDownDeployment(1, ws, 2)
    DeploymentManage.shutDownDeployment(2, ws, 2)
  })

  it('should shutdown 2 deployments in first user account', () => {
    DeploymentManage.shutDownDeployment(3, ws, 2)
    DeploymentManage.shutDownDeployment(4, ws, 2)
  })

  it('should login into usertwo account', () => {
    DeploymentManage.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(secondUser)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    Login.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
  })

  it('should shutdown first deployment in second user account', () => {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.getenvCardSelect(2).click()
    DeploymentManage.shutDownBtn.waitForVisible()
    DeploymentManage.shutDownBtn.click()
    DeploymentManage.shutDownAnywayBtn.waitForVisible()
    DeploymentManage.shutDownAnywayBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.shutDownBtn.isVisible()).to.eql(false)
  })

  it('should shutdown second deployment in second user account', () => {
    DeploymentManage.shutDownDeployment(1, ws, 2)
  })

  it('should login into userThree account', () => {
    Login.logout()
    browser.pause(3000)
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(userThree)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    Login.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
  })

  it('should shutdown first deployment in third user account', () => {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.getenvCardSelect(2).click()
    browser.scroll(0, -400)
    DeploymentManage.shutDownBtn.waitForVisible()
    DeploymentManage.shutDownBtn.click()
    DeploymentManage.shutDownAnywayBtn.waitForVisible()
    DeploymentManage.shutDownAnywayBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.shutDownBtn.isVisible()).to.eql(false)
  })
})

describe.skip('KA tagged page', () => {
  //TC_487
  it('should navigate user to KA tagged page, when user selects a tag from breadcrumb drop down of `draft` from KA manage page', () => {
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.draftDropDownFromBreadcrumb.click()
    DeploymentManage.getTagNumberFromDraftDropDown(2).waitForVisible()
    var tag = DeploymentManage.getTagNumberFromDraftDropDown(2).getText()
    DeploymentManage.getTagNumberFromDraftDropDown(2).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    expect(tag).to.eql(DeploymentManage.tagNumberFromBreadcrumb.getText())
  })

  //TC_495
  it('should display deploy button on bottom right of KA tagged page as default and clickable', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    expect(DeploymentManage.deployBtn.isEnabled()).to.eql(true)
    DeploymentManage.deployBtn.click() //To check whether clickable
    DeploymentManage.tagDeployModal.waitForVisible()
    //deploy pop up displayed
    expect(DeploymentManage.tagDeployModal.isVisible()).to.eql(true)
    DeploymentManage.cancelTagBtn.click()
  })

  //TC_498
  it('should verify that dependency component is non-editable in KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentCreate.dependenciesComponent.waitForVisible()
    expect(DeploymentCreate.kbdropDown.isVisible()).to.eql(false)
    expect(KintoBlockManage.getDependenciesDeleteIcon(1).isVisible()).to.eql(
      false
    )
  })

  //TC_488
  it('should navigate user to KA tagged page, when user enters URL of KA tagged page', () => {
    //Already in KA tagged page
    var url = DeploymentManage.getUrl().split('/')
    var ws = url[3]
    var kaID = url[5]
    var tag = url[7]
    DeploymentManage.draftDropDownFromBreadcrumb.click()
    DeploymentManage.getTagNumberFromDraftDropDown(2).waitForVisible()
    var tagNumber = DeploymentManage.getTagNumberFromDraftDropDown(2).getText()
    DeploymentManage.getTagNumberFromDraftDropDown(2).click()
    DeploymentManage.loadingFinished.waitForExist()
    //navigating to KA list page
    DashboardIndex.applicationLeftnav.click()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DashboardIndex.getUrl()).to.eql(
      `/app/dashboard/${ws}/deployments/list`
    )
    browser.url(`app/dashboard/${ws}/deployments/${kaID}/versions/${tag}`)
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    expect(tagNumber).to.eql(DeploymentManage.tagNumberFromBreadcrumb.getText())
  })

  //TC_489
  it('should display KA tagged page title as per KA selected', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    var kaName = DeploymentList.getKaNameFromKaCard(0).getText()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.draftDropDownFromBreadcrumb.click()
    DeploymentManage.getTagNumberFromDraftDropDown(2).waitForVisible()
    DeploymentManage.getTagNumberFromDraftDropDown(2).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    expect(kaName).to.eql(DeploymentManage.title.getText())
  })

  //TC_490
  it('should display compare versions, view environments, members bar, basic info component, dependency component and deploy button in a KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    expect(DeploymentManage.viewEnvironments.isVisible()).to.eql(true)
    expect(DeploymentManage.membersBar.isVisible()).to.eql(true)
    expect(DeploymentCreate.basicInfoComponent.isVisible()).to.eql(true)
    expect(DeploymentCreate.dependenciesComponent.isVisible()).to.eql(true)
    expect(DeploymentManage.deployBtn.isVisible()).to.eql(true)
  })

  //TC_496
  it('should revert `deploy` button to `save changes` button, when user edits KA tagged page', () => {
    //Now its deploy button
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    expect(DeploymentManage.deployBtn.getText()).to.eql('Deploy')
    DeploymentManage.name.input.setValue(
      testData.kintoapp.invalidThreeCharKaName
    )
    browser.pause(2000)
    expect(DeploymentManage.submitBtn.getText()).to.eql('Save Changes')
  })

  //TC_491
  it('should display validation error `Must be 3 characters or more`, when KA name is less than 3 characters in KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentManage.name.input.setValue(
      testData.kintoapp.invalidThreeCharKaName
    )
    browser.keys('Tab')
    expect(DeploymentManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  //TC_492
  it('should display validation error `Must be 24 characters or less`, when KA name is more than 24 characters in KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentManage.name.input.setValue(
      testData.kintoapp.invalidThirtyFiveCharKaName
    )
    browser.keys('Tab')
    expect(DeploymentManage.name.error.getText()).to.eql(
      'Must be 24 characters or less'
    )
  })

  //TC_493
  it('should display validation error `Only lowercase characters and digits are allowed`, when user enter other than letters in lowercase and numbers in KA name field of KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentManage.name.input.setValue(testData.kintoapp.allInvalidKaChars)
    browser.keys('Tab')
    expect(DeploymentManage.name.error.getText()).to.eql(
      `Must contain only lowercase characters and digits`
    )
  })

  it('should display validation error `The first character can`t be a digit`, when user enter number as first character in KA name field of KA tagged page', () => {
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentManage.name.input.setValue(
      testData.kintoapp.invalidKintoAppNameFirstCharNumber
    )
    browser.keys('Tab')
    expect(DeploymentManage.name.error.getText()).to.eql(
      `The first character can't be a digit`
    )
  })

  //TC_494
  it('should do validation blur if user enter valid data in KA name field of KA create page in second try', () => {
    //Previously name field is showing validation error
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppName + 'u'
    )
    expect(DeploymentCreate.name.error.isVisible()).to.eql(false)
  })

  //TC_497
  it('should verify that `save changes` button is still present, when user clicks `save changes` if there is any validation error ', () => {
    //Already deploy button is changed to save changes
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentManage.name.input.setValue(
      testData.kintoapp.invalidThreeCharKaName
    )
    browser.keys('Tab')
    expect(DeploymentManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
    DeploymentManage.submitBtn.click()
    expect(DeploymentManage.submitBtn.getText()).to.eql('Save Changes')
  })

  //TC_499
  it.skip('should navigated user to `compare versions` page, when user clicks on `compare versions` button in KA tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    browser.alertAccept()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.draftDropDownFromBreadcrumb.click()
    DeploymentManage.getTagNumberFromDraftDropDown(2).waitForVisible()
    DeploymentManage.getTagNumberFromDraftDropDown(2).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentManage.compareVersions.click()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.compareVersionsTitle.getText()).to.eql('CHANGELOGS')
  })

  //TC_500
  it('should navigated to environments list page, when user clicks on `view environments` button in KA tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    browser.alertAccept()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.draftDropDownFromBreadcrumb.click()
    DeploymentManage.getTagNumberFromDraftDropDown(2).waitForVisible()
    DeploymentManage.getTagNumberFromDraftDropDown(2).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.draftIcon.isVisible()).to.eql(false)
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  it('should display validation error message while deploying a deployment with unsuccessful build', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName =
      testData.kintoblock.validKintoBlockNameWithDigit + '289' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
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
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
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
    DeploymentCreate.open(ws)
    var kaName =
      testData.kintoapp.validKintoAppName + currentTime.getTime() + 'b'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(kbName)
    DeploymentCreate.getFilteredKB(kbName).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.waitForVisible()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.waitForVisible()
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.minorVersion.setValue('2')
    DeploymentManage.revision.setValue('4')
    DeploymentManage.notes.click()
    DeploymentManage.notes.setValue(testData.kintoapp.validTagNotes)
    DeploymentManage.createTagBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.unsuccessfullBuildErrorMsg.waitForVisible()
    expect(DeploymentManage.unsuccessfullBuildErrorMsg.getText()).to.eql(
      'One of your selected kintoblock versions does not have a successful build.'
    )
  })
})

describe.skip('should check for configure kintobocks', () => {
  it('should register and login', () => {
    Login.registerAndLogin('NB')
    WorkspaceManage.linkGithub()
    Landing.workspaceSelect.waitForVisible()
    ws = Landing.workspaceSelect.getAttribute('data-test')
  })

  it('should create a KB with nodejs and should add env variables', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs1,
      testData.kbrepo.repository1,
      testData.github.username
    )
    browser.pause(5000)
    browser.scroll(0, 1000)
    browser.pause(10000)
  })
})
