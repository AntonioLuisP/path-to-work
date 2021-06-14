import React from 'react'
import { ProjectProvider } from 'src/context/ProjectContext'
import Project from './projects'

export default function SocialIndex() {

  return (
    <ProjectProvider>
      <Project />
    </ProjectProvider>
  )
}