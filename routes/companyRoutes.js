const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
  createCompany,
} = require('../controllers/companyController');

//route to create a company
router.post('/', createCompany);

//route to get all companies
router.get('/', getCompanies);

//route to get a single company
router.get('/:id', getCompany);

//route to update a company
router.put('/:id', updateCompany);

//route to delete a company
router.delete('/:id', deleteCompany);

module.exports = router;
