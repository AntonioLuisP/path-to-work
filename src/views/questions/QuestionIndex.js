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

const QuestionIndex = () => {

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
  const [questions, setQuestions] = useState([])

  // search settings
  const [question, setQuestion] = useState('')

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
    setUrl(location.search)
    api.get('question' + url)
      .then(response => {
        if (response.status === 200) {
          setPages(response.data.last_page)
          setQuestions(response.data.data)
        }
      })
  }, [currentPage, page, url, location.search])

  const pageChange = newPage => {
    if (currentPage !== newPage) {
      history.push(
        '/questions?' +
        'page=' + newPage +
        '&question=' + question
      )
    }
  }

  const buscar = () => {
    history.push(
      '/questions?' +
      'question=' + question
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
                      Questão
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
                      id="question-search"
                      name="text-input"
                      placeholder="Questão"
                      value={question}
                      onChange={e => setQuestion(e.target.value)}
                    />
                  </th>
                  <th>
                    <CButton color="secondary" onClick={buscar} >
                      <CIcon content={cilZoom} />
                    </CButton>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  questions.map(question => (
                    <tr key={question.id}>
                      <td className="font-weight-bold">{question.question}</td>
                      <td className="text-center">
                        <CButtonGroup>
                          <CButton color="info" onClick={() => history.push('/questions/' + question.id)}>
                            <CIcon content={cilZoom} />
                          </CButton>
                          <CButton color="warning" onClick={() => history.push('/questions/' + question.id + '/edit')}>
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

export default QuestionIndex