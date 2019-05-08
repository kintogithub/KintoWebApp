import Page from './page'
import { getInput } from '../helpers/elementSelector'

class DashboardIndex extends Page {
  open(wsID) {
    super.open(`app/dashboard/${wsID}`)
  }

  get container() {
    return $('[data-test=dashboard-index-page]')
  }

  get getStartedBtn() {
    return $('a.button.default')
  }

  get visitGithubLink() {
    return $('.dashboard-content a:nth-child(4)')
  }

  get allowAccessBtn() {
    return $('.kh-modal-actions .button.button.secondary')
  }

  get joinSlackLink() {
    return $('a:nth-child(5)')
  }

  get kintoHubLogo() {
    return $('img.home-logo')
  }

  get kintoHubLogolefttop() {
    return $('.navigation-logo')
  }

  get dashboardButton() {
    return $('.on-dashboard')
  }

  get goTodashboard() {
    return $('.go-to-dashboard')
  }

  get goTomarket() {
    return $('.go-to-market')
  }

  get searchBar() {
    return $('.right .search')
  }

  get bellIcon() {
    return $('.notifications.dimmed')
  }

  get userIcon() {
    return $('button.dropdown-button.user-avatar.uppercase')
  }

  get applicationLeftnav() {
    return $('.kintoapps')
  }

  get kintoBlocksleftnav() {
    return $('.kintoblocks')
  }

  get homeLeftnav() {
    return $('.home')
  }

  get analyticsLeftnav() {
    return $('.analytics.dimmed')
  }

  get servicesLeftnav() {
    return $('.services')
  }

  get kaHoveraddicon() {
    return $('h4.kintoapps>img')
  }

  get kbHoveraddicon() {
    return $('h4.kintoblocks>img')
  }

  get workSpaceTitle() {
    return $('.workspaces-select>h3')
  }

  get workspaceSelect() {
    return getInput('.workspaces-select>select', 'select')
  }

  get workspaceDropdown() {
    return $('.workspaces-select>select')
  }

  getWSDropdownElement(index) {
    return $(`.workspaces-select>select>:nth-child(${index})`)
  }

  get editWorkspace() {
    return $('a.avatar.small.edit.hide-text')
  }

  get percentageProgress0() {
    return $('.percentage-progress.progress-0')
  }

  get percentageProgress25() {
    return $('.percentage-progress.progress-25')
  }

  get percentageProgress50() {
    return $('.percentage-progress.progress-50')
  }

  get percentageProgress75() {
    return $('.percentage-progress.progress-75')
  }

  get percentageProgress100() {
    return $('.percentage-progress.progress-100')
  }
  //Tutorials
  get darkBtn() {
    return $('button.button.dark')
  }

  get createBtnInTutorialPopUp() {
    return $('.kh-modal button:nth-of-type(2)')
  }

  get skipTutorialBtn() {
    return $('.kh-modal-actions .button.secondary')
  }

  get titleInTutorialPopUp() {
    return $('.kh-modal-body .full-width-field h3')
  }

  get subtitleInTutorialPopUp() {
    return $('.kh-modal-body .full-width-field h5')
  }

  get imageInTutorialPopUp() {
    return $('.kh-modal-body .full-width-field.image')
  }

  get mainObjectiveInProgress() {
    return $(`.dashboard-home .right .top .check`)
  }

  get mainObjectiveCompleted() {
    return $(`.dashboard-home .right .top .check.checked`)
  }

  get mainObjectiveText() {
    return $('.dashboard-home .right .top h2')
  }

  get mainObjectiveClaimBtn() {
    return $('.dashboard-home .right .top button')
  }

  getSubObjectiveInProgress(index) {
    return $(`.bottom .unstyled-list li:nth-of-type(${index}) .check`)
  }

  getSubObjectiveCompleted(index) {
    return $(`.bottom .unstyled-list li:nth-of-type(${index}) .check.checked`)
  }

  getSubObjectiveText(index) {
    return $(`.bottom .unstyled-list li:nth-of-type(${index}) h3`)
  }

  getSubObjectiveDocLink(index) {
    return $(`.bottom .unstyled-list li:nth-of-type(${index}) a`)
  }

  getSubObjectiveStartBtn(index) {
    return $(`.bottom .unstyled-list li:nth-of-type(${index}) button`)
  }

  get tutorialHelpText() {
    return $('.notification-message.tutorial h4')
  }

  get tutorialSkipBelowTopNavBar() {
    return $('.notification-message.tutorial button')
  }

  get nameFieldTutorialNumActive() {
    return $('[data-test="name"] .tutorial.left.active')
  }

  get nameFieldTutorialComplete() {
    return $('[data-test="name"] .tutorial.left.completed-step')
  }

  get descriptionFieldTutorialNumInActive() {
    return $('[data-test="shortDescription"] .tutorial.left.inactive')
  }

  get descriptionFieldTutorialNumActive() {
    return $('[data-test="shortDescription"] .tutorial.left.active')
  }

  get descriptionFieldTutorialComplete() {
    return $('[data-test="shortDescription"] .tutorial.left.completed-step')
  }

  get kaAddDepTutorialInActive() {
    return $('.form-body.simple.dependency-management .tutorial.left.inactive')
  }

  get kaAddDepTutorialActive() {
    return $('.form-body.simple.dependency-management .tutorial.left.active')
  }

  get kaAddDepTutorialComplete() {
    return $(
      '.form-body.simple.dependency-management .tutorial.left.completed-step'
    )
  }

  get languageTutorialInActive() {
    return $('.language .tutorial.left.inactive')
  }

  get languageTutorialActive() {
    return $('.language .tutorial.left.active')
  }

  get languageTutorialComplete() {
    return $('.language .tutorial.left.completed-step')
  }

  get repositoryTutorialInActive() {
    return $('.repository-selection .tutorial.left.inactive')
  }

  get repositoryTutorialActive() {
    return $('.repository-selection .tutorial.left.active')
  }

  get repositoryTutorialComplete() {
    return $('.repository-selection .tutorial.left.completed-step')
  }

  get PrePopulateTutorialInActive() {
    return $('.prepopulate-repo .tutorial.left.inactive')
  }

  get PrePopulaterepositoryTutorialActive() {
    return $('.prepopulate-repo .tutorial.left.active')
  }

  get PrePopulateTutorialComplete() {
    return $('.prepopulate-repo .tutorial.left.completed-step')
  }

  get submitBtnTutorialInActive() {
    return $('[data-test="savebar"] .tutorial.top.inactive')
  }

  get submitBtnTutorialActive() {
    return $('[data-test="savebar"] .tutorial.top.active')
  }

  get tagAndDeployTutorialActive() {
    return $('.kh-modal-actions .tutorial.top')
  }

  get tagAndDeployTutorialText() {
    return $('.tutorial-notification h4')
  }

  get tagAndDeployTutorialSkipBtn() {
    return $('.tutorial-notification button')
  }

  get linkGitHubTutorialHelpText() {
    return $('.tutorial-notification h4')
  }

  get linkGitHubTutorialSkipBtn() {
    return $('.tutorial-notification button')
  }

  get cancelBtnInLinkGitHubPopUp() {
    return $('.kh-modal-footer button.button.secondary')
  }

  get allowAccessTutorialNotation() {
    return $('.kh-modal-actions .tutorial.top')
  }

  get workspaceAddMemberTutorialInActive() {
    return $('.form-body.members-list .tutorial.left.inactive')
  }

  get workspaceAddMemberTutorialActive() {
    return $('.form-body.members-list .tutorial.left.active')
  }

  get workspaceAddMemberTutorialComplete() {
    return $('.form-body.members-list .tutorial.left.completed-step')
  }

  get alrightBtn() {
    return $('button.button.dark')
  }

  get cakeIsALieToolTip() {
    return $('.full-width-field span.tooltip')
  }

  get cakeIsALieReferenceLink() {
    return $('.full-width-field .tooltip-wrap')
  }

  get kintoHubNameInGitHub() {
    return $('.org-name.lh-condensed')
  }

  get kintoHubNameInSlack() {
    return $('#invite_form_body h1')
  }

  get alphaAccessText() {
    return $('#alphaAccessNav')
  }

  get docPageTitle() {
    return $('.postHeaderTitle')
  }

  get linkGitHubPopUp() {
    return $('.kh-modal-body')
  }

  getLeftNavOptions(index) {
    return $(`.sidebar-item:nth-of-type(${index}) a`)
  }

  //Index starts from 2 from member
  //Index starts from 1 from owner
  getMemberIconTextInWSField(index) {
    return $(`.member-list-circles .avatar.text:nth-of-type(${index})`)
  }
}

export default new DashboardIndex()
