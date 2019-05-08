import { expect } from 'chai'
import Login from '../page-objects/login.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import WorkspaceCreate from '../page-objects/workspace.create.page'
import WorkspaceManage from '../page-objects/workspace.manage.page'
import DeploymentList from '../page-objects/deployment.list.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import DeploymentCreate from '../page-objects/deployment.create.page'
import DeploymentManage from '../page-objects/deployment.manage.page'
import testData from '../constants/testdata.json'
import Landing from '../page-objects/landing.page'
import { flashyGreen, green, grey } from '../constants/colors'
import MembersBar from '../page-objects/members.bar.page'

var currentDate = new Date()
var currentTime = new Date()
var memberOne
var memberTwo
var memberTwoEmail
var memberThreeEmail
var username
var wsName

describe('Workspace create/edit members', () => {
  it('should navigate to create new workspace page, when first option create new a workspace is selected from workspace dropdown', () => {
    Login.registerAndLogin('Q')
    WorkspaceManage.linkGithub()
    DashboardIndex.container.waitForVisible()
    DashboardIndex.workspaceDropdown.selectByValue(0)
    WorkspaceCreate.form.waitForVisible()
    expect(WorkspaceCreate.form.isVisible()).to.eql(true)
  })

  it('should navigate to create new workspace page, when create new workspace button is clicked from the  breadcrumb', () => {
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.workspaceBreadcrum.click()
    WorkspaceManage.breadCrumbDropDown.waitForVisible()
    WorkspaceManage.breadCrumbDropDownCreateWS.click()
    expect(WorkspaceCreate.form.isVisible()).to.eql(true)
  })

  it('should navigate to create new workspace page, when user enters url of create new workspace page in the browser', () => {
    var url = browser.getUrl().split('/')
    var wsID = url[5]
    WorkspaceCreate.open(wsID)
    WorkspaceCreate.form.waitForVisible()
    expect(WorkspaceCreate.getUrl()).to.eql(`/app/dashboard/${wsID}/create`)
  })

  it('should display the Permission dropdown with default setting as "member", in the create workspace page', () => {
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.workspacePermissionField.waitForVisible()
    expect(
      WorkspaceCreate.workspacePermissionField.getText('option:checked')
    ).to.eql('Member')
  })

  it('should display "owner" of workspace as default member in the members list of create new workspace page', () => {
    var ownerText = MembersBar.ownerIconText.getText()
    expect(ownerText).to.eql(
      MembersBar.getMemberInitialsFromMembersList(1).getText()
    )
  })

  // it('should check that permission field of the owner is not editable', () => {
  //   expect(WorkspaceCreate.workspacePermissionField.isEnabled()).to.eql(false)
  // })

  it('should validate that workspacename does not accept blank', () => {
    WorkspaceCreate.name.input.click()
    browser.keys('Tab')
    expect(WorkspaceCreate.name.error.getText()).to.eql('Required')
  })

  it('should validate that workspacename does not accept less than 3 characters', () => {
    WorkspaceCreate.name.input.setValue(testData.workspace.invalidWSThreeChar)
    browser.keys('Tab')
    expect(WorkspaceCreate.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  it('should validate that workspace does not accept more than 256 characters', () => {
    WorkspaceCreate.name.input.setValue(
      testData.workspace.invalidWSTwoFiftySixChar
    )
    expect(WorkspaceCreate.name.error.getText()).to.eql(
      'Must be 256 characters or less'
    )
  })

  it('should display validation error message, when creating workspace with invalid characters', () => {
    WorkspaceCreate.name.input.setValue(testData.workspace.invalidWorkSpaceName)
    expect(WorkspaceCreate.name.error.getText()).to.eql(
      `Only the following special characters @_'. are valid`
    )
  })

  it('should navigate to workspace create page, when user try redirecting to new workspace create page while user is already in workspace create page with validation errors', () => {
    //Already there are validation errors in page
    expect(WorkspaceCreate.name.error.isVisible()).to.eql(true)
    DashboardIndex.workspaceDropdown.selectByIndex(0)
    browser.alertAccept()
    WorkspaceCreate.loadingFinished.waitForExist()
    expect(WorkspaceCreate.name.error.isVisible()).to.eql(false)
  })

  it('should validate that workspace name accepts letters (a-z, both caps), numbers (0-9), underscores, apostrophes, periods (.), at (@)', () => {
    WorkspaceCreate.nameField.clearElement()
    browser.pause(2000)
    WorkspaceCreate.nameField.setValue(testData.workspace.validWorkSpaceName)
    expect(WorkspaceCreate.name.error.isVisible()).to.eql(false)
    WorkspaceCreate.nameField.setValue(testData.workspace.allValidWorkSpaceName)
    expect(WorkspaceCreate.name.error.isVisible()).to.eql(false)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForVisible()
    WorkspaceCreate.workspaceCongratsBtn.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.editWorkspaceHeading.waitForVisible()
  })

  it('should navigate to edit page of workspace, when user click edit icon', () => {
    WorkspaceCreate.loadingFinished.waitForExist()
    DashboardIndex.editWorkspace.click()
    expect(WorkspaceManage.form.isVisible()).to.eql(true)
  })

  it('should navigate to edit page of any workspace, when any workspace is selected from the breadcrumb', () => {
    WorkspaceManage.workspaceBreadcrum.click()
    WorkspaceManage.breadCrumbDropDown.waitForVisible()
    WorkspaceManage.getbreadCrumbEditWorkspace(2).waitForVisible()
    WorkspaceManage.getbreadCrumbEditWorkspace(2).click()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    expect(WorkspaceManage.getUrl()).to.eql(`/app/dashboard/${ws}/edit`)
  })

  it('should navigate to edit page of workspace, when user enters the url for edit page of workspace', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceManage.open(ws)
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.editWorkspaceHeading.waitForVisible()
    expect(WorkspaceManage.getUrl()).to.eql(`/app/dashboard/${ws}/edit`)
  })

  it('should display title as members for members list section', () => {
    expect(WorkspaceManage.membersListTitle.getText()).to.eql('Members')
  })

  it('should display subtitle below the title member', () => {
    expect(WorkspaceManage.membersSubtitle.getText()).to.eql(
      'Invite new members to your workspace (they will receive an email invite and a notification)'
    )
  })

  // it('should add a new meber to the workspace', () => {
  //   browser.scroll(0,200)
  //   WorkspaceCreate.workspaceEmailInputField.click()
  //   WorkspaceCreate.workspaceEmailInputField.setValue(testData.workspace.validWorkSpaceMemberEmail)
  //   WorkspaceCreate.workspacePermissionField.click()
  //   WorkspaceCreate.workspaceAddIcon.click()
  //   browser.pause(2000)
  //   WorkspaceCreate.submitGlobal()
  //   WorkspaceCreate.loadingFinished.waitForExist()
  // })

  // it('should delete the added memeber', () => {
  //   WorkspaceManage.getMemberDeleteIcon(2).waitForExist()
  //   WorkspaceManage.getMemberDeleteIcon(2).leftClick()
  //   browser.pause(2000)
  //   expect(WorkspaceManage.getAddedMemberEmail(2).isVisible()).to.eql(false)

  // })

  it('should create a user and workspace, then send an invite to member by adding to the workspace', () => {
    WorkspaceManage.logout()
    Login.registerAndLogin('IM')
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceCreate.open(ws)
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    wsName = 'Test Workspace' + WorkspaceCreate.randomName()
    WorkspaceCreate.name.input.setValue(wsName)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForVisible()
    WorkspaceCreate.workspaceCongratsBtn.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    WorkspaceManage.workspaceEmailInputField.waitForVisible()
    WorkspaceManage.workspaceEmailInputField.setValue(
      testData.login.validGmailUser
    )
    WorkspaceManage.workspaceAddIcon.click()
    WorkspaceManage.submitGlobal()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.logout()
  })

  it('should accept the invite and verify workspace shared is displayed', () => {
    browser.newWindow('https://accounts.google.com/signin')
    browser.pause(5000)
    WorkspaceManage.gmailUsernameField.waitForVisible()
    WorkspaceManage.gmailUsernameField.setValue(testData.login.validGmailUser)
    browser.keys('Enter')
    WorkspaceManage.gmailPwdField.waitForVisible()
    WorkspaceManage.gmailPwdField.setValue(testData.login.validGmailPwd)
    browser.keys('Enter')
    browser.pause(5000)
    browser.url('https://mail.google.com/mail/u/0/#inbox')
    browser.pause(5000)
    WorkspaceManage.searchBarForGmailInbox.waitForVisible()
    WorkspaceManage.searchBarForGmailInbox.setValue('join the workspace')
    browser.keys('Enter')
    browser.pause(5000)
    WorkspaceManage.openMail.waitForVisible()
    WorkspaceManage.openMail.click()
    browser.pause(20000)
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
  })

  it('Should share the workspace through mail', () => {
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[2])
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
})

describe('Workspace create Overall', () => {
  it('should display title as `Create New Workspace` at top of the `create workspace form` page', () => {
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[0])
    browser.pause(2000)
    username = Login.registerAndLogin('W')
    //Should start the Github link flow, when user clicks on `GitHub button` in the `edit workspace` pag
    WorkspaceManage.linkGithubSecondTime()
    DashboardIndex.container.waitForVisible()
    DashboardIndex.workspaceDropdown.waitForVisible()
    DashboardIndex.workspaceDropdown.selectByValue(0)
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    expect(WorkspaceCreate.form.isVisible()).to.eql(true)
    expect(WorkspaceCreate.createNewWorkspaceTitle.getText()).to.eql(
      'Create New Workspace'
    )
  })

  it('should not allow user of workspace to delete members with admin rights in workspace create page', () => {
    //Checking whether "delete icon" is disabled for member with Admin rights
    WorkspaceManage.getMemberDeleteIconDisabled(1).waitForVisible()
    expect(WorkspaceManage.getMemberDeleteIconDisabled(1).isVisible()).to.eql(
      true
    )
  })

  it('should allow add new member to existing members list in workspace create page', () => {
    browser.scroll(0, 2000)
    WorkspaceManage.workspaceEmailInputField.waitForVisible()
    WorkspaceManage.workspaceEmailInputField.setValue(testData.login.validEmail)
    WorkspaceManage.workspaceAddIcon.click()
    browser.pause(2000)
    WorkspaceCreate.loadingFinished.waitForExist()
    expect(WorkspaceManage.getAddedMemberEmail(2).getValue()).to.includes(
      testData.login.validEmail
    )
  })

  it('should allow to remove members with member rights from members list of create workspace page ', () => {
    WorkspaceManage.getMemberDeleteIcon(2).waitForExist()
    WorkspaceManage.getMemberDeleteIcon(2).leftClick()
    browser.pause(2000)
    expect(WorkspaceManage.getAddedMemberEmail(2).isVisible()).to.eql(false)
  })

  it('should display disabled `Create New Workspace` button at bottom right, when user navigates to `create workspace page`', () => {
    browser.refresh()
    browser.alertAccept()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    expect(WorkspaceCreate.workspaceCreateBtnDisabled.isVisible()).to.eql(true)
  })

  it('should display placeholder of email text field in members component as `Enter workspace member email` in `create workspace` page', () => {
    expect(
      WorkspaceCreate.workspaceEmailInputField.getAttribute('placeholder')
    ).to.eql('Enter workspace member email')
  })

  it('should display title and subtitle for `Members` component, when user navigates to `create workspace` page', () => {
    expect(WorkspaceCreate.membersTitle.getText()).to.eql('Members')
    expect(WorkspaceCreate.membersSubtitle.getText()).to.eql(
      'An admin can create and edit any project, and manage permissions for every member. A member can create new projects and edit the ones they have access to.'
    )
  })

  it('should display placeholder text of workspace name field in `create workspace` page is `Enter an name for your workspace`', () => {
    expect(WorkspaceCreate.name.input.getAttribute('placeholder')).to.eql(
      'Enter an name for your workspace'
    )
  })

  it('should not create new workspace using spaces(` `) as workspace name', () => {
    WorkspaceCreate.name.input.setValue(
      testData.workspace.validWorkSpaceNameOnlyWithSpaces
    )
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.name.error.waitForVisible()
    expect(WorkspaceCreate.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  it('should display explanation of workspace in the explanation zone of create new workspace', () => {
    expect(WorkspaceCreate.workspaceExplanationTitle.isVisible()).to.eql(true)
    expect(WorkspaceCreate.whatIsWorkspaceExplanation.isVisible()).to.eql(true)
    expect(WorkspaceCreate.whatIsWorkspaceHelpLink.isVisible()).to.eql(true)
  })

  it('should navigate to "workspace" documentation page, when user clicks on "learn more here"', () => {
    browser.scroll(0, -2000)
    WorkspaceCreate.whatIsWorkspaceHelpLink.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[3])
    browser.pause(2000)
    expect(DashboardIndex.docPageTitle.getText()).to.eql('Workspaces')
  })

  it('should display `Basic component` with title, workspace name input field and permission toggle button', () => {
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[0])
    browser.pause(2000)
    expect(WorkspaceCreate.basicInfoTitle.getText()).to.eql('Basic Info')
    expect(WorkspaceCreate.basicInfoSubtitle.getText()).to.eql(
      'Enter a name for your workspace.'
    )
    expect(WorkspaceCreate.name.input.isVisible()).to.eql(true)
    // expect(WorkspaceCreate.basicInfoToggleBtn.isVisible()).to.eql(true)
  })

  it('should display Empty grey icon, email input field, permission dropdown and `+` blue add icon in `Member` component of the `create workspace` form', () => {
    expect(WorkspaceCreate.workspaceEmptyGreyIcon.isVisible()).to.eql(true)
    expect(WorkspaceCreate.workspaceEmailInputField.isVisible()).to.eql(true)
    expect(WorkspaceCreate.workspacePermissionField.isVisible()).to.eql(true)
    expect(WorkspaceCreate.workspaceAddIcon.isVisible()).to.eql(true)
  })

  it('should display member as first option in the permission dropdown, when user is in create page of workspace', () => {
    var options = WorkspaceCreate.workspacePermissionField.getText().split('\n')
    expect(options[0]).to.eql('Member')
  })

  it('should display `Save bar` always at bottom of the `create workspace` page', () => {
    expect(WorkspaceCreate.savebar.isVisible()).to.eql(true)
  })

  it('should display a enabled `Create New Workspace` button at bottom right, when user navigates to `create workspace page` and enter name in the Workspace name field', () => {
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.workspaceCreateBtnEnabled.waitForVisible()
    expect(WorkspaceCreate.workspaceCreateBtnEnabled.isVisible()).to.eql(true)
  })

  it('should display alert pop up message, when user try to navigate to any page of KH from `create workspace` page while `create new workspace` button is enabled', () => {
    DashboardIndex.applicationLeftnav.click()
    browser.pause(1000)
    browser.alertAccept()
  })

  it('should display member as first option in the permission dropdown, when user is in edit page of workspace', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceManage.open(ws)
    WorkspaceManage.form.waitForVisible()
    expect(
      WorkspaceCreate.workspacePermissionField.getText('option:checked')
    ).to.eql('Member')
  })

  it('should display the Permission dropdown with default setting as "member", when adding a new member in edit page of the workspace', () => {
    var options = WorkspaceCreate.workspacePermissionField.getText().split('\n')
    expect(options[0]).to.eql('Member')
  })

  it('should display `Github connection` component in `edit` page of workspace, when user navigates to workspace edit page', () => {
    expect(WorkspaceManage.githubTitle.getText()).to.eql('Repo Sources')
  })

  it('should display user as current member added to workspace under members list, when creating a new workspace', () => {
    expect(MembersBar.ownerIconText.getText()).to.eql(
      MembersBar.getMemberInitialsFromMembersList(1).getText()
    )
  })

  it('should navigate non-member of the workspace to login page, when he try to access the workspace', () => {
    WorkspaceManage.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    var userOneWorkspaceUrl = browser.getUrl()
    DashboardIndex.logout()
    Login.registerAndLogin('NM')
    DashboardIndex.container.waitForExist()
    browser.url(userOneWorkspaceUrl)
    browser.pause(10000)
    Login.loginUsername.waitForVisible()
    expect(Login.loginUsername.isVisible()).to.eql(true)
  })

  it('should verify existing member name field data is not getting populated with data of new member added to the workspace', () => {
    memberOne = Login.registerAndLogin('B') + '@kintoe2e.com'
    Login.logout()
    memberTwo = Login.registerAndLogin('C') + '@kintoe2e.com'
    Login.logout()
    Login.open()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    WorkspaceManage.workspaceEmailInputField.waitForVisible()
    WorkspaceManage.workspaceEmailInputField.setValue(memberOne)
    WorkspaceManage.workspaceAddIcon.click()
    WorkspaceManage.submitGlobal()
    WorkspaceManage.loadingFinished.waitForExist()
    //As there is a bug now i'm using index 1, when bug is resolved index should be 2
    //memberTwoEmail = WorkspaceManage.getAddedMemberEmail(2).getValue()
    memberTwoEmail = WorkspaceManage.getAddedMemberEmail(2).getValue()
    expect(memberTwoEmail).to.includes(memberOne)
    //Adding a new member
    WorkspaceManage.workspaceEmailInputField.setValue(memberTwo)
    WorkspaceManage.workspaceAddIcon.click()
    WorkspaceManage.submitGlobal()
    WorkspaceManage.loadingFinished.waitForExist()
    //As there is a bug now i'm using index 2, when bug is resolved index should be 3
    // memberTwoEmail = WorkspaceManage.getAddedMemberEmail(3).getValue()
    memberThreeEmail = WorkspaceManage.getAddedMemberEmail(3).getValue()
    expect(memberThreeEmail).to.includes(memberTwo)
    expect(memberTwoEmail).to.not.eql(memberThreeEmail)
  })

  it('should display members with admin rights in top of members list and members with member rights below the members with admin rights', () => {
    var memberOneIcon = MembersBar.getMemberInitialsFromMembersList(1).getText()
    var memberTwoIcon = MembersBar.getMemberInitialsFromMembersList(2).getText()
    var memberThreeIcon = MembersBar.getMemberInitialsFromMembersList(
      3
    ).getText()
    expect(memberOneIcon).to.eql(
      MembersBar.getMemberInitialsFromMembersList(1).getText()
    )
    expect(memberTwoIcon).to.eql(
      MembersBar.getMemberInitialsFromMembersList(2).getText()
    )
    expect(memberThreeIcon).to.eql(
      MembersBar.getMemberInitialsFromMembersList(3).getText()
    )
    //Now making third member as admin
    WorkspaceManage.getMemberPermissions(3).selectByIndex(1)
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.submitGlobal()
    WorkspaceManage.loadingFinished.waitForExist()
    expect(memberOneIcon).to.eql(
      MembersBar.getMemberInitialsFromMembersList(1).getText()
    )
    expect(memberThreeIcon).to.eql(
      MembersBar.getMemberInitialsFromMembersList(2).getText()
    )
    expect(memberTwoIcon).to.eql(
      MembersBar.getMemberInitialsFromMembersList(3).getText()
    )
  })

  it('should create a new workspace successfully', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceCreate.open(ws)
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
  })

  it('should verify new workspace created is listed in the workpsace drop down', () => {
    expect(DashboardIndex.getWSDropdownElement(3).getText()).to.eql(
      testData.workspace.validWorkSpaceName
    )
  })

  it('should verify new workspace created becomes as current workspace', () => {
    var ws = DashboardIndex.workspaceDropdown.getText('option:checked')
    expect(ws).to.not.eql(DashboardIndex.getWSDropdownElement(2).getText())
    expect(ws).to.eql(testData.workspace.validWorkSpaceName)
  })

  it('should allow admin/owner to change members rights from permission dropdown,when user is in edit page of workspace', () => {
    browser.scroll(0, 2000)
    WorkspaceManage.workspaceEmailInputField.waitForVisible()
    WorkspaceManage.workspaceEmailInputField.setValue(testData.login.validEmail)
    WorkspaceManage.workspaceAddIcon.click()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.getMemberPermissions(2).moveToObject()
    var currentOption = WorkspaceManage.getMemberPermissions(2).getText(
      'option:checked'
    )
    expect(currentOption).to.eql('Member')
    WorkspaceManage.getMemberPermissions(2).selectByIndex(1)
    currentOption = WorkspaceManage.getMemberPermissions(2).getText(
      'option:checked'
    )
    expect(currentOption).to.eql('Admin')
    browser.refresh()
    browser.alertAccept()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
  })

  it('should display all members details of the workspace as a list with user icon, name and email, permission dropdown and delete icon', () => {
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    browser.pause(10000)
    MembersBar.getMemberInitialsFromMembersList(1).moveToObject()
    expect(MembersBar.getMemberInitialsFromMembersList(1).isVisible()).to.eql(
      true
    )
    expect(WorkspaceManage.getAddedMemberEmail(1).isVisible()).to.eql(true)
    expect(WorkspaceManage.getMemberPermissions(1).isVisible()).to.eql(true)
    //TODO for delete icon
    expect(MembersBar.getMemberInitialsFromMembersList(2).isVisible()).to.eql(
      true
    )
    expect(WorkspaceManage.getAddedMemberEmail(2).isVisible()).to.eql(true)
    expect(WorkspaceManage.getMemberPermissions(2).isVisible()).to.eql(true)
    //TODO for delete icon
    expect(MembersBar.getMemberInitialsFromMembersList(3).isVisible()).to.eql(
      true
    )
    expect(WorkspaceManage.getAddedMemberEmail(3).isVisible()).to.eql(true)
    expect(WorkspaceManage.getMemberPermissions(3).isVisible()).to.eql(true)
    //TODO for delete icon
  })
})

describe('Workspace edit Overall', () => {
  it('should have title of page according to current workspace selected, when user navigates to edit page of workspace', () => {
    var ws = DashboardIndex.workspaceDropdown.getText('option:checked')
    expect(WorkspaceManage.workspaceTitle.getText()).to.eql(ws)
  })

  it('should display `Basic component` with title, workspace name input field and permission toggle button, when user navigates to `edit workspace` form', () => {
    expect(WorkspaceManage.basicInfoTitle.getText()).to.eql('Basic Info')
    expect(WorkspaceManage.basicInfoSubtitle.getText()).to.eql(
      'Enter a name for your workspace.'
    )
    expect(WorkspaceCreate.name.input.isVisible()).to.eql(true)
    // expect(WorkspaceCreate.basicInfoToggleBtn.isVisible()).to.eql(true)
  })

  it('should not allow user of workspace to delete members with admin rights in workspace manage page', () => {
    browser.refresh()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 100)
    //Checking whether "delete icon" is disabled for member with Admin rights
    WorkspaceManage.getMemberDeleteIconDisabled(1).moveToObject()
    WorkspaceManage.getMemberDeleteIconDisabled(1).waitForVisible()
    expect(WorkspaceManage.getMemberDeleteIconDisabled(1).isVisible()).to.eql(
      true
    )
  })

  it('should display Empty grey icon, email input field, permission dropdown and `+` blue add icon in `Member` component of the `edit workspace` form', () => {
    expect(WorkspaceManage.workspaceEmptyGreyIcon.isVisible()).to.eql(true)
    expect(WorkspaceManage.workspaceEmailInputField.isVisible()).to.eql(true)
    expect(WorkspaceManage.workspacePermissionField.isVisible()).to.eql(true)
    expect(WorkspaceManage.workspaceAddIcon.isVisible()).to.eql(true)
  })

  it('should display validation error, when user duplicates members in the members list of `edit workspace` page', () => {
    browser.scroll(0, 2000)
    WorkspaceManage.workspaceEmailInputField.waitForVisible()
    var duplicateMember = WorkspaceManage.getAddedMemberEmail(1).getValue()
    WorkspaceManage.workspaceEmailInputField.setValue(duplicateMember)
    WorkspaceManage.workspaceAddIcon.click()
    WorkspaceManage.duplicateErrorMsg.waitForVisible()
    expect(WorkspaceManage.duplicateErrorMsg.getText()).to.eql(
      'Invalid email address'
    )
  })

  it('should display `Save bar` always at bottom of the `edit workspace` page', () => {
    expect(WorkspaceManage.savebar.isVisible()).to.eql(true)
  })

  it('should display disabled `Save Chnages` button at bottom right, when user navigates to `edit workspace page`', () => {
    expect(WorkspaceManage.submitBtn.isEnabled()).to.eql(false)
    expect(WorkspaceManage.submitBtn.getText()).to.eql('Save Changes')
  })

  it('should display a enabled `Save Chnages` button at bottom right, when user navigates to `edit workspace page` and edit name in the Workspace name field', () => {
    WorkspaceManage.name.input.setValue(testData.workspace.validwsdigit)
    WorkspaceCreate.workspaceCreateBtnEnabled.waitForVisible()
    expect(WorkspaceManage.submitBtn.isEnabled()).to.eql(true)
    WorkspaceManage.submitGlobal()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.form.waitForVisible()
  })

  it('should save edited members permission, when user edit the permission of any member and save the changes', () => {
    browser.scroll(0, 2000)
    WorkspaceManage.workspaceEmailInputField.waitForVisible()
    WorkspaceManage.workspaceEmailInputField.setValue(testData.login.validEmail)
    WorkspaceManage.workspaceAddIcon.click()
    WorkspaceManage.submitGlobal()
    WorkspaceManage.loadingFinished.waitForExist()
    var currentOption = WorkspaceManage.getMemberPermissions(4).getText(
      'option:checked'
    )
    expect(currentOption).to.eql('Member')
    WorkspaceManage.getMemberPermissions(4).selectByIndex(1)
    WorkspaceManage.submitGlobal()
    WorkspaceManage.loadingFinished.waitForExist()
    currentOption = WorkspaceManage.getMemberPermissions(3).getText(
      'option:checked'
    )
    expect(currentOption).to.eql('Admin')
    expect(currentOption).to.not.eql('Member')
  })

  // it('should display changes in members icon list present below workspace drop down, when user edit members list in `edit workspace` page',()=>{

  // })

  // it('should allow admin to change members rights from permission dropdown,when user is in edit page of workspace',()=>{

  // })

  // it('should allow remove members from members list of edit page with member rights',()=>{

  // })
})

describe('Workspaces edit Github connection', () => {
  it('should display title and subtitle in the `Github component`, when user navigates to `edit workspace` page', () => {
    WorkspaceManage.loadingFinished.waitForExist()
    expect(WorkspaceManage.githubTitle.getText()).to.eql('Repo Sources')
    expect(WorkspaceManage.githubSubtitle.getText()).to.eql(
      'Linking a repo source allows you to use any existing repositories within and create new ones. Please make sure every workspace member has the correct access to the organization. Once it’s been linked you cannot unlink it.'
    )
    WorkspaceManage.logout()
  })

  it.skip('should display explanatory text, disclaimer and Link to Github tutorial under the `Github component` of `edit workspace` page, when no organisation is linked', () => {
    expect(WorkspaceManage.githubExplanatoryText.getText()).to.eql(
      'Please make sure every workspace member has the correct access to the GitHub organization.'
    )
    //expect(WorkspaceManage.githubLinkBtn.isVisible()).to.eql(true)
    //TODO Disclaimer and Link to Github tutorial
    WorkspaceManage.logout()
  })

  //Already covered in first TC
  it.skip('should start the Github link flow, when user clicks on `GitHub button` in the `edit workspace` page', () => {
    WorkspaceManage.githubLinkBtn.click()
    WorkspaceManage.githubSignInPage.waitForVisible()
    expect(WorkspaceManage.githubSignInPage.isVisible()).to.eql(true)
  })
})

describe('Workspace create/edit Basic Info', () => {
  it.skip('should display toggle button switched on by default, when user navigates to `create workspace` page', () => {
    Login.registerAndLogin('H')
    WorkspaceManage.linkGithubSecondTime()
    DashboardIndex.container.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceCreate.open(ws)
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('true')
  })

  it.skip('should not do nothing while toggle button is switched on, when user navigates to `create workspace` page and hover over `Toggle` button', () => {
    WorkspaceCreate.switchTogglerBtn.click() //Turning it Off, as its on by default
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('false')
    browser.moveToObject('span.toggle-slider')
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('false')
  })

  it.skip('should display tool tip text, when user clicks on `?` icon present beside `toggle` bar in `create workspace` page ', () => {
    WorkspaceCreate.toggleBarToolTip.click()
    WorkspaceCreate.toggleBarToolTipText.waitForVisible()
    expect(WorkspaceCreate.toggleBarToolTipText.getText()).to.eql(
      'Turn this on to make all projects visible to every workspace member by default.'
    )
  })

  it.skip('should display toggle bar turned green, when user switches toggle button on while user is in `create workspace` page', () => {
    WorkspaceCreate.switchTogglerBtn.click() //Turn the switch on to green
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('true')
    var elemProperties = WorkspaceCreate.switchTogglerBtn.getCssProperty(
      'background-color'
    ).parsed.hex
    expect(elemProperties).to.eql(green) //Green
  })

  it.skip('should display toggle bar turned grey, when user switches toggle button on while user is in `create workspace` page', () => {
    WorkspaceCreate.switchTogglerBtn.click() //Switch it off
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('false')
    var elemProperties = WorkspaceCreate.switchTogglerBtn.getCssProperty(
      'background-color'
    ).parsed.hex
    expect(elemProperties).to.eql(grey) //Green
  })

  it.skip('should display toggle button as light flashy green on hover , when user is in  `create workspace` page and if the toggle button is switched off ', () => {
    browser.moveToObject('span.toggle-slider')
    var elemProperties = WorkspaceCreate.switchTogglerBtn.getCssProperty(
      'background-color'
    ).parsed.hex
    expect(elemProperties).to.eql(flashyGreen)
  })

  it.skip('should display members bar toggle switched off for any project (KA or KB) created in the workspace, when `Toggle` button switched off in the `create workspace` page', () => {
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.warningBtn.waitForVisible()
    WorkspaceCreate.warningBtn.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    //TODO Verify details after workspace save is implemented.
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppName + currentDate.getTime()
    )
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.submitGlobal()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.title.waitForVisible()
    expect(DeploymentManage.switchValueForWS.getAttribute('value')).to.eql(
      'true'
    )
  })

  it.skip('should display members bar toggle switched on for any project (KA or KB) created in the workspace, when `Toggle` button switched on in the `create workspace` page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceCreate.open(ws)
    WorkspaceCreate.switchTogglerBtn.click()
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('true')
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.submitGlobal()
    //TODO Verify details after workspace save is implemented.
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)

    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppName + '2' + currentDate.getTime()
    )
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.submitGlobal()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.title.waitForVisible()
    expect(DeploymentManage.switchValueForWS.getAttribute('value')).to.eql(
      'true'
    )
  })

  it('should display error message if workspace name doesn`t follow validation criteria, when user edit the existing workspace name and validate', () => {
    Login.registerAndLogin('J')
    WorkspaceManage.linkGithubSecondTime()
    DashboardIndex.container.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceCreate.open(ws)
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForVisible()
    WorkspaceCreate.workspaceCongratsBtn.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.nameField.setValue(testData.workspace.invalidWorkSpaceName)
    browser.keys('Tab')
    WorkspaceCreate.name.error.waitForVisible()
    expect(WorkspaceCreate.name.error.getText()).to.eql(
      `Only the following special characters @_'. are valid`
    )
  })

  it.skip('should display tool tip text, when user clicks on `?` icon present beside `toggle` bar in `edit workspace` page ', () => {
    WorkspaceManage.toggleBarToolTip.click()
    WorkspaceManage.toggleBarToolTipText.waitForVisible()
    expect(WorkspaceManage.toggleBarToolTipText.getText()).to.eql(
      'Turn this on to make all projects visible to every workspace member by default.'
    )
  })

  it('should not display error message if workspace name follow validation criteria, when user edits the existing workspace name and validates', () => {
    //WorkspaceManage.loadingFinished.waitForExist()
    var workspaceName =
      testData.workspace.validWorkSpaceName +
      currentTime.getMinutes() +
      currentTime.getSeconds()
    WorkspaceManage.name.input.setValue(workspaceName)
    expect(WorkspaceManage.name.error.isVisible()).to.eql(false)
    WorkspaceManage.submitGlobal()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.title.waitForVisible()
    expect(WorkspaceManage.title.getText()).to.eql(workspaceName)
    var ws = DashboardIndex.workspaceDropdown.getText('option:checked')
    expect(ws).to.eql(workspaceName)
    expect(WorkspaceManage.workspaceNameFromBreadcrumb.getText()).to.eql(
      workspaceName
    )
    WorkspaceManage.workspaceBreadcrum.leftClick()
    WorkspaceManage.dropdownIsShownShort.waitForVisible()
    WorkspaceManage.getbreadCrumbEditWorkspace(2).waitForVisible()
    expect(
      WorkspaceManage.getWorkspaceNameInWorksapceSwitcher(2).getText()
    ).to.eql(workspaceName)
    browser.pause(2000)
  })

  it.skip('should display members bar toggle switched on for any project (KA or KB) created in the workspace, when `Toggle` button switched on in the `edit workspace` page', () => {
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.switchTogglerBtn.click()
    expect(WorkspaceManage.toggleBar.getAttribute('value')).to.eql('true')
    WorkspaceManage.submitGlobal()
    WorkspaceManage.loadingFinished.waitForExist()
    //TODO Verify details after workspace save feature is implemented.
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppName + '3' + currentDate.getTime()
    )
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.submitGlobal()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.title.waitForVisible()
    expect(DeploymentManage.switchValueForWS.getAttribute('value')).to.eql(
      'true'
    )
  })

  it.skip('should display members bar toggle switched off for any project (KA or KB) created in the workspace, when `Toggle` button switched off in the `edit workspace` page', () => {
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.switchTogglerBtn.click()
    expect(WorkspaceManage.toggleBar.getAttribute('value')).to.eql('true')
    WorkspaceManage.submitGlobal()
    //TODO Verify details after workspace save feature is implemented.
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.name.input.setValue(
      testData.kintoapp.validKintoAppName + '4' + currentDate.getTime()
    )
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.submitGlobal()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.title.waitForVisible()
    expect(DeploymentManage.switchValueForWS.getAttribute('value')).to.eql(
      'true'
    )
  })

  it.skip('should not do nothing while toggle button is switched on, when user navigates to `edit workspace` page and hover over `Toggle` button', () => {
    WorkspaceCreate.switchTogglerBtn.click()
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('true')
    browser.moveToObject('span.toggle-slider')
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('true')
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.warningBtn.waitForExist()
    WorkspaceCreate.warningBtn.click()
    WorkspaceManage.form.waitForVisible()
  })
})

describe('Workspace - Repo resources', () => {
  //TC_1280
  it('should verify "No repo source has been linked" is displayed, when repo sources are linked', () => {
    WorkspaceManage.logout()
    Login.registerAndLogin('RR')
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    WorkspaceManage.noRepoLinkedText.waitForVisible()
    expect(WorkspaceManage.noRepoLinkedText.getText()).to.eql(
      'No repo source has been linked'
    )
  })

  //TC_1281
  it('should verify whether buttons for linking repo resources is displayed in workspace manage page', () => {
    expect(WorkspaceManage.githubLinkBtn.isVisible()).to.eql(true)
    expect(WorkspaceManage.githubLinkBtn.getText()).to.eql(
      'Link GitHub Account'
    )
    expect(WorkspaceManage.bitbucketLinkBtn.isVisible()).to.eql(true)
    expect(WorkspaceManage.bitbucketLinkBtn.getText()).to.eql(
      'Link Bitbucket Account'
    )
    //Gitlab button is disabled for now
    expect(WorkspaceManage.gitLabLinkBtn.isVisible()).to.eql(true)
    expect(WorkspaceManage.gitLabLinkBtn.getText()).to.eql(
      'GitLab Support Coming Soon'
    )
  })

  //TC_1282
  it('should verify whether buttons for linking repo sources displays icons as per repo resource', () => {
    expect(WorkspaceManage.gitHubIconInLinkBtn.isVisible()).to.eql(true)
    expect(WorkspaceManage.bitbucketIconInLinkBtn.isVisible()).to.eql(true)
    //Gitlab button is disabled for now
    expect(WorkspaceManage.gitLabIconInLinkBtn.isVisible()).to.eql(true)
  })

  //TC_1288
  it('should navigate to GitHub login page, when user clicks on "GitHub Link Account" button', () => {
    var url = browser.getUrl()
    browser.url(testData.github.url)
    browser.pause(5000)
    WorkspaceManage.logoutFromGitHub()
    browser.pause(5000)
    browser.url(url)
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.gitHubIconInLinkBtn.waitForVisible()
    WorkspaceManage.githubLinkBtn.waitForVisible()
    var href = WorkspaceManage.githubLinkBtn.getAttribute('href')
    browser.url(href)
    WorkspaceManage.gitHubSignUpText.waitForVisible()
    expect(WorkspaceManage.gitHubSignUpText.getText()).to.include(
      'Sign in to GitHub'
    )
    browser.url(url)
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.gitHubIconInLinkBtn.waitForVisible()
  })

  //TC_1283
  it('should verify whether "No repo source has been linked" text is not displayed, when any one of the repo source is been linked', () => {
    WorkspaceManage.linkGithub()
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(WorkspaceManage.noRepoLinkedText.isVisible()).to.eql(false)
  })

  //TC_1285
  it('should verify linked organisation in organisation list displays organisation image, name, username of the member in organisation and repo resource icon', () => {
    WorkspaceManage.getOrganisationImg(1).waitForVisible()
    expect(WorkspaceManage.getOrganisationImg(1).isVisible()).to.eql(true)
    expect(WorkspaceManage.getOrganisationName(1).isVisible()).to.eql(true)
    expect(WorkspaceManage.getOrganisationName(1).getText()).to.eql('GittestCC')
    expect(WorkspaceManage.getUserNameInOrganisation(1).isVisible()).to.eql(
      true
    )
    expect(WorkspaceManage.getUserNameInOrganisation(1).getText()).to.eql(
      'GittestCC'
    )
    expect(WorkspaceManage.getRepoSourceIcon(1).isVisible()).to.eql(true)
  })

  //TC_1286
  it('should verify whether "GitHub Linked" text is displayed in GitHub link button, when its linked', () => {
    expect(WorkspaceManage.githubLinkBtn.getText()).to.eql('GitHub Linked')
  })

  //TC_1287
  it('should verify whether "GitHub Linked" button is displayed in green color and displays success icon in it', () => {
    //Manual test for green colour button
    expect(WorkspaceManage.linkSuccessIconInGitHubBtn.isVisible()).to.eql(true)
  })

  //TC_1291
  it('should navigate to Bitbucket login page, when user clicks on "Bitbucket Link Account" button', () => {
    var url = browser.getUrl()
    WorkspaceManage.bitbucketLinkBtn.waitForVisible()
    var href = WorkspaceManage.bitbucketLinkBtn.getAttribute('href')
    browser.url(href)
    WorkspaceManage.bitbucketSignUpText.waitForVisible()
    expect(WorkspaceManage.bitbucketSignUpText.getText()).to.eql(
      'Log in to continue to Bitbucket'
    )
    browser.url(url)
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.bitbucketLinkBtn.waitForVisible()
  })

  //TC_1289
  it('should verify whether "Bitbucket Linked" text is displayed in Bitbucket link button, when its linked', () => {
    WorkspaceManage.linkBitbucket()
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(WorkspaceManage.bitbucketLinkBtn.getText()).to.eql(
      'Bitbucket Linked'
    )
  })

  //TC_1290
  it('should verify whether "Bitbucket Linked" button is displayed in green color and displays success icon in it', () => {
    //Manual test for green colour button
    expect(WorkspaceManage.linkSuccessIconInBitbucketBtn.isVisible()).to.eql(
      true
    )
  })

  //TC_1292
  it('should verify in single workspace user can link both "GitHub" and "Bitbucket"', () => {
    //We already linked to both repo resources
    expect(WorkspaceManage.linkSuccessIconInGitHubBtn.isVisible()).to.eql(true)
    expect(WorkspaceManage.linkSuccessIconInBitbucketBtn.isVisible()).to.eql(
      true
    )
  })

  //TC_1294
  it('should verify user can link to "Bitbucket" first and then "GitHub"', () => {
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
    WorkspaceManage.linkBitbucketSecondTime()
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(WorkspaceManage.linkSuccessIconInBitbucketBtn.isVisible()).to.eql(
      true
    )
    WorkspaceManage.linkGithubSecondTime()
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(WorkspaceManage.linkSuccessIconInGitHubBtn.isVisible()).to.eql(true)
  })

  //TC_1295
  it('should verify user can link to "GitHub" first and then "Bitbucket"', () => {
    WorkspaceManage.logout()
    Login.registerAndLogin('RR2')
    WorkspaceManage.linkGithubSecondTime()
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(WorkspaceManage.linkSuccessIconInGitHubBtn.isVisible()).to.eql(true)
    WorkspaceManage.linkBitbucketSecondTime()
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(WorkspaceManage.linkSuccessIconInBitbucketBtn.isVisible()).to.eql(
      true
    )
  })

  //TC_1293
  it('should add members to workspace linked with "Bitbucket"', () => {
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
    WorkspaceManage.linkBitbucketSecondTime()
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(WorkspaceManage.linkSuccessIconInBitbucketBtn.isVisible()).to.eql(
      true
    )
    WorkspaceManage.workspaceAddIcon.moveToObject()
    WorkspaceManage.workspaceEmailInputField.waitForVisible()
    WorkspaceManage.workspaceEmailInputField.setValue(memberOne)
    WorkspaceManage.workspaceAddIcon.click()
    memberTwoEmail = WorkspaceManage.getAddedMemberEmail(2).getValue()
    WorkspaceManage.submitGlobal()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.getAddedMemberEmail(2).waitForVisible()
    expect(memberTwoEmail).to.include(memberOne)
  })

  //TC_1296
  it('should verify if user links "GitHub" using "Link Repo resources" pop up, "Link GitHub Button" in workspace manage page changes to "Linked GitHub"', () => {
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(1).waitForVisible()
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKBNameEight + '2'
    )
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
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
    browser.keys('Down arrow')
    browser.keys('Tab')
    KintoBlockCreate.getRepoResourcesLinkBtnInLinkRepoPopUp(1).waitForVisible()
    var url = KintoBlockCreate.getRepoResourcesLinkBtnInLinkRepoPopUp(
      1
    ).getAttribute('href')
    browser.url(url)
    browser.alertAccept()
    browser.pause(10000)
    WorkspaceManage.gitHubAuthorize()
    browser.pause(5000) //Static wait as the page goes blank
    // url = browser.getUrl()
    // browser.pause(1000)
    // var frontEndURL = WorkspaceManage.TEST_ENV
    // url = url.replace('https://staging.kintohub.com', `${frontEndURL}`)
    // browser.url(url)
    // browser.pause(5000)
    WorkspaceManage.loadingFinished.waitForExist()
    KintoBlockCreate.iAmDoneBtnInRepoResourcesPopUp.waitForVisible()
    KintoBlockCreate.iAmDoneBtnInRepoResourcesPopUp.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(WorkspaceManage.linkSuccessIconInGitHubBtn.isVisible()).to.eql(true)
  })

  //TC_1297
  it('should verify if user links "Bitbucket" using "Link Repo resources" pop up, "Link Bitbucket Button" in workspace manage page changes to "Linked Bitbucket"', () => {
    WorkspaceManage.logout()
    Login.registerAndLogin('RR3')
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.getRepoResourcesLinkBtnInLinkRepoPopUp(2).waitForVisible()
    var url = KintoBlockCreate.getRepoResourcesLinkBtnInLinkRepoPopUp(
      2
    ).getAttribute('href')
    browser.url(url)
    browser.pause(5000)
    url = browser.getUrl()
    //Comment this if bug on bitbucket link is resolved
    // url = url.replace('http://localhost:3000','https://dev.kintohub.com')
    // browser.url(url)
    // KintoBlockCreate.loadingFinished.waitForExist()
    //
    url = browser.getUrl()
    var frontEndURL
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    if (url.includes('https://bitbucket.org/dashboard/overview')) {
      browser.url(`${frontEndURL}/app/dashboard/${ws}/edit`)
    }
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.iAmDoneBtnInRepoResourcesPopUp.waitForVisible()
    KintoBlockCreate.iAmDoneBtnInRepoResourcesPopUp.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(WorkspaceManage.linkSuccessIconInBitbucketBtn.isVisible()).to.eql(
      true
    )
  })
})
