import React, { useEffect, useState } from 'react'
import { bringDate, formatDate, formatTime } from '../services/FormatDate'

import {
    CBadge,
} from '@coreui/react'

export default function TaskBadge({ conclusion, dayOf }) {

    const [badge, setBadge] = useState(null)

    useEffect(() => {
        if (conclusion) {
            setBadge({
                'message': 'Concluída',
                'color': 'success'
            })
        } else {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const [ano, mes, dia] = bringDate(dayOf)
            const day_of = new Date(ano, mes, dia)
            if (today.getTime() === day_of.getTime()) {
                setBadge({
                    'message': 'Hoje às ' + formatTime(dayOf),
                    'color': 'warning'
                })
            } else if (today.getTime() > day_of.getTime()) {
                setBadge({
                    'message': 'Atrasado: ' + formatDate(dayOf),
                    'color': 'danger'
                })
            } else {
                setBadge(null)
            }
        }
    }, [conclusion, dayOf])

    return (
        <>
            {badge ?
                <CBadge color={badge.color} children={badge.message} />
                : <></>
            }
        </>
    )
}