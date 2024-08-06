const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const checkDealExists = require('../middleware/checkDealExists');
const {
  createDeal,
  getDeals,
  getDeal,
  updateDeal,
  updateDealStage,
  deleteDeal,
} = require('../controllers/dealController');

//route to create a deal
router.post('/', createDeal);

//route to get all deals
router.get('/', getDeals);

//router to get a specific deal by id
router.get('/:id', validateObjectId, checkDealExists, getDeal);

//router to update a deal by id
router.put('/:id', validateObjectId, checkDealExists, updateDeal);

//router to update a deal stage
router.put('/:id/stage', validateObjectId, checkDealExists, updateDealStage);

//router to delete a deal
router.delete('/:id', validateObjectId, checkDealExists, deleteDeal);

module.exports = router;
