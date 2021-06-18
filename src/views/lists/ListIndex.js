import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ListBoard from "../../components/ListPage/ListBoard"
import api from "../../services/api"
import { Loading } from '../../reusable/'
import { Actions as ActionList } from '../../redux/list'

export default function ListIndex() {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const lists = useSelector(state => state.lists)

    useEffect(() => {
        api.get('list')
            .then(response => {
                if (response.status === 200) {
                    dispatch(ActionList.fillSome(response.data.data))
                }
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
        setLoading(false)
        return () => {
            dispatch(ActionList.fillSome([]))
        }
    }, [dispatch])

    if (loading) return (<Loading />)

    return (
        <ListBoard title='Listas' lists={lists} />
    )
}