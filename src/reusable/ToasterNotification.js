import React from 'react'
import Toasts from './Toasts'
import { useNotifications } from '../context/NotificationsContext'

import {
    CToaster,
} from '@coreui/react'

const ToasterNotification = () => {

    const [notifications] = useNotifications()

    return (
        <CToaster
            position={'top-right'}
        >
            {notifications.map((notification) => {
                if (Object.keys(notification).length > 0)
                    return (
                        <Toasts
                            key={notification.id}
                            header={notification.header}
                            body={notification.body}
                            id={notification.id}
                        />
                    )
                return('')
            })}
        </CToaster>
    )
}

export default ToasterNotification