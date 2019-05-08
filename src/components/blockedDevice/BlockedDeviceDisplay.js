import React from 'react'

const BlockedDeviceDisplay = () => (
  <div className="view-on-mobile">
    <div className="message">
      <img src="/images/icon-mustard-alert-large.svg" alt="warning icon" />
      <h2>
        For the best experience, we recommend using KintoHub primarily on
        laptops and desktops.
      </h2>
      <a
        href="https://join.slack.com/t/kintohub/shared_invite/enQtMzIxNDU2OTE4NTYyLWJmNWM1ZTQ3YTFlMzJkYWUzMWE2ZTlmZjk3ZGQ1NWFlMDRkYzhhODNmNDZlMDZmNjhlMzBhNWRiYWIxMTVjMmU"
        className="button secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        Find Us on Slack
      </a>
    </div>
  </div>
)

export default BlockedDeviceDisplay
