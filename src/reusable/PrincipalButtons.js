import React from 'react'
import EditDataButton from './EditDataButton'
import DeleteDataButton from './DeleteDataButton'

const PrincipalButtons = ({ editAction, deleteAction }) => {

    return (
        <>
            <EditDataButton action={editAction} />
            <DeleteDataButton action={deleteAction} />
        </>
    )
}

export default React.memo(PrincipalButtons)