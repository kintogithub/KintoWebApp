import { languages } from 'constants/supportedLanguages'

export const getDockerImage = data => {
  if (data) {
    return languages.find(language => language.value === data).dockerImageName
  } else return languages[0].dockerImageName
}
