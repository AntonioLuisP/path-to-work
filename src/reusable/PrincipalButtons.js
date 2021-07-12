import React from 'react'
import EditButton from './EditButton'
import DeleteDataButton from './DeleteDataButton'

const PrincipalButtons = ({ editAction, deleteAction }) => {

    return (
        <>
            <EditButton action={editAction} />
            <DeleteDataButton action={deleteAction} />
        </>
    )
}

export default React.memo(PrincipalButtons)