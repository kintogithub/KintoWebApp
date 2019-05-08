import mixpanel from 'mixpanel-browser'
const isMixpanelActive = !!process.env.REACT_APP_MIXPANEL_TOKEN

if (isMixpanelActive) {
  mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN)
}

const actions = {
  identify: id => {
    if (isMixpanelActive) {
      mixpanel.identify(id)
    }
  },
  alias: id => {
    if (isMixpanelActive) {
      mixpanel.alias(id)
    }
  },
  track: (name, props) => {
    if (isMixpanelActive) {
      mixpanel.track(name, props)
    }
  },
  people: {
    set: props => {
      if (isMixpanelActive) {
        mixpanel.people.set(props)
      }
    },
    increment: (name, number) => {
      if (isMixpanelActive) {
        mixpanel.people.increment(name, number)
      }
    }
  }
}

export const Mixpanel = actions
