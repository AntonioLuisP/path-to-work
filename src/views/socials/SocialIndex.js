import React from 'react'
import { ProjectsProvider } from 'src/context/ProjectsContext'
import Project from './projects'

export default function SocialIndex() {

  return (
    <ProjectsProvider>
      <Project />
    </ProjectsProvider>
  )
}