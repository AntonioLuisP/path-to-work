import React, { useState } from 'react'

import {
    CInputCheckbox,
    CFormGroup,
} from '@coreui/react'


export default function SearchComponent({ data }) {

    const [selected, setSelected] = useState(false)

    async function handleSelected(e) {
        e.preventDefault();
        setSelected(prev => !prev)
    }

    return (
        <CFormGroup variant="checkbox" className='text-break text-justify'>
            <CInputCheckbox
                checked={selected}
                onChange={handleSelected}
            />
            {data.name}
        </CFormGroup>
    )
}
