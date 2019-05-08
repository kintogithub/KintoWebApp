import ReactGA from 'react-ga'

export const getAnalyticsId = () =>
  process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID

export const isAnalyticsActive = () => !!getAnalyticsId()

export const trackException = (error, info) => {
  ReactGA.exception({
    fatal: true,
    description: `${error} --- ${JSON.stringify(info)}`
  })
}

export const trackPageChange = (pathname, search = '', title) => {
  const page = pathname + search
  ReactGA.set({ page })
  ReactGA.pageview(page, null, title)
}
