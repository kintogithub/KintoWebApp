import Page from './page'

class ServicesPage extends Page {
  open(wsID) {
    super.open(`app/dashboard/${wsID}/services`)
  }

  get serviceSection() {
    return $('.kintoblock-service')
  }

  get title() {
    return $('.breadcrumbs li span')
  }

  get subTitle() {
    return $('.kintoblock-service h2')
  }

  getServiceCards(index) {
    return $(`.cards>div:nth-of-type(${index})`)
  }

  get addIconForMongoService() {
    return $('.cards>div:nth-of-type(1) .corner.plus .icon')
  }

  get tickIconForMongoService() {
    return $('.cards>div:nth-of-type(1) .corner.check .icon')
  }

  get mongoDBMainIcon() {
    return $('.cards>div:nth-of-type(1) .main-service-icon.MONGODB')
  }

  get messagePassingMainIcon() {
    return $('.cards>div:nth-of-type(2) .main-service-icon.MESSAGEPASSING')
  }

  get sharedMemoryMainIcon() {
    return $('.cards>div:nth-of-type(3) .main-service-icon.SHAREDMEMORY')
  }

  getServiceCardTitle(index) {
    return $(`.cards>div:nth-of-type(${index}) h4`)
  }

  getServiceCardSubtitle(index) {
    return $(`.cards>div:nth-of-type(${index}) h5`)
  }

  getAddBtnInServiceCard(index) {
    return $(`.cards>div:nth-of-type(${index}) .fake-button .button`)
  }

  get viewDetailsButton() {
    return $('.cards>div:nth-of-type(1) .fake-button .button')
  }

  getServiceCardFooter(index, behaviour) {
    return $(
      `.cards > div:nth-of-type(${index}) .service-card .bottom.${behaviour}`
    )
  }

  get enableAndDisableMongoDBBtn() {
    return $('.action-area > button')
  }

  getServiceCardsComingText(index) {
    return $(`.cards>div:nth-of-type(${index}) .coming h6`)
  }

  get mongoDBInformativeText() {
    return $('.extended-information.MONGODB .information-area')
  }

  getToggleSwitchOfServicesInKB(service) {
    return $(`[data-test="${service}"] .toggle-slider`)
  }

  getToggleMessageOfServicesCards(index) {
    return $(`.cards > div:nth-of-type(${index}) .toggle-message`)
  }
}

export default new ServicesPage()
