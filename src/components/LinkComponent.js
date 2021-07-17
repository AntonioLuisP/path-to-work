import React, { useState } from 'react'
import { Favorite, GoOutside } from '../reusable'
import { supabase } from '../services/supabase'
import ItemComponent from './ItemComponent'
 
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
        <ItemComponent name={link.name} to={'/links/' + link.id}>
            <GoOutside go={link.url} />
            <Favorite favorito={link.is_favorite} action={handleFavorite} />
        </ItemComponent>
    )
}


