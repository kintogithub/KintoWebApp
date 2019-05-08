import { expect } from 'chai'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import DeploymentCreate from '../page-objects/deployment.create.page'
import DeploymentList from '../page-objects/deployment.list.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import WorkspaceManage from '../page-objects/workspace.manage.page'
import Login from '../page-objects/login.page'
import Landing from '../page-objects/landing.page'
import testData from '../constants/testdata.json'
import MembersBar from '../page-objects/members.bar.page'
import DeploymentManage from '../page-objects/deployment.manage.page'

var currentTime = new Date()
var kbName
var randomName
var readMeName
var textInGitHub

describe('KB Builds 1 - Breadcrumb Dropdown Components', () => {
  //TC_800
  it('should verify that options "KintoBlocks" and "Create New KintoBlock" are displayed in KB create form', () => {
    Login.registerAndLogin('KB')
    WorkspaceManage.linkGithub()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.kintoBlockListFromBreadcrumb.waitForVisible()
    expect(KintoBlockCreate.kintoBlockListFromBreadcrumb.isVisible()).to.eql(
      true
    )
    expect(KintoBlockCreate.kintoBlockListFromBreadcrumb.getText()).to.eql(
      'KintoBlocks'
    )
    KintoBlockCreate.createNewKintoBlockFromBreadcrumb.waitForVisible()
    expect(
      KintoBlockCreate.createNewKintoBlockFromBreadcrumb.isVisible()
    ).to.eql(true)
    expect(KintoBlockCreate.createNewKintoBlockFromBreadcrumb.getText()).to.eql(
      'Create New KintoBlock'
    )
  })

  //TC_801
  it('should verify that options "KintoBlocks" is displayed in KB list page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.kintoBlockListFromBreadcrumb.waitForVisible()
    expect(KintoBlockList.kintoBlockListFromBreadcrumb.isVisible()).to.eql(true)
    expect(KintoBlockList.kintoBlockListFromBreadcrumb.getText()).to.eql(
      'KintoBlocks'
    )
  })

  it('should create a KB', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbName = testData.kintoblock.validKintoBlockName + '9' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.selectExistingRepository()
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForVisible()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the KintoBlock breadcrumb to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock breadcrumb to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should validate whether KintoBlock breadcrumb build reached success - 1', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_802
  it('should verify that options "KintoBlocks", "KintoBlock Name" and "Branch Name" in KB manage page are displayed', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.kintoBlockListFromBreadcrumb.waitForVisible()
    expect(KintoBlockManage.kintoBlockListFromBreadcrumb.isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.kintoBlockListFromBreadcrumb.getText()).to.eql(
      'KintoBlocks'
    )
    expect(KintoBlockManage.kbNameInBreacdcrumb.isVisible()).to.eql(true)
    expect(KintoBlockManage.kbNameInBreacdcrumb.getText()).to.eql(kbName)
    expect(KintoBlockManage.branchOrTagTextInBreadcrumb.isVisible()).to.eql(
      true
    )
  })

  //TC_803
  it('should display KB switcher drop down in KB manage page', () => {
    KintoBlockManage.kbListDropDown.leftClick()
    KintoBlockManage.dropdownIsShownShort.waitForVisible()
    expect(KintoBlockManage.dropdownIsShownShort.isVisible()).to.eql(true)
  })

  //TC_804
  it('should display Branch/Tag switcher drop down in KB manage page', () => {
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    expect(KintoBlockManage.branchAndTagSwitcherDropDown.isVisible()).to.eql(
      true
    )
  })

  //TC_805
  it('should verify that search bar displayed via KB switcher drop down in KB manage page acts as a filter', () => {
    KintoBlockManage.kbListDropDown.leftClick()
    KintoBlockManage.dropdownIsShownShort.waitForVisible()
    //As for now there are three KB's
    //Checking whether all the three kb's are displayed
    KintoBlockManage.getKBNameFromDropDown(2).waitForVisible()
    KintoBlockManage.searchFilterInKBSwitcherDropDown.setValue('Hello World')
    //Now list is filtered with search word
    KintoBlockManage.getKBNameFromDropDown(1).waitForVisible()
    expect(KintoBlockManage.getKBNameFromDropDown(2).isVisible()).to.eql(false)
    expect(KintoBlockManage.getKBNameFromDropDown(1).getText()).to.eql(
      'Hello World'
    )
  })

  //TC_806
  it('should tag the first commit for breadcrumb components and generate a new build', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    //Tagging the first commit
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.setValue('2')
    KintoBlockManage.revision.setValue('3')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    //Navigating to KB tagged page
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').click()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('master')
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 500)
    //Generating a new build
    KintoBlockManage.getRetryBtnForBuilds(1).click()
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should validate whether KintoBlock breadcrumb build reached success - 2', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should verify that search bar displayed via Branch/Tag switcher drop down in KB manage page acts as a filter', () => {
    //Tagging the second commit
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.setValue('4')
    KintoBlockManage.minorVersion.setValue('5')
    KintoBlockManage.revision.setValue('6')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    //Navigating to KB tagged page
    KintoBlockManage.branchTagDropDown.waitForVisible()
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').click()
    //KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).waitForVisible()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('master')
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    //Navigating to KB manage page
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    //As there is bug in listing branchs while entered keyword is cleared in a shot, browser.keys is used
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.click()
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    //Now there are five branchs displayed
    //KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).waitForVisible()
    //filters the list
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('master')
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).isVisible()
    ).to.eql(false)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).getText()
    ).to.eql('master')
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.click()
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    //Switching to tags tab
    KintoBlockManage.getTab('tag').leftClick()
    //Two tags have been created
    KintoBlockManage.getTagFromBranchTagSwitcher(2).waitForVisible()
    //Filtering the list
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('4.5.6')
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()).to.eql(
      '4.5.6'
    )
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.clearElement()
  })

  it('should create two KB with existing repository for breadcrumb components', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName =
      testData.kintoblock.validKintoBlockNameWithDigit + '3' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.selectExistingRepository()
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()

    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbName =
      testData.kintoblock.validKintoBlockNameWithDescendingNumbers +
      '5' +
      randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.selectExistingRepository()
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should create two more KB with existing repository for bradcrumb components', () => {
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbName =
      testData.kintoblock.validKintoBlockNameWithAsecndingNumbers +
      '6' +
      randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.selectExistingRepository()
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbName = testData.kintoblock.validUpdatedKBName + '6' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.selectExistingRepository()
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  //TC_808
  it('should display 5 KB`s at a time in KB list of KB switcher triggered via KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.kbListDropDown.click()
    KintoBlockManage.dropdownIsShownShort.waitForVisible()
    //For now there are 6 kB's
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(1).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(2).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(3).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(4).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(5).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(6).isVisible()).to.eql(
      false
    )
  })

  //TC_807
  it('should verify that KB list in KB switcher of KB manage page is scrollable list', () => {
    KintoBlockManage.getKbFromBreadcrumbDropDown(6).moveToObject()
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(6).isVisible()).to.eql(
      true
    )
  })

  //TC_809
  it('should display all KB`s from the active workspace in KB list of KB switcher drop down triggered via KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    var firstKB = KintoBlockList.getKbCardName(0).getText()
    var secondKB = KintoBlockList.getKbCardName(1).getText()
    var thirdKB = KintoBlockList.getKbCardName(2).getText()
    var fourthKB = KintoBlockList.getKbCardName(3).getText()
    var fifthKB = KintoBlockList.getKbCardName(4).getText()
    var sixthKB = KintoBlockList.getKbCardName(5).getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.kbListDropDown.leftClick()
    KintoBlockManage.dropdownIsShownShort.waitForVisible()
    expect(KintoBlockManage.getKbNameFromDropDown(1).getText()).to.eql(firstKB)
    expect(KintoBlockManage.getKbNameFromDropDown(2).getText()).to.eql(secondKB)
    expect(KintoBlockManage.getKbNameFromDropDown(3).getText()).to.eql(thirdKB)
    expect(KintoBlockManage.getKbNameFromDropDown(4).getText()).to.eql(fourthKB)
    expect(KintoBlockManage.getKbNameFromDropDown(5).getText()).to.eql(fifthKB)
    KintoBlockManage.getKbFromBreadcrumbDropDown(6).moveToObject()
    expect(KintoBlockManage.getKbNameFromDropDown(6).getText()).to.eql(sixthKB)
  })

  //TC_810
  it('should verify that "Create New KintoBlock" button is displayed at the bottom of KB switcher drop down triggered via KB manage page', () => {
    expect(KintoBlockManage.createNewKbBtnInBreadcrumb.isVisible()).to.eql(true)
  })

  //TC_811
  it('should verify whether user can switch between tabs in Branch/Tag switcher drop down triggered via KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').click()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).isVisible()
    ).to.eql(true)
    //Switching to tag tab
    KintoBlockManage.getTab('tag').click()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).isVisible()).to.eql(
      true
    )
  })

  //TC_812
  it.skip('should verify that 5 branches are displayed at a time in branch list of Branch/Tag switcher triggered via KB manage page', () => {
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).waitForVisible()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(4).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(6).isVisible()
    ).to.eql(false)
  })

  //TC_813
  it.skip('should verify that all the branches of the repository are displayed in the branch list of Branch/Tag switcher drop down triggered via KB manage page', () => {
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.openRepoBtn.scroll(0, 500)
    KintoBlockManage.openRepoBtn.leftClick()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[1])
    browser.pause(2000)
    KintoBlockManage.branchsDropDownInGitHub.waitForVisible()
    KintoBlockManage.branchsDropDownInGitHub.click()
    KintoBlockManage.getBranchNameFromGitHubBranchList(1).waitForVisible()
    var branchOne = KintoBlockManage.getBranchNameFromGitHubBranchList(
      1
    ).getText()
    var branchTwo = KintoBlockManage.getBranchNameFromGitHubBranchList(
      2
    ).getText()
    var branchThree = KintoBlockManage.getBranchNameFromGitHubBranchList(
      3
    ).getText()
    var branchFour = KintoBlockManage.getBranchNameFromGitHubBranchList(
      4
    ).getText()
    var branchFive = KintoBlockManage.getBranchNameFromGitHubBranchList(
      5
    ).getText()
    var branchSix = KintoBlockManage.getBranchNameFromGitHubBranchList(
      6
    ).getText()
    browser.switchTab(tabIds[0])
    browser.pause(2000)
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.branchTagDropDown.scroll(0, -2000)
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).getText()
    ).to.eql(branchOne)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).getText()
    ).to.eql(branchTwo)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(3).getText()
    ).to.eql(branchThree)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(4).getText()
    ).to.eql(branchFour)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).getText()
    ).to.eql(branchFive)
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(6).moveToObject()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(6).getText()
    ).to.eql(branchSix)
  })

  //TC_814
  it('should verify that tag number, commit code, date&time and notes are displayed for a tag in Branch/Tag switcher triggered via KB manage page', () => {
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).isVisible()).to.eql(
      true
    )
    //Commit code is not displayed, reported it as bug
    expect(KintoBlockManage.getCommitCodeFromTag(1).isVisible()).to.eql(true)
    expect(
      KintoBlockManage.getDateAndTimeForTagInBranchTagSwitcher(1).isVisible()
    ).to.eql(true)
    expect(KintoBlockManage.getNotesInBranchTagSwitcher(1).isVisible()).to.eql(
      true
    )
  })

  it('should wait for the KintoBlock to move to PROCESSING', () => {
    browser.scroll(0, 500)
    KintoBlockManage.getRetryBtnForBuilds(1).click()
    browser.pause(100000)
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should validate whether KintoBlock breadcrumb build reached success - 3', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_815
  it('should verify that 3 tags are displayed at a time in Branch/Tag switcher drop down tag list triggered via KB manage page', () => {
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.setValue('7')
    KintoBlockManage.minorVersion.setValue('8')
    KintoBlockManage.revision.setValue('9')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(2).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(3).isVisible()).to.eql(
      true
    )
  })

  //TC_816
  it('should verify that list displayed via Branch/tag switcher drop down is scrollable triggered via KB manage page - 1', () => {
    //Navigating to KB manage page
    KintoBlockManage.getTab('branch').click()
    //Commented as because 5 branches removed from the repo and following steps need for other scripts
    //KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).waitForVisible()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('master')
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.scroll(0, 500)
    KintoBlockManage.getRetryBtnForBuilds(1).click()
    browser.pause(100000)
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should validate whether KintoBlock breadcrumb build reached success - 4', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_816
  it('should verify that list displayed via Branch/tag switcher drop down is scrollable triggered via KB manage page - 2', () => {
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.setValue('3')
    KintoBlockManage.revision.setValue('5')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    //KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getTagFromBranchTagSwitcher(4).moveToObject()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(4).isVisible()).to.eql(
      true
    )
    //Commented as branches were removed from the repository
    // KintoBlockManage.getTab('branch').leftClick()
    // KintoBlockManage.getBranchNameFromBranchTagSwitcher(6).moveToObject()
    // expect(
    //   KintoBlockManage.getBranchNameFromBranchTagSwitcher(6).isVisible()
    // ).to.eql(true)
  })

  //TC_817
  it('should verify that user is navigated to KB manage page of the branch selected from the Branch/Tag switcher drop down triggered via KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    var kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.title.waitForVisible()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    //Getting branch name of what we gonna click
    var branchName = KintoBlockManage.getBranchNameFromBranchTagSwitcher(
      1
    ).getText()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - ' + branchName)
  })

  //TC_818
  it('should verify that options "KintoBlocks", "KintoBlock Name" and "Tag Number" in KB tagged page are displayed', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    var kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    var tagNumber = KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.kintoBlockListFromBreadcrumb.waitForVisible()
    expect(KintoBlockManage.kintoBlockListFromBreadcrumb.isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.kintoBlockListFromBreadcrumb.getText()).to.eql(
      'KintoBlocks'
    )
    expect(KintoBlockManage.kbNameInBreacdcrumb.isVisible()).to.eql(true)
    expect(KintoBlockManage.kbNameInBreacdcrumb.getText()).to.eql(kbName)
    expect(KintoBlockManage.branchOrTagTextInBreadcrumb.isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.branchOrTagTextInBreadcrumb.getText()).to.eql(
      tagNumber
    )
  })

  //TC_819
  it('should verify whether KB switcher drop down is displayed in KB tagged page', () => {
    //Already in KB tagged page
    KintoBlockManage.kbListDropDown.click()
    KintoBlockManage.dropdownIsShownShort.waitForVisible()
    expect(KintoBlockManage.dropdownIsShownShort.isVisible()).to.eql(true)
  })

  //TC_820
  it('should verify that Branch/Tag switcher drop down is displayed in KB tagged page', () => {
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.dropdownIsShown.waitForVisible()
    expect(KintoBlockManage.branchAndTagSwitcherDropDown.isVisible()).to.eql(
      true
    )
  })

  //TC_821
  it('should verify that search bar displayed via KB switcher drop down in KB tagged page acts as a filter', () => {
    KintoBlockManage.kbListDropDown.click()
    KintoBlockManage.dropdownIsShownShort.waitForVisible()
    //As for now there are three KB's
    //Checking whether all the three kb's are displayed
    KintoBlockManage.getKBNameFromDropDown(2).waitForVisible()
    KintoBlockManage.searchFilterInKBSwitcherDropDown.setValue('Hello World')
    //Now list is filtered with search word
    KintoBlockManage.getKBNameFromDropDown(1).waitForVisible()
    expect(KintoBlockManage.getKBNameFromDropDown(2).isVisible()).to.eql(false)
    expect(KintoBlockManage.getKBNameFromDropDown(1).getText()).to.eql(
      `Hello World`
    )
  })

  //TC_822
  it('should verify that search bar displayed via Branch/Tag switcher drop down in KB tagged page acts as a filter', () => {
    //Now there are five branchs displayed
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    //Switching to branch tab
    KintoBlockManage.getTab('branch').click()
    //KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).waitForVisible()
    //filters the list
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('master')
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).isVisible()
    ).to.eql(false)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).getText()
    ).to.eql('master')
    //KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.clearElement()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.click()
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    //Switching to tags tab
    KintoBlockManage.getTab('tag').click()
    //Two tags have been created
    KintoBlockManage.getTagFromBranchTagSwitcher(2).waitForVisible()
    //Filtering the list
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('1.2.3')
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()).to.eql(
      '1.2.3'
    )
  })

  //TC_823
  it('should display 5 KB`s at a time in KB list of KB switcher triggered via KB tagged page', () => {
    KintoBlockManage.kbListDropDown.click()
    KintoBlockManage.dropdownIsShownShort.waitForVisible()
    KintoBlockManage.getKbFromBreadcrumbDropDown(1).waitForVisible()
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(1).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(2).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(3).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(4).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(5).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(6).isVisible()).to.eql(
      false
    )
  })

  //TC_824
  it('should verify that KB list in KB switcher of KB tagged page is scrollable list', () => {
    KintoBlockManage.getKbFromBreadcrumbDropDown(6).moveToObject()
    expect(KintoBlockManage.getKbFromBreadcrumbDropDown(6).isVisible()).to.eql(
      true
    )
  })

  //TC_825
  it('should display all KB`s from the active workspace in KB list of KB switcher drop down triggered via KB tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    var firstKB = KintoBlockList.getKbCardName(0).getText()
    var secondKB = KintoBlockList.getKbCardName(1).getText()
    var thirdKB = KintoBlockList.getKbCardName(2).getText()
    var fourthKB = KintoBlockList.getKbCardName(3).getText()
    var fifthKB = KintoBlockList.getKbCardName(4).getText()
    var sixthKB = KintoBlockList.getKbCardName(5).getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.getTagFromBranchTagSwitcher(2).waitForVisible()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('1.2.3')
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.kbListDropDown.leftClick()
    KintoBlockManage.dropdownIsShownShort.waitForVisible()
    expect(KintoBlockManage.getKbNameFromDropDown(1).getText()).to.eql(firstKB)
    expect(KintoBlockManage.getKbNameFromDropDown(2).getText()).to.eql(secondKB)
    expect(KintoBlockManage.getKbNameFromDropDown(3).getText()).to.eql(thirdKB)
    expect(KintoBlockManage.getKbNameFromDropDown(4).getText()).to.eql(fourthKB)
    expect(KintoBlockManage.getKbNameFromDropDown(5).getText()).to.eql(fifthKB)
    KintoBlockManage.getKbNameFromDropDown(6).moveToObject()
    expect(KintoBlockManage.getKbNameFromDropDown(6).getText()).to.eql(sixthKB)
  })

  //TC_826
  it('should verify that "Create New KintoBlock" button is displayed at the bottom of KB switcher drop down triggered via KB tagged page', () => {
    expect(KintoBlockManage.createNewKbBtnInBreadcrumb.isVisible()).to.eql(true)
  })

  //TC_827
  it('should verify whether user can switch between tabs in Branch/Tag switcher drop down triggered via KB tagged page', () => {
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).isVisible()
    ).to.eql(true)
    //Switching to tag tab
    KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).isVisible()).to.eql(
      true
    )
  })

  //TC_828
  it.skip('should verify that 5 branchs are displayed at a time in branch list of Branch/Tag switcher triggered via KB tagged page', () => {
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).waitForVisible()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(4).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(6).isVisible()
    ).to.eql(false)
  })

  //TC_829
  it.skip('should verify that all the branchs of the repository are displayed in the branch list of Branch/Tag switcher drop down triggered via KB tagged page', () => {
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.openRepoBtn.scroll(0, 500)
    KintoBlockManage.openRepoBtn.leftClick()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[2])
    browser.pause(2000)
    KintoBlockManage.branchsDropDownInGitHub.waitForVisible()
    KintoBlockManage.branchsDropDownInGitHub.click()
    var branchOne = KintoBlockManage.getBranchNameFromGitHubBranchList(
      1
    ).getText()
    var branchTwo = KintoBlockManage.getBranchNameFromGitHubBranchList(
      2
    ).getText()
    var branchThree = KintoBlockManage.getBranchNameFromGitHubBranchList(
      3
    ).getText()
    var branchFour = KintoBlockManage.getBranchNameFromGitHubBranchList(
      4
    ).getText()
    var branchFive = KintoBlockManage.getBranchNameFromGitHubBranchList(
      5
    ).getText()
    var branchSix = KintoBlockManage.getBranchNameFromGitHubBranchList(
      6
    ).getText()
    browser.switchTab(tabIds[0])
    browser.pause(2000)
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.branchTagDropDown.scroll(0, -2000)
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).getText()
    ).to.eql(branchOne)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).getText()
    ).to.eql(branchTwo)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(3).getText()
    ).to.eql(branchThree)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(4).getText()
    ).to.eql(branchFour)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).getText()
    ).to.eql(branchFive)
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(6).moveToObject()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(6).getText()
    ).to.eql(branchSix)
  })

  //TC_830
  it('should verify that tag number, commit code, date&time and notes are displayed for a tag in Branch/Tag switcher triggered via KB tagged page', () => {
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getCommitCodeFromTag(1).isVisible()).to.eql(true)
    expect(
      KintoBlockManage.getDateAndTimeForTagInBranchTagSwitcher(1).isVisible()
    ).to.eql(true)
    expect(KintoBlockManage.getNotesInBranchTagSwitcher(1).isVisible()).to.eql(
      true
    )
  })

  //TC_831
  it('should verify that 3 tags are displayed at a time in Branch/Tag switcher drop down tag list triggered via KB tagged page', () => {
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(2).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(3).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(4).isVisible()).to.eql(
      false
    )
  })

  //TC_832
  it('should verify that list displayed via Branch/tag switcher drop down is scrollable triggered via KB tagged page', () => {
    KintoBlockManage.getTagFromBranchTagSwitcher(4).moveToObject()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(4).isVisible()).to.eql(
      true
    )
  })

  //TC_833
  it('should verify that user is navigated to KB manage page of the branch selected from the Branch/Tag switcher drop down triggered via KB tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    var kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.title.waitForVisible()
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    var tagNumber = KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).leftClick()
    //Navigating to KB tagged page
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.title.waitForVisible()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - ' + tagNumber)
    KintoBlockManage.branchTagDropDown.waitForVisible()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    //Getting branch name of what we gonna click
    var branchName = KintoBlockManage.getBranchNameFromBranchTagSwitcher(
      1
    ).getText()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - ' + branchName)
  })

  //TC_834
  it('should display options "Kintoblocks", Kintoblock Name", "Branch" and "Documentation" text  in KB documentation page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    var kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.endPointPageTitle.waitForVisible()
    expect(KintoBlockManage.endPointPageTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
    KintoBlockManage.kintoBlocksTextInBreadcrumb.waitForVisible()
    expect(KintoBlockManage.kintoBlocksTextInBreadcrumb.isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.kintoBlocksTextInBreadcrumb.getText()).to.eql(
      'KintoBlocks'
    )
    expect(KintoBlockManage.kbNameInBreacdcrumb.isVisible()).to.eql(true)
    expect(KintoBlockManage.kbNameInBreacdcrumb.getText()).to.eql(kbName)
    expect(KintoBlockManage.documentationTextInBreadcrumb.isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.documentationTextInBreadcrumb.getText()).to.eql(
      'Documentation'
    )
    KintoBlockManage.branchOrTagTextInBreadcrumb.waitForVisible()
    expect(KintoBlockManage.branchOrTagTextInBreadcrumb.isVisible()).to.eql(
      true
    )
  })

  //TC_835
  it('should display Branch/Tag switcher drop down in KB endpoints page', () => {
    //Already we are in endpoints page
    KintoBlockManage.branchTagDropDown.waitForVisible()
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    expect(KintoBlockManage.branchAndTagSwitcherDropDown.isVisible()).to.eql(
      true
    )
  })

  // //TC_836
  // it('should display Info/Endpoint switcher drop down in KB endpoints page', () => {
  //   //Not Implemented
  // })

  //TC_837
  it('should verify that search bar displayed via Branch/Tag switcher drop down in KB endpoints page acts as a filter', () => {
    // //Now there are five branchs displayed
    // KintoBlockManage.branchTagDropDown.click()
    // KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    //Switching to branch tab
    KintoBlockManage.getTab('branch').leftClick()
    //KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).waitForVisible()
    //filters the list
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('master')
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).isVisible()
    ).to.eql(false)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).getText()
    ).to.eql('master')
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.click()
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    //Switching to tags tab
    KintoBlockManage.getTab('tag').leftClick()
    //Two tags have been created
    KintoBlockManage.getTagFromBranchTagSwitcher(2).waitForVisible()
    //Filtering the list
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('1.2.3')
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()).to.eql(
      '1.2.3'
    )
  })

  //TC_838
  it('should verify whether user can switch between tabs in Branch/Tag switcher drop down triggered via KB endpoints page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).isVisible()
    ).to.eql(true)
    //Switching to tag tab
    KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).isVisible()).to.eql(
      true
    )
  })

  //TC_839
  it.skip('should verify that 5 branchs are displayed at a time in branch list of Branch/Tag switcher triggered via KB endpoints page', () => {
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(4).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(6).isVisible()
    ).to.eql(false)
  })

  //TC_840
  it.skip('should verify that all the branchs of the repository are displayed in the branch list of Branch/Tag switcher drop down triggered via KB endpoints page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.openRepoBtn.waitForVisible()
    KintoBlockManage.openRepoBtn.scroll(0, 1000)
    KintoBlockManage.openRepoBtn.leftClick()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[3])
    browser.pause(2000)
    KintoBlockManage.branchsDropDownInGitHub.waitForVisible()
    KintoBlockManage.branchsDropDownInGitHub.click()
    var branchOne = KintoBlockManage.getBranchNameFromGitHubBranchList(
      1
    ).getText()
    var branchTwo = KintoBlockManage.getBranchNameFromGitHubBranchList(
      2
    ).getText()
    var branchThree = KintoBlockManage.getBranchNameFromGitHubBranchList(
      3
    ).getText()
    var branchFour = KintoBlockManage.getBranchNameFromGitHubBranchList(
      4
    ).getText()
    var branchFive = KintoBlockManage.getBranchNameFromGitHubBranchList(
      5
    ).getText()
    var branchSix = KintoBlockManage.getBranchNameFromGitHubBranchList(
      6
    ).getText()
    browser.switchTab(tabIds[0])
    browser.pause(2000)
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.viewEndpointsBtn.scroll(0, -2000)
    KintoBlockManage.viewEndpointsBtn.waitForVisible()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).getText()
    ).to.eql(branchOne)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).getText()
    ).to.eql(branchTwo)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(3).getText()
    ).to.eql(branchThree)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(4).getText()
    ).to.eql(branchFour)
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(5).getText()
    ).to.eql(branchFive)
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(6).moveToObject()
    expect(
      KintoBlockManage.getBranchNameFromBranchTagSwitcher(6).getText()
    ).to.eql(branchSix)
  })

  //TC_841
  it('should verify that tag number, commit code, date&time and notes are displayed for a tag in Branch/Tag switcher triggered via KB endpoints page', () => {
    //KintoBlockManage.getTab('tag').leftClick()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).isVisible()).to.eql(
      true
    )
    //Commit code is not displayed, reported it as bug
    expect(KintoBlockManage.getCommitCodeFromTag(1).isVisible()).to.eql(true)
    expect(
      KintoBlockManage.getDateAndTimeForTagInBranchTagSwitcher(1).isVisible()
    ).to.eql(true)
    expect(KintoBlockManage.getNotesInBranchTagSwitcher(1).isVisible()).to.eql(
      true
    )
  })

  //TC_842
  it('should verify that 3 tags are displayed at a time in Branch/Tag switcher drop down tag list triggered via KB endpoints page', () => {
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(2).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(3).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(4).isVisible()).to.eql(
      false
    )
  })

  //TC_843
  it('should verify that list displayed via Branch/tag switcher drop down is scrollable triggered via KB endpoints page', () => {
    KintoBlockManage.getTagFromBranchTagSwitcher(4).moveToObject()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(4).isVisible()).to.eql(
      true
    )
  })

  //TC_844
  it('should verify that user is navigated to KB branch documentation page of the branch selected from the Branch/Tag switcher drop down triggered via KB endpoints page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()

    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.endPointPageTitle.waitForVisible()
    expect(KintoBlockManage.endPointPageTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    //Getting branch name of what we gonna click
    var branchName = KintoBlockManage.getBranchNameFromBranchTagSwitcher(
      1
    ).getText()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).click()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(
      KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    ).to.eql(branchName)
  })

  // //TC_845
  // it('should verify whether endpoints switcher in KB documentation page displays options "info" and "Endpoints"', () => {
  //   //Not implemented
  // })

  // //TC_846
  // it('should navigate endpoints page of selected KB, when user clicks on "Endpoints" option in endpoints switcher triggered via KB documentation page', () => {
  //   //Not implemented
  // })

  // //TC_847
  // it('should navigate to info page, when user clicks on "info" option in endpoints switcher triggered via KB documentation page', () => {
  //   //Not implemented
  // })

  it('should logout from KB - Breadcrumb components', () => {
    KintoBlockManage.logout()
  })
})

describe('KB Builds 2 - Tag latest commit Component', () => {
  it('should create a KB', () => {
    Login.registerAndLogin('TL')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + '96' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.selectExistingRepository()
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForExist()
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

  it('should check build reached success for Tag latest commit Component - 1', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_848
  it('should display title as "Tag This Commit" for "Tag Latest Commit" pop up', () => {
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).waitForVisible()
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.tagCommitPopUpTitle.waitForVisible()
    expect(KintoBlockManage.tagCommitPopUpTitle.getText()).to.eql(
      'Tag This Build'
    )
  })

  //TC_849
  it('should display the current branch of KB in the branch field of "Tag latest commit" pop up', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    var branchName = KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).waitForVisible()
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    expect(KintoBlockManage.branchNameInTagLatestCommitPopUp.getValue()).to.eql(
      branchName
    )
  })

  //TC_850
  it('should verify that "branch" field in "Tag Latest Commit" is greyed out', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).waitForVisible()
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    expect(
      KintoBlockManage.branchNameInTagLatestCommitPopUp.isEnabled()
    ).to.eql(false)
  })

  //TC_851
  it('should display "Latest commit" of KintoBlock in the "Tag Latest Commit" pop up', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).waitForVisible()
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.cancelTagBtn.click()
    KintoBlockManage.form.waitForVisible()
    var latestCommit = KintoBlockManage.latestCommitText.getText()
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    expect(KintoBlockManage.latestCommitInTagCommitPopUp.getText()).to.eql(
      latestCommit
    )
  })

  //TC_852
  it('should verify that "Latest Commit" field is greyed out in "Tag Latest Commit" pop up', () => {
    expect(
      KintoBlockManage.latestCommitFieldDisabledInTagCommitPopUp.isVisible()
    ).to.eql(true)
  })

  //TC_853
  it('should verify that "Tag Latest Commit" pop up displays "Major", "Minor", "Revision", "Notes" fields and "cancel", "Tag Latest Commit" buttons', () => {
    expect(KintoBlockManage.majorVersion.isVisible()).to.eql(true)
    expect(KintoBlockManage.minorVersion.isVisible()).to.eql(true)
    expect(KintoBlockManage.revision.isVisible()).to.eql(true)
    expect(KintoBlockManage.notes.isVisible()).to.eql(true)
    expect(KintoBlockManage.createTagBtn.isVisible()).to.eql(true)
    expect(KintoBlockManage.cancelTagBtn.isVisible()).to.eql(true)
  })

  //TC_854
  it('should display validation error message as "Must be less than 999", when value more than 998 is entered in major, minor or revision fields', () => {
    KintoBlockManage.majorVersion.setValue('999')
    KintoBlockManage.minorVersion.setValue('1')
    KintoBlockManage.revision.setValue('1')
    browser.keys('Tab')
    KintoBlockManage.errorInTagFields.waitForVisible()
    expect(KintoBlockManage.errorInTagFields.isVisible()).to.eql(true)
    KintoBlockManage.majorVersion.clearElement()
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.clearElement()
    KintoBlockManage.minorVersion.setValue('999')
    browser.keys('Tab')
    KintoBlockManage.errorInTagFields.waitForVisible()
    expect(KintoBlockManage.errorInTagFields.isVisible()).to.eql(true)
    KintoBlockManage.minorVersion.clearElement()
    KintoBlockManage.minorVersion.setValue('1')
    KintoBlockManage.revision.clearElement()
    KintoBlockManage.revision.setValue('999')
    browser.keys('Tab')
    KintoBlockManage.errorInTagFields.waitForVisible()
    expect(KintoBlockManage.errorInTagFields.isVisible()).to.eql(true)
    KintoBlockManage.revision.clearElement()
  })

  //TC_855
  it('should display validation error message as "Required", when user try to tag a commit without notes field entered', () => {
    KintoBlockManage.majorVersion.setValue('998')
    KintoBlockManage.minorVersion.setValue('998')
    KintoBlockManage.revision.setValue('998')
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.errorInNotesField.waitForVisible()
    expect(KintoBlockManage.errorInNotesField.isVisible()).to.eql(true)
  })

  //TC_857
  it('should allow user to enter only number in major, minor and revision fields of "Tag Latest commit" pop up', () => {
    KintoBlockManage.majorVersion.clearElement()
    KintoBlockManage.minorVersion.clearElement()
    KintoBlockManage.revision.clearElement()
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.setValue('1')
    KintoBlockManage.revision.setValue('1')
    KintoBlockManage.majorVersion.setValue('e+-E')
    KintoBlockManage.createTagBtn.click()
    expect(KintoBlockManage.errorInTagFields.isVisible()).to.eql(true)
    expect(KintoBlockManage.errorInTagFields.getText()).to.eql('Required')
    KintoBlockManage.majorVersion.clearElement()
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.clearElement()
    KintoBlockManage.minorVersion.setValue('e+-E')
    KintoBlockManage.createTagBtn.click()
    expect(KintoBlockManage.errorInTagFields.isVisible()).to.eql(true)
    expect(KintoBlockManage.errorInTagFields.getText()).to.eql('Required')
    KintoBlockManage.minorVersion.clearElement()
    KintoBlockManage.minorVersion.setValue('1')
    KintoBlockManage.revision.clearElement()
    KintoBlockManage.revision.setValue('e+-E')
    KintoBlockManage.createTagBtn.click()
    expect(KintoBlockManage.errorInTagFields.isVisible()).to.eql(true)
    expect(KintoBlockManage.errorInTagFields.getText()).to.eql('Required')
  })

  //TC_858
  it('should verify that validation error message disappears, when valid data is entered in major, minor, revision and notes field', () => {
    KintoBlockManage.cancelTagBtn.click()
    KintoBlockManage.form.waitForVisible()
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.setValue('999')
    KintoBlockManage.minorVersion.setValue('0')
    KintoBlockManage.revision.setValue('0')
    browser.keys('Tab')
    KintoBlockManage.errorInTagFields.waitForVisible()
    expect(KintoBlockManage.errorInTagFields.isVisible()).to.eql(true)
    KintoBlockManage.majorVersion.clearElement()
    KintoBlockManage.majorVersion.setValue('1')
    expect(KintoBlockManage.errorInTagFields.isVisible()).to.eql(false)
    KintoBlockManage.minorVersion.setValue('999')
    browser.keys('Tab')
    KintoBlockManage.errorInTagFields.waitForVisible()
    expect(KintoBlockManage.errorInTagFields.isVisible()).to.eql(true)
    KintoBlockManage.minorVersion.clearElement()
    KintoBlockManage.minorVersion.setValue('1')
    expect(KintoBlockManage.errorInTagFields.isVisible()).to.eql(false)
    KintoBlockManage.revision.setValue('999')
    browser.keys('Tab')
    KintoBlockManage.errorInTagFields.waitForVisible()
    expect(KintoBlockManage.errorInTagFields.isVisible()).to.eql(true)
    KintoBlockManage.revision.clearElement()
    KintoBlockManage.revision.setValue('1')
    expect(KintoBlockManage.errorInTagFields.isVisible()).to.eql(false)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.errorInNotesField.waitForVisible()
    expect(KintoBlockManage.errorInNotesField.isVisible()).to.eql(true)
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    expect(KintoBlockManage.errorInNotesField.isVisible()).to.eql(false)
  })

  //TC_861
  it('should verify that build is tagged as per the tag number entered at the time of tagging in KB pages', () => {
    //Previous tag number entered in the tag fields is '1.1.1'
    //Notes also entered already
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    //In KB tagged page
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.tagVersionFromBreadcrumb.waitForVisible()
    expect(KintoBlockManage.tagVersionFromBreadcrumb.getText()).to.eql('1.1.1')
    kbName = KintoBlockManage.kbNameInBreacdcrumb.getText()
    expect(KintoBlockManage.title.getText()).to.eql(`${kbName} - 1.1.1`)
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('1.1.1')
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()).to.eql(
      '1.1.1'
    )
    //KB documentation page
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.tagVersionFromBreadcrumb.getText()).to.eql('1.1.1')
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('1.1.1')
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()).to.eql(
      '1.1.1'
    )
    //In KB manage page
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('1.1.1')
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()).to.eql(
      '1.1.1'
    )
  })

  //TC_861
  it('should verify that build is tagged as per the tag number entered at the time of tagging in Deployment pages', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    //In KA manage page
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kaName = testData.kintoapp.validKintoAppName + '034' + randomName
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.setValue(kbName)
    KintoBlockList.getFilteredKB(kbName).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.amazingBtn.waitForExist()
    DeploymentManage.amazingBtn.click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.branchAndTagDropDown.scroll(0, 800)
    DeploymentManage.branchAndTagDropDown.waitForVisible()
    DeploymentManage.branchAndTagDropDown.leftClick()
    browser.isVisible('.icon.search')
    KintoBlockManage.getTab('tag').leftClick()
    DeploymentManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(DeploymentManage.getTagFromBranchTagSwitcher(1).getText()).to.eql(
      '1.1.1'
    )
  })

  //TC_862
  it('should verify that notes entered for tag is same, where ever its displayed in Deployment and KB pages', () => {
    //KB manage page
    DeploymentManage.goBackBtn.click()
    DeploymentList.loadingFinished.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('tag').click()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('1.1.1')
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()).to.eql(
      '1.1.1'
    )
    expect(KintoBlockManage.getNotesInBranchTagSwitcher(1).getText()).to.eql(
      testData.kintoblock.validNotes
    )
    KintoBlockManage.getTagFromBranchTagSwitcher(1).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.waitForVisible()
    //KB documentation page
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.tagVersionFromBreadcrumb.getText()).to.eql('1.1.1')
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    // KintoBlockManage.getTab('tag').click()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('1.1.1')
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()).to.eql(
      '1.1.1'
    )
    expect(KintoBlockManage.getNotesInBranchTagSwitcher(1).getText()).to.eql(
      testData.kintoblock.validNotes
    )
  })

  //TC_862
  it('should verify that notes entered for tag is same, where ever its displayed in KB Tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('tag').click()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('1.1.1')
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()).to.eql(
      '1.1.1'
    )
    //KB tagged page
    KintoBlockManage.getTagFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    var kbName = KintoBlockManage.kbNameInBreacdcrumb.getText()
    expect(KintoBlockManage.title.getText()).to.eql(`${kbName} - 1.1.1`)
    //Commented below lines as branch drop down is still visible even after selecting a tag from drop down
    // KintoBlockManage.branchTagDropDown.waitForVisible()
    // KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('1.1.1')
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()).to.eql(
      '1.1.1'
    )
    expect(KintoBlockManage.getNotesInBranchTagSwitcher(1).getText()).to.eql(
      testData.kintoblock.validNotes
    )
  })

  it('should generate a second build of KB for tag commits component', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 500)
    KintoBlockManage.getRetryBtnForBuilds(1).click()
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check build reached success for Tag latest commit Component - 2', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_864
  it('should verify that user is navigated to KB manage form, when "Cancel" button is clicked in "Tag Latest Commit" pop up', () => {
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).waitForVisible()
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    expect(KintoBlockManage.tagLatestCommitPopUp.isVisible()).to.eql(true)
    KintoBlockManage.cancelTagBtn.click()
    KintoBlockManage.form.waitForVisible()
  })

  //TC_863
  it('should verify that "Tag Latest Commit" pop up is been displayed even if user clicks outside the pop up', () => {
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    //Left click works where mouse pointer is moved at the last point.
    browser.leftClick()
    expect(KintoBlockManage.tagLatestCommitPopUp.isVisible()).to.eql(true)
  })

  //TC_866
  it('should display validation error message, when user enters existing tag number', () => {
    //Existing tags 1.1.1
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.setValue('1')
    KintoBlockManage.revision.setValue('1')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.duplicateTagError.waitForVisible()
    expect(KintoBlockManage.duplicateTagError.isVisible()).to.eql(true)
    KintoBlockManage.cancelTagBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  //TC_859
  it('should verify that new tag is auto-generated for a KB which is previously tagged', () => {
    //Previous tag is 1.1.1
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).waitForVisible()
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    //As per logic it should display as 1.1.2
    var majorVersion = KintoBlockManage.majorVersion.getValue()
    var minorVersion = KintoBlockManage.minorVersion.getValue()
    var revisionVersion = KintoBlockManage.revision.getValue()
    expect(majorVersion).to.eql('1')
    expect(minorVersion).to.eql('1')
    expect(revisionVersion).to.eql('2')
  })

  //TC_865
  it('should navigate to KB tagged page, when user tag a commit', () => {
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.tagVersionFromBreadcrumb.waitForVisible()
    expect(KintoBlockManage.tagVersionFromBreadcrumb.getText()).to.eql('1.1.2')
  })

  it('should shut down deployments deployed in tag latest commit component', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentManage.shutDownDeployment(0, ws, 2)
  })

  it('should logout from KB - Tag latest commit components', () => {
    KintoBlockManage.logout()
  })
})

describe('KB Builds 3 - Tagged Page overall', () => {
  it('should create a KB', () => {
    Login.registerAndLogin('TP')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbName = testData.kintoblock.validKintoBlockName + '6' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.selectExistingRepository()
    browser.pause(2000)
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
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

  it('should validate whether KintoBlock build reached success in Tagged Page overall - 1', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_867
  it('should navigate user to KB tagged page, when user clicks on a tag through "View all tags" drop down triggered via KB list card', () => {
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).waitForVisible()
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.setValue('0')
    KintoBlockManage.revision.setValue('0')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.dropdownIsShown.waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.getBranchAndTagSwitcher(0, 'tag').waitForVisible()
    KintoBlockList.getBranchAndTagSwitcher(0, 'tag').leftClick()
    KintoBlockList.getTagFromBranchAndTagSwitcher(0, 'tag', 1).waitForVisible()
    var tagNumber = KintoBlockList.getTagFromBranchAndTagSwitcher(
      0,
      'tag',
      1
    ).getText()
    KintoBlockList.getTagFromBranchAndTagSwitcher(0, 'tag', 1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - ' + tagNumber)
  })

  //TC868
  it('should navigate to KB tagged page, when user selects a tag through "Branch/Tag" switcher triggred via KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    var tagNumber = KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - ' + tagNumber)
  })

  it('should generate a new build for the KB - tagged page overall', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 500)
    KintoBlockManage.getRetryBtnForBuilds(1).click()
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should validate whether KintoBlock build reached success in Tagged Page overall - 2', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_869
  it('should navigate to KB tagged page, when user selects a tag through "Branch/Tag" switcher triggred via KB tagged page', () => {
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.setValue('2')
    KintoBlockManage.minorVersion.setValue('0')
    KintoBlockManage.revision.setValue('0')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    //Now we are 2.0.0 KB tagged page
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTagFromBranchTagSwitcher(2).waitForVisible()
    var tagNumber1 = KintoBlockManage.getTagFromBranchTagSwitcher(2).getText()
    //validating are we in 2.0.0 KB tagged page
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - ' + tagNumber1)
    var tagNumber2 = KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()
    //Now navigating to 1.0.0 tagged page
    KintoBlockManage.getTagFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - ' + tagNumber2)
  })

  //TC_870
  it('should navigate user to KB tagged page, when user enters the url of KB tagged page', () => {
    //Already in 1.0.0 tagged page
    var url = browser.getUrl()
    var title = KintoBlockManage.title.getText()
    //Navigating to KB list page
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
    browser.url(url)
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getText()).to.eql(title)
  })

  //TC_871
  it('should verify that title of Kb tagged is displayed as "{Kintoblock name} - {tag number}"', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.dropdownIsShown.waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.getBranchAndTagSwitcher(0, 'tag').waitForVisible()
    KintoBlockList.getBranchAndTagSwitcher(0, 'tag').leftClick()
    KintoBlockList.getTagFromBranchAndTagSwitcher(0, 'tag', 1).waitForVisible()
    var tagNumber = KintoBlockList.getTagFromBranchAndTagSwitcher(
      0,
      'tag',
      1
    ).getText()
    KintoBlockList.getTagFromBranchAndTagSwitcher(0, 'tag', 1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - ' + tagNumber)
  })

  //TC_872
  it('should verify that "Projects members bar", "Basic info component", "Commits component" and "Save bar" are displayed in KB tagged page', () => {
    //Already in KB tagged page
    expect(KintoBlockManage.membersToolBar.isVisible()).to.eql(true)
    KintoBlockManage.basicInfoEditIcon.click()
    expect(KintoBlockManage.basicInfoComponentTitle.isVisible()).to.eql(true)
    KintoBlockManage.basicInfoCancelBtn.click()
    browser.scroll(0, 2000)
    expect(KintoBlockManage.commitComponentInTaggedPage.isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.savebar.isVisible()).to.eql(true)
  })

  //TC_873
  it('should verify that "open repo" button and "View Example Projects" text link is displayed in KB tagged page', () => {
    expect(KintoBlockManage.openRepoBtn.isVisible()).to.eql(true)
    //TODO view example
  })

  //TC_874
  it.skip('should display validation error message as `Must be 3 characters or more`, when user enters less than 3 characters in KB name field', () => {
    KintoBlockManage.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    browser.keys('Tab')
    KintoBlockManage.name.error.waitForVisible()
    expect(KintoBlockManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  //TC_875
  it.skip('should display validation error message as `Must be 35 characters or less`, when user enters more than 35 characters in KB name field', () => {
    KintoBlockManage.name.input.setValue(testData.kintoblock.invalidKBFortyChar)
    browser.keys('Tab')
    KintoBlockManage.name.error.waitForVisible()
    expect(KintoBlockManage.name.error.getText()).to.eql(
      'Must be 35 characters or less'
    )
  })

  //TC_876
  it.skip('should display validation error message as `Must be 200 characters or less`, when user enters more than 200 characters in KB description field', () => {
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.invalidKBDescription
    )
    browser.keys('Tab')
    KintoBlockManage.description.error.waitForVisible()
    expect(KintoBlockManage.description.error.getText()).to.eql(
      'Must be 200 characters or less'
    )
  })

  //TC_877
  it.skip('should display validation error message as `Only lowercase characters and digits are allowed`, when user enters invalid characters in KB name field', () => {
    KintoBlockManage.name.input.setValue(testData.kintoblock.invalidKBCAPSChar)
    browser.keys('Tab')
    expect(KintoBlockManage.name.error.getText()).to.eql(
      'Only lowercase characters and digits are allowed'
    )
  })

  //TC_878
  it.skip('should display validation error message as `The first character can`t be a digit`, when user enters first character as number in KB name field', () => {
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.invalidKBNameWithDigit
    )
    browser.keys('Tab')
    expect(KintoBlockManage.name.error.getText()).to.eql(
      `The first character can't be a digit`
    )
  })

  //TC_879
  it.skip('should make disappear triggered error message, when user enters valid data in second try', () => {
    KintoBlockManage.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    expect(KintoBlockManage.name.error.isVisible()).to.eql(true)
    //Entering valid data on second try
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKBNameWithStar
    )
    expect(KintoBlockManage.name.error.isVisible()).to.eql(false)
  })

  //TC_880
  it.skip('should verify that "Save Changes" button is not displayed by default, when user navigates to KB tagged page', () => {
    expect(KintoBlockManage.submitBtn.isVisible()).to.eql(false)
  })

  //TC_881
  it('should verify that "Save Changes" button is displayed, when user edit in KB tagged page', () => {
    //Toggling the members toggle bar
    MembersBar.toggleBarSwitch.scroll(0, -2000)
    MembersBar.toggleBarSwitch.leftClick()
    browser.pause(2000)
    expect(KintoBlockManage.submitBtn.isVisible()).to.eql(true)
  })

  //TC_882
  it('should verify whether "Save Changes" button disappears, when user saves the changes made in KB tagged page', () => {
    KintoBlockManage.submitGlobal()
    browser.pause(2000)
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.submitBtn.getText()).to.not.eql('Save Changes')
  })

  // //TC_883
  // it('should verify that "Save Changes" button is displayed and stays clickable untill validation conditions are met in KB tagged page',()=>{
  //   //As there is not input fields, we cannot validate
  // })

  //TC_884
  it('should navigate to "documentation" page, when user clicks on "View Endpoints" button in KB tagged page', () => {
    KintoBlockManage.viewEndpointsBtn.scroll(0, -2000)
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.endPointPageTitle.waitForVisible()
    expect(KintoBlockManage.endPointPageTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  //TC_885
  it('should verify that alert pop up is triggered, when user navigate to other page while editing in KB tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.dropdownIsShown.waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.getBranchAndTagSwitcher(0, 'tag').waitForVisible()
    KintoBlockList.getBranchAndTagSwitcher(0, 'tag').leftClick()
    KintoBlockList.getTagFromBranchAndTagSwitcher(0, 'tag', 1).waitForVisible()
    KintoBlockList.getTagFromBranchAndTagSwitcher(0, 'tag', 1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    MembersBar.toggleBarSwitch.leftClick()
    KintoBlockManage.submitBtn.waitForVisible()
    DashboardIndex.kintoBlocksleftnav.click()
    //Alert will be accepted only if alert is displayed
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
  })

  //TC_886
  it('should navigate user to requested page, when user accepts the alert pop up triggered while editing the KB tagged page', () => {
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.dropdownIsShown.waitForVisible()
    KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    MembersBar.toggleBarSwitch.leftClick()
    KintoBlockManage.submitBtn.waitForVisible()
    DashboardIndex.kintoBlocksleftnav.click()
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
    KintoBlockList.getCard(0).waitForVisible()
  })

  //TC_887
  it('should verify that user stays in the KB tagged page, when user dismiss the alert pop up triggered while editing the KB tagged page', () => {
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.dropdownIsShown.waitForVisible()
    KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    MembersBar.toggleBarSwitch.leftClick()
    KintoBlockManage.submitBtn.waitForVisible()
    DashboardIndex.kintoBlocksleftnav.click()
    browser.alertDismiss()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(false)
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
    DashboardIndex.kintoBlocksleftnav.click()
    browser.alertAccept()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
    expect(KintoBlockManage.form.isVisible()).to.eql(false)
  })

  it('should logout from KB -tagged page overall describe', () => {
    KintoBlockManage.logout()
  })
})

describe('KB Builds 4 - Commits Component', () => {
  it('should create a KB', () => {
    Login.registerAndLogin('CC')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + '87' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.selectExistingRepository()
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForVisible()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should validate whether KintoBlock build reached success in Commits component - 1', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_888
  it('should verify that commits component is accessible, when user navigates to KB manage page via clicking on KB card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(KintoBlockManage.commitComponentInManagePage.isVisible()).to.eql(
      true
    )
  })

  //TC_889
  it('should verify that commits component is accessible, when user navigates to KB manage page via "Edit Branch" option from KB list card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.dropdownIsShown.waitForVisible()
    KintoBlockList.getEditBranchOption(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(KintoBlockManage.commitComponentInManagePage.isVisible()).to.eql(
      true
    )
  })

  //TC_890
  it('should verify that commits component is accessible, when user enters the URL of KB manage page and navigates to KB manage page', () => {
    //Already in KB manage page
    var url = browser.getUrl()
    //Navigating to KB list
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    //Posting te KB manage url
    browser.url(url)
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(KintoBlockManage.commitComponentInManagePage.isVisible()).to.eql(
      true
    )
  })

  //TC_891
  it('should verify that commits component is accessible, when user navigates to KB manage page via "view all tags" drop down triggered via KB list card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    var kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.dropdownIsShown.waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.getBranchAndTagSwitcher(0, 'branch').waitForVisible()
    KintoBlockList.getTagFromBranchAndTagSwitcher(0, 'tag', 1).waitForVisible()
    var branchName = KintoBlockList.getTagFromBranchAndTagSwitcher(
      0,
      'tag',
      1
    ).getText()
    KintoBlockList.getTagFromBranchAndTagSwitcher(0, 'tag', 1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - ' + branchName)
    browser.scroll(0, 2000)
    expect(KintoBlockManage.commitComponentInManagePage.isVisible()).to.eql(
      true
    )
  })

  //TC_892
  it('should verify that commits component is accessible, when user navigates to KB manage page via "KB switcher" in KB manage page', () => {
    //Already in KB manage page
    browser.scroll(0, -2000)
    KintoBlockManage.kbListDropDown.click()
    KintoBlockManage.dropdownIsShownShort.waitForVisible()
    KintoBlockManage.getKbFromBreadcrumbDropDown(1).waitForVisible()
    KintoBlockManage.getKbFromBreadcrumbDropDown(1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(KintoBlockManage.commitComponentInManagePage.isVisible()).to.eql(
      true
    )
  })

  //TC_893
  it('should verify that commits component is accessible, when user navigates to KB manage page via "Branch/Tag switcher" in KB manage page', () => {
    //Already in KB manage page
    browser.scroll(0, -2000)
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(KintoBlockManage.commitComponentInManagePage.isVisible()).to.eql(
      true
    )
  })

  //TC_894
  it('should verify that commits component in KB manage has title as "Commits"', () => {
    expect(KintoBlockManage.commitComponentTitle.getText()).to.eql(
      'Builds & Repository'
    )
  })

  //TC_895
  it('should verify that commits component in KB manage has subtitle as "The latest successfully built commit and other recent builds."', () => {
    expect(KintoBlockManage.commitComponentSubtitle.getText()).to.eql(
      'The latest successful build and other recent builds from your repo source.'
    )
  })

  //TC_896
  it('should verify that commits component in KB manage page has subparts "LATEST SUCCESSFULLY BUILT COMMIT" and "RECENT COMMITS"', () => {
    expect(
      KintoBlockManage.latestSuccessfulBuildCommitComponent.isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.latestSuccessfulBuildCommitComponentTitle.getText()
    ).to.eql('LATEST BUILD')
    expect(KintoBlockManage.recentCommitComponent.isVisible()).to.eql(true)
    var commitFirstSubpart = KintoBlockManage.recentCommitComponent
      .getText()
      .split('\n')
    var FirstIndex = commitFirstSubpart[0]
    expect(FirstIndex).to.eql('RECENT BUILDS')
  })

  //TC_897
  it('should verify whether "LATEST SUCCESSFULLY BUILT COMMIT" subpart in KB manage page displays build icon, build id, Date&Time, "refresh commit" button and notes', () => {
    expect(KintoBlockManage.buildIconInLatestBuild.isVisible()).to.eql(true)
    //commit id is along with date. need to segregate id and date separately
    expect(KintoBlockManage.commitDateAndTimeInLatestBuilds.isVisible()).to.eql(
      true
    )
    //expect(KintoBlockManage.latestCommitText.isVisible()).to.eql(true)
    expect(KintoBlockManage.refreshCommitBtn.isVisible()).to.eql(true)
  })

  //TC_898
  it('should verify whether "RECENT COMMITS" subpart in KB manage page displays build icon, build id,commit icon, Date&Time and notes', () => {
    //No more build icon in latest UI
    // expect(KintoBlockManage.getBuildIconInRecentCommits(1).isVisible()).to.eql(
    //   true
    // )
    browser.scroll(0, 300)
    expect(KintoBlockManage.getCommitCode(1).isVisible()).to.eql(true)
    expect(
      KintoBlockManage.getCommitDateAndTimeInRecentCommits(1).isVisible()
    ).to.eql(true)
    KintoBlockManage.refreshCommitBtn.moveToObject()
    // KintoBlockManage.getBuildTextInRecentCommits(1).click()
    expect(KintoBlockManage.commitText.isVisible()).to.eql(true)
    expect(KintoBlockManage.getOpenLogLinkOfBuilds(1).isVisible()).to.eql(true)
  })

  //TC_902
  it('should display tool tip text, when user click on tool tip of commits component in KB manage page', () => {
    browser.scroll(0, 200)
    KintoBlockManage.commitComponentToolTip.click()
    KintoBlockManage.commitComponentToolTipText.waitForVisible()
    expect(KintoBlockManage.commitComponentToolTipText.getText()).to.eql(
      'Only a successful build can be tagged.'
    )
  })

  //TC_903
  it('should verify that commit in the commits component and GitHub are matching', () => {
    browser.scroll(0, 400)
    // KintoBlockManage.getCommitCode(1).click()
    KintoBlockManage.commitText.waitForVisible()
    var commitNote = KintoBlockManage.commitText.getText()
    KintoBlockManage.openRepoBtn.scroll(0, 700)
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[1])
    browser.pause(2000)
    KintoBlockManage.commitTextFromGitHub.waitForVisible()
    expect(commitNote).to.eql(KintoBlockManage.commitTextFromGitHub.getText())
  })

  //TC_904
  it('should verify that commits component is accessible, when user navigates to KB tagged page via "view all tags" drop down triggered in KB list card', () => {
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[0])
    browser.pause(2000)
    KintoBlockManage.form.waitForVisible()
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.setValue('0')
    KintoBlockManage.revision.setValue('0')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.dropdownIsShown.waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.getBranchAndTagSwitcher(0, 'tag').waitForVisible()
    KintoBlockList.getBranchAndTagSwitcher(0, 'tag').leftClick()
    KintoBlockList.getTagFromBranchAndTagSwitcher(0, 'tag', 1).waitForVisible()
    var tagNumber = KintoBlockList.getTagFromBranchAndTagSwitcher(
      0,
      'tag',
      1
    ).getText()
    KintoBlockList.getTagFromBranchAndTagSwitcher(0, 'tag', 1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - ' + tagNumber)
    browser.scroll(0, 2000)
    expect(KintoBlockManage.commitComponentInTaggedPage.isVisible()).to.eql(
      true
    )
  })

  //TC_905
  it('should verify that commits component is accessible, when user navigates to KB tagged page via "Branch/Tag switcher" in KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(KintoBlockManage.commitComponentInTaggedPage.isVisible()).to.eql(
      true
    )
  })

  //TC_906
  it('should verify that commits component is accessible, when user navigates to KB tagged page via "Branch/Tag switcher" in KB tagged page', () => {
    //Already in tagged page
    //Commenting below click as tag drop down is not disappearing even tag is selected from the drop down
    // KintoBlockManage.branchTagDropDown.click()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(KintoBlockManage.commitComponentInTaggedPage.isVisible()).to.eql(
      true
    )
  })

  //TC_907
  it('should verify that commits component is accessible, when user enters the URL of KB tagged page and navigates to KB tagged page', () => {
    //Already in KB tagged page
    var url = browser.getUrl()
    //Navigating to KB list
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    //Posting te KB tagged url
    browser.url(url)
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    expect(KintoBlockManage.commitComponentInTaggedPage.isVisible()).to.eql(
      true
    )
  })

  //TC_908
  it('should verify that commits component in KB manage has title as "Commits"', () => {
    expect(KintoBlockManage.commitComponentTitle.getText()).to.eql(
      'Builds & Repository'
    )
  })

  //TC_909
  it('should verify that commits component in KB manage has subtitle as "The latest successfully built commit and other recent builds."', () => {
    expect(KintoBlockManage.commitComponentSubtitle.getText()).to.eql(
      'The latest successful build and other recent builds from your repo source.'
    )
  })

  //TC_910
  it('should verify that commit component in KB tagged page displays "TAGGED COMMIT" subpart', () => {
    expect(KintoBlockManage.taggedCommitComponent.isVisible()).to.eql(true)
    var commitSubpart = KintoBlockManage.taggedCommitComponentTitle
      .getText()
      .split('\n')
    var FirstIndex = commitSubpart[0]
    expect(FirstIndex).to.eql('TAGGED BUILD')
  })

  //TC_911
  it('should verify whether "TAGGED COMMIT" subpart in KB tagged page displays icon, commit id, Date&Time and notes', () => {
    expect(KintoBlockManage.buildIconInLatestBuild.isVisible()).to.eql(true)
    //commit id is along with date. need to segregate id and date separately
    expect(KintoBlockManage.commitDateAndTimeInLatestBuilds.isVisible()).to.eql(
      true
    )
    //expect(KintoBlockManage.latestCommitText.isVisible()).to.eql(true)
  })

  //TC_912
  it('should verify that "TAGGED COMMIT" subpart of commits component is not displayed in KB tagged page', () => {
    expect(KintoBlockManage.recentCommitComponent.isVisible()).to.eql(false)
  })

  //TC_913
  it('should verify that "TAGGED COMMIT" subpart of commits component is not empty in KB tagged page', () => {
    expect(KintoBlockManage.buildIconInLatestBuild.isVisible()).to.eql(true)
    //commit id is along with date. need to segregate id and date separately
    expect(KintoBlockManage.commitDateAndTimeInLatestBuilds.isVisible()).to.eql(
      true
    )
    //expect(KintoBlockManage.latestCommitText.isVisible()).to.eql(true)
  })

  //TC_914
  it('should display tool tip text, when user click on tool tip of commits component in KB tagged page', () => {
    browser.scroll(0, -100)
    KintoBlockManage.commitComponentToolTip.click()
    KintoBlockManage.commitComponentToolTipText.waitForVisible()
    expect(KintoBlockManage.commitComponentToolTipText.getText()).to.eql(
      'Only a successful build can be tagged.'
    )
  })

  it('should generate a new build for the KintoBlock', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 500)
    KintoBlockManage.getRetryBtnForBuilds(1).click()
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should validate whether KintoBlock build reached success in Commits component - 2', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_915
  it('should verify that tag is always commited using latest commit', () => {
    var latestCommit = KintoBlockManage.latestCommitText.getText()
    browser.scroll(0, 400)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    expect(KintoBlockManage.latestCommitInTagCommitPopUp.getText()).to.eql(
      latestCommit
    )
  })

  //TC_916
  it('should verify that "TAGGED COMMIT" in KB tagged page displays always the latest commit with which its been tagged', () => {
    //In previous test script we are triggering tag pop up with latest commit
    var latestCommit = KintoBlockManage.latestCommitInTagCommitPopUp.getText()
    KintoBlockManage.majorVersion.setValue('5')
    KintoBlockManage.minorVersion.setValue('0')
    KintoBlockManage.revision.setValue('1')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.latestCommitText.waitForVisible()
    expect(KintoBlockManage.latestCommitText.getText()).to.eql(latestCommit)
  })

  //TC_900
  //Skipped for bug KB create using w/o pre-pop
  it.skip('should verify that subparts of commits component in KB manage page displays relevant text, if the commit has been made in GitHub', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.microserviceTypeIcon.waitForVisible()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKBNameWithOddNumbers + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    KintoBlockCreate.organisationDropDown.click()
    browser.pause(2000)
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    var reponame = testData.kintoblock.validRepoNameWithChar + randomName
    KintoBlockCreate.repository.input.setValue(reponame)
    // browser.keys('Tab')
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    //Latest successfully built commit
    expect(KintoBlockManage.noCommit.getText()).to.eql(
      'No build was built successfully yet.'
    )
    expect(KintoBlockManage.noCommitTextInRecentCommit.getText()).to.eql(
      'No commit has been made on your repo source'
    )
  })

  it.skip('should display "Recent" commits for KB created without pre-populating, when user clicks on "Check for new commits" button', () => {
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    KintoBlockManage.refreshCommitBtn.scroll(0, 500)
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.getRecentCommitText(1).waitForVisible()
    expect(KintoBlockManage.getRecentCommitText(1).isVisible()).to.eql(true)
  })

  it('should verify that latest successfully built commit is updated as per new successful commits made in GitHub', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbName = testData.kintoblock.validKintoBlockName + '25' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.repoResourceDropDown.click()
    KintoBlockCreate.getOrganisationOptions('GitHub').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('GitHub').click()
    browser.pause(2000)
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(
      testData.kintoblock.validRepoWithConsoleLogs
    )
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validRepoWithConsoleLogs
    ).waitForVisible()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validRepoWithConsoleLogs
    ).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 500)
  })

  it('should wait for the KB of type microservice to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KB of type microservice to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should validate whether KintoBlock build reached success in Commits component - 3', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should do a new commit in the "GitHub"', () => {
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.openRepoBtn.scroll(0, 600)
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[2])
    browser.pause(5000)
    KintoBlockManage.readMeEdit.waitForVisible()
    KintoBlockManage.readMeEdit.click()
    browser.pause(3000)
    KintoBlockManage.editIconInGitHub.waitForVisible()
    KintoBlockManage.editIconInGitHub.leftClick()
    browser.pause(2000)
    expect(KintoBlockManage.editIconInGitHub.isVisible()).to.eql(false)
    KintoBlockManage.updateReadMeName.waitForVisible()
    randomName = KintoBlockCreate.randomName()
    readMeName = testData.kintoblock.validReadMeName + randomName
    KintoBlockManage.updateReadMeName.setValue(readMeName)
    textInGitHub = KintoBlockManage.commitChangesUpdateField.getAttribute(
      'placeholder'
    )
    KintoBlockManage.commitChangesBtn.click()
    browser.pause(3000)
  })

  it('should switch to "KintoHub" and generate build for the new commit made', () => {
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[0])
    browser.pause(3000)
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.pause(5000)
    KintoBlockManage.previousCommit.waitForVisible()
  })

  it('should wait for the KB of type microservice to move to PROCESSING for new commit', () => {
    browser.pause(100000)
  })

  it('should wait for the KB of type microservice to move to PROCESSING for new commit', () => {
    browser.pause(100000)
  })

  it('should check whether KintoBlock build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should check for previous and latest commit in "Recent Commit" section and latest commit should br updated with latest commit', () => {
    //Verifying whether latest commit doesn't display previous text
    expect(KintoBlockManage.latestCommitText.getText().slice(0, 5)).to.not.eql(
      KintoBlockManage.getRecentCommitText(2).getText()
    )
    browser.scroll(0, 400)
    // KintoBlockManage.getBuildTextInRecentCommits(1).click()
    expect(KintoBlockManage.commitText.getText()).to.eql(textInGitHub)
    //Verifying whether latest commit displays recent commit made in GitHub
    expect(KintoBlockManage.latestCommitText.getText().slice(0, 5)).to.eql(
      KintoBlockManage.getRecentCommitText(1).getText()
    )
  })

  it('should logout from KB - Commits components', () => {
    KintoBlockManage.logout()
  })
})

describe('KB Builds 5 - Documentation page', () => {
  it('should create a KB', () => {
    Login.registerAndLogin('DP')
    WorkspaceManage.linkGithubSecondTime()
    DashboardIndex.container.waitForExist()
    DashboardIndex.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbName = testData.kintoblock.validKintoBlockName + '49' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.selectExistingRepository()
    browser.pause(2000)
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
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

  it('should validate whether KintoBlock build reached success - 1', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_917
  it('should verify that user is navigated to KB documentation page via KB manage page, when user clicks on "View Endpoints" button', () => {
    browser.scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.setValue('0')
    KintoBlockManage.revision.setValue('0')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
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
    expect(KintoBlockManage.viewEndpointsTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  it('should create a authexample KB', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbName = testData.kintoblock.validAuthKB + '49' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
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
    KintoBlockCreate.existingRepo.setValue(testData.kintoblock.validAuthKB)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validAuthKB
    ).waitForVisible()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validAuthKB
    ).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.pause(2000)
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should create a blogexample KB', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbName = testData.kintoblock.validBlogKB + '05' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
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
    KintoBlockCreate.existingRepo.setValue(testData.kintoblock.validBlogKB)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validBlogKB
    ).waitForVisible()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validBlogKB
    ).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.pause(2000)
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the blogexample KB to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the blogexample KB to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should validate whether blogexample KB build reached success', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_918
  it('should verify that user is navigated to KB documentation page via KB tagged page, when user clicks on "View Endpoints" button', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    var tagNumber = KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(
      KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    ).to.eql(tagNumber)
    expect(KintoBlockManage.viewEndpointsTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  it('should navigate user to documentation page, when user clicks on "View Endpoints" option from any KB card drop down', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.getEditBranchOption(0).waitForVisible()
    KintoBlockList.getViewEndpointsOption(0).waitForVisible()
    KintoBlockList.getViewEndpointsOption(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.viewEndpointsTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  //TC_920
  it('should verify that docummentation page is displayed for KB branch', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    var branchName = KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    expect(
      KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    ).to.eql(branchName)
  })

  //TC_922
  it('should verify that documentation page is displayed for KB tag', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    var tagNumber = KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(
      KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    ).to.eql(tagNumber)
  })

  //TC_923
  it('should verify that user is navigated to documentation page, when user clicks on "View Endpoints" button of any dependencies in KA manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    var kbName = KintoBlockList.getKbCardName(0).getText()
    DeploymentCreate.open(ws)
    DeploymentCreate.form.waitForVisible()
    DeploymentCreate.loadingFinished.waitForExist()
    var kaName =
      testData.kintoapp.validKintoAppName +
      '94' +
      currentTime.getMinutes() +
      currentTime.getSeconds() +
      'p'
    DeploymentCreate.name.input.setValue(kaName)
    DeploymentCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DeploymentCreate.kbdropDown.scroll()
    DeploymentCreate.kbdropDown.setValue(kbName)
    KintoBlockList.getFilteredKB(kbName).waitForVisible()
    browser.keys('Enter')
    DeploymentCreate.loadingFinished.waitForExist()
    DeploymentCreate.submitGlobal()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.amazingBtn.waitForExist()
    DeploymentManage.amazingBtn.click()
    browser.scroll(0, 2000)
    DeploymentManage.getDepEndpoint(1).moveToObject()
    DeploymentManage.getDepEndpoint(1).click()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kbDocumentionPage.waitForVisible()
    expect(KintoBlockManage.viewEndpointsTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  //TC_923
  it.skip('should verify that user is navigated to documentation page, when user clicks on "View Endpoints" button of any dependencies in KA tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentList.open(ws)
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.myDeploymentList.waitForVisible()
    DeploymentList.loadingFinished.waitForExist()
    DeploymentList.getCard(0).waitForVisible()
    DeploymentList.getCard(0).click()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.draftDropDownFromBreadcrumb.leftClick()
    DeploymentManage.dropdownIsShown.waitForVisible()
    DeploymentManage.getTagNumberFromDraftDropDown(2).waitForVisible()
    DeploymentManage.getTagNumberFromDraftDropDown(2).leftClick()
    DeploymentManage.form.waitForVisible()
    DeploymentManage.loadingFinished.waitForExist()
    expect(DeploymentManage.tagVersionFromBreadcrumb.getText()).to.eql('1.2.3')
    browser.scroll(0, 2000)
    DeploymentManage.getDepViewEndpointsBtn(1).scroll()
    var href = DeploymentManage.getDepViewEndpointsBtn(1).getAttribute('href')
    browser.url(href)
    DeploymentManage.loadingFinished.waitForExist()
    DeploymentManage.kbDocumentionPage.waitForVisible()
    expect(KintoBlockManage.viewEndpointsTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  //TC_928
  it.skip('should verify whether title of KB branch documentation page is displayed as "Endpoint Documentation"', () => {
    //Already in KB branch documentation page
    expect(KintoBlockManage.viewEndpointsTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  //TC_924
  it.skip('should navigate to documentation page of selected branch via branch/tag switcher triggered in KB branch documentation page', () => {
    KintoBlockManage.branchTagDropDown.waitForVisible()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    var branchName = KintoBlockManage.getBranchNameFromBranchTagSwitcher(
      1
    ).getText()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(
      KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    ).to.eql(branchName)
  })

  //TC_929
  it('should verify that "endpoint search bar" and "endpoint list" is displayed in KB branch documentation page', () => {
    expect(KintoBlockManage.endpointSearchBar.isVisible()).to.eql(true)
    //For now it displays only one endpoint
    KintoBlockManage.getEndpointsFromEndpointsList(1, 2).waitForVisible()
    expect(
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).isVisible()
    ).to.eql(true)
  })

  //TC_930
  it('should display "endpoint definition", "session data" component, "restful tab" and "parameters" components of KB branch documentation page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.waitForVisible()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.endpointDefinition.isVisible()).to.eql(true)
    KintoBlockManage.exposedSessionData.moveToObject()
    expect(KintoBlockManage.exposedSessionData.isVisible()).to.eql(true)
    expect(KintoBlockManage.exposedSessionData.getText()).to.eql(
      'Exposed Session Data'
    )
    KintoBlockManage.getProtocolTabs(1).moveToObject()
    expect(KintoBlockManage.getProtocolTabs(1).isVisible()).to.eql(true)
    expect(KintoBlockManage.getProtocolTabs(2).isVisible()).to.eql(true)
    expect(KintoBlockManage.getProtocolTabs(3).isVisible()).to.eql(true)
    KintoBlockManage.getRestFullTabs(1).moveToObject()
    expect(KintoBlockManage.getRestFullTabs(1).isVisible()).to.eql(true)

    //As 200 is expanded by default closing it
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(2).moveToObject()
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(2).click()
    KintoBlockManage.responseCodeComponent.moveToObject()
    expect(KintoBlockManage.responseCodeComponent.isVisible()).to.eql(true)
    expect(KintoBlockManage.responseCodeComponent.getText()).to.eql(
      'Response Code'
    )
    //The following two restfull tabs are removed for now
    // KintoBlockManage.getRestFullTabs(2).moveToObject()
    // expect(KintoBlockManage.getRestFullTabs(2).isVisible()).to.eql(true)
    // KintoBlockManage.getRestFullTabs(3).moveToObject()
    // expect(KintoBlockManage.getRestFullTabs(3).isVisible()).to.eql(true)

    //request parameters
    //Commented below line as because "Request parameters" are not displayed for KB created using KB sample
    //expect(KintoBlockManage.requestParametersSection.isVisible()).to.eql('Request Parameters')

    //URL parameters and Query parameters not implemented

    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(2).waitForVisible()
    KintoBlockList.getCard(2).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.waitForVisible()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.requiredSessionData.moveToObject()
    expect(KintoBlockManage.requiredSessionData.isVisible()).to.eql(true)
    expect(KintoBlockManage.requiredSessionData.getText()).to.eql(
      'Required Session Data'
    )
  })

  //TC_931
  it('should verify that "copy" and "expand" buttons are displayed in "Restful Tabs", "Response codes" and "Session Data" components of KB branch documentation page', () => {
    KintoBlockManage.requiredSessionExpandORCollapseBtn.moveToObject()
    expect(
      KintoBlockManage.requiredSessionExpandORCollapseBtn.isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.requiredSessionDataExpandORCollapseText.getText()
    ).to.eql('Expand')

    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.waitForVisible()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()

    KintoBlockManage.exposedSessionExpandORCollapseBtn.moveToObject()
    expect(
      KintoBlockManage.exposedSessionExpandORCollapseBtn.isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.exposedSessionDataExpandORCollapseText.getText()
    ).to.eql('Expand')

    //To get response codes expand button index starts from 2
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(2).moveToObject()
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseBtn(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(2).getText()
    ).to.eql('Collapse')
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(3).moveToObject()
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseBtn(3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(3).getText()
    ).to.eql('Expand')

    //Endpoint
    KintoBlockManage.endpointSectionCopyBtn.moveToObject()
    expect(KintoBlockManage.endpointSectionCopyBtn.isVisible()).to.eql(true)
    expect(KintoBlockManage.endpointSectionCopyBtn.getText()).to.eql('Copy')

    //Below are commented as there are not displayed in application for now

    //request example

    // KintoBlockManage.requestExampleCopyBtn.moveToObject()
    // expect(KintoBlockManage.requestExampleCopyBtn.isVisible()).to.eql(true)
    // expect(KintoBlockManage.requestExampleCopyBtn.getText()).to.eql('Copy')
    // KintoBlockManage.requestExampleExpandORCollapseBtn.moveToObject()
    // expect(
    //   KintoBlockManage.requestExampleExpandORCollapseBtn.isVisible()
    // ).to.eql(true)
    // expect(s
    //   KintoBlockManage.requestExampleExpandORCollapseText.getText()
    // ).to.eql('Expand')

    //respond body

    // KintoBlockManage.responseBodyCopyBtn.moveToObject()
    // expect(KintoBlockManage.responseBodyCopyBtn.isVisible()).to.eql(true)
    // expect(KintoBlockManage.responseBodyCopyBtn.getText()).to.eql('Copy')
    // KintoBlockManage.responseBodyExpandORCollapseBtn.moveToObject()
    // expect(KintoBlockManage.responseBodyExpandORCollapseBtn.isVisible()).to.eql(
    //   true
    // )
    // expect(KintoBlockManage.responseBodyExpandORCollapseText.getText()).to.eql(
    //   'Expand'
    // )
  })

  //TC_933
  it('should display "endpoints list" below "endpoints search bar" in KB branch documentation page', () => {
    //For now it displays only one endpoint
    KintoBlockManage.getEndpointsFromEndpointsList(1, 2).moveToObject()
    KintoBlockManage.getEndpointsFromEndpointsList(1, 2).waitForVisible()
    expect(
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).isVisible()
    ).to.eql(true)
  })

  //TC_932
  it('should verify that search bar in KB branch documentation page acts as a real time filter', () => {
    KintoBlockManage.endpointSearchBar.moveToObject()
    KintoBlockManage.endpointSearchBar.setValue('sample')
    //getEndpointsFromEndpointsList('index for the endpoins in list','endpoint name')
    //If you pass 1 at "endpoint name" you will get api name
    KintoBlockManage.getEndpointsFromEndpointsList(1, 2).waitForVisible()
    expect(
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).getText()
    ).to.eql('sample')
    KintoBlockManage.endpointSearchBar.setValue('example')
    expect(
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).isVisible()
    ).to.eql(false)
  })

  //TC_925
  it('should navigate to documentation page of KB branch, when user enters the URL of the page', () => {
    var URL = browser.getUrl()
    var branchName = KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    //Navigating to KB list page
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    //Posting URL of KB branch documentation page
    browser.url(URL)
    KintoBlockManage.loadingFinished.waitForExist()
    expect(
      KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    ).to.eql(branchName)
  })

  //TC_935
  it('should verify that full text of the endpoint is displayed, when user hover over the endpoints in the endpoints list of Kb branch documentation page', () => {
    KintoBlockManage.getEndpointsFromEndpointsList(1, 2).waitForVisible()
    KintoBlockManage.getEndpointsFromEndpointsList(1, 2).moveToObject()
    var endpointName =
      KintoBlockManage.getEndpointsFromEndpointsList(1, 1).getText() +
      ' ' +
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).getText()
    KintoBlockManage.toolTipInnerText.waitForVisible()
    expect(KintoBlockManage.toolTipInnerText.getText()).to.eql(endpointName)
  })

  //TC_936
  it('should verify that selected endpoint is displayed on the right pane of KB branch documentation page', () => {
    //For now only one endpoint is displayed for Kb created using kinto sample
    //So it will selected by default
    var endpointNameSelected =
      KintoBlockManage.getEndpointsFromEndpointsList(1, 1).getText() +
      ' ' +
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).getText()
    var endpointNameInRightPane =
      KintoBlockManage.getEndpointDefinitionSection(1).getText() +
      ' ' +
      KintoBlockManage.getEndpointDefinitionSection(2).getText()
    expect(endpointNameSelected).to.eql(endpointNameInRightPane)
  })

  //TC_937
  it('should display "color coded verb", "endpoint name" and "endpoint definition" in endpoint section of KB branch documentation page', () => {
    //Color code verb do it manual
    expect(KintoBlockManage.getEndpointDefinitionSection(2).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.endpointDefinition.isVisible()).to.eql(true)
  })

  //TC_944
  it('should verify that "Exposed session data" is collapsed by default in KB branch documentation page', () => {
    KintoBlockManage.exposedSessionDataExpandORCollapseText.moveToObject()
    expect(
      KintoBlockManage.exposedSessionDataExpandORCollapseText.getText()
    ).to.eql('Expand')
    expect(
      KintoBlockManage.parameterTableForExposedSessionData.isVisible()
    ).to.eql(false)
  })

  //TC_945
  it('should verify that "Exposed session data" is expanded in KB branch documentation page, when user clicks expand icon for "Exposed session data"', () => {
    KintoBlockManage.exposedSessionExpandORCollapseBtn.leftClick()
    browser.pause(2000)
    expect(
      KintoBlockManage.exposedSessionDataExpandORCollapseText.getText()
    ).to.eql('Collapse')
    KintoBlockManage.parameterTableForExposedSessionData.moveToObject()
    expect(
      KintoBlockManage.parameterTableForExposedSessionData.isVisible()
    ).to.eql(true)
  })

  //TC_946
  it('should verify that "Exposed session data" table in KB branch documentation page displays two columns "Parameter name" and "Type"', () => {
    KintoBlockManage.getColumnsOfExposedSessionDataTable(1).moveToObject()
    expect(
      KintoBlockManage.getColumnsOfExposedSessionDataTable(1).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getColumnsOfExposedSessionDataTable(1).getText()
    ).to.eql('PARAMETER NAME')
    expect(
      KintoBlockManage.getColumnsOfExposedSessionDataTable(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getColumnsOfExposedSessionDataTable(2).getText()
    ).to.eql('TYPE')
  })

  //TC_947
  it('should verify that "Exposed session data" table in KB branch documentation page displays "Parameter name", "Parameter type", "Parent arrow" and "Parameter definition"', () => {
    //Parameter name should be kbsampleprovidej-account-id
    //Parameter type should be string
    //Parameter description should be testing the dependency headers
    KintoBlockManage.getParameterDescriptionInExposedSessionDataTable(
      2
    ).moveToObject()
    expect(
      KintoBlockManage.getParameterNameInExposedSessionDataTable(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterNameInExposedSessionDataTable(2).getText()
    ).to.eql('kbsampleprovidej-account-id')
    expect(
      KintoBlockManage.getParameterRequiredTagInExposedSessionDataTable(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInExposedSessionDataTable(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInExposedSessionDataTable(2).getText()
    ).to.eql('String')
    expect(
      KintoBlockManage.getParameterDescriptionInExposedSessionDataTable(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterDescriptionInExposedSessionDataTable(
        2
      ).getText()
    ).to.eql('testing the dependency headers')
  })

  //TC_948
  it('should verify that "Exposed session data" is collapsed in KB branch documentation page, when user clicks collapse icon for "Exposed session data"', () => {
    KintoBlockManage.exposedSessionDataExpandORCollapseText.moveToObject()
    expect(
      KintoBlockManage.exposedSessionDataExpandORCollapseText.getText()
    ).to.eql('Collapse')
    expect(
      KintoBlockManage.parameterTableForExposedSessionData.isVisible()
    ).to.eql(true)
    KintoBlockManage.exposedSessionExpandORCollapseBtn.leftClick()
    browser.pause(2000)
    expect(
      KintoBlockManage.exposedSessionDataExpandORCollapseText.getText()
    ).to.eql('Expand')
    expect(
      KintoBlockManage.parameterTableForExposedSessionData.isVisible()
    ).to.eql(false)
  })

  //TC_949
  it('should verify whether tool tip text is displayed for "?" icon in KB branch documentation page, when user clicks on it in "Exposed Session"', () => {
    KintoBlockManage.exposedSessionToolTipIcon.moveToObject()
    KintoBlockManage.exposedSessionToolTipIcon.leftClick()
    KintoBlockManage.exposedSessionToolTipText.waitForVisible()
    expect(KintoBlockManage.exposedSessionToolTipText.getText()).to.eql(
      'Session data set upon returning a successful response from the endpoint'
    )
  })

  //TC_951
  it('should verify that "Response Codes" 200 is Expanded by default and other response codes are collapsed by default in KB branch documentation page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.getResponseCodeExpandORCollapseText(2).moveToObject()
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(2).getText()
    ).to.eql('Collapse')
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        2
      ).isVisible()
    ).to.eql(false)
    KintoBlockManage.getResponseCodeExpandORCollapseText(3).moveToObject()
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(3).getText()
    ).to.eql('Expand')
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        3
      ).isVisible()
    ).to.eql(false)
  })

  //TC_952
  it('should verify that "Response Codes" component is expanded in KB branch documentation page, when user clicks expand icon for "Response Codes" component', () => {
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(2).moveToObject()
    //Used double click to handle previous actions
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(2).leftClick()
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(2).leftClick()
    browser.pause(2000)
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(2).getText()
    ).to.eql('Collapse')
    KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
      2
    ).moveToObject()
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        2
      ).isVisible()
    ).to.eql(true)
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(3).leftClick()
    browser.pause(2000)
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(3).getText()
    ).to.eql('Collapse')
    KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
      3
    ).moveToObject()
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        3
      ).isVisible()
    ).to.eql(true)
  })

  //TC_953
  it('should verify that "Response Codes" component in KB branch documentation page displays two columns "Parameter name" and "Type"', () => {
    KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
      2,
      1
    ).moveToObject()
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        2,
        1
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        2,
        1
      ).getText()
    ).to.eql('PARAMETER NAME')
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        2,
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        2,
        2
      ).getText()
    ).to.eql('TYPE')
    KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
      3,
      1
    ).moveToObject()
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        3,
        1
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        3,
        1
      ).getText()
    ).to.eql('PARAMETER NAME')
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        3,
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        3,
        2
      ).getText()
    ).to.eql('TYPE')
  })

  //TC_954
  it('should verify that "Response Codes" component table in KB branch documentation page displays "Parameter name", "Parameter type", "Parent arrow" and "Parameter definition"', () => {
    //Two parameters will be displayed
    //Parameter name should be requestHeaders and data
    //Parameter type should be object and string
    //Parameter description should be the request headers sent and test text
    KintoBlockManage.getParameterDescriptionInResponseCodesTable(
      2
    ).moveToObject()
    expect(
      KintoBlockManage.getParameterNameInResponseCodesTable(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterNameInResponseCodesTable(2).getText()
    ).to.eql('requestHeaders')
    expect(
      KintoBlockManage.getParameterRequiredTagInResponseCodesTable(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInResponseCodesTable(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInResponseCodesTable(2).getText()
    ).to.eql('Object')
    expect(
      KintoBlockManage.getParameterDescriptionInResponseCodesTable(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterDescriptionInResponseCodesTable(2).getText()
    ).to.eql('the request headers sent')
    KintoBlockManage.getParameterDescriptionInResponseCodesTable(
      3
    ).moveToObject()
    expect(
      KintoBlockManage.getParameterNameInResponseCodesTable(3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterNameInResponseCodesTable(3).getText()
    ).to.eql('data')
    expect(
      KintoBlockManage.getParameterRequiredTagInResponseCodesTable(
        3
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInResponseCodesTable(3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInResponseCodesTable(3).getText()
    ).to.eql('String')
    expect(
      KintoBlockManage.getParameterDescriptionInResponseCodesTable(
        3
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterDescriptionInResponseCodesTable(3).getText()
    ).to.eql('test text')
  })

  // //TC_957
  // it('should verify whether tool tip text is displayed for "?" icon in KB branch documentation page, when user clicks on it in "Response parameters" table', () => {
  //   KintoBlockManage.getResponseParametersTableToolTipIconFromResponeCodeSection(2).moveToObject()
  //   KintoBlockManage.getResponseParametersTableToolTipIconFromResponeCodeSection(2).click()
  //   browser.pause(2000)

  // })

  //TC_955
  it('should verify that "Response Codes" component is collapsed in KB branch documentation page, when user clicks collapse icon for "Response Codes" componen4"', () => {
    KintoBlockManage.getResponseCodeExpandORCollapseText(2).moveToObject()
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(2).getText()
    ).to.eql('Collapse')
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        2
      ).isVisible()
    ).to.eql(true)
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(2).leftClick()
    browser.pause(2000)
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(2).getText()
    ).to.eql('Expand')
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        2
      ).isVisible()
    ).to.eql(false)
    KintoBlockManage.getResponseCodeExpandORCollapseText(3).moveToObject()
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(3).getText()
    ).to.eql('Collapse')
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        3
      ).isVisible()
    ).to.eql(true)
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(3).leftClick()
    browser.pause(2000)
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(3).getText()
    ).to.eql('Expand')
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        3
      ).isVisible()
    ).to.eql(false)
  })

  // //TC_956
  // it('should verify whether tool tip text is displayed for "?" icon in KB branch documentation page, when user clicks on it in "Response code"', () => {
  //   KintoBlockManage.responseCodeComponentToolTipIcon.leftClick()
  //   KintoBlockManage.responseCodeToolTipText.moveToObject()
  //   KintoBlockManage.responseCodeToolTipText.waitForVisible()
  //   expect(KintoBlockManage.responseCodeToolTipText.getText()).to.eql(
  //     'Response code number and details following HTTP Status Code standard'
  //   )
  // })

  //TC_958
  it('should display protocol tabs in KB branch documentation page', () => {
    KintoBlockManage.getProtocolTabs(1).moveToObject()
    expect(KintoBlockManage.getProtocolTabs(1).isVisible()).to.eql(true)
    expect(KintoBlockManage.getProtocolTabs(1).getText()).to.eql('gRPC')
    expect(KintoBlockManage.getProtocolTabs(2).isVisible()).to.eql(true)
    expect(KintoBlockManage.getProtocolTabs(2).getText()).to.eql('GraphQL')
    expect(KintoBlockManage.getProtocolTabs(3).isVisible()).to.eql(true)
    expect(KintoBlockManage.getProtocolTabs(3).getText()).to.eql('Restful')
  })

  //TC_959
  it('should verify whether "color coded verb" and "endpoint name" is displayed in "Endpoints section" of KB branch documentation page "Restful tabs"', () => {
    KintoBlockManage.endpointSection.moveToObject()
    expect(
      KintoBlockManage.getEndpointNameInRestFullEndpointSection(
        1,
        1
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getEndpointNameInRestFullEndpointSection(
        1,
        2
      ).isVisible()
    ).to.eql(true)
    var endpointNameInRestfullTab =
      KintoBlockManage.getEndpointNameInRestFullEndpointSection(
        1,
        1
      ).getText() +
      ' ' +
      KintoBlockManage.getEndpointNameInRestFullEndpointSection(1, 2).getText()
    var endpointNameInDefinition =
      KintoBlockManage.getEndpointsFromEndpointsList(1, 1).getText() +
      ' ' +
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).getText()
    expect(endpointNameInRestfullTab).to.eql(endpointNameInDefinition)
  })

  //TC_960
  it.skip('should display "Request Example" component in KB branch documnetation page', () => {
    KintoBlockManage.getRestFullTabs(2).moveToObject()
    expect(KintoBlockManage.getRestFullTabs(2).isVisible()).to.eql(true)
  })

  //TC_961
  it.skip('should display "Response body" component in KB branch documnetation page', () => {
    KintoBlockManage.getRestFullTabs(3).moveToObject()
    expect(KintoBlockManage.getRestFullTabs(3).isVisible()).to.eql(true)
  })

  // //TC_962
  // it('should verify that "Request parameters" component in KB branch documentation page displays two columns "Parameter name" and "Type"', () => {
  //   expect(
  //     KintoBlockManage.getRequestParametersTableColumns(1).isVisible()
  //   ).to.eql(true)
  //   expect(
  //     KintoBlockManage.getRequestParametersTableColumns(1).getText()
  //   ).to.eql('PARAMETER NAME')
  //   expect(
  //     KintoBlockManage.getRequestParametersTableColumns(2).isVisible()
  //   ).to.eql(true)
  //   expect(
  //     KintoBlockManage.getRequestParametersTableColumns(2).getText()
  //   ).to.eql('TYPE')
  // })

  // //TC_963
  // it('should display "Parameter name", "Parent arrow", "Parameter type" and "Parameter definition" in "Request parameters" component of KB branch documentation page', () => {
  //   //TODO
  // })

  //TC_926
  it('should navigate to documentation page of selected tag via branch/tag switcher triggered in KB tag documentation page', () => {
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('tag').leftClick()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    var tagNumber = KintoBlockManage.getTagFromBranchTagSwitcher(1).getText()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(
      KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    ).to.eql(tagNumber)
  })

  //TC_972
  it('should verify whether title of KB tag documentation page is displayed as "Endpoint Documentation"', () => {
    expect(KintoBlockManage.viewEndpointsTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  //TC_1002
  it('should display KB tag documentation breadcrumb options as "Kintoblocks", Kintoblock Name", "Tag" and "Documentation" text ', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(1).waitForVisible()
    var kbName = KintoBlockList.getKbCardName(1).getText()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.kintoBlocksTextInBreadcrumb.waitForVisible()
    expect(KintoBlockManage.kintoBlocksTextInBreadcrumb.isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.kintoBlocksTextInBreadcrumb.getText()).to.eql(
      'KintoBlocks'
    )
    expect(KintoBlockManage.kbNameInBreacdcrumb.isVisible()).to.eql(true)
    expect(KintoBlockManage.kbNameInBreacdcrumb.getText()).to.eql(kbName)
    expect(KintoBlockManage.documentationTextInBreadcrumb.isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.documentationTextInBreadcrumb.getText()).to.eql(
      'Documentation'
    )
    KintoBlockManage.branchOrTagTextInBreadcrumb.waitForVisible()
    expect(KintoBlockManage.branchOrTagTextInBreadcrumb.isVisible()).to.eql(
      true
    )
  })

  //TC_973
  it('should verify that "endpoint search bar" and "endpoint list" is displayed in KB tag documentation page', () => {
    expect(KintoBlockManage.endpointSearchBar.isVisible()).to.eql(true)
    //For now it displays only one endpoint
    KintoBlockManage.getEndpointsFromEndpointsList(1, 2).waitForVisible()
    expect(
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).isVisible()
    ).to.eql(true)
  })

  //TC_974
  it('should display "endpoint definition", "session data" component, "restful tab" and "parameters" components of KB tag documentation page', () => {
    expect(KintoBlockManage.endpointDefinition.isVisible()).to.eql(true)
    KintoBlockManage.exposedSessionData.moveToObject()
    expect(KintoBlockManage.exposedSessionData.isVisible()).to.eql(true)
    expect(KintoBlockManage.exposedSessionData.getText()).to.eql(
      'Exposed Session Data'
    )
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(2).waitForVisible()
    KintoBlockList.getCard(2).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.requiredSessionData.moveToObject()
    expect(KintoBlockManage.requiredSessionData.isVisible()).to.eql(true)
    expect(KintoBlockManage.requiredSessionData.getText()).to.eql(
      'Required Session Data'
    )

    KintoBlockManage.getProtocolTabs(1).moveToObject()
    expect(KintoBlockManage.getProtocolTabs(1).isVisible()).to.eql(true)
    expect(KintoBlockManage.getProtocolTabs(2).isVisible()).to.eql(true)
    expect(KintoBlockManage.getProtocolTabs(3).isVisible()).to.eql(true)

    KintoBlockManage.getRestFullTabs(1).moveToObject()
    expect(KintoBlockManage.getRestFullTabs(1).isVisible()).to.eql(true)

    //As 200 is expanded by default closing it
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(2).moveToObject()
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(2).click()
    KintoBlockManage.responseCodeComponent.moveToObject()
    expect(KintoBlockManage.responseCodeComponent.isVisible()).to.eql(true)
    expect(KintoBlockManage.responseCodeComponent.getText()).to.eql(
      'Response Code'
    )
    //The following two restfull tabs are removed now from application

    // KintoBlockManage.getRestFullTabs(2).moveToObject()
    // expect(KintoBlockManage.getRestFullTabs(2).isVisible()).to.eql(true)
    // KintoBlockManage.getRestFullTabs(3).moveToObject()
    // expect(KintoBlockManage.getRestFullTabs(3).isVisible()).to.eql(true)

    //request parameters
    KintoBlockManage.requestParametersSection.moveToObject()
    expect(KintoBlockManage.requestParametersSection.isVisible()).to.eql(true)
    expect(KintoBlockManage.requestParametersSection.getText()).to.eql(
      'Request Parameters'
    )

    //URL parameters and Query parameters not implemented
  })

  //TC_975
  it('should verify that "copy" and "expand" buttons are displayed in "Restful Tabs", "Response codes" and "Session Data" components of KB tag documentation page', () => {
    KintoBlockManage.requiredSessionExpandORCollapseBtn.moveToObject()
    expect(
      KintoBlockManage.requiredSessionExpandORCollapseBtn.isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.requiredSessionDataExpandORCollapseText.getText()
    ).to.eql('Expand')

    //To get response codes expand button index starts from 2
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(2).moveToObject()
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseBtn(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(2).getText()
    ).to.eql('Expand')
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(3).moveToObject()
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseBtn(3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(3).getText()
    ).to.eql('Expand')

    //Endpoint
    KintoBlockManage.endpointSectionCopyBtn.moveToObject()
    expect(KintoBlockManage.endpointSectionCopyBtn.isVisible()).to.eql(true)
    expect(KintoBlockManage.endpointSectionCopyBtn.getText()).to.eql('Copy')

    //Commented as request and respond body
    //request example
    // KintoBlockManage.requestExampleCopyBtn.moveToObject()
    // expect(KintoBlockManage.requestExampleCopyBtn.isVisible()).to.eql(true)
    // expect(KintoBlockManage.requestExampleCopyBtn.getText()).to.eql('Copy')
    // KintoBlockManage.requestExampleExpandORCollapseBtn.moveToObject()
    // expect(
    //   KintoBlockManage.requestExampleExpandORCollapseBtn.isVisible()
    // ).to.eql(true)
    // expect(
    //   KintoBlockManage.requestExampleExpandORCollapseText.getText()
    // ).to.eql('Expand')

    //respond body
    // KintoBlockManage.responseBodyCopyBtn.moveToObject()
    // expect(KintoBlockManage.responseBodyCopyBtn.isVisible()).to.eql(true)
    // expect(KintoBlockManage.responseBodyCopyBtn.getText()).to.eql('Copy')
    // KintoBlockManage.responseBodyExpandORCollapseBtn.moveToObject()
    // expect(KintoBlockManage.responseBodyExpandORCollapseBtn.isVisible()).to.eql(
    //   true
    // )
    // expect(KintoBlockManage.responseBodyExpandORCollapseText.getText()).to.eql(
    //   'Expand'
    // )
  })

  //TC_927
  it('should navigate to documentation page of KB tag, when user enters the URL of the page', () => {
    var URL = browser.getUrl()
    var tagNumber = KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    //Navigating to KB list page
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    //Posting URL of KB tag documentation page
    browser.url(URL)
    KintoBlockManage.loadingFinished.waitForExist()
    expect(
      KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    ).to.eql(tagNumber)
  })

  //TC_977
  it('should display "endpoints list" below "endpoints search bar" in KB tag documentation page', () => {
    //For now it displays only one endpoint
    KintoBlockManage.getEndpointsFromEndpointsList(1, 2).waitForVisible()
    expect(
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).isVisible()
    ).to.eql(true)
  })

  //TC_976
  it('should verify that search bar in KB tag documentation page acts as a real time filter', () => {
    KintoBlockManage.endpointSearchBar.setValue('articles')
    //getEndpointsFromEndpointsList('index for the endpoins in list','endpoint name')
    //If you pass 1 at "endpoint name" you will get api name
    KintoBlockManage.getEndpointsFromEndpointsList(1, 2).waitForVisible()
    expect(
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).getText()
    ).to.eql('/articles')
    KintoBlockManage.endpointSearchBar.setValue('example')
    expect(
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).isVisible()
    ).to.eql(false)
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
    browser.keys('Backspace')
  })

  //TC_979
  it('should verify that full text of the endpoint is displayed, when user hover over the endpoints in the endpoints list of KB tag documentation page', () => {
    KintoBlockManage.getEndpointsFromEndpointsList(1, 1).waitForVisible()
    var endpointName =
      KintoBlockManage.getEndpointsFromEndpointsList(1, 1).getText() +
      ' ' +
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).getText()
    KintoBlockManage.getEndpointsFromEndpointsList(1, 2).waitForVisible()
    KintoBlockManage.getEndpointsFromEndpointsList(1, 2).moveToObject()
    KintoBlockManage.toolTipInnerText.waitForVisible()
    expect(KintoBlockManage.toolTipInnerText.getText()).to.eql(endpointName)
  })

  //TC_980
  it('should verify that selected endpoint is displayed on the right pane of KB tag documentation page', () => {
    //For now only one endpoint is displayed for Kb created using kinto sample
    //So it will selected by default
    var endpointNameSelected =
      KintoBlockManage.getEndpointsFromEndpointsList(1, 1).getText() +
      ' ' +
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).getText()
    var endpointNameInRightPane =
      KintoBlockManage.getEndpointDefinitionSection(1).getText() +
      ' ' +
      KintoBlockManage.getEndpointDefinitionSection(2).getText()
    expect(endpointNameSelected).to.eql(endpointNameInRightPane)
  })

  //TC_981
  it('should display "color coded verb", "endpoint name" and "endpoint definition" in endpoint section of KB tag documentation page', () => {
    //Color code verb do it manual
    expect(KintoBlockManage.getEndpointDefinitionSection(2).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.endpointDefinition.isVisible()).to.eql(true)
  })

  //TC_982
  it('should verify that "Required session data" is collapsed by default in KB tag documentation page', () => {
    KintoBlockManage.requiredSessionDataExpandORCollapseText.moveToObject()
    expect(
      KintoBlockManage.requiredSessionDataExpandORCollapseText.getText()
    ).to.eql('Expand')
    expect(
      KintoBlockManage.parameterTableForRequiredSessionData.isVisible()
    ).to.eql(false)
  })

  //TC_983
  it('should verify that "Required session data" is expanded in KB tag documentation page, when user clicks expand icon for "Exposed session data"', () => {
    KintoBlockManage.requiredSessionExpandORCollapseBtn.leftClick()
    browser.pause(2000)
    expect(
      KintoBlockManage.requiredSessionDataExpandORCollapseText.getText()
    ).to.eql('Collapse')
    KintoBlockManage.parameterTableForRequiredSessionData.moveToObject()
    expect(
      KintoBlockManage.parameterTableForRequiredSessionData.isVisible()
    ).to.eql(true)
  })

  //TC_984
  it('should verify that "Required session data" table in KB tag documentation page displays two columns "Parameter name" and "Type"', () => {
    KintoBlockManage.getColumnsOfRequiredSessionDataTable(1).moveToObject()
    expect(
      KintoBlockManage.getColumnsOfRequiredSessionDataTable(1).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getColumnsOfRequiredSessionDataTable(1).getText()
    ).to.eql('PARAMETER NAME')
    expect(
      KintoBlockManage.getColumnsOfRequiredSessionDataTable(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getColumnsOfRequiredSessionDataTable(2).getText()
    ).to.eql('TYPE')
  })

  //TC_985
  it('should verify that "Required session data" table in KB tag documentation page displays "Parameter name", "Parameter type", "Parent arrow" and "Parameter definition"', () => {
    //Parameter name should be authexample-id and authexample-name
    //Parameter type both should be string
    //Parameter description should be logged in user id and logged in user name
    KintoBlockManage.getParameterNameInRequiredSessionDataTable(
      2
    ).moveToObject()
    expect(
      KintoBlockManage.getParameterNameInRequiredSessionDataTable(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterNameInRequiredSessionDataTable(2).getText()
    ).to.eql('authexample-id')
    expect(
      KintoBlockManage.getParameterTypeInRequiredSessionDataTable(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInRequiredSessionDataTable(2).getText()
    ).to.eql('String')
    KintoBlockManage.getParameterDescriptionInRequiredSessionDataTable(
      2
    ).moveToObject()
    expect(
      KintoBlockManage.getParameterDescriptionInRequiredSessionDataTable(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterDescriptionInRequiredSessionDataTable(
        2
      ).getText()
    ).to.eql('logged in user id')
    KintoBlockManage.getParameterNameInRequiredSessionDataTable(
      3
    ).moveToObject()
    expect(
      KintoBlockManage.getParameterNameInRequiredSessionDataTable(3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterNameInRequiredSessionDataTable(3).getText()
    ).to.eql('authexample-name')
    expect(
      KintoBlockManage.getParameterTypeInRequiredSessionDataTable(3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInRequiredSessionDataTable(3).getText()
    ).to.eql('String')
    KintoBlockManage.getParameterDescriptionInRequiredSessionDataTable(
      3
    ).moveToObject()
    expect(
      KintoBlockManage.getParameterDescriptionInRequiredSessionDataTable(
        3
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterDescriptionInRequiredSessionDataTable(
        3
      ).getText()
    ).to.eql('logged in user name')
  })

  //TC_986
  it('should verify that "Required session data" is collapsed in KB tag documentation page, when user clicks collapse icon for "Required session data"', () => {
    expect(
      KintoBlockManage.requiredSessionDataExpandORCollapseText.getText()
    ).to.eql('Collapse')
    KintoBlockManage.parameterTableForRequiredSessionData.moveToObject()
    expect(
      KintoBlockManage.parameterTableForRequiredSessionData.isVisible()
    ).to.eql(true)
    KintoBlockManage.requiredSessionExpandORCollapseBtn.leftClick()
    browser.pause(2000)
    expect(
      KintoBlockManage.requiredSessionDataExpandORCollapseText.getText()
    ).to.eql('Expand')
    expect(
      KintoBlockManage.parameterTableForRequiredSessionData.isVisible()
    ).to.eql(false)
  })

  //TC_987
  it('should verify whether tool tip text is displayed for "?" icon in KB tag documentation page, when user clicks on it in "Required session data"', () => {
    KintoBlockManage.requiredSessionToolTipIcon.moveToObject()
    KintoBlockManage.requiredSessionToolTipIcon.leftClick()
    KintoBlockManage.requiredSessionToolTipText.waitForVisible()
    expect(KintoBlockManage.requiredSessionToolTipText.getText()).to.eql(
      'Session data required for the API endpoint'
    )
  })

  //TC_988
  it('should verify that "Exposed session data" is collapsed by default in KB tag documentation page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.exposedSessionDataExpandORCollapseText.moveToObject()
    expect(
      KintoBlockManage.exposedSessionDataExpandORCollapseText.getText()
    ).to.eql('Expand')
    expect(
      KintoBlockManage.parameterTableForExposedSessionData.isVisible()
    ).to.eql(false)
  })

  //TC_989
  it('should verify that "Exposed session data" is expanded in KB tag documentation page, when user clicks expand icon for "Exposed session data"', () => {
    KintoBlockManage.exposedSessionDataExpandORCollapseText.leftClick()
    browser.pause(2000)
    expect(
      KintoBlockManage.exposedSessionDataExpandORCollapseText.getText()
    ).to.eql('Collapse')
    KintoBlockManage.parameterTableForExposedSessionData.moveToObject()
    expect(
      KintoBlockManage.parameterTableForExposedSessionData.isVisible()
    ).to.eql(true)
  })

  //TC_990
  it('should verify that "Exposed session data" table in KB tag documentation page displays two columns "Parameter name" and "Type"', () => {
    KintoBlockManage.getColumnsOfExposedSessionDataTable(1).moveToObject()
    expect(
      KintoBlockManage.getColumnsOfExposedSessionDataTable(1).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getColumnsOfExposedSessionDataTable(1).getText()
    ).to.eql('PARAMETER NAME')
    expect(
      KintoBlockManage.getColumnsOfExposedSessionDataTable(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getColumnsOfExposedSessionDataTable(2).getText()
    ).to.eql('TYPE')
  })

  //TC_991
  it('should verify that "Exposed session data" table in KB tag documentation page displays "Parameter name", "Parameter type", "Parent arrow" and "Parameter definition"', () => {
    //Parameter name should be authexample-id and authexample-name
    //Parameter type both should be string
    //Parameter description should be logged in user id and logged in user name
    KintoBlockManage.getParameterNameInExposedSessionDataTable(2).moveToObject()
    expect(
      KintoBlockManage.getParameterNameInExposedSessionDataTable(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterNameInExposedSessionDataTable(2).getText()
    ).to.eql('authexample-id')
    expect(
      KintoBlockManage.getParameterRequiredTagInExposedSessionDataTable(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInExposedSessionDataTable(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInExposedSessionDataTable(2).getText()
    ).to.eql('String')
    KintoBlockManage.getParameterDescriptionInExposedSessionDataTable(
      2
    ).moveToObject()
    expect(
      KintoBlockManage.getParameterDescriptionInExposedSessionDataTable(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterDescriptionInExposedSessionDataTable(
        2
      ).getText()
    ).to.eql('the logged in user id')
    KintoBlockManage.getParameterNameInExposedSessionDataTable(3).moveToObject()
    expect(
      KintoBlockManage.getParameterNameInExposedSessionDataTable(3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterNameInExposedSessionDataTable(3).getText()
    ).to.eql('authexample-name')
    expect(
      KintoBlockManage.getParameterRequiredTagInExposedSessionDataTable(
        3
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInExposedSessionDataTable(3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInExposedSessionDataTable(3).getText()
    ).to.eql('String')
    KintoBlockManage.getParameterDescriptionInExposedSessionDataTable(
      3
    ).moveToObject()
    expect(
      KintoBlockManage.getParameterDescriptionInExposedSessionDataTable(
        3
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterDescriptionInExposedSessionDataTable(
        3
      ).getText()
    ).to.eql('the logged in username')
  })

  //TC_992
  it('should verify that "Exposed session data" is collapsed in KB tag documentation page, when user clicks collapse icon for "Exposed session data"', () => {
    expect(
      KintoBlockManage.exposedSessionDataExpandORCollapseText.getText()
    ).to.eql('Collapse')
    expect(
      KintoBlockManage.parameterTableForExposedSessionData.isVisible()
    ).to.eql(true)
    KintoBlockManage.exposedSessionExpandORCollapseBtn.leftClick()
    browser.pause(2000)
    expect(
      KintoBlockManage.exposedSessionDataExpandORCollapseText.getText()
    ).to.eql('Expand')
    expect(
      KintoBlockManage.parameterTableForExposedSessionData.isVisible()
    ).to.eql(false)
  })

  //TC_993
  it('should verify whether tool tip text is displayed for "?" icon in KB tag documentation page, when user clicks on it in "Exposed session data"', () => {
    KintoBlockManage.exposedSessionToolTipIcon.moveToObject()
    KintoBlockManage.exposedSessionToolTipIcon.leftClick()
    KintoBlockManage.exposedSessionToolTipText.waitForVisible()
    expect(KintoBlockManage.exposedSessionToolTipText.getText()).to.eql(
      'Session data set upon returning a successful response from the endpoint'
    )
  })

  //TC_995
  it('should verify that "Response Codes" 200 is expanded by default and other response codes are collapsed by default in KB tag documentation page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.getResponseCodeExpandORCollapseText(2).moveToObject()
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(2).getText()
    ).to.eql('Collapse')
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        2
      ).isVisible()
    ).to.eql(false)
    KintoBlockManage.getResponseCodeExpandORCollapseText(3).moveToObject()
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(3).getText()
    ).to.eql('Expand')
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        3
      ).isVisible()
    ).to.eql(false)
  })

  //TC_996
  it('should verify that "Response Codes" component is expanded in KB tag documentation page, when user clicks expand icon for "Response Codes" component', () => {
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(3).moveToObject()
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(3).leftClick()
    browser.pause(2000)
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(3).getText()
    ).to.eql('Collapse')
    KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
      3
    ).moveToObject()
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        3
      ).isVisible()
    ).to.eql(true)
  })

  //TC_997
  it('should verify that "Response Codes" component in KB tag documentation page displays two columns "Parameter name" and "Type"', () => {
    KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
      2,
      1
    ).moveToObject()
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        2,
        1
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        2,
        1
      ).getText()
    ).to.eql('PARAMETER NAME')
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        2,
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        2,
        2
      ).getText()
    ).to.eql('TYPE')
    KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
      3,
      1
    ).moveToObject()
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        3,
        1
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        3,
        1
      ).getText()
    ).to.eql('PARAMETER NAME')
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        3,
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseParametersTableColumnsFromResponeCodeSection(
        3,
        2
      ).getText()
    ).to.eql('TYPE')
  })

  //TC_998
  it('should verify that "Response Codes" component table in KB tag documentation page displays "Parameter name", "Parameter type", "Parent arrow" and "Parameter definition"', () => {
    //Two parameters will be displayed
    //Parameter name should be message and error
    //Parameter type should be string and string
    //Parameter description should be success message when the user is logged in and error message
    KintoBlockManage.getResponseParameterNameFromResponeCodeSection(
      2
    ).moveToObject()
    expect(
      KintoBlockManage.getResponseParameterNameFromResponeCodeSection(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseParameterNameFromResponeCodeSection(
        2
      ).getText()
    ).to.eql('message')
    expect(
      KintoBlockManage.getParameterRequiredTagInResponseParametersTable(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInResponseParametersTable(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInResponseParametersTable(2).getText()
    ).to.eql('String')
    expect(
      KintoBlockManage.getParameterDescriptionInResponseParametersTable(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterDescriptionInResponseParametersTable(
        2
      ).getText()
    ).to.eql('success message when the user is logged in')
    KintoBlockManage.getResponseParameterNameFromResponeCodeSection(
      3
    ).moveToObject()
    expect(
      KintoBlockManage.getResponseParameterNameFromResponeCodeSection(
        3
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getResponseParameterNameFromResponeCodeSection(
        3
      ).getText()
    ).to.eql('error')
    expect(
      KintoBlockManage.getParameterRequiredTagInResponseParametersTable(
        3
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInResponseParametersTable(3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterTypeInResponseParametersTable(3).getText()
    ).to.eql('String')
    KintoBlockManage.getParameterDescriptionInResponseParametersTable(
      3
    ).moveToObject()
    expect(
      KintoBlockManage.getParameterDescriptionInResponseParametersTable(
        3
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getParameterDescriptionInResponseParametersTable(
        3
      ).getText()
    ).to.eql('error message')
  })

  //TC_999
  it('should verify that "Response Codes" component is collapsed in KB tag documentation page, when user clicks collapse icon for "Response Codes" component"', () => {
    KintoBlockManage.getResponseParameterNameFromResponeCodeSection(
      2
    ).moveToObject()
    KintoBlockManage.getResponseCodeExpandORCollapseText(2).moveToObject()
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(2).getText()
    ).to.eql('Collapse')
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        2
      ).isVisible()
    ).to.eql(true)
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(2).leftClick()
    browser.pause(2000)
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(2).getText()
    ).to.eql('Expand')
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        2
      ).isVisible()
    ).to.eql(false)
    KintoBlockManage.getResponseParameterNameFromResponeCodeSection(
      3
    ).moveToObject()
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(3).getText()
    ).to.eql('Collapse')
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        3
      ).isVisible()
    ).to.eql(true)
    KintoBlockManage.getResponseCodeExpandORCollapseBtn(3).leftClick()
    browser.pause(2000)
    expect(
      KintoBlockManage.getResponseCodeExpandORCollapseText(3).getText()
    ).to.eql('Expand')
    expect(
      KintoBlockManage.getResponseParametersTableTitleFromResponeCodeSection(
        3
      ).isVisible()
    ).to.eql(false)
  })

  // //TC_1000
  // it('should verify whether tool tip text is displayed for "?" icon in KB tag documentation page, when user clicks on it in "Response code"',()=>{
  //
  // })

  // //TC_1001
  // it('should verify whether tool tip text is displayed for "?" icon in KB tag documentation page, when user clicks on it in "Response parameters" table',()=>{
  //   //TODO
  // })

  //TC_1003
  it('should display protocol tabs in KB tag documentation page', () => {
    KintoBlockManage.getProtocolTabs(1).moveToObject()
    expect(KintoBlockManage.getProtocolTabs(1).isVisible()).to.eql(true)
    expect(KintoBlockManage.getProtocolTabs(1).getText()).to.eql('gRPC')
    expect(KintoBlockManage.getProtocolTabs(2).isVisible()).to.eql(true)
    expect(KintoBlockManage.getProtocolTabs(2).getText()).to.eql('GraphQL')
    expect(KintoBlockManage.getProtocolTabs(3).isVisible()).to.eql(true)
    expect(KintoBlockManage.getProtocolTabs(3).getText()).to.eql('Restful')
  })

  //TC_1004
  it('should verify whether "color coded verb" and "endpoint name" is displayed in "Endpoints section" of KB tag documentation page "Restful tabs"', () => {
    KintoBlockManage.endpointSection.moveToObject()
    KintoBlockManage.getEndpointNameInRestFullEndpointSection(
      1,
      1
    ).moveToObject()
    expect(
      KintoBlockManage.getEndpointNameInRestFullEndpointSection(
        1,
        1
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getEndpointNameInRestFullEndpointSection(
        1,
        2
      ).isVisible()
    ).to.eql(true)
    var endpointNameInRestfullTab =
      KintoBlockManage.getEndpointNameInRestFullEndpointSection(
        1,
        1
      ).getText() +
      ' ' +
      KintoBlockManage.getEndpointNameInRestFullEndpointSection(1, 2).getText()
    var endpointNameInDefinition =
      KintoBlockManage.getEndpointsFromEndpointsList(1, 1).getText() +
      ' ' +
      KintoBlockManage.getEndpointsFromEndpointsList(1, 2).getText()
    expect(endpointNameInRestfullTab).to.eql(endpointNameInDefinition)
  })

  //TC_1005
  it.skip('should display "Request Example" component in KB tag documnetation page', () => {
    KintoBlockManage.getRestFullTabs(2).moveToObject()
    expect(KintoBlockManage.getRestFullTabs(2).isVisible()).to.eql(true)
  })

  //TC_1006
  it.skip('should display "Response body" component in KB tag documnetation page', () => {
    KintoBlockManage.getRestFullTabs(3).moveToObject()
    expect(KintoBlockManage.getRestFullTabs(3).isVisible()).to.eql(true)
  })

  //TC_1007
  it('should verify that "Request parameters" component in KB tag documentation page displays two columns "Parameter name" and "Type"', () => {
    KintoBlockManage.getRequestParametersTableColumns(1).moveToObject()
    expect(
      KintoBlockManage.getRequestParametersTableColumns(1).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getRequestParametersTableColumns(1).getText()
    ).to.eql('PARAMETER NAME')
    expect(
      KintoBlockManage.getRequestParametersTableColumns(2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getRequestParametersTableColumns(2).getText()
    ).to.eql('TYPE')
  })

  //TC_1008
  it('should display "Parameter name", "Parent arrow", "Parameter type" and "Parameter definition" in "Request parameters" component of KB tag documentation page', () => {
    //Two parameters will be displayed
    //Parameter name should be username and password
    //Parameter type should be string and string
    //Parameter description should be the username or emai for the user and the password for the password
    KintoBlockManage.getRequestParameterNameFromRequestParameterTable(
      2
    ).moveToObject()
    expect(
      KintoBlockManage.getRequestParameterNameFromRequestParameterTable(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getRequestParameterNameFromRequestParameterTable(
        2
      ).getText()
    ).to.eql('username')
    expect(
      KintoBlockManage.getRequestParameterReqTagFromRequestParameterTable(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getRequestParameterTypeFromRequestParameterTable(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getRequestParameterTypeFromRequestParameterTable(
        2
      ).getText()
    ).to.eql('String')
    KintoBlockManage.getRequestParameterDescriptionFromRequestParameterTable(
      2
    ).moveToObject()
    expect(
      KintoBlockManage.getRequestParameterDescriptionFromRequestParameterTable(
        2
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getRequestParameterDescriptionFromRequestParameterTable(
        2
      ).getText()
    ).to.eql('the username for authentication')
    KintoBlockManage.getRequestParameterNameFromRequestParameterTable(
      3
    ).moveToObject()
    expect(
      KintoBlockManage.getRequestParameterNameFromRequestParameterTable(
        3
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getRequestParameterNameFromRequestParameterTable(
        3
      ).getText()
    ).to.eql('password')
    expect(
      KintoBlockManage.getRequestParameterReqTagFromRequestParameterTable(
        3
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getRequestParameterTypeFromRequestParameterTable(
        3
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getRequestParameterTypeFromRequestParameterTable(
        3
      ).getText()
    ).to.eql('String')
    KintoBlockManage.getRequestParameterDescriptionFromRequestParameterTable(
      3
    ).moveToObject()
    expect(
      KintoBlockManage.getRequestParameterDescriptionFromRequestParameterTable(
        3
      ).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockManage.getRequestParameterDescriptionFromRequestParameterTable(
        3
      ).getText()
    ).to.eql('the password for authentication')
  })

  it(`should display text "We couldn't find a successful build for this branch", if there is no successful build yet`, () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + '73' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions(
      testData.kbversion.Nodejs1
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions(testData.kbversion.Nodejs1).click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql(
      testData.kbversion.Nodejs1
    )
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(
      testData.kintoblock.validDocumentationRepo
    )
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validDocumentationRepo
    ).waitForVisible()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validDocumentationRepo
    ).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.pause(2000)
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.waitForVisible()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.noBuildTextInEndpointPage.waitForVisible()
    expect("We couldn't find a successful build for this branch").to.eql(
      KintoBlockManage.noBuildTextInEndpointPage.getText()
    )
  })

  it('should generate build for the second branch', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(3).waitForVisible()
    KintoBlockList.getCard(3).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.getBuildCurrentStatus(1).waitForVisible()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(2).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KintoBlock to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should validate whether KintoBlock build reached success - 2', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should verify that concerned documentation page is displayed for selected branch', () => {
    var url = browser.getUrl()
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.openRepoBtn.scroll(0, 500)
    KintoBlockManage.openRepoBtn.click()
    browser.pause(3000)
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[3]) //3
    browser.pause(2000)
    KintoBlockManage.branchsDropDownInGitHub.waitForVisible()
    KintoBlockManage.branchsDropDownInGitHub.leftClick()
    KintoBlockManage.getBranchNameFromGitHubBranchList(2).waitForVisible()
    KintoBlockManage.getBranchNameFromGitHubBranchList(2).click()
    browser.pause(5000)
    KintoBlockManage.appInGitHub.waitForVisible()
    KintoBlockManage.appInGitHub.leftClick()
    browser.pause(5000)
    KintoBlockManage.indexJsFile.waitForVisible()
    KintoBlockManage.indexJsFile.leftClick()
    KintoBlockManage.editIconInGitHub.waitForVisible()
    KintoBlockManage.editIconInGitHub.leftClick()
    browser.pause(2000)
    expect(KintoBlockManage.editIconInGitHub.isVisible()).to.eql(false)
    KintoBlockManage.getTextFromIndexJsLines(9).waitForVisible()
    var endpointName = KintoBlockManage.getTextFromIndexJsLines(9)
      .getText()
      .slice(14, 21)
    var endpointDefinition = KintoBlockManage.getTextFromIndexJsLines(9)
      .getText()
      .slice(22)
    browser.switchTab(tabIds[0])
    browser.pause(2000)
    //First branch ( master )
    KintoBlockManage.viewEndpointsBtn.scroll(0, -2000)
    KintoBlockManage.viewEndpointsBtn.waitForVisible()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    var branchName = KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    expect(branchName).to.eql('master')
    KintoBlockManage.getEndpointDefinitionSection(2).waitForVisible()
    expect(KintoBlockManage.getEndpointDefinitionSection(2).getText()).to.eql(
      endpointName
    )
    expect(KintoBlockManage.endpointDefinition.getText()).to.eql(
      endpointDefinition
    )
    browser.url(url)
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    branchName = KintoBlockManage.getBranchNameFromBranchTagSwitcher(
      1
    ).getText()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.openRepoBtn.scroll(0, 500)
    KintoBlockManage.openRepoBtn.leftClick()
    browser.pause(3000)
    tabIds = browser.getTabIds()
    browser.switchTab(tabIds[4]) //4
    browser.pause(2000)
    KintoBlockManage.branchsDropDownInGitHub.waitForVisible()
    KintoBlockManage.branchsDropDownInGitHub.leftClick()
    KintoBlockManage.getBranchNameFromGitHubBranchList(1).waitForVisible()
    KintoBlockManage.getBranchNameFromGitHubBranchList(1).click()
    browser.pause(5000)
    KintoBlockManage.nodeExampleInGitHub.leftClick()
    browser.pause(3000)
    KintoBlockManage.nodeExampleIndexJsFile.leftClick()
    KintoBlockManage.editIconInGitHub.waitForVisible()
    KintoBlockManage.editIconInGitHub.leftClick()
    browser.pause(2000)
    expect(KintoBlockManage.editIconInGitHub.isVisible()).to.eql(false)
    KintoBlockManage.getTextFromIndexJsLines(7).waitForVisible()
    endpointName = KintoBlockManage.getTextFromIndexJsLines(7)
      .getText()
      .slice(14, 27)
    endpointDefinition = KintoBlockManage.getTextFromIndexJsLines(7)
      .getText()
      .slice(28)
    browser.switchTab(tabIds[0])
    browser.pause(2000)
    //Second branch ( branch )
    KintoBlockManage.viewEndpointsBtn.scroll(0, -2000)
    KintoBlockManage.viewEndpointsBtn.waitForVisible()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    branchName = KintoBlockManage.branchNameOrTagNumberFromBreadcrumb.getText()
    expect(branchName).to.eql('branch')
    KintoBlockManage.getEndpointsFromEndpointsList(2, 2).waitForVisible()
    KintoBlockManage.getEndpointsFromEndpointsList(2, 2).leftClick()
    browser.pause()
    KintoBlockManage.getEndpointDefinitionSection(2).waitForVisible()
    expect(KintoBlockManage.getEndpointDefinitionSection(2).getText()).to.eql(
      endpointName
    )
    KintoBlockManage.endpointDefinition.waitForVisible()
    expect(KintoBlockManage.endpointDefinition.getText()).to.eql(
      endpointDefinition
    )
  })

  it('should shut down deployments deployed in documentation page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DeploymentManage.shutDownDeployment(0, ws, 2)
  })

  it('should logout from KB - Documentation page', () => {
    KintoBlockManage.logout()
  })
})

describe('KintoBlock Builds - GitHub', () => {
  it('should login as new user and link workspace with GitHub', () => {
    Login.registerAndLogin('KBB')
    WorkspaceManage.linkGithubSecondTime()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
  })

  it('should create a Nodejs KB of microservice type for version 11.7.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.NodeJsRepo
    )
  })

  it('should create a Nodejs KB of microservice type for version 10.15.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs2,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.NodeJsRepo
    )
  })

  it('should create a Nodejs KB of microservice type for version 8.15.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs3,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.NodeJsRepo
    )
  })

  it('should create a Nodejs KB of microservice type for version 6.16.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs4,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.NodeJsRepo
    )
  })

  it('should create a Java KB of microservice type for version 7 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java4,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.JavaRepo
    )
  })

  it('should create a Java KB of microservice type for version 8 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java3,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.JavaRepo
    )
  })

  it('should create a Java KB of microservice type for version 12 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java2,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.JavaRepo
    )
  })

  it('should create a Java KB of microservice type for version 13 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.JavaRepo
    )
  })

  it('should create a Python KB of microservice type for version 3.7.2 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.PythonRepo
    )
  })

  it('should create a Python KB of microservice type for version 3.6.8 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python2,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.PythonRepo
    )
  })

  it('should create a Python KB of microservice type for version 3.5.6 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python3,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.PythonRepo
    )
  })

  it('should create a Python KB of microservice type for version 3.4.9 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python4,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.PythonRepo
    )
  })

  it('should create a Python KB of microservice type for version 2.7.15 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python5,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.PythonRepo
    )
  })

  it('should create a Ruby KB of microservice type for version 2.6.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.RubyRepo
    )
  })

  it('should create a Ruby KB of microservice type for version 2.5.3 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby2,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.RubyRepo
    )
  })

  it('should create a Ruby KB of microservice type for version 2.4.5 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby3,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.RubyRepo
    )
  })

  it('should create a Ruby KB of microservice type for version 2.3.8 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby4,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.RubyRepo
    )
  })

  it('should create a Go KB of microservice type for version 1.11.4 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Go,
      testData.kbversion.Go1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.GoRepo
    )
  })

  it('should create a Go KB of microservice type for version 1.10.7 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Go,
      testData.kbversion.Go2,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.GoRepo
    )
  })

  it('should create a Csharp KB of microservice type for version 2.2.103 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Csharp,
      testData.kbversion.Csharpnet1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.CsharpRepo
    )
  })

  it('should create a Csharp KB of microservice type for version 2.1.503 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Csharp,
      testData.kbversion.Csharpnet2,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.CsharpRepo
    )
  })

  it('should create a Elixir KB of microservice type for version 1.8.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir1,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.ElixirRepo
    )
  })

  it('should create a Elixir KB of microservice type for version 1.7.4 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir2,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.ElixirRepo
    )
  })

  it('should create a Elixir KB of microservice type for version 1.6.6 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir3,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.ElixirRepo
    )
  })

  it('should create a Elixir KB of microservice type for version 1.5.3 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir4,
      'Existing Repositories',
      'GitHub',
      testData.github.username,
      testData.kintoblock.ElixirRepo
    )
  })

  it('should deploy Microservice KB - NodeJS version 11.7.0', () => {
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    KintoBlockCreate.BuildRefresh(0)
  })

  // it('should wait for the NodeJs KintoBlock of version 11.7.0 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify NodeJs KintoBlock of version 11.7.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - NodeJS version 10.15.0', () => {
    KintoBlockCreate.BuildRefresh(1)
  })

  // it('should wait for the NodeJs KintoBlock of version 10.15.0 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify NodeJs KintoBlock of version 10.15.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - NodeJS version 8.15.0', () => {
    KintoBlockCreate.BuildRefresh(2)
  })

  // it('should wait for the NodeJs KintoBlock of version 8.15.0 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify NodeJs KintoBlock of version 8.15.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - NodeJS version 6.16.0', () => {
    KintoBlockCreate.BuildRefresh(3)
  })

  // it('should wait for the NodeJs KintoBlock of version 6.16.0 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify NodeJs KintoBlock of version 6.16.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 7', () => {
    KintoBlockCreate.BuildRefresh(4)
  })

  // it('should wait for the Java KintoBlock of version 7 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Java KintoBlock of version 7 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 8', () => {
    KintoBlockCreate.BuildRefresh(5)
  })

  // it('should wait for the Java KintoBlock of version 8 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Java KintoBlock of version 8 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 12', () => {
    KintoBlockCreate.BuildRefresh(6)
  })

  // it('should wait for the Java KintoBlock of version 12 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Java KintoBlock of version 12 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 13', () => {
    KintoBlockCreate.BuildRefresh(7)
  })

  // it('should wait for the Java KintoBlock of version 13 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Java KintoBlock of version 13 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.7.2', () => {
    KintoBlockCreate.BuildRefresh(8)
  })

  // it('should wait for the Python KintoBlock of version 3.7.2 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 3.7.2 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.6.8', () => {
    KintoBlockCreate.BuildRefresh(9)
  })

  // it('should wait for the Python KintoBlock of version 3.6.8 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 3.6.8 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.5.6', () => {
    KintoBlockCreate.BuildRefresh(10)
  })

  // it('should wait for the Python KintoBlock of version 3.5.6 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 3.5.6 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.4.9', () => {
    KintoBlockCreate.BuildRefresh(11)
  })

  // it('should wait for the Python KintoBlock of version 3.4.9 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 3.4.9 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 2.7.15', () => {
    KintoBlockCreate.BuildRefresh(12)
  })

  // it('should wait for the Python KintoBlock of version 2.7.15 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 2.7.15 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.6.0', () => {
    KintoBlockCreate.BuildRefresh(13)
  })

  // it('should wait for the Ruby KintoBlock of version 2.6.0 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Ruby KintoBlock of version 2.6.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.5.3', () => {
    KintoBlockCreate.BuildRefresh(14)
  })

  // it('should wait for the Ruby KintoBlock of version 2.5.3 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Ruby KintoBlock of version 2.5.3 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.4.5', () => {
    KintoBlockCreate.BuildRefresh(15)
  })

  // it('should wait for the Ruby KintoBlock of version 2.4.5 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Ruby KintoBlock of version 2.4.5 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.3.8', () => {
    KintoBlockCreate.BuildRefresh(16)
  })

  // it('should wait for the Ruby KintoBlock of version 2.3.8 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Ruby KintoBlock for versio 2.3.8 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Go version 1.11.4', () => {
    KintoBlockCreate.BuildRefresh(17)
  })

  // it('should wait for the Go KintoBlock of version 1.11.4 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Go KintoBlock for versio 1.11.4 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Go version 1.10.7', () => {
    KintoBlockCreate.BuildRefresh(18)
  })

  // it('should wait for the Go KintoBlock of version 1.10.7 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Go KintoBlock for versio 1.10.7 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Csharp version 2.2.103', () => {
    KintoBlockCreate.BuildRefresh(19)
  })

  // it('should wait for the Csharp KintoBlock of version 2.2.103 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Csharp KintoBlock for versio 2.2.103 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Csharp version 2.1.503', () => {
    KintoBlockCreate.BuildRefresh(20)
  })

  // it('should wait for the Csharp KintoBlock of version 2.1.503 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Csharp KintoBlock for versio 2.1.503 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.8.0', () => {
    KintoBlockCreate.BuildRefresh(21)
  })

  // it('should wait for the Elixir KintoBlock of version 1.8.0 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Elixir KintoBlock for versio 1.8.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.7.4', () => {
    KintoBlockCreate.BuildRefresh(22)
  })

  // it('should wait for the Elixir KintoBlock of version 1.7.4 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Elixir KintoBlock for versio 1.7.4 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.6.6', () => {
    KintoBlockCreate.BuildRefresh(23)
  })

  // it('should wait for the Elixir KintoBlock of version 1.6.6 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Elixir KintoBlock for versio 1.6.6 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.5.3', () => {
    KintoBlockCreate.BuildRefresh(24)
  })

  // it('should wait for the Elixir KintoBlock of version 1.5.3 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Elixir KintoBlock for versio 1.5.3 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should logout from KB - builds of bitbucket repos', () => {
    KintoBlockManage.logout()
  })
})
