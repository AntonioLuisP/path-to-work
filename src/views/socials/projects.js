import React from 'react'
import { useProjects, Actions as ActionProjects } from 'src/context/ProjectsContext'

export default function Project() {

    const [projects, setProjects] = useProjects()

    return (
        <>
            {
                projects.map(project => (
                    <pre key={project.id}>
                        {project.name}
                    </pre>
                ))
            }
            <button
                onClick={() => setProjects(ActionProjects.addOne(
                    {
                        'created_at': "2021-06-11T04:49:34.000000Z",
                        'description': null,
                        'id': 11,
                        'name': "teste add",
                        'public': false,
                        'updated_at': "2021-06-11T04:49:34.000000Z"
                    }
                ))
                }>Adicionar</button>
            <button
                onClick={() => setProjects(ActionProjects.editOne(
                    {
                        'created_at': "2021-06-11T04:49:34.000000Z",
                        'description': null,
                        'id': 11,
                        'name': "teste edit",
                        'public': false,
                        'updated_at': "2021-06-11T04:49:34.000000Z"
                    }
                ))
                }>Editar</button>
        </>

    )
}
