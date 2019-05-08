export const tabAnimationOptions = {
  show: {
    opacity: 1,
    delayChildren: 100,
    transition: {
      type: 'spring',
      stiffness: 100,
      mass: 100,
      opacity: { ease: 'easeIn', duration: 700 }
    }
  },
  hide: { opacity: 0 }
}
