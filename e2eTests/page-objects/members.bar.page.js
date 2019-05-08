import { expect } from 'chai'
import WorkspaceManage from '../page-objects/workspace.manage.page'

class MembersBar {
  get ownerIconText() {
    return $('.dropdown-button.user-avatar.uppercase')
  }

  get ownerIconInForm() {
    return $('.avatar.text.undefined.uppercase')
  }

  get toggleBarSwitch() {
    return $('.workspace-toolbar .toggle-slider')
  }

  get editIconInForm() {
    return $('.workspace-toolbar .avatar.small.edit.hide-text')
  }

  get editCollaboratorsPopUp() {
    return $('div.kh-modal-body')
  }

  get OkBtnInEditCollabPopUp() {
    return $(
      '.ReactModal__Content.ReactModal__Content--after-open.kh-modal.workspace-modal .button.dark'
    )
  }

  get editCollabSearchBar() {
    return $('.kh-modal-body > div:nth-of-type(1) input')
  }

  get noMatchingText() {
    return $('.unstyled-list .center')
  }

  get editCollabPopUpTitle() {
    return $('.kh-modal-title > h4')
  }

  get titleOfEditCollabMembersList() {
    return $('.kh-modal-body > h5')
  }

  get inviteMembersInEditCollab() {
    return $(
      '.ReactModal__Content.ReactModal__Content--after-open.kh-modal.workspace-modal .button.secondary'
    )
  }

  getMemberIconTextFromEditCollabPopUp(index) {
    return $(
      `.kh-modal-body .unstyled-list li:nth-of-type(${index}) .avatar.text.undefined.uppercase`
    )
  }

  getMembersEmailFromEditCollabPopUp(index) {
    return $(
      `.kh-modal-body .unstyled-list li:nth-of-type(${index}) input:nth-of-type(1)`
    )
  }

  getPermissionDropDownInEditCollab(index) {
    return $(`.kh-modal-body .unstyled-list li:nth-of-type(${index}) select`)
  }

  getCheckBoxesOfMembersInEditCollab(index) {
    return $(
      `.kh-modal-body .unstyled-list li:nth-of-type(${index}) input:nth-of-type(2)`
    )
  }

  get toggleMessage() {
    return $('.toggle-message')
  }

  checkBoxGreyedOut(index) {
    var i = index
    for (i; i <= 1; i++) {
      var role = this.getPermissionDropDownInEditCollab(i).getText(
        'option:checked'
      )
      if (role === 'Owner' || 'Admin') {
        expect(this.getCheckBoxesOfMembersInEditCollab(i).isEnabled()).to.eql(
          false
        )
      } else {
        expect(this.getCheckBoxesOfMembersInEditCollab(i).isEnabled()).to.eql(
          true
        )
      }
    }
  }

  greyedOutNameAndRoleField(index) {
    // var i = index
    // for (i; i <= 1; i++) {
    //   this.getCheckBoxesOfMembersInEditCollab(i).waitForVisible()
    this.getPermissionDropDownInEditCollab(index).waitForVisible()
    var role = this.getPermissionDropDownInEditCollab(index).getText(
      'option:checked'
    )
    if (role === 'Owner' || role === 'Admin') {
      expect(this.getMembersEmailFromEditCollabPopUp(index).isEnabled()).to.eql(
        false
      )
      expect(this.getPermissionDropDownInEditCollab(index).isEnabled()).to.eql(
        false
      )
    } else {
      expect(this.getMembersEmailFromEditCollabPopUp(index).isEnabled()).to.eql(
        false
      )
      expect(this.getPermissionDropDownInEditCollab(index).isEnabled()).to.eql(
        true
      )
    }
    //}
  }

  get crownOfOwnerIcon() {
    return $('.highlight.owner')
  }

  getMembersIconInForm(index) {
    return $(
      `.workspace-toolbar .member-list-circles .avatar.text.small.uppercase:nth-of-type(${index})`
    )
  }

  getMemberInitialsFromMembersList(index) {
    return $(
      `.form-body.members-list .unstyled-list li:nth-of-type(${index})>div:nth-of-type(1)`
    )
  }

  initialsOfMembers() {
    this.getMemberInitialsFromMembersList(2).waitForVisible()
    var dict = []
    dict[0] = this.getMemberInitialsFromMembersList(2).getText()
    dict[1] = this.getMemberInitialsFromMembersList(3).getText()
    dict[2] = this.getMemberInitialsFromMembersList(4).getText()
    dict[3] = this.getMemberInitialsFromMembersList(5).getText()
    return dict
  }

  getAdminStarIconOfMembersInProjectsBar(index) {
    return $(
      `.avatar.text.small.uppercase:nth-of-type(${index}) .highlight.admin-star`
    )
  }

  getCheckMembersInEditCollabPopUp(index) {
    return $(`.member-row:nth-of-type(${index}) .checkbox`)
  }

  emailsOfMembers() {
    WorkspaceManage.getAddedMemberEmail(1).waitForVisible()
    var emails = []
    emails[0] = WorkspaceManage.getAddedMemberEmail(1).getText()
    emails[1] = WorkspaceManage.getAddedMemberEmail(2).getText()
    emails[2] = WorkspaceManage.getAddedMemberEmail(3).getText()
    emails[3] = WorkspaceManage.getAddedMemberEmail(4).getText()
    emails[4] = WorkspaceManage.getAddedMemberEmail(5).getText()
    return emails
  }
}
export default new MembersBar()
