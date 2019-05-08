import Page from './page'

class KintoBlockList extends Page {
  open(wsID) {
    super.open(`app/dashboard/${wsID}/kintoblocks/list`)
  }

  getCard(index) {
    return $(`[data-test='kb-card-id-${index}']`)
  }
  //29/3
  get listPageTitle() {
    return $('.page-title>h2')
  }

  get createNewKbBtn() {
    return $('.page-title a.button.default')
  }

  get kbCreateCard() {
    return $('.kintoblock-list a.kintoblock.create')
  }

  get kbCreateCardImg() {
    return $('.kintoblock-list a.kintoblock.create .text>img')
  }

  get kbCreateCardApplications() {
    return $('.kintoblock-list a.kintoblock.create .icons .application')
  }

  get kbCreateCardAddIcon() {
    return $('.kintoblock-list a.kintoblock.create .add-new .inner')
  }

  getKbCardImg(id) {
    return $(
      `.kintoblock-list [data-test='kb-card-id-${id}'] .top .left .large-letter`
    )
  }

  getKbCardName(id) {
    return $(`.kintoblock-list [data-test='kb-card-id-${id}'] .name-and-tag>h3`)
  }

  get myKintoBlocksList() {
    return $('div.my-kintoblocks')
  }

  getKbBranchNameFromCard(id) {
    return $(`[data-test='kb-card-id-${id}'] .right>h4`)
  }

  getRemainingDependenciesCount(id) {
    return $(`[data-test=kb-card-id-${id}] .applications .dependency.number`)
  }

  getkbListDropDown(id) {
    return $(`#id-${id}.dropdown .dropdown-button.menu`)
  }

  getEditBranchOption(id) {
    return $(`#id-${id} .dropdown-scroll-container>button:nth-child(1)`)
  }

  getBranchNameFromKbCardDropDown(id) {
    return $(`#id-${id} .dropdown-scroll-container>button:nth-child(1) .faded`)
  }

  getViewAllBranchesAndTagsOption(id) {
    return $(`#id-${id} .dropdown-scroll-container>button:nth-child(2)`)
  }

  getViewEndpointsOption(id) {
    return $(`#id-${id} .dropdown-scroll-container>button:nth-child(3)`)
  }

  getDependenciesDropDown(id) {
    return $(`#idd-${id} .dropdown-scroll-container`)
  }

  getDependenciesDropDownTitle(id) {
    return $(`#idd-${id} .dropdown-scroll-container h4`)
  }

  getStackedDependenciesFromKbCard(id, index) {
    return $(
      `[data-test=kb-card-id-${id}] .applications .dependency.kintoblock-dep:nth-child(${index})`
    )
  }

  get viewEndpointsTitle() {
    return $('.endpoint-title>h3')
  }

  getBranchListFromKbDropDown(id) {
    return $(
      `[data-test='kb-card-id-${id}'] .dropdown-tabs [data-test='branch-tab']`
    )
  }

  getTagsListFromKbDropDown(id) {
    return $(
      `[data-test='kb-card-id-${id}'] .dropdown-tabs [data-test='tag-tab']`
    )
  }

  getBranchFromBranchList(id, index) {
    return $(
      `[data-test='kb-card-id-${id}'] [data-test='tag-list']>button:nth-child(${index}) .tag-name`
    )
  }

  getTagFromTagsList(id, index) {
    return $(
      `[data-test='kb-card-id-${id}'] [data-test='tag-list']>button:nth-child(${index}) .tag-name`
    )
  }

  getTagVersionFromTagList(id, index) {
    return $(
      `[data-test='kb-card-id-${id}'] [data-test='tag-list']>button:nth-child(${index}) .tag-and-commit>div:nth-child(1) .tag-name`
    )
  }

  getTagTimeAndDateFromTagList(id, index) {
    return $(
      `[data-test='kb-card-id-${id}'] [data-test='tag-list']>button:nth-child(${index}) .tag-date`
    )
  }

  getTagNotesFromTagList(id, index) {
    return $(
      `[data-test='kb-card-id-${id}'] [data-test='tag-list']>button:nth-child(${index}) .notes`
    )
  }

  get kbListDropDown() {
    return $('div.dropdown-content.isShown')
  }

  getViewAllBranchesAndTagSearchBar(id) {
    return $(
      `[data-test='kb-card-id-${id}'] .dropdown-content-filter.tags-and-branches>input`
    )
  }

  get branchesAndTagsDropDownVisible() {
    return $('.dropdown-content.tag-branch.isShown')
  }

  get kintoBlockListFromBreadcrumb() {
    return $('.breadcrumbs .unstyled-list li:nth-of-type(1) > span')
  }

  getBranchAndTagSwitcher(id, index) {
    return $(`[data-test="kb-card-id-${id}"] [data-test="${index}-tab"]`)
  }

  getTagFromBranchAndTagSwitcher(id, tab, index) {
    return $(
      `[data-test="kb-card-id-${id}"] [data-test='${tab}-list'] > button:nth-of-type(${index}) .tag-name`
    )
  }

  get branchAndTagSwitcher() {
    return $('.dropdown-content.tag-branch.isShown')
  }

  get kbSearchBar() {
    return $('.page-title-options input')
  }

  getKbCardWebsiteType(index) {
    return $(`[data-test='kb-card-id-${index}'] .right .type-icon.website`)
  }

  getKbCardMicroserviceType(index) {
    return $(`[data-test='kb-card-id-${index}'] .right .type-icon.microservice`)
  }

  getFilteredKB(KBName) {
    return $(`[data-test-block-name='${KBName}']`)
  }

  get noOptionsText() {
    return $('.react-select__menu-notice--no-options')
  }

  get kbSearchDropDownList() {
    return $('.react-select__menu-list')
  }

  get kbSearchBarFocused() {
    return $('.react-select__control--is-focused')
  }

  getCommitCodeFromKBDropDown(id, index) {
    return $(
      `[data-test='kb-card-id-${id}'] [data-test='tag-list']>button:nth-child(${index}) .tag-commit .uppercase`
    )
  }
}

export default new KintoBlockList()
