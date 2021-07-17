import React from 'react'
import ItemComponent from './ItemComponent'
import TaskBadge from './TaskBadge'

export default function TaskComponent({ task }) {

    return (

        <ItemComponent name={task.name} to={'/tasks/' + task.id} >
            <TaskBadge conclusion={task.conclusion} dayOf={task.day_of} />
        </ItemComponent>
    )
}

