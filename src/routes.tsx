import Notfound from './Pages/Dashboard/Notfound';

import Project from './Pages/Dashboard/Project';

import Setting from './Pages/Dashboard/Project_Setting';

import Stories from './Pages/Dashboard/Project_Stories';

import User from './Pages/Dashboard/User';

export const dashboard = [
  {
    path: '/projects',
    exact: true,
    component: Project,
  },

  {
    path: '/users',
    exact: false,
    component: User,
  },

  {
    path: '/projects/:id/setting',
    exact: false,
    component: Setting,
  },

  {
    path: '/projects/:id/stories',
    exact: false,
    component: Stories,
  },

  {
    path: '',
    exact: false,
    component: Notfound,
  },
];
