import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionLink } from '../../redux/link'
import { Actions as ActionList } from '../../redux/list'
import { BreadcrumbHeader, DropdownMore, Loading, Modal, NoItems, CreateDataButton } from '../../reusable'
import { ListComponent, LinkInfo } from "../../components/"
import ListCreate from '../lists/ListCreate'
import LinkEdit from './LinkEdit'
import { supabase } from '../../services/supabase'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

export default function Link() {

  const { id } = useParams();
  const history = useHistory()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const link = useSelector(state => state.link)
  const lists = useSelector(state => state.lists)

  const toogleModal = () => {
    setModal(old => !old)
  }

  const fetchLink = useCallback(async () => {
    const { data: link, error } = await supabase
      .from("links")
      .select("*")
      .eq('id', id)
      .single()
    if (error) {
      console.log("error", error);
    }
    else {
      dispatch(ActionLink.selectOne(link))
      dispatch(ActionList.fillSome([]))
    }
    setLoading(false)
  }, [id, dispatch])

  useEffect(() => {
    fetchLink()
    return () => {
      dispatch(ActionLink.removeSelected())
      dispatch(ActionList.fillSome([]))
    }
  }, [fetchLink, dispatch])

  async function handleDelete() {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id)
    if (error) console.log("error", error);
    else history.push('/links');
  }

  if (loading) return (<Loading />)

  return (
    <CRow>
      <Modal show={modal} onClose={toogleModal} component={<LinkEdit link={link} />} />
      <CCol xs="12" sm="9" md="9">
        <CCard className='text-break text-justify'>
          <CCardHeader color="secondary">
            {link.name}: {link.url}
            <div className="card-header-actions">
              <DropdownMore
                editAction={() => toogleModal()}
                deleteAction={() => handleDelete(link.id)}
              />
            </div>
          </CCardHeader>
        </CCard>
        <BreadcrumbHeader title="Listas" quantidade={lists.length} />
        <CreateDataButton component={<ListCreate />} />
        {lists <= 0 ? <NoItems /> :
          lists.map(list => (<ListComponent key={list.id} list={list} />))
        }
      </CCol>
      <CCol xs="12" sm="3" md="3">
        <LinkInfo link={link} />
      </CCol>
    </CRow>
  )
}
