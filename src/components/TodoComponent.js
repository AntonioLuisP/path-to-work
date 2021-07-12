import React, { useState } from 'react'
import { supabase } from '../services/supabase'
import TodoEdit from '../views/todos/TodoEdit'
import { Modal, EditButton } from '../reusable'

import {
    CCard,
    CCardHeader,
    CInputCheckbox,
    CFormGroup,
} from '@coreui/react'

export default function TodoComponent(props) {

    const [todo, setTodo] = useState(props.todo)
    const [modal, setModal] = useState(false)

    const toogleModal = () => {
        setModal(old => !old)
    }

    async function handleConclusion(e) {
        e.preventDefault();
        const { data: todoNew, error } = await supabase
            .from("todos")
            .update({
                conclusion: !todo.conclusion,
            })
            .eq('id', todo.id)
            .single()
        if (error) {
            alert("error", error)
            return;
        } else {
            setTodo(todoNew)
        }
    }

    return (
        <CCard>
            <Modal show={modal} onClose={toogleModal}>
                <TodoEdit todo={todo} edit={todo => setTodo(todo)} />
            </Modal>
            <CCardHeader className='text-break text-justify'>
                <CFormGroup variant="checkbox">
                    <CInputCheckbox
                        checked={todo.conclusion}
                        onChange={handleConclusion}
                    />
                    {todo.conclusion ? <s>{todo.name}</s> : todo.name}
                    <div className="card-header-actions">
                        <EditButton action={() => toogleModal()} />
                    </div>
                </CFormGroup>
            </CCardHeader>
        </CCard>
    )
}
