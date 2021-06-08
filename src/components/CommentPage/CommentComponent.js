import React from 'react'
// import { useHistory } from 'react-router-dom'
// import api from "../services/api"
// import { DropdownMore } from '../reusable'

import {
    CCard,
    CCardHeader,
    CCol,
} from '@coreui/react'

export default function CommentComponent(props) {

    // const history = useHistory()

    const comment = props.comment

    // async function handleDelete(id) {
    //     try {
    //         await api.delete('/comment/' + id, {})
    //         setComments(comments.filter(comment => comment.id !== id))
    //     } catch (error) {
    //         alert("Erro ao deletar o caso, tente novamente")
    //         console.log(error)
    //     }
    // }
    
    return (
        <CCol xs="12" sm="12" md="12" key={comment.id}>
            <CCard>
                <CCardHeader>
                    {comment.comment}
                </CCardHeader>
            </CCard>
        </CCol>
    )
}


