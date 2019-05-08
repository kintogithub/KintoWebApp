import React from 'react'
import { OWNED_BLOCK } from 'constants/kintoBlockOwnershipType'

const SelectKintoBlockGroup = data => {
  let title = 'Public KintoBlocks'
  let image = 'icon-search-public-kintoblocks.svg'
  if (data.type === OWNED_BLOCK) {
    title = 'My KintoBlocks'
    image = 'icon-search-my-kintoblocks.svg'
  }
  return (
    <div className="block-group-heading">
      <img src={`/images/${image}`} alt="group icon" />
      <h4>{title}</h4>
    </div>
  )
}

export default SelectKintoBlockGroup
