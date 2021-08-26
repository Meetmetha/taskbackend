const express = require('express');
const authRouteUser = require('./authuser.route');
const taskRouter = require('./task.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth/user', // User Auth Endpoints
    route: authRouteUser,
  },
  {
    path: '',
    route: taskRouter,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
