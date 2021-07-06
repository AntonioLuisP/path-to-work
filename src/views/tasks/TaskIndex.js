import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../services/supabase'
import TaskCreate from './TaskCreate'
import { TaskComponent } from '../../components/'

import {
  BreadcrumbHeader,
  Loading,
  NoItems
} from '../../reusable'

export default function TaskIndex() {

  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])

  const fetchTasks = useCallback(async () => {
    const { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.log("error", error);
    }
    else {
      setTasks(tasks)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  if (loading) return (<Loading />)

  return (
    <>
      <BreadcrumbHeader title="Tarefas" quantidade={tasks.length} component={<TaskCreate add={task => setTasks([...tasks, task])} />} />
      {tasks <= 0 ? <NoItems /> :
        tasks.map(task => (<TaskComponent key={task.id} task={task} />))
      }
    </>
  )
}