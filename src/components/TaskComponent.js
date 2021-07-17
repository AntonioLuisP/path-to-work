import React from 'react'
import ItemComponent from './ItemComponent'

import {
    CBadge,
} from '@coreui/react'

export default function TaskComponent({ task }) {

    return (

        <ItemComponent name={task.name} to={'/tasks/' + task.id} >
            {task.conclusion ? <CBadge color="success" children="Concluída" /> : ''}
        </ItemComponent>
    )
}

