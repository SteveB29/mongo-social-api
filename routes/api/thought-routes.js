const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controllers');

// get route and add new thought route, /api/thoughts
router.route('/')
  .get(getAllThoughts)
  .post(addThought); // Make sure to push thoughts _id to user thoughts array field

// routes that need thought id, /api/thoughts/:id
router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// route for reactions through thoughts (should this be own file?)
router.route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(deleteReaction);

module.exports = router;