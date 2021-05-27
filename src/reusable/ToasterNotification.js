import React, { useState, useEffect } from 'react'
import Toasts from './Toasts'

import {
    CToaster,
} from '@coreui/react'

const ToasterNotification = ({ notificaton }) => {

    const [toasts, setToasts] = useState([])

    useEffect(() => {
        setToasts([notificaton])
    }, [notificaton])

    return (
        <CToaster
            position={'top-right'}
        >
            {toasts.map((toast) => {
                if (Object.keys(toast).length > 0)
                    return (
                        <Toasts
                            key={toast.id}
                            header={toast.header}
                            body={toast.body}
                            id={toast.id}
                        />
                    )
                return('')
            })}
        </CToaster>
    )
}

export default ToasterNotification