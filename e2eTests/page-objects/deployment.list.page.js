import Page from './page'

class DeploymentList extends Page {
  open(wsID) {
    super.open(`app/dashboard/${wsID}/deployments/list`)
  }

  getCard(index) {
    return $(`[data-test='ka-card-id-${index}']`)
  }

  get myDeploymentList() {
    return $('.my-kintoapps')
  }

  getkaListDropDown(id) {
    return $(`#id-${id}.dropdown .dropdown-button.menu`)
  }

  getKaAppListViewEnv(id) {
    return $(`#id-${id} .dropdown-scroll-container > button:nth-child(4)`)
  }

  get kaListDropDown() {
    return $('.dropdown .dropdown-content.isShown')
  }

  getKaListDropDownViewTags(id) {
    return $(
      `#id-${id} .dropdown-content.isShown .dropdown-scroll-container>button:nth-child(2)`
    )
  }

  getEnvTagNameFromKaListDropDown(index) {
    return $(
      `[data-test="ka-card-id-${index}"] .dropdown-scroll-container .kinto-app-tag .tag-name-and-environments>div:nth-of-type(2)`
    )
  }

  getEnvNameFromKaCardList(id, index) {
    return $(
      `[data-test =ka-card-id-${id}] .right .env-item:nth-child(${index}) .env-item-tag >div`
    )
  }

  get envTagsInKaListPage() {
    return $('.dropdown.dropdown-filter.menu-hidden .dropdown-content.isShown')
  }
  get kaPageTitle() {
    return $('.my-kintoapps .page-title>h2')
  }

  get kaCreateBtnInKaListPage() {
    return $('.page-title a.button.default')
  }

  getKaNameFromKaCard(id) {
    return $(`[data-test=ka-card-id-${id}] .name-and-tag>h3`)
  }

  get kaCreateCradImg() {
    return $('.kintoapp-list .kintoapp.create img')
  }

  get kaCreateCardText() {
    return $('.kintoapp-list .kintoapp.create h3')
  }

  get kaCreateCardIconSection() {
    return $(
      //'.kintoapp-list .kintoapp.create .icons .dependency.kintoblock-dep'
      '.kintoapp-list .kintoapp.create .icons .dependency.application'
    )
  }

  get kaCreateCardPlusIcon() {
    return $('.kintoapp-list .kintoapp.create .add-new .inner')
  }

  getExistingKaCardImg(id) {
    return $(
      `.kintoapp-list [data-test=ka-card-id-${id}] .top .left .large-letter`
    )
  }

  //16/3
  getStackedDependenciesFromKACard(id, index) {
    return $(
      `[data-test=ka-card-id-${id}] .applications .dependency:nth-child(${index})`
    )
  }

  getRemainingDependenciesCount(id) {
    return $(`[data-test=ka-card-id-${id}] .applications .dependency.number`)
  }

  getDependenciesDropDown(id) {
    return $(`#idd-${id} .dropdown-scroll-container`)
  }

  getDependenciesDropDownTitle(id) {
    return $(`#idd-${id} .dropdown-scroll-container h4`)
  }

  getEditDraftFromDropDown(id) {
    return $(
      `#id-${id} .dropdown-content.isShown .dropdown-scroll-container>button:nth-child(1)`
    )
  }

  getCompareVersionsFromDropDown(id) {
    return $(
      `#id-${id} .dropdown-content.isShown .dropdown-scroll-container>button:nth-child(3)`
    )
  }

  getEditDraftIcon(id) {
    return $(
      `#id-${id} .dropdown-content.isShown .dropdown-scroll-container>button:nth-child(1)>div`
    )
  }

  //17/3
  getSearchFieldFromKaDropDown(id) {
    return $(`#idv-${id} .dropdown-content-filter .dropdown-filter-input`)
  }

  getDraftFromViewTags(id) {
    return $(
      `#idv-${id} .dropdown-content-items.dropdown-content-items-scroll .kinto-app-tag.draft .tag-item-text`
    )
  }

  getDraftIconFromViewTags(id) {
    return $(
      `#idv-${id} .dropdown-content-items.dropdown-content-items-scroll .kinto-app-tag.draft .draft-icon`
    )
  }

  getTaggedVersionNumberFromKaDropDown(id, index) {
    return $(
      `#idv-${id} .dropdown-scroll-container > button:nth-child(${index}) > .kinto-app-tag > .tag-name-and-environments .tag-item-text`
    )
  }

  get applicationsDisabledInBreadcrumb() {
    return $('.breadcrumbs .unstyled-list>li:nth-child(1) .disabled')
  }
}

export default new DeploymentList()
