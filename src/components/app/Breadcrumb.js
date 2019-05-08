import React from 'react'
import PropTypes from 'prop-types'
import BreadcrumbComponents from '../breadcrumbs'
import BreadcrumbContainers from 'containers/breadcrumbs'

const allComponents = {
  ...BreadcrumbComponents,
  ...BreadcrumbContainers
}

const Breadcrumb = ({ isShown, info }) => {
  if (!isShown) {
    return null
  }
  return (
    <div className="breadcrumbs">
      <div className="dashboard-content">
        <ul className="unstyled-list">
          {info.map((i, key) => {
            const BreadcrumbSection = allComponents[i.component]
            if (!BreadcrumbSection) {
              throw new Error(
                `${i.component} Breadcrumb component section is not found`
              )
            }
            const isDisabled = info.length - 1 === key
            return (
              <li key={key}>
                <BreadcrumbSection disabled={isDisabled} {...i} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

Breadcrumb.propTypes = {
  isShown: PropTypes.bool.isRequired,
  info: PropTypes.array
}

export default Breadcrumb
