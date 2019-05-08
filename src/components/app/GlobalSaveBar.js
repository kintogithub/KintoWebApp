import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../forms'
import HelpTooltipContainer from 'containers/dashboard/ui/HelpTooltipContainer'

const GlobalSaveBar = ({
  canSave,
  toggleSaveButton,
  submitLabel,
  onSubmit,
  hasForm,
  buttonClass
}) => (
  <div
    className={`global-save-bar ${hasForm ? 'show' : ''} ${
      !canSave ? 'e2e-disabled' : ''
    }`}
    data-test="savebar"
  >
    <div className="dashboard-inner">
      <div className="dashboard-content">
        {toggleSaveButton && !canSave ? null : (
          <div className="field-input-wrapper save-button">
            <HelpTooltipContainer fieldName="submit" tutorialPosition="top" />
            <Button
              disabled={!canSave}
              name="submit"
              onClick={onSubmit}
              buttonType={`${buttonClass ? buttonClass : 'default'}`}
            >
              {submitLabel}
            </Button>
          </div>
        )}
        <div id="savebar-portal" />
      </div>
    </div>
  </div>
)

GlobalSaveBar.propTypes = {
  canSave: PropTypes.bool,
  toggleSaveButton: PropTypes.bool,
  hasForm: PropTypes.bool.isRequired,
  submitLable: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  buttonClass: PropTypes.string
}

export default GlobalSaveBar
