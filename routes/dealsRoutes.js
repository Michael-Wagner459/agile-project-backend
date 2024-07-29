const express = require('express');
const router = express.Router();
const { createDeal, getDeals, getDeal, updateDeal, deleteDeal } = require('../controllers/dealController');

//route to create a deal
router.post('/', createDeal);

//route to get all deals
router.get('/', getDeals);

//router to get a specific deal by id
router.get('/:id', getDeal);

//router to update a deal by id
router.put('/:id', updateDeal);

//router to delete a deal
router.delete('/:id', deleteDeal);

module.exports = router;
