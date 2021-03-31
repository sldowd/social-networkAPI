const { 
    getAllUsers, 
    createUser, 
    getUserById,
    updateUser,
    deleteUser,
    createFriend,
    removeFriend
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

router 
    .route('/:id/friends/:friendId')
    .post(createFriend)
    .delete(removeFriend)


module.exports = router;