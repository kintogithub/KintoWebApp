import Page from './page'
import { getInput } from '../helpers/elementSelector'

class EnvironmentManage extends Page {
  get form() {
    return $('div.environment-edit-page')
  }

  get name() {
    return getInput('name')
  }

  get breadcrumbEnv() {
    return $('#env-switch-dropdown>button')
  }

  get breadcrumbEnvDropDown() {
    return $('.dropdown-content.isShown.short')
  }

  getbreadCrumbEnv(index) {
    return $(
      `.dropdown-content.isShown.short .dropdown-scroll-container>button:nth-child(${index})`
    )
  }

  getbreadCrumbEnvText(index) {
    return $(`#env-switch-dropdown button:nth-child(${index}) .tag-item-text`)
  }

  get environmentName() {
    return $('#name')
  }

  get addEnvBtn() {
    return $('.kh-modal-actions .button.button.dark')
  }

  get envTitle() {
    return $('.page-title .text>h2')
  }

  get consoleLogsTableTitle() {
    return $('.page-title .text>h2')
  }

  get ConsoleLogsTableEnvStatus() {
    return $('.page-title .text>h6')
  }

  get envSubtitle() {
    return $('.kintoapp-environment-form.form-container .form-wrapper > h3')
  }

  get envBody() {
    return $('.kintoapp-environment-form.form-container .form-wrapper > h5')
  }

  get envSaveBtn() {
    return $('div.global-save-bar.show')
  }

  geteditEnv(index) {
    return $(`.environment-card:nth-child(${index}) .button.secondary`)
  }

  getViewLogsBtn(index) {
    return $(`.release:nth-of-type(${index}) .right .button.outline`)
  }

  get requestBtn() {
    return $('.logs-buttons  a.button.secondary:nth-of-type(2)')
  }

  get viewRequestBtnInLogsPage() {
    return $('.logs-buttons .button.secondary')
  }

  geteditEnvBtn(index) {
    return $(
      `.environments-list .environment-card:nth-child(${index}) .right.expanded-buttons > a`
    )
  }

  get viewEnvList() {
    return $('.buttons .button.button.dark')
  }

  get envList() {
    return $('.kintoapp-environments-list')
  }

  get envListFromBreadCrumb() {
    return $('.breadcrumbs .unstyled-list>li:nth-child(3)>a')
  }

  get clientIdFieldColumn() {
    return $('.field-container.two-columns >div:nth-child(1)')
  }

  get clientIdFieldTitle() {
    return $('.field-container.two-columns >div:nth-child(1)> .label')
  }

  get clientIdField() {
    return $('.field-container.two-columns :nth-child(1) .false-input.disabled')
  }

  get secretKeyFieldColumn() {
    return $('.field-container.two-columns >div:nth-child(2)')
  }

  get secretKeyFieldTitle() {
    return $('.field-container.two-columns >div:nth-child(2)> .label')
  }

  get secretKeyField() {
    return $('.field-container.two-columns :nth-child(2) .false-input.disabled')
  }
  get addNewEnv() {
    return $('#env-switch-dropdown .dropdown-content-action>button')
  }

  get envNameFromBreadcrumb() {
    return $('.unstyled-list .disabled.text-disabled')
  }

  //19/05
  get envSwitcher() {
    return $('#env-switch-dropdown > button')
  }

  get searchFilterInEnvSwitcherDropDown() {
    return $('.dropdown-content.isShown.short input')
  }

  get versionTag() {
    return $('.page-title h6:nth-of-type(1)')
  }

  get envSearchField() {
    return $(
      '.breadcrumbs .unstyled-list>:nth-child(4) .dropdown-content-filter>input'
    )
  }

  getMessageInEachLogsRow(id, index) {
    return $(
      `.request-logs-map-item:nth-of-type(${id}) .row .column.${index} h5`
    )
  }

  getConsoleLogsTitle(index) {
    return $(
      `.logs-map-item:nth-of-type(${index}) .row .title-and-button .bold`
    )
  }

  //id is for row and index 1 is for time text and 2 is for message text
  getConsoleLogsText(id, index) {
    return $(
      `.logs-map-item:nth-of-type(${id}) .row .details .contents.unstyled-list>li:nth-of-type(${index})`
    )
  }

  //id is for row and index 1 is for time and 2 is for message
  getConsoleLogsColumns(id, index) {
    return $(
      `.logs-map-item:nth-of-type(${id}) .row .details>ul>li:nth-of-type(${index})`
    )
  }

  get envManagePageInBreadcrumb() {
    return $('.breadcrumbs .unstyled-list>li:nth-child(4) a')
  }

  get logsPage() {
    return $('.console-logs-page')
  }

  get tagTextInBreadcrumb() {
    return $('.breadcrumbs .unstyled-list>li:nth-child(5) .text-disabled')
  }

  getConsoleLogsHeaderTitle(index) {
    return $(`.console-logs-head .react-select:nth-of-type(${index}) label`)
  }

  get scrollableBarInLogsTable() {
    return $(
      '.commit-details-code-wrapper .iScrollVerticalScrollbar.iScrollLoneScrollbar'
    )
  }

  get timeColumnNameInLogsTable() {
    return $('.commit-details-header .commit-hash')
  }

  get messageColumnNameInLogsTable() {
    return $('.commit-details-header .message')
  }

  get logMessageFilterSearchBar() {
    return $('.console-logs-head .filter')
  }

  getLogMessageFromLogsTable(index) {
    return $(`.commit-details-code:nth-of-type(${index}) .code`)
  }

  get KintoBlockDropDown() {
    return $(`.react-select__control .react-select__single-value`)
  }

  getKintoBlockDropDownOptions(kbName) {
    return $(`[data-test-label='${kbName}']`)
  }

  get toggleSwitchToPinLogsAtBottom() {
    return $('.console-logs-head .toggle-slider')
  }

  get toggleSwitchTextToPinLogsAtBottom() {
    return $('.console-logs-head .toggle-message h6')
  }
}

export default new EnvironmentManage()
