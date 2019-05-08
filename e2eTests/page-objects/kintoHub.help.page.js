import Page from './page'

class KintoHubHelp extends Page {
  open() {
    super.open('https://docs.kintohub.com/docs/getting-started')
  }

  get companyName() {
    return $('#companyname')
  }
}

export default new KintoHubHelp()
