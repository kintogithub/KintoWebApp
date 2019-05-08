import { expect } from 'chai'
import Login from '../page-objects/login.page'
import testData from '../constants/testdata.json'
import Landing from '../page-objects/landing.page'
import WorkspaceCreate from '../page-objects/workspace.create.page'
import WorkspaceManage from '../page-objects/workspace.manage.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import DeploymentCreate from '../page-objects/deployment.create.page'
import DeploymentManage from '../page-objects/deployment.manage.page'
import DeploymentList from '../page-objects/deployment.list.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import EnvironmentManage from '../page-objects/environment.manage.page'
import ServicesPage from '../page-objects/services.page'

var currentTime = new Date()
var kbName
var randomNumbers

describe('MongoDB', () => {
  //Services page
  //TC_1368
  it('should navigate user to services page, when user clicks on "Services" on the left navigation bar', () => {
    Login.registerAndLogin('MSP')
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.servicesLeftnav.click()
    ServicesPage.loadingFinished.waitForExist()
    ServicesPage.serviceSection.waitForVisible()
    expect(ServicesPage.serviceSection.isVisible()).to.eql(true)
  })

  //TC_1369
  it('should navigate user to services page, when user enters url of "Services" page', () => {
    var url = browser.getUrl()
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
    browser.url(url)
    ServicesPage.loadingFinished.waitForExist()
    ServicesPage.serviceSection.waitForVisible()
    expect(ServicesPage.serviceSection.isVisible()).to.eql(true)
  })

  //TC_1370
  it('should display "Services" page title and subtitle', () => {
    expect(ServicesPage.title.getText()).to.eql('Services')
    expect(ServicesPage.subTitle.getText()).to.eql('KintoBlock Services')
  })

  //TC_1371
  it('should display three types of "KintoBlock" services in "Service" page', () => {
    expect(ServicesPage.getServiceCards(1).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(2).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(3).isVisible()).to.eql(true)
  })

  //TC_1372
  it('should verify "MongoDB" service card is displayed as per logic before enabling Mongo service', () => {
    expect(ServicesPage.addIconForMongoService.isVisible()).to.eql(true)
    expect(ServicesPage.mongoDBMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(1).getText()).to.eql('MongoDB')
    expect(ServicesPage.getServiceCardSubtitle(1).getText()).to.eql(
      'Powerful No-SQL Database for your KintoBlocks and Applications'
    )
    expect(ServicesPage.getAddBtnInServiceCard(1).isVisible()).to.eql(true)
    expect(ServicesPage.getAddBtnInServiceCard(1).getText()).to.eql(
      'Add MongoDB'
    )
    expect(ServicesPage.getServiceCardFooter(1, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1374
  it('should verify informatory slide about MongoDB with "Enable MongoDB" button is displayed, when user clicks on "Add MongoDB" button', () => {
    ServicesPage.getAddBtnInServiceCard(1).click()
    browser.pause(5000)
    ServicesPage.mongoDBInformativeText.waitForVisible()
    expect(ServicesPage.mongoDBInformativeText.isVisible()).to.eql(true)
    expect(ServicesPage.enableAndDisableMongoDBBtn.isVisible()).to.eql(true)
    expect(ServicesPage.enableAndDisableMongoDBBtn.getText()).to.eql(
      'Enable MongoDB'
    )
  })

  //TC_1375
  it('should verify "MongoDB" service card is displayed as per logic after enabling Mongo service', () => {
    ServicesPage.enableAndDisableMongoDBBtn.click()
    browser.pause(2000)
    ServicesPage.loadingFinished.waitForExist()
    expect(ServicesPage.addIconForMongoService.isVisible()).to.eql(false)
    expect(ServicesPage.tickIconForMongoService.isVisible()).to.eql(true)
    expect(ServicesPage.viewDetailsButton.getText()).to.eql('View Details')
    expect(ServicesPage.getServiceCardFooter(1, 'enabled').getText()).to.eql(
      'Enabled'
    )
  })

  //TC_1376
  it('should verify informatory slide about MongoDB with "Enabled" button is displayed, when user clicks on "View Details" button', () => {
    //Closing the slide
    ServicesPage.viewDetailsButton.click()
    browser.pause(2000)
    //Again opening the slide
    ServicesPage.viewDetailsButton.click()
    browser.pause(2000)
    ServicesPage.mongoDBInformativeText.waitForVisible()
    expect(ServicesPage.mongoDBInformativeText.isVisible()).to.eql(true)
    expect(ServicesPage.enableAndDisableMongoDBBtn.getText()).to.eql('Enabled')
  })

  //TC_1377
  it('should display "coming" text, icon, title, subtitle, "Add" button and "disabled" text in "Message Passing" service section card', () => {
    expect(ServicesPage.getServiceCardsComingText(2).getText()).to.eql('Coming')
    expect(ServicesPage.messagePassingMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(2).getText()).to.eql(
      'Message Passing'
    )
    expect(ServicesPage.getServiceCardSubtitle(2).getText()).to.eql(
      'Queuing services and message routing for your KintoBlocks and Applications'
    )
    expect(ServicesPage.getAddBtnInServiceCard(2).isVisible()).to.eql(true)
    expect(ServicesPage.getAddBtnInServiceCard(2).getText()).to.eql(
      'Add Message Passing'
    )
    expect(ServicesPage.getServiceCardFooter(2, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1378
  it('should display "coming" text, icon, title, subtitle, "Add" button and "disabled" text in "Shared Memory" service section card', () => {
    expect(ServicesPage.getServiceCardsComingText(3).getText()).to.eql('Coming')
    expect(ServicesPage.sharedMemoryMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(3).getText()).to.eql(
      'Shared Memory'
    )
    expect(ServicesPage.getServiceCardSubtitle(3).getText()).to.eql(
      'Make memory available across your different KintoBlocks'
    )
    expect(ServicesPage.getAddBtnInServiceCard(3).isVisible()).to.eql(true)
    expect(ServicesPage.getAddBtnInServiceCard(3).getText()).to.eql(
      'Add Shared Memory'
    )
    expect(ServicesPage.getServiceCardFooter(3, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1379
  //TODO for checking whether button is not clickable

  //TC_1380
  it('should verify whether "MongoDB" service enabled in "Service" page is reflected in KA create, manage and tagged pages', () => {
    //KA create page
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    ServicesPage.getServiceCardFooter(1, 'enabled').moveToObject()
    expect(ServicesPage.getServiceCardFooter(1, 'enabled').getText()).to.eql(
      'Enabled'
    )
    //KA manage page
    var kaName =
      testData.kintoapp.validKintoAppName + currentTime.getTime() + '081'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    DeploymentCreate.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    ServicesPage.getServiceCardFooter(1, 'enabled').moveToObject()
    expect(ServicesPage.getServiceCardFooter(1, 'enabled').getText()).to.eql(
      'Enabled'
    )
    //KA tagged page
    DeploymentManage.kaTagNDeploy.waitForVisible()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.waitForVisible()
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('0')
    DeploymentManage.minorVersion.setValue('0')
    DeploymentManage.revision.setValue('1')
    DeploymentManage.notes.click()
    DeploymentManage.notes.setValue(testData.kintoapp.validTagNotes)
    DeploymentManage.createTagBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.deploySuccessBtn()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.loadingFinished.waitForExist()
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.draftDropDownFromBreadcrumb.click()
    DeploymentManage.draftDropDownVisible.waitForVisible()
    DeploymentManage.draftDropDownFilter.setValue('0.0.1')
    DeploymentManage.getTagNumberFromDraftDropDown(1).waitForVisible()
    DeploymentManage.getTagNumberFromDraftDropDown(1).leftClick()
    DeploymentManage.loadingFinished.waitForExist()
    ServicesPage.getServiceCardFooter(1, 'enabled').moveToObject()
    expect(ServicesPage.getServiceCardFooter(1, 'enabled').getText()).to.eql(
      'Enabled'
    )
  })

  //KA create page
  //TC_1380
  it('should display three types of "KintoBlock" services in "KA create" page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(ServicesPage.getServiceCards(1).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(2).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(3).isVisible()).to.eql(true)
  })

  //TC_1381
  it('should verify whether "MongoDB" service is disabled in "KA create page", if its disabled in "Services" page', () => {
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
    DashboardIndex.applicationLeftnav.click()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    expect(ServicesPage.getServiceCardFooter(1, 'disabled').getText()).to.eql(
      'Disabled'
    )
    DashboardIndex.servicesLeftnav.click()
    ServicesPage.loadingFinished.waitForExist()
    ServicesPage.serviceSection.waitForVisible()
    expect(ServicesPage.getServiceCardFooter(1, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1382
  it('should verify "MongoDB" service card is displayed as per logic in KA create page before enabling Mongo service', () => {
    DashboardIndex.applicationLeftnav.click()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(ServicesPage.addIconForMongoService.isVisible()).to.eql(true)
    expect(ServicesPage.mongoDBMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(1).getText()).to.eql('MongoDB')
    expect(ServicesPage.getServiceCardSubtitle(1).getText()).to.eql(
      'Powerful No-SQL Database for your KintoBlocks and Applications'
    )
    expect(ServicesPage.getAddBtnInServiceCard(1).isVisible()).to.eql(true)
    expect(ServicesPage.getAddBtnInServiceCard(1).getText()).to.eql(
      'Add MongoDB'
    )
    expect(ServicesPage.getServiceCardFooter(1, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1384
  it('should verify informatory slide about MongoDB with "Enable MongoDB" button is displayed in KA create page, when user clicks on "Add MongoDB" button', () => {
    ServicesPage.getAddBtnInServiceCard(1).click()
    browser.pause(2000)
    ServicesPage.mongoDBInformativeText.waitForVisible()
    expect(ServicesPage.mongoDBInformativeText.isVisible()).to.eql(true)
    expect(ServicesPage.enableAndDisableMongoDBBtn.isVisible()).to.eql(true)
    expect(ServicesPage.enableAndDisableMongoDBBtn.getText()).to.eql(
      'Enable MongoDB'
    )
  })

  //TC_1385
  it('should verify "MongoDB" service card is displayed as per logic in KA create page after enabling Mongo service', () => {
    ServicesPage.enableAndDisableMongoDBBtn.moveToObject()
    ServicesPage.enableAndDisableMongoDBBtn.click()
    browser.pause(2000)
    ServicesPage.loadingFinished.waitForExist()
    expect(ServicesPage.addIconForMongoService.isVisible()).to.eql(false)
    expect(ServicesPage.tickIconForMongoService.isVisible()).to.eql(true)
    expect(ServicesPage.viewDetailsButton.getText()).to.eql('View Details')
    expect(ServicesPage.getServiceCardFooter(1, 'enabled').getText()).to.eql(
      'Enabled'
    )
  })

  //TC_1386
  it('should display "coming" text, icon, title, subtitle, "Add" button and "disabled" text in "Message Passing" service section card in KA create page', () => {
    expect(ServicesPage.getServiceCardsComingText(2).getText()).to.eql('Coming')
    expect(ServicesPage.messagePassingMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(2).getText()).to.eql(
      'Message Passing'
    )
    expect(ServicesPage.getServiceCardSubtitle(2).getText()).to.eql(
      'Queuing services and message routing for your KintoBlocks and Applications'
    )
    expect(ServicesPage.getAddBtnInServiceCard(2).isVisible()).to.eql(true)
    expect(ServicesPage.getAddBtnInServiceCard(2).getText()).to.eql(
      'Add Message Passing'
    )
    expect(ServicesPage.getServiceCardFooter(2, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1387
  it('should display "coming" text, icon, title, subtitle, "Add" button and "disabled" text in "Shared Memory" service section card in KA create page', () => {
    expect(ServicesPage.getServiceCardsComingText(3).getText()).to.eql('Coming')
    expect(ServicesPage.sharedMemoryMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(3).getText()).to.eql(
      'Shared Memory'
    )
    expect(ServicesPage.getServiceCardSubtitle(3).getText()).to.eql(
      'Make memory available across your different KintoBlocks'
    )
    expect(ServicesPage.getAddBtnInServiceCard(3).isVisible()).to.eql(true)
    expect(ServicesPage.getAddBtnInServiceCard(3).getText()).to.eql(
      'Add Shared Memory'
    )
    expect(ServicesPage.getServiceCardFooter(3, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1388
  it('should verify whether mongoDB service is enabled in "services" page, when mongoDB service is enabled in KA create page', () => {
    //Already enabled in KA create page
    expect(ServicesPage.getServiceCardFooter(1, 'enabled').getText()).to.eql(
      'Enabled'
    )
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.servicesLeftnav.click()
    ServicesPage.loadingFinished.waitForExist()
    ServicesPage.serviceSection.waitForVisible()
    expect(ServicesPage.getServiceCardFooter(1, 'enabled').getText()).to.eql(
      'Enabled'
    )
  })

  //KA manage page
  //TC_1389
  it('should display three types of "KintoBlock" services in "KA manage" page', () => {
    ServicesPage.logout()
    Login.registerAndLogin('MSP2')
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.applicationLeftnav.click()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    var kaName = testData.kintoapp.validKintoAppName + currentTime.getTime()
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    DeploymentCreate.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(ServicesPage.getServiceCards(1).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(2).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(3).isVisible()).to.eql(true)
  })

  //TC_1390
  it('should verify whether "MongoDB" service is disabled in "KA manage page", if its disabled in "Services" page', () => {
    browser.scroll(0, 2000)
    expect(ServicesPage.getServiceCardFooter(1, 'disabled').getText()).to.eql(
      'Disabled'
    )
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.servicesLeftnav.click()
    ServicesPage.loadingFinished.waitForExist()
    ServicesPage.serviceSection.waitForVisible()
    expect(ServicesPage.getServiceCardFooter(1, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1391
  it('should verify "MongoDB" service card is displayed as per logic in KA manage page before enabling Mongo service', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(ServicesPage.addIconForMongoService.isVisible()).to.eql(true)
    expect(ServicesPage.mongoDBMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(1).getText()).to.eql('MongoDB')
    expect(ServicesPage.getServiceCardSubtitle(1).getText()).to.eql(
      'Powerful No-SQL Database for your KintoBlocks and Applications'
    )
    expect(ServicesPage.getAddBtnInServiceCard(1).isVisible()).to.eql(true)
    expect(ServicesPage.getAddBtnInServiceCard(1).getText()).to.eql(
      'Add MongoDB'
    )
    expect(ServicesPage.getServiceCardFooter(1, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1393
  it('should verify informatory slide about MongoDB with "Enable MongoDB" button is displayed in KA msnage page, when user clicks on "Add MongoDB" button', () => {
    ServicesPage.getAddBtnInServiceCard(1).click()
    browser.pause(2000)
    ServicesPage.mongoDBInformativeText.waitForVisible()
    expect(ServicesPage.mongoDBInformativeText.isVisible()).to.eql(true)
    expect(ServicesPage.enableAndDisableMongoDBBtn.isVisible()).to.eql(true)
    ServicesPage.enableAndDisableMongoDBBtn.moveToObject()
    expect(ServicesPage.enableAndDisableMongoDBBtn.getText()).to.eql(
      'Enable MongoDB'
    )
  })

  //TC_1394
  it('should verify "MongoDB" service card is displayed as per logic in KA manage page after enabling Mongo service', () => {
    ServicesPage.enableAndDisableMongoDBBtn.click()
    browser.pause(2000)
    ServicesPage.loadingFinished.waitForExist()
    expect(ServicesPage.addIconForMongoService.isVisible()).to.eql(false)
    expect(ServicesPage.tickIconForMongoService.isVisible()).to.eql(true)
    expect(ServicesPage.viewDetailsButton.getText()).to.eql('View Details')
    expect(ServicesPage.getServiceCardFooter(1, 'enabled').getText()).to.eql(
      'Enabled'
    )
  })

  //TC_1395
  it('should display "coming" text, icon, title, subtitle, "Add" button and "disabled" text in "Message Passing" service section card in KA manage page', () => {
    expect(ServicesPage.getServiceCardsComingText(2).getText()).to.eql('Coming')
    expect(ServicesPage.messagePassingMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(2).getText()).to.eql(
      'Message Passing'
    )
    expect(ServicesPage.getServiceCardSubtitle(2).getText()).to.eql(
      'Queuing services and message routing for your KintoBlocks and Applications'
    )
    expect(ServicesPage.getAddBtnInServiceCard(2).isVisible()).to.eql(true)
    expect(ServicesPage.getAddBtnInServiceCard(2).getText()).to.eql(
      'Add Message Passing'
    )
    expect(ServicesPage.getServiceCardFooter(2, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1396
  it('should display "coming" text, icon, title, subtitle, "Add" button and "disabled" text in "Shared Memory" service section card in KA manage page', () => {
    expect(ServicesPage.getServiceCardsComingText(3).getText()).to.eql('Coming')
    expect(ServicesPage.sharedMemoryMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(3).getText()).to.eql(
      'Shared Memory'
    )
    expect(ServicesPage.getServiceCardSubtitle(3).getText()).to.eql(
      'Make memory available across your different KintoBlocks'
    )
    expect(ServicesPage.getAddBtnInServiceCard(3).isVisible()).to.eql(true)
    expect(ServicesPage.getAddBtnInServiceCard(3).getText()).to.eql(
      'Add Shared Memory'
    )
    expect(ServicesPage.getServiceCardFooter(3, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1397
  it('should verify whether mongoDB service is enabled in "services" page, when mongoDB service is enabled in KA manage page', () => {
    //Already enabled in KA manage page
    expect(ServicesPage.getServiceCardFooter(1, 'enabled').getText()).to.eql(
      'Enabled'
    )
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.servicesLeftnav.click()
    ServicesPage.loadingFinished.waitForExist()
    ServicesPage.serviceSection.waitForVisible()
    expect(ServicesPage.getServiceCardFooter(1, 'enabled').getText()).to.eql(
      'Enabled'
    )
  })

  //TC_1398
  it('should create a workspace, link "GitHub" and create a KB', () => {
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
    WorkspaceManage.linkGithub()
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomNumbers = KintoBlockCreate.randomNumbers()
    kbName =
      testData.kintoblock.validKintoBlockNameWithDigit + '26' + randomNumbers
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    KintoBlockCreate.language.input.selectByIndex(1)
    KintoBlockCreate.protocol.input.selectByIndex(1)
    KintoBlockCreate.repositoryType.input.selectByIndex(1)
    KintoBlockCreate.selectExistingRepository()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForVisible()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether KB build is moved to PROCESSING ', () => {
    KintoBlockCreate.checkforProcessing()
  })

  it('should check whether KB build is moved to success or failed', () => {
    KintoBlockCreate.checkForSuccessOrFailed()
  })

  it('should verify validation error message is displayed, when user try to deploy a KA without enabling mongoDB service but has a KB with mongoDB enabled', () => {
    DashboardIndex.applicationLeftnav.click()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    var kaName = testData.kintoapp.validKintoAppName + currentTime.getTime()
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(kbName)
    DeploymentCreate.getFilteredKB(kbName).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.minorVersion.setValue('3')
    DeploymentManage.revision.setValue('5')
    DeploymentManage.notes.click()
    DeploymentManage.notes.setValue(testData.kintoapp.validTagNotes)
    DeploymentManage.createTagBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.mongoErrorMsg.waitForVisible()
    expect(DeploymentManage.mongoErrorMsg.getText()).to.eql(
      'Application requires services to be active: MONGODB'
    )
  })

  //KA tagged page
  //TC_1399
  it('should display three types of "KintoBlock" services in "KA tagged" page', () => {
    DeploymentManage.cancelTagBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    DashboardIndex.applicationLeftnav.click()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    var kaName =
      testData.kintoapp.validKintoAppName + currentTime.getTime() + '187'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(testData.kintoblock.validHelloWorldKB)
    DeploymentCreate.getFilteredKB('helloworld').waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kaTagNDeploy.click()
    DeploymentManage.majorVersion.click()
    DeploymentManage.majorVersion.setValue('1')
    DeploymentManage.minorVersion.setValue('3')
    DeploymentManage.revision.setValue('5')
    DeploymentManage.notes.click()
    DeploymentManage.notes.setValue(testData.kintoapp.validTagNotes)
    DeploymentManage.createTagBtn.click()
    DeploymentManage.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.draftDropDownFromBreadcrumb.click()
    DeploymentManage.getTagNumberFromDraftDropDown(2).waitForVisible()
    DeploymentManage.getTagNumberFromDraftDropDown(2).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(ServicesPage.getServiceCards(1).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(2).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(3).isVisible()).to.eql(true)
  })

  //TC_1400
  it('should verify whether "MongoDB" service is disabled in "KA tagged page", if its disabled in "Services" page', () => {
    ServicesPage.getServiceCardFooter(1, 'disabled').moveToObject()
    expect(ServicesPage.getServiceCardFooter(1, 'disabled').getText()).to.eql(
      'Disabled'
    )
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.servicesLeftnav.click()
    ServicesPage.loadingFinished.waitForExist()
    ServicesPage.serviceSection.waitForVisible()
    expect(ServicesPage.getServiceCardFooter(1, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1401
  it('should verify "MongoDB" service card is displayed as per logic in KA tagged page before enabling Mongo service', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.getCard(1).waitForVisible()
    DeploymentList.getCard(1).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.draftDropDownFromBreadcrumb.click()
    DeploymentManage.getTagNumberFromDraftDropDown(2).waitForVisible()
    DeploymentManage.getTagNumberFromDraftDropDown(2).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(ServicesPage.addIconForMongoService.isVisible()).to.eql(true)
    expect(ServicesPage.mongoDBMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(1).getText()).to.eql('MongoDB')
    expect(ServicesPage.getServiceCardSubtitle(1).getText()).to.eql(
      'Powerful No-SQL Database for your KintoBlocks and Applications'
    )
    expect(ServicesPage.getAddBtnInServiceCard(1).isVisible()).to.eql(true)
    expect(ServicesPage.getAddBtnInServiceCard(1).getText()).to.eql(
      'Add MongoDB'
    )
    expect(ServicesPage.getServiceCardFooter(1, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1403
  it('should verify informatory slide about MongoDB with "Enable MongoDB" button is displayed in KA tagged page, when user clicks on "Add MongoDB" button', () => {
    ServicesPage.getAddBtnInServiceCard(1).click()
    browser.pause(2000)
    ServicesPage.mongoDBInformativeText.waitForVisible()
    expect(ServicesPage.mongoDBInformativeText.isVisible()).to.eql(true)
    expect(ServicesPage.enableAndDisableMongoDBBtn.isVisible()).to.eql(true)
    expect(ServicesPage.enableAndDisableMongoDBBtn.getText()).to.eql(
      'Enable MongoDB'
    )
  })

  //TC_1404
  it('should verify "MongoDB" service card is displayed as per logic in KA tagged page after enabling Mongo service', () => {
    ServicesPage.enableAndDisableMongoDBBtn.moveToObject()
    ServicesPage.enableAndDisableMongoDBBtn.click()
    browser.pause(2000)
    ServicesPage.loadingFinished.waitForExist()
    expect(ServicesPage.addIconForMongoService.isVisible()).to.eql(false)
    expect(ServicesPage.tickIconForMongoService.isVisible()).to.eql(true)
    expect(ServicesPage.viewDetailsButton.getText()).to.eql('View Details')
    expect(ServicesPage.getServiceCardFooter(1, 'enabled').getText()).to.eql(
      'Enabled'
    )
  })

  //TC_1405
  it('should display "coming" text, icon, title, subtitle, "Add" button and "disabled" text in "Message Passing" service section card in KA tagged page', () => {
    expect(ServicesPage.getServiceCardsComingText(2).getText()).to.eql('Coming')
    expect(ServicesPage.messagePassingMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(2).getText()).to.eql(
      'Message Passing'
    )
    expect(ServicesPage.getServiceCardSubtitle(2).getText()).to.eql(
      'Queuing services and message routing for your KintoBlocks and Applications'
    )
    expect(ServicesPage.getAddBtnInServiceCard(2).isVisible()).to.eql(true)
    expect(ServicesPage.getAddBtnInServiceCard(2).getText()).to.eql(
      'Add Message Passing'
    )
    expect(ServicesPage.getServiceCardFooter(2, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1406
  it('should display "coming" text, icon, title, subtitle, "Add" button and "disabled" text in "Shared Memory" service section card in KA tagged page', () => {
    expect(ServicesPage.getServiceCardsComingText(3).getText()).to.eql('Coming')
    expect(ServicesPage.sharedMemoryMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(3).getText()).to.eql(
      'Shared Memory'
    )
    expect(ServicesPage.getServiceCardSubtitle(3).getText()).to.eql(
      'Make memory available across your different KintoBlocks'
    )
    expect(ServicesPage.getAddBtnInServiceCard(3).isVisible()).to.eql(true)
    expect(ServicesPage.getAddBtnInServiceCard(3).getText()).to.eql(
      'Add Shared Memory'
    )
    expect(ServicesPage.getServiceCardFooter(3, 'disabled').getText()).to.eql(
      'Disabled'
    )
  })

  //TC_1407
  it('should verify whether mongoDB service is enabled in "services" page, when mongoDB service is enabled in KA tagged page', () => {
    //Already enabled in KA manage page
    expect(ServicesPage.getServiceCardFooter(1, 'enabled').getText()).to.eql(
      'Enabled'
    )
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.servicesLeftnav.click()
    ServicesPage.loadingFinished.waitForExist()
    ServicesPage.serviceSection.waitForVisible()
    expect(ServicesPage.getServiceCardFooter(1, 'enabled').getText()).to.eql(
      'Enabled'
    )
  })

  //KB manage page microservice
  //TC_1408
  it('should create a KB for checking services in KB micro service manage', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomNumbers = KintoBlockCreate.randomNumbers()
    kbName = testData.kintoblock.validUpdatedKBName + '9' + randomNumbers
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    KintoBlockCreate.language.input.selectByIndex(1)
    KintoBlockCreate.protocol.input.selectByIndex(1)
    KintoBlockCreate.repositoryType.input.selectByIndex(1)
    KintoBlockCreate.selectExistingRepository()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForVisible()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the KintoBlock to move to PROCESSING', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock to move to PROCESSING', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock to move to PROCESSING', () => {
    browser.pause(100000)
  })

  it('should check whether KB build is moved to PROCESSING ', () => {
    KintoBlockCreate.checkforProcessing()
  })

  it('should check whether KB build is moved to success or failed', () => {
    KintoBlockCreate.checkForSuccessOrFailed()
  })

  //TC_1408
  it('should verify "Kintoblock services" are displayed in KB manage page', () => {
    ServicesPage.getServiceCards(1).moveToObject()
    expect(ServicesPage.getServiceCards(1).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(2).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(3).isVisible()).to.eql(true)
  })

  //TC_1409
  it('should verify "MongoDB" service card in KB manage displays "mongo" icon, title, subtitle and toggle switch', () => {
    expect(ServicesPage.mongoDBMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(1).getText()).to.eql('MongoDB')
    expect(ServicesPage.getServiceCardSubtitle(1).getText()).to.eql(
      'Powerful No-SQL Database for your KintoBlocks and Applications'
    )
    expect(
      ServicesPage.getToggleSwitchOfServicesInKB('MONGODB').isVisible()
    ).to.eql(true)
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //TC_1410
  it('should display "coming" text, icon, title, subtitle and "toggle switch" in "Message Passing" service section card in KB manage page', () => {
    expect(ServicesPage.getServiceCardsComingText(2).getText()).to.eql('Coming')
    expect(ServicesPage.messagePassingMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(2).getText()).to.eql(
      'Message Passing'
    )
    expect(ServicesPage.getServiceCardSubtitle(2).getText()).to.eql(
      'Queuing services and message routing for your KintoBlocks and Applications'
    )
    expect(
      ServicesPage.getToggleSwitchOfServicesInKB('MESSAGEPASSING').isVisible()
    ).to.eql(true)
    expect(ServicesPage.getToggleMessageOfServicesCards(2).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //TC_1411
  it('should display "coming" text, icon, title, subtitle and "toggle switch" in "Shared Memory" service section card in KB manage page', () => {
    expect(ServicesPage.getServiceCardsComingText(3).getText()).to.eql('Coming')
    expect(ServicesPage.sharedMemoryMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(3).getText()).to.eql(
      'Shared Memory'
    )
    expect(ServicesPage.getServiceCardSubtitle(3).getText()).to.eql(
      'Make memory available across your different KintoBlocks'
    )
    expect(
      ServicesPage.getToggleSwitchOfServicesInKB('SHAREDMEMORY').isVisible()
    ).to.eql(true)
    expect(ServicesPage.getToggleMessageOfServicesCards(3).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //TC_1412
  it('should switch on "toggle" switch for mongodb service card in KB manage page, when users switches on the "toggle" bar', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'Activate This Dependency'
    )
    ServicesPage.getToggleSwitchOfServicesInKB('MONGODB').click()
    browser.pause(5000)
  })

  //TC_1413
  it('should change toggle text as "This Dependency is Active" in KB manage page, when toggle switch is switched on', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'This Dependency is Active'
    )
  })

  //TC_1414
  it('should switch off "toggle" switch for mongodb service card in KB manage page, when users switches off the "toggle" bar', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'This Dependency is Active'
    )
    ServicesPage.getToggleSwitchOfServicesInKB('MONGODB').click()
    browser.pause(5000)
  })

  //TC_1415
  it('should change toggle text as "Activate This Dependency" in KB manage page, when toggle switch is switched off', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //KB tagged page microservice
  //TC_1416
  it('should verify "Kintoblock services" are displayed in KB tagged page', () => {
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.tagLatestCommitBtn.click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.setValue('0')
    KintoBlockManage.revision.setValue('1')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    ServicesPage.getServiceCards(1).moveToObject()
    expect(ServicesPage.getServiceCards(1).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(2).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(3).isVisible()).to.eql(true)
  })

  //TC_1417
  it('should verify "MongoDB" service card in KB tagged displays "mongo" icon, title, subtitle and toggle switch', () => {
    expect(ServicesPage.mongoDBMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(1).getText()).to.eql('MongoDB')
    expect(ServicesPage.getServiceCardSubtitle(1).getText()).to.eql(
      'Powerful No-SQL Database for your KintoBlocks and Applications'
    )
    expect(
      ServicesPage.getToggleSwitchOfServicesInKB('MONGODB').isVisible()
    ).to.eql(true)
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //TC_1418
  it('should display "coming" text, icon, title, subtitle and "toggle switch" in "Message Passing" service section card in KB tagged page', () => {
    expect(ServicesPage.getServiceCardsComingText(2).getText()).to.eql('Coming')
    expect(ServicesPage.messagePassingMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(2).getText()).to.eql(
      'Message Passing'
    )
    expect(ServicesPage.getServiceCardSubtitle(2).getText()).to.eql(
      'Queuing services and message routing for your KintoBlocks and Applications'
    )
    expect(
      ServicesPage.getToggleSwitchOfServicesInKB('MESSAGEPASSING').isVisible()
    ).to.eql(true)
    expect(ServicesPage.getToggleMessageOfServicesCards(2).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //TC_1419
  it('should display "coming" text, icon, title, subtitle and "toggle switch" in "Shared Memory" service section card in KB tagged page', () => {
    expect(ServicesPage.getServiceCardsComingText(3).getText()).to.eql('Coming')
    expect(ServicesPage.sharedMemoryMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(3).getText()).to.eql(
      'Shared Memory'
    )
    expect(ServicesPage.getServiceCardSubtitle(3).getText()).to.eql(
      'Make memory available across your different KintoBlocks'
    )
    expect(
      ServicesPage.getToggleSwitchOfServicesInKB('SHAREDMEMORY').isVisible()
    ).to.eql(true)
    expect(ServicesPage.getToggleMessageOfServicesCards(3).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //TC_1420
  it('should switch on "toggle" switch for mongodb service card in KB tagged page, when users switches on the "toggle" bar', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'Activate This Dependency'
    )
    ServicesPage.getToggleSwitchOfServicesInKB('MONGODB').click()
    browser.pause(5000)
  })

  //TC_1421
  it('should change toggle text as "This Dependency is Active" in KB tagged page, when toggle switch is switched on', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'This Dependency is Active'
    )
  })

  //TC_1422
  it('should switch off "toggle" switch for mongodb service card in KB tagged page, when users switches off the "toggle" bar', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'This Dependency is Active'
    )
    ServicesPage.getToggleSwitchOfServicesInKB('MONGODB').click()
    browser.pause(5000)
  })

  //TC_1423
  it('should change toggle text as "Activate This Dependency" in KB tagged page, when toggle switch is switched off', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //KB manage website
  //TC_1424
  it('should create a KB for checking services in KB website manage', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomNumbers = KintoBlockCreate.randomNumbers()
    kbName = testData.kintoblock.validUpdatedKBName + '9' + randomNumbers
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    KintoBlockCreate.repositoryType.input.selectByIndex(1)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(
      testData.kintoblock.validHelloWorldExampleRepoForWebSite
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the website KintoBlock to move to PROCESSING', () => {
    browser.pause(100000)
  })

  it('should wait for the website KintoBlock to move to PROCESSING', () => {
    browser.pause(100000)
  })

  it('should wait for the website KintoBlock to move to PROCESSING', () => {
    browser.pause(100000)
  })

  it('should check whether website KB build is moved to PROCESSING ', () => {
    KintoBlockCreate.checkforProcessing()
  })

  it('should check whether website KB build is moved to success or failed', () => {
    KintoBlockCreate.checkForSuccessOrFailed()
  })

  //TC_1424
  it('should verify "Kintoblock services" are displayed in KB website manage page', () => {
    ServicesPage.getServiceCards(1).moveToObject()
    expect(ServicesPage.getServiceCards(1).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(2).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(3).isVisible()).to.eql(true)
  })

  //TC_1425
  it('should verify "MongoDB" service card in KB website manage displays "mongo" icon, title, subtitle and toggle switch', () => {
    expect(ServicesPage.mongoDBMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(1).getText()).to.eql('MongoDB')
    expect(ServicesPage.getServiceCardSubtitle(1).getText()).to.eql(
      'Powerful No-SQL Database for your KintoBlocks and Applications'
    )
    expect(
      ServicesPage.getToggleSwitchOfServicesInKB('MONGODB').isVisible()
    ).to.eql(true)
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //TC_1426
  it('should display "coming" text, icon, title, subtitle and "toggle switch" in "Message Passing" service section card in KB website manage page', () => {
    expect(ServicesPage.getServiceCardsComingText(2).getText()).to.eql('Coming')
    expect(ServicesPage.messagePassingMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(2).getText()).to.eql(
      'Message Passing'
    )
    expect(ServicesPage.getServiceCardSubtitle(2).getText()).to.eql(
      'Queuing services and message routing for your KintoBlocks and Applications'
    )
    expect(
      ServicesPage.getToggleSwitchOfServicesInKB('MESSAGEPASSING').isVisible()
    ).to.eql(true)
    expect(ServicesPage.getToggleMessageOfServicesCards(2).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //TC_1427
  it('should display "coming" text, icon, title, subtitle and "toggle switch" in "Shared Memory" service section card in KB website manage page', () => {
    expect(ServicesPage.getServiceCardsComingText(3).getText()).to.eql('Coming')
    expect(ServicesPage.sharedMemoryMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(3).getText()).to.eql(
      'Shared Memory'
    )
    expect(ServicesPage.getServiceCardSubtitle(3).getText()).to.eql(
      'Make memory available across your different KintoBlocks'
    )
    expect(
      ServicesPage.getToggleSwitchOfServicesInKB('SHAREDMEMORY').isVisible()
    ).to.eql(true)
    expect(ServicesPage.getToggleMessageOfServicesCards(3).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //TC_1428
  it('should switch on "toggle" switch for mongodb service card in KB website manage page, when users switches on the "toggle" bar', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'Activate This Dependency'
    )
    ServicesPage.getToggleSwitchOfServicesInKB('MONGODB').click()
    browser.pause(5000)
  })

  //TC_1429
  it('should change toggle text as "This Dependency is Active" in KB website manage page, when toggle switch is switched on', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'This Dependency is Active'
    )
  })

  //TC_1430
  it('should switch off "toggle" switch for mongodb service card in KB website manage page, when users switches off the "toggle" bar', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'This Dependency is Active'
    )
    ServicesPage.getToggleSwitchOfServicesInKB('MONGODB').click()
    browser.pause(5000)
  })

  //TC_1431
  it('should change toggle text as "Activate This Dependency" in KB website manage page, when toggle switch is switched off', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //KB tagged page website
  //TC_1432
  it('should verify "Kintoblock services" are displayed in KB website tagged page', () => {
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.tagLatestCommitBtn.click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.setValue('0')
    KintoBlockManage.revision.setValue('9')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    ServicesPage.getServiceCards(1).moveToObject()
    expect(ServicesPage.getServiceCards(1).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(2).isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCards(3).isVisible()).to.eql(true)
  })

  //TC_1433
  it('should verify "MongoDB" service card in KB website tagged displays "mongo" icon, title, subtitle and toggle switch', () => {
    expect(ServicesPage.mongoDBMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(1).getText()).to.eql('MongoDB')
    expect(ServicesPage.getServiceCardSubtitle(1).getText()).to.eql(
      'Powerful No-SQL Database for your KintoBlocks and Applications'
    )
    expect(
      ServicesPage.getToggleSwitchOfServicesInKB('MONGODB').isVisible()
    ).to.eql(true)
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //TC_1434
  it('should display "coming" text, icon, title, subtitle and "toggle switch" in "Message Passing" service section card in KB website tagged page', () => {
    expect(ServicesPage.getServiceCardsComingText(2).getText()).to.eql('Coming')
    expect(ServicesPage.messagePassingMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(2).getText()).to.eql(
      'Message Passing'
    )
    expect(ServicesPage.getServiceCardSubtitle(2).getText()).to.eql(
      'Queuing services and message routing for your KintoBlocks and Applications'
    )
    expect(
      ServicesPage.getToggleSwitchOfServicesInKB('MESSAGEPASSING').isVisible()
    ).to.eql(true)
    expect(ServicesPage.getToggleMessageOfServicesCards(2).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //TC_1435
  it('should display "coming" text, icon, title, subtitle and "toggle switch" in "Shared Memory" service section card in KB website tagged page', () => {
    expect(ServicesPage.getServiceCardsComingText(3).getText()).to.eql('Coming')
    expect(ServicesPage.sharedMemoryMainIcon.isVisible()).to.eql(true)
    expect(ServicesPage.getServiceCardTitle(3).getText()).to.eql(
      'Shared Memory'
    )
    expect(ServicesPage.getServiceCardSubtitle(3).getText()).to.eql(
      'Make memory available across your different KintoBlocks'
    )
    expect(
      ServicesPage.getToggleSwitchOfServicesInKB('SHAREDMEMORY').isVisible()
    ).to.eql(true)
    expect(ServicesPage.getToggleMessageOfServicesCards(3).getText()).to.eql(
      'Activate This Dependency'
    )
  })

  //TC_1436
  it('should switch on "toggle" switch for mongodb service card in KB website tagged page, when users switches on the "toggle" bar', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'Activate This Dependency'
    )
    ServicesPage.getToggleSwitchOfServicesInKB('MONGODB').click()
    browser.pause(5000)
  })

  //TC_1437
  it('should change toggle text as "This Dependency is Active" in KB website tagged page, when toggle switch is switched on', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'This Dependency is Active'
    )
  })

  //TC_1438
  it('should switch off "toggle" switch for mongodb service card in KB website tagged page, when users switches off the "toggle" bar', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'This Dependency is Active'
    )
    ServicesPage.getToggleSwitchOfServicesInKB('MONGODB').click()
    browser.pause(5000)
  })

  //TC_1439
  it('should change toggle text as "Activate This Dependency" in KB website tagged page, when toggle switch is switched off', () => {
    expect(ServicesPage.getToggleMessageOfServicesCards(1).getText()).to.eql(
      'Activate This Dependency'
    )
  })
})
