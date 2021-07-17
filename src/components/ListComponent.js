import React from 'react'
import ItemComponent from './ItemComponent'

export default function ListComponent({ list }) {

    return (
        <ItemComponent name={list.name} to={'/lists/' + list.id} />
    )
}


