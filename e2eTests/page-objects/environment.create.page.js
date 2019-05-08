import Page from './page'

class EnvironmentCreate extends Page {
  get addEnvPopUpTitle() {
    return $('.add-new-environment .kh-modal-title')
  }

  get addEnvNameFieldTitle() {
    return $('.label-characters>label')
  }

  get envNameField() {
    return $('#name')
  }

  get errorMessage() {
    return $("[data-test= 'name' ] .error-message")
  }

  get addEnvCancelBtn() {
    return $('.kh-modal-actions button.secondary')
  }

  get addNewEnvBtn() {
    return $('.kh-modal-actions button.dark')
  }

  get addEnvPopUp() {
    return $('.add-new-environment .kh-modal-body')
  }
}

export default new EnvironmentCreate()
