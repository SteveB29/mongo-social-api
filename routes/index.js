const router = require('express').Router();
const apiRoutes = require('./api');
// add html routes here

router.use('/api', apiRoutes);
// html .use here

router.use((req, res) => {
  console.log('Route not found!');
})