export const scrollToError = () => {
  scrollToElement('.error-message', -200)
}

export const scrollToElement = (className, offset) => {
  const element = document.querySelector(className)
  if (element) {
    element.scrollIntoView(true)
  }

  if (offset) {
    if (window.innerHeight + window.scrollY < document.body.offsetHeight) {
      window.scrollBy(0, offset)
    }
  }
}
