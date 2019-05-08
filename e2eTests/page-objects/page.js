class Page {
  TEST_USERNAME = process.env.E2E_TEST_USERNAME
  TEST_PASSWORD = process.env.E2E_TEST_PASSWORD
  TEST_ENV = process.env.E2E_TEST_FRONTEND_URL

  get sidebar() {
    return $('[data-test=sidebar]')
  }

  get navbar() {
    return $('[data-test=navbar]')
  }

  get savebar() {
    return $('[data-test=savebar]')
  }

  get avatarBtn() {
    return $('div.dropdown.direction-left button')
  }

  get loadingFinished() {
    return $('[data-loading="finished"]')
  }

  waitForFormLoading() {
    this.loadingFinished.waitForExist()
  }

  get logoutBtn() {
    return $('.dropdown-scroll-container > button')
  }

  logout() {
    this.avatarBtn.waitForVisible()
    if (this.avatarBtn.isVisible()) {
      this.avatarBtn.click()
      this.logoutBtn.click()
    }
  }

  get submitBtn() {
    return $('[data-test=savebar] button')
  }

  submitGlobal() {
    return $('[data-test=savebar] button').click()
  }

  open(path) {
    browser.url('/' + path)

    browser.windowHandleFullscreen()
  }

  // relative path checking
  getUrl(url) {
    const browserUrl = browser.getUrl()
    // get the relative path instead of domain.com/url , you get /url
    return browserUrl.replace(/^(?:\/\/|[^/]+)*\//, '/')
  }

  get dropdownIsShown() {
    return $('div.dropdown-content.isShown')
  }

  get dropdownIsShownShort() {
    return $('.dropdown-content.isShown.short')
  }

  get nameField() {
    return $('input#name')
  }

  get amazingBtn() {
    return $('.kh-modal-actions button.button.dark')
  }

  get toolTipInnerText() {
    return $('.rc-tooltip-inner')
  }

  get modalTitle() {
    return $('.kh-modal-title')
  }

  get kintoDocsPage() {
    return $('.post h2:nth-of-type(2)')
  }

  get tutorialPopUp() {
    return $('.kh-modal-body')
  }

  randomNumbers() {
    var str = Math.random()
    var randomNumbers = String(str).substr(10, 4)
    return randomNumbers
  }

  randomName() {
    var text = ''
    var prefix = ''
    var alphaNumeric = 'abcdefghijklmnopqrstuvwxyz0123456789'
    var alphabets = 'abcdefghijklmnopqrstuvwxyz'
    for (var i = 0; i < 5; i++)
      text += alphaNumeric.charAt(
        Math.floor(Math.random() * alphaNumeric.length)
      )
    prefix += alphabets.charAt(Math.floor(Math.random() * alphabets.length))
    return text + prefix
  }
}
export default Page
