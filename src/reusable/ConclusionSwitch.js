import React from 'react'

import {
  CSwitch,
} from '@coreui/react'

const ConclusionSwitch = ({ conclusion, action }) => {
  return (
    <CSwitch onChange={action} shape={'pill'} color='success' labelOn={'\u2713'} labelOff={'\u2715'} checked={conclusion} />
  )
}

export default React.memo(ConclusionSwitch)