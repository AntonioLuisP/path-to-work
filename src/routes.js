import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const ProjectIndex = React.lazy(() => import('./views/projects/ProjectIndex'));
const ProjectCreate = React.lazy(() => import('./views/projects/ProjectCreate'));
const Project = React.lazy(() => import('./views/projects/Project'));
const ProjectEdit = React.lazy(() => import('./views/projects/ProjectEdit'));

const QuestionIndex = React.lazy(() => import('./views/questions/QuestionIndex'));
const Question = React.lazy(() => import('./views/questions/Question'));
const QuestionEdit = React.lazy(() => import('./views/questions/QuestionEdit'));

const AnotationIndex = React.lazy(() => import('./views/anotations/AnotationIndex'));
const AnotationEdit = React.lazy(() => import('./views/anotations/AnotationEdit'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'Detalhes', component: User },
  { path: '/projects', exact: true, name: 'Projetos', component: ProjectIndex },
  { path: '/projects/create', exact: true, name: 'Criar', component: ProjectCreate },
  { path: '/projects/:id', exact: true, name: 'Detalhes', component: Project },
  { path: '/projects/:id/edit', exact: true, name: 'Editar', component: ProjectEdit },
  { path: '/questions', exact: true, name: 'Questões', component: QuestionIndex },
  { path: '/questions/:id', exact: true, name: 'Detalhes', component: Question },
  { path: '/questions/:id/edit', exact: true, name: 'Editar', component: QuestionEdit },
  { path: '/anotations', exact: true, name: 'Anotações', component: AnotationIndex },
  { path: '/anotations/:id/edit', exact: true, name: 'Editar', component: AnotationEdit },
];

export default routes;
