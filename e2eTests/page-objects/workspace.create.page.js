import Page from './page'
import { getInput } from '../helpers/elementSelector'

class WorkspaceCreate extends Page {
  open(wsID) {
    super.open(`app/dashboard/${wsID}/create`)
  }

  get form() {
    return $('.dashboard-content .create-workspace')
  }

  get name() {
    return getInput('name')
  }

  get createNewworkspaceTitle() {
    return $('.create-workspace > h2')
  }
  get warningBtn() {
    return $('.button.button.secondary')
  }

  get workspaceCongratsBtn() {
    return $('.kh-modal-actions button.button.dark')
  }

  get createNewWorkspaceTitle() {
    return $('.create-workspace>h2')
  }

  get workspaceExplanationTitle() {
    return $('.what-is-a-workspace .text>h5:nth-child(1)')
  }

  get whatIsWorkspaceExplanation() {
    return $('h5.body-copy')
  }

  get whatIsWorkspaceHelpLink() {
    return $('h5.body-copy >a')
  }

  get basicInfoTitle() {
    return $('.workspace-form.form-container>div:nth-child(2)>h3')
  }

  get basicInfoToggleBtn() {
    return $('span.toggle-slider')
  }

  get workspaceEmptyGreyIcon() {
    return $('.avatar-placeholder')
  }

  get workspaceEmailInputField() {
    return $('input[name=email]')
  }

  get workspacePermissionField() {
    return $('.bottom>select[name="role"]')
  }

  getworkspacePermissionField(index) {
    return $(`.bottom>select>:nth-child(${index})`)
  }

  get workspaceAddIcon() {
    return $('.add')
  }

  get workspaceCreateBtnDisabled() {
    return $('.global-save-bar.show.e2e-disabled')
  }

  get workspaceCreateBtnEnabled() {
    return $('.global-save-bar.show')
  }

  get toggleBar() {
    return $('#autoShareProjects')
  }

  get toggleBarToolTip() {
    return $('span.tooltip')
  }

  get toggleBarToolTipText() {
    return $('.rc-tooltip-content .rc-tooltip-inner')
  }

  get switchTogglerBtn() {
    return $('span.toggle-slider')
  }

  get basicInfoSubtitle() {
    return $('.workspace-form.form-container>div:nth-child(2)>h5')
  }

  get membersTitle() {
    return $('.workspace-form.form-container>div:nth-child(3)>h3')
  }

  get membersSubtitle() {
    return $('.workspace-form.form-container>div:nth-child(3)>h5')
  }
  //new locator added accord to updated smoke test
  get saveBarBtn() {
    return $('.global-save-bar.show .field-input-wrapper.save-button')
  }

  //new locator added accord to updated smoke test
  getmemberList(index) {
    return $(`.members-added:nth-child(${index})`)
  }

  //new locator added accord to updated smoke test
  getdeleteIcon(index) {
    return $(`.members-added:nth-child(${index}) .remove`)
  }

  //new locator added accord to updated smoke test
  get revokeAccessBtn() {
    return $('.kh-modal-actions>button[class="button dark"]')
  }
}

export default new WorkspaceCreate()
