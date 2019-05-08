import Page from './page'
import DeploymentList from '../page-objects/deployment.list.page'
import { expect } from 'chai'
import { getDataTest, getInput } from '../helpers/elementSelector'

class DeploymentManage extends Page {
  open(id, ver) {
    super.open(`app/dashboard/1/kintoapps/${id}/versions/${ver}`)
  }

  get form() {
    return getDataTest('ka-form')
  }

  get title() {
    return $('.page-title h2')
  }

  get name() {
    return getInput('name')
  }

  get description() {
    return getInput('shortDescription', 'textarea')
  }

  get kbName() {
    return $('div.main-icon.kintoblock')
  }

  getFilteredKB(KBName) {
    return $(`[data-test-block-name='${KBName}']`)
  }

  get kaTagNDeploy() {
    return $('#savebar-portal button')
  }

  get tagDeployModal() {
    return $(
      '.ReactModal__Content.ReactModal__Content--after-open.kh-modal.tag-and-deploy-modal'
    )
  }

  get majorVersion() {
    return $('input[name="version.major"]')
  }

  get minorVersion() {
    return $('input[name="version.minor"]')
  }

  get revision() {
    return $('input[name="version.revision"]')
  }

  get notes() {
    return $('#notes')
  }

  get createTagBtn() {
    return $('.button-and-tooltip.no-tooltip .button.button.dark')
  }

  get createTagBtnDisabled() {
    return $('.kh-modal-actions > button.button.dark.disabled')
  }

  get cancelTagBtn() {
    return $('.kh-modal-actions > button.button.secondary')
  }

  get envList() {
    return $('.kintoapp-environments-list')
  }

  get wsSwitchDef() {
    return getDataTest('public')
  }

  get envName() {
    return $('#environment')
  }

  get tagDeployErrMsg() {
    return $('div.kh-modal-body > form > div:nth-child(2) > div.error-message')
  }

  get successDeployMsg() {
    return $(
      '.environments-list .environment-card > div.bottom > div.left > div > div.upper > div > h6'
    )
  }

  get successDeployVersion() {
    return $(
      '.environments-list .environment-card > div.bottom > div.left > div > div.upper > div > h4.version'
    )
  }

  get switchValueForWS() {
    return $('#public')
  }

  get errorMsgDuplicateVersion() {
    return $('div.kh-modal-body > form > div.error-message-form.error-message')
  }

  get compareVersions() {
    return $('.buttons > button.button.secondary')
  }

  get viewEnvironments() {
    return $('.buttons > button.button.dark')
  }

  get addNewEnvironment() {
    return $('.kintoapp-environments-list .button.button.secondary')
  }

  get environmentName() {
    return $('#name')
  }

  get addEnvBtn() {
    return $('.kh-modal-actions .button.button.dark')
  }

  getenvListItem(index) {
    return $(`.environments-list .environment-card:nth-child(${index})`)
  }

  get clientIdFieldColumn() {
    return $('.field-container.false.two-columns >div:nth-child(1)')
  }

  get clientIdFieldTitle() {
    return $('.field-container.false.two-columns >div:nth-child(1)> .label')
  }

  get clientIdField() {
    return $(
      '.field-container.false.two-columns >div:nth-child(1)> .false-input'
    )
  }

  get secretKeyFieldColumn() {
    return $('.field-container.false.two-columns >div:nth-child(2)')
  }

  get secretKeyFieldTitle() {
    return $('.field-container.false.two-columns >div:nth-child(2)> .label')
  }

  get secretKeyField() {
    return $(
      '.field-container.false.two-columns >div:nth-child(2)> .false-input'
    )
  }

  get tagNDeployDropDownField() {
    return $('.prefill-wrapper>select')
  }

  getTagNDeployDropDown(index) {
    return $(`.prefill-wrapper>select>option:nth-child(${index})`)
  }

  get kaListPageFromKaManagePage() {
    return $('.breadcrumbs .unstyled-list>li:nth-child(1) a')
  }

  getDependencies(index) {
    return $(`div.blocks-or-services .block:nth-of-type(${index})`)
  }

  get tagVersionFromBreadcrumb() {
    return $(
      '.breadcrumbs .unstyled-list>li:nth-child(3) .breadcrumb-text.disabled.text-disabled'
    )
  }

  get saveChangesBtn() {
    return $('button.button.default')
  }

  //21/3
  get kaListDropDownBtn() {
    return $(
      '.breadcrumbs .unstyled-list>li:nth-child(2) #application-dropdown>button'
    )
  }

  get kaDropDownVisible() {
    return $('div.dropdown-content.isShown.short')
  }

  get createNewKaBtnInBreadcrumb() {
    return $('.dropdown-content-action button.button.dark')
  }

  getKaFromBreadcrumbDropDown(index) {
    return $(
      `#application-dropdown .dropdown-scroll-container button:nth-child(${index})`
    )
  }

  getKaNameFromDropDown(index) {
    return $(
      `#application-dropdown .dropdown-scroll-container button:nth-child(${index}) .tag-item-text`
    )
  }

  get draftDropDownFromBreadcrumb() {
    return $('#tagDropdown .dropdown-button.breadcrumb-icon')
  }

  get draftOptionFromDraftDropDown() {
    return $('#tagDropdown button:nth-child(1) .tag-item-text')
  }

  get draftIconFromDraftDropDown() {
    return $('#tagDropdown button:nth-child(1) .draft-icon')
  }

  getTagNumberFromDraftDropDown(index) {
    return $(`#tagDropdown button:nth-child(${index}) .tag-item-text`)
  }

  get tagNumberFromBreadcrumb() {
    return $(
      '.breadcrumbs li:nth-child(3) .breadcrumb-text.disabled.text-disabled'
    )
  }

  get draftTextFormBreadcrumb() {
    return $('.breadcrumbs .disabled.text-disabled')
  }

  get appDescriptonMaxCount() {
    return $(`[data-test='shortDescription'] .characters-remaining`)
  }

  //29/3
  get kaNameFromInputField() {
    return $('input#name')
  }

  get kbdropDown() {
    return $('.react-select__control input')
  }

  get membersBar() {
    return $('.form-wrapper.workspaces .workspace-toolbar')
  }

  // get deployBtn() {
  //   return $('button.button.default.tag-deploy')
  // }

  get compareVersionsTitle() {
    return $('.changelogs-title>h3')
  }

  //12/04
  // getEditDependenciesBtn(index) {
  //   return $(
  //     `.form-body.simple.dependency-management .button-group:nth-child(${index})> .button.secondary`
  //   )
  // }

  get editDependenciesIconBelowBtnRow() {
    return $(
      '.form-body.simple.dependency-management .button-group:nth-child(3) :nth-child(2)'
    )
  }

  getEditDependenciesIconFromDependenciesCard(index) {
    return $(
      `.blocks-or-services .block:nth-of-type(${index}) .icon.gear-circle`
    )
  }

  get environmentDefaultsTextFromBreadcrumb() {
    return $(
      '.breadcrumbs .unstyled-list li:nth-child(4) .disabled.text-disabled'
    )
  }

  get draftDropDownVisible() {
    return $('div.dropdown-content.isShown')
  }

  get environmentDefaultsDropDown() {
    return $('#env-switch-dropdown > button')
  }

  get searchFilterInAppSwitcherDropDown() {
    return $(
      '.breadcrumbs .unstyled-list>li:nth-child(2) .dropdown-filter-input'
    )
  }

  get draftDropDownFilter() {
    return $('div.dropdown-content.isShown  .dropdown-filter-input')
  }

  getTagDateFromTagDropDown(index) {
    return $(
      `#tagDropdown.dropdown.dropdown-filter.margin-right.ka-version-switcher .dropdown-scroll-container button:nth-child(${index}) .date>h5`
    )
  }

  getTagNotesFromTagDropDown(index) {
    return $(
      `#tagDropdown.dropdown.dropdown-filter.margin-right.ka-version-switcher .dropdown-scroll-container button:nth-child(${index}) .notes>h5`
    )
  }

  get searchFilterInEnvSwitcherDropDown() {
    return $('.dropdown-content.isShown.short input')
  }

  get searchFilterInLogSwitcherDropDown() {
    return $('.dropdown-content.isShown.short input')
  }

  getEnvironmentDefaultsDropDownEnvText(index) {
    return $(
      `#env-switch-dropdown .dropdown-scroll-container button:nth-child(${index}) .tag-item-text`
    )
  }

  get dependenciesTitle() {
    return $('.form-wrapper.blocks-and-services .title')
  }

  get dependenciesSubtitle() {
    return $('.form-wrapper.blocks-and-services h5')
  }

  get dependenciesSearchBar() {
    return $('.form-wrapper.blocks-and-services .react-select__control')
  }

  get editDependneciesBtn() {
    return $('.form-body.simple.dependency-management .icon.gear-button')
  }

  getDependenciesCards(index) {
    return $(`.blocks-or-services .block:nth-of-type(${index})`)
  }

  getDependenciesCardTitle(index) {
    return $(`.blocks-or-services .block:nth-of-type(${index}) .name`)
  }

  getDependenciesCardSubtitle(index) {
    return $(`.blocks-or-services .block:nth-of-type(${index}) .description`)
  }

  getDependenciesCardIcon(index) {
    return $(`.blocks-or-services .block:nth-of-type(${index}) .main-icon`)
  }

  getExpandTextFromDependencyCard(index) {
    return $(
      `.blocks-or-services .block:nth-of-type(${index}) .dependencies-exist .expand-close-indicator>h6`
    )
  }

  getSecondLevelDependencyStackedIcons(id, index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${id}) .expand .icons .icon.kintoblock:nth-child(${index})`
    )
  }

  getSecondLevelDependencyAddIcon(index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${index}) .expand .icons .number`
    )
  }

  getSecondLevelDependencyTitle(id, index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${id}) .dependencies-exist .row:nth-child(${index}) .text>h3`
    )
  }

  getSecondLevelDependencySubtitle(id, index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${id}) .dependencies-exist .row:nth-child(${index}) .text>h6`
    )
  }

  getSecondLevelDependencyIcon(id, index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${id}) .dependencies-exist .row:nth-child(${index}) ..icon.kintoblock`
    )
  }

  getDependencyInformationLinkIcon(index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${index}) .information-link-icon`
    )
  }

  get kbDocumentionPage() {
    return $('.endpoint-title>h3')
  }

  getFocusedKbInEditDependenciesPage(index) {
    return $(
      `.right-side .ka-config-params .ka-config-item.ka-config-params-item:nth-child(${index})>h3`
    )
  }

  getDepBranchAndTagSwitcherField(index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${index}) input`
    )
  }

  //21/05
  get kaFromEnvListBreadcrumb() {
    return $('.breadcrumbs li .disabled.text-disabled')
  }

  getDependenciesDeleteIcon(index) {
    return $(`.block:nth-child(${index}) .delete-block.hide-text`)
  }

  get editDependenciesPageTitle() {
    return $('.right-side.uppercase.tab-list>li>a')
  }

  get depSearchBarInEditDepPage() {
    return $('.left-side .search.white>input')
  }

  get dependenciesListInEditDepPage() {
    return $('.ka-config-scroll-container .ka-config-blocks-list')
  }

  get customParameterSearchBar() {
    return $('.right-side .search.white>input')
  }

  get descriptionField() {
    return $('textarea#shortDescription')
  }

  get basicInfoComponentNameFieldTitle() {
    return $(`[data-test='name'] label`)
  }

  get ownerTextFromMembersBar() {
    return $('.user-section>h5')
  }

  get basicInfoComponentSubtitle() {
    return $('.form-wrapper.basic-info>h5')
  }

  get basicInfoComponentDescriptionFieldTitle() {
    return $(`[data-test='shortDescription'] label`)
  }

  get versionTextFromBreadcrumb() {
    return $('.breadcrumbs li:nth-child(3) .breadcrumb-text')
  }

  //22/05
  getEditDepIconFromDepCard(index) {
    return $(`.block:nth-child(${index}) .icon.gear-circle`)
  }

  get editDepBtn() {
    return $('.button.secondary.button-icon')
  }

  getDepDocLink(index) {
    return $(`.information-link-icon`)
  }

  getTextOfKBFromKBListInDepPage(index) {
    return $(
      `.left-side .ka-config-scroll-container li:nth-child(${index}) .text .name`
    )
  }

  get customParameterInputField() {
    return $('.right-side .prefill-wrapper input')
  }

  getCustomParameterKeyText(index) {
    return $(
      `.ka-config-item.ka-config-params-item  .form-body .param-row:nth-child(${index}) label`
    )
  }

  get draftIcon() {
    return $('.draft-icon')
  }

  get amazingBtn() {
    return $('.kh-modal-actions button.button.dark')
  }

  deploySuccessBtn() {
    if (this.amazingBtn.isVisible()) {
      this.amazingBtn.click()
    }
  }

  get branchAndTagDropDown() {
    return $('.dropdown-filter-input.tag-and-branch-dropdown')
  }

  getNotesInBranchTagSwitcher(index) {
    return $(`[data-test='tag-list'] > button:nth-of-type(${index}) .note`)
  }

  getTagFromBranchTagSwitcher(index) {
    return $(`[data-test='tag-list'] > button:nth-of-type(${index}) .tag-name`)
  }

  // getDepViewEndpointsBtn(index) {
  //   return $(`.block:nth-of-type(${index}) .button.secondary.endpoint-button`)
  // }

  getBranchOrTagOfDep(index) {
    return $(
      `.blocks-or-services .block:nth-of-type(${index}) .tag-and-branch-input > input`
    )
  }

  //id is KB in list and index is order of custom parameter
  getCustomParamValuesInEditDepPage(id, index) {
    return $(`[data-test="data[${id}].params[${index}].value"] input`)
  }

  get versionSwitcherDropdown() {
    return $('#tagDropdown .dropdown-button.breadcrumb-icon')
  }

  get mongoErrorMsg() {
    return $('.error-message-form.error-message')
  }

  get dependencyList() {
    return $('.blocks-or-services')
  }

  get unsuccessfullBuildErrorMsg() {
    return $('.error-message-form.error-message')
  }

  get noOptionsText() {
    return $('.react-select__menu-notice--no-options')
  }

  get personalWS() {
    return $('.workspace-toggles .toggle-slider')
  }

  //new changes 12/01/2019
  get deploymentSuccess() {
    return $('.status-and-history .tag.main.success')
  }

  checkforDeploymentSuccess() {
    //To check whether text is moved to deployed
    browser.waitForVisible(`.status-and-history .tag.main`)
    if (browser.getText(`.status-and-history .tag.main`) === 'RUNNING') {
      browser.waitUntil(
        function() {
          return browser.getText(`.status-and-history .tag.main`) === 'DEPLOYED'
        },
        100000,
        'expected text to be different '
      )
    } else {
      browser.waitUntil(
        function() {
          return browser.getText(`.status-and-history .tag.main`) === 'DEPLOYED'
        },
        100000,
        'expected text to be different '
      )
    }
  }

  getEnvCardTitle(index) {
    return $(`.sidebar-card-container:nth-of-type(${index}) .caps.bold`)
  }

  get addEnv() {
    return $('.add-new-environment .icon.plus')
  }

  get addEnvHide() {
    return $('.title .icon.plus')
  }

  get expandDeploymentHistory() {
    return $('.deployment-history .icon.toggle')
  }

  get deployBtn() {
    return $(`[data-test=savebar] button`)
  }

  getDeploymentHistory(index) {
    return $(`.release:nth-of-type(${index}) .button.secondary:first-of-type`)
  }

  get clientAndSecretKey() {
    return $('.api-access .section:first-of-type .code')
  }

  //18/01/2019

  get basicInfoEditIcon() {
    return $('.icon.edit')
  }

  get goBackBtn() {
    return $('.return-link')
  }

  get basicInfoSaveBtn() {
    return $('.kh-modal-actions .dark.button')
  }

  get basicInfoCancelBtn() {
    return $('.kh-modal-actions .secondary.button')
  }

  get basicInfoPopUp() {
    return $('.basic-info-modal')
  }

  get basicInfoComponentTitle() {
    return $('.basic-info-modal .title')
  }

  getDepEndpoint(index) {
    return $(`.dep-list li:nth-of-type(${index}) .button.secondary`)
  }

  get shutDownBtn() {
    return $('.page-title .dark.button')
  }

  get errorMsg() {
    return $('.error-message')
  }

  get shutDownAnywayBtn() {
    return $('.kh-modal-body .button.dark')
  }

  get viewLogs() {
    return $('.deployment-history .button.outline')
  }

  getTagBtn(index) {
    return $(`.expanded .button.secondary:nth-of-type(${index})`)
  }

  getRollBackBtn(index) {
    return $(`.expanded .button.secondary:nth-of-type(${index})`)
  }

  get collapseDeploymentHistory() {
    return $('.deployment-history .icon.toggle')
  }

  get configDependencyBtn() {
    return $(
      '.form-body.simple.dependency-management .field-input-wrapper .dependency-management-buttons'
    )
  }

  get kbList() {
    return $('.blocks-or-services')
  }

  getApiSection(index) {
    return $(`.section:nth-child(${index}) .right .button.secondary`)
  }

  get viewEndPointsBtn() {
    return $('.form-block.dep-list .button.secondary')
  }

  get checkTickIcn() {
    return $('.check-icon.success')
  }

  get version() {
    return $('.sidebar-environment-card .heading')
  }

  get toolTip() {
    return $('.form-body.autodeploy .toggle-message .tooltip')
  }

  //Shutdown deployment
  shutDownDeployment(index, ws, envIndex) {
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(index).click()
    this.loadingFinished.waitForExist()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    this.getenvCardSelect(envIndex).click()
    this.loadingFinished.waitForExist()
    browser.scroll(0, -400)
    this.shutDownBtn.waitForVisible()
    this.shutDownBtn.click()
    this.shutDownAnywayBtn.waitForVisible()
    this.shutDownAnywayBtn.click()
    this.loadingFinished.waitForExist()
    browser.pause(8000)
    expect(this.shutDownBtn.isVisible()).to.eql(false)
  }

  get deploybtn() {
    return $('.dashboard-content .button.button-success')
  }

  checkForShutDeployment() {
    //To check whether text is moved from deployed to running
    browser.waitForVisible(`.status-and-history .tag.main`)
    if (browser.getText(`.status-and-history .tag.main`) === 'RUNNING') {
      browser.waitUntil(
        function() {
          return browser.getText(`.status-and-history .tag.main`) === 'SHUTDOWN'
        },
        100000,
        'expected text to be different '
      )
    }
  }
  get searchKB() {
    return $('.ka-config-body .left-side .inner-search-icon ')
  }

  get searchEnv() {
    return $('.ka-config-body .right-side .inner-search-icon ')
  }

  get resetBtn() {
    return $('.ka-config-params .top .button.secondary')
  }

  configureKintoBlocks() {
    this.configDependencyBtn.click()
    this.loadingFinished.waitForVisible()
    this.searchKB.click()
    this.searchKB.setValue('')
    browser.keys('Enter')
    this.searchEnv.click()
    this.searchEnv.setValue('')
    browser.keys('Enter')
    this.resetBtn.click()
  }

  //new smoke tcs
  getViewLogsBtn(index) {
    return $(`.deployment-history .release:nth-child(${index}) .button.outline`)
  }

  getKintoBlockDropDown(index) {
    return $(`.console-logs-head .react-select:nth-of-type(${index})`)
  }

  get Logs() {
    return $('.commit-details-code-wrapper')
  }

  getenvCardSelect(index) {
    return $(`.sidebar-card-container:nth-child(${index})`)
  }

  //new features
  get deleteBtn() {
    return $(`.button.destructive`)
  }

  get deleteInput() {
    return $(`//*[text()='Enter 'DELETE' in all caps to confirm']`)
  }

  get deleteEnvBtn() {
    return $('.kh-modal-actions .destructive.button')
  }

  get permanentDelText() {
    return $('#delete-section.form-wrapper>h5')
  }

  get deleteBlock() {
    return $('#delete-section.form-wrapper')
  }

  get deletePopupText() {
    return $('.kh-modal-title>h4')
  }

  get delPopupDescription() {
    return $('.kh-modal-body>h4')
  }

  get doNothingBtn() {
    return $('.kh-modal-actions .secondary.button')
  }

  get goBtn() {
    return $('.kh-modal-actions .secondary.button')
  }

  get deleteEnv() {
    return $('.button.destructive')
  }

  get confirmDeleteInput() {
    return $('.kh-modal-body input')
  }

  get envDeleteBtn() {
    return $('.kh-modal-actions .button.destructive')
  }

  get envDeletePopTitle() {
    return $('.kh-modal-title h4')
  }

  getblock(index) {
    return $(`.block:nth-child(${index})`)
  }

  get depPopUp() {
    return $('.dropdown-scroll-container>h4')
  }

  get depSearchBar() {
    return $(
      '.dropdown-content.add-to-deployment.isShown .dropdown-content-filter'
    )
  }

  get webAppTitle() {
    return $(`//*[contains(text(),'Payco web App')]`)
  }

  getEnvCardHandle(index) {
    return $(`.sidebar-card-container  .icon.drag-handle:nth-child(${index})`)
  }

  getenvCardVerNumber(index) {
    return $(
      `.sidebar-card-container:nth-child(${index}) .heading h5:nth-of-type(2)`
    )
  }

  getNoDeploymentText(index) {
    return $(`.sidebar-card-container:nth-child(${index}) .date-and-time p`)
  }

  getCurrentDate() {
    const month_names = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]
    const today = new Date()
    let day = today.getDate()
    if (day < 10) {
      day = `0${day}`
    }
    const month_index = today.getMonth()
    const year = today.getFullYear()
    const currentDate = `${day} ${month_names[month_index]} ${year}`
    console.log('currentDate=', currentDate)
    return currentDate
  }

  getdate(index) {
    return $(`.sidebar-card-container:nth-child(${index}) .date-and-time p`)
  }

  get envParamName() {
    return $(`.ka-config-params .param-row .label-characters`)
  }

  get envParamValue() {
    return $(`.ka-config-params .param-row .field-input-wrapper`)
  }

  get requiredLabel() {
    return $(
      `.ka-config-params .param-row .field-input-wrapper  .input-text-overlay-message.uppercase`
    )
  }

  //added 25 April 2019
  get websiteUrl() {
    return $(`.website .website-input input`)
  }

  get copyBtnInTitle() {
    return $(
      '.page-title .environment-information :first-of-type .button.copy.outline'
    )
  }

  get secretKeyBtnInTitle() {
    return $(
      '.page-title .environment-information :last-of-type .button.copy.outline'
    )
  }

  get copyBtnInAPIAccess() {
    return $(
      '#access-api .environment-information :first-of-type .button.copy.outline'
    )
  }

  get secretKeyBtnInAPIAccess() {
    return $(
      '#access-api .environment-information :last-of-type .button.copy.outline'
    )
  }

  getDiffApiAccess(index) {
    return $(`.api-access .form-block.steps .tabs .tab:nth-child(${index}) h4`)
  }

  getExternalAccessDescription(index) {
    return $(`.api-access .section:nth-child(${index}) p:first-of-type`)
  }
}

export default new DeploymentManage()
