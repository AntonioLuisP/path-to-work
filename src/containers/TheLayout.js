import React from 'react'

import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

import { ToasterNotification } from '../reusable'

const TheLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <ToasterNotification />
          <TheContent />
        </div>
        <TheFooter />
      </div>

    </div>
  )
}

export default TheLayout
