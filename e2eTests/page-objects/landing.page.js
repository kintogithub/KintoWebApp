import Page from './page'
import { getDataTest } from '../helpers/elementSelector'

class Landing extends Page {
  open() {
    super.open('')
  }

  get navbar() {
    return getDataTest('landing-navbar')
  }

  get sidebar() {
    return getDataTest('sidebar')
  }

  get topbar() {
    return getDataTest('navbar')
  }

  get workspaceSelect() {
    return $('.workspaces-select')
  }
}

export default new Landing()
