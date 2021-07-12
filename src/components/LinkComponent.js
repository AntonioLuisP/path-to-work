import React, { useState } from 'react'
import { Favorite, GoTo } from '../reusable'
import { supabase } from '../services/supabase'

import {
    CCard,
    CCardHeader,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

export default function LinkComponent(props) {

    const [link, setLink] = useState(props.link)

    async function handleFavorite(e) {
        e.preventDefault();
        const { data: linkNew, error } = await supabase
            .from("links")
            .update({
                is_favorite: !link.is_favorite,
            })
            .eq('id', link.id)
            .single()
        if (error) {
            alert("error", error)
            return;
        } else {
            setLink(linkNew)
        }
    }

    return (
        <CCard>
            <CCardHeader color='secondary' className='text-break text-justify'>
                <a
                    target='_blank'
                    rel="noreferrer noopener"
                    href={link.url} >
                    {link.name !== null ? link.name : link.url}
                </a>
                <div className="card-header-actions">
                    <Favorite favorito={link.is_favorite} action={handleFavorite} />
                    <GoTo go={'/links/' + link.id}>
                        <CIcon name="cil-cursor" />
                    </GoTo>
                </div>
            </CCardHeader>
        </CCard>
    )
}


