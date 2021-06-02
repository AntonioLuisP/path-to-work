import React from 'react'
import Toasts from './Toasts'
import { useSelector } from 'react-redux'

import {
    CToaster,
} from '@coreui/react'

const ToasterNotification = () => {

    const toasts = useSelector(state => state.notifications)

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