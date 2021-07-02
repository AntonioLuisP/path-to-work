import React, { useState, useEffect, useCallback } from 'react'
import { TodoComponent } from '../../components/'
import { supabase } from '../../services/supabase'
import { Loading } from '../../reusable'

export default function TodoIndex() {

  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState([])

  const fetchTodos = useCallback(async () => {
    const { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.log("error", error);
    }
    else {
      setTodos(todos)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  if (loading) return (<Loading />)

  return (
    <>
      {
        todos.map(todo => (
          <TodoComponent key={todo.id} todo={todo} />
        ))
      }
    </>
  )
}