import React from 'react';

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const SocialIndex = React.lazy(() => import('./views/socials/SocialIndex'));
const SocialCreate = React.lazy(() => import('./views/socials/SocialCreate'));
const Social = React.lazy(() => import('./views/socials/Social'));
const SocialEdit = React.lazy(() => import('./views/socials/SocialEdit'));

const LinkIndex = React.lazy(() => import('./views/links/LinkIndex'));
const LinkCreate = React.lazy(() => import('./views/links/LinkCreate'));
const Link = React.lazy(() => import('./views/links/Link'));
const LinkEdit = React.lazy(() => import('./views/links/LinkEdit'));

const NoteIndex = React.lazy(() => import('./views/notes/NoteIndex'));
const NoteCreate = React.lazy(() => import('./views/notes/NoteCreate'));
const Note = React.lazy(() => import('./views/notes/Note'));
const NoteEdit = React.lazy(() => import('./views/notes/NoteEdit'));

const ListIndex = React.lazy(() => import('./views/lists/ListIndex'));
const ListCreate = React.lazy(() => import('./views/lists/ListCreate'));
const List = React.lazy(() => import('./views/lists/List'));
const ListEdit = React.lazy(() => import('./views/lists/ListEdit'));

const TaskIndex = React.lazy(() => import('./views/tasks/TaskIndex'));
const TaskCreate = React.lazy(() => import('./views/tasks/TaskCreate'));
const Task = React.lazy(() => import('./views/tasks/Task'));
const TaskEdit = React.lazy(() => import('./views/tasks/TaskEdit'));

const TodoIndex = React.lazy(() => import('./views/todos/TodoIndex'));
const TodoCreate = React.lazy(() => import('./views/todos/TodoCreate'));
const Todo = React.lazy(() => import('./views/todos/Todo'));
const TodoEdit = React.lazy(() => import('./views/todos/TodoEdit'));

const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },

  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'Detalhes', component: User },

  { path: '/social', exact: true, name: 'Perfil Social', component: SocialIndex },
  { path: '/social/create', exact: true, name: 'Criar', component: SocialCreate },
  { path: '/social/:id', exact: true, name: 'Detalhes', component: Social },
  { path: '/social/:id/edit', exact: true, name: 'Editar', component: SocialEdit },

  { path: '/links', exact: true, name: 'Link', component: LinkIndex },
  { path: '/links/create', exact: true, name: 'Criar', component: LinkCreate },
  { path: '/links/:id', exact: true, name: 'Detalhes', component: Link },
  { path: '/links/:id/edit', exact: true, name: 'Editar', component: LinkEdit },

  { path: '/notes', exact: true, name: 'Note', component: NoteIndex },
  { path: '/notes/create', exact: true, name: 'Criar', component: NoteCreate },
  { path: '/notes/:id', exact: true, name: 'Detalhes', component: Note },
  { path: '/notes/:id/edit', exact: true, name: 'Editar', component: NoteEdit },

  { path: '/lists', exact: true, name: 'Listas', component: ListIndex },
  { path: '/lists/create', exact: true, name: 'Criar', component: ListCreate },
  { path: '/lists/:id', exact: true, name: 'Detalhes', component: List },
  { path: '/lists/:id/edit', exact: true, name: 'Editar', component: ListEdit },

  { path: '/tasks', exact: true, name: 'Tarefas', component: TaskIndex },
  { path: '/tasks/create', exact: true, name: 'Criar', component: TaskCreate },
  { path: '/tasks/:id', exact: true, name: 'Detalhes', component: Task },
  { path: '/tasks/:id/edit', exact: true, name: 'Editar', component: TaskEdit },

  { path: '/todos', exact: true, name: 'Afazer', component: TodoIndex },
  { path: '/todos/create', exact: true, name: 'Criar', component: TodoCreate },
  { path: '/todos/:id', exact: true, name: 'Detalhes', component: Todo },
  { path: '/todos/:id/edit', exact: true, name: 'Editar', component: TodoEdit },
];

export default routes;
