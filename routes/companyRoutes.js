const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const checkCompanyExists = require('../middleware/checkCompanyExists');
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
router.get('/:id', validateObjectId, checkCompanyExists, getCompany);

//route to update a company
router.put('/:id', validateObjectId, checkCompanyExists, updateCompany);

//route to delete a company
router.delete('/:id', validateObjectId, checkCompanyExists, deleteCompany);

module.exports = router;
