const { User, Thought, reactionSchema } = require('../models');

const thoughtController = {
  getAllThoughts({ params, body}, res) {
    res.json({ message: 'Thought controller working' })
  }
};

module.exports = thoughtController;