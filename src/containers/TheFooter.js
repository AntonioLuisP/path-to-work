import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://github.com/AntonioLuisP" target="_blank" rel="noopener noreferrer">Note Recomendation</a>
        {/* <span className="ml-1">&copy; 2020 creativeLabs.</span> */}
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Feito por:</span>
        <a href="https://github.com/AntonioLuisP" target="_blank" rel="noopener noreferrer">Antônio Luís</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
