import React from 'react'


import { CLink, CFooter } from '@coreui/react'

const Footer = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <CLink
           to='/dashboard'
        >
          Link Work
        </CLink>

      </div>
      <div className="mfs-auto">
        <span className="mr-1">Feito por:</span>
        <a href="https://github.com/AntonioLuisP" target="_blank" rel="noopener noreferrer">Antônio Luís</a>
      </div>
    </CFooter>
  )
}

export default React.memo(Footer)
