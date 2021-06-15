import React from 'react'

import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

import { Modal, ToasterNotification } from '../reusable'
import { SidebarProvider, ModalProvider, NotificationsProvider } from 'src/context/'

const TheLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <SidebarProvider>
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <ModalProvider>
              <NotificationsProvider>
                <Modal />
                <ToasterNotification />
                <TheContent />
              </NotificationsProvider>
            </ModalProvider>
          </div>
          <TheFooter />
        </div>
      </SidebarProvider>

    </div>
  )
}

export default TheLayout
