import {
  required,
  allCharactersAndBasicSymbols,
  allCharactersAndBasicSymbolsSpaces,
  email as emailValidation,
  minLength,
  maxLength,
  envVariable,
  notStartWithDigit,
  lowercaseCharactersAndDigitsOnly,
  lowercaseCharactersHyphensAndDigitsOnly
} from './validators'
/* add all the fields that have multiple validation rules */

/* reuseable fields */
export const basicInput = [minLength(3), allCharactersAndBasicSymbolsSpaces]

export const email = [required, emailValidation]

export const kintoName = [
  required,
  minLength(3),
  maxLength(24),
  notStartWithDigit,
  lowercaseCharactersAndDigitsOnly
]

export const kintoBlockName = [
  required,
  minLength(3),
  maxLength(24),
  notStartWithDigit,
  lowercaseCharactersHyphensAndDigitsOnly
]

export const kintoBlockDisplayName = [required, minLength(3), maxLength(200)]

/* pages */
export const environments = {
  envVariableName: [
    required,
    minLength(3),
    maxLength(100),
    notStartWithDigit,
    envVariable
  ],
  name: kintoName
}

export const signup = {
  username: [
    required,
    minLength(3),
    maxLength(35),
    allCharactersAndBasicSymbols
  ],
  password: [required, maxLength(128), minLength(8)]
}

export const workspaces = {}
