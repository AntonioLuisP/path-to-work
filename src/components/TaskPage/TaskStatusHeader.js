import React, { useEffect, useState } from 'react'

import {
    CCardHeader,
} from '@coreui/react'

export default function TaskStatusHeader(props) {

    const task = props.task
    const [header, setHeader] = useState(
        {
            'show': false,
            'atual': 0,
            'layouts': [
                {
                    'message': 'Sem data',
                    'color': 'dark'
                },
                {
                    'message': 'Em dia',
                    'color': 'info'
                },
                {
                    'message': 'Atrasado',
                    'color': 'danger'
                },
                {
                    'message': 'Vence Hoje',
                    'color': 'warning'
                },
                {
                    'message': 'Concluída',
                    'color': 'success'
                },
            ]
        }
    )
    // quando a data tiver bonita ajustar o header

    useEffect(() => {
        if (task.conclusion) {
            setHeader(header => ({ ...header, 'show': true, 'atual': 4 }))
        } else {
            setHeader(header => ({ ...header, 'show': false, 'atual': 4 }))
        }
    }, [task])

    return (
        <>
            {
                header.show ?
                    (
                        <CCardHeader className='content-center' color={header.layouts[header.atual].color}>
                            <p className="text-white my-2">{header.layouts[header.atual].message}</p>
                        </CCardHeader>
                    )
                    : ''
            }
        </>
    )
}