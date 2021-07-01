import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionList } from '../../redux/list'
import { BreadcrumbHeader, DropdownMore, Loading, Modal } from '../../reusable'
import { LinkComponent, ListInfo } from "../../components/"
import LinkCreate from '../links/LinkCreate'
import ListEdit from './ListEdit'
import { supabase } from '../../services/supabase'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'

export default function List() {

  const { id } = useParams();
  const history = useHistory()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const list = useSelector(state => state.list)
  const links = useSelector(state => state.links)

  const toogleModal = () => {
    setModal(old => !old)
  }

  const fetchList = useCallback(async () => {
    const { data: list, error } = await supabase
      .from("lists")
      .select("*")
      .eq('id', id)
      .single()
    if (error) {
      console.log("error", error);
    }
    else {
      dispatch(ActionList.selectOne(list))
    }
    setLoading(false)
  }, [id, dispatch])

  useEffect(() => {
    fetchList()
    return () => {
      dispatch(ActionList.removeSelected())
    }
  }, [fetchList, dispatch])

  async function handleDelete() {
    const { error } = await supabase
      .from('lists')
      .delete()
      .eq('id', id)
    if (error) console.log("error", error);
    else history.push('/lists');
  }

  if (loading) return (<Loading />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal} component={<ListEdit list={list} />} />
      <CCol xs="12" sm="9" md="9">
        <CCard>
          <CCardHeader color="secondary">
            {list.name}
            <div className="card-header-actions">
              <DropdownMore
                editAction={() => toogleModal()}
                deleteAction={() => handleDelete(list.id)}
              />
            </div>
          </CCardHeader>
        </CCard>
        <BreadcrumbHeader title='Links' quantidade={links.length} component={<LinkCreate />} />
        {
          links.map(link => (
            <LinkComponent key={link.id} link={link} />
          ))
        }
      </CCol>
      <CCol xs="12" sm="3" md="3">
        <ListInfo list={list} />
      </CCol>
    </CRow>
  )
}