import React, { useEffect, useState } from 'react'

import {
    CModal,
} from '@coreui/react'

const Modal = ({ show, onClose, children }) => {

    const [component, setComponent] = useState((<>a</>))

    useEffect(() => {
        show ? setComponent(children) : setComponent((<></>))
        return () => {
            setComponent((<></>))
        }
    }, [show, children])

    return (
        <CModal
            show={show}
            onClose={onClose}
            size='lg'
        >
            {component}
        </CModal>
    )
}

export default React.memo(Modal)