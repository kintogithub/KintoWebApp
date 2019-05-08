import { expect } from 'chai'
import Login from '../page-objects/login.page'
import DeploymentList from '../page-objects/deployment.list.page'
import DeploymentCreate from '../page-objects/deployment.create.page'
import DeploymentManage from '../page-objects/deployment.manage.page'
import EnvironmentManage from '../page-objects/environment.manage.page'
import EnvironmentList from '../page-objects/environment.list.page'
import WorkspaceCreate from '../page-objects/workspace.create.page'
import WorkspaceManage from '../page-objects/workspace.manage.page'
import EnvironmentCreate from '../page-objects/environment.create.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import Landing from '../page-objects/landing.page'
import testData from '../constants/testdata.json'
import {
  getToken,
  callExampleHelloWorld,
  callUserKB
} from '../helpers/apiHelpers'

var kaName
var envOne
var envTwo
var branchOrTagOfDep
var randomName
var kbOneName
var message
var clientId
var currentDate = new Date()

describe('Environment Create/Edit page ', () => {
  it('should navigate user to `edit` page of environment, when user click on `edit` button of concerned environment', () => {
    Login.registerAndLogin('ENV')
    WorkspaceManage.linkGithub()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    kaName = testData.kintoapp.validKAEnv + '4' + currentDate.getTime() + 'f'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.kbdropDown.scroll()
    browser.pause(2000)
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEditEnv(1).click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
  })

  it('should navigate to `edit` page of any environment, when user enters url of edit page of any environment in the browser', () => {
    var url = EnvironmentManage.getUrl().split('/')
    var ws = url[3]
    var kintoAppId = url[5]
    var envId = url[7]
    var envName = EnvironmentManage.envTitle.getText()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    var frontEndURL = EnvironmentList.TEST_ENV
    browser.url(
      `${frontEndURL}/app/dashboard/${ws}/deployments/${kintoAppId}/environment/${envId}/edit`
    )
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    expect(EnvironmentManage.form.isVisible()).to.equal(true)
    EnvironmentManage.envTitle.waitForVisible()
    expect(EnvironmentManage.getUrl()).to.eql(
      `/app/dashboard/${ws}/deployments/${kintoAppId}/environment/${envId}/edit`
    )
    expect(envName).to.eql(EnvironmentManage.envTitle.getText())
  })

  it('should display Add Environment Title and name field is displayed in `Add new environment` pop up, when user click on `add new environment` button on top right of environment list page', () => {
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.addEnv.click()
    expect(EnvironmentCreate.addEnvPopUp.isVisible()).to.eql(true)
    expect(EnvironmentCreate.addEnvPopUpTitle.getText()).to.eql(
      'Add New Environment'
    )
    expect(EnvironmentCreate.addEnvNameFieldTitle.getText()).to.eql(
      'ENVIRONMENT NAME'
    )
    expect(EnvironmentCreate.envNameField.isVisible()).to.eql(true)
    var placeHolderText = EnvironmentCreate.envNameField.getAttribute(
      'placeholder'
    )
    expect(placeHolderText).to.eql('Enter a name for your environment')
    expect(EnvironmentCreate.addEnvCancelBtn.isVisible()).to.eql(true)
    expect(EnvironmentCreate.addNewEnvBtn.isVisible()).to.eql(true)
    EnvironmentCreate.addEnvCancelBtn.click()
    EnvironmentList.addEnv.waitForVisible()
  })

  it('should navigate user to edit page of environment, when user is on Env List page and click on `Edit` button through "..." dropdown next to Deploy button', () => {
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentList.getEditOptionInCardDropDown(0).waitForVisible()
    EnvironmentList.getEditOptionInCardDropDown(0).click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
  })

  it('should display `save changes` button as disabled, when user navigates to edit page of environment', () => {
    expect(EnvironmentManage.submitBtn.isEnabled()).to.eql(false)
  })

  it('should display title, subtitle, body, environment name input field and Non-editable text fields for Client ID and Secret Key, when user is in `edit` page of environment', () => {
    EnvironmentManage.envTitle.waitForVisible()
    expect(EnvironmentManage.envTitle.isVisible()).to.eql(true)
    expect(EnvironmentManage.envSubtitle.getText()).to.eql('Basic Info')
    expect(EnvironmentManage.envBody.getText()).to.eql(
      'Set up the name and get the client ID and Secret Key for this environment.'
    )
    expect(EnvironmentManage.name.input.isVisible()).to.eql(true)
    expect(EnvironmentManage.clientIdFieldColumn.isVisible()).to.eql(true)
    expect(EnvironmentManage.clientIdFieldTitle.getText()).to.eql('CLIENT ID')
    expect(EnvironmentManage.secretKeyFieldColumn.isVisible()).to.eql(true)
    expect(EnvironmentManage.secretKeyFieldTitle.getText()).to.eql('SECRET KEY')
  })

  it('should verify unique client id and secret key fields are non-editable/disabled in `edit` page of environment', () => {
    expect(EnvironmentManage.clientIdField.isVisible()).to.eql(true)
    expect(EnvironmentManage.secretKeyField.isVisible()).to.eql(true)
  })

  it('should display validation error message, when user duplicates environment in same KA', () => {
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    envOne =
      testData.Environment.validEnvNameInAlphaNumeric +
      '1' +
      currentDate.getTime() +
      'e'
    EnvironmentCreate.envNameField.setValue(envOne)
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    EnvironmentCreate.envNameField.setValue(envOne)
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentCreate.errorMessage.waitForVisible()
    expect(EnvironmentCreate.errorMessage.getText()).to.eql(
      'Name already in use!'
    )
  })

  it('should navigate user to `edit` page of environment, when existing environment is clicked from the breadcrumb', () => {
    EnvironmentCreate.addEnvCancelBtn.click()
    EnvironmentManage.geteditEnvBtn(1).click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.breadcrumbEnv.click()
    EnvironmentManage.dropdownIsShownShort.waitForVisible()
    var envName1 = EnvironmentManage.getbreadCrumbEnvText(1).getText()
    var envName2 = EnvironmentManage.getbreadCrumbEnvText(2).getText()
    EnvironmentManage.getbreadCrumbEnv(1).click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    expect(EnvironmentManage.envTitle.getText()).to.eql(
      kaName + ' - ' + envName1
    )
    EnvironmentManage.breadcrumbEnv.click()
    EnvironmentManage.dropdownIsShownShort.waitForVisible()
    EnvironmentManage.getbreadCrumbEnv(2).click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    expect(EnvironmentManage.envTitle.getText()).to.eql(
      kaName + ' - ' + envName2
    )
  })

  it('should display `save changes` button as enabled, when user navigates to edit page of environment and make any changes', () => {
    EnvironmentManage.name.input.setValue(testData.Environment.allValidEnvChar)
    expect(EnvironmentManage.submitBtn.isEnabled()).to.eql(true)
  })

  it('should display validation error message, when environment name is less than 3 characters in `edit` page of environment', () => {
    EnvironmentManage.name.input.setValue(
      testData.Environment.invalidEnvThreeChar
    )
    browser.keys('Tab')
    EnvironmentManage.name.error.waitForVisible()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  it('should display validation error message, when environment name is more than 35 characters in `edit` page of environment', () => {
    EnvironmentManage.name.input.setValue(
      testData.Environment.invalidEnvThirtyFiveChar
    )
    EnvironmentManage.name.error.waitForVisible()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must be 24 characters or less'
    )
  })

  it('should display validation error message, when user enters environment name in combination of "Upper case" and special characters "hyphen" and "underscore"', () => {
    EnvironmentManage.name.input.setValue(
      testData.Environment.invalidEnvwithSpecialAndUpperCaseChar
    )
    EnvironmentManage.name.error.waitForVisible()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must contain only lowercase characters and digits'
    )
  })

  it('should not display validation error message, when valid characters are used in `edit page of environment', () => {
    EnvironmentManage.name.input.setValue(testData.Environment.allValidEnvChar)
    expect(EnvironmentManage.name.error.isVisible()).to.eql(false)
  })

  it('should do validation on first submission, when user enters invalid characters in environment name field and click save changes in `edit` page of environment', () => {
    EnvironmentManage.name.input.setValue(
      testData.Environment.invalidEnvThreeChar
    )
    EnvironmentManage.submitGlobal()
    EnvironmentManage.name.error.waitForVisible()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )

    EnvironmentManage.name.input.setValue(testData.Environment.allValidEnvChar)
    expect(EnvironmentManage.name.error.isVisible()).to.eql(false)

    EnvironmentManage.name.input.setValue(
      testData.Environment.invalidEnvThirtyFiveChar
    )
    EnvironmentManage.submitGlobal()
    EnvironmentManage.name.error.waitForVisible()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must be 24 characters or less'
    )

    EnvironmentManage.name.input.setValue(
      testData.Environment.invalidEnvCapitals
    )
    EnvironmentManage.submitGlobal()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must contain only lowercase characters and digits'
    )

    EnvironmentManage.name.input.setValue(testData.Environment.invalidENvChar)
    EnvironmentManage.submitGlobal()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must contain only lowercase characters and digits'
    )

    EnvironmentManage.name.input.setValue(envOne)
    expect(EnvironmentManage.name.error.isVisible()).to.eql(false)
    EnvironmentManage.submitGlobal()
    EnvironmentManage.loadingFinished.waitForExist()
  })

  it('should display `save changes` button as disabled, when user edits any fields in page and save the changes', () => {
    expect(EnvironmentManage.envSaveBtn.isVisible()).to.eql(true)
    envOne =
      testData.Environment.allValidEnvChar + '1' + currentDate.getTime() + 'p'
    EnvironmentManage.name.input.setValue(envOne)
    expect(EnvironmentManage.submitBtn.isEnabled()).to.eql(true)
    EnvironmentManage.submitGlobal()
    EnvironmentManage.loadingFinished.waitForExist()
    expect(EnvironmentManage.submitBtn.isEnabled()).to.eql(false)
  })

  it('should reflect environment changes made in `edit` page of environment, where ever environment is displayed', () => {
    envOne =
      testData.Environment.allValidEnvChar + '67' + currentDate.getTime() + 'x'
    EnvironmentManage.name.input.setValue(envOne)
    EnvironmentManage.submitGlobal()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envTitle.waitForVisible()
    var fullTitle = EnvironmentManage.envTitle.getText().split(' - ')
    var envName = fullTitle[1]
    expect(EnvironmentManage.envTitle.isVisible()).to.eql(true)
    //Env edit page title
    expect(envName).to.eql(envOne)
    //Env input field
    expect(EnvironmentManage.nameField.getValue()).to.eql(envOne)
    //Env manage page bradcrumb
    expect(EnvironmentManage.envNameFromBreadcrumb.getText()).to.eql(envOne)
    //env switcher drop down
    EnvironmentManage.breadcrumbEnv.click()
    EnvironmentManage.breadcrumbEnvDropDown.waitForVisible()
    expect(EnvironmentManage.getbreadCrumbEnvText(2).getText()).to.eql(envOne)
    //Env list page
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentManage.envList.waitForVisible()
    expect(EnvironmentList.getEnvCardTitle(2).getText()).to.eql(envOne)
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.tagNDeployDropDownField.waitForVisible()
    DeploymentManage.tagNDeployDropDownField.selectByIndex(1)
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.minorVersion.setValue('1')
    DeploymentManage.revision.setValue('3')
    DeploymentManage.notes.click()
    DeploymentManage.createTagBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getkaListDropDown(0).waitForVisible()
    //KA card top right corner
    expect(
      DeploymentList.getEnvNameFromKaCardList(0, 1)
        .getText()
        .toLowerCase()
    ).to.eql(envOne)
    //KA tag and deploy pop up
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.tagNDeployDropDownField.waitForVisible()
    expect(DeploymentManage.getTagNDeployDropDown(2).getText()).to.eql(envOne)
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getkaListDropDown(0).waitForVisible()
    //KA card drop down
    DeploymentList.getkaListDropDown(0).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getKaListDropDownViewTags(0).click()
    DeploymentList.envTagsInKaListPage.waitForVisible()
    DeploymentList.getEnvTagNameFromKaListDropDown(0).waitForVisible()
    expect(DeploymentList.getEnvTagNameFromKaListDropDown(0).getText()).to.eql(
      envOne
    )
  })
})

describe('Environment - Environment List Page Overall', () => {
  it('should display environments in list as per the applications they are created for, regardless of whether they currently have a version deployed in them or not', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    kaName =
      testData.kintoapp.validKintoAppNameDigit +
      '9' +
      currentDate.getTime() +
      'i'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    browser.pause(5000)
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.envNameField.waitForVisible()
    envOne =
      testData.Environment.allValidEnvChar + '2' + currentDate.getTime() + 'n'
    EnvironmentCreate.envNameField.setValue(envOne)
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.envNameField.waitForVisible()
    envTwo =
      testData.Environment.validEnvNameWithNumbers +
      '3' +
      currentDate.getTime() +
      'v'
    EnvironmentCreate.envNameField.setValue(envTwo)
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    expect(EnvironmentList.kaFromEnvListBreadcrumb.getText()).to.eql(kaName)
    expect(EnvironmentList.getEnvCardTitle(2).getText()).to.eql(envOne)
    expect(EnvironmentList.getEnvCardTitle(3).getText()).to.eql(envTwo)
  })

  it('should navigate user to `environment list` page, when user clicks on `view environments` from `...` dropdown option of existing KA list card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getkaListDropDown(1).waitForVisible()
    DeploymentList.getkaListDropDown(1).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getKaAppListViewEnv(1).click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  it('should navigate user to `environment list` page, when user click on `view environments` button on top right of the KA manage page', () => {
    EnvironmentList.kaFromEnvListBreadcrumb.waitForVisible()
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.viewEnvironments.click()
    DeploymentManage.loadingFinished.waitForExist()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  it('should display expand button on any environment cards only if they have a build deployed and some steps to display', () => {
    EnvironmentList.kaFromEnvListBreadcrumb.waitForVisible()
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.minorVersion.setValue('2')
    DeploymentManage.revision.setValue('4')
    DeploymentManage.notes.click()
    DeploymentManage.notes.setValue(testData.kintoapp.validTagNotes)
    DeploymentManage.createTagBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.getEnvCardDeploySuccess(1).waitForVisible()
    expect(EnvironmentList.getEnvCardDeploySuccess(1).isVisible()).to.eql(true)
    expect(EnvironmentList.getEnvCardExpandText(1).getText()).to.eql('Expand')
  })

  it('should not display `expand` button for any environment card, if there is no deployment is done for environment', () => {
    expect(EnvironmentList.getEnvCardDeploySuccess(2).isVisible()).to.eql(false)
    expect(EnvironmentList.getEnvCardExpandText(2).isVisible()).to.eql(false)
  })

  it('should navigate user to `environment list` page, when user click on `Environments` from `breadcrumb` in edit page of environment', () => {
    EnvironmentManage.geteditEnvBtn(1).waitForVisible()
    EnvironmentManage.geteditEnvBtn(1).click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  it('should navigate to "environment list" page, when user enters the url of the page', () => {
    var url = browser.getUrl()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    expect(DeploymentList.myDeploymentList.isVisible()).to.eql(true)
    browser.url(url)
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  it('should display title, subtitle and `add new environment` button in environment list page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getkaListDropDown(1).waitForVisible()
    DeploymentList.getkaListDropDown(1).click()
    DeploymentList.kaListDropDown.waitForVisible()
    DeploymentList.getKaAppListViewEnv(1).click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    expect(EnvironmentCreate.addEnvPopUpTitle.getText()).to.eql(
      'Add New Environment'
    )
    expect(EnvironmentCreate.addEnvNameFieldTitle.getText()).to.eql(
      'ENVIRONMENT NAME'
    )
    expect(EnvironmentCreate.envNameField.isVisible()).to.eql(true)
    var PH = EnvironmentCreate.envNameField.getAttribute('placeholder')
    expect(PH).to.eql('Enter a name for your environment')
    expect(EnvironmentCreate.addEnvCancelBtn.isVisible()).to.eql(true)
    expect(EnvironmentCreate.addNewEnvBtn.isVisible()).to.eql(true)
    EnvironmentCreate.addEnvCancelBtn.click()
  })

  it('should change `expand` to `collapse` button, when user clicks on `expand` button to view deployments', () => {
    expect(EnvironmentList.getEnvCardExpandText(1).getText()).to.eql('Expand')
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getEnvCardExpandText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardExpandText(1).getText()).to.eql('Collapse')
  })

  it.skip('should display clickable text links for `change log` and `view logs` pages, when user clicks on expand button for environment card', () => {
    expect(EnvironmentList.envCardCompareVersions.getText()).to.eql(
      'Compare Versions'
    )
    expect(EnvironmentList.envCardViewLogs.getText()).to.eql('View Logs')
  })

  it('should navigate user to `environment list` page, when user click on `Environments` from `breadcrumb` in view logs page of environment', () => {
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envListFromViewLogs.waitForVisible()
    EnvironmentList.envListFromViewLogs.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })
})

describe('Environment - Environment List Cards', () => {
  it('should display environment title of environment card as per environment created', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    envOne =
      testData.Environment.validEnvNameInAlphaNumeric +
      '3' +
      currentDate.getTime() +
      'i'
    EnvironmentCreate.envNameField.setValue(envOne)
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.getEnvCardTitle(4).waitForVisible()
    expect(EnvironmentList.getEnvCardTitle(4).getText()).to.eql(envOne)
  })

  it('should match the title of environment card with title in `edit` page of concerned environment, when user navigates to `edit` page of environment', () => {
    var envCardTitle = EnvironmentList.getEnvCardTitle(1).getText()
    kaName = EnvironmentList.kaFromEnvListBreadcrumb.getText()
    EnvironmentList.getEditEnv(1).click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envTitle.waitForVisible()
    expect(kaName + ' - ' + envCardTitle).to.eql(
      EnvironmentManage.envTitle.getText()
    )
  })

  it('should display title of environment card regardless whether it is in collapsed/expanded state', () => {
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    //Collapsed state
    expect(EnvironmentList.getEnvCardExpandText(1).getText()).to.eql('Expand')
    expect(EnvironmentList.getEnvCardTitle(1).isVisible()).to.eql(true)
    //Expanding card
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getEnvCardCollapseText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardCollapseText(1).getText()).to.eql(
      'Collapse'
    )
    expect(EnvironmentList.getEnvCardTitle(1).isVisible()).to.eql(true)
  })

  it('should display status(success) and current version number of any environment, when environment build is deployed regardless of environment card is in collasped/expanded state', () => {
    //Already in expanded state
    var deployVer = EnvironmentList.getenvCardVerNumber(1).getText()
    EnvironmentList.getEnvCardDeploySuccess(1).waitForVisible()
    expect(EnvironmentList.getEnvCardDeploySuccess(1).getText()).to.eql(
      'SUCCESS'
    )
    expect(EnvironmentList.getenvCardVerNumber(1).getText()).to.eql(deployVer)
    // Collapsing the card
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getEnvCardDeploySuccess(1).waitForVisible()
    expect(EnvironmentList.getEnvCardDeploySuccess(1).getText()).to.eql(
      'SUCCESS'
    )
    expect(EnvironmentList.getenvCardVerNumber(1).getText()).to.eql(deployVer)
  })

  it('should display status(No build Deployed) for any environment if there is no deployment is done', () => {
    EnvironmentList.getEnvNoDeployText(2).waitForVisible()
    expect(EnvironmentList.getEnvNoDeployText(2).getText()).to.eql(
      'No build deployed.'
    )
  })

  it('should display `Hit the deploy button to choose a build` text in environment card if there is no deployment is done, whether environment card is in collasped/expanded state', () => {
    expect(EnvironmentList.getEnvNoDeploySubText(2).getText()).to.eql(
      'Hit the deploy button to choose a build.'
    )
  })

  it('should display `edit` button for any environment card, whether environment card is in collasped/expanded state', () => {
    //Collapsed state
    EnvironmentList.getEnvCardExpandText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardExpandText(1).getText()).to.eql('Expand')
    expect(EnvironmentList.getEditEnv(1).getText()).to.eql('Edit')
    //Expanding the card
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getEnvCardCollapseText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardCollapseText(1).getText()).to.eql(
      'Collapse'
    )
    expect(EnvironmentList.getEditEnv(1).getText()).to.eql('Edit')
  })

  it('should display `deploy` button for any environment card if there is no deployment done', () => {
    expect(EnvironmentList.getEnvCardDeployBtn(2).getText()).to.eql('Deploy')
  })

  it('should display `deploy Another version` button for any environment card if there is deployment done', () => {
    expect(EnvironmentList.getEnvCardDeployBtn(1).getText()).to.eql(
      'Deploy Another Version'
    )
  })

  //  it('should display `cancel deployment` button in environment card if deployment is in progress, when environment is in collapsed/expanded state', () => {
  //    // TODO cancel deployment is not visible as deployment happens in a blink
  //  })

  it('should display Shut Down and Edit Environment buttons clicking on (...) drop down button in any environment card, when environment card is in collapsed/expanded state', () => {
    // Collapsing the card
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getEnvCardExpandText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardExpandText(1).getText()).to.eql('Expand')
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    expect(EnvironmentList.getenvCardShutDownBtn(0).isVisible()).to.eql(true)
    expect(EnvironmentList.getEditOptionInCardDropDown(0).isVisible()).to.eql(
      true
    )
    // Expanding the card
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getEnvCardCollapseText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardCollapseText(1).getText()).to.eql(
      'Collapse'
    )
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    expect(EnvironmentList.getenvCardShutDownBtn(0).isVisible()).to.eql(true)
    expect(EnvironmentList.getEditOptionInCardDropDown(0).isVisible()).to.eql(
      true
    )
  })
  //
  //  /*it('should display date of current deployment of any environment if deployment is made, regardless whether environment card is in collapse/expand state', () => {
  //    // TODO
  //  })
  //
  //  it('should not change date of previous deployments, when new deployment is done for any environment', () => {
  //    // TODO
  //  })
  //
  //  it('should display shutdown status for any environment if build is been shutdown, whether environment card is in collapsed/expanded state', () => {
  //    // TODO Not implemented
  //  })
  //
  //  it('should display different states and time of deployment steps of current as well as past deployments in anti-chronlogical way, when environment card is expanded', () => {
  //    // TODO
  //  })
  //*/
  it('should display deploying, success, failed and testing according to deployment progress of any environment card', () => {
    //Already in Expanded state
    //EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getEnvCardDeploySuccess(1).waitForVisible()
    expect(EnvironmentList.getEnvCardDeploySuccess(1).getText()).to.eql(
      'SUCCESS'
    )

    expect(EnvironmentList.getIntermediateDeployProgress(1).getText()).to.eql(
      'DEPLOYING'
    )
    //For now status failed and testing not implemented
  })

  //  it('should display final state of deployment in solid color and intermediate deploying progress states in border color', () => {
  //    //  TODO
  //  })

  it.skip('should display `compare version` link for any deployment version of any environment card, when environment card is in expanded state', () => {
    expect(EnvironmentList.envCardCompareVersions.getText()).to.eql(
      'Compare versions'
    )
  })

  it('should display `View Requests` link for any deployment version of any environment card, when environment card is in expanded state', () => {
    expect(EnvironmentList.getEnvViewLogs(1, 1).getText()).to.eql(
      'View Requests'
    )
  })

  it('should display `rollback to this build` button for past successful deployment build of any environment, when environment card is in expanded state', () => {
    EnvironmentList.getEnvCardDeployAnotherVersion(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    EnvironmentList.selectDelpoyVer.selectByIndex(0)
    EnvironmentList.deployBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getExpandEnvDeploys(1).click()
    expect(EnvironmentList.envCardDeployRollbackBtn.getText()).to.eql(
      'Rollback to this build'
    )
  })

  //  //it('should display `roll back to this build` button as greyed out if deployment is failed for any environment, when environment card is expanded', () => {
  //  // TODO Not implemented
  //  //})

  it('should display `deploy pop up`, when `deploy` button in environment card is clicked  if no deployment is done', () => {
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    EnvironmentList.getenvCardShutDownBtn(0).click()
    EnvironmentList.envDeployShutDownPopUp.waitForVisible()
    EnvironmentList.shutDownAnywayBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEnvNoDeployText(2).waitForVisible()
    expect(EnvironmentList.getEnvNoDeployText(2).getText()).to.eql(
      'No build deployed.'
    )
    expect(EnvironmentList.getEnvCardDeployBtn(2).getText()).to.eql('Deploy')
    EnvironmentList.getEnvCardDeployBtn(2).click()
    EnvironmentList.deployPopUp.waitForVisible()
    expect(EnvironmentList.deployPopUp.isVisible()).to.eql(true)
  })

  it('should display `deploy pop up`, when `deploy another version` button in environment card is clicked, when environment card is in collasped state', () => {
    EnvironmentList.deployBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEnvCardDeploySuccess(2).waitForVisible()
    //Already in collapsed state
    expect(EnvironmentList.getEnvCardDeploySuccess(2).getText()).to.eql(
      'SUCCESS'
    )
    EnvironmentList.getEnvCardDeployAnotherVersion(2).waitForVisible()
    expect(EnvironmentList.getEnvCardDeployAnotherVersion(2).getText()).to.eql(
      'Deploy Another Version'
    )
    EnvironmentList.getEnvCardDeployAnotherVersion(2).click()
    EnvironmentList.deployPopUp.waitForVisible()
    expect(EnvironmentList.deployPopUp.isVisible()).to.eql(true)
  })

  // it('should cancel current deployment progress, when user clicks on `cancel deployment` button for any environment', () => {
  //   //  TODO For now cancel is not possible as deployment happens in a blink
  // })

  it('should display `shutdown pop up`, when user clicks `shutdown` button through `...` dropdown present for environment card, when in environment card is in collasped state', () => {
    //Already in collapsed state
    EnvironmentList.deployCancelBtn.click()
    EnvironmentList.getCardDropDownInEnvList(1).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    EnvironmentList.getenvCardShutDownBtn(1).click()
    EnvironmentList.envDeployShutDownPopUp.waitForVisible()
    expect(EnvironmentList.envDeployShutDownPopUp.isVisible()).to.eql(true)
    EnvironmentList.shutDownPopUpCancelBtn.click()
  })

  it('should navigate user to `logs` page of concerned environment build, when user clicks `view logs` for any environment build', () => {
    //Clicks on view logs btn of 1nd environment in expanded state
    EnvironmentList.getExpandEnvDeploys(2).waitForVisible()
    EnvironmentList.getExpandEnvDeploys(2).click()
    EnvironmentList.getEnvViewLogs(2, 1).waitForVisible()
    EnvironmentList.getEnvViewLogs(2, 1).click()
    EnvironmentList.envBuildViewLogsPageTitle.waitForVisible()
    expect(EnvironmentList.envBuildViewLogsPageTitle.getText()).to.eql(
      'REQUESTS'
    )
  })

  it('should create a workspace ,KA and deploying the KA', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceCreate.open(ws)
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForVisible()
    WorkspaceCreate.workspaceCongratsBtn.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    kaName = testData.kintoapp.validKAEnv + '41' + currentDate.getTime() + 'a'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    browser.pause(2000)
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.waitForVisible()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.waitForVisible()
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.minorVersion.setValue('0')
    DeploymentManage.revision.setValue('0')
    DeploymentManage.notes.click()
    DeploymentManage.notes.setValue(testData.kintoapp.validTagNotes)
    DeploymentManage.createTagBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.amazingBtn.waitForExist()
    DeploymentManage.amazingBtn.waitForVisible()
    DeploymentManage.amazingBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
  })

  it('should not reflect any changes to existing environment build versions, when an environment is deployed', () => {
    EnvironmentManage.envListFromBreadCrumb.waitForVisible()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.addEnv.waitForVisible()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    envOne =
      testData.Environment.validEnvNameInAlphaNumeric +
      '091' +
      currentDate.getTime() +
      'e'
    EnvironmentCreate.envNameField.setValue(envOne)
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.envName.selectByIndex(1)
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('2')
    DeploymentManage.minorVersion.setValue('0')
    DeploymentManage.revision.setValue('0')
    DeploymentManage.createTagBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.getenvCardVerNumber(2).waitForVisible()
    expect('2.0.0').to.not.eql(EnvironmentList.getenvCardVerNumber(1).getText())
    expect('2.0.0').to.eql(EnvironmentList.getenvCardVerNumber(2).getText())
  })

  it('should display `deploy pop up`, when user clicks on `rollback to this build` for any environment', () => {
    EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    EnvironmentList.deployBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envListFromBreadCrumb.waitForVisible()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.getExpandEnvDeploys(1).waitForVisible()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.envCardDeployRollbackBtn.waitForVisible()
    EnvironmentList.envCardDeployRollbackBtn.click()
    EnvironmentList.deployPopUp.waitForVisible()
    expect(EnvironmentList.deployPopUp.isVisible()).to.eql(true)
    EnvironmentList.deployCancelBtn.click()
  })
})

describe('Environment - Easy add pop up', () => {
  it('should display `add new environment` pop up, when user clicks on `...` next to environment name present in breadcrumb of edit page environment', () => {
    //Added refresh to tackle the bug in the scripts
    browser.refresh()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    //
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.getEditEnv(1).click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.breadcrumbEnv.click()
    EnvironmentManage.dropdownIsShownShort.waitForVisible()
    EnvironmentManage.addNewEnv.waitForVisible()
    EnvironmentManage.addNewEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    expect(EnvironmentCreate.addEnvPopUp.isVisible()).to.eql(true)
    EnvironmentCreate.addEnvCancelBtn.click()
  })

  it('should navigate user to environment list, when user clicks on `cancel` button of `add new environment` pop up', () => {
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    EnvironmentCreate.addEnvCancelBtn.click()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  it('should navigate user to environment list page and display `no build deployed` for new environment card, when clicks `add new environment` button', () => {
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    envOne =
      testData.Environment.validEnvNameInAlphaNumeric +
      '6' +
      currentDate.getTime() +
      'r'
    EnvironmentCreate.envNameField.setValue(envOne)
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
    EnvironmentList.getEnvNoDeployText(3).waitForVisible()
    expect(EnvironmentList.getEnvNoDeployText(3).getText()).to.eql(
      'No build deployed.'
    )
  })
})

describe('Environment - Simple Deploy Popup', () => {
  it('should sign up, link GitHub and create KA & Deploy', () => {
    EnvironmentList.logout()
    Login.registerAndLogin('SD')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    kaName = testData.kintoapp.validKAEnv + '09' + currentDate.getTime() + 'r'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    browser.pause(2000)
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('2')
    DeploymentManage.minorVersion.setValue('0')
    DeploymentManage.revision.setValue('0')
    DeploymentManage.createTagBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    DeploymentManage.amazingBtn.waitForExist()
    DeploymentManage.amazingBtn.waitForVisible()
    DeploymentManage.amazingBtn.click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
  })

  //TC_273
  it('should display `simple deploy` pop up, when `deploy` button is clicked for any environment card which is not yet deployed', () => {
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    envOne =
      testData.Environment.validEnvNameInAlphaNumeric +
      '6' +
      currentDate.getTime() +
      'po'
    EnvironmentCreate.envNameField.setValue(envOne)
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    expect(EnvironmentList.getEnvCardDeployBtn(2).getText()).to.eql('Deploy')
    EnvironmentList.getEnvCardDeployBtn(2).click()
    EnvironmentList.deployPopUp.waitForVisible()
    expect(EnvironmentList.deployPopUp.isVisible()).to.eql(true)
    EnvironmentList.deployCancelBtn.click()
  })

  //TC_274
  it('should display `simple deploy` pop up, when `deploy another version` button is clicked for any environment card which is deployed', () => {
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).waitForVisible()
    expect(
      EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).getText()
    ).to.eql('Deploy Another Version')
    EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    expect(EnvironmentList.deployPopUp.isVisible()).to.eql(true)
    EnvironmentList.deployCancelBtn.click()
  })

  //TC_275
  it('should display `simple deploy` pop up title as `deploy - {App name} - {Env name}`', () => {
    EnvironmentList.envList.waitForVisible()
    var kaName = EnvironmentList.kaFromEnvListBreadcrumb.getText()
    var envName = EnvironmentList.getEnvCardTitle(1).getText()
    EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    expect(EnvironmentList.simpleDeployPopUpTitle.getText()).to.eql(
      `Deploy - ` + kaName + ` - ` + envName
    )
  })

  //TC_279
  it('should deploy environment according to selected build version from drop down, when user clicks on `delpoy now` button', () => {
    var verNum = EnvironmentList.simpleDeployDropDown.getText('option:checked')
    EnvironmentList.deployBtn.click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.versionTag.waitForVisible()
    expect(EnvironmentManage.versionTag.getText()).to.eql(verNum)
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    expect(EnvironmentList.getEnvCardDeploySuccess(1).getText()).to.eql(
      'SUCCESS'
    )
    expect(EnvironmentList.getenvCardVerNumber(1).getText()).to.eql(verNum)
  })

  //TC_280
  it('should navigate to environment list page, when user clicks on `cancel` button in `simple deploy` pop up', () => {
    EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).waitForVisible()
    EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    EnvironmentList.deployCancelBtn.click()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  //TC_281
  it('should navigate to environment list page and deployment should reflect in concerned environment, when user clicks on `deploy now` button in `simple deploy` pop up', () => {
    EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).waitForVisible()
    EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    var versionNum = EnvironmentList.simpleDeployDropDown.getText(
      'option:checked'
    )
    EnvironmentList.deployBtn.click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envListFromBreadCrumb.waitForVisible()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
    EnvironmentList.getEnvCardDeploySuccess(1).waitForVisible()
    expect(EnvironmentList.getEnvCardDeploySuccess(1).getText()).to.eql(
      'SUCCESS'
    )
    expect(EnvironmentList.getenvCardVerNumber(1).getText()).to.eql(versionNum)
  })

  //TC_282
  // it('should navigate to environment list page and deployment should display deployment status as failure if deployment fails, when user clicks on `deploy now` button in `simple deploy` pop up', () => {
  //   //Need clarification from KintoHub how to test this functionality
  // })
})

describe('Environment - Request - Request Page', () => {
  it('should Tag and Deploy KB for Request scenario', () => {
    EnvironmentList.logout()
    Login.registerAndLogin('Logs')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    kaName = testData.kintoapp.validKAEnv + '49' + currentDate.getTime() + 'r'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    browser.pause(2000)
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.waitForVisible()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.waitForVisible()
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.minorVersion.setValue('0')
    DeploymentManage.revision.setValue('0')
    DeploymentManage.notes.click()
    DeploymentManage.notes.setValue(testData.kintoapp.validTagNotes)
    DeploymentManage.createTagBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.amazingBtn.waitForExist()
    DeploymentManage.amazingBtn.waitForVisible()
    DeploymentManage.amazingBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
  })

  it('should post the API request for helloworld', async () => {
    EnvironmentManage.clientIdField.waitForVisible()
    let clientID = EnvironmentManage.clientIdField.getText()
    let clientSecret = EnvironmentManage.secretKeyField.getText()
    const token = await getToken(clientID, clientSecret)
    const successMessage = await callExampleHelloWorld(token)
    expect(successMessage).to.eql('Hello world')
  })

  it('should navigate user to `Request` page of environment build, when `view logs` button is clicked in manage page of environment', () => {
    EnvironmentManage.requestBtn.waitForVisible()
    EnvironmentManage.requestBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envBuildViewLogsPageTitle.waitForVisible()
    expect(EnvironmentList.envBuildViewLogsPageTitle.getText()).to.eql(
      'REQUESTS'
    )
  })

  it('should display relavent messages in the Request table as per concered API request made', () => {
    EnvironmentManage.getMessageInEachLogsRow(1, 'one').waitForVisible()
    expect(
      EnvironmentManage.getMessageInEachLogsRow(1, 'one').getText()
    ).to.eql('200')
    expect(
      EnvironmentManage.getMessageInEachLogsRow(1, 'three').getText()
    ).to.eql('GET /hello/{name}')
    expect(
      EnvironmentManage.getMessageInEachLogsRow(1, 'four').getText()
    ).to.eql('helloworld')
    EnvironmentManage.getMessageInEachLogsRow(1, 'five').moveToObject()
    expect(
      EnvironmentManage.getMessageInEachLogsRow(1, 'five').getText()
    ).to.eql('1.0.0')
  })

  it('should display concerned response code of application requested', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.getResponseCodeText(1).moveToObject()
    var responseCode = KintoBlockManage.getResponseCodeText(1).getText()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.getEditEnv(1).waitForVisible()
    EnvironmentList.getEditEnv(1).click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.requestBtn.waitForVisible()
    EnvironmentManage.requestBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.getMessageInEachLogsRow(1, 'one').waitForVisible()
    expect(
      EnvironmentManage.getMessageInEachLogsRow(1, 'one').getText()
    ).to.eql(responseCode)
  })

  //TC_284
  it('should navigate user to `Request` page of environment build, when `view logs` is clicked for previously deployed build', () => {
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.minorVersion.setValue('1')
    DeploymentManage.revision.setValue('1')
    DeploymentManage.createTagBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.getExpandEnvDeploys(1).waitForVisible()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(2).waitForVisible()
    EnvironmentList.getenvCardViewLogs(2).click()
    EnvironmentList.envBuildViewLogsPageTitle.waitForVisible()
    expect(EnvironmentList.envBuildViewLogsPageTitle.getText()).to.eql(
      'REQUESTS'
    )
  })

  //TC_285
  it('should navigate user to `Request` page of environment build, when user enters URL of concerned environment build', () => {
    var url = EnvironmentList.getUrl().split('/')
    var ws = url[3]
    var kintoAppId = url[5]
    var envId = url[7]
    var envBuildNum = url[9]
    var envName = EnvironmentList.toEnvEditPageFromLogsPage.getText()
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    var frontEndURL = KintoBlockManage.TEST_ENV
    browser.url(
      `${frontEndURL}/app/dashboard/${ws}/deployments/${kintoAppId}/environment/${envId}/requests/${envBuildNum}`
    )
    EnvironmentList.toEnvEditPageFromLogsPage.waitForVisible()
    var envName1 = EnvironmentList.toEnvEditPageFromLogsPage.getText()
    expect(envName).to.eql(envName1)
  })

  //TC_286
  it('should navigate user to `Request` page of environment build, when user select an environment build from drop down through breadcrumb in `Request` page', () => {
    EnvironmentList.tagsDropDownInLogsPage.waitForVisible()
    EnvironmentList.tagsDropDownInLogsPage.click()
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    var versionNum = EnvironmentList.getTagsFromTagsDropDownList(2).getText()
    var envName = EnvironmentList.toEnvEditPageFromLogsPage.getText()
    EnvironmentList.getTagsFromTagsDropDownList(2).click()
    EnvironmentList.loadingFinished.waitForExist()
    expect(EnvironmentList.envBuildViewLogsPageTitle.getText()).to.eql(
      'REQUESTS'
    )
    EnvironmentList.logsTableTitle.waitForVisible()
    expect(EnvironmentList.logsTableTitle.getText()).to.eql(
      envName + ` - ` + versionNum + ` -`
    )
  })

  //TC_287
  it('should display title as `REQUESTS` for `Request` page', () => {
    expect(EnvironmentList.envBuildViewLogsPageTitle.getText()).to.eql(
      'REQUESTS'
    )
  })

  //TC_288
  it('should display title for Request table as per concerned environment build selected', () => {
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    var envName = EnvironmentList.getEnvCardTitle(1).getText()
    var versionNum = EnvironmentList.getenvCardVerNumber(1).getText()
    //expands environment card
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).waitForVisible()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentList.logsTableTitle.waitForVisible()
    expect(EnvironmentList.logsTableTitle.getText()).to.eql(
      envName + ` - ` + versionNum + ` -`
    )
  })

  //TC_289
  it('should dispaly Request table columns name as Response Time, Endpoint, RESPONSE CODE, KINTOBLOCK, VERSIONS and TIME & DATE', () => {
    expect(EnvironmentList.columnOneFromLogsTable.getText()).to.eql('CODE')
    expect(EnvironmentList.columnTwoFromLogsTable.getText()).to.eql('DURATION')
    expect(EnvironmentList.columnThreeFromLogsTable.getText()).to.eql(
      'ENDPOINT'
    )
    expect(EnvironmentList.columnFourFromLogsTable.getText()).to.eql(
      'KINTOBLOCK'
    )
    expect(EnvironmentList.columnFiveFromLogsTable.getText()).to.eql('VERSION')
    EnvironmentList.columnSixFromLogsTable.moveToObject()
    EnvironmentList.columnSixFromLogsTable.waitForVisible()
    expect(EnvironmentList.columnSixFromLogsTable.getText()).to.eql(
      'TIME & DATE'
    )
  })

  //TC_290
  it('should display Request table in collapsed state by default, when user navigates to `logs` page of environment build', () => {
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).waitForVisible()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.logsTableTitle.waitForVisible()
    expect(EnvironmentList.logsTableRowExpanded.isVisible()).to.eql(false)
  })

  //TC_291
  it('should check whether `view Request` in breadcrumb of `Request` page is disabled/not clickable', () => {
    expect(EnvironmentList.viewLogsDisabledInLogsPage.isVisible()).to.eql(true)
  })

  //TC_292
  it('should search tags in tags drop down search field through breadcrumb in `Request` page', () => {
    EnvironmentList.tagsDropDownInLogsPage.click()
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    EnvironmentList.tagsSearchField.setValue('1.0.0')
    expect(EnvironmentList.getTagsFromTagsDropDownList(1).getText()).to.eql(
      '1.0.0'
    )
  })

  //TC_293
  it('should display `LIVE` for currently deployed build in tags drop down list of Request page', () => {
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    var envVersionNum = EnvironmentList.getenvCardVerNumber(1).getText()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).waitForVisible()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.tagsDropDownInLogsPage.waitForVisible()
    EnvironmentList.tagsDropDownInLogsPage.click()
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    EnvironmentList.tagsSearchField.setValue(envVersionNum)
    EnvironmentList.tagIsLive.waitForVisible()
    expect(EnvironmentList.tagIsLive.isVisible()).to.eql(true)
  })

  //TC_295
  it('should display place holder text as `Search application tags...` for tags drop down field of request page', () => {
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    var placeHolder = EnvironmentList.tagsSearchField.getAttribute(
      'placeholder'
    )
    expect(placeHolder).to.eql('Search application tags...')
  })

  //TC_296
  it('should allow user to switch between environments through breadcrumb in `Request` page of environment build', () => {
    //second environment creation
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    EnvironmentCreate.envNameField.setValue(
      testData.Environment.allValidEnvChar
    )
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).waitForVisible()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentManage.envSwitcher.waitForVisible()
    EnvironmentManage.envSwitcher.click()
    var env = EnvironmentManage.getbreadCrumbEnvText(2).getText()
    EnvironmentManage.getbreadCrumbEnvText(2).click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envNameFromBreadcrumb.waitForVisible()
    expect(EnvironmentManage.envNameFromBreadcrumb.getText()).to.eql(env)
  })
})

describe('Environment - Request - Request Table Component', () => {
  //TC_297
  it('should display Request table title as per environment build selected from environment list', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    var envName = EnvironmentList.getEnvCardTitle(1).getText()
    EnvironmentList.getenvCardVerNumber(1).waitForVisible()
    var verNum = EnvironmentList.getenvCardVerNumber(1).getText()
    var envStatus = EnvironmentList.getEnvCardDeploySuccess(1).getText()
    var envSelected = envName + ` - ` + verNum + ` -` + envStatus
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envBuildViewLogsPageTitle.waitForVisible()
    var envNameInLogsTable = EnvironmentList.logsTableTitle.getText()
    var envStatusInLogsTable = EnvironmentList.logsTableEnvStatus.getText()
    var logsTableTitle = envNameInLogsTable + envStatusInLogsTable
    expect(envSelected).to.eql(logsTableTitle)
  })

  //TC_298
  it.skip('should displays types of Request in `SEVERITY` column as info, debug, fatal and warnign', () => {
    expect(EnvironmentList.getSeverityColumnInLogsTable(1).getText()).to.eql(
      'Info'
    )
    expect(EnvironmentList.getSeverityColumnInLogsTable(2).getText()).to.eql(
      'Debug'
    )
    expect(EnvironmentList.getSeverityColumnInLogsTable(3).getText()).to.eql(
      'Fatal'
    )
    expect(EnvironmentList.getSeverityColumnInLogsTable(4).getText()).to.eql(
      'Warning'
    )
  })

  //TC_300
  it('should display KB name as per the log in `KINTOBLOCK` column, since KA can englobe different KB`s', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    DeploymentManage.getDependenciesCardTitle(1).waitForVisible()
    var depKB = DeploymentManage.getDependenciesCardTitle(1).getText()
    branchOrTagOfDep = DeploymentManage.getBranchOrTagOfDep(1).getAttribute(
      'placeholder'
    )
    browser.scroll(0, -2000)
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envBuildViewLogsPageTitle.waitForVisible()
    EnvironmentList.tagsDropDownInLogsPage.click()
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    EnvironmentList.tagsSearchField.setValue('1.0.0')
    EnvironmentList.getTagsFromTagsDropDownList(1).waitForVisible()
    EnvironmentList.getTagsFromTagsDropDownList(1).click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.getMessageInEachLogsRow(1, 'four').waitForVisible()
    expect(
      EnvironmentManage.getMessageInEachLogsRow(1, 'four').getText()
    ).to.eql(depKB)
  })

  //TC_301
  it('should display branch or commit of the concerned KB which is called for the log in `VERSIONS` column', () => {
    //Already got the version
    expect(
      EnvironmentManage.getMessageInEachLogsRow(1, 'five').getText()
    ).to.eql(branchOrTagOfDep)
  })

  it('should verify that "Console Logs" displays "Time", "Message" and "Block Version"', () => {
    EnvironmentManage.getMessageInEachLogsRow(1, 'one').leftClick()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.getConsoleLogsTitle(1).waitForVisible()
    EnvironmentManage.getConsoleLogsColumns(1, 1).waitForVisible()
    expect(EnvironmentManage.getConsoleLogsColumns(1, 1).getText()).to.eql(
      'TIME'
    )
    expect(EnvironmentManage.getConsoleLogsColumns(1, 2).getText()).to.eql(
      'MESSAGE'
    )
  })

  // //TC_302
  // it('should display time and date as per logs are generated in `TIME & DATE`', () => {
  //   var currentTime = new Date(),
  //     hours = currentTime.getHours(),
  //     minutes = currentTime.getMinutes();

  //   if (minutes < 10) {
  //     minutes = "0" + minutes;
  //   }

  //   var suffix = "AM";
  //   if (hours >= 12) {
  //     suffix = "PM";
  //     hours = hours - 12;
  //   }
  //   if (hours == 0) {
  //     hours = 12;
  //   }

  //   var time = (hours + ":" + minutes + " " + suffix)
  // })

  //TC_303
  it.skip('should display request call section, when log is expanded in logs table', () => {
    //expands the log
    EnvironmentList.getSeverityColumnInLogsTable(1).click()
    EnvironmentList.requestFieldTextInLogsTable.waitForVisible()
    expect(EnvironmentList.requestFieldTitleInLogsTable.getText()).to.eql(
      'Request'
    )
    expect(EnvironmentList.requestFieldTextInLogsTable.isVisible()).to.eql(true)
  })

  //TC_304
  it.skip('should display response section, when log is expanded in logs table', () => {
    expect(EnvironmentList.responseFieldTitleInLogsTable.getText()).to.eql(
      'Response'
    )
    EnvironmentList.responseFieldTextInLogsTable.waitForVisible()
    expect(EnvironmentList.responseFieldTextInLogsTable.isVisible()).to.eql(
      true
    )
    //collapses the log
    EnvironmentList.getSeverityColumnInLogsTable(1).click()
  })

  //TC_307
  it.skip('should display `Report an issue` button, when a log is expanded', () => {
    //Expands the row
    EnvironmentList.getSeverityColumnInLogsTable(1).click()
    EnvironmentList.reportAnErrorBtnInLogsTable.waitForVisible()
    expect(EnvironmentList.reportAnErrorBtnInLogsTable.isVisible()).to.eql(true)
  })

  //  //TC_308
  //  it('should display `report` pop up, when `Report an issue` button is clicked', () => {
  //    //For now report pop up is not implemented
  //  })
})

describe('Environment - Shutdown', () => {
  it('should display `shutdown` pop up, when `shutdown` button is clicked through `...` drop down button present for any environment card', () => {
    EnvironmentList.logout()
    Login.registerAndLogin('SENV')
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    kaName = testData.kintoapp.validKAEnv + '09' + currentDate.getTime() + 'st'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    browser.pause(2000)
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.waitForVisible()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.waitForVisible()
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.minorVersion.setValue('5')
    DeploymentManage.revision.setValue('0')
    DeploymentManage.notes.click()
    DeploymentManage.notes.setValue(testData.kintoapp.validTagNotes)
    DeploymentManage.createTagBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.amazingBtn.waitForExist()
    DeploymentManage.amazingBtn.waitForVisible()
    DeploymentManage.amazingBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    EnvironmentList.getenvCardShutDownBtn(0).click()
    EnvironmentList.envDeployShutDownPopUp.waitForVisible()
    expect(EnvironmentList.envDeployShutDownPopUp.isVisible()).to.eql(true)
  })

  it('should display `shutdown` pop up title and content, when shutdown pop up is triggered', () => {
    EnvironmentList.deployCancelBtn.click()
    EnvironmentList.envList.waitForVisible()
    var envName = EnvironmentList.getEnvCardTitle(1).getText()
    var versionNum = EnvironmentList.getenvCardVerNumber(1).getText()
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    EnvironmentList.getenvCardShutDownBtn(0).click()
    EnvironmentList.envDeployShutDownPopUp.waitForVisible()
    expect(EnvironmentList.shutDownTitle.getText()).to.eql(
      `Shut Down - ` + envName + ` - ` + versionNum
    )
    expect(EnvironmentList.shutDownContent.getText()).to.eql(
      'The currently deployed application will be stopped, leaving this environment empty. You can deploy another tag directly without shutting down the current one and disrupting your users.'
    )
  })

  it('should display `shutdown anyway` and `cancel` button in shutdown pop up', () => {
    expect(EnvironmentList.shutDownAnywayBtn.isVisible()).to.eql(true)
    expect(EnvironmentList.shutDownPopUpCancelBtn.isVisible()).to.eql(true)
  })

  it('should navigate to environment list page, when `cancel button` in shutdown pop up is clicked', () => {
    EnvironmentList.shutDownPopUpCancelBtn.click()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  it('should shutdown current build, naviagte to environment list page, display environment card empty as `no build deployed and display build status as `shutdown`, When `shutdown anyway` button is clicked', () => {
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    EnvironmentList.getenvCardShutDownBtn(0).click()
    EnvironmentList.envDeployShutDownPopUp.waitForVisible()
    EnvironmentList.shutDownAnywayBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
    expect(EnvironmentList.getEnvNoDeployText(1).getText()).to.eql(
      'No build deployed.'
    )
    expect(EnvironmentList.getShutDownTextInEnvCard(1).getText()).to.include(
      'Shut down'
    )
  })

  it('should change `deploy another version` button to `deploy` button, when environment is in shutdown state', () => {
    EnvironmentList.getEnvCardDeployBtn(1).click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.deployBtn.waitForVisible()
    EnvironmentList.deployBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    DeploymentManage.amazingBtn.waitForExist()
    DeploymentManage.amazingBtn.waitForVisible()
    DeploymentManage.amazingBtn.click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    expect(
      EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).getText()
    ).to.eql('Deploy Another Version')
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    EnvironmentList.getenvCardShutDownBtn(0).click()
    EnvironmentList.envDeployShutDownPopUp.waitForVisible()
    EnvironmentList.shutDownAnywayBtn.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEnvCardDeployBtn(1).waitForVisible()
    expect(EnvironmentList.getEnvCardDeployBtn(1).getText()).to.eql('Deploy')
  })

  it('should not display `shutdown anyway` button, when there is deployment done for an environment', () => {
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    expect(EnvironmentList.getenvCardShutDownBtn(0).isVisible()).to.eql(false)
  })
})

describe('Environment - Logs page over all', () => {
  it('should create a KB with existing repository', () => {
    EnvironmentList.logout()
    Login.registerAndLogin('LPOA')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    randomName = KintoBlockCreate.randomNumbers()
    KintoBlockCreate.loadingFinished.waitForExist()
    kbOneName = testData.kintoblock.validKBNameEight + '26' + randomName + 'ex'
    KintoBlockCreate.name.input.setValue(kbOneName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions('Node.js (8.9.4)').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions('Node.js (8.9.4)').click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      'Node.js (8.9.4)'
    )
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(
      testData.kintoblock.validRepoWithConsoleLogs
    )
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.pause(5000)
    browser.keys('Tab')
    browser.pause(3000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForExist()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the KintoBlock move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether KintoBlock is moved to PROCESSING ', () => {
    KintoBlockCreate.checkforProcessing()
  })

  it('should check whether KintoBlock is moved to success or failed', () => {
    KintoBlockCreate.checkForSuccessOrFailed()
  })

  it('should create a deployment and deploy it for Logs page over all describe', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    randomName = DeploymentCreate.randomName()
    kaName = testData.kintoapp.validKAEnv + randomName
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    KintoBlockList.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    browser.pause(2000)
    browser.keys('Tab')
    DeploymentCreate.kbdropDown.setValue(kbOneName)
    KintoBlockList.getFilteredKB(kbOneName).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    browser.pause(2000)
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.waitForVisible()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.waitForVisible()
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.minorVersion.setValue('5')
    DeploymentManage.revision.setValue('0')
    DeploymentManage.notes.click()
    DeploymentManage.notes.setValue(testData.kintoapp.validTagNotes)
    DeploymentManage.createTagBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.amazingBtn.waitForExist()
    DeploymentManage.amazingBtn.waitForVisible()
    DeploymentManage.amazingBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
  })

  it('should verify that the GET API call is successful for the KA deployed using existing and example KB', async () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    EnvironmentManage.clientIdField.waitForVisible()
    let clientID = EnvironmentManage.clientIdField.getText()
    let clientSecret = EnvironmentManage.secretKeyField.getText()
    const token = await getToken(clientID, clientSecret)
    var successMessage = await callUserKB(token, kbOneName)
    successMessage = await callUserKB(token, kbOneName)
    message = successMessage['message']
    expect(message).to.includes(`Hello requestId value: ${ws}-${clientID}`)
  })

  it('should navigate user to "logs" page, when user clicks on "Logs" button displayed in environment manage page', () => {
    EnvironmentManage.viewLogsBtn.waitForVisible()
    EnvironmentManage.viewLogsBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logsPage.waitForVisible()
    expect(EnvironmentManage.logsPage.isVisible()).to.eql(true)
  })

  it('should navigate user to "logs" page, when user enters URL of the logs page', () => {
    var url = browser.getUrl()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(DeploymentCreate.form.isVisible()).to.eql(true)
    browser.url(url)
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logsPage.waitForVisible()
    expect(EnvironmentManage.logsPage.isVisible()).to.eql(true)
  })

  it('should verify breadcrumb of logs page displays "Deployments > { Deployment name } > Environments > { environment name } > { Tag } > View Console Logs"', () => {
    //Deployment text
    expect(DeploymentManage.kaListPageFromKaManagePage.isVisible()).to.eql(true)
    expect(DeploymentManage.kaListPageFromKaManagePage.getText()).to.eql(
      'Deployments'
    )
    //Deployment name
    expect(DeploymentManage.kaFromEnvListBreadcrumb.isVisible()).to.eql(true)
    //Environments text
    expect(EnvironmentManage.envListFromBreadCrumb.isVisible()).to.eql(true)
    expect(EnvironmentManage.envListFromBreadCrumb.getText()).to.eql(
      'Environments'
    )
    //Environment name
    expect(EnvironmentManage.envManagePageInBreadcrumb.isVisible()).to.eql(true)
    //Tag
    expect(EnvironmentManage.tagTextInBreadcrumb.isVisible()).to.eql(true)
    //View console log text
    expect(
      EnvironmentList.viewConsoleLogsTextDisabledInLogsPage.isVisible()
    ).to.eql(true)
  })

  it('should check whether `view consolelogs` in breadcrumb of `logs` page is disabled/not clickable', () => {
    expect(EnvironmentList.viewLogsDisabledInLogsPage.isVisible()).to.eql(true)
  })

  it('should search tags in tags drop down search field through breadcrumb in `logs` page', () => {
    EnvironmentList.tagsDropDownInLogsPage.click()
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    EnvironmentList.tagsSearchField.setValue('1.5.0')
    expect(EnvironmentList.getTagsFromTagsDropDownList(1).getText()).to.eql(
      '1.5.0'
    )
  })

  it('should display `LIVE` for currently deployed build in tags drop down list for logs page', () => {
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.viewEnvironments.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    var envVersionNum = EnvironmentList.getenvCardVerNumber(1).getText()
    EnvironmentList.getEditEnv(1).click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.viewLogsBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentList.tagsDropDownInLogsPage.waitForVisible()
    EnvironmentList.tagsDropDownInLogsPage.click()
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    EnvironmentList.tagsSearchField.setValue(envVersionNum)
    EnvironmentList.tagIsLive.waitForVisible()
    expect(EnvironmentList.tagIsLive.isVisible()).to.eql(true)
  })

  it('should verify console log header titles are displayed as "DATE RANGE" and "KINTOBLOCK"', () => {
    //Date range
    expect(EnvironmentManage.getConsoleLogsHeaderTitle(1).getText()).to.eql(
      'DATE RANGE'
    )
    //KintoBlock
    expect(EnvironmentManage.getConsoleLogsHeaderTitle(2).getText()).to.eql(
      'KINTOBLOCKS'
    )
  })

  it('should display place holder text as `Search application tags...` for tags drop down field of logs page', () => {
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    var placeHolder = EnvironmentList.tagsSearchField.getAttribute(
      'placeholder'
    )
    expect(placeHolder).to.eql('Search application tags...')
  })

  it('should display "View Request" button on top of the logs page', () => {
    expect(EnvironmentManage.viewRequestBtnInLogsPage.isVisible()).to.eql(true)
  })

  it('should navigate user to "Request" page, when user clicks on "View request" button in logs page', () => {
    EnvironmentManage.viewRequestBtnInLogsPage.click()
    EnvironmentManage.loadingFinished.waitForExist()
    expect(EnvironmentList.envBuildViewLogsPageTitle.getText()).to.eql(
      'REQUESTS'
    )
  })

  it('should display logs table title in following fromat {EnvName} - {build number} - {status of deployment}', () => {
    EnvironmentManage.envListFromBreadCrumb.waitForVisible()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEnvCardDeploySuccess(1).waitForVisible()
    var status = EnvironmentList.getEnvCardDeploySuccess(1).getText()
    EnvironmentManage.geteditEnvBtn(1).waitForVisible()
    EnvironmentManage.geteditEnvBtn(1).click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    clientId = EnvironmentManage.clientIdField.getText()
    EnvironmentManage.viewLogsBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.envManagePageInBreadcrumb.waitForVisible()
    var envName = EnvironmentManage.envManagePageInBreadcrumb.getText()
    var tagNum = EnvironmentManage.tagTextInBreadcrumb.getText()
    expect(
      EnvironmentManage.consoleLogsTableTitle.getText() +
        ' ' +
        EnvironmentManage.ConsoleLogsTableEnvStatus.getText()
    ).to.eql(envName + ' - ' + tagNum + ' ' + status)
  })

  it('should verify whether logs messages are scrollable', () => {
    expect(EnvironmentManage.scrollableBarInLogsTable.isVisible()).to.eql(true)
  })

  it('should verify logs table has two columns "Time" and "Message"', () => {
    expect(EnvironmentManage.timeColumnNameInLogsTable.getText()).to.eql('TIME')
    expect(EnvironmentManage.messageColumnNameInLogsTable.getText()).to.eql(
      'MESSAGE'
    )
  })

  it('should verify placeholder text of serach bar for filtering messages', () => {
    expect(
      EnvironmentManage.logMessageFilterSearchBar.getAttribute('placeholder')
    ).to.eql('Filter messages...')
  })

  it('should allow user to filter log messages using text filter search bar in console log table', () => {
    EnvironmentManage.logMessageFilterSearchBar.setValue('nodejs894alpine36')
    browser.pause(2000)
    EnvironmentManage.getLogMessageFromLogsTable(1).waitForVisible()
    expect(
      EnvironmentManage.getLogMessageFromLogsTable(1).getText()
    ).to.includes('nodejs894alpine36')
  })

  it('should allow user to switch between log messages of different KintoBlocks', () => {
    browser.refresh()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logMessageFilterSearchBar.waitForVisible()
    //First KB
    EnvironmentManage.KintoBlockDropDown.click()
    browser.pause(2000)
    browser.keys('Tab')
    browser.pause(5000)
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logMessageFilterSearchBar.setValue('nodejs894alpine36')
    browser.pause(2000)
    EnvironmentManage.getLogMessageFromLogsTable(1).waitForVisible()
    expect(
      EnvironmentManage.getLogMessageFromLogsTable(1).getText()
    ).to.includes('nodejs894alpine36')
    browser.refresh()
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logMessageFilterSearchBar.waitForVisible()
    //Second KB
    EnvironmentManage.KintoBlockDropDown.click()
    browser.pause(2000)
    browser.keys('Down arrow')
    browser.keys('Tab')
    browser.pause(5000)
    EnvironmentManage.loadingFinished.waitForExist()
    EnvironmentManage.logMessageFilterSearchBar.setValue(clientId)
    browser.pause(2000)
    EnvironmentManage.getLogMessageFromLogsTable(1).waitForVisible()
    expect(
      EnvironmentManage.getLogMessageFromLogsTable(1).getText()
    ).to.includes(clientId)
  })

  it('should verify whether user can turn on/off the toggle switch for pinning users to bottom of the logs', () => {
    EnvironmentManage.toggleSwitchToPinLogsAtBottom.waitForVisible()
    //Switchin on
    EnvironmentManage.toggleSwitchToPinLogsAtBottom.click()
    browser.pause(2000)
    //Switchin off
    EnvironmentManage.toggleSwitchToPinLogsAtBottom.click()
    browser.pause(2000)
  })

  it('should display text "Keep Console Pinned to the Bottom" next to toggle switch for pinning users to bottom of the logs', () => {
    expect(
      EnvironmentManage.toggleSwitchTextToPinLogsAtBottom.getText()
    ).to.eql('Keep Console Pinned to the Bottom')
  })
})
