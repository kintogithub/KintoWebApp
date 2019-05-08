import Page from './page'

class EnvironmentList extends Page {
  getEditEnv(index) {
    return $(
      `.environment-card:nth-child(${index}) .right.expanded-buttons .button.secondary`
    )
  }

  getCardDropDownInEnvList(id) {
    return $(`#id-${id}.dropdown>button`)
  }

  getEditOptionInCardDropDown(index) {
    return $(`#id-${index} .dropdown-scroll-container > a`)
  }

  // get envList() {
  //   return $('div.kintoapp-environments-list')
  // }

  get envList() {
    return $('.sidebar-environment-list')
  }

  getExpandEnvDeploys(index) {
    return $(`.environments-list :nth-child(${index}) .top span.chevron`)
  }

  getEnvViewLogs(index, id) {
    return $(
      `.environments-list :nth-child(${index}) .repeat:nth-of-type(${id}) .logs a`
    )
  }

  getEnvCardCollapseText(index) {
    return $(`.environments-list :nth-child(${index}) .top .expand>h6`)
  }

  getEnvCardExpandText(index) {
    return $(`.environments-list :nth-child(${index}) .top .expand>h6`)
  }

  getEnvCardTopLeftHandle(index) {
    return $(`.environments-list :nth-child(${index}) .top span.hamburger`)
  }

  getEnvCardDeploySuccess(index) {
    return $(
      `.environments-list .environment-card:nth-child(${index}) .status.success`
    )
  }

  get deployPopUp() {
    return $('.add-new-environment .kh-modal-body ')
  }

  get deployBtn() {
    return $('.kh-modal-actions button.button.default')
  }

  get deployCancelBtn() {
    return $('.kh-modal-actions button.button.secondary')
  }

  get selectDelpoyVer() {
    return $('select#version')
  }

  get envCardCompareVersions() {
    return $(`.environments-list :nth-child(1) .view .changelog>a`)
  }

  get envListFromViewLogs() {
    return $('.breadcrumbs li:nth-child(3)>a')
  }

  getenvCardViewLogs(index) {
    return $(
      `.environments-list > .environment-card.expanded > .bottom > .left > div > div > div:nth-child(${index}) > div.view > div.logs > a`
    )
  }

  getenvCardVerNumber(index) {
    return $(`.environment-card:nth-of-type(${index}) .left .version`)
  }

  get envCardDropDown() {
    return $('.dropdown .dropdown-content.isShown')
  }

  getenvCardShutDownBtn(index) {
    return $(`#id-${index} .dropdown-scroll-container > button`)
  }

  getIntermediateDeployProgress(index) {
    return $(`.environments-list :nth-child(${index}) .step h6`)
  }

  get envCardDeployRollbackBtn() {
    return $('.release-button .button.secondary.false')
  }

  get envDeployShutDownPopUp() {
    return $('.add-new-environment .kh-modal-body')
  }

  get envBuildViewLogsPageTitle() {
    return $('.request-logs-header >h3')
  }

  getEnvNoDeploySubText(index) {
    return $(
      `.environments-list :nth-child(${index}) .left .lower>div :nth-child(1)`
    )
  }

  getDateOfEnvDeploy(index) {
    return $(`.environments-list :nth-child(${index}) .left .lower .date`)
  }

  getEnvCardDeployBtn(index) {
    return $(
      `.environments-list .environment-card:nth-child(${index}) .right.expanded-buttons>button.button`
    )
  }

  getenvDeployDate(index) {
    return $(
      `.environments-list .environment-card:nth-child(${index}) .lower .date`
    )
  }

  get shutDownAnywayBtn() {
    return $('.kh-modal-body .button.dark')
  }

  get shutDownPopUpCancelBtn() {
    return $('.kh-modal-body .button.secondary')
  }

  get shutDownTitle() {
    return $('.kh-modal-title >h4')
  }

  get shutDownContent() {
    return $('.full-width-field>h4')
  }

  getShutDownTextInEnvCard(index) {
    return $(`.environment-card:nth-child(${index}) .lower > div > div`)
  }

  getEnvNoDeployText(index) {
    return $(
      `.environments-list .environment-card:nth-child(${index}) .upper h4`
    )
  }

  //1/3
  get kaFromEnvListBreadcrumb() {
    return $('.breadcrumbs li:nth-child(2) .list-container a')
  }

  getEnvCardDeployAnotherVersion(index) {
    return $(
      `.environments-list .environment-card:nth-child(${index}) .right.expanded-buttons>button.button.default`
    )
  }

  //2/3
  get simpleDeployDropDown() {
    return $('select#version')
  }

  getEnvCardDeployAnotherVersionBtn(index) {
    return $(
      `.environments-list .environment-card:nth-child(${index}) .right.expanded-buttons>button.default`
    )
  }

  get simpleDeployPopUpTitle() {
    return $('.add-new-environment .kh-modal-title')
  }

  get tagsDropDownIsShown() {
    return $('.dropdown-content.isShown.short')
  }

  get toEnvEditPageFromLogsPage() {
    return $('.breadcrumbs .unstyled-list>:nth-child(4) .list-container>a')
  }

  get tagsDropDownInLogsPage() {
    return $(
      '#env-release-switch-dropdown.dropdown.dropdown-filter.margin-right>button'
    )
  }

  getTagsFromTagsDropDownList(index) {
    return $(
      `#env-release-switch-dropdown .dropdown-scroll-container>button:nth-child(${index}) .tag-item-text`
    )
  }

  get logsTableTitle() {
    return $('.request-logs-title h2')
  }

  //6/3
  get envVersionNumFromBreadcrumbLogsPage() {
    return $(
      '.breadcrumbs .unstyled-list>:nth-child(5) .list-container .text-disabled'
    )
  }

  get columnOneFromLogsTable() {
    return $('.title.unstyled-list .column.one>h5')
  }

  get columnTwoFromLogsTable() {
    return $('.title.unstyled-list .column.two>h5')
  }

  get columnThreeFromLogsTable() {
    return $('.title.unstyled-list .column.three>h5')
  }

  get columnFourFromLogsTable() {
    return $('.title.unstyled-list .column.four>h5')
  }

  get columnFiveFromLogsTable() {
    return $('.title.unstyled-list .column.five>h5')
  }

  get columnSixFromLogsTable() {
    return $('.title.unstyled-list .column.six>h5')
  }

  get viewLogsDisabledInLogsPage() {
    return $('.breadcrumbs .unstyled-list>:nth-child(6)>span')
  }

  get viewConsoleLogsTextDisabledInLogsPage() {
    return $('.breadcrumbs .unstyled-list>:nth-child(3)>span')
  }

  //7/3/18
  get tagsSearchField() {
    return $(
      '.breadcrumbs .unstyled-list>:nth-child(5) .dropdown-content-filter>input'
    )
  }

  get tagIsLive() {
    return $('.text-highlight.undefined.live')
  }

  get logsTableRowExpanded() {
    return $('.logs-wrapper .expanding-details.expanded')
  }

  //13/3
  getsimpleDeployDropDownOptions(index) {
    return $(`select#version>option:nth-child(${index})`)
  }

  get logsTableEnvStatus() {
    return $('.request-logs-title h6')
  }

  getSeverityColumnInLogsTable(index) {
    return $(`.unstyled-list.container>li:nth-child(${index}) .column.one>h5`)
  }

  getResponseCodeColumnInLogsTable(index) {
    return $(`.unstyled-list.container>li:nth-child(${index}) .column.two>h5`)
  }

  get requestFieldTitleInLogsTable() {
    return $('div.expanding-details.expanded>h3:nth-child(1)')
  }

  get requestFieldTextInLogsTable() {
    return $('div.expanding-details.expanded :nth-child(2)')
  }

  get responseFieldTitleInLogsTable() {
    return $('div.expanding-details.expanded>h3:nth-child(3)')
  }

  get responseFieldTextInLogsTable() {
    return $('div.expanding-details.expanded :nth-child(4)')
  }

  get reportAnErrorBtnInLogsTable() {
    return $('.expanding-details.expanded .button.secondary')
  }
}

export default new EnvironmentList()
