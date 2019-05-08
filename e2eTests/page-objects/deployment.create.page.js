import Page from './page'
import DeploymentManage from '../page-objects/deployment.manage.page'
import testData from '../constants/testdata.json'
import { getInput, getDataTest } from '../helpers/elementSelector'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import EnvironmentCreate from '../page-objects/environment.create.page'
var randomName
var currentDate = new Date()

class DeploymentCreate extends Page {
  open(wsID) {
    super.open(`app/dashboard/${wsID}/deployments/create`)
  }

  get form() {
    return getDataTest('ka-form')
  }

  get name() {
    return getInput('name')
  }

  get shortDescription() {
    return getInput('shortDescription', 'textarea')
  }

  get whatisanApp() {
    return $('.what-is-a-kintoapp .text')
  }

  get whatisanAppDescp() {
    return $('.what-is-a-kintoapp .text .body-copy')
  }

  get switchValueForWS() {
    return $('#public')
  }

  get switchTogglerBtn() {
    return $('span.toggle-slider')
  }

  get errorMsg() {
    return $('.error-message')
  }

  get wsEditorButton() {
    return $('.workspace-toolbar .avatar.small.edit.hide-text')
  }

  get kbdropDown() {
    return $('.react-select__control input')
  }

  get createKintoAppTitle() {
    return $('.create-kintoapp > h2')
  }

  getFilteredKB(KBName) {
    return $(`[data-test-block-name='${KBName}']`)
  }

  //21/3
  get membersToolBar() {
    return $('.kintoapp-create.form-container .workspace-toolbar')
  }

  get basicInfoComponent() {
    return $('.kintoapp-create.form-container .form-wrapper.basic-info')
  }

  get dependenciesComponent() {
    return $(
      '.kintoapp-create.form-container .form-body.simple.dependency-management'
    )
  }

  get kaCreateNewApplicationBtnDisabled() {
    return $('button.button.secondary.disabled')
  }

  get basicInfoComponentTitle() {
    return $('.form-wrapper.basic-info>h3')
  }

  get basicInfoComponentSubtitle() {
    return $('.form-wrapper.basic-info>h5')
  }

  get basicInfoComponentNameFieldTitle() {
    return $(`[data-test='name'] label`)
  }

  get basicInfoComponentDescriptionFieldTitle() {
    return $(`[data-test='shortDescription'] label`)
  }

  get kaDescriptionTextArea() {
    return $('textarea#shortDescription')
  }

  get ownerTextFromMembersBar() {
    return $('.user-section>h5')
  }

  get depConfigureBtnDisabled() {
    return $('.button.secondary.disabled.button-icon')
  }

  createKaAndDeploy(KbName, ws) {
    this.open(ws)
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    randomName = this.randomName()
    var kaName = testData.kintoapp.validKANamewithDot + randomName + 'c'
    this.name.input.setValue(kaName)
    this.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    this.kbdropDown.scroll()
    this.kbdropDown.setValue(KbName)
    this.getFilteredKB(KbName).waitForVisible()
    browser.keys('Enter')
    this.loadingFinished.waitForExist()
    this.submitGlobal()
    this.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.deploySuccessBtn()
  }

  get autoDeploySwitch() {
    return $('.autodeploy .toggle-slider')
  }

  get autoDeployIsOn() {
    return $('#autoUpdate')
  }

  getEnvCardTitle(index) {
    return $(
      `.sidebar-environment-inner .sidebar-card-container:nth-child(${index}) .caps.bold`
    )
  }

  getenvCardSelect(index) {
    return $(`.sidebar-card-container:nth-child(${index})`)
  }

  getenvCardLink(index) {
    return $(`.page-markers .page-section-link:nth-child(${index})`)
  }

  getkbSelect(index) {
    return $(
      `.react-select__value-container .react-select__input:nth-child(${index})`
    )
  }

  deploymentCreate(wsID, KBName) {
    this.open(wsID, KBName)
    this.loadingFinished.waitForExist()
    this.form.waitForVisible()
    randomName = this.randomName()
    var depName = testData.kintoapp.validKANamewithChars + randomName
    this.name.input.setValue(depName)
    this.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    this.kbdropDown.scroll()
    this.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    this.loadingFinished.waitForExist()
    this.submitGlobal()
    this.loadingFinished.waitForExist()
    KintoBlockCreate.deploySuccessBtn()
    this.loadingFinished.waitForExist()
  }

  checkforDepSuccess() {
    DeploymentManage.checkforDeploymentSuccess()
    browser.refresh()
    this.loadingFinished.waitForExist()
  }

  checkForLinks(index) {
    browser.refresh()
    this.getenvCardLink(index).click()
    this.loadingFinished.waitForExist()
    this.loadingFinished.waitForVisible()
  }

  envCreate() {
    DeploymentManage.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    var envName =
      testData.Environment.allValidEnvChar + '4' + currentDate.getTime() + 'y'
    EnvironmentCreate.envNameField.setValue(envName)
    EnvironmentCreate.addNewEnvBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
  }

  envCard(index) {
    this.getEnvCardTitle(index)
    this.getenvCardSelect(index).click()
    browser.scroll(0, 800)
    this.kbdropDown.scroll()
    this.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    this.loadingFinished.waitForExist()
    this.submitGlobal()
    this.loadingFinished.waitForExist()
    KintoBlockCreate.deploySuccessBtn()
    this.loadingFinished.waitForExist()
  }

  getDependenciesCards(index) {
    return $(`.blocks-or-services .block:nth-of-type(${index})`)
  }

  getwebsiteopen(index) {
    return $(`.website .website-input .button.secondary:nth-child(${index})`)
  }
}

export default new DeploymentCreate()
