import Page from './page'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import Landing from '../page-objects/landing.page'
import { getDataTest, getInput } from '../helpers/elementSelector'
import { expect } from 'chai'
import testData from '../constants/testdata.json'
import KintoBlockcreate from '../page-objects/kintoBlock.create.page'

var randomName

class KintoBlockManage extends Page {
  open(id, ver) {
    super.open(`app/dashboard/1/kintoblocks/${id}/versions/${ver}`)
  }

  get title() {
    return getDataTest('title')
  }

  get name() {
    return getInput('name')
  }

  get description() {
    return getInput('shortDescription', 'textarea')
  }

  get language() {
    return getDataTest('language')
  }

  get protocol() {
    return getDataTest('protocol')
  }

  get repository() {
    return getInput('repositoryName')
  }

  get envInput() {
    return getDataTest('kb-manage-env')
  }

  get descriptionField() {
    return $('textarea#shortDescription')
  }

  get addIconOfEnvVariables() {
    return $('.icon-column .icon.add')
  }

  get addIconOfCustomParam() {
    return $('.form-body.custom-params .icon.add')
  }

  get addEnvKey() {
    return $('input[data-test="params-add-key"]')
  }

  get addEnvValue() {
    return $('input[data-test="params-add-value"]')
  }

  get requiredToggleForCustomParam() {
    return $(`[data-test="kb-manage-params"] .toggle-slider`)
  }

  get addCustomKey() {
    return $('input[data-test="params-add-key"]')
  }

  get addCustomValue() {
    return $('input[data-test="params-add-value"]')
  }

  get customInput() {
    return getInput('kb-manage-params')
  }

  get paramsInput() {
    return getInput('kb-manage-params')
  }

  get createTagButton() {
    return getDataTest('create-tag-button')
  }

  get createTagError() {
    return getDataTest('create-tag-error')
  }

  get breadcrumb() {
    return getDataTest('breadcrumb-toggle-tag-and-branch')
  }

  get breadCrumbTitle() {
    return getDataTest('breadcrumb-text')
  }

  getEnvRow(index) {
    return $(`[data-test='kb-manage-env-${index}']`)
  }

  getParamsRow(index) {
    return $(`[data-test='kb-manage-params-${index}']`)
  }

  getTab(index) {
    return $(`[data-test='${index}-tab']`)
  }

  getDropdown(index) {
    return $(`[data-test='${index}-list']`)
  }

  get dropDownfilter() {
    return getDataTest('dropdown-filter')
  }

  get dropDownMenu() {
    return $('#id-0 > button')
  }

  get dropDownMenuOptions() {
    return $('.dropdown-scroll-container')
  }

  get editBranch() {
    return $('.dropdown-scroll-container > button.double-line')
  }

  get viewBranchesAndTag() {
    return $('.dropdown-scroll-container > button:nth-child(2)')
  }

  get delKB() {
    return $('.dropdown-scroll-container > button:nth-child(4)')
  }

  get dropDownTabs() {
    return $('.dropdown-tabs')
  }

  get activeTagSection() {
    return $('.tab.tags.active')
  }

  //23/3
  get form() {
    return getDataTest('kb-manage-form')
  }

  //11/05
  get refreshCommitBtn() {
    return $('.form-body.simple .commit-details.main button')
  }

  get buildStatusText() {
    return $('.commit-list .build-row:nth-of-type(1) .status')
  }

  //12/05
  get kbListDropDown() {
    return $('#application-dropdown > button')
  }

  get toKbListPage() {
    return $('.breadcrumbs .unstyled-list li:nth-child(1)>a')
  }

  get membersToolBar() {
    return $('.kintoblock-manage.form-container .workspace-toolbar')
  }

  get kbCreationSuccessMsgText() {
    return $('.notification-message.notification>h4')
  }

  get kbSuccessMsg() {
    return $('.notification-message.info h4')
  }

  get successMsgCloseBtn() {
    return $('.notification-message.info > div')
  }

  get noCommit() {
    return $('.commit-details.main .commit-details.no-commit')
  }

  get noCommitTextInRecentCommit() {
    return $('.commit-list .commit-details.no-commit')
  }

  get branchNameOrTagNumberFromBreadcrumb() {
    return $(`[data-test='breadcrumb-text']`)
  }

  get tagVersionFromBreadcrumb() {
    return $(`[data-test='breadcrumb-text']`)
  }

  getDependenciesDeleteIcon(index) {
    return $(`.block:nth-child(${index}) .delete-block.hide-text`)
  }

  get kbListDropDownVisible() {
    return $('div.dropdown-content.isShown.short')
  }

  get createNewKbBtnInBreadcrumb() {
    return $('.dropdown-content-action button.button.dark')
  }

  get repoName() {
    return $('.full-row.commits .repo-info .field-input-wrapper input')
  }

  getKbFromBreadcrumbDropDown(index) {
    return $(
      `#application-dropdown .dropdown-scroll-container button:nth-child(${index})`
    )
  }

  getKbNameFromDropDown(index) {
    return $(
      `#application-dropdown .dropdown-scroll-container button:nth-child(${index}) .tag-item-text`
    )
  }

  get viewEndpointsBtn() {
    return $('.page-title a.button.dark')
  }

  get tagLatestCommitBtn() {
    return $('#savebar-portal button.button.default')
  }

  get basicInfoComponent() {
    return $('.kb-basic-info-modal')
  }

  get dependenciesComponent() {
    return $(
      '.kintoblock-manage.form-container .form-body.simple.dependency-management'
    )
  }

  get envParametersComponent() {
    return $('.form-wrapper.custom-parameters.full-row')
  }

  get tagLatestCommitPopUp() {
    return $('.ReactModal__Content.ReactModal__Content--after-open.kh-modal')
  }

  get languageFieldTitle() {
    return $('.basic-info .two-fields div:nth-of-type(1) label')
  }

  get protocolFieldTitle() {
    return $('.form-advanced .two-fields .react-select label')
  }

  get repositoryFieldTitle() {
    return $('.repo-info .field-wrapper label')
  }

  get languageField() {
    return $(`[data-test='language']`)
  }

  get protocolField() {
    return $(`[data-test='protocol']`)
  }

  get repositoryField() {
    return $('.repo-link input')
  }

  get kintoBlocksTextInBreadcrumb() {
    return $('.breadcrumbs .unstyled-list li:nth-child(1) a')
  }

  get kbNameInBreacdcrumb() {
    return $(
      '.breadcrumbs .unstyled-list li:nth-child(2) .disabled.text-disabled'
    )
  }

  get branchOrTagTextInBreadcrumb() {
    return $(
      '.breadcrumbs .unstyled-list li:nth-child(3) [data-test="breadcrumb-text"]'
    )
  }

  get documentationTextInBreadcrumb() {
    return $('.breadcrumbs .unstyled-list li:nth-child(4) .disabled')
  }

  get cancelTagBtn() {
    return $('.kh-modal-actions > button.button.secondary')
  }

  get branchTagDropDown() {
    return $(`[data-test='breadcrumb-toggle-tag-and-branch']`)
  }

  get searchFilterInKBSwitcherDropDown() {
    return $(
      '.breadcrumbs .unstyled-list>li:nth-child(2) .dropdown-filter-input'
    )
  }

  getKBNameFromDropDown(index) {
    return $(
      `#application-dropdown .dropdown-scroll-container button:nth-child(${index}) .tag-item-text`
    )
  }

  get searchFilterInBranchTagSwitcherDropDown() {
    return $('.dropdown-content-filter.tags-and-branches > input')
  }

  getBranchNameFromBranchTagSwitcher(index) {
    return $(`[data-test='tag-list'] > button:nth-of-type(${index}) .tag-name`)
  }

  getTagFromBranchTagSwitcher(index) {
    return $(
      `[data-test='tag-list'] > button:nth-of-type(${index}) .tag-name:nth-of-type(1)`
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
    return $('.kh-modal-actions > button.button.dark')
  }

  getDateAndTimeInBranchTagSwitcher(index) {
    return $(`[data-test='tag-list'] > button:nth-of-type(${index}) .date`)
  }

  getNotesInBranchTagSwitcher(index) {
    return $(`[data-test='tag-list'] > button:nth-of-type(${index}) .note`)
  }

  get kintoBlockListFromBreadcrumb() {
    return $('.breadcrumbs .unstyled-list li:nth-of-type(1) > a')
  }

  get kintoBlockNameFromBreadcrumb() {
    return $('.breadcrumbs .unstyled-list li:nth-of-type(2) a')
  }

  get endPointPageTitle() {
    return $('.endpoints-container .endpoint-title > h3')
  }

  get tagCommitPopUpTitle() {
    return $('.kh-modal-title')
  }

  get branchNameInTagLatestCommitPopUp() {
    return $('.kh-modal-body .field-wrapper:nth-of-type(1) input')
  }

  get latestCommitText() {
    return $('.commit-details.main .uppercase')
  }

  get latestCommitTextInRecentCommits() {
    return $('.commit-details.active.first .notes')
  }

  get latestCommitInTagCommitPopUp() {
    return $('.kh-modal-body .field-input-wrapper .uppercase')
  }

  get latestCommitFieldDisabledInTagCommitPopUp() {
    return $('.kh-modal-body .field-input-wrapper .disabled-input-effect')
  }

  get errorInTagFields() {
    return $('.kh-modal-body > form > div:nth-of-type(3) .error-message')
  }

  get duplicateTagError() {
    return $(`[data-test="form-error"]`)
  }

  get duplicateRepoError() {
    return $(`[data-test="form-error"]`)
  }

  get errorInNotesField() {
    return $('.kh-modal-body > form > div:nth-of-type(4) .error-message')
  }

  get openRepoBtn() {
    return $('.repo-link .button.secondary')
  }

  getCommitCodeFromTag(index) {
    return $(
      `[data-test='tag-list'] > button:nth-of-type(${index}) .tag-commit .uppercase`
    )
  }

  get commitComponentInManagePage() {
    return $('.form-wrapper.full-row.commits .form-body.simple')
  }

  get commitComponentInTaggedPage() {
    return $('.form-body.simple.tagged')
  }

  get branchAndTagSwitcherDropDown() {
    return $('.dropdown-content.tag-branch.isShown')
  }

  get commitComponentTitle() {
    return $('.form-wrapper.full-row.commits > h3')
  }

  get commitComponentSubtitle() {
    return $('.form-wrapper.full-row.commits > h5')
  }

  get latestSuccessfulBuildCommitComponent() {
    return $(
      '.form-wrapper.full-row.commits .simple.top .field-input-wrapper:nth-of-type(2)'
    )
  }

  get recentCommitComponent() {
    return $(
      '.form-wrapper.full-row.commits .simple.top .field-input-wrapper:nth-of-type(2)'
    )
  }

  get latestSuccessfulBuildCommitComponentTitle() {
    return $(
      '.form-wrapper.full-row.commits .simple.top .field-input-wrapper:nth-of-type(1) .label'
    )
  }

  get recentCommitComponentTitle() {
    return $(
      '.form-wrapper.full-row.commits .simple.top .field-input-wrapper:nth-of-type(2) .label'
    )
  }

  getBuildIconInRecentCommits(index) {
    return $(`.build-row:nth-of-type(${index}) .icon.build`)
  }

  getCommitDateAndTimeInRecentCommits(index) {
    return $(`.build-row:nth-of-type(${index}) .code.date`)
  }

  get buildIconInLatestBuild() {
    return $('.commit-details.main .icon.build.med-icon')
  }

  get commitDateAndTimeInLatestBuilds() {
    return $('.main-with-icon > div:nth-of-type(2)')
  }

  get commitComponentToolTip() {
    return $('.form-wrapper.full-row.commits .tooltip')
  }

  get commitComponentToolTipText() {
    return $('div.rc-tooltip-inner')
  }

  get commitTextFromGitHub() {
    return $('.commit-tease .message')
  }

  get taggedCommitComponent() {
    return $(
      '.form-wrapper.full-row.commits .simple.top .field-input-wrapper:nth-of-type(1)'
    )
  }

  get taggedCommitComponentTitle() {
    return $(
      '.form-wrapper.full-row.commits .simple.top .field-input-wrapper:nth-of-type(1) .label'
    )
  }

  get disabledNameField() {
    return $(`[data-test="name"] input`)
  }

  get kbWebsiteTypeIcon() {
    return $('.page-title .type-icon.website')
  }

  //Endpoints page objects

  get viewEndpointsTitle() {
    return $('.endpoint-title>h3')
  }

  get endpointSearchBar() {
    return $('.select-endpoint input')
  }

  //Endpoints list
  //Index is 1
  //if id is 1 --> then it points to api name
  //if id is 2 --> then it points to endpoint name
  getEndpointsFromEndpointsList(index, id) {
    return $(
      `.select-endpoint .bottom .unstyled-list li:nth-of-type(${index}) div span:nth-of-type(${id})`
    )
  }

  //Endpoints definition section
  //if id is 1 --> then it points to api name
  //if id is 2 --> then it points to endpoint name
  getEndpointDefinitionSection(index) {
    return $(
      `.endpoint-details >div > div:nth-of-type(1) span:nth-of-type(${index})`
    )
  }

  get endpointDefinition() {
    return $('.endpoint-details > div > div:nth-of-type(1) p')
  }

  //Required session data
  get requiredSessionData() {
    return $('.endpoint-details .bottom .session-top > h3')
  }

  get requiredSessionDataExpandORCollapseText() {
    return $('.endpoint-details .bottom .session-top > h6')
  }

  get requiredSessionExpandORCollapseBtn() {
    return $('.endpoint-details .bottom .session-top .collapse-icon')
  }

  get exposedSessionToolTipIcon() {
    return $('.session-top .tooltip')
  }

  get exposedSessionToolTipText() {
    return $('.session-top .rc-tooltip-inner')
  }

  get requiredSessionToolTipIcon() {
    return $('.session-top .tooltip')
  }

  get requiredSessionToolTipText() {
    return $('.session-top .rc-tooltip-inner')
  }

  get parameterTableForRequiredSessionData() {
    return $('.session-bottom .parameter-box')
  }

  //Indexes are 1 and 2
  getColumnsOfRequiredSessionDataTable(index) {
    return $(
      `.endpoint-details .parameter-box .title > h5:nth-of-type(${index})`
    )
  }

  //There are two parameters for example KB and index are 2 and 3
  //One parameter for new KB and index is 2
  getParameterNameInRequiredSessionDataTable(index) {
    return $(
      `.collapsible-header.expanded .parameter-box > div:nth-of-type(${index}) .field-array-item`
    )
  }

  //There are two parameters for example KB and index are 2 and 3
  //One parameter for new KB and index is 2
  getParameterRequiredTagInRequiredSessionDataTable(index) {
    return $(
      `.collapsible-header.expanded .parameter-box > div:nth-of-type(${index}) .top-row h6`
    )
  }

  //There are two parameters for example KB and index are 2 and 3
  //One parameter for new KB and index is 2
  getParameterTypeInRequiredSessionDataTable(index) {
    return $(
      `.collapsible-header.expanded .parameter-box > div:nth-of-type(${index}) .top-row > h5`
    )
  }

  //There are two parameters for example KB and index are 2 and 3
  //One parameter for new KB and index is 2
  getParameterDescriptionInRequiredSessionDataTable(index) {
    return $(
      `.collapsible-header.expanded .parameter-box > div:nth-of-type(${index}) .description > h5`
    )
  }

  //Exposed session data
  get exposedSessionData() {
    return $('.endpoint-details .bottom .session-top > h3')
  }

  get exposedSessionDataExpandORCollapseText() {
    return $('.endpoint-details .bottom .session-top > h6')
  }

  get exposedSessionExpandORCollapseBtn() {
    return $('.endpoint-details .bottom .session-top span.collapse-icon')
  }

  get parameterTableForExposedSessionData() {
    return $('.session-bottom .parameter-box')
  }

  //Indexes are 1 and 2
  getColumnsOfExposedSessionDataTable(index) {
    return $(
      `.endpoint-details .parameter-box .title > h5:nth-of-type(${index})`
    )
  }

  //There are two parameters for example KB and index are 2 and 3
  //One parameter for new KB and index is 2
  getParameterNameInExposedSessionDataTable(index) {
    return $(
      `.collapsible-header.expanded .parameter-box > div:nth-of-type(${index}) .field-array-item`
    )
  }

  //There are two parameters for example KB and index are 2 and 3
  //One parameter for new KB and index is 2
  getParameterRequiredTagInExposedSessionDataTable(index) {
    return $(
      `.collapsible-header.expanded .parameter-box > div:nth-of-type(${index}) .top-row h6`
    )
  }

  //There are two parameters for example KB and index are 2 and 3
  //One parameter for new KB and index is 2
  getParameterTypeInExposedSessionDataTable(index) {
    return $(
      `.collapsible-header.expanded .parameter-box > div:nth-of-type(${index}) .top-row > h5`
    )
  }

  //There are two parameters for example KB and index are 2 and 3
  //One parameter for new KB and index is 2
  getParameterDescriptionInExposedSessionDataTable(index) {
    return $(
      `.collapsible-header.expanded .parameter-box > div:nth-of-type(${index}) .description > h5`
    )
  }

  //response code
  get responseCodeComponent() {
    return $('.endpoint-details .bottom > div:nth-of-type(2) h3')
  }

  get responseCodeComponentToolTipIcon() {
    return $('.endpoint-details .bottom > div:nth-of-type(2) .tooltip')
  }

  //For example KB's there are 2 response codes, index is 3 and 4.
  //For KB created with sample block there is only one code, index is 3
  getResponseCodesFromResponseCodeComponent(index) {
    return $(`.endpoint-details .bottom > div:nth-of-type(${index}) .top > h5`)
  }

  //For example KB's there are 2 response codes, index is 3 and 4.
  //For KB created with sample block there is only one code, index is 3
  getResponseCodeExpandORCollapseText(index) {
    return $(`.endpoint-details .bottom > div:nth-of-type(${index}) .top > h6`)
  }

  //there are 2 response codes, index is 2 and 3.
  getResponseCodeExpandORCollapseBtn(index) {
    return $(
      `.endpoint-details .bottom > div:nth-of-type(${index}) .top h6 span`
    )
  }

  ///Response parameters table in response code
  ///For example KB's there are 2 response codes, index is 3 and 4.
  ///For KB created with sample block there is only one code, index is 3
  getResponseParametersTableTitleFromResponeCodeSection(index) {
    return $(`.bottom > div:nth-of-type(${index}) .documentation-display > h3`)
  }

  ///For example KB's there are 2 response codes, index is 3 and 4.
  ///For KB created with sample block there is only one code, index is 3
  getResponseParametersTableToolTipIconFromResponeCodeSection(index) {
    return $(
      `.bottom > div:nth-of-type(${index}) .documentation-display .tooltip`
    )
  }

  ///For example KB's there are 2 response codes, index is 3 and 4.
  ///For KB created with sample block there is only one code, index is 3
  ///id is 1 and 2
  getResponseParametersTableColumnsFromResponeCodeSection(index, id) {
    return $(
      `.bottom > div:nth-of-type(${index}) .title > h5:nth-of-type(${id})`
    )
  }

  ///For example KB's there are 2 response codes, index is 3 and 4.
  ///For KB created with sample block there is only one code, index is 3
  getResponseParameterNameFromResponeCodeSection(index) {
    return $(
      `.bottom > div:nth-of-type(${index}) .parameter-box .field-array-item`
    )
  }

  ///For example KB's there are 2 response codes, index is 3 and 4.
  ///For KB created with sample block there is only one code, index is 3
  getParameterRequiredTagInResponseParametersTable(index) {
    return $(`.bottom > div:nth-of-type(${index}) .parameter-box .row h6`)
  }

  ///For example KB's there are 2 response codes, index is 3 and 4.
  ///For KB created with sample block there is only one code, index is 3
  getParameterTypeInResponseParametersTable(index) {
    return $(`.bottom > div:nth-of-type(${index}) .parameter-box .top-row > h5`)
  }

  ///For example KB's there are 2 response codes, index is 3 and 4.
  ///For KB created with sample block there is only one code, index is 3
  getParameterDescriptionInResponseParametersTable(index) {
    return $(
      `.bottom > div:nth-of-type(${index}) .parameter-box .description > h5`
    )
  }

  get responseCodeToolTipText() {
    return $('.bottom > div:nth-of-type(2) .rc-tooltip-inner')
  }

  //protocol tabs
  //index is 1,2,3
  getProtocolTabs(index) {
    return $(
      `.endpoint-details .documentation-tabs > button:nth-of-type(${index}) > h5`
    )
  }

  //Restful tabs
  //Endpoint
  get endpointSection() {
    return $('.endpoint-details .endpoint-example:nth-of-type(1) > h3')
  }

  get endpointSectionToolTipIcon() {
    return $('.endpoint-details .endpoint-example:nth-of-type(1) .tooltip')
  }

  get endpointSectionCopyBtn() {
    return $(`.endpoint-example:nth-of-type(1) .right > button`)
  }

  //Index is 1
  //Id is 1 and 2
  getEndpointNameInRestFullEndpointSection(index, id) {
    return $(
      `.endpoint-details .endpoint-example:nth-of-type(${index}) .endpoint-name.box span:nth-of-type(${id})`
    )
  }

  //index is 1,2,3
  getRestFullTabs(index) {
    return $(`.more-details.restful .endpoint-example:nth-of-type(${index})`)
  }

  //Request parameters
  get requestParametersSection() {
    return $('.more-details.restful  .parameter-section > h3')
  }

  get requestParametersToolTipIcon() {
    return $('.more-details.restful  .parameter-section .tooltip')
  }

  //index is 1 and 2
  getRequestParametersTableColumns(index) {
    return $(
      `.parameter-section .parameter-box .title > h5:nth-of-type(${index})`
    )
  }

  //index is 2 and 3
  getRequestParameterNameFromRequestParameterTable(index) {
    return $(
      `.parameter-section .parameter-box > div:nth-of-type(${index}) .fields > h5`
    )
  }

  //index is 2 and 3
  getRequestParameterReqTagFromRequestParameterTable(index) {
    return $(
      `.parameter-section .parameter-box > div:nth-of-type(${index}) .fields > h6`
    )
  }

  //index is 2 and 3
  getRequestParameterTypeFromRequestParameterTable(index) {
    return $(
      `.parameter-section .parameter-box > div:nth-of-type(${index}) .top-row > h5`
    )
  }

  //index is 2 and 3
  getRequestParameterDescriptionFromRequestParameterTable(index) {
    return $(
      `.parameter-section .parameter-box > div:nth-of-type(${index}) .description`
    )
  }

  //Request example
  get requestExampleCopyBtn() {
    return $(
      `.more-details.restful .endpoint-example:nth-of-type(2) .right > button`
    )
  }

  get requestExampleExpandORCollapseText() {
    return $(
      `.more-details.restful .endpoint-example:nth-of-type(2) .right .toggle-expand > h6`
    )
  }

  get requestExampleExpandORCollapseBtn() {
    return $(
      `.more-details.restful .endpoint-example:nth-of-type(2) .right .toggle-expand .collapse-icon`
    )
  }

  get requestExampleRToolTipIcon() {
    return $(`.more-details.restful .endpoint-example:nth-of-type(2) .tooltip`)
  }

  //Response body
  get responseBodyCopyBtn() {
    return $(
      `.more-details.restful .endpoint-example:nth-of-type(3) .right > button`
    )
  }

  get responseBodyExpandORCollapseText() {
    return $(
      `.more-details.restful .endpoint-example:nth-of-type(3) .right .toggle-expand > h6`
    )
  }

  get responseBodyExpandORCollapseBtn() {
    return $(
      `.more-details.restful .endpoint-example:nth-of-type(3) .right .toggle-expand .collapse-icon `
    )
  }

  get responseBodyRToolTipIcon() {
    return $(`.more-details.restful .endpoint-example:nth-of-type(3) .tooltip`)
  }

  //Response code section for KB branch documentation
  //index are 2 and 3
  getParameterNameInResponseCodesTable(index) {
    return $(
      `.response-code.expanded.code-200 .bottom > div:nth-of-type(1) .parameter-box > div:nth-of-type(${index}) .field-array-item`
    )
  }

  //index are 2 and 3
  getParameterRequiredTagInResponseCodesTable(index) {
    return $(
      `.response-code.expanded.code-200 .bottom > div:nth-of-type(1) .parameter-box > div:nth-of-type(${index}) h6`
    )
  }

  //index are 2 and 3
  getParameterTypeInResponseCodesTable(index) {
    return $(
      `.response-code.expanded.code-200 .bottom > div:nth-of-type(1) .parameter-box > div:nth-of-type(${index}) .top-row > h5`
    )
  }

  //index are 2 and 3
  getParameterDescriptionInResponseCodesTable(index) {
    return $(
      `.response-code.expanded.code-200 .bottom > div:nth-of-type(1) .parameter-box > div:nth-of-type(${index}) .description > h5`
    )
  }

  //github
  getRecentCommitText(index) {
    return $(`.build-row:nth-of-type(${index}) .code.number.uppercase`)
  }

  //Need to change, when we have multiple commits
  get commitText() {
    return $('.commit-details-code .right .code')
  }

  getBuildTextInRecentCommits(index) {
    return $(
      `.build-row:nth-of-type(${index}) li:nth-of-type(1) .code.number.uppercase`
    )
  }

  get apiDocInGitHub() {
    return $(
      '.file-wrap .js-navigation-item:nth-of-type(7) .js-navigation-open'
    )
  }

  get editIconInGitHub() {
    return $('.btn-octicon.tooltipped.tooltipped-nw .octicon.octicon-pencil')
  }

  get editTabInGitHub() {
    return $(`[data-tab='show-code']`)
  }

  get apiDocInputField() {
    return $('.form-control.js-blob-filename.js-breadcrumb-nav')
  }

  get commitChangesUpdateField() {
    return $('#commit-summary-input')
  }

  get commitChangesBtn() {
    return $('#submit-file')
  }

  get noBuildTextInEndpointPage() {
    return $('.endpoints-container .nobuild-message')
  }

  get appInGitHub() {
    return $(
      '.file-wrap .js-navigation-item:nth-of-type(2) .js-navigation-open'
    )
  }

  get branchesPageInGitHub() {
    return $('.numbers-summary li:nth-of-type(2) a')
  }

  get branchDeleteIconInGiHub() {
    return $('.Box--condensed.mb-3:nth-of-type(2) .js-branch-destroy button')
  }

  get indexJsFile() {
    return $('.css-truncate.css-truncate-target .js-navigation-open')
  }

  getTextFromIndexJsLines(index) {
    return $(`.CodeMirror-code div:nth-of-type(${index}) .cm-comment`)
  }

  get branchsDropDownInGitHub() {
    return $('.btn.btn-sm.select-menu-button.css-truncate')
  }

  get searchBranchInGitHub() {
    return $('input#context-commitish-filter-field')
  }

  getBranchNameFromGitHubBranchList(index) {
    return $(`.select-menu-list a:nth-of-type(${index})`)
  }

  getBranchFromGitHubBranchList(branchName) {
    return $(`//span[contains(text(),${branchName})]`)
  }

  get nodeExampleInGitHub() {
    return $(
      '.file-wrap .js-navigation-item:nth-of-type(3) .js-navigation-open'
    )
  }

  get nodeExampleIndexJsFile() {
    return $(
      '.file-wrap .js-navigation-item:nth-of-type(4) .js-navigation-open'
    )
  }

  get shareKBIcon() {
    return $(`[data-test="isShared"] .toggle-slider`)
  }

  get shareOptionStatus() {
    return $('[data-test="isShared"] input')
  }

  getResponseCodeText(index) {
    return $(`.bottom > div:nth-of-type(${index}) .top > h5`)
  }

  get readMeEdit() {
    return $(
      '.file-wrap .js-navigation-item:nth-of-type(4) .js-navigation-open'
    )
  }

  get readMeEditForHelloWorldExample() {
    return $(
      '.file-wrap .js-navigation-item:nth-of-type(2) .js-navigation-open'
    )
  }

  get updateReadMeName() {
    return $('.form-control.js-blob-filename.js-breadcrumb-nav')
  }

  get readMeEditForLogin() {
    return $(
      '.file-wrap .js-navigation-item:nth-of-type(6) .js-navigation-open'
    )
  }

  secondCommit() {
    this.refreshCommitBtn.waitForVisible()
    this.refreshCommitBtn.scroll(0, 1000)
    this.refreshCommitBtn.click()
    this.loadingFinished.waitForExist()
    this.previousCommit.waitForVisible()
    if (
      browser.getText(
        `.commit-details.first div.state-and-time > div:nth-child(2)`
      ) === ('PROCESSING' || 'QUEUED')
    ) {
      browser.waitUntil(
        function() {
          browser.pause(5000)
          this.refreshCommitBtn.click()
          this.loadingFinished.waitForExist()
          return (
            browser.getText(
              `.commit-details.first div.state-and-time > div:nth-child(2)`
            ) === 'PROCESSING'
          )
        },
        300000,
        'expected text to be different '
      )
    }
    browser.waitUntil(
      function() {
        browser.pause(5000)
        this.refreshCommitBtn.click()
        this.loadingFinished.waitForExist()
        const buildStatus = browser.getText(
          `.commit-details.first div.state-and-time > div:nth-child(2)`
        )
        return buildStatus === 'SUCCESS' || buildStatus === 'FAILED'
      },
      300000,
      'expected text to be different '
    )
    expect(
      browser.getText(
        `.commit-details.first div.state-and-time > div:nth-child(2)`
      )
    ).to.eql('SUCCESS')
    browser.refresh()
    this.loadingFinished.waitForExist()
  }

  get previousCommit() {
    return $('.commit-list .build-row:nth-of-type(2) .status')
  }

  getDateAndTimeForTagInBranchTagSwitcher(index) {
    return $(`[data-test='tag-list'] > button:nth-of-type(${index}) .tag-date`)
  }

  get commitCodeInLatestSuccessBuilt() {
    return $('.commit-details.main .main-with-icon > div:nth-child(2)')
  }

  get newCommit() {
    return $('.commit-details.first .state-and-time > div:nth-child(2) .build')
  }

  get textFromExampleBlocks() {
    return $('.public strong > a')
  }

  getOpenLogLinkOfBuilds(index) {
    return $(`.build-row:nth-of-type(${index}) .open-log`)
  }

  get viewExampleProjectsLink() {
    return $('.repo-info .view-example')
  }

  get basicInfoEditIcon() {
    return $('.icon.edit')
  }

  get basicInfoSaveBtn() {
    return $('.kh-modal-actions .dark.button')
  }

  get basicInfoCancelBtn() {
    return $('.kh-modal-actions .secondary.button')
  }

  get advancedOptionsExpandIcon() {
    return $('.toggle-advance-options .advance-icon')
  }

  get websiteTypeIcon() {
    return $('.page-title .type-icon.website')
  }

  getDocFormatOptions(type) {
    return $(`[data-test-label='${type}']`)
  }

  get basicInfoExpandAndCollapseText() {
    return $('.basic-info-wrapper .right')
  }

  get websiteTypeField() {
    return $('[data-test="subtype"]')
  }

  shareKbToPublic(index) {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    var kbName = KintoBlockList.getKbCardName(index).getText()
    // KintoBlockList.getCard(index).click()
    // this.loadingFinished.waitForExist()
    // this.form.waitForVisible()
    // this.loadingFinished.waitForExist()
    // this.shareKBIcon.click()
    // browser.pause(2000)
    // expect(this.shareOptionStatus.getValue()).to.eql('true')
    // this.submitGlobal()
    // this.loadingFinished.waitForExist()
    // this.form.waitForVisible()
    // this.loadingFinished.waitForExist()
    return kbName
  }

  getRetryBtnForBuilds(index) {
    return $(
      `.build-row:nth-of-type(${index}) .status-wrapper .retry-link.open-log`
    )
  }

  getElapsedTimeOfBuild(index) {
    return $(
      `.build-row:nth-of-type(${index}) .processing-text span:nth-of-type(1)`
    )
  }

  getEstimatedTimeOfBuild(index) {
    return $(
      `.build-row:nth-of-type(${index}) .processing-text span:nth-of-type(2)`
    )
  }

  get protocolFieldDisabled() {
    return $('.two-fields .react-select--is-disabled')
  }

  getTagThisBuildBtn(index) {
    return $(`.build-row:nth-of-type(${index}) .button.secondary`)
  }

  //Advanced options
  get advancedOptionBlock() {
    return $(`.form-wrapper.advanced-collapse-options.closed`)
  }

  get portFieldInAdvancedOptions() {
    return $(`[data-test="versionBuildConfigData.port"] input`)
  }

  get buildCommandInAdvancedOptions() {
    return $(`[data-test="versionBuildConfigData.buildCommand"] input`)
  }

  get runCommandInAdvancedOptions() {
    return $(`[data-test="versionBuildConfigData.runCommand"] input`)
  }

  //Bitbucket
  get branchesPageInBitbucket() {
    return $('.sc-krDsej.dwQWjG .sc-kVIJgn.cnungJ .sc-kasBVs.eLbwww')
  }

  get createBranchBtnInBitbucket() {
    return $('.Button__StyledButton-sc-1o41kgk-0.iRCyRx')
  }

  get BranchNameFieldInBitbucket() {
    return $('.sc-DNdyV.fSkfWL input')
  }

  get createBranchBtn() {
    return $('button#create-branch-button')
  }

  get masterPageInBitbucket() {
    return $('.sc-fMiknA.cmapSQ')
  }

  get mergedBranchListInBitbucket() {
    return $('#merged-link')
  }

  getBranchNameFromMergedBranchList(index) {
    return $(`tbody tr:nth-of-type(${index}) .branch-header a`)
  }

  getBranchOptions(index) {
    return $(`tbody tr:nth-of-type(${index}) td:last-of-type button`)
  }

  get branchSearchDropdown() {
    return $(`//*[contains(text(),'Active branches')]`)
  }

  get branchOptionsBtnInBitbucket() {
    return $('.iterable-item:nth-of-type(2) .aui-dropdown2-trigger-arrowless')
  }

  get branchOptionMenuBtnDropDown() {
    return $('tr:nth-of-type(2) .aui-iconfont-more')
  }

  get deleteOptionForBranch() {
    return $(`//*[contains(text(),'Delete')]`)
  }

  get confirmDeleteBranch() {
    return $('.dialog-submit')
  }

  get successMsgForBranchDeletion() {
    return $(`//*[contains(text(),'You successfully deleted')]`)
  }

  getCommitCode(index) {
    return $(`.build-row:nth-of-type(${index}) li:nth-of-type(3) .code`)
  }

  getBuildCurrentStatus(index) {
    return $(`.commit-list .build-row:nth-of-type(${index}) .dot`)
  }

  //BuildSuccess
  getSuccessMsg(index) {
    return $(`.commit-list .build-row:nth-of-type(${index}) .dot.success`)
  }

  getBuildStatus(index) {
    return $(`.commit-list .build-row:nth-of-type(${index}) .status`)
  }

  checkForBuildSuccess(index) {
    browser.refresh()
    this.loadingFinished.waitForExist()
    this.getBuildCurrentStatus(index).waitForVisible()
    expect(this.getBuildStatus(index).getText()).to.eql('SUCCESS')
  }

  get basicInfoComponentTitle() {
    return $('.basic-info-modal .title')
  }

  get basicInfoNameFieldTitle() {
    return $(`[data-test='name'] label`)
  }

  get basicInfoDescriptionFieldTitle() {
    return $(`[data-test='shortDescription'] label`)
  }

  get addDeploymentBtn() {
    return $('.dashboard-content .button.default')
  }

  get addDeploymentPopup() {
    return $('.dropdown-content.add-to-deployment.isShown')
  }

  get newDeploymentBtn() {
    return $('.dropdown-action-button')
  }

  get addToDeploymentInputName() {
    return $('.create-shortcut input')
  }

  get autoBuildSwitch() {
    return $('.autodeploy-builds .toggle-slider')
  }

  get autoBuildSwitchState() {
    return $('#isAutoBuild')
  }

  get createBtn() {
    return $('.create-shortcut .default.button')
  }

  addToDeployment() {
    this.addDeploymentBtn.waitForVisible()
    this.addDeploymentBtn.click()
    expect(this.addDeploymentBtn.isVisible()).to.eql(true)
    this.addDeploymentPopup.waitForVisible()
    expect(this.addDeploymentPopup.isVisible()).to.eql(true)
  }

  addToNewDeployment() {
    this.newDeploymentBtn.click()
    browser.pause(8000)
    this.addToDeploymentInputName.waitForVisible()
    this.addToDeploymentInputName.click()
    randomName = this.randomName()
    var depName = testData.kintoapp.validKintoAppName + randomName
    this.addToDeploymentInputName.setValue(depName)
    this.createBtn.click()
    this.loadingFinished.waitForExist()
    KintoBlockcreate.submitGlobal()
    this.loadingFinished.waitForExist()
    KintoBlockcreate.deploySuccessBtn()
    // browser.scroll(0,-1000)
    // browser.pause(100000)
  }

  autoDeploy() {
    this.autoBuildSwitch.waitForVisible()
    expect(this.autoBuildSwitch.isVisible()).to.eql(true)
    this.autoBuildSwitch.click()
    browser.pause(6000)
  }

  get githubBranchCreateBtn() {
    return $('.select-menu-new-item-form button')
  }

  get titleOfBranchPage() {
    return $('.app-header .app-header--heading')
  }

  //new features
  get recentBuildBlock() {
    return $('.field-input-wrapper.commit-list')
  }

  get copyVarBtn() {
    return $('.title-and-button .button.copy.dark.any-width')
  }

  //env parameters
  get envRequiredToggleText() {
    return $('.custom-params .toggle-content h6')
  }

  getenvParamErrorMessage(index) {
    return $(`[data-test="configParameters[${index}].key"] .error-message`)
  }

  getenvRequiredToggleState(index) {
    return $(`[data-test="configParameters[${index}].required"] input`)
  }

  getenvRequiredToggleBtn(index) {
    return $(`[data-test="configParameters[${index}].required"] .toggle-slider`)
  }

  getenvParamDeleteOption(index) {
    return $(`[data-test="kb-manage-params-${index}"] .icon.remove`)
  }

  getupdateEnvVarParam(index) {
    return $(`[data-test="configParameters[${index}].key"] input`)
  }

  getupdateEnvValueParam(index) {
    return $(`[data-test="configParameters[${index}].value"] input`)
  }

  get requiredToggle() {
    return $(`.form-body.custom-params .switch`)
  }

  //new locator 25 April 2019
  get protocolFieldIn() {
    return $(`.form-advanced .two-fields .react-select .react-select__control`)
  }

  get addToDeployText() {
    return $(
      `.dropdown.add-to-deployment .list-container .dropdown-scroll-container>h4`
    )
  }

  //April 29 2019
  get advancedOptionBlockOpen() {
    return $(`.form-wrapper.advanced-collapse-options.open`)
  }

  get versionFieldTitle() {
    return $(`.basic-info .two-fields div:nth-of-type(2) label`)
  }

  get basicInfoDisplayFieldTitle() {
    return $(`[data-test='displayName'] label`)
  }
}

export default new KintoBlockManage()
