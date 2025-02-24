const express = require('express')
const { getUsers, getUserID, createUser, updateUser, deleteUser } = require('../controllers/userController')

const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:id', getUserID)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

module.exports = router