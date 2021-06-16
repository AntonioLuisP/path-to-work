import React, { Suspense } from 'react'

import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

export default function Routes() {

  const Users = React.lazy(() => import('../views/users/Users'));
  const User = React.lazy(() => import('../views/users/User'));

  const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));

  const SocialIndex = React.lazy(() => import('../views/socials/SocialIndex'));
  // const SocialCreate = React.lazy(() => import('./views/socials/SocialCreate'));
  // const Social = React.lazy(() => import('./views/socials/Social'));
  // const SocialEdit = React.lazy(() => import('./views/socials/SocialEdit'));

  const LinkIndex = React.lazy(() => import('../views/links/LinkIndex'));
  const LinkCreate = React.lazy(() => import('../views/links/LinkCreate'));
  const Link = React.lazy(() => import('../views/links/Link'));
  const LinkEdit = React.lazy(() => import('../views/links/LinkEdit'));

  const ProjectIndex = React.lazy(() => import('../views/projects/ProjectIndex'));
  const ProjectCreate = React.lazy(() => import('../views/projects/ProjectCreate'));
  const Project = React.lazy(() => import('../views/projects/Project'));
  const ProjectEdit = React.lazy(() => import('../views/projects/ProjectEdit'));

  const TaskIndex = React.lazy(() => import('../views/tasks/TaskIndex'));
  const TaskCreate = React.lazy(() => import('../views/tasks/TaskCreate'));
  const Task = React.lazy(() => import('../views/tasks/Task'));
  const TaskEdit = React.lazy(() => import('../views/tasks/TaskEdit'));

  const CommentIndex = React.lazy(() => import('../views/comments/CommentIndex'));
  const Comment = React.lazy(() => import('../views/comments/Comment'));
  const CommentEdit = React.lazy(() => import('../views/comments/CommentEdit'));

  return (
    <Suspense fallback={loading}>
      <Switch>
        <Route path='/' exact name='Home' />
        <Route path='/dashboard' exact name='Dashboard' component={Dashboard} />

        <Route path='/users' exact name='Users' component={Users} />
        <Route path='/users/=d' exact name='Detalhes' component={User} />

        <Route path='/social' exact name='Perfil Social' component={SocialIndex} />
        {/* <Route path='/social/create' exact name='Criar' component={SocialCreate} /> */}
        {/* <Route path='/social/=d' exact name='Detalhes' component={Social} /> */}
        {/* <Route path='/social/=d/edit' exact name='Editar' component={SocialEdit} /> */}

        <Route path='/links' exact name='Link' component={LinkIndex} />
        <Route path='/links/create' exact name='Criar' component={LinkCreate} />
        <Route path='/links/=d' exact name='Detalhes' component={Link} />
        <Route path='/links/=d/edit' exact name='Editar' component={LinkEdit} />

        <Route path='/projects' exact name='Projetos' component={ProjectIndex} />
        <Route path='/projects/create' exact name='Criar' component={ProjectCreate} />
        <Route path='/projects/=d' exact name='Detalhes' component={Project} />
        <Route path='/projects/=d/edit' exact name='Editar' component={ProjectEdit} />

        <Route path='/tasks' exact name='Tarefas' component={TaskIndex} />
        <Route path='/tasks/create' exact name='Criar' component={TaskCreate} />
        <Route path='/tasks/=d' exact name='Detalhes' component={Task} />
        <Route path='/tasks/=d/edit' exact name='Editar' component={TaskEdit} />

        <Route path='/comments' exact name='Comentários' component={CommentIndex} />
        <Route path='/comments/=d' exact name='Detalhes' component={Comment} />
        <Route path='/comments/=d/edit' exact name='Editar' component={CommentEdit} />

        <Redirect from="/" to="/dashboard" />
      </Switch>
    </Suspense>
  )
}