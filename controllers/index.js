const router = require('express').Router();

 const apiRoutes = require('./api');
const welcomeRoutes = require('./welcomeRoutes');

router.use('/', welcomeRoutes);
 router.use('/api', apiRoutes);

module.exports = router;
