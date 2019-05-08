import { expect } from 'chai'
import Login from '../page-objects/login.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import DeploymentCreate from '../page-objects/deployment.create.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import DeploymentManage from '../page-objects/deployment.manage.page'
import Landing from '../page-objects/landing.page'
import Home from '../page-objects/home.page'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import DeploymentList from '../page-objects/deployment.list.page'
import WorkspaceCreate from '../page-objects/workspace.create.page'
import WorkspaceManage from '../page-objects/workspace.manage.page'
import testData from '../constants/testdata.json'

var username
var reponame
var currentTime = new Date()
var currentDate = new Date()
var randomName

describe('Dashboard Home', () => {
  it.skip('should display Kintohub logo in the center after successfull login', () => {
    Login.registerAndLogin()
    WorkspaceManage.linkGithub()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
    DashboardIndex.kintoHubLogo.waitForVisible()
    expect(DashboardIndex.kintoHubLogo.isVisible()).to.eql(true)
  })

  it('should display percentage progress as 0 in the dashboard for new user', () => {
    username = Login.registerAndLogin('WS')
    WorkspaceManage.linkGithub()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.percentageProgress0.isVisible()).to.eql(true)
  })

  it('should display top bar, side bar and body of the home page after successful login', () => {
    expect(Landing.sidebar.isVisible()).to.eql(true)
    expect(Landing.topbar.isVisible()).to.eql(true)
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    Login.logout()
  })

  it('should navigate user to home page if remember me option is selected during login action', () => {
    Login.open()
    Login.loginForm.waitForVisible()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.login.validPassword)
    //TODO Uncomment when Remember Me is back in the application
    //Login.loginRememberMe.click()
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    Login.open()
    DashboardIndex.container.waitForVisible()
    DashboardIndex.workspaceDropdown.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should display the welcome message for user on the Home page', () => {
    expect(DashboardIndex.container.element('h2').getText()).to.eql(
      'Welcome to KintoHub.'
    )
    expect(DashboardIndex.container.element('h5').getText()).to.eql(
      'The coding adventure awaits! Here are a few things you can start with:'
    )
  })

  it('should display visit github link and join Slack link on the Home page', () => {
    expect(DashboardIndex.visitGithubLink.isVisible()).to.eql(true)
    expect(DashboardIndex.joinSlackLink.isVisible()).to.eql(true)
  })

  it('should verify that user can get to the home page through the dedicated url -/app/dashboard/:id ', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DashboardIndex.open(ws)
    DashboardIndex.workspaceDropdown.waitForVisible()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it.skip('should verify if Sign up button opens the sign up form from home page ', () => {
    Home.open()
    Home.signUpBtn.click()
    expect(Login.signupUsername.isVisible()).to.eql(true)
  })

  it.skip('should verify if Log in button opens the dashboard  from home page, if user already logged in', () => {
    Home.open()
    Home.loginBtn.click()
    DashboardIndex.container.waitForVisible()
    DashboardIndex.workspaceDropdown.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it.skip('should verify if Log in button opens the login form  from home page, if user not logged in', () => {
    DashboardIndex.logout()
    Home.open()
    Login.loadingFinished.waitForExist()
    Login.loginUsername.waitForVisible()
    expect(Login.loginUsername.isVisible()).to.eql(true)
  })

  it('should verify if navigating to home page opens the dashboard if user already logged in ', () => {
    Home.open()
    DashboardIndex.workspaceDropdown.waitForVisible()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should display Kintohub logo and title, dashboard and market button, searchbar, bell and user icon, logout button ', () => {
    Login.open()
    DashboardIndex.workspaceDropdown.waitForVisible()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.kintoHubLogolefttop.isVisible()).to.eql(true)
    expect(DashboardIndex.dashboardButton.isVisible()).to.eql(true)
    //TODO Uncomment when market and search bar is back in the application
    //expect(DashboardIndex.goTomarket.isVisible()).to.eql(true)
    //expect(DashboardIndex.searchBar.isVisible()).to.eql(true)
    expect(DashboardIndex.bellIcon.isVisible()).to.eql(true)
    expect(DashboardIndex.userIcon.isVisible()).to.eql(true)
    DashboardIndex.avatarBtn.click()
    DashboardIndex.logoutBtn.waitForVisible()
    expect(DashboardIndex.logoutBtn.isVisible()).to.eql(true)
  })

  it('should redirect to dashboard page if dashboard button is clicked, when already on dashboard page', () => {
    DashboardIndex.dashboardButton.click()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should redirect to dashboard page if dashboard button is clicked, when on Applications,KintoBlocks and market page', () => {
    //Navigating to dashboard from Applications

    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DashboardIndex.dashboardButton.click()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)

    //Navigating to dashboard from KintoBlock
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    DashboardIndex.dashboardButton.click()
    DashboardIndex.container.waitForVisible()
    DashboardIndex.workspaceDropdown.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    //TODO Uncomment when market is back in the application
    //Navigating to dashboard from Market
    //    DashboardIndex.goTomarket.click()
    //    DashboardIndex.goTodashboard.click()
    //    DashboardIndex.container.waitForVisible()
    //    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should redirect to dashboard page if kintohub logo on top left is clicked, when already on dashboard page', () => {
    DashboardIndex.kintoHubLogolefttop.click()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should redirect to dashboard page if dashboard buttin on top left is clicked, when already on dashboard page', () => {
    DashboardIndex.dashboardButton.click()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should redirect to dashboard page if kintohub logo on top left is clicked, when on Applications,KintoBlocks and market page', () => {
    //Navigating to dashboard from Applications
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DashboardIndex.kintoHubLogolefttop.click()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)

    //Navigating to dashboard from KintoBlock
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    DashboardIndex.kintoHubLogolefttop.click()
    DashboardIndex.container.waitForVisible()
    DashboardIndex.workspaceDropdown.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    //TODO Uncomment when market is back in the application
    //Navigating to dashboard from Market
    //    DashboardIndex.goTomarket.click()
    //    DashboardIndex.kintoHubLogolefttop.click()
    //    expect(DashboardIndex.getStartedBtn.isVisible()).to.eql(true)
  })

  it('should display add icon, when mouse pointer moved over applications', () => {
    DashboardIndex.applicationLeftnav.waitForVisible()
    browser.moveToObject('.kintoapps')
    DashboardIndex.kaHoveraddicon.waitForVisible()
    expect(DashboardIndex.kaHoveraddicon.isVisible()).to.eql(true)
  })

  it('should navigate to KA create page, when add icon on right side of application is clicked', () => {
    DashboardIndex.kaHoveraddicon.click()
    DeploymentCreate.form.waitForVisible()
    expect(DeploymentCreate.createKintoAppTitle.getText()).to.eql(
      'Create New Deployment'
    )
  })

  it('should display hover add icon, when mouse pointer moved over kintoblocks', () => {
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    expect(DashboardIndex.kbHoveraddicon.isVisible()).to.eql(true)
  })

  it('should navigate to KB create page, when add icon on right side of kintoblocks is clicked', () => {
    DashboardIndex.kbHoveraddicon.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.selectKBFlavour(1).waitForVisible()
    KintoBlockCreate.selectKBFlavour(1).click()
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.createKBTitle.getText()).to.eql(
      'Create KintoBlocks'
    )
  })

  it('should display the logout button when clicked on the avatar button and on click should logout the user', () => {
    DashboardIndex.avatarBtn.waitForVisible()
    DashboardIndex.avatarBtn.click()
    DashboardIndex.logoutBtn.click()
    Login.loginUsername.waitForVisible()
    expect(Login.loginUsername.isVisible()).to.eql(true)
  })

  it('should display Overview, Applications, Analytics(Greyed out),kintoblocks and Services(Greyed out) on the left navigation bar', () => {
    Login.open()
    Login.loginForm.waitForVisible()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    DashboardIndex.applicationLeftnav.waitForVisible()
    expect(DashboardIndex.applicationLeftnav.isVisible()).to.eql(true)
    expect(DashboardIndex.applicationLeftnav.getText()).to.eql('Deployments')
    expect(DashboardIndex.kintoBlocksleftnav.isVisible()).to.eql(true)
    expect(DashboardIndex.kintoBlocksleftnav.getText()).to.eql('KintoBlocks')
    expect(DashboardIndex.analyticsLeftnav.isVisible()).to.eql(true)
    expect(DashboardIndex.analyticsLeftnav.getText()).to.eql('Analytics')
    expect(DashboardIndex.homeLeftnav.isVisible()).to.eql(true)
    expect(DashboardIndex.homeLeftnav.getText()).to.eql('Overview\n0%')
    //expect(DashboardIndex.servicesLeftnav.isVisible()).to.eql(true)
    //expect(DashboardIndex.servicesLeftnav.getText()).to.eql('Services')
  })

  it('should display left navigation menu, when navigating to all pages of kintohub', () => {
    DashboardIndex.homeLeftnav.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.sidebar.waitForVisible()
    expect(DashboardIndex.sidebar.isVisible()).to.eql(true)

    DashboardIndex.applicationLeftnav.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.sidebar.waitForVisible()
    expect(DashboardIndex.sidebar.isVisible()).to.eql(true)

    DashboardIndex.kintoBlocksleftnav.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.sidebar.waitForVisible()
    expect(DashboardIndex.sidebar.isVisible()).to.eql(true)

    DashboardIndex.analyticsLeftnav.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.sidebar.waitForVisible()
    expect(DashboardIndex.sidebar.isVisible()).to.eql(true)

    //TODO Uncomment when market is back in the application
    // DashboardIndex.goTomarket.click()
    //Below step Failing now for a bug as left navigation bar items go missing when we go to market
    // expect(DashboardIndex.sidebar.isVisible()).to.eql(true)
  })

  it('should display title as WORKSPACE for workspace field', () => {
    DashboardIndex.workSpaceTitle.waitForVisible()
    expect(DashboardIndex.workSpaceTitle.getText()).to.eql('WORKSPACE')
  })

  it('should trigger expansion of dropdown on click of Dropdown box and should display create new workspace as first element in workspace dropdown list', () => {
    DashboardIndex.workspaceDropdown.click()
    expect(DashboardIndex.getWSDropdownElement(1).isVisible()).to.eql(true)
    expect(DashboardIndex.getWSDropdownElement(1).getText()).to.eql(
      'Create new workspace'
    )
  })

  it('should check that displayed element in the dropdown should be the workspace currently used', () => {
    var wsvalPos1 = DashboardIndex.getWSDropdownElement(2).getText()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DashboardIndex.workspaceDropdown.selectByValue(ws)
    var currentWS = DashboardIndex.workspaceDropdown.getText('option:checked')
    expect(currentWS).to.eql(wsvalPos1)
  })

  it('should navigate to create a new workspace page of current workspace', () => {
    DashboardIndex.workspaceDropdown.selectByValue(0)
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.createNewworkspaceTitle.waitForVisible()
    expect(WorkspaceCreate.createNewworkspaceTitle.getText()).to.eql(
      'Create New Workspace'
    )
  })
  it('should navigate to overview page of new workspace,when workspaces is changed', () => {
    //Create an additional workspace
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.submitBtn.waitForVisible()
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForVisible()
    WorkspaceCreate.workspaceCongratsBtn.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()

    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    expect(DashboardIndex.getUrl()).to.eql('/app/dashboard/' + ws)

    DashboardIndex.workspaceDropdown.selectByIndex(2)
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    ws = Landing.workspaceSelect.getAttribute('data-test')
    expect(DashboardIndex.getUrl()).to.eql('/app/dashboard/' + ws)
  })

  it('should add a memeber in workspace 2 and check for member bar', () => {
    DashboardIndex.editWorkspace.click()
    WorkspaceCreate.loadingFinished.waitForExist()
    browser.scroll(0, 400)
    WorkspaceCreate.workspaceEmailInputField.click()
    WorkspaceCreate.workspaceEmailInputField.setValue(
      testData.workspace.validWorkSpaceMemberEmail
    )
    WorkspaceCreate.workspacePermissionField.click()
    WorkspaceCreate.workspaceAddIcon.click()
    browser.pause(2000)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    var memberIcon1 = DashboardIndex.getMemberIconTextInWSField(1).getText()
    var memberIcon2 = DashboardIndex.getMemberIconTextInWSField(2).getText()
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.container.waitForVisible()
    DashboardIndex.editWorkspace.click()
    WorkspaceCreate.loadingFinished.waitForExist()
    browser.scroll(0, 400)
    WorkspaceCreate.workspaceEmailInputField.click()
    WorkspaceCreate.workspaceEmailInputField.setValue(
      testData.workspace.validWorkSpaceMemberEmail1
    )
    WorkspaceCreate.workspacePermissionField.click()
    WorkspaceCreate.workspaceAddIcon.click()
    browser.pause(2000)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    var memberIcon3 = DashboardIndex.getMemberIconTextInWSField(1).getText()
    var memberIcon4 = DashboardIndex.getMemberIconTextInWSField(2).getText()
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.container.waitForVisible()
    expect(memberIcon1).to.eql(
      DashboardIndex.getMemberIconTextInWSField(1).getText()
    )
    expect(memberIcon2).to.eql(
      DashboardIndex.getMemberIconTextInWSField(2).getText()
    )
    DashboardIndex.workspaceDropdown.selectByIndex(2)
    DashboardIndex.container.waitForVisible()
    expect(memberIcon3).to.eql(
      DashboardIndex.getMemberIconTextInWSField(1).getText()
    )
    expect(memberIcon4).to.eql(
      DashboardIndex.getMemberIconTextInWSField(2).getText()
    )
  })

  it('should navigate to edit page of the current workspace, when click on edit icon if you are admin', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DashboardIndex.workspaceDropdown.selectByValue(ws)
    WorkspaceCreate.loadingFinished.waitForExist()
    var currentWS = DashboardIndex.workspaceDropdown.getText('option:checked')
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    var editPagehead = WorkspaceManage.editWorkspaceHeading.getText()
    expect(editPagehead).to.eql(currentWS)
    WorkspaceCreate.logout()
  })

  it('should navigate to overview page of switched workspace,when workspace is switched from any page of kintohub', () => {
    Login.open()
    Login.loginForm.waitForVisible()
    Login.loginUsername.waitForVisible()
    Login.loginUsername.setValue(username)
    Login.loginPassword.setValue(testData.signup.validPassword)
    Login.loginSubmit()
    Login.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    //From Applications page
    DashboardIndex.applicationLeftnav.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.workspaceDropdown.waitForVisible()
    DashboardIndex.workspaceDropdown.click()
    DashboardIndex.workspaceDropdown.selectByIndex(2)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)

    //From KintoBlocks page
    DashboardIndex.kintoBlocksleftnav.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.workspaceDropdown.waitForVisible()
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)

    //From Market
    //    DashboardIndex.goTomarket.click()
    //    expect(DashboardIndex.getUrl()).to.eql('/app/market')
    //    DashboardIndex.workspaceDropdown.selectByValue(2)
    //    DashboardIndex.kintoHubLogo.waitForVisible()
    //    expect(DashboardIndex.kintoHubLogo.isVisible()).to.eql(true)
  })

  //No Get Started Button in the app now
  it.skip('should verify that Center button CTA redirects opens help center in a new tab, to the relevant dedicated section - Get started', () => {
    DashboardIndex.getStartedBtn.click()
    let handles = browser.windowHandles()
    expect(handles.length).to.eql(2)
    expect(handles[1].getUrl()).to.eql(
      'https://docs.kintohub.com/docs/getting-started'
    )
  })
})

describe('Dashboard -Tutorials', () => {
  //TC_97
  it('should navigate user to "overview" page, when user clicks on "Overview" from the side bar from any workspace and KB pages', () => {
    DashboardIndex.logout()
    username = Login.registerAndLogin('DS')
    WorkspaceManage.linkGithubSecondTime()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    //Workspace create page
    WorkspaceCreate.open(ws)
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    expect(WorkspaceCreate.form.isVisible()).to.eql(true)
    DashboardIndex.homeLeftnav.click()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    //Workspace manage
    WorkspaceManage.open(ws)
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    expect(WorkspaceManage.form.isVisible()).to.eql(true)
    DashboardIndex.homeLeftnav.click()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    //KB list page
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
    DashboardIndex.homeLeftnav.click()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    //KB create page
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.form.isVisible()).to.eql(true)
    DashboardIndex.homeLeftnav.click()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    //KB manage page
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + '010' + randomName
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
    browser.scroll(0, 2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions('11.7.0').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions('11.7.0').click()
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
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
    DashboardIndex.homeLeftnav.click()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    //KB tagged page
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(KintoBlockManage.recentCommitComponent.isVisible()).to.eql(true)
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
    DashboardIndex.homeLeftnav.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  //TC_97
  it('should navigate user to "overview" page, when user clicks on "Overview" from the side bar from any KA and environment pages', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    //KA create page
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
    DashboardIndex.homeLeftnav.click()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    var kaName =
      testData.kintoapp.validKintoAppName +
      '04' +
      currentTime.getMinutes() +
      currentTime.getSeconds() +
      'y'
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
    DeploymentManage.amazingBtn.waitForExist()
    DeploymentManage.amazingBtn.waitForVisible()
    DeploymentManage.amazingBtn.click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    //KA list page
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    expect(DeploymentList.myDeploymentList.isVisible()).to.eql(true)
    DashboardIndex.homeLeftnav.click()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  //TC_98
  it('should verify that main objective displays "Cake image", "status", "Main objective text" and "Claim" button disabled in the dashboard page', () => {
    DashboardIndex.logout()
    username = Login.registerAndLogin('DT')
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
    DashboardIndex.mainObjectiveInProgress.waitForVisible()
    expect(DashboardIndex.mainObjectiveInProgress.isVisible()).to.eql(true)
    expect(DashboardIndex.mainObjectiveText.getText()).to.eql(
      '🎂 Complete all objectives for a cake!'
    )
    expect(DashboardIndex.mainObjectiveClaimBtn.isEnabled()).to.eql(false)
  })

  //TC_121
  it('should display status of KA objective as In-progress ( Not checked green ) untill the objective is not completed', () => {
    expect(DashboardIndex.getSubObjectiveInProgress(1).isVisible()).to.eql(true)
  })

  //TC_99
  it('should verify that KA objective displays "image", "status", "objective text", "?" and "Start" button disabled in the dashboard page', () => {
    expect(DashboardIndex.getSubObjectiveInProgress(1).isVisible()).to.eql(true)
    expect(DashboardIndex.getSubObjectiveText(1).getText()).to.eql(
      '👩🏽‍💻 Create your first deployment & deploy it'
    )
    expect(DashboardIndex.getSubObjectiveDocLink(1).isVisible()).to.eql(true)
    expect(DashboardIndex.getSubObjectiveStartBtn(1).isVisible()).to.eql(true)
  })

  //TC_100
  it('should navigate user to documentation page for creating KA, when user clicks on "?" in KA objective', () => {
    DashboardIndex.getSubObjectiveDocLink(1).click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[1])
    browser.pause(2000)
    expect(DashboardIndex.kintoDocsPage.isVisible()).to.eql(true)
    expect(DashboardIndex.kintoDocsPage.getText()).to.eql(
      'What is a deployment?'
    )
    browser.switchTab(tabIds[0])
    browser.pause(2000)
  })

  //TC_101
  it('should display KA tutorial pop up, when user clicks on "Start" button for KA objective', () => {
    DashboardIndex.getSubObjectiveStartBtn(1).click()
    DashboardIndex.tutorialPopUp.waitForVisible()
    expect(DashboardIndex.tutorialPopUp.isVisible()).to.eql(true)
  })

  //TC_102
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

  //TC_103
  it('should navigate user to KA create page, when user clicks on "Create New Application" in KA tutorial pop up', () => {
    DashboardIndex.createBtnInTutorialPopUp.click()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
  })

  //TC_104
  it('should verify that mandatory fields are pointed with number image in KA create page and help text for number image is displayed below top navigattion bar', () => {
    expect(DashboardIndex.tutorialHelpText.getText()).to.eql(
      'Step 1: Enter the name for your application. You can come back and modify it later.'
    )
    expect(DashboardIndex.tutorialSkipBelowTopNavBar.isVisible()).to.eql(true)
    expect(DashboardIndex.nameFieldTutorialNumActive.isVisible()).to.eql(true)
    expect(DashboardIndex.descriptionFieldTutorialNumActive.isVisible()).to.eql(
      false
    )
    expect(DashboardIndex.kaAddDepTutorialActive.isVisible()).to.eql(false)
    expect(DashboardIndex.submitBtnTutorialActive.isVisible()).to.eql(false)
  })

  //TC_105
  it('should verify that tutorial number pointing to KA name field changes to completed, when user enters valid KA name', () => {
    var kaName =
      testData.kintoapp.validKintoAppName +
      '96' +
      currentTime.getMinutes() +
      currentTime.getSeconds() +
      'o'
    DeploymentCreate.name.input.setValue(kaName)
    DashboardIndex.nameFieldTutorialComplete.waitForVisible()
    expect(DashboardIndex.nameFieldTutorialComplete.isVisible()).to.eql(true)
  })

  //TC_106
  it('should verify that tutorial number pointing to KA description field changes from de-active to active, when valid KA name is entered and user clicks inside KA description field', () => {
    DeploymentCreate.kaDescriptionTextArea.leftClick()
    DashboardIndex.descriptionFieldTutorialNumActive.waitForVisible()
    expect(DashboardIndex.descriptionFieldTutorialNumActive.isVisible()).to.eql(
      true
    )
  })

  //TC_107
  it('should display help text below top navigation bar for KA description', () => {
    expect(DashboardIndex.tutorialHelpText.getText()).to.eql(
      'Step 2: Enter a short description for your deployment. You can come back and modify it later.'
    )
  })

  //TC_108
  it('should verify that tutorial number pointing to KA description field changes to completed, when user enters valid KA description', () => {
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    expect(DashboardIndex.descriptionFieldTutorialComplete.isVisible()).to.eql(
      true
    )
  })

  //TC_109
  it('should verify that tutorial number pointing to KA dependencies field changes from de-active to active, when valid KA name, description is entered and user selects dependencies field', () => {
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.leftClick()
    expect(DashboardIndex.kaAddDepTutorialActive.isVisible()).to.eql(true)
  })

  //TC_110
  it('should display help text below top navigation bar for KA dependencies', () => {
    expect(DashboardIndex.tutorialHelpText.getText()).to.eql(
      'Step 3: Add the example Hello World KintoBlock as dependency.'
    )
  })

  //TC_111
  it('should verify that tutorial number pointing to KA dependencies field changes to completed, when user select dependency', () => {
    DeploymentCreate.kbdropDown.scroll(0, 2000)
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    browser.pause(2000)
    DeploymentCreate.loadingFinished.waitForExist()
    DashboardIndex.kaAddDepTutorialComplete.waitForVisible()
    expect(DashboardIndex.kaAddDepTutorialComplete.isVisible()).to.eql(true)
  })

  //TC_112
  it('should verify that tutorial number pointing to KA Create button changes from de-active to active, when user select a dependency', () => {
    expect(DashboardIndex.submitBtnTutorialActive.isVisible()).to.eql(true)
  })

  //TC_113
  it('should display help text below top navigation bar for KA create button', () => {
    expect(DashboardIndex.tutorialHelpText.getText()).to.eql(
      'Step 4: Click "Create New Deployment".'
    )
  })

  //TC_114
  it('should verify that tutorial number notations disappears, when "Skip" below top navgation bar is clicked', () => {
    DashboardIndex.tutorialSkipBelowTopNavBar.click()
    expect(DashboardIndex.tutorialHelpText.isVisible()).to.eql(false)
    expect(DashboardIndex.tutorialSkipBelowTopNavBar.isVisible()).to.eql(false)
    expect(DashboardIndex.nameFieldTutorialComplete.isVisible()).to.eql(false)
    expect(DashboardIndex.descriptionFieldTutorialComplete.isVisible()).to.eql(
      false
    )
    expect(DashboardIndex.kaAddDepTutorialComplete.isVisible()).to.eql(false)
    expect(DashboardIndex.submitBtnTutorialActive.isVisible()).to.eql(false)
  })

  //TC_115
  it('should display tutorial help text and number notation in KA manage page via tutorial', () => {
    browser.refresh()
    browser.alertAccept()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    var kaName =
      testData.kintoapp.validKintoAppName +
      '24' +
      currentTime.getMinutes() +
      currentTime.getSeconds() +
      'd'
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
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentManage.amazingBtn.waitForExist()
    DeploymentManage.amazingBtn.waitForVisible()
    DeploymentManage.amazingBtn.click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
  })

  //TC_116
  it.skip('should verify that tutorial number pointing to KA "Tag and Deploy" button is active', () => {
    expect(DashboardIndex.submitBtnTutorialActive.isVisible()).to.eql(true)
  })

  //TC_117
  it.skip('should verify that tutorial number pointing to "create" button in "Tag and Deploy" pop up is active', () => {
    DeploymentManage.kaTagNDeploy.click()
    DashboardIndex.tagAndDeployTutorialActive.waitForVisible()
    expect(DashboardIndex.tagAndDeployTutorialActive.isVisible()).to.eql(true)
  })

  //TC_118
  it.skip('should display tutorial help text in "Tag and Deploy" pop up', () => {
    expect(DashboardIndex.tagAndDeployTutorialText.getText()).to.eql(
      'Step 6: "Tag & Deploy" to selected environment.'
    )
  })

  //TC_119
  it.skip('should display tutorial "Skip" button in "Tag and Deploy" pop up', () => {
    expect(DashboardIndex.tagAndDeployTutorialSkipBtn.isVisible()).to.eql(true)
  })

  //TC_120
  it.skip('should verify that tutorial help text and number notation disappears, when user clicks "Skip" button in "Tag and Deploy" pop up', () => {
    DashboardIndex.tagAndDeployTutorialSkipBtn.click()
    expect(DashboardIndex.tagAndDeployTutorialText.isVisible()).to.eql(false)
    expect(DashboardIndex.tagAndDeployTutorialActive.isVisible()).to.eql(false)
    expect(DashboardIndex.tagAndDeployTutorialSkipBtn.isVisible()).to.eql(false)
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.minorVersion.setValue('3')
    DeploymentManage.revision.setValue('7')
    DeploymentManage.notes.click()
    DeploymentManage.notes.setValue(testData.kintoapp.validTagNotes)
    DeploymentManage.createTagBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.deploySuccessBtn()
  })

  //TC_122
  it('should display status of KA objective as completed ( checked green ) if the objective completed', () => {
    DashboardIndex.kintoHubLogolefttop.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.getSubObjectiveCompleted(1).waitForVisible()
    expect(DashboardIndex.getSubObjectiveCompleted(1).isVisible()).to.eql(true)
  })

  //TC_123
  it('should verify that main objective status is 25%, when any one of the sub objective is completed', () => {
    expect(DashboardIndex.percentageProgress25.isVisible()).to.eql(true)
  })

  //TC_149
  it('should display status of KB objective as In-progress ( Not checked green ) untill the objective is not completed', () => {
    expect(DashboardIndex.getSubObjectiveInProgress(2).isVisible()).to.eql(true)
  })

  //TC_124
  it('should verify that KB objective displays "image", "status", "objective text", "?" and "Start" button disabled in the dashboard page', () => {
    expect(DashboardIndex.getSubObjectiveInProgress(2).isVisible()).to.eql(true)
    expect(DashboardIndex.getSubObjectiveText(2).getText()).to.eql(
      '💎 Create your first KintoBlock'
    )
    expect(DashboardIndex.getSubObjectiveDocLink(2).isVisible()).to.eql(true)
    expect(DashboardIndex.getSubObjectiveStartBtn(2).isVisible()).to.eql(true)
  })

  //TC_125
  it('should navigate user to documentation page for creating KB, when user clicks on "?" in KB objective', () => {
    DashboardIndex.getSubObjectiveDocLink(2).click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[2])
    browser.pause(2000)
    expect(DashboardIndex.kintoDocsPage.isVisible()).to.eql(true)
    expect(DashboardIndex.kintoDocsPage.getText()).to.eql(
      'How to create a KintoBlock'
    )
    browser.switchTab(tabIds[0])
    browser.pause(2000)
  })

  //TC_126
  it('should display KB tutorial pop up, when user clicks on "Start" button for KB objective', () => {
    DashboardIndex.getSubObjectiveStartBtn(2).click()
    DashboardIndex.tutorialPopUp.waitForVisible()
    expect(DashboardIndex.tutorialPopUp.isVisible()).to.eql(true)
  })

  //TC_127
  it('should verify that KB tutorial pop up displays "Pop up title", "title", "subtitle", "Image", "Skip button" and "create button"', () => {
    expect(DashboardIndex.modalTitle.getText()).to.eql(
      '💎 Create Your First KintoBlock'
    )
    expect(DashboardIndex.titleInTutorialPopUp.getText()).to.eql(
      'We’ve made it really easy to make your own microservices.'
    )
    expect(DashboardIndex.subtitleInTutorialPopUp.getText()).to.eql(
      'Now you try creating a KintoBlock (microservice) yourself…'
    )
    expect(DashboardIndex.imageInTutorialPopUp.isVisible()).to.eql(true)
    expect(DashboardIndex.skipTutorialBtn.isVisible()).to.eql(true)
    expect(DashboardIndex.createBtnInTutorialPopUp.isVisible()).to.eql(true)
  })

  //TC_129
  it('should display "Allow access to GitHub Organisation" text in "Link GitHub" pop up', () => {
    DashboardIndex.createBtnInTutorialPopUp.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.linkGitHubPopUp.waitForVisible()
    expect(DashboardIndex.linkGitHubTutorialHelpText.getText()).to.eql(
      'Allow access to at least one repo source.'
    )
  })

  //TC_130
  it('should display "Skip" button in "Link GitHub" pop up', () => {
    expect(DashboardIndex.linkGitHubTutorialSkipBtn.isVisible()).to.eql(true)
  })

  //TC_132
  it('should make disappear all the tutorial annotations displayed in the "Link GitHub" pop up', () => {
    DashboardIndex.linkGitHubTutorialSkipBtn.leftClick()
    expect(DashboardIndex.linkGitHubTutorialHelpText.isVisible()).to.eql(false)
    expect(DashboardIndex.linkGitHubTutorialSkipBtn.isVisible()).to.eql(false)
    DashboardIndex.cancelBtnInLinkGitHubPopUp.click()
  })

  //TC_128
  it('should navigate user to KB create page, when user clicks on "Create New KintoBlock" in KB tutorial pop up', () => {
    DashboardIndex.homeLeftnav.waitForVisible()
    DashboardIndex.homeLeftnav.click()
    DashboardIndex.loadingFinished.waitForExist()
    WorkspaceManage.linkGithubSecondTime()
    DashboardIndex.getSubObjectiveStartBtn(2).waitForVisible()
    DashboardIndex.getSubObjectiveStartBtn(2).click()
    DashboardIndex.tutorialPopUp.waitForVisible()
    DashboardIndex.createBtnInTutorialPopUp.click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    expect(KintoBlockCreate.form.isVisible()).to.eql(true)
  })

  //TC_133
  it('should verify that mandatory fields are pointed with number image in KB create page and help text for number image is displayed below top navigattion bar', () => {
    expect(DashboardIndex.tutorialHelpText.getText()).to.eql(
      'Step 1: Enter the name of your KintoBlock.'
    )
    expect(DashboardIndex.tutorialSkipBelowTopNavBar.isVisible()).to.eql(true)
    expect(DashboardIndex.nameFieldTutorialNumActive.isVisible()).to.eql(true)
    expect(
      DashboardIndex.descriptionFieldTutorialNumInActive.isVisible()
    ).to.eql(true)
    expect(DashboardIndex.languageTutorialInActive.isVisible()).to.eql(true)
    expect(DashboardIndex.repositoryTutorialInActive.isVisible()).to.eql(true)
    expect(DashboardIndex.PrePopulateTutorialInActive.isVisible()).to.eql(true)
    expect(DashboardIndex.submitBtnTutorialInActive.isVisible()).to.eql(true)
  })

  //TC_134
  it('should verify that tutorial number pointing to KB name field changes to completed, when user enters valid KB name', () => {
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + '20' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    expect(DashboardIndex.nameFieldTutorialComplete.isVisible()).to.eql(true)
  })

  //TC_135
  it('should verify that tutorial number pointing to KA description field changes from de-active to active, when valid KA name is entered and user clicks inside KA description field', () => {
    DeploymentCreate.kaDescriptionTextArea.leftClick()
    expect(DashboardIndex.descriptionFieldTutorialNumActive.isVisible()).to.eql(
      true
    )
  })

  //TC_136
  it('should display help text below top navigation bar for KB description', () => {
    expect(DashboardIndex.tutorialHelpText.getText()).to.eql(
      'Step 2: Enter a short description for your KintoBlock. You can come back and modify it later.'
    )
  })

  //TC_137
  it('should verify that tutorial number pointing to KB description field changes to completed, when user enters valid KB description', () => {
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    expect(DashboardIndex.descriptionFieldTutorialComplete.isVisible()).to.eql(
      true
    )
  })

  //TC_138
  it('should verify that tutorial number pointing to KB language field changes from de-active to active, when valid KB name, description is entered and user clicks language field', () => {
    browser.keys('Tab')
    expect(DashboardIndex.languageTutorialActive.isVisible()).to.eql(true)
  })

  //TC_139
  it('should display help text below top navigation bar for KB language filed', () => {
    expect(DashboardIndex.tutorialHelpText.getText()).to.eql(
      'Step 3: Choose the language.'
    )
  })

  //TC_140
  it('should verify that tutorial number pointing to KB language field changes to completed, when user selects language', () => {
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
    expect(DashboardIndex.languageTutorialComplete.isVisible()).to.eql(true)
  })

  //TC_141
  it('should verify that tutorial number pointing to KB repository field changes from de-active to active, when user entered valid KB name, description and selects language', () => {
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    expect(DashboardIndex.repositoryTutorialActive.isVisible()).to.eql(true)
  })

  //TC_142
  it('should display help text below top navigation bar for KB repository field', () => {
    expect(DashboardIndex.tutorialHelpText.getText()).to.eql(
      'Step 4: Create a new repository or choose an existing one.'
    )
  })

  //TC_143
  it('should verify that tutorial number pointing to KB repository field changes to completed, when user enters repository name', () => {
    browser.keys('Tab')
    browser.keys('Down arrow')
    browser.pause(2000)
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    reponame =
      testData.kintoblock.validRepoNameWithChar + '1' + currentDate.getTime()
    KintoBlockCreate.repository.input.setValue(reponame)
    browser.keys('Tab')
    expect(DashboardIndex.repositoryTutorialComplete.isVisible()).to.eql(true)
  })

  //TC_144
  it('should verify that tutorial number pointing to KB pre-populate repository field changes from de-active to active, when user enters all the mandatory fields required for KB', () => {
    DashboardIndex.PrePopulaterepositoryTutorialActive.scroll(0, 2000)
    expect(
      DashboardIndex.PrePopulaterepositoryTutorialActive.isVisible()
    ).to.eql(true)
  })

  //TC_145
  it('should display help text below top navigation bar for KB pre-populate repository field', () => {
    expect(DashboardIndex.tutorialHelpText.getText()).to.eql(
      'Step 5: We recommend adding example projects to help get you started.'
    )
  })

  //TC_146
  it('should verify that tutorial number pointing to KB pre-populate repository field changes to completed, when user switches on pre-populate repository toggle bar', () => {
    KintoBlockCreate.prepopulateRepoSwitch.click()
    DashboardIndex.PrePopulateTutorialComplete.waitForVisible()
    expect(DashboardIndex.PrePopulateTutorialComplete.isVisible()).to.eql(true)
  })

  //TC_151
  it('should verify that tutorial number notations disappears, when "Skip" below top navgation bar is clicked', () => {
    DashboardIndex.tutorialSkipBelowTopNavBar.click()
    expect(DashboardIndex.tutorialHelpText.isVisible()).to.eql(false)
    expect(DashboardIndex.tutorialSkipBelowTopNavBar.isVisible()).to.eql(false)
    expect(DashboardIndex.nameFieldTutorialNumActive.isVisible()).to.eql(false)
    expect(DashboardIndex.descriptionFieldTutorialNumActive.isVisible()).to.eql(
      false
    )
    expect(DashboardIndex.languageTutorialInActive.isVisible()).to.eql(false)
    expect(DashboardIndex.repositoryTutorialActive.isVisible()).to.eql(false)
    expect(
      DashboardIndex.PrePopulaterepositoryTutorialActive.isVisible()
    ).to.eql(false)
    expect(DashboardIndex.submitBtnTutorialActive.isVisible()).to.eql(false)
  })

  //TC_147
  it('should verify that tutorial number pointing to KB Create button changes from de-active to active, when user enters all the mandatory fields required for KB and clicks on create button', () => {
    browser.refresh()
    browser.alertAccept()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + '25' + randomName
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
    reponame =
      testData.kintoblock.validRepoNameWithChar + '1' + currentDate.getTime()
    KintoBlockCreate.repository.input.setValue(reponame)
    KintoBlockCreate.prepopulateRepoSwitch.scroll(0, 2000)
    KintoBlockCreate.prepopulateRepoSwitch.waitForVisible()
    KintoBlockCreate.prepopulateRepoSwitch.click()
    KintoBlockCreate.prePopulatedIsOn.waitForExist()
    expect(KintoBlockCreate.prePopulatedIsOn.getValue()).to.eql('true')
    expect(DashboardIndex.PrePopulateTutorialComplete.isVisible()).to.eql(true)
    expect(DashboardIndex.submitBtnTutorialActive.isVisible()).to.eql(true)
  })

  //TC_148
  it('should display status of KB objective as completed ( checked green ) if the objective completed', () => {
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForVisible()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DashboardIndex.open(ws)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.getSubObjectiveCompleted(2).waitForVisible()
    expect(DashboardIndex.getSubObjectiveCompleted(2).isVisible()).to.eql(true)
  })

  //TC_150
  it('should verify that main objective status is 50%, when any two of the sub objective is completed', () => {
    expect(DashboardIndex.percentageProgress50.isVisible()).to.eql(true)
  })

  //TC_165
  it('should display status of workspace objective as In-progress ( Not checked green ) untill the objective is not completed', () => {
    expect(DashboardIndex.getSubObjectiveInProgress(3).isVisible()).to.eql(true)
  })

  //TC_152
  it('should verify that Workspace objective displays "image", "status", "objective text", "?" and "Start" button disabled in the dashboard page', () => {
    expect(DashboardIndex.getSubObjectiveInProgress(3).isVisible()).to.eql(true)
    expect(DashboardIndex.getSubObjectiveText(3).getText()).to.eql(
      '👯 Create a workspace to collaborate'
    )
    expect(DashboardIndex.getSubObjectiveDocLink(3).isVisible()).to.eql(true)
    expect(DashboardIndex.getSubObjectiveStartBtn(3).isVisible()).to.eql(true)
  })

  //TC_153
  it('should navigate user to documentation page for creating workspace, when user clicks on "?" in workspace objective', () => {
    DashboardIndex.getSubObjectiveDocLink(3).click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[3])
    browser.pause(2000)
    expect(DashboardIndex.kintoDocsPage.isVisible()).to.eql(true)
    expect(DashboardIndex.kintoDocsPage.getText()).to.eql(
      'Creating a workspace'
    )
    browser.switchTab(tabIds[0])
    browser.pause(2000)
  })

  //TC_154
  it('should display workspace tutorial pop up, when user clicks on "Start" button for workspace objective', () => {
    DashboardIndex.getSubObjectiveStartBtn(3).click()
    DashboardIndex.tutorialPopUp.waitForVisible()
    expect(DashboardIndex.tutorialPopUp.isVisible()).to.eql(true)
  })

  //TC_155
  it('should verify that workspace tutorial pop up displays "Pop up title", "title", "subtitle", "Image", "Skip button" and "create button"', () => {
    expect(DashboardIndex.modalTitle.getText()).to.eql(
      'Create a Workspace to Collaborate'
    )
    expect(DashboardIndex.titleInTutorialPopUp.getText()).to.eql(
      'You already have a Personal Workspace for your private projects.'
    )
    expect(DashboardIndex.subtitleInTutorialPopUp.getText()).to.eql(
      'Now you try creating an new workspace for collaborations…'
    )
    expect(DashboardIndex.imageInTutorialPopUp.isVisible()).to.eql(true)
    expect(DashboardIndex.skipTutorialBtn.isVisible()).to.eql(true)
    expect(DashboardIndex.createBtnInTutorialPopUp.isVisible()).to.eql(true)
  })

  //TC_156
  it('should navigate user to Workspace create page, when user clicks on "Create New Workspace" in KB tutorial pop up', () => {
    DashboardIndex.createBtnInTutorialPopUp.click()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    expect(WorkspaceCreate.form.isVisible()).to.eql(true)
  })

  //TC_157
  it('should verify that mandatory fields are pointed with number image in workspace create page and help text for number image is displayed below top navigattion bar', () => {
    expect(DashboardIndex.tutorialHelpText.getText()).to.eql(
      'Step 1: Enter the name for your workspace. You can come back and modify it later.'
    )
    expect(DashboardIndex.tutorialSkipBelowTopNavBar.isVisible()).to.eql(true)
    expect(DashboardIndex.nameFieldTutorialNumActive.isVisible()).to.eql(true)
    expect(
      DashboardIndex.workspaceAddMemberTutorialInActive.isVisible()
    ).to.eql(true)
    expect(DashboardIndex.submitBtnTutorialInActive.isVisible()).to.eql(true)
  })

  //TC_158
  it('should verify that tutorial number pointing to workspace name field changes to completed, when user enters valid workspace name', () => {
    var workspaceName =
      testData.workspace.validWorkSpaceName +
      currentTime.getMinutes() +
      currentTime.getSeconds()
    WorkspaceCreate.name.input.setValue(workspaceName)
    expect(DashboardIndex.nameFieldTutorialComplete.isVisible()).to.eql(true)
  })

  //TC_159
  it('should verify that tutorial number pointing to member addition field changes from de-active to active, when user enters valid workspace name', () => {
    WorkspaceCreate.workspaceEmailInputField.leftClick()
    expect(DashboardIndex.workspaceAddMemberTutorialActive.isVisible()).to.eql(
      true
    )
  })

  //TC_160
  it('should display help text below top navigation bar for member addition field', () => {
    WorkspaceCreate.workspaceEmailInputField.leftClick()
    expect(DashboardIndex.tutorialHelpText.getText()).to.eql(
      'Step 2: Add members to your workspace and assign roles to them.'
    )
  })

  //TC_161
  it('should verify that tutorial number pointing to member addition field changes from active to completed, when user add a member to workspace', () => {
    WorkspaceCreate.workspaceEmailInputField.scroll(0, 2000)
    WorkspaceCreate.workspaceEmailInputField.setValue(testData.login.validEmail)
    WorkspaceCreate.workspaceAddIcon.click()
    WorkspaceCreate.loadingFinished.waitForExist()
    DashboardIndex.workspaceAddMemberTutorialComplete.waitForVisible()
    expect(
      DashboardIndex.workspaceAddMemberTutorialComplete.isVisible()
    ).to.eql(true)
  })

  //TC_162
  it('should verify that tutorial number pointing to workspace Create button changes from de-active to active, when user enters all the mandatory fields required for workspace', () => {
    browser.refresh()
    browser.alertAccept()
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    var workspaceName =
      testData.workspace.validWorkSpaceName +
      currentTime.getMinutes() +
      currentTime.getSeconds()
    WorkspaceCreate.name.input.setValue(workspaceName)
    WorkspaceCreate.workspaceEmailInputField.setValue(testData.login.validEmail)
    WorkspaceCreate.workspaceAddIcon.leftClick()
    expect(DashboardIndex.submitBtnTutorialActive.isVisible()).to.eql(true)
  })

  //TC_163
  it('should display help text below top navigation bar for "Create New Workspace" button', () => {
    expect(DashboardIndex.tutorialHelpText.getText()).to.eql(
      'Step 3: Click "Create New Workspace"'
    )
  })

  //TC_164
  it('should display status of workspace objective as completed ( checked green ) if the objective is completed', () => {
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.amazingBtn.waitForVisible()
    WorkspaceCreate.amazingBtn.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DashboardIndex.open(ws)
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.getSubObjectiveCompleted(3).waitForVisible()
    expect(DashboardIndex.getSubObjectiveCompleted(3).isVisible()).to.eql(true)
  })

  //TC_166
  it('should verify that main objective status is 75%, when any three of the sub objective is completed', () => {
    expect(DashboardIndex.percentageProgress75.isVisible()).to.eql(true)
  })

  //TC_180
  it('should display status of documentation objective as In-progress ( Not checked green ) untill the objective is not completed', () => {
    expect(DashboardIndex.getSubObjectiveInProgress(4).isVisible()).to.eql(true)
  })

  //TC_167
  it('should verify that documentation objective displays "image", "status", "objective text", "?" and "Start" button disabled in the dashboard page', () => {
    expect(DashboardIndex.getSubObjectiveInProgress(4).isVisible()).to.eql(true)
    expect(DashboardIndex.getSubObjectiveText(4).getText()).to.eql(
      '📚 Check out our documentation'
    )
    expect(DashboardIndex.getSubObjectiveStartBtn(4).isVisible()).to.eql(true)
  })

  //TC_168
  it('should verify that user is navigated to documentation page, when user clicks on "Start" button for documentation objective', () => {
    DashboardIndex.getSubObjectiveStartBtn(4).click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[4])
    browser.pause(2000)
    expect(DashboardIndex.docPageTitle.isVisible()).to.eql(true)
    expect(DashboardIndex.docPageTitle.getText()).to.eql('Getting Started')
    browser.switchTab(tabIds[0])
    browser.pause(2000)
  })

  //TC_179
  it('should display status of documentation objective as completed ( checked green ) if the objective is completed', () => {
    DashboardIndex.getSubObjectiveCompleted(4).waitForVisible()
    expect(DashboardIndex.getSubObjectiveCompleted(4).isVisible()).to.eql(true)
  })

  //TC_169
  it('should verify that main objective status is 100%, when all of the sub objective is completed', () => {
    expect(DashboardIndex.percentageProgress100.isVisible()).to.eql(true)
  })

  //TC_170
  it('should verify when main objective status is 100% "Claim" button should be enabled', () => {
    expect(DashboardIndex.mainObjectiveClaimBtn.isEnabled()).to.eql(true)
  })

  it('should display main objective as checked green ( completed ), when sub objectives all are completed', () => {
    DashboardIndex.mainObjectiveCompleted.waitForVisible()
    expect(DashboardIndex.mainObjectiveCompleted.isVisible()).to.eql(true)
  })

  //TC_171
  it('should verify that "All objectives completed" pop up is displayed, when user clicks on "claim" button of main objective', () => {
    DashboardIndex.mainObjectiveClaimBtn.click()
    DashboardIndex.tutorialPopUp.waitForVisible()
    expect(DashboardIndex.tutorialPopUp.isVisible()).to.eql(true)
  })

  //TC_172
  it('should verify that "All objectives completed" pop up displays "Pop up title", "?", "title", "subtitle", "Image" and "Alright" button', () => {
    expect(DashboardIndex.modalTitle.getText()).to.eql(
      '🎂 All Objectives Completed'
    )
    expect(DashboardIndex.titleInTutorialPopUp.getText()).to.eql(
      'The cake is a lie...'
    )
    expect(DashboardIndex.subtitleInTutorialPopUp.getText()).to.eql(
      'But hey, now you know the basics of KintoHub! Yayyyy, right?'
    )
    expect(DashboardIndex.imageInTutorialPopUp.isVisible()).to.eql(true)
    expect(DashboardIndex.alrightBtn.isVisible()).to.eql(true)
    expect(DashboardIndex.cakeIsALieToolTip.isVisible()).to.eql(true)
  })

  //TC_173
  it('should display tool tip text for cake is a lie pop up tool tip icon as "What does it mean?"', () => {
    DashboardIndex.cakeIsALieToolTip.moveToObject()
    DashboardIndex.toolTipInnerText.waitForVisible()
    expect(DashboardIndex.toolTipInnerText.getText()).to.eql(
      'What does it mean?'
    )
  })

  //TC_174
  it('should navigate user to cake is a lie definition page, when user clicks on "?" button "All objectives completed" pop up', () => {
    var cakeIsALieReference = DashboardIndex.cakeIsALieReferenceLink
      .getAttribute('href')
      .split('/')
    var tagLine = cakeIsALieReference[4]
    expect(tagLine).to.eql('the-cake-is-a-lie')
  })

  //TC_175
  it('should navigate user to dashboard page, when user clicks on "Alright button"', () => {
    DashboardIndex.alrightBtn.waitForVisible()
    DashboardIndex.alrightBtn.click()
    DashboardIndex.loadingFinished.waitForExist()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  //TC_176
  it('should navigate user to GitHub repository of KintoHub, when user clicks on hyper link text of github link in the bottom of dashboard page', () => {
    DashboardIndex.visitGithubLink.waitForVisible()
    DashboardIndex.visitGithubLink.click()
    var tabIds = browser.getTabIds()
    //change from 5 to 6, when claim button works
    browser.switchTab(tabIds[5])
    browser.pause(2000)
    DashboardIndex.kintoHubNameInGitHub.waitForVisible()
    expect(DashboardIndex.kintoHubNameInGitHub.isVisible()).to.eql(true)
    expect(DashboardIndex.kintoHubNameInGitHub.getText()).to.eql('KintoHub')
    browser.switchTab(tabIds[0])
    browser.pause(2000)
  })

  //TC_177
  it('should navigate user to Slack community of KintoHub, when user clicks on hyper link text of slack link in the bottom of dashboard page', () => {
    DashboardIndex.joinSlackLink.waitForVisible()
    DashboardIndex.joinSlackLink.click()
    var tabIds = browser.getTabIds()
    //change from 6 to 7, when claim button works
    browser.switchTab(tabIds[6])
    browser.pause(2000)
    DashboardIndex.kintoHubNameInSlack.waitForVisible()
    expect(DashboardIndex.kintoHubNameInSlack.isVisible()).to.eql(true)
    expect(DashboardIndex.kintoHubNameInSlack.getText()).to.eql(
      'Join the Slack workspace KintoHub'
    )
    browser.switchTab(tabIds[0])
    browser.pause(2000)
  })

  //TC_178
  it('should display "ALPHA ACCESS" text in the top navigation bar', () => {
    DashboardIndex.alphaAccessText.waitForVisible()
    expect(DashboardIndex.alphaAccessText.getText().toUpperCase()).to.eql(
      'ALPHA ACCESS'
    )
  })
})
