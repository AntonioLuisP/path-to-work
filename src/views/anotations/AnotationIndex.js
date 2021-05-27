import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import api from "../../services/api"
import { TypeColorBadge } from '../../reusable/'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCol,
  CInput,
  CPagination,
  CRow,
  CSelect
} from '@coreui/react'

import {
  cilPen,
  cilZoom
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const style = { 'verticalAlign': 'middle', 'overflow': 'hidden' }

const AnotationIndex = () => {

  const history = useHistory()

  const location = useLocation()
  const queryUrl = location.search
  const queryPage = queryUrl.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)

  // pagination settings
  const [url, setUrl] = useState(queryUrl)
  const [page, setPage] = useState(currentPage)
  const [pages, setPages] = useState()

  // list settings
  const [anotations, setAnotations] = useState([])

  // search settings
  const [anotation, setAnotation] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
    setUrl(location.search)
    api.get('anotation' + url)
      .then(response => {
        if (response.status === 200) {
          setPages(response.data.last_page)
          setAnotations(response.data.data)
        }
      })
  }, [currentPage, page, url, location.search])

  const pageChange = newPage => {
    if (currentPage !== newPage) {
      history.push(
        '/anotations?' +
        'page=' + newPage +
        '&anotation=' + anotation +
        '&type=' + type
      )
    }
  }

  const buscar = () => {
    history.push(
      '/anotations?' +
      'anotation=' + anotation +
      '&type=' + type
    )
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <div className="position-relative table-responsive">
            <table className="table table-striped table-hover">
              <thead className='text-center'>
                <tr>
                  <th className="font-weight-bold" style={style}>
                    <div className="d-inline">
                      Anotação
                    </div>
                  </th>
                  <th className="font-weight-bold" style={style}>
                    <div className="d-inline">
                      Tipo
                    </div>
                  </th>
                  <th className="font-weight-bold" style={style}>
                    <div className="d-inline">
                      Ações
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>
                    <CInput
                      id="anotation-search"
                      name="text-input"
                      placeholder="Anotação"
                      value={anotation}
                      onChange={e => setAnotation(e.target.value)}
                    />
                  </th>
                  <th>
                    <CSelect id="type-search" value={type} onChange={e => setType(e.target.value)} custom name="select">
                      <option value="">Todos</option>
                      <option value="Certeza">Certeza</option>
                      <option value="Dúvida">Dúvida</option>
                    </CSelect>
                  </th>
                  <th>
                    <CButton color="secondary" onClick={buscar}>
                      <CIcon content={cilZoom} />
                    </CButton>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  anotations.map(anotation => (
                    <tr key={anotation.id}>
                      <td className="font-weight-bold">{anotation.anotation}</td>
                      <td className="text-center">
                        <TypeColorBadge type={anotation.type} />
                      </td>
                      <td className="text-center">
                        <CButtonGroup>
                          <CButton color="info" onClick={() => history.push('/anotations/' + anotation.id)}>
                            <CIcon content={cilZoom} />
                          </CButton>
                          <CButton color="warning" onClick={() => history.push('/anotations/' + anotation.id + '/edit')}>
                            <CIcon content={cilPen} />
                          </CButton>
                        </CButtonGroup>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={pages}
            doubleArrows={true}
            align="center"
          />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AnotationIndex