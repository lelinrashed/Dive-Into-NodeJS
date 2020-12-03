const { getAllContact, getSingleContact, createContact, updateContact, deleteContact } = require('./controllers')

const router = require('express').Router()

router.get('/', getAllContact)
router.get('/:id', getSingleContact)
router.post('/', createContact)
router.put('/:id', updateContact)
router.get('/delete/:id', deleteContact)

module.exports = router