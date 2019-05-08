/* eslint-disable no-useless-escape */

export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

// TODO: not implemented 8 characters min 1 number & 1 letter all valid characters, 8 characters at least
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@_'.]{8,}/

// doesn't start or end with - [although range is from 1-35 in regex, it is actually 3-35]
export const subdomainRegex = /^[^\d]([a-z\d]){1,35}$/

export const envVariableRegex = /^[^\d]([a-zA-Z\d_]){1,100}$/

export const customParamsRegex = /^[^-]([a-z-\d]){2,32}$/

/* Reuseable */
export const lowercaseCharactersAndDigitsOnlyRegex = /^[a-z0-9]+$/
export const lowercaseCharactersHyphensAndDigitsOnlyRegex = /^[a-z0-9-]+$/
export const allCharactersAndBasicSymbolsRegex = /^[A-Za-z\d@_'\.]+$/
export const allCharactersAndBasicSymbolsSpacesRegex = /^[A-Za-z\d@_'\.\s]+$/
export const lowerCharactersRegex = /^[a-z\d]+$/
export const uppercaseRegex = /[A-Z]+/
export const notStartWithDigitRegex = /^[^\d].*$/
export const allCharactersAndDashesAndUnderscoresAndDotsRegex = /^[A-Za-z\d_\-\.]+$/
export const notStartOrEndWithDigitRegex = /^[\D].*[\D]$/
export const notStartOrEndWithAnyCharacterRegex = /^([^\W\_\-\.]).*([^\W\_\-\.])+$/
