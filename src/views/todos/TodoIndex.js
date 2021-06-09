import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import api from "../../services/api"

import {
  CButton,
  CButtonGroup,
  CCard,
  CCol,
  CInput,
  CPagination,
  CRow,
} from '@coreui/react'

import {
  cilPen,
  cilZoom
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const style = { 'verticalAlign': 'middle', 'overflow': 'hidden' }

export default function CommentIndex() {

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
  const [comments, setComments] = useState([])

  // search settings
  const [comment, setComment] = useState('')

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
    setUrl(location.search)
    api.get('comment' + url)
      .then(response => {
        if (response.status === 200) {
          setPages(response.data.last_page)
          setComments(response.data.data)
        }
      })
  }, [currentPage, page, url, location.search])

  const pageChange = newPage => {
    if (currentPage !== newPage) {
      history.push(
        '/comments?' +
        'page=' + newPage +
        '&comment=' + comment
      )
    }
  }

  const buscar = () => {
    history.push(
      '/comments?' +
      'comment=' + comment
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
                      Comentário
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
                      id="comment-search"
                      name="text-input"
                      placeholder="Comentário"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
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
                  comments.map(comment => (
                    <tr key={comment.id}>
                      <td className="font-weight-bold">{comment.comment}</td>
                      <td className="text-center">
                        <CButtonGroup>
                          <CButton color="info" onClick={() => history.push('/comments/' + comment.id)}>
                            <CIcon content={cilZoom} />
                          </CButton>
                          <CButton color="warning" onClick={() => history.push('/comments/' + comment.id + '/edit')}>
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