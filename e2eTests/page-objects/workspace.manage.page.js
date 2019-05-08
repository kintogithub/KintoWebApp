import Page from './page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import testData from '../constants/testdata.json'
import Landing from '../page-objects/landing.page'
import { getInput } from '../helpers/elementSelector'

var frontEndURL = DashboardIndex.TEST_ENV

class WorkspaceManage extends Page {
  open(ws) {
    super.open(`app/dashboard/${ws}/edit`)
  }

  get title() {
    return $('.edit-workspace h2')
  }

  get form() {
    return $('.dashboard-content .edit-workspace')
  }

  get name() {
    return getInput('name')
  }

  get workspaceBreadcrum() {
    return $('button.dropdown-button.breadcrumb-icon')
  }

  get editWorkspaceHeading() {
    return $('form.workspace-form.form-container>div>h2')
  }

  get workspaceEmailInputField() {
    return $('input[name=email]')
  }

  get breadCrumbDropDown() {
    return $('div.dropdown-content.isShown.short')
  }

  get breadCrumbDropDownCreateWS() {
    return $('button.button.dark')
  }

  get membersListTitle() {
    return $('.workspace-form.form-container>div:nth-child(3)>h3')
  }

  get membersSubtitle() {
    return $('.workspace-form.form-container>div:nth-child(3)>h5')
  }

  get workspaceAddIcon() {
    return $('.form-body.members-list .add')
  }

  getpermissionDropDown(index) {
    return $(`div.bottom>select>:nth-child(${index})`)
  }

  getbreadCrumbEditWorkspace(index) {
    return $(
      `.dropdown-content-items.dropdown-content-items-scroll .dropdown-scroll-container>button:nth-child(${index})`
    )
  }

  get githubTitle() {
    return $('div.form-wrapper.github-form > h3')
  }

  get githubLink() {
    return $('a.button.dark')
  }

  get workspaceTitle() {
    return $('form.workspace-form.form-container>div>h2')
  }

  get toggleBar() {
    return $('#autoShareProjects')
  }

  get switchTogglerBtn() {
    return $('span.toggle-slider')
  }

  get toggleBarToolTip() {
    return $('span.tooltip')
  }

  get toggleBarToolTipText() {
    return $('.rc-tooltip-content .rc-tooltip-inner')
  }

  get basicInfoTitle() {
    return $('.workspace-form.form-container>div:nth-child(2)>h3')
  }

  get basicInfoSubtitle() {
    return $('.workspace-form.form-container>div:nth-child(2)>h5')
  }

  get githubSubtitle() {
    return $('.form-wrapper.github-form > h5')
  }

  get githubExplanatoryText() {
    return $('.intro >b')
  }

  get githubLinkBtn() {
    return $('.repos-connect > a.button:nth-child(1)')
  }

  get githubLoginField() {
    return $('input#login_field')
  }

  get githubPasswordField() {
    return $('input#password')
  }

  get githubLoginBtn() {
    return $('.btn.btn-primary.btn-block')
  }

  get githubAuthoriseBtn() {
    return $('#js-oauth-authorize-btn')
  }

  linkGithub() {
    //Click on edit workspace
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    //Click on Link
    this.githubLinkBtn.waitForVisible()
    var href = this.githubLinkBtn.getAttribute('href')
    browser.url(href)
    this.githubLoginField.waitForVisible()
    this.githubLoginField.setValue(testData.github.username)
    this.githubPasswordField.setValue(testData.github.password)
    this.githubLoginBtn.click()
    browser.pause(5000)
    this.gitHubAuthorize()
    // browser.pause(5000) //Static wait as the page goes blank
    // var url = browser.getUrl()
    // browser.pause(1000)
    // url = url.replace('https://staging.kintohub.com', 'http://localhost:3000')
    // browser.url(url)
    browser.pause(5000)
    this.loadingFinished.waitForExist()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    DashboardIndex.kintoHubLogolefttop.waitForVisible()
    DashboardIndex.kintoHubLogolefttop.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
  }

  gitHubAuthorize() {
    if (this.githubAuthoriseBtn.isVisible()) {
      browser.waitUntil(
        function() {
          browser.element('#js-oauth-authorize-btn').click()
          browser.pause(5000)
          return (
            browser.element('#js-oauth-authorize-btn').isVisible() === false
          )
        },
        10000,
        'Authorise button not clickable'
      )
    }
  }

  linkGithubSecondTime() {
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    //Click on Link
    this.githubLinkBtn.waitForVisible()
    var href = this.githubLinkBtn.getAttribute('href')
    browser.url(href)
    browser.pause(5000)
    this.gitHubAuthorize()
    // browser.pause(5000)
    // var url = browser.getUrl()
    // browser.pause(1000)
    // url = url.replace('https://staging.kintohub.com', 'http://localhost:3000')
    // browser.url(url)
    this.loadingFinished.waitForExist()
    browser.pause(5000) //Static wait as the page goes blank
    this.loadingFinished.waitForExist()
    this.form.waitForVisible()
    DashboardIndex.kintoHubLogolefttop.waitForVisible()
    DashboardIndex.kintoHubLogolefttop.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForExist()
    DashboardIndex.container.waitForVisible()
  }

  get gitRepoSearchFilterField() {
    return $('input#dashboard-repos-filter-left')
  }

  getSearchForRepo(name) {
    return $(`//*[contains(text(),${name})]`)
  }

  get workspaceNameFromBreadcrumb() {
    return $('.list-container .disabled.text-disabled')
  }

  getWorkspaceNameInWorksapceSwitcher(index) {
    return $(
      `.dropdown-scroll-container>button:nth-child(${index}) .tag-item-text`
    )
  }

  getAddedMemberEmail(index) {
    return $(
      `.form-body.members-list .unstyled-list li:nth-of-type(${index}) input`
    )
  }

  getMemberDeleteIconDisabled(index) {
    return $(
      `.form-body.members-list .unstyled-list li:nth-of-type(${index}) .remove.void`
    )
  }

  getMemberDeleteIcon(index) {
    return $(
      `.form-body.members-list .unstyled-list li:nth-of-type(${index}) .remove`
    )
  }

  getMemberPermissions(index) {
    return $(`.top .members-added:nth-of-type(${index}) select`)
  }

  get duplicateErrorMsg() {
    return $('.error-message.error-message-only.error-email')
  }

  get bitbucketLinkBtn() {
    return $('.repos-connect > a.button:nth-child(2)')
  }

  get bitbucketLoginField() {
    return $('input#username')
  }

  get bitbucketPasswordField() {
    return $('input#password')
  }

  get bitbucketLoginBtn() {
    return $('button#login-submit')
  }

  get bitbucketAccessBtn() {
    return $('.aui-button.aui-button-primary')
  }

  linkBitbucket() {
    //Click on edit workspace
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    //Click on Link
    this.bitbucketLinkBtn.waitForVisible()
    var href = this.bitbucketLinkBtn.getAttribute('href')
    browser.url(href)
    this.bitbucketLoginField.waitForVisible()
    this.bitbucketLoginField.setValue(testData.bitbucket.username)
    this.bitbucketLoginBtn.click()
    this.bitbucketPasswordField.waitForVisible()
    this.bitbucketPasswordField.setValue(testData.bitbucket.password)
    this.bitbucketLoginBtn.click()
    browser.pause(10000)
    var url = browser.getUrl()
    //Comment this if bug on bitbucket link is resolved
    // browser.pause(1000)
    // url = url.replace('http://localhost:3000','https://dev.kintohub.com')
    // browser.url(url)
    // this.loadingFinished.waitForExist()
    //
    url = browser.getUrl()
    if (url.includes('https://bitbucket.org/dashboard/overview')) {
      browser.url(`${frontEndURL}/app/dashboard/${ws}/edit`)
    }
    this.loadingFinished.waitForExist()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    DashboardIndex.kintoHubLogolefttop.waitForVisible()
    DashboardIndex.kintoHubLogolefttop.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
  }

  linkBitbucketSecondTime() {
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    //Click on Link
    this.bitbucketLinkBtn.waitForVisible()
    var href = this.bitbucketLinkBtn.getAttribute('href')
    browser.url(href)
    browser.pause(10000)
    var url = browser.getUrl()
    //Comment this if bug on bitbucket link is resolved
    // browser.pause(1000)
    // url = url.replace('http://localhost:3000','https://dev.kintohub.com')
    // browser.url(url)
    // this.loadingFinished.waitForExist()
    //
    url = browser.getUrl()
    if (url.includes('https://bitbucket.org/dashboard/overview')) {
      browser.url(`${frontEndURL}/app/dashboard/${ws}/edit`)
    }
    this.loadingFinished.waitForExist()
    browser.pause(5000) //Static wait as the page goes blank
    this.loadingFinished.waitForExist()
    this.form.waitForVisible()
    DashboardIndex.kintoHubLogolefttop.waitForVisible()
    DashboardIndex.kintoHubLogolefttop.click()
    DashboardIndex.loadingFinished.waitForExist()
    DashboardIndex.container.waitForVisible()
  }

  get noRepoLinkedText() {
    return $('.github-form .top .text-norepo')
  }

  get bitbucketIconInLinkBtn() {
    return $('.repos-connect > a.button:nth-child(2) .icon.bitbucket')
  }

  get gitHubIconInLinkBtn() {
    return $('.repos-connect > a.button:nth-child(1) .icon.github')
  }

  get gitLabLinkBtn() {
    return $('.repos-connect > a.button:nth-child(3)')
  }

  get gitLabIconInLinkBtn() {
    return $('.repos-connect > a.button:nth-child(3) .icon.gitlab')
  }

  get linkSuccessIconInGitHubBtn() {
    return $('.repos-connect > a.button:nth-child(1) .icon.success')
  }

  get linkSuccessIconInBitbucketBtn() {
    return $('.repos-connect > a.button:nth-child(2) .icon.success')
  }

  get linkSuccessIconInGitLabBtn() {
    return $('.repos-connect > a.button:nth-child(3) .icon.success')
  }

  //Now there are only two rows as we can link to github and bitcket only
  getOrganisationImg(row) {
    return $(`.organization-list li:nth-of-type(${row}) > div:nth-child(1) img`)
  }

  getOrganisationName(row) {
    return $(
      `.organization-list li:nth-of-type(${row}) > div:nth-child(1) .text`
    )
  }

  getUserNameInOrganisation(row) {
    return $(`.organization-list li:nth-of-type(${row}) > div:nth-child(2)`)
  }

  getRepoSourceIcon(row) {
    return $(
      `.organization-list li:nth-of-type(${row}) > div:nth-child(2) span`
    )
  }

  get githubLogoutDropDown() {
    return $(`[aria-label='View profile and more'] .dropdown-caret`)
  }

  get logoutOptionInGitHub() {
    return $('.logout-form .dropdown-item.dropdown-signout')
  }

  logoutFromGitHub() {
    this.githubLogoutDropDown.waitForVisible()
    this.githubLogoutDropDown.click()
    this.logoutOptionInGitHub.waitForVisible()
    this.logoutOptionInGitHub.click()
    browser.pause(2000)
  }

  get gitHubSignUpText() {
    return $('.auth-form-body p')
  }

  get bitbucketUserIcon() {
    return $('div.sc-gpHHfC.jgDfln>div>button.sc-eLExRp.jMsXrb')
  }

  get logoutOptionInBitbucket() {
    return $('.sc-exkUMo.bggivH .sc-fGSyRc.chnvHA')
  }

  logoutFromBitbucket() {
    this.bitbucketUserIcon.waitForVisible()
    this.bitbucketUserIcon.click()
    this.logoutOptionInBitbucket.waitForVisible()
    this.logoutOptionInBitbucket.click()
    browser.pause(2000)
  }

  get bitbucketSignUpText() {
    return $('.sc-iwsKbI h1')
  }

  get workspaceEmptyGreyIcon() {
    return $('.avatar-placeholder')
  }

  get workspacePermissionField() {
    return $('.bottom>select[name="role"]')
  }

  getPendingTagOfMember(index) {
    return $(
      `.form-body.members-list li:nth-of-type(${index}) .invite-state.btn .pending`
    )
  }

  getResendTagOfMember(index) {
    return $(
      `.form-body.members-list li:nth-of-type(${index}) .invite-state.btn .resend`
    )
  }

  //Invite member
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

  get acceptInviteLink() {
    return $('[role="listitem"]:last-of-type strong a')
  }

  get collapseExpandedEmail() {
    return $(`[aria-label="Collapse all"]`)
  }

  get expandEmail() {
    return $(`[aria-label="Expand all"]`)
  }

  get gotItBtn() {
    return $('button.button.dark')
  }
}

export default new WorkspaceManage()
