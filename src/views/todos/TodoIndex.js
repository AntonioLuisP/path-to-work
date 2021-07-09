import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import TodoCreate from '../todos/TodoCreate'

import {
    AddButton,
    BreadcrumbHeader,
    Loading,
    NoItems,
} from '../../reusable'

import {
    TodoComponent,
} from "../../components/"

export default function TodoIndex({ taskId, todosQtd }) {

    const [loading, setLoading] = useState(true)
    const [todos, setTodos] = useState([])

    useEffect(() => {
        todosQtd(todos.length)
    }, [todos, todosQtd])

    const fetchTodos = useCallback(async () => {
        const { data: todos, error } = await supabase
            .from("todos")
            .select("*")
            .eq('task_id', taskId)
            .order("created_at", { ascending: false });
        if (error) {
            console.log("error", error);
        } else {
            setTodos(todos)
        }
        setLoading(false)
    }, [taskId])

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])

    if (loading) return (<Loading />)

    return (
        <>
            <BreadcrumbHeader title='Afazeres' quantidade={todos.length} >
                <AddButton component={<TodoCreate taskId={taskId} add={todo => setTodos([todo, ...todos])} />} />
            </BreadcrumbHeader>
            {todos <= 0 ? <NoItems /> :
                todos.map(todo => (<TodoComponent key={todo.id} todo={todo} />))
            }
        </>
    )
}