import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { languages, languageVersions } from 'constants/supportedLanguages'
import { required } from 'helpers/forms/validators'
import PrettySelect from 'components/forms/select/PrettySelect'

class LanguageInput extends Component {
  static propTypes = {
    onToggleType: PropTypes.func.isRequired,
    selectedLanguage: PropTypes.string
  }

  render() {
    const versionOptions = this.props.selectedLanguage
      ? languageVersions[this.props.selectedLanguage]
      : languageVersions['noLanguage']
    return (
      <div className="language">
        <Field
          name="language"
          label="Language"
          component={PrettySelect}
          validate={required}
          options={languages}
          tutorialPosition="left"
          onToggle={this.props.onToggleType}
          help="The programming language you would like to use for this microservice."
          hasLinkedDefaultValues={true}
          placeholder="Choose the language"
        />
        <Field
          name="languageVersion"
          label="Version"
          component={PrettySelect}
          validate={required}
          options={versionOptions}
          onToggle={this.props.onToggleVersion}
          help="The version of the language you would like to use for this microservice."
          hasLinkedDefaultValues={true}
          placeholder="Choose the version"
        />
      </div>
    )
  }
}

export default LanguageInput
