const { User, Thought, reactionSchema } = require('../models');

const thoughtController = {
  getAllThoughts({ params, body}, res) {
    res.json({ message: 'getAllThoughts working' })
  },

  getThoughtById({ params, body}, res) {
    res.json({ message: 'getThoughtById working' })
  },

  addThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId},
          { $addToSet: { thoughts: _id } },
          { new: true }
        );
      })
      .then(newUserData => {
        if (!newUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(newUserData);
      })
      .catch(err => res.json(err));
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