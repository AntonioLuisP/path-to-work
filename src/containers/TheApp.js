import React from 'react'

import {
  Content,
  Sidebar,
  Footer,
  Header
} from './index'

import { ToasterNotification } from '../reusable'

const TheApp = () => {

  return (
    <div className="c-app c-default-layout">
      <Sidebar />
      <div className="c-wrapper">
        <Header />
        <div className="c-body">
          <ToasterNotification />
          <Content />
        </div>
        <Footer />
      </div>

    </div>
  )
}

export default TheApp
