import React from 'react'

import {
    CForm,
} from '@coreui/react'

const Form = ({ onSubmit, children }) => {

    return (
        <CForm
            onSubmit={e => {
                e.preventDefault();
                const sinal = navigator.onLine
                if (!sinal) {
                    alert('Você está sem internet')
                    return;
                }
                onSubmit()
            }}
            className="form-horizontal"
        >
            {children}
        </CForm>
    )
}

export default React.memo(Form)