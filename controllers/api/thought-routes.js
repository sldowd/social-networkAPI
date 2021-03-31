const router = require('express').Router();

const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../thought-controllers')

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;