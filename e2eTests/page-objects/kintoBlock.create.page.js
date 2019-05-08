import Page from './page'
import { getInput, getDataTest } from '../helpers/elementSelector'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import testData from '../constants/testdata.json'
import Landing from '../page-objects/landing.page'
import { expect } from 'chai'

var repoName
var currentDate = new Date()
var randomName
var ws

class KintoBlockCreate extends Page {
  open(wsID) {
    super.open(`app/dashboard/${wsID}/kintoblocks/create`)
  }

  microserviceTypeOpen(wsID) {
    super.open(
      `app/dashboard/${wsID}/kintoblocks/create?kintoBlockType=MICROSERVICE`
    )
  }

  websiteTypeOpen(wsID) {
    super.open(
      `app/dashboard/${wsID}/kintoblocks/create?kintoBlockType=WEBSITE`
    )
  }

  get form() {
    return getDataTest('kb-create-form')
  }

  get name() {
    return getInput('name')
  }

  get shortDescription() {
    return getInput('shortDescription', 'textarea')
  }

  get language() {
    return getInput('language', 'select')
  }

  get protocol() {
    return getInput('protocol', 'select')
  }

  get repository() {
    return getInput('repositoryName')
  }

  get createKBTitle() {
    return $('.kintoblocks-master-container h2')
  }

  get linkGitHub() {
    return $('.connect-github > div > a')
  }

  //28/3
  get repositoryType() {
    return getInput('isNewRepository', 'select')
  }

  get existingRepo() {
    return $('.react-select__control input:nth-child(1)')
  }

  //Index start from 2
  createNodeJSBlock() {
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    KintoBlockManage.refreshCommitBtn.scroll(0, 1000)
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()

    if (
      KintoBlockManage.buildStatusText.getText() === ('PROCESSING' || 'QUEUED')
    ) {
      browser.waitUntil(
        function() {
          browser.pause(5000)
          KintoBlockManage.refreshCommitBtn.click()
          KintoBlockManage.loadingFinished.waitForExist()
          return (
            browser.getText(`div.state-and-time > div:nth-child(2)`) ===
            'PROCESSING'
          )
        },
        300000,
        'expected text to be different '
      )
    }
    browser.waitUntil(
      function() {
        browser.pause(5000)
        KintoBlockManage.refreshCommitBtn.click()
        KintoBlockManage.loadingFinished.waitForExist()
        const buildStatus = browser.getText(
          `div.state-and-time > div:nth-child(2)`
        )

        return buildStatus === 'SUCCESS' || buildStatus === 'FAILED'
      },
      300000,
      'expected text to be different '
    )
    expect(browser.getText(`div.state-and-time > div:nth-child(2)`)).to.eql(
      'SUCCESS'
    )
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
  }

  secondCommit() {
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    KintoBlockManage.refreshCommitBtn.scroll(0, 1000)
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    if (
      browser.getText(
        `.commit-details.first div.state-and-time > div:nth-child(2)`
      ) === ('PROCESSING' || 'QUEUED')
    ) {
      browser.waitUntil(
        function() {
          browser.pause(5000)
          KintoBlockManage.refreshCommitBtn.click()
          KintoBlockManage.loadingFinished.waitForExist()
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
        KintoBlockManage.refreshCommitBtn.click()
        KintoBlockManage.loadingFinished.waitForExist()
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
    KintoBlockManage.loadingFinished.waitForExist()
  }

  get organisationField() {
    return $('.react-select.repository-fields')
  }

  get orgNameFromRepoInputField() {
    return $(`[data-test='repositoryName'] span`)
  }

  get pageTitle() {
    return $('.kintoblocks-master-container h2')
  }

  get whatisaKintoBlock() {
    return $('.what-is-a-kintoblock .text')
  }

  get whatisaKintoBlockDescp() {
    return $('.what-is-a-kintoblock .text .body-copy')
  }

  get learnMoreHere() {
    return $('.what-is-a-kintoblock .text .body-copy>a')
  }

  get membersToolBar() {
    return $('.kintoblock-create.form-container .workspace-toolbar')
  }

  get nameField() {
    return $('input#name')
  }

  get descriptionField() {
    return $('textarea#shortDescription')
  }

  get languageField() {
    return $('select#language.bold')
  }

  get protocolField() {
    return $('select#protocol.bold')
  }

  get gitHubText() {
    return $('.connect-github>h5')
  }

  get learnGitHubCreationLink() {
    return $('.connect-github>a')
  }

  get linkGitHubBtn() {
    return $('.connect-github .connect-button .button.dark')
  }

  //05/4
  getRepositoryType(index) {
    return $(`select#newRepository.bold>option:nth-child(${index})`)
  }

  get loadingIcon() {
    return $('div.loading-icon')
  }

  get loadingText() {
    return $('.loading-spinner>h2')
  }

  get repositoryTypeField() {
    return $('select#isNewRepository.bold')
  }

  get repositoryNameField() {
    return $(`[data-test='repositoryName'] .prefill-wrapper`)
  }

  get kintoBlockListFromBreadcrumb() {
    return $('.breadcrumbs .unstyled-list li:nth-of-type(1) > a')
  }

  get createNewKintoBlockFromBreadcrumb() {
    return $('.breadcrumbs .unstyled-list li:nth-of-type(2) > span')
  }

  get repoListLoadingFinished() {
    return $('.Select.is-focused.is-open.is-searchable.Select--single')
  }

  selectKBFlavour(index) {
    return $(`.dashboard-content .select-cards li:nth-child(${index}) button`)
  }

  selectExistingRepository() {
    this.existingRepo.waitForVisible()
    this.existingRepo.scroll()
    this.existingRepo.setValue(testData.kintoblock.validRepoWithCommit)
    this.loadingFinished.waitForExist()
    this.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validRepoWithCommit
    ).waitForVisible()
    this.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validRepoWithCommit
    ).click()
    this.loadingFinished.waitForExist()
  }

  get existingRepoAdded() {
    return $('.Select-value-label')
  }

  testKintoBlockBuild(language, repository, number) {
    DashboardIndex.kintoBlocksleftnav.waitForExist()
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    this.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    this.selectKBFlavour(1).waitForExist()
    this.selectKBFlavour(1).waitForVisible()
    this.selectKBFlavour(1).click()
    this.loadingFinished.waitForExist()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    randomName = this.randomName()
    var kbName =
      testData.kintoblock.validKintoBlockNameWithDigit + number + randomName
    this.name.input.setValue(kbName)
    this.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    this.languageDropDown.click()
    this.getLanguageOptions(language).waitForVisible()
    browser.pause(2000)
    this.getLanguageOptions(language).click()
    expect(this.selectedLanguage.getText()).to.eql(language)
    browser.scroll(0, 1000)
    this.repoDropDown.click()
    this.getRepoTypeOptions('Existing Repositories').waitForVisible()
    browser.pause(2000)
    this.getRepoTypeOptions('Existing Repositories').click()
    this.existingRepo.waitForVisible()
    this.existingRepo.scroll()
    this.existingRepo.setValue(repository)
    this.getExistingRepoList(
      testData.github.username,
      repository
    ).waitForVisible()
    browser.keys('Tab')
    this.loadingFinished.waitForExist()
    this.submitGlobal()
    this.loadingFinished.waitForExist()
    this.deploySuccessBtn()
    KintoBlockManage.form.waitForVisible()
    this.loadingFinished.waitForExist()
    return kbName
  }

  createMicroserviceKB(
    language,
    version,
    repoType,
    repoSource,
    organisation,
    repository
  ) {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    this.microserviceTypeOpen(ws)
    this.loadingFinished.waitForExist()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    this.microserviceTypeIcon.waitForVisible()
    randomName = this.randomName()
    var kbName = testData.kintoblock.validKintoBlockNameWithDigit + randomName
    this.name.input.setValue(kbName)
    this.kbDisplayName.setValue(kbName)
    this.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    this.languageDropDown.click()
    this.getLanguageOptions(language).waitForVisible()
    browser.pause(2000)
    this.getLanguageOptions(language).click()
    expect(this.selectedLanguage.getText()).to.eql(language)
    this.versionDropDown.click()
    this.getVersionOptions(version).waitForVisible()
    browser.pause(2000)
    this.getVersionOptions(version).click()
    expect(this.selectedVersion.getText()).to.eql(version)
    browser.scroll(0, 1000)
    this.repoDropDown.click()
    if (repoType === 'Create new repository') {
      this.getRepoTypeOptions(repoType).waitForVisible()
      browser.pause(2000)
      this.getRepoTypeOptions(repoType).click()
      this.organisationDropDown.click()
      this.getOrganisationOptions(repoSource).waitForVisible()
      //browser.pause(2000)
      this.getOrganisationOptions(repoSource).click()
      browser.scroll(0, 1000)
      repoName =
        testData.kintoblock.validRepoName +
        randomName +
        currentDate.getMinutes()
      this.repository.input.setValue(repoName)
      this.prepopulateRepoSwitch.scroll(0, 2000)
      this.prepopulateRepoSwitch.waitForVisible()
      this.prepopulateRepoSwitch.click()
      this.prePopulatedIsOn.waitForExist()
      expect(this.prePopulatedIsOn.getValue()).to.eql('true')
    }
    if (repoType === 'Existing Repositories') {
      this.getRepoTypeOptions(repoType).waitForVisible()
      browser.pause(2000)
      this.getRepoTypeOptions(repoType).click()
      this.repoResourceDropDown.click()
      this.getOrganisationOptions(repoSource).waitForVisible()
      browser.pause(2000)
      this.getOrganisationOptions(repoSource).click()
      this.existingRepo.waitForVisible()
      this.existingRepo.scroll()
      this.existingRepo.setValue(repository)
      this.getExistingRepoList(organisation, repository).waitForVisible()
      browser.pause(2000)
      this.getExistingRepoList(organisation, repository).click()
      this.loadingFinished.waitForExist()
    }
    this.submitGlobal()
    this.loadingFinished.waitForExist()
    this.deploySuccessBtn()
    KintoBlockManage.form.waitForVisible()
    this.loadingFinished.waitForExist()
    // browser.scroll(0,350)
    //KintoBlockManage.refreshCommitBtn.click()
    //this.loadingFinished.waitForExist()
  }

  deploySuccessBtn() {
    if (this.amazingBtn.isVisible()) {
      this.amazingBtn.waitForExist()
      this.amazingBtn.click()
    }
  }

  BuildRefresh(index) {
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(index).waitForVisible()
    KintoBlockList.getCard(index).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  }

  get kintoBlockTypeSelectPage() {
    return $('.kinto-block-type-select')
  }

  get selectFlavourTitle() {
    return $('.select-flavour h4')
  }

  getKBTypesSection(index) {
    return $(`.dashboard-content .select-cards li:nth-child(${index})`)
  }

  getTitleOfKBTypeCard(index) {
    return $(`.dashboard-content .select-cards li:nth-child(${index}) h3`)
  }

  getSubtitleOfKBTypeCard(index) {
    return $(`.dashboard-content .select-cards li:nth-child(${index}) h4`)
  }

  get kintoDocsPage() {
    return $('.postHeaderTitle')
  }

  get questionIcon() {
    return $('.what-is-a-kintoblock .icon')
  }

  get microserviceTypeIcon() {
    return $('.icon-type.microservice')
  }

  get websiteTypeIcon() {
    return $('.icon-type.website')
  }

  get taskTypeIcon() {
    return $('icon-type.task')
  }

  get prepopulateRepoSwitch() {
    return $('.prepopulate-repo .toggle-slider')
  }

  prePopulateRepository(language, number) {
    DashboardIndex.kintoBlocksleftnav.waitForExist()
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    this.loadingFinished.waitForExist()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    this.selectKBFlavour(1).waitForExist()
    this.selectKBFlavour(1).waitForVisible()
    this.selectKBFlavour(1).click()
    this.loadingFinished.waitForExist()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    randomName = this.randomName()
    var kbName =
      testData.kintoblock.validKBNameWithOddNumbers + number + randomName
    this.name.input.setValue(kbName)
    this.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    this.languageDropDown.click()
    this.getLanguageOptions(language).waitForVisible()
    browser.pause(2000)
    this.getLanguageOptions(language).click()
    expect(this.selectedLanguage.getText()).to.eql(language)
    browser.scroll(0, 1000)
    this.repoDropDown.click()
    this.getRepoTypeOptions('Create new repository').waitForVisible()
    browser.pause(2000)
    this.getRepoTypeOptions('Create new repository').click()
    browser.keys('Tab')
    browser.keys('Down arrow')
    browser.pause(2000)
    browser.keys('Tab')
    this.loadingFinished.waitForExist()
    var reponame = testData.kintoblock.validRepoNameWithChar + randomName
    this.repository.input.setValue(reponame)
    browser.keys('Tab')
    this.loadingFinished.waitForExist()
    this.prepopulateRepoSwitch.scroll(0, 2000)
    this.prepopulateRepoSwitch.waitForVisible()
    this.prepopulateRepoSwitch.click()
    this.prePopulatedIsOn.waitForExist()
    expect(this.prePopulatedIsOn.getValue()).to.eql('true')
    this.submitGlobal()
    this.loadingFinished.waitForExist()
    this.deploySuccessBtn()
    this.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    this.loadingFinished.waitForExist()
  }

  prePopulateRepositoryToBitbucket(language) {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    this.microserviceTypeOpen(ws)
    this.loadingFinished.waitForExist()
    this.form.waitForExist()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    this.microserviceTypeIcon.waitForVisible()
    randomName = this.randomName()
    var kbName = testData.kintoblock.validKBNameWithOddNumbers + randomName
    this.name.input.setValue(kbName)
    this.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    this.languageDropDown.click()
    this.getLanguageOptions(language).waitForVisible()
    browser.pause(2000)
    this.getLanguageOptions(language).click()
    expect(this.selectedLanguage.getText()).to.eql(language)
    browser.scroll(0, 1000)
    this.repoDropDown.click()
    this.getRepoTypeOptions('Create new repository').waitForVisible()
    browser.pause(2000)
    this.getRepoTypeOptions('Create new repository').click()
    this.organisationDropDown.click()
    this.getOrganisationOptions('bittestcc').waitForVisible()
    browser.pause(2000)
    this.getOrganisationOptions('bittestcc').click()
    var reponame = testData.kintoblock.validRepoNameWithChar + randomName
    this.repository.input.setValue(reponame)
    this.prepopulateRepoSwitch.waitForVisible()
    this.prepopulateRepoSwitch.click()
    this.prePopulatedIsOn.waitForExist()
    expect(this.prePopulatedIsOn.getValue()).to.eql('true')
    this.submitGlobal()
    this.loadingFinished.waitForExist()
    this.deploySuccessBtn()
    KintoBlockManage.form.waitForVisible()
    this.loadingFinished.waitForExist()
  }

  get prePopulatedIsOn() {
    return $('#createExampleProject')
  }

  get duplicateNameError() {
    return $(`[data-test='form-error']`)
  }

  get kbTypeIcon() {
    return $('.page-title .type-icon.website')
  }

  get penIconInPageTitle() {
    return $('.title .icon-edit')
  }

  get basicInfoComponent() {
    return $('.kintoblock-create.form-container .form-wrapper.basic-info')
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

  get repositoryTypeFieldTitle() {
    return $(` div.top > div:nth-child(1) > div > label`)
  }

  get repositoryNameFieldTitle() {
    return $(`[data-test='repositoryName'] label`)
  }

  get organisationFieldTitle() {
    return $(`.organization label`)
  }

  get repositoryNameLabel() {
    return $(`.repository-selection .select-wrapper .label`)
  }

  getExistingRepoList(org, reponame) {
    return $(`[data-test-repo-name='${org} / ${reponame}']`)
  }

  get organisationInputField() {
    return $('.react-select__control input')
  }

  get orgNameFromOrgField() {
    return $('.organization .react-select__single-value')
  }

  get organisationFieldDropDown() {
    return $('.react-select__indicators')
  }

  get selectedLanguage() {
    return $('.language .react-select__single-value')
  }

  checkforProcessing() {
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    KintoBlockManage.refreshCommitBtn.scroll(0, 500)
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    //To check whether text is moved to processing
    if (KintoBlockManage.buildStatusText.getText() === 'RUNNING') {
      browser.waitUntil(
        function() {
          browser.pause(5000)
          KintoBlockManage.refreshCommitBtn.click()
          KintoBlockManage.loadingFinished.waitForExist()
          return (
            browser.getText(
              `.commit-list .build-row:nth-of-type(1) .status`
            ) === 'RUNNING'
          )
        },
        60000,
        'expected text to be different '
      )
    }
  }

  checkForSuccessOrFailed() {
    browser.waitUntil(
      function() {
        browser.pause(5000)
        // browser.scroll(0,300)
        KintoBlockManage.refreshCommitBtn.moveToObject()
        KintoBlockManage.refreshCommitBtn.click()
        KintoBlockManage.loadingFinished.waitForExist()
        const buildStatus = browser.getText(
          `.commit-list .build-row:nth-of-type(1) .status`
        )
        return buildStatus === 'SUCCESS' || buildStatus === 'FAILED'
      },
      60000,
      'expected text to be different '
    )
    expect(
      browser.getText(`.commit-list .build-row:nth-of-type(1) .status`)
    ).to.eql('SUCCESS')
    browser.refresh()
    KintoBlockManage.loadingFinished.waitForExist()
  }

  getRepoResourcesLinkBtnInLinkRepoPopUp(index) {
    return $(`.repo-cards .repo-source-card:nth-of-type(${index}) > a`)
  }

  get comingSoonBtnOfGitLab() {
    return $('.repo-cards .repo-source-card:nth-of-type(3) .button')
  }

  getRepoResourceCardIcon(index, repo) {
    return $(
      `.repo-cards .repo-source-card:nth-of-type(${index}) .logo.${repo}`
    )
  }

  get iAmDoneBtnInRepoResourcesPopUp() {
    return $('.kh-modal-footer .button')
  }

  getKBTypeFlavour(index) {
    return $(`.dashboard-content .select-cards li:nth-child(${index}) a`)
  }

  get secondCommitOfRepo() {
    return $('.commit-details.first div.state-and-time > div:nth-child(2)')
  }

  get linkRepoPopUp() {
    return $('.link-repo-modal')
  }

  get linkRepoInfromationText() {
    return $('.link-repo-modal .information')
  }

  get linkRepoInfromationIcon() {
    return $('.link-repo-modal .information .icon.exclamation')
  }

  get cancelBtnInLinkRepoPopUp() {
    return $('.kh-modal-footer .button.secondary')
  }

  getSuccessBtnInLinkRepoPopUp(index) {
    return $(
      `.repo-cards .repo-source-card:nth-of-type(${index}) .icon.success`
    )
  }

  createKBWithoutPrePopRepoResource(language, version, repo) {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    this.microserviceTypeOpen(ws)
    this.loadingFinished.waitForExist()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    this.microserviceTypeIcon.waitForVisible()
    browser.scroll(0, 400)
    randomName = this.randomName()
    var kbName = testData.kintoblock.validKBNameWithOddNumbers + randomName
    this.name.input.setValue(kbName)
    this.kbDisplayName.setValue(kbName)
    this.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    if (repo === 'GitHub') {
      browser.scroll(0, 400)
      this.languageDropDown.click()
      this.getLanguageOptions(language).waitForVisible()
      browser.pause(2000)
      this.getLanguageOptions(language).click()
      expect(this.selectedLanguage.getText()).to.eql(language)
      this.versionDropDown.click()
      this.getVersionOptions(version).waitForVisible()
      browser.pause(2000)
      this.getVersionOptions(version).click()
      expect(this.selectedVersion.getText()).to.eql(version)
      browser.scroll(0, 1000)
      this.repoDropDown.click()
      this.getRepoTypeOptions('Create new repository').waitForVisible()
      browser.pause(2000)
      this.getRepoTypeOptions('Create new repository').click()
      this.organisationDropDown.click()
      browser.pause(2000)
      browser.keys('Tab')
      this.loadingFinished.waitForExist()
      var reponame = testData.kintoblock.validRepoNameWithChar + randomName
      this.repository.input.setValue(reponame)
      browser.keys('Tab')
      this.submitGlobal()
      this.loadingFinished.waitForExist()
      this.deploySuccessBtn()
      KintoBlockManage.form.waitForVisible()
      this.loadingFinished.waitForExist()
    }
    if (repo === 'Bitbucket') {
      browser.scroll(0, 400)
      this.languageDropDown.click()
      this.getLanguageOptions(language).waitForVisible()
      browser.pause(2000)
      this.getLanguageOptions(language).click()
      expect(this.selectedLanguage.getText()).to.eql(language)
      this.versionDropDown.click()
      this.getVersionOptions(version).waitForVisible()
      browser.pause(2000)
      this.getVersionOptions(version).click()
      expect(this.selectedVersion.getText()).to.eql(version)
      browser.scroll(0, 1000)
      this.repoDropDown.click()
      this.getRepoTypeOptions('Create new repository').waitForVisible()
      browser.pause(2000)
      this.getRepoTypeOptions('Create new repository').click()
      this.organisationDropDown.click()
      this.getOrganisationOptions('bittestcc').waitForVisible()
      browser.pause(2000)
      this.getOrganisationOptions('bittestcc').click()
      reponame = testData.kintoblock.validRepoNameWithChar + randomName
      this.repository.input.setValue(reponame)
      this.submitGlobal()
      this.loadingFinished.waitForExist()
      this.deploySuccessBtn()
      KintoBlockManage.form.waitForVisible()
      this.loadingFinished.waitForExist()
    }
  }

  // id1 & id2 --> 0,0 1st option
  // id1 & id2 --> 1,0 2nd option
  // id1 & id2 --> 1,1 3rd option
  getOrganisationDropDownOptionsText(id1, id2) {
    return $(
      `#react-select-5-option-${id1}-${id2} .select-repo-info > div:nth-of-type(1) p`
    )
  }

  // id1 & id2 --> 0,0 1st option
  // id1 & id2 --> 1,0 2nd option
  // id1 & id2 --> 1,1 3rd option
  getOrganisationStatusText(id1, id2) {
    return $(
      `#react-select-5-option-${id1}-${id2} .select-repo-info > div:nth-of-type(2) p`
    )
  }

  //Sprint 24 new locators
  get languageDropDown() {
    return $('.language .react-select__control')
  }

  getLanguageOptions(language) {
    return $(`[data-test-label='${language}']`)
  }

  getRepoTypeOptions(repoName) {
    return $(`[data-test-label='${repoName}']`)
  }

  get languageError() {
    return $('.language .error-message')
  }

  get repoError() {
    return $('.connect-github .error-message')
  }

  get repoDropDown() {
    return $(`//*[text()='Create new repository']`)
  }

  get dynamicWebAppPort() {
    return $('[data-test="versionBuildConfigData.port"] input')
  }

  get protocolDropDown() {
    return $(`//*[text()='HTTP']`)
  }

  getProtocolOptions(protocol) {
    return $(`[data-test-label='${protocol}']`)
  }

  getOrganisationOptions(organisation) {
    return $(`[data-test-label='${organisation}']`)
  }

  getRepositoryResourceOptions(repoName) {
    return $(`[data-test-label='${repoName}']`)
  }

  //Advanced options
  get protocolFieldInAdvancedOptions() {
    return $('.form-advanced .two-fields .react-select__single-value')
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

  get docFormat() {
    return $(`//*[text()='None']`)
  }

  get advancedOptionsCollapseAndExpandText() {
    return $('.toggle-advance-options .toggle-collapse')
  }

  getWebsiteTypeOptions(type) {
    return $(`[data-test-label='${type}']`)
  }

  get WebsiteTypeDropDown() {
    return $(`//*[text()='Choose the Website type']`)
  }

  get advancedOptionsSection() {
    return $('.advanced .form-advanced')
  }

  get advancedOptionsExpandIcon() {
    return $('.toggle-advance-options .advance-icon')
  }

  get websiteTypeToolTipIcon() {
    return $('.react-select .tooltip')
  }

  get websiteTypeError() {
    return $('div.react-select.error .error-message')
  }

  validateBuildAndRunCommands(index, buildCommand, runCommand) {
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(index).waitForVisible()
    KintoBlockList.getCard(index).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, 700)
    this.advancedOptionsExpandIcon.click()
    //Build command
    expect(this.buildCommandInAdvancedOptions.getValue()).to.eql(buildCommand)
    //Build run command
    expect(this.runCommandInAdvancedOptions.getValue()).to.eql(runCommand)
  }

  get selectedRepoResource() {
    return $('.react-select.repository-fields .react-select__single-value')
  }

  get organisationDropDown() {
    return $(`.organization .react-select__control`)
  }

  get repoResourceDropDown() {
    return $(`.source .react-select__control`)
  }

  get versionDropDown() {
    return $('.language .react-select:nth-of-type(2) .react-select__control')
  }

  getVersionOptions(version) {
    return $(`[data-test-label='${version}']`)
  }

  get selectedVersion() {
    return $('.language .react-select:nth-child(2) .react-select__single-value')
  }

  //new features
  get definition() {
    return $('.what-is-a-kintoblock')
  }

  //New method accord to updated smoke test
  createWebsiteKB(repoType, repoSource, organisation, repository) {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    this.websiteTypeOpen(ws)
    this.loadingFinished.waitForExist()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    this.websiteTypeIcon.waitForVisible()
    randomName = this.randomName()
    var websiteName = testData.kintoblock.validWebsiteWithDigit + randomName
    this.name.input.setValue(websiteName)
    this.kbDisplayName.setValue(websiteName)
    this.shortDescription.input.setValue(
      testData.kintoblock.validWebsiteDescriptionWithChar
    )
    browser.scroll(0, 400)
    this.WebsiteTypeDropDown.click()
    this.getWebsiteTypeOptions('Dynamic Web App').waitForVisible()
    browser.pause(2000)
    this.getWebsiteTypeOptions('Dynamic Web App').click()
    browser.pause(2000)
    browser.scroll(0, 1000)
    this.repoDropDown.click()
    if (repoType === 'Create new repository') {
      this.getRepoTypeOptions(repoType).waitForVisible()
      browser.pause(2000)
      this.getRepoTypeOptions(repoType).click()
      this.organisationDropDown.click()
      this.getOrganisationOptions(repoSource).waitForVisible()
      browser.pause(2000)
      this.getOrganisationOptions(repoSource).click()
      // browser.scroll(0,800)
      repoName = testData.kintoblock.validRepoName + randomName
      this.repository.input.setValue(repoName)
    }
    if (repoType === 'Existing Repositories') {
      this.getRepoTypeOptions(repoType).waitForVisible()
      browser.pause(2000)
      this.getRepoTypeOptions(repoType).click()
      this.repoResourceDropDown.click()
      this.getOrganisationOptions(repoSource).waitForVisible()
      browser.pause(2000)
      this.getOrganisationOptions(repoSource).click()
      this.existingRepo.waitForVisible()
      this.existingRepo.scroll()
      this.existingRepo.setValue(repository)
      this.getExistingRepoList(organisation, repository).waitForVisible()
      browser.pause(2000)
      this.getExistingRepoList(organisation, repository).click()
      this.loadingFinished.waitForExist()
    }
    this.submitGlobal()
    this.loadingFinished.waitForExist()
    this.deploySuccessBtn()
    KintoBlockManage.form.waitForVisible()
    this.loadingFinished.waitForExist()
  }

  //new features
  customserviceTypeOpen(wsID) {
    super.open(
      `app/dashboard/${wsID}/kintoblocks/create?kintoBlockType=SERVICE`
    )
  }

  get serviceTypeIcon() {
    return $('.icon-type.service')
  }

  get ServiceTypeDropDown() {
    return $(`//*[text()='Choose the service project format']`)
  }

  getServiceTypeOptions(type) {
    return $(`[data-test-label='${type}']`)
  }

  createCustomServiceKB(repoType, repoSource, organisation, repository) {
    ws = Landing.workspaceSelect.getAttribute('data-test')
    this.customserviceTypeOpen(ws)
    this.loadingFinished.waitForExist()
    this.form.waitForVisible()
    this.loadingFinished.waitForExist()
    this.serviceTypeIcon.waitForVisible()
    randomName = this.randomName()
    var serviceName = testData.kintoblock.validServiceWithDigit + randomName
    this.name.input.setValue(serviceName)
    this.kbDisplayName.setValue(serviceName)
    this.shortDescription.input.setValue(
      testData.kintoblock.validServiceDescriptionWithChar
    )
    browser.scroll(0, 400)
    this.ServiceTypeDropDown.click()
    this.getServiceTypeOptions('Helm').waitForVisible()
    browser.pause(2000)
    this.getServiceTypeOptions('Helm').click()
    browser.pause(2000)
    browser.scroll(0, 1000)
    this.repoDropDown.click()
    if (repoType === 'Create new repository') {
      this.getRepoTypeOptions(repoType).waitForVisible()
      browser.pause(2000)
      this.getRepoTypeOptions(repoType).click()
      this.organisationDropDown.click()
      this.getOrganisationOptions(repoSource).waitForVisible()
      browser.pause(2000)
      this.getOrganisationOptions(repoSource).click()
      // browser.scroll(0,800)
      repoName = testData.kintoblock.validRepoName + randomName
      this.repository.input.setValue(repoName)
    }
    if (repoType === 'Existing Repositories') {
      this.getRepoTypeOptions(repoType).waitForVisible()
      browser.pause(2000)
      this.getRepoTypeOptions(repoType).click()
      this.repoResourceDropDown.click()
      this.getOrganisationOptions(repoSource).waitForVisible()
      browser.pause(2000)
      this.getOrganisationOptions(repoSource).click()
      this.existingRepo.waitForVisible()
      this.existingRepo.scroll()
      this.existingRepo.setValue(repository)
      this.getExistingRepoList(organisation, repository).waitForVisible()
      browser.pause(2000)
      this.getExistingRepoList(organisation, repository).click()
      this.loadingFinished.waitForExist()
    }
    this.submitGlobal()
    this.loadingFinished.waitForExist()
    this.deploySuccessBtn()
    KintoBlockManage.form.waitForVisible()
    this.loadingFinished.waitForExist()
  }

  get kbDisplayName() {
    return $('input#displayName')
  }

  //26 April 2019
  get organisationIconwithText() {
    return $(`.react-select.repository-fields .react-select__single-value`)
  }

  //April 29 2019
  get docToolTip() {
    return $(`.form-advanced .one-field-per-row span.tooltip`)
  }

  get docToolTipText() {
    return $(`.rc-tooltip-inner`)
  }
}

export default new KintoBlockCreate()
