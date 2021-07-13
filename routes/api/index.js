//will collect all of the API routes & package them
const router = require('express').Router();
const userRoutes = require('./user-routes.js');

router.use('/users', userRoutes);

module.exports = router;