import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../hooks/useAuth';
import TaskCreate from '../tasks/TaskCreate'
import LinkCreateTasks from './LinkCreateTasks'
import { Actions as ActionNotification } from '../../redux/notifications'

import {
    BreadcrumbHeader,
    Loading,
    NoItems,
    AddButton,
    RelateButton
} from '../../reusable'

import {
    TaskComponent,
} from "../../components"

export default function LinkTasksIndex({ linkId }) {

    const dispatch = useDispatch()

    const { user } = useAuth()

    const [loading, setLoading] = useState(true)
    const [tasks, setTasks] = useState([])

    const fetchTasks = useCallback(async () => {
        const { data: tasks, errorTasks } = await supabase
            .from("task_links")
            .select("task_id, tasks(*)")
            .eq('link_id', linkId)
            .order("created_at", { ascending: false });
        if (errorTasks) {
            console.log("errorTasks", errorTasks);
        } else {
            const parsedTasks = Object.entries(tasks).map(([key, value]) => {
                return value.tasks
            })
            setTasks(parsedTasks)
        }
        setLoading(false)
    }, [linkId])

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    function addTask(task) {
        setTasks(tasks => [task, ...tasks])
    }

    function removeTask(item) {
        setTasks(tasks => tasks.filter(task => task.id !== item.id))
    }

    async function handleCreateRelationTaskLink(task) {
        const { error } = await supabase
            .from("task_links")
            .insert({
                link_id: linkId,
                task_id: task.id,
                user_id: user.id
            })
            .single();
        if (error) {
            alert("error", error)
            return;
        } else {
            addTask(task)
            dispatch(ActionNotification.addOne({
                header: 'Link adicionada a Tarefa:',
                body: task.name,
                id: task.id,
            }))
        }
        return;
    }

    if (loading) return (<Loading />)

    return (
        <>
            <BreadcrumbHeader title="Tarefas do Link" quantidade={tasks.length} >
                <RelateButton
                    component={
                        <LinkCreateTasks linkId={linkId}
                            add={task => addTask(task)}
                            remove={task => removeTask(task)}
                        />
                    }
                />
                <AddButton component={<TaskCreate add={task => handleCreateRelationTaskLink(task)} />} />
            </BreadcrumbHeader>
            {tasks <= 0 ? <NoItems /> :
                tasks.map(task => (<TaskComponent key={task.id} task={task} />))
            }
        </>
    )
}