const { getAllContacts, createContact, getContactById, updateContact, deleteContact } = require('./contactController')

const router = require('express').Router()

router.get('/', getAllContacts)

router.post('/', createContact)

router.get('/:id', getContactById)

router.put('/:id', updateContact)

router.delete('/:id', deleteContact)

module.exports = router
