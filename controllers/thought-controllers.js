const { User, Thought, reactionSchema } = require('../models');

const thoughtController = {
  getAllThoughts({ params, body}, res) {
    res.json({ message: 'getAllThoughts working' })
  },

  getThoughtById({ params, body}, res) {
    res.json({ message: 'getThoughtById working' })
  },

  addThought({ params, body}, res) {
    res.json({ message: 'addThought working' })
  },

  updateThought({ params, body}, res) {
    res.json({ message: 'updateThought working' })
  },

  deleteThought({ params, body}, res) {
    res.json({ message: 'deleteThought working' })
  },

  addReaction({ params, body}, res) {
    res.json({ message: 'addReaction working' })
  },

  deleteReaction({ params, body}, res) {
    res.json({ message: 'deleteReaction working' })
  }
};

module.exports = thoughtController;