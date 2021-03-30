const { 
    getAllUsers, 
    createUser, 
    getUserById,
    updateUser,
    deleteUser
} = require('../user-controllers');

const router = require('express').Router();

// get and post at /api/user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// by id /api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;