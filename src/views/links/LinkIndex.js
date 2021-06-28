import React, { useState, useEffect } from 'react'
import { LinkComponent } from 'src/components'
import { useAuth } from "../../hooks/useAuth";
export default function LinkIndex() {

  const { user } = useAuth()
  const [links, setLinks] = useState([])

  useEffect(() => {

  }, [])

  return (
    <>
      {
        links.map(link => (
          <LinkComponent key={link.id} link={link} />
        ))
      }
    </>
  )
}