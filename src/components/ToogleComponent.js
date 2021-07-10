import React from 'react'

import {
    CInputCheckbox,
    CFormGroup,
} from '@coreui/react'

export default function ToogleComponent({ data, toogleSelect }) {

    return (
        <CFormGroup variant="checkbox" className='text-break text-justify'>
            <CInputCheckbox
                checked={data.selected}
                onChange={e => toogleSelect(e, data)}
            />
            {data.name}
        </CFormGroup>
    )
}
