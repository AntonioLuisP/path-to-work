import React from 'react';

const User = React.lazy(() => import('./views/users/User'));

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Profile = React.lazy(() => import('./views/profile/Profile'));

const LinkIndex = React.lazy(() => import('./views/links/LinkIndex'));
const Link = React.lazy(() => import('./views/links/Link'));

const ListIndex = React.lazy(() => import('./views/lists/ListIndex'));
const List = React.lazy(() => import('./views/lists/List'));

const TaskIndex = React.lazy(() => import('./views/tasks/TaskIndex'));
const Task = React.lazy(() => import('./views/tasks/Task'));

const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },

  { path: '/user', exact: true, name: 'Usuário', component: User },

  { path: '/social', exact: true, name: 'Perfil Social', component: Profile },

  { path: '/links', exact: true, name: 'Links', component: LinkIndex },
  { path: '/links/:id', exact: true, name: 'Detalhes', component: Link },

  { path: '/lists', exact: true, name: 'Listas', component: ListIndex },
  { path: '/lists/:id', exact: true, name: 'Detalhes', component: List },

  { path: '/tasks', exact: true, name: 'Tarefas', component: TaskIndex },
  { path: '/tasks/:id', exact: true, name: 'Detalhes', component: Task },
];

export default routes;
