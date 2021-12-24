const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controllers');

// get route and add new thought route, /api/thoughts
router.route('/')
  .get(getAllThoughts)
  .post(addThought);

// routes that need thought id, /api/thoughts/:id
router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// route for reactions through thoughts (should this be own file?)
router.route(':thoughtId/reactions')
  .put(addReaction)
  .delete(removeReaction);

  module.exports = router;