import React, { useEffect, useState, useCallback } from 'react'
import { bringDate, formatTime } from '../services/FormatDate'

import {
    CCardHeader,
} from '@coreui/react'

export default function TaskStatusHeader({ conclusion, dayOf }) {

    const [header, setHeader] = useState({
        'message': '',
        'color': ''
    })

    const makeHeader = useCallback(() => {
        if (conclusion) {
            setHeader({
                'message': 'Concluída',
                'color': 'success'
            })
        } else {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const [ano, mes, dia] = bringDate(dayOf)
            const day_of = new Date(ano, mes, dia)
            if (today.getTime() === day_of.getTime()) {
                setHeader({
                    'message': 'Hoje às ' + formatTime(dayOf),
                    'color': 'warning'
                })
            } else if (today.getTime() > day_of.getTime()) {
                setHeader({
                    'message': 'Atrasado',
                    'color': 'danger'
                })
            } else {
                setHeader({
                    'message': 'Status',
                    'color': 'secondary'
                })
            }
        }
    }, [conclusion, dayOf])

    useEffect(() => {
        makeHeader()
    }, [makeHeader])

    return (
        <>
            {
                <CCardHeader className='content-center' color={header.color}>
                    <p className="my-2">{header.message}</p>
                </CCardHeader>
            }
        </>
    )
}