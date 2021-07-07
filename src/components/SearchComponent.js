import React, { useState } from 'react'

import {
    CInputCheckbox,
    CFormGroup,
} from '@coreui/react'


export default function SearchComponent({ data, toogleSelect }) {

    const [selected, setSelected] = useState(false)

    return (
        <CFormGroup variant="checkbox" className='text-break text-justify'>
            <CInputCheckbox
                checked={selected}
                onChange={() => {
                    setSelected(prev => !prev)
                    toogleSelect()
                }}
            />
            {data.name}
        </CFormGroup>
    )
}
