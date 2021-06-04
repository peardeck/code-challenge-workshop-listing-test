
const express = require('express');
const router = express.Router();

const workshopController = require ('./workshop.controller');

module.exports = (auth) => {
  router.get('/nearby', auth, workshopController.getNearby);
  return router;
};
