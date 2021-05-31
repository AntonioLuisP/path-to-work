import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

// const SocialIndex = React.lazy(() => import('./views/socials/SocialIndex'));
// const SocialCreate = React.lazy(() => import('./views/socials/SocialCreate'));
// const Social = React.lazy(() => import('./views/socials/Social'));
// const SocialEdit = React.lazy(() => import('./views/socials/SocialEdit'));

const LinkBoard = React.lazy(() => import('./views/links/LinkBoard'));
const LinkCreate = React.lazy(() => import('./views/links/LinkCreate'));
const Link = React.lazy(() => import('./views/links/Link'));
const LinkEdit = React.lazy(() => import('./views/links/LinkEdit'));

const ProjectBoard = React.lazy(() => import('./views/projects/ProjectBoard'));
const ProjectCreate = React.lazy(() => import('./views/projects/ProjectCreate'));
const Project = React.lazy(() => import('./views/projects/Project'));
const ProjectEdit = React.lazy(() => import('./views/projects/ProjectEdit'));

const TaskIndex = React.lazy(() => import('./views/tasks/TaskIndex'));
const Task = React.lazy(() => import('./views/tasks/Task'));
const TaskEdit = React.lazy(() => import('./views/tasks/TaskEdit'));

const CommentIndex = React.lazy(() => import('./views/comments/CommentIndex'));
const Comment = React.lazy(() => import('./views/comments/Comment'));
const CommentEdit = React.lazy(() => import('./views/comments/CommentEdit'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'Detalhes', component: User },

  // { path: '/social', exact: true, name: 'Perfil Social', component: SocialIndex },
  // { path: '/social/create', exact: true, name: 'Criar', component: SocialCreate },
  // { path: '/social/:id', exact: true, name: 'Detalhes', component: Social },
  // { path: '/social/:id/edit', exact: true, name: 'Editar', component: SocialEdit },

  { path: '/links', exact: true, name: 'Link', component: LinkBoard },
  { path: '/links/create', exact: true, name: 'Criar', component: LinkCreate },
  { path: '/links/:id', exact: true, name: 'Detalhes', component: Link },
  { path: '/links/:id/edit', exact: true, name: 'Editar', component: LinkEdit },

  { path: '/projects', exact: true, name: 'Projetos', component: ProjectBoard },
  { path: '/projects/create', exact: true, name: 'Criar', component: ProjectCreate },
  { path: '/projects/:id', exact: true, name: 'Detalhes', component: Project },
  { path: '/projects/:id/edit', exact: true, name: 'Editar', component: ProjectEdit },

  { path: '/tasks', exact: true, name: 'Tarefas', component: TaskIndex },
  { path: '/tasks/:id', exact: true, name: 'Detalhes', component: Task },
  { path: '/tasks/:id/edit', exact: true, name: 'Editar', component: TaskEdit },

  { path: '/comments', exact: true, name: 'Comentários', component: CommentIndex },
  { path: '/comments/:id', exact: true, name: 'Detalhes', component: Comment },
  { path: '/comments/:id/edit', exact: true, name: 'Editar', component: CommentEdit },
];

export default routes;
