import { expect } from 'chai'
import Login from '../page-objects/login.page'
import DeploymentCreate from '../page-objects/deployment.create.page'
import DeploymentManage from '../page-objects/deployment.manage.page'
import DeploymentList from '../page-objects/deployment.list.page'
import Landing from '../page-objects/landing.page'
import WorkspaceManage from '../page-objects/workspace.manage.page'
import testData from '../constants/testdata.json'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import EnvironmentCreate from '../page-objects/environment.create.page'
import EnvironmentManage from '../page-objects/environment.manage.page'
import EnvironmentList from '../page-objects/environment.list.page'

var ws
var envOne
var currentDate = new Date()

describe('Environment - Default environment checks', () => {
  it('Sign-up as new user and link workspace to GitHub', () => {
    Login.registerAndLogin('ENV')
    WorkspaceManage.linkGithub()
    Landing.workspaceSelect.waitForVisible()
    ws = Landing.workspaceSelect.getAttribute('data-test')
  })

  it('should create a deployment', () => {
    DeploymentCreate.deploymentCreate(ws, testData.kintoblock.validHelloWorldKB)
  })

  it('should Verify whether the user is able to see the Environment list on the left sidebar after clicking on Create New Environment', () => {
    expect(DeploymentCreate.getenvCardSelect(2).isVisible()).to.eql(true)
    DeploymentCreate.getenvCardSelect(2).waitForVisible()
  })

  it('should verify whether Shut Down btn,Environments list,Add New Environment addicn,Personal Workspace and Deploy btn are visible', () => {
    expect(DeploymentManage.shutDownBtn.isVisible()).to.eql(true)
    DeploymentManage.shutDownBtn.waitForVisible()
    expect(DeploymentCreate.getEnvCardTitle(2).isVisible()).to.eql(true)
    DeploymentCreate.getEnvCardTitle(2).waitForVisible()
    expect(DeploymentManage.addEnv.isVisible()).to.eql(true)
    DeploymentManage.addEnv.waitForVisible()
    expect(DeploymentManage.personalWS.isVisible()).to.eql(true)
    DeploymentManage.personalWS.waitForVisible()
    expect(DeploymentManage.deploybtn.isVisible()).to.eql(true)
    DeploymentManage.deploybtn.waitForVisible()
  })

  it('should verify whether environment card handle is visible', () => {
    DeploymentManage.getEnvCardHandle(2).waitForVisible()
    expect(DeploymentManage.getEnvCardHandle(2).isVisible()).to.eql(true)
  })

  it('should check whether the environment title is visible', () => {
    DeploymentCreate.getEnvCardTitle(2).waitForVisible()
    expect(DeploymentCreate.getEnvCardTitle(2).isVisible()).to.eql(true)
  })

  it('should check whether green tick, version number and build number are visible in env card', () => {
    DeploymentManage.checkTickIcn.waitForVisible()
    expect(DeploymentManage.checkTickIcn.isVisible()).to.eql(true)
    DeploymentManage.getenvCardVerNumber(2).waitForVisible()
    expect(DeploymentManage.getenvCardVerNumber(2).getText()).to.eql('0.0.1')
  })

  it('should get a current date of the Default Environment', () => {
    const date = DeploymentManage.getCurrentDate()
    let currDate = DeploymentManage.getdate(2).getText()
    const currDate1 = currDate.substring(8, 10)
    const currDate2 = currDate.substring(12)
    currDate = `${currDate1}${currDate2}`
    expect(currDate).to.eql(date)
  })

  it('should click on the status and history link of default Environment', () => {
    DeploymentCreate.getenvCardLink(1).click()
    expect(DeploymentCreate.getenvCardLink(1).isVisible()).to.eql(true)
  })

  it('should check for deployment success in default environment', () => {
    DeploymentCreate.checkforDepSuccess()
  })

  it('should verify whether View Logs,Tags,Rollback Bbuttons are visible', () => {
    browser.scroll(0, 100)
    DeploymentManage.expandDeploymentHistory.click()
    browser.scroll(0, 400)
    expect(DeploymentManage.viewLogs.isVisible()).to.eql(true)
    DeploymentManage.viewLogs.waitForVisible()
    expect(DeploymentManage.getTagBtn(1).isVisible()).to.eql(true)
    DeploymentManage.getTagBtn(1).waitForVisible()
    expect(DeploymentManage.getRollBackBtn(2).isVisible()).to.eql(true)
    DeploymentManage.getRollBackBtn(2).waitForVisible()
  })

  it('should click on view logs on the expanded deployment history of an default environment', () => {
    DeploymentManage.viewLogs.click()
    browser.pause(10000)
  })

  it('should click on default environment card and expand deployment history and collapse deploymrnt history in default environment', () => {
    DeploymentCreate.getenvCardSelect(2).click()
    DeploymentCreate.getenvCardLink(1)
    DeploymentManage.expandDeploymentHistory.waitForVisible()
    DeploymentManage.expandDeploymentHistory.click()
    browser.scroll(0, 500)
    DeploymentManage.collapseDeploymentHistory.click()
    expect(DeploymentManage.collapseDeploymentHistory.isVisible()).to.eql(true)
  })

  it('should check add kintoblocks,configure dependency and list of added kbs are visible', () => {
    browser.pause(2000)
    DeploymentCreate.getenvCardLink(2).click()
    DeploymentCreate.kbdropDown.waitForVisible()
    expect(DeploymentCreate.kbdropDown.isVisible()).to.eql(true)
    DeploymentManage.configDependencyBtn.waitForVisible()
    expect(DeploymentManage.configDependencyBtn.isVisible()).to.eql(true)
    expect(DeploymentManage.kbList.isVisible()).to.eql(true)
    DeploymentManage.kbList.waitForVisible()
  })

  it('should verify version, white tick mark ,Status & History,Kintoblocks,API Access links are visible', () => {
    expect(DeploymentManage.version.isVisible()).to.eql(true)
    DeploymentManage.version.waitForVisible()
    expect(DeploymentManage.checkTickIcn.isVisible()).to.eql(true)
    DeploymentManage.checkTickIcn.waitForVisible()
    expect(DeploymentCreate.getenvCardLink(1).isVisible()).to.eql(true)
    DeploymentCreate.getenvCardLink(1).waitForVisible()
    expect(DeploymentCreate.getenvCardLink(2).isVisible()).to.eql(true)
    DeploymentCreate.getenvCardLink(2).waitForVisible()
    expect(DeploymentCreate.getenvCardLink(3).isVisible()).to.eql(true)
    DeploymentCreate.getenvCardLink(3).waitForVisible()
  })

  it('should check whether pop-up is displayed when user tries to delete default environment', () => {
    DeploymentCreate.getenvCardLink(4).click()
    browser.pause(10000)
    DeploymentManage.deleteBtn.waitForVisible()
    DeploymentManage.deleteBtn.click()
    browser.pause(6000)
    expect(DeploymentManage.delPopupDescription.getText()).to.eql(
      'You can not delete default.\nEvery deployment requires at least one environment.'
    )
    DeploymentManage.goBtn.waitForVisible()
    expect(DeploymentManage.goBtn.isVisible()).to.eql(true)
  })

  it('should click on Go Back btn in the pop-up', () => {
    DeploymentManage.goBtn.click()
    browser.pause(10000)
  })

  it('should shut down the default environment', () => {
    browser.scroll(0, -2750)
    DeploymentManage.shutDownBtn.click()
    DeploymentManage.shutDownAnywayBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    browser.refresh()
    DeploymentManage.loadingFinished.waitForExist()
    browser.pause(5000)
    expect(DeploymentManage.shutDownBtn.isVisible()).to.eql(false)
  })

  it('should check that the deployment is shut down in default environment', () => {
    DeploymentManage.checkForShutDeployment()
  })

  it('should check for the text no deployment in env card', () => {
    browser.pause(8000)
    expect(DeploymentManage.getNoDeploymentText(2).getText()).to.eql(
      'No Deployment'
    )
  })

  //MENTION AUTO DEPLOY SWITCH IN HEADING
  it('should click on link Kintoblocks in a default environment card and to on autodeploy switch', () => {
    DeploymentCreate.getenvCardLink(2).click()
    browser.pause(2000)
    DeploymentCreate.autoDeploySwitch.waitForVisible()
    expect(DeploymentCreate.autoDeploySwitch.isVisible()).to.eql(true)
    DeploymentCreate.autoDeploySwitch.click()
    expect(DeploymentCreate.autoDeploySwitch.isEnabled()).to.eql(true)
  })

  it('should click on API access link in a default environment', () => {
    DeploymentCreate.getenvCardLink(3).click()
    expect(DeploymentCreate.getenvCardLink(1).isVisible()).to.eql(true)
    browser.pause(8000)
    browser.scroll(0, 1000)
  })

  it('should verify copy btn and View EndPoints btn are visible', () => {
    DeploymentManage.getApiSection(1).waitForVisible()
    expect(DeploymentManage.getApiSection(1).isVisible()).to.eql(true)
    DeploymentManage.viewEndPointsBtn.waitForVisible()
    expect(DeploymentManage.viewEndPointsBtn.isVisible()).to.eql(true)
  })
})

describe('Environment - Create and Edit', () => {
  it('should display validation error message, when environment name is less than 3 characters in `edit` page of environment', () => {
    DeploymentManage.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
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

  it('should display validation error message, when environment name is in capital and special characters', () => {
    EnvironmentCreate.envNameField.setValue(
      testData.Environment.invalidEnvwithSpecialAndUpperCaseChar
    )
    EnvironmentCreate.addNewEnvBtn.click()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must contain only lowercase characters and digits'
    )

    EnvironmentCreate.addEnvCancelBtn.waitForVisible()
    browser.pause(8000)
    EnvironmentCreate.addEnvCancelBtn.click()
  })

  it('should check whether the pop-up is displayed when clicked on add new environment button', () => {
    DeploymentManage.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    expect(EnvironmentCreate.addEnvPopUp.isVisible()).to.eql(true)
    EnvironmentCreate.addEnvCancelBtn.waitForVisible()
    EnvironmentCreate.addEnvCancelBtn.click()
  })

  it('should be able to select the new environment', () => {
    DeploymentCreate.envCreate()
    DeploymentCreate.envCard(3)
  })

  // it('should display environments in list as per the applications they are created for, regardless of whether they currently have a version deployed in them or not', () => {
  //   EnvironmentList.envList.waitForVisible()
  //   browser.pause(5000)
  //   DeploymentManage.addEnvHide.click()
  //   EnvironmentCreate.envNameField.waitForVisible()
  //   envOne =
  //   testData.Environment.allValidEnvChar + '2' + currentDate.getTime() + 'n'
  //   EnvironmentCreate.envNameField.setValue(envOne)
  //   EnvironmentCreate.addNewEnvBtn.waitForVisible()
  //   EnvironmentCreate.addNewEnvBtn.click()
  //   EnvironmentList.loadingFinished.waitForExist()
  //   EnvironmentList.envList.waitForVisible()
  //   EnvironmentList.loadingFinished.waitForExist()
  //   DeploymentManage.addEnvHide.click()
  //   EnvironmentCreate.envNameField.waitForVisible()
  //   envTwo =
  //   testData.Environment.validEnvNameWithNumbers +
  //   '3' +
  //   currentDate.getTime() +
  //   'v'
  //   EnvironmentCreate.envNameField.setValue(envTwo)
  //   EnvironmentCreate.addNewEnvBtn.click()
  //   EnvironmentList.loadingFinished.waitForExist()
  //   EnvironmentList.envList.waitForVisible()
  //   EnvironmentList.loadingFinished.waitForExist()
  //   DeploymentManage.goBackBtn.click()
  //   DeploymentList.loadingFinished.waitForExist()
  //   DeploymentList.getCard(0).waitForVisible()
  //   var kaName = DeploymentList.getKaNameFromKaCard(0).getText()
  //   DeploymentList.getCard(0).click()
  //   DeploymentManage.loadingFinished.waitForExist()
  //   DeploymentManage.form.waitForVisible()
  //   DeploymentManage.loadingFinished.waitForExist()
  //   expect(EnvironmentList.kaFromEnvListBreadcrumb.getText()).to.eql(kaName)
  //   expect(DeploymentCreate.getEnvCardTitle(4).getText()).to.eql(envOne)
  //   expect(DeploymentCreate.getEnvCardTitle(5).getText()).to.eql(envTwo)
  // })

  //  it('should check whether validation error message is displayed, when environment is duplicated', () => {
  //     DeploymentManage.addEnvHide.click()
  //     EnvironmentCreate.addEnvPopUp.waitForVisible()
  //     expect(EnvironmentCreate.addEnvPopUp.isVisible()).to.eql(true)
  //     envOne = testData.Environment.allValidEnvChar + '2' + currentDate.getTime() + 's'
  //     EnvironmentCreate.envNameField.setValue(envOne)
  //     EnvironmentCreate.addNewEnvBtn.click()
  //     EnvironmentList.loadingFinished.waitForExist()
  //     EnvironmentList.envList.waitForVisible()
  //     DeploymentManage.addEnvHide.click()
  //     EnvironmentCreate.addEnvPopUp.waitForVisible()
  //     expect(EnvironmentCreate.addEnvPopUp.isVisible()).to.eql(true)
  //     envOne = testData.Environment.allValidEnvChar + '2' + currentDate.getTime() + 's'
  //     EnvironmentCreate.envNameField.setValue(envOne)
  //     EnvironmentCreate.addEnvCancelBtn.click()
  //     // EnvironmentCreate.errorMessage.waitForVisible()
  //     // expect(EnvironmentCreate.errorMessage.getText()).to.eql('Name already in use!')
  //   })

  it('should reflect environment changes made in `edit` page of environment, where ever environment is displayed', () => {
    DeploymentManage.addEnvHide.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    envOne =
      testData.Environment.allValidEnvChar + '67' + currentDate.getTime() + 'x'
    EnvironmentManage.name.input.setValue(envOne)
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentManage.loadingFinished.waitForExist()
    DeploymentCreate.getEnvCardTitle(3).waitForVisible()
    var fullTitle = DeploymentCreate.getEnvCardTitle(3)
      .getText()
      .split(' - ')
    var envName = fullTitle[1]
    expect(DeploymentCreate.getEnvCardTitle(3).isVisible()).to.eql(true)
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
    expect(DeploymentCreate.getEnvCardTitle(3).getText()).to.eql(envOne)
  })

  it('should verify deploy btn is visible', () => {
    expect(DeploymentManage.deployBtn.isVisible()).to.eql(true)
    DeploymentManage.deployBtn.waitForVisible()
  })

  it('should click on status and historylink and  check for deployment success', () => {
    DeploymentCreate.getenvCardSelect(3).click()
    browser.scroll(0, 600)
    DeploymentCreate.getenvCardLink(1).click()
    DeploymentCreate.checkforDepSuccess()
  })

  it('should display environment title of environment card as per environment created', () => {
    DeploymentManage.goBackBtn.click()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    EnvironmentList.loadingFinished.waitForExist()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.loadingFinished.waitForExist()
    DeploymentManage.addEnv.click()
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
    DeploymentCreate.getEnvCardTitle(4).waitForVisible()
    expect(DeploymentCreate.getEnvCardTitle(4).getText()).to.eql(envOne)
  })

  it('should shut down the deployment of new environment', () => {
    DeploymentCreate.getenvCardSelect(3).click()
    DeploymentManage.shutDownBtn.click()
    DeploymentManage.shutDownAnywayBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    browser.refresh()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.shutDownAnywayBtn.isVisible()).to.eql(false)
  })

  it('should check that the deployment is shutdown in new environment', () => {
    DeploymentManage.checkForShutDeployment()
  })

  it('should check whether Permanent Block is visible when clicked on Delete Environment link', () => {
    DeploymentCreate.getenvCardSelect(3).click()
    browser.scroll(0, 150)
    DeploymentCreate.getenvCardLink(4).click()
    browser.pause(10000)
    browser.scroll(0, 200)
    DeploymentManage.deleteBlock.waitForVisible()
    expect(DeploymentManage.deleteBlock.isVisible()).to.eql(true)
  })

  it('should check for the text below the Permanent Deletion Block', () => {
    expect(DeploymentManage.permanentDelText.getText()).to.eql(
      'Erase this environment from the surface of the universe. Proceed with caution.'
    )
  })

  it('should check whether Delete Environment button is visible', () => {
    DeploymentManage.deleteBtn.waitForVisible()
    expect(DeploymentManage.deleteBtn.isVisible()).to.eql(true)
  })

  // it('should check whether pop-up is displayed with title Delete Application-default when Delete Environment btn is clicked', () => {
  //     DeploymentCreate.getenvCardSelect(2).click()
  //     DeploymentCreate.getenvCardLink(4).click()
  //     DeploymentManage.deleteBtn.click()
  //     DeploymentManage.deletePopupText.waitForExist()
  //     browser.pause(100000)
  //     expect(DeploymentManage.deletePopupText.getText()).to.eql('Delete Application - default')
  // })

  // it('should check whether pop-up description,Text inside the input field, Do Nothing btn and Delete Environment btn are visible', () => {
  //     expect(DeploymentManage.delPopupDescription.getText()).to.eql(
  //     'Permanently delete this environment () - projects requiring this environment will not be able to function properly.'
  //     )
  //     DeploymentManage.deleteInput.waitForVisible()
  //     expect(DeploymentManage.deleteInput.isVisible()).to.eql(true)
  //     DeploymentManage.doNothingBtn.waitForVisible()
  //     expect(DeploymentManage.doNothingBtn.isVisible()).to.eql(true)
  //     DeploymentManage.deleteEnvBtn.waitForVisible()
  //     expect(DeploymentManage.deleteEnvBtn.isVisible()).to.eql(true)
  // })

  it('should type DELETE in the input field of the pop-up', () => {
    DeploymentCreate.getenvCardSelect(3).click()
    browser.pause(2000)
    browser.scroll(0, 3000)
    DeploymentManage.deleteEnv.click()
    DeploymentManage.confirmDeleteInput.setValue(
      testData.kintoblock.deleteEnvironment
    )
  })

  it('should check whether delete btn in pop-up is enabled when delete is typed', () => {
    var title = DeploymentManage.envDeletePopTitle.getText().split(' - ')
    var envName = title[1]
    expect(DeploymentManage.envDeleteBtn.isEnabled()).to.eql(true)
    DeploymentManage.envDeleteBtn.click()
    browser.pause(2000)
    expect(KintoBlockManage.kbSuccessMsg.getText()).to.eql(
      `The environment "${envName}" has been successfully deleted.`
    )
  })

  it('should check whether the deleted env card is visible', () => {
    expect(DeploymentCreate.getenvCardSelect(5).isVisible()).to.eql(false)
  })

  it('should click on question mark in kintoblock link and check whether the pop-up message is visible', () => {
    DeploymentCreate.getenvCardLink(2).click()
    browser.scroll(0, 400)
    DeploymentManage.toolTip.click()
    expect(DeploymentManage.toolTip.isVisible()).to.eql(true)
    browser.pause(10000)
    browser.scroll(0, 800)
  })

  it('should click on configure dependencies in kintoblock link and should be navigated to configure page', () => {
    DeploymentManage.configDependencyBtn.click()
    browser.pause(20000)
    DeploymentManage.logout()
  })
})

describe('Environment - Add env variables and click on copy variables to clipboard button', () => {
  it('Sign-up as new user and link workspace to GitHub', () => {
    Login.registerAndLogin('NB')
    WorkspaceManage.linkGithub()
    Landing.workspaceSelect.waitForVisible()
  })

  it('Create KintoBlock for language Node.js for version 11.7.0', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs1,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Node.js KintoBlock for version 11.7.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Node.js KintoBlock for version 11.7.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether Node.js KintoBlock for version 11.7.0 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should add environment variables in KB Manage Page', () => {
    browser.scroll(0, 800)
    KintoBlockManage.addCustomKey.waitForVisible()
    KintoBlockManage.addCustomKey.setValue(
      testData.kintoblock.validEnvKeyForApiCall
    )
    KintoBlockManage.addCustomValue.setValue(
      testData.kintoblock.validEnvValueForApiCall
    )
    KintoBlockManage.requiredToggleForCustomParam.click()
    KintoBlockManage.addIconOfCustomParam.click()
    browser.pause(2000)
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.submitGlobal()
  })

  it('should check whether Copy variables to clipboard button is visible', () => {
    KintoBlockManage.copyVarBtn.waitForVisible()
    expect(KintoBlockManage.copyVarBtn.isVisible()).to.eql(true)
  })

  it('should check whether the copy variables to clipboard btn is clickable', () => {
    KintoBlockManage.copyVarBtn.click()
  })

  it('should deploy the KB using Add to Deployment in KB manage page', () => {
    KintoBlockManage.addToDeployment()
    KintoBlockManage.addToNewDeployment()
  })

  it('should click on configure kintoblocks and check for required label', () => {
    browser.scroll(0, 600)
    DeploymentManage.configDependencyBtn.waitForVisible()
    DeploymentManage.configDependencyBtn.click()
  })

  it('should check whether environment variables name and value', () => {
    browser.pause(30000)
    DeploymentManage.envParamName.waitForVisible()
    expect(DeploymentManage.envParamName.isVisible()).to.eql(true)
    DeploymentManage.envParamValue.waitForVisible()
    expect(DeploymentManage.envParamValue.isVisible()).to.eql(true)
  })

  it('should check for required label in environment variables page', () => {
    DeploymentManage.requiredLabel.waitForVisible()
    expect(DeploymentManage.requiredLabel.isVisible()).to.eql(true)
  })
})
