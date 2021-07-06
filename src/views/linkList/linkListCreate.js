import React, { useEffect, useState } from 'react'
import { Loading } from '../../reusable'

import {

} from '@coreui/react'

export default function LinkListCreate() {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) return (<Loading />)

    return (
        <>
            oba
        </>
    )
}