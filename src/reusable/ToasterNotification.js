import React from 'react'
import Toasts from './Toasts'
import { useSelector } from 'react-redux'

import {
    CToaster,
} from '@coreui/react'

const ToasterNotification = () => {

    const notifications = useSelector(state => state.notifications)

    return (
        <CToaster
            position={'top-right'}
        >
            {notifications.map((note, idx) => {
                if (Object.keys(note).length > 0)
                    return (
                        <Toasts
                            key={idx}
                            header={note.header}
                            body={note.body}
                            id={note.id}
                        />
                    )
                return ('')
            })}
        </CToaster>
    )
}

export default ToasterNotification