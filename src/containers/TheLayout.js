import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useHistory } from 'react-router-dom'

import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

import { ToasterNotification } from '../reusable'

const TheLayout = () => {

  const history = useHistory()
  const { user } = useAuth()

  if (user === null) history.push('/login')

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
